import { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Collapse, 
  Grid, 
  IconButton, 
  Paper, 
  Tooltip, 
  Typography,
  alpha,
  Container,
  Alert
} from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Language, languages } from '../data/languages';
import { useAuth } from '../contexts/AuthContext';
import { DatabaseService } from '../lib/database.service';

const getEncouragement = () => {
  const messages = ['Great job! 🎯', 'Perfect! ⭐', 'Excellent! 🏆', 'Amazing! 🌟'];
  return messages[Math.floor(Math.random() * messages.length)];
};

const LanguageTrainer = () => {
  const { user, isGuest } = useAuth();
  const [currentLanguage, setCurrentLanguage] = useState<Language | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [encouragement, setEncouragement] = useState('');
  const [options, setOptions] = useState<Language[]>([]);
  const [history, setHistory] = useState<Language[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [wrongAnswer, setWrongAnswer] = useState<string | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [sessionAttempts, setSessionAttempts] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);

  // Load saved streaks from database
  useEffect(() => {
    const userId = user?.id || (isGuest ? 'guest' : null);
    if (userId) {
      DatabaseService.getUserScore(userId, 'language')
        .then((score) => {
          if (score) {
            setStreak(score.score);
            setBestStreak(score.best_streak);
          }
        })
        .catch(console.error);
    }
  }, [user, isGuest]);

  // Update streaks in database
  useEffect(() => {
    const userId = user?.id || (isGuest ? 'guest' : null);
    if (userId) {
      DatabaseService.updateUserScore(userId, 'language', streak, bestStreak)
        .catch(console.error);
    }
  }, [streak, bestStreak, user, isGuest]);

  const getRandomLanguages = (count: number, exclude?: Language): Language[] => {
    const availableLanguages = languages.filter(l => l !== exclude);
    const shuffled = [...availableLanguages].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  const generateQuestion = (addToHistory = true) => {
    const newLanguage = getRandomLanguages(1)[0];
    const otherOptions = getRandomLanguages(3, newLanguage);
    const allOptions = [...otherOptions, newLanguage].sort(() => Math.random() - 0.5);

    setCurrentLanguage(newLanguage);
    setOptions(allOptions);
    setShowHint(false);
    setWrongAnswer(null);
    setShowCorrect(false);
    setIsTransitioning(false);

    if (addToHistory) {
      setHistory(prev => [...prev.slice(0, historyIndex + 1), newLanguage]);
      setHistoryIndex(prev => prev + 1);
    }
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  const handleAnswer = async (selectedLanguage: Language) => {
    if (isTransitioning || !currentLanguage) return;

    setIsTransitioning(true);
    setSessionAttempts(prev => prev + 1);

    const isCorrect = selectedLanguage.code === currentLanguage.code;
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
          'language',
          currentLanguage.code,
          1,
          0
        );
      }
    } else {
      setStreak(0);
      setWrongAnswer(selectedLanguage.name);
      setShowCorrect(false);

      if (userId) {
        await DatabaseService.updateLearningProgress(
          userId,
          'language',
          currentLanguage.code,
          0,
          1
        );
      }
    }

    setTimeout(() => generateQuestion(), 1500);
  };

  const handlePrevious = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      const prevLanguage = history[historyIndex - 1];
      setCurrentLanguage(prevLanguage);
      const otherOptions = getRandomLanguages(3, prevLanguage);
      setOptions([...otherOptions, prevLanguage].sort(() => Math.random() - 0.5));
      setShowHint(false);
      setWrongAnswer(null);
      setShowCorrect(false);
    }
  };

  const handleNext = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      const nextLanguage = history[historyIndex + 1];
      setCurrentLanguage(nextLanguage);
      const otherOptions = getRandomLanguages(3, nextLanguage);
      setOptions([...otherOptions, nextLanguage].sort(() => Math.random() - 0.5));
      setShowHint(false);
      setWrongAnswer(null);
      setShowCorrect(false);
    } else {
      generateQuestion();
    }
  };

  const accuracy = sessionAttempts > 0
    ? Math.round((sessionCorrect / sessionAttempts) * 100)
    : 0;

  if (!currentLanguage) return null;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Language Trainer
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Current Streak: {streak} | Best Streak: {bestStreak}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Session Accuracy: {accuracy}% ({sessionCorrect}/{sessionAttempts})
        </Typography>
      </Box>

      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box sx={{ position: 'relative' }}>
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              What language is this?
            </Typography>
            <Typography
              variant="h4"
              component="p"
              sx={{
                fontFamily: 'Noto Sans',
                my: 4,
                fontSize: { xs: '1.5rem', sm: '2rem' }
              }}
            >
              {currentLanguage.sample}
            </Typography>
          </Box>

          <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
            <Tooltip title={showHint ? 'Hide hint' : 'Show hint'}>
              <IconButton onClick={() => setShowHint(!showHint)} size="small">
                <LightbulbIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Collapse in={showHint}>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                mb: 2,
                backgroundColor: alpha('#fff', 0.1),
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2">
                  <strong>Hint:</strong> {currentLanguage.hint}
                </Typography>
                <IconButton
                  onClick={() => setShowHint(false)}
                  size="small"
                  sx={{ ml: 1 }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            </Paper>
          </Collapse>

          <Grid container spacing={2}>
            {options.map((language) => (
              <Grid item xs={12} sm={6} key={language.code}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => handleAnswer(language)}
                  disabled={isTransitioning}
                  sx={{
                    py: 2,
                    textTransform: 'none',
                    bgcolor: 'background.paper',
                  }}
                >
                  {language.name}
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
              Incorrect! {currentLanguage.name} is correct.
            </Alert>
          )}
        </Box>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handlePrevious}
          disabled={historyIndex <= 0}
        >
          Previous
        </Button>
        <Button
          endIcon={<ArrowForwardIcon />}
          onClick={handleNext}
        >
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default LanguageTrainer;
