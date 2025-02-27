import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Alert
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { Country } from '../data/countries';
import { countries } from '../data/countries';
import { DatabaseService } from '../lib/database.service';

const getEncouragement = () => {
  const messages = ['Great job! 🎯', 'Perfect! ⭐', 'Excellent! 🏆', 'Amazing! 🌟'];
  return messages[Math.floor(Math.random() * messages.length)];
};

const FlagTrainer = () => {
  const { user } = useAuth();
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [options, setOptions] = useState<Country[]>([]);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [encouragement, setEncouragement] = useState('');
  const [wrongAnswer, setWrongAnswer] = useState<string | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [sessionAttempts, setSessionAttempts] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);

  useEffect(() => {
    if (user) {
      DatabaseService.getUserScore(user.id, 'flag')
        .then((score) => {
          if (score) {
            setStreak(score.score);
            setBestStreak(score.best_streak);
          }
        })
        .catch(console.error);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      DatabaseService.updateUserScore(user.id, 'flag', streak, bestStreak)
        .catch(console.error);
    }
  }, [streak, bestStreak, user]);

  useEffect(() => {
    selectNewCountry();
  }, []);

  const selectNewCountry = (addToHistory = true) => {
    setIsTransitioning(true);
    let newCountry;
    do {
      newCountry = countries[Math.floor(Math.random() * countries.length)];
    } while (newCountry === currentCountry);
    
    const wrongOptions = countries
      .filter(c => c.code !== newCountry.code)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const allOptions = [...wrongOptions, newCountry]
      .sort(() => Math.random() - 0.5);
    
    setCurrentCountry(newCountry);
    setOptions(allOptions);
    setShowCorrect(false);

    if (addToHistory) {
      // Removed history state and related logic
    }
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleGuess = async (guess: Country) => {
    if (!currentCountry || isTransitioning) return;
    
    setSessionAttempts(prev => prev + 1);
    const isCorrect = guess.name === currentCountry.name;
    
    if (isCorrect) {
      setSessionCorrect(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > bestStreak) {
          setBestStreak(newStreak);
        }
        return newStreak;
      });
      setShowCorrect(true);
      setEncouragement(getEncouragement());
    } else {
      setStreak(0);
      setWrongAnswer(guess.name);
    }

    if (user) {
      try {
        await DatabaseService.createFlagAttempt(
          user.id,
          currentCountry.code,
          isCorrect,
          currentCountry.name,
          guess.name
        );
      } catch (error) {
        console.error('Error recording flag attempt:', error);
      }
    }

    // Add delay before transitioning
    setTimeout(() => {
      setShowCorrect(false);
      setWrongAnswer(null);
      selectNewCountry();
    }, 500);
  };

  useEffect(() => {
    const savePracticeSession = async () => {
      if (user && sessionAttempts > 0) {
        const sessionDuration = Math.round(
          (new Date().getTime() - new Date().getTime()) / 1000
        );
        try {
          await DatabaseService.createPracticeSession(
            user.id,
            'flag',
            sessionAttempts,
            sessionCorrect,
            sessionDuration
          );
        } catch (error) {
          console.error('Error saving practice session:', error);
        }
      }
    };

    window.addEventListener('beforeunload', savePracticeSession);
    return () => {
      window.removeEventListener('beforeunload', savePracticeSession);
      savePracticeSession();
    };
  }, [user, sessionAttempts, sessionCorrect]);

  if (!currentCountry) return null;

  return (
    <Container maxWidth="sm">
      <Box sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        py: 2 
      }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Flag Trainer
        </Typography>

        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  Score: {sessionCorrect}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  Streak: {streak}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body2" color="text.secondary">
                  Best: {bestStreak}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {currentCountry && (
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <img
              src={`https://flagcdn.com/w320/${currentCountry.code.toLowerCase()}.png`}
              alt="Flag"
              style={{ maxWidth: '100%', maxHeight: '35vh', width: 'auto' }}
            />
          </Box>
        )}

        <Grid container spacing={2} sx={{ mb: 2 }}>
          {options.map((option) => (
            <Grid item xs={6} key={option.code}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => handleGuess(option)}
                disabled={isTransitioning}
                sx={{
                  height: '45px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  fontSize: { xs: '0.875rem', sm: '1rem' },
                  lineHeight: 1.2,
                  padding: { xs: '6px 12px', sm: '8px 16px' },
                  whiteSpace: 'normal',
                  wordBreak: 'break-word',
                  maxWidth: '100%',
                  backgroundColor: wrongAnswer === option.name 
                    ? '#d32f2f !important' // Force error color
                    : (showCorrect && option.code === currentCountry?.code)
                      ? '#2e7d32 !important' // Force success color
                      : undefined,
                  '&:hover': {
                    backgroundColor: wrongAnswer === option.name 
                      ? '#d32f2f !important'
                      : (showCorrect && option.code === currentCountry?.code)
                        ? '#2e7d32 !important'
                        : undefined,
                  },
                  '&:disabled': {
                    backgroundColor: wrongAnswer === option.name 
                      ? '#d32f2f !important'
                      : (showCorrect && option.code === currentCountry?.code)
                        ? '#2e7d32 !important'
                        : undefined,
                  }
                }}
              >
                {option.name}
              </Button>
            </Grid>
          ))}
        </Grid>

        {encouragement && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {encouragement}
          </Alert>
        )}

        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 'auto' }}>
          Session Attempts: {sessionAttempts}
        </Typography>
      </Box>
    </Container>
  );
};

export default FlagTrainer;
