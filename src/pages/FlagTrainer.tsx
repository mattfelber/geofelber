import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Alert,
  Paper,
  IconButton,
  Tooltip,
  alpha,
  Collapse
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { Country } from '../data/countries';
import { countries } from '../data/countries';
import { DatabaseService } from '../lib/database.service';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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
  const [sessionStart] = useState<Date>(new Date());
  const [sessionAttempts, setSessionAttempts] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [history, setHistory] = useState<Country[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [showFacts, setShowFacts] = useState(false);

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
    setShowFacts(false);
    setWrongAnswer(null);
    setShowCorrect(false);

    if (addToHistory) {
      setHistory(prev => {
        const newHistory = [...prev.slice(0, historyIndex + 1), newCountry];
        setHistoryIndex(newHistory.length - 1);
        return newHistory;
      });
    }
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleGuess = async (selectedCountry: Country) => {
    setSessionAttempts(prev => prev + 1);
    
    const isCorrect = selectedCountry.code === currentCountry?.code;
    
    if (isCorrect) {
      handleCorrectGuess();
      setSessionCorrect(prev => prev + 1);
    } else {
      handleIncorrectGuess(selectedCountry.name);
    }

    // Record the attempt in the database
    if (user && currentCountry) {
      try {
        await DatabaseService.createFlagAttempt(
          user.id,
          currentCountry.code,
          isCorrect
        );
      } catch (error) {
        console.error('Error recording flag attempt:', error);
      }
    }
  };

  const handleCorrectGuess = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    const newStreak = streak + 1;
    setStreak(newStreak);
    
    if (newStreak > bestStreak) {
      setBestStreak(newStreak);
    }
    setEncouragement(getEncouragement());
    setShowCorrect(true);
    
    setTimeout(() => {
      selectNewCountry();
      setIsTransitioning(false);
    }, 500);
  };

  const handleIncorrectGuess = (selectedName: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setStreak(0);
    setEncouragement('');
    setWrongAnswer(selectedName);
    setShowCorrect(true);
    setTimeout(() => {
      setWrongAnswer(null);
      setShowCorrect(false);
      selectNewCountry();
      setIsTransitioning(false);
    }, 2000);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      const prevCountry = history[prevIndex];
      setHistoryIndex(prevIndex);
      
      const wrongOptions = countries
        .filter(c => c.code !== prevCountry.code)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
      const allOptions = [...wrongOptions, prevCountry]
        .sort(() => Math.random() - 0.5);
      
      setCurrentCountry(prevCountry);
      setOptions(allOptions);
      setShowFacts(false);
      setEncouragement('');
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      const nextCountry = history[nextIndex];
      setHistoryIndex(nextIndex);
      
      const wrongOptions = countries
        .filter(c => c.code !== nextCountry.code)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      
      const allOptions = [...wrongOptions, nextCountry]
        .sort(() => Math.random() - 0.5);
      
      setCurrentCountry(nextCountry);
      setOptions(allOptions);
      setShowFacts(false);
      setEncouragement('');
    } else {
      selectNewCountry();
    }
  };

  useEffect(() => {
    const savePracticeSession = async () => {
      if (user && sessionAttempts > 0) {
        const sessionDuration = Math.round(
          (new Date().getTime() - sessionStart.getTime()) / 1000
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
  }, [user, sessionAttempts, sessionCorrect, sessionStart]);

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
                  bgcolor: wrongAnswer === option.name 
                    ? 'error.main' 
                    : (showCorrect && option.code === currentCountry?.code)
                      ? 'success.main'
                      : 'background.paper',
                  color: (wrongAnswer === option.name || (showCorrect && option.code === currentCountry?.code))
                    ? 'white'
                    : 'text.primary',
                  '&:hover': {
                    bgcolor: 'background.paper',
                    '@media (hover: none)': {
                      bgcolor: 'background.paper',
                    }
                  },
                  '&:active': {
                    bgcolor: 'primary.main',
                    color: 'white',
                  },
                  transition: 'all 0.2s ease-in-out'
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
