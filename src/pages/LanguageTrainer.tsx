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

  useEffect(() => {
    selectNewLanguage();
  }, []);

  const selectNewLanguage = (addToHistory = true) => {
    let newLanguage;
    do {
      newLanguage = languages[Math.floor(Math.random() * languages.length)];
    } while (newLanguage === currentLanguage);
    
    // Get 4 random wrong answers
    const wrongOptions = languages
      .filter(lang => lang.name !== newLanguage.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    
    // Combine with correct answer and shuffle
    const allOptions = [...wrongOptions, newLanguage]
      .sort(() => Math.random() - 0.5);
    
    setCurrentLanguage(newLanguage);
    setOptions(allOptions);
    setShowHint(false);

    if (addToHistory) {
      // Add to history and update index
      setHistory(prev => {
        const newHistory = [...prev.slice(0, historyIndex + 1), newLanguage];
        setHistoryIndex(newHistory.length - 1);
        return newHistory;
      });
    }
  };

  const handleCorrectGuess = () => {
    setStreak(prev => prev + 1);
    setEncouragement(getEncouragement());
    selectNewLanguage();
  };

  const handleIncorrectGuess = () => {
    setStreak(0);
    setEncouragement('');
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
        gap: 4,
      }}
    >
      {/* Header Section */}
      <Box 
        sx={{ 
          width: '100%',
          textAlign: 'center',
          mb: 2,
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            background: 'linear-gradient(45deg, #58cc02 30%, #ffd900 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Language Trainer
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={goBack}
            disabled={historyIndex <= 0}
            size="small"
            sx={{
              minWidth: '100px',
            }}
          >
            Back
          </Button>
          <Typography 
            variant="h6" 
            color="text.secondary"
            sx={{ 
              px: 2,
              display: 'flex',
              alignItems: 'center',
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
              minWidth: '100px',
            }}
          >
            {historyIndex < history.length - 1 ? 'Forward' : 'Skip'}
          </Button>
        </Box>
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
            }}
          >
            {encouragement}
          </Typography>
        )}
      </Box>

      {/* Main Content */}
      <Grid 
        container 
        spacing={{ xs: 2, md: 4 }}
        sx={{ 
          width: '100%',
          justifyContent: 'center',
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
                gap: { xs: 2, md: 3 },
                p: { xs: 2, md: 4 },
              }}
            >
              <Box 
                sx={{ 
                  width: '100%',
                  bgcolor: 'background.paper',
                  p: { xs: 2, md: 4 },
                  borderRadius: 2,
                  textAlign: 'center',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontSize: { xs: '1.25rem', md: '2rem' },
                    lineHeight: 1.8,
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
                      },
                    }}
                  >
                    <LightbulbIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              <Collapse in={showHint} sx={{ width: '100%' }}>
                <Paper 
                  sx={{ 
                    p: 3,
                    bgcolor: (theme) => alpha(theme.palette.warning.main, 0.1),
                  }}
                >
                  <Box 
                    sx={{ 
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 2,
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
                  <Typography paragraph>
                    <strong>Writing Style:</strong> {currentLanguage.hints.writing}
                  </Typography>
                  <Typography paragraph>
                    <strong>Unique Features:</strong> {currentLanguage.hints.unique}
                  </Typography>
                  <Typography>
                    <strong>Examples:</strong> {currentLanguage.hints.examples}
                  </Typography>
                </Paper>
              </Collapse>
            </CardContent>
          </Card>
        </Grid>

        {/* Buttons Grid */}
        <Grid item xs={12} md={8}>
          <Grid 
            container 
            spacing={2} 
            sx={{ 
              justifyContent: 'center',
              width: '100%',
            }}
          >
            {options.map((language) => (
              <Grid item xs={12} sm={6} md={4} key={language.name}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    if (language.name === currentLanguage?.name) {
                      handleCorrectGuess();
                    } else {
                      handleIncorrectGuess();
                    }
                  }}
                  sx={{
                    py: 2,
                    bgcolor: 'background.paper',
                    color: 'text.primary',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                    },
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
