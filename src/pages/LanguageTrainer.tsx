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
  alpha 
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
  const { user } = useAuth();
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
  const [sessionStart] = useState<Date>(new Date());
  const [sessionAttempts, setSessionAttempts] = useState(0);
  const [sessionCorrect, setSessionCorrect] = useState(0);

  // Load saved streaks from database
  useEffect(() => {
    if (user) {
      DatabaseService.getUserScore(user.id, 'language')
        .then((score) => {
          if (score) {
            setStreak(score.score);
            setBestStreak(score.best_streak);
          }
        })
        .catch(console.error);
    }
  }, [user]);

  // Save streaks to database
  useEffect(() => {
    if (user) {
      DatabaseService.updateUserScore(user.id, 'language', streak, bestStreak)
        .catch(console.error);
    }
  }, [streak, bestStreak, user]);

  useEffect(() => {
    selectNewLanguage();
  }, []);

  useEffect(() => {
    // Scroll to bottom whenever options change
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, [options]);

  useEffect(() => {
    // Scroll to bottom whenever hints are shown
    if (showHint) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }, [showHint]);

  const selectNewLanguage = (addToHistory = true) => {
    setIsTransitioning(true);
    let newLanguage;
    do {
      newLanguage = languages[Math.floor(Math.random() * languages.length)];
    } while (newLanguage === currentLanguage);
    
    // Get 4 random wrong answers
    const wrongOptions = languages
      .filter(c => c.name !== newLanguage.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    
    // Combine with correct answer and shuffle
    const allOptions = [...wrongOptions, newLanguage]
      .sort(() => Math.random() - 0.5);
    
    setCurrentLanguage(newLanguage);
    setOptions(allOptions);
    setShowHint(false);
    setWrongAnswer(null);
    setShowCorrect(false);

    if (addToHistory) {
      setHistory(prev => {
        const newHistory = [...prev.slice(0, historyIndex + 1), newLanguage];
        setHistoryIndex(newHistory.length - 1);
        return newHistory;
      });
    }
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleGuess = async (guess: Language) => {
    if (!currentLanguage || isTransitioning) return;
    
    setSessionAttempts(prev => prev + 1);
    const isCorrect = guess.name === currentLanguage.name;
    
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
        await DatabaseService.createLanguageAttempt(user.id, currentLanguage.code, isCorrect);
      } catch (error) {
        console.error('Failed to save language attempt:', error);
      }
    }

    // Add delay before transitioning
    setTimeout(() => {
      setShowCorrect(false);
      setWrongAnswer(null);
      selectNewLanguage();
    }, 500);
  };

  // Save practice session when component unmounts
  useEffect(() => {
    return () => {
      if (user && sessionAttempts > 0) {
        const sessionDuration = Math.round((new Date().getTime() - sessionStart.getTime()) / 1000);
        DatabaseService.createPracticeSession(
          user.id,
          'language',
          sessionAttempts,
          sessionCorrect,
          sessionDuration
        ).catch(console.error);
      }
    };
  }, [user, sessionAttempts, sessionCorrect, sessionStart]);

  const goBack = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      const prevLanguage = history[prevIndex];
      setHistoryIndex(prevIndex);
      
      // Get 4 random wrong answers
      const wrongOptions = languages
        .filter(lang => lang.name !== prevLanguage.name)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
      
      // Combine with correct answer and shuffle
      const allOptions = [...wrongOptions, prevLanguage]
        .sort(() => Math.random() - 0.5);
      
      setCurrentLanguage(prevLanguage);
      setOptions(allOptions);
      setShowHint(false);
      setEncouragement('');
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      // Go to next item in history
      const nextIndex = historyIndex + 1;
      const nextLanguage = history[nextIndex];
      setHistoryIndex(nextIndex);
      
      // Get 4 random wrong answers
      const wrongOptions = languages
        .filter(lang => lang.name !== nextLanguage.name)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
      
      // Combine with correct answer and shuffle
      const allOptions = [...wrongOptions, nextLanguage]
        .sort(() => Math.random() - 0.5);
      
      setCurrentLanguage(nextLanguage);
      setOptions(allOptions);
      setShowHint(false);
      setEncouragement('');
    } else {
      // Generate new language
      selectNewLanguage();
    }
  };

  if (!currentLanguage) return null;

  return (
    <Box 
      sx={{ 
        width: '100%',
        maxWidth: '1200px',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 1, md: 2 },
        py: { xs: 1, md: 2 },
        px: { xs: 2, md: 0 },
        position: 'relative',
        boxSizing: 'border-box',
        overflow: 'hidden'
      }}
    >
      {/* Header Section */}
      <Box 
        sx={{ 
          width: '100%',
          textAlign: 'center',
          height: { xs: '80px', md: '100px' },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          mb: { xs: 0.5, md: 1 },
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(45deg, #58cc02 30%, #ffd900 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
            fontSize: { xs: '1.75rem', md: '2.125rem' },
          }}
        >
          Language Trainer
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: { xs: 1, sm: 2 }, 
          mb: { xs: 1, sm: 2 },
          width: '100%',
          px: { xs: 0.5, sm: 2 },
        }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={goBack}
            disabled={historyIndex <= 0}
            size="small"
            sx={{
              minWidth: { xs: '60px', sm: '100px' },
              height: '36px',
              flexShrink: 0,
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              px: { xs: 1, sm: 2 },
              '& .MuiButton-startIcon': {
                mr: { xs: 0, sm: 1 },
              },
              '& .MuiButton-startIcon > *:nth-of-type(1)': {
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
              },
            }}
          >
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>Back</Box>
          </Button>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ 
              px: { xs: 1, sm: 2 },
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 0.5, sm: 1 },
              minWidth: { xs: '120px', sm: '150px' },
              justifyContent: 'center',
              flexShrink: 0,
              fontSize: { xs: '0.875rem', sm: '1rem' },
            }}
          >
            <Box component="span">Streak: {streak}</Box>
            {streak > 0 && (
              <Box 
                component="span" 
                sx={{ 
                  fontSize: { xs: '0.75rem', sm: '0.8em' },
                  opacity: 0.8,
                  display: 'flex',
                  alignItems: 'center',
                  '&::before': {
                    content: '"•"',
                    mx: { xs: 0.5, sm: 1 },
                  }
                }}
              >
                Best: {bestStreak}
              </Box>
            )}
          </Typography>
          <Button
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
            onClick={goForward}
            size="small"
            sx={{
              minWidth: { xs: '60px', sm: '100px' },
              height: '36px',
              flexShrink: 0,
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              px: { xs: 1, sm: 2 },
              '& .MuiButton-endIcon': {
                ml: { xs: 0, sm: 1 },
              },
              '& .MuiButton-endIcon > *:nth-of-type(1)': {
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
              },
            }}
          >
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>{historyIndex < history.length - 1 ? 'Forward' : 'Skip'}</Box>
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Grid 
        container 
        spacing={{ xs: 1, md: 2 }}
        sx={{ 
          width: '100%',
          justifyContent: 'center',
          mb: { xs: 1, md: 1 },
        }}
      >
        {/* Sample Text Card */}
        <Grid item xs={12} md={8}>
          <Card 
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CardContent 
              sx={{ 
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 2, md: 2 },
                p: { xs: 2, md: 2 },
              }}
            >
              <Box 
                sx={{ 
                  width: '100%',
                  bgcolor: 'background.paper',
                  p: { xs: 2, md: 2 },
                  borderRadius: 2,
                  textAlign: 'center',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontSize: { xs: '1.25rem', md: '1.75rem' },
                    lineHeight: 1.6,
                    letterSpacing: '0.02em',
                  }}
                >
                  {currentLanguage.sample}
                </Typography>
              </Box>

              <Box 
                sx={{ 
                  display: 'flex',
                  gap: 2,
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}
              >
                <Tooltip title="Need a hint?">
                  <IconButton
                    onClick={() => setShowHint(!showHint)}
                    sx={{ 
                      color: 'warning.main',
                      bgcolor: (theme) => alpha(theme.palette.warning.main, 0.1),
                      '&:hover': {
                        bgcolor: (theme) => alpha(theme.palette.warning.main, 0.2),
                      }
                    }}
                  >
                    <LightbulbIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              <Collapse in={showHint} sx={{ width: '100%' }}>
                <Paper 
                  sx={{ 
                    p: { xs: 2, md: 1.5 },
                    bgcolor: (theme) => alpha(theme.palette.warning.main, 0.1),
                  }}
                >
                  <Box 
                    sx={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1,
                    }}
                  >
                    <Typography variant="h6" color="warning.main">
                      Hints
                    </Typography>
                    <IconButton 
                      size="small" 
                      onClick={() => setShowHint(false)}
                      sx={{ color: 'warning.main' }}
                    >
                      <CloseIcon />
                    </IconButton>
                  </Box>
                  <Typography paragraph sx={{ mb: 1 }}>
                    <strong>Writing Style:</strong> {currentLanguage.hints.writing}
                  </Typography>
                  <Typography paragraph sx={{ mb: 1 }}>
                    <strong>Unique Features:</strong> {currentLanguage.hints.unique}
                  </Typography>
                  <Typography paragraph sx={{ mb: 1 }}>
                    <strong>Examples:</strong> {currentLanguage.hints.examples}
                  </Typography>
                  <Typography paragraph sx={{ mb: 1 }}>
                    <strong>Regions:</strong> {currentLanguage.hints.regions}
                  </Typography>
                </Paper>
              </Collapse>

              {encouragement && (
                <Typography 
                  variant="h6" 
                  color="primary"
                  sx={{ 
                    fontWeight: 700,
                    animation: 'fadeIn 0.5s ease-in',
                    '@keyframes fadeIn': {
                      '0%': {
                        opacity: 0,
                        transform: 'translateY(-20px)',
                      },
                      '100%': {
                        opacity: 1,
                        transform: 'translateY(0)',
                      },
                    },
                    mt: 2
                  }}
                >
                  {encouragement}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Buttons Grid */}
        <Grid item xs={12} md={8}>
          <Grid 
            container 
            spacing={2} 
            sx={{ 
              width: '100%',
              mx: 0,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              mt: { xs: 1, sm: 2, md: 1 },
              px: { xs: 1, sm: 2 },
              boxSizing: 'border-box',
              '& .MuiGrid-item': {
                pl: { xs: '8px !important', sm: '16px !important' },
                pr: { xs: '8px !important', sm: '16px !important' },
                width: { xs: '100%', sm: '50%', md: '33.333%' },
                maxWidth: { xs: '100%', md: '250px' },
                height: { xs: '56px', sm: '64px', md: '52px' },
                mb: { xs: 1, sm: 2, md: 1 },
                boxSizing: 'border-box',
              }
            }}
          >
            {options.map((language) => (
              <Grid 
                item 
                key={language.name}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleGuess(language)}
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
                    bgcolor: wrongAnswer === language.name 
                      ? 'error.main' 
                      : (showCorrect && language.name === currentLanguage?.name)
                        ? 'success.main'
                        : 'primary.main',
                    color: 'white',
                    '&:hover': {
                      bgcolor: wrongAnswer === language.name 
                        ? 'error.dark' 
                        : (showCorrect && language.name === currentLanguage?.name)
                          ? 'success.dark'
                          : 'primary.dark',
                    },
                    '&:active': {
                      bgcolor: wrongAnswer === language.name 
                        ? 'error.dark' 
                        : (showCorrect && language.name === currentLanguage?.name)
                          ? 'success.dark'
                          : 'primary.dark',
                    },
                    transition: 'all 0.3s ease-in-out',
                    transform: wrongAnswer === language.name || (showCorrect && language.name === currentLanguage?.name)
                      ? 'scale(1.05)'
                      : 'scale(1)',
                    boxShadow: wrongAnswer === language.name || (showCorrect && language.name === currentLanguage?.name)
                      ? '0 4px 20px rgba(0, 0, 0, 0.2)'
                      : 'none',
                    border: 'none',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                    '@media (hover: none)': {
                      '&:hover': {
                        bgcolor: wrongAnswer === language.name 
                          ? 'error.main' 
                          : (showCorrect && language.name === currentLanguage?.name)
                            ? 'success.main'
                            : 'primary.main',
                      }
                    }
                  }}
                >
                  {language.name}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LanguageTrainer;
