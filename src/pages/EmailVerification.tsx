import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import { supabase } from '../lib/supabase';

export default function EmailVerification() {
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleEmailVerification = async () => {
      try {
        // The hash contains the tokens after the `#` symbol
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.replace('#', ''));
        
        // If we have an access_token, the user has been verified
        if (params.get('access_token')) {
          // Optionally store the session
          const { error: sessionError } = await supabase.auth.getSession();
          if (sessionError) throw sessionError;
          
          // Redirect to login
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
  }, [navigate]);

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
        <Typography color="text.secondary">{error}</Typography>
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
