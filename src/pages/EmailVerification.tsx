import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { supabase } from '../lib/supabase';

export default function EmailVerification() {
  const navigate = useNavigate();
  const location = useLocation();
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleEmailVerification = async () => {
      try {
        // Check for error parameters in the URL
        const searchParams = new URLSearchParams(location.hash.replace('#', ''));
        const errorCode = searchParams.get('error_code');
        const errorDescription = searchParams.get('error_description');

        if (errorCode) {
          if (errorCode === 'otp_expired') {
            setError('The verification link has expired. Please request a new verification email.');
          } else {
            setError(errorDescription?.replace(/\+/g, ' ') || 'Verification failed');
          }
          setVerifying(false);
          return;
        }

        // If no error, proceed with verification
        const params = new URLSearchParams(location.hash.replace('#', ''));
        if (params.get('access_token')) {
          const { error: sessionError } = await supabase.auth.getSession();
          if (sessionError) throw sessionError;
          navigate('/login');
        } else {
          setError('No verification token found');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred during verification');
      } finally {
        setVerifying(false);
      }
    };

    handleEmailVerification();
  }, [navigate, location]);

  const handleResendEmail = async () => {
    try {
      setVerifying(true);
      setError(null);
      
      // Get email from local storage if available
      const email = localStorage.getItem('signupEmail');
      if (!email) {
        setError('Please try signing up again');
        return;
      }

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      });

      if (error) throw error;

      setError('A new verification email has been sent. Please check your inbox.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to resend verification email');
    } finally {
      setVerifying(false);
    }
  };

  if (verifying) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography variant="h5" color="error" gutterBottom>
          Verification Failed
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>{error}</Typography>
        {error.includes('expired') && (
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleResendEmail}
            sx={{ mt: 2 }}
          >
            Resend Verification Email
          </Button>
        )}
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: 'center', py: 4 }}>
      <Typography variant="h5" color="primary" gutterBottom>
        Email Verified Successfully
      </Typography>
      <Typography>
        You can now log in to your account.
      </Typography>
    </Box>
  );
}
