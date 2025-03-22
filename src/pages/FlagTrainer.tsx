import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
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
  const { user, isGuest } = useAuth();
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
    const userId = user?.id || (isGuest ? 'guest' : null);
    if (userId) {
      DatabaseService.getUserScore(userId, 'flag')
        .then((score) => {
          if (score) {
            setStreak(score.score);
            setBestStreak(score.best_streak);
          }
        })
        .catch(console.error);
    }
  }, [user, isGuest]);

  useEffect(() => {
    const userId = user?.id || (isGuest ? 'guest' : null);
    if (userId) {
      DatabaseService.updateUserScore(userId, 'flag', streak, bestStreak)
        .catch(console.error);
    }
  }, [streak, bestStreak, user, isGuest]);

  const getRandomCountries = (count: number, exclude?: Country): Country[] => {
    const availableCountries = countries.filter(c => c !== exclude);
    const shuffled = [...availableCountries].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const generateQuestion = () => {
    const newCurrentCountry = getRandomCountries(1)[0];
    const otherOptions = getRandomCountries(3, newCurrentCountry);
    const allOptions = [...otherOptions, newCurrentCountry].sort(() => Math.random() - 0.5);

    setCurrentCountry(newCurrentCountry);
    setOptions(allOptions);
    setWrongAnswer(null);
    setShowCorrect(false);
    setIsTransitioning(false);
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleAnswer = async (selectedCountry: Country) => {
    if (isTransitioning || !currentCountry) return;

    setIsTransitioning(true);
    setSessionAttempts(prev => prev + 1);

    const isCorrect = selectedCountry.code === currentCountry.code;
    const userId = user?.id || (isGuest ? 'guest' : null);

    if (isCorrect) {
      setSessionCorrect(prev => prev + 1);
      setStreak(prev => prev + 1);
      setBestStreak(prev => Math.max(prev, streak + 1));
      setEncouragement(getEncouragement());
      setShowCorrect(true);

      if (userId) {
        await DatabaseService.updateLearningProgress(
          userId,
          'flag',
          currentCountry.code,
          1,
          0
        );
      }
    } else {
      setStreak(0);
      setWrongAnswer(selectedCountry.name);
      setShowCorrect(false);

      if (userId) {
        await DatabaseService.updateLearningProgress(
          userId,
          'flag',
          currentCountry.code,
          0,
          1
        );
      }
    }

    setTimeout(generateQuestion, 1500);
  };

  const accuracy = sessionAttempts > 0
    ? Math.round((sessionCorrect / sessionAttempts) * 100)
    : 0;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Flag Trainer
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Current Streak: {streak} | Best Streak: {bestStreak}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Session Accuracy: {accuracy}% ({sessionCorrect}/{sessionAttempts})
        </Typography>
      </Box>

      {currentCountry && (
        <>
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Which country does this flag belong to?
            </Typography>
            <Box
              component="img"
              src={`https://flagcdn.com/${currentCountry.code.toLowerCase()}.svg`}
              alt="Country flag"
              sx={{
                width: '100%',
                maxWidth: 300,
                height: 'auto',
                borderRadius: 1,
                boxShadow: 2,
              }}
            />
          </Box>

          <Grid container spacing={2}>
            {options.map((country) => (
              <Grid item xs={12} sm={6} key={country.code}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => handleAnswer(country)}
                  disabled={isTransitioning}
                  sx={{
                    py: 2,
                    textTransform: 'none',
                    bgcolor: 'background.paper',
                  }}
                >
                  {country.name}
                </Button>
              </Grid>
            ))}
          </Grid>

          {encouragement && showCorrect && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {encouragement}
            </Alert>
          )}

          {wrongAnswer && (
            <Alert severity="error" sx={{ mt: 2 }}>
              Incorrect! You selected {wrongAnswer}. The correct answer is {currentCountry.name}.
            </Alert>
          )}
        </>
      )}
    </Container>
  );
};

export default FlagTrainer;
