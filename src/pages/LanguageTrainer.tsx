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

const getEncouragement = () => {
  const messages = ['Great job! 🎯', 'Perfect! ⭐', 'Excellent! 🏆', 'Amazing! 🌟'];
  return messages[Math.floor(Math.random() * messages.length)];
};

const LanguageTrainer = () => {
  const [currentLanguage, setCurrentLanguage] = useState<Language | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(0);
  const [encouragement, setEncouragement] = useState('');
  const [options, setOptions] = useState<Language[]>([]);
  const [history, setHistory] = useState<Language[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [wrongAnswer, setWrongAnswer] = useState<string | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [seenLanguages, setSeenLanguages] = useState<Set<string>>(new Set());

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
      setSeenLanguages(prev => new Set(prev).add(newLanguage.name));
      setHistory(prev => {
        const newHistory = [...prev.slice(0, historyIndex + 1), newLanguage];
        setHistoryIndex(newHistory.length - 1);
        return newHistory;
      });
    }
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handleCorrectGuess = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    // Only increment streak if:
    // 1. We're at the latest point in history (not reviewing)
    // 2. This is a new language we haven't seen before
    const isReviewing = historyIndex < history.length - 1;
    if (!isReviewing && currentLanguage && !seenLanguages.has(currentLanguage.name)) {
      setStreak(prev => prev + 1);
    }
    
    // Always show encouragement on correct answer
    setEncouragement(getEncouragement());
    setShowCorrect(true);
    
    // Wait a moment to show the correct answer highlight
    setTimeout(() => {
      selectNewLanguage();
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
    // Reset after 2 seconds
    setTimeout(() => {
      setWrongAnswer(null);
      setShowCorrect(false);
      selectNewLanguage();
      setIsTransitioning(false);
    }, 2000);
  };

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
            Streak: {streak}
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
                  onClick={() => {
                    if (language.name === currentLanguage?.name) {
                      handleCorrectGuess();
                    } else {
                      handleIncorrectGuess(language.name);
                    }
                  }}
                  disabled={isTransitioning}
                  sx={{
                    height: '100%',
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
                        : 'background.paper',
                    color: (wrongAnswer === language.name || (showCorrect && language.name === currentLanguage?.name))
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
                    transition: 'all 0.3s ease-in-out',
                    transform: wrongAnswer === language.name || (showCorrect && language.name === currentLanguage?.name)
                      ? 'scale(1.05)'
                      : 'scale(1)',
                    boxShadow: wrongAnswer === language.name || (showCorrect && language.name === currentLanguage?.name)
                      ? '0 4px 20px rgba(0, 0, 0, 0.2)'
                      : 'none',
                    border: wrongAnswer === language.name
                      ? '2px solid #d32f2f'
                      : (showCorrect && language.name === currentLanguage?.name)
                        ? '2px solid #2e7d32'
                        : '2px solid transparent',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                    '@media (hover: none)': {
                      '&:hover': {
                        bgcolor: 'background.paper'
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
