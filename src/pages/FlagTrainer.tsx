import { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Grid, 
  Typography 
} from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { countries } from '../data/flags';

interface Country {
  name: string;
  code: string;
  hints: {
    fact1: string;
    fact2: string;
    fact3: string;
  };
  quickTip: string;
}

const getEncouragement = () => {
  const messages = ['Great job! 🎯', 'Perfect! ⭐', 'Excellent! 🏆', 'Amazing! 🌟'];
  return messages[Math.floor(Math.random() * messages.length)];
};

const FlagTrainer = () => {
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(0);
  const [encouragement, setEncouragement] = useState('');
  const [options, setOptions] = useState<Country[]>([]);
  const [history, setHistory] = useState<Country[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [wrongAnswer, setWrongAnswer] = useState<string | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [seenFlags, setSeenFlags] = useState<Set<string>>(new Set());

  useEffect(() => {
    selectNewCountry();
  }, []);

  useEffect(() => {
    // Scroll to bottom whenever options change
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, [options]);

  const selectNewCountry = (addToHistory = true) => {
    let newCountry;
    do {
      newCountry = countries[Math.floor(Math.random() * countries.length)];
    } while (newCountry === currentCountry);
    
    // Get 4 random wrong answers
    const wrongOptions = countries
      .filter(c => c.name !== newCountry.name)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
    
    // Combine with correct answer and shuffle
    const allOptions = [...wrongOptions, newCountry]
      .sort(() => Math.random() - 0.5);
    
    setCurrentCountry(newCountry);
    setOptions(allOptions);
    setShowHint(false);
    setWrongAnswer(null);
    setShowCorrect(false);

    if (addToHistory) {
      setSeenFlags(prev => new Set(prev).add(newCountry.code));
      setHistory(prev => {
        const newHistory = [...prev.slice(0, historyIndex + 1), newCountry];
        setHistoryIndex(newHistory.length - 1);
        return newHistory;
      });
    }
  };

  const handleCorrectGuess = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setShowCorrect(true);  // Set this immediately
    
    // Only increment streak if:
    // 1. We're at the latest point in history (not reviewing)
    // 2. This is a new flag we haven't seen before
    const isReviewing = historyIndex < history.length - 1;
    if (!isReviewing && currentCountry && !seenFlags.has(currentCountry.code)) {
      setStreak(prev => prev + 1);
    }
    
    // Always show encouragement on correct answer
    setEncouragement(getEncouragement());
    
    // Wait a moment to show the correct answer highlight
    setTimeout(() => {
      selectNewCountry();
      setIsTransitioning(false);
    }, 1000);
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
      selectNewCountry();
      setIsTransitioning(false);
    }, 2000);
  };

  const goBack = () => {
    if (historyIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      const prevIndex = historyIndex - 1;
      const prevCountry = history[prevIndex];
      setHistoryIndex(prevIndex);
      
      // Get 4 random wrong answers
      const wrongOptions = countries
        .filter(c => c.name !== prevCountry.name)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
      
      // Combine with correct answer and shuffle
      const allOptions = [...wrongOptions, prevCountry]
        .sort(() => Math.random() - 0.5);
      
      setCurrentCountry(prevCountry);
      setOptions(allOptions);
      setShowHint(false);
      setEncouragement('');
      setWrongAnswer(null);
      setShowCorrect(false);
      setIsTransitioning(false);
    }
  };

  const goForward = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    if (historyIndex < history.length - 1) {
      // Go to next item in history
      const nextIndex = historyIndex + 1;
      const nextCountry = history[nextIndex];
      setHistoryIndex(nextIndex);
      
      // Get 4 random wrong answers
      const wrongOptions = countries
        .filter(c => c.name !== nextCountry.name)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);
      
      // Combine with correct answer and shuffle
      const allOptions = [...wrongOptions, nextCountry]
        .sort(() => Math.random() - 0.5);
      
      setCurrentCountry(nextCountry);
      setOptions(allOptions);
      setShowHint(false);
      setEncouragement('');
      setWrongAnswer(null);
      setShowCorrect(false);
    } else {
      // Generate new country
      selectNewCountry();
    }
    setIsTransitioning(false);
  };

  const handleShowHint = () => {
    setShowHint(true);
  };

  if (!currentCountry) return null;

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
        minHeight: '100vh', // Ensure minimum full viewport height
        py: 4, // Consistent padding
      }}
    >
      {/* Header Section */}
      <Box 
        sx={{ 
          width: '100%',
          textAlign: 'center',
          mb: 2,
          height: '120px', // Fixed height for header
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
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
          Flag Trainer
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={goBack}
            disabled={historyIndex <= 0 || isTransitioning}
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
            disabled={isTransitioning}
            size="small"
            sx={{
              minWidth: '100px',
            }}
          >
            Skip
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Grid 
        container 
        spacing={{ xs: 2, md: 4 }}
        sx={{ 
          width: '100%',
          justifyContent: 'center',
          flex: 1, // Take remaining space
        }}
      >
        {/* Flag Card */}
        <Grid item xs={12} md={8}>
          <Card 
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              minHeight: '500px', // Minimum height for flag card
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
              <Box sx={{ 
                width: '100%', 
                mb: 2,
                minHeight: '48px', // Fixed height for hint button/content
              }}>
                {!showHint && (
                  <Button
                    startIcon={<LightbulbIcon />}
                    onClick={handleShowHint}
                    variant="outlined"
                    color="primary"
                    fullWidth
                  >
                    Show Facts
                  </Button>
                )}
                {showHint && currentCountry && (
                  <Card sx={{ p: 2, bgcolor: 'background.paper' }}>
                    <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                      <Typography paragraph sx={{ mb: 1 }}>
                        {currentCountry.hints.fact1}
                      </Typography>
                      <Typography paragraph sx={{ mb: 1 }}>
                        {currentCountry.hints.fact2}
                      </Typography>
                      <Typography>
                        {currentCountry.hints.fact3}
                      </Typography>
                    </CardContent>
                  </Card>
                )}
              </Box>

              <Box 
                sx={{ 
                  width: '100%',
                  bgcolor: 'background.paper',
                  p: { xs: 2, md: 4 },
                  borderRadius: 2,
                  textAlign: 'center',
                  border: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '300px', // Fixed minimum height for flag container
                  maxHeight: '300px', // Fixed maximum height for flag container
                }}
              >
                <img
                  src={`./flags/${currentCountry.code.toLowerCase()}.png`}
                  alt={`Flag of ${currentCountry.name}`}
                  onError={(e) => {
                    console.error(`Failed to load flag for ${currentCountry.name}`);
                    e.currentTarget.src = `https://flagcdn.com/w640/${currentCountry.code.toLowerCase()}.png`;
                  }}
                  style={{
                    maxWidth: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  }}
                />
              </Box>

              <Box sx={{ 
                minHeight: '48px', // Fixed height for encouragement message
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
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
              '& .MuiGrid-item': {
                pl: '16px !important',
                pr: '16px !important',
                width: { xs: '100%', sm: '50%', md: '33.333%' },
                maxWidth: { md: '250px' },
                height: '48px', // Fixed height for option buttons
              }
            }}
          >
            {options.map((country) => (
              <Grid 
                item 
                key={country.name}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    if (country.name === currentCountry?.name) {
                      handleCorrectGuess();
                    } else {
                      handleIncorrectGuess(country.name);
                    }
                  }}
                  disabled={isTransitioning}
                  sx={{
                    py: 2,
                    bgcolor: wrongAnswer === country.name 
                      ? 'error.main' 
                      : (showCorrect && country.name === currentCountry?.name)
                        ? 'success.main'
                        : 'background.paper',
                    color: (wrongAnswer === country.name || (showCorrect && country.name === currentCountry?.name))
                      ? 'white'
                      : 'text.primary',
                    '&:hover': {
                      bgcolor: wrongAnswer === country.name 
                        ? 'error.main' 
                        : (showCorrect && country.name === currentCountry?.name)
                          ? 'success.main'
                          : 'background.paper',
                      '@media (hover: none)': {
                        bgcolor: wrongAnswer === country.name 
                          ? 'error.main' 
                          : (showCorrect && country.name === currentCountry?.name)
                            ? 'success.main'
                            : 'background.paper'
                      }
                    },
                    '&:active': {
                      bgcolor: wrongAnswer === country.name 
                        ? 'error.main' 
                        : (showCorrect && country.name === currentCountry?.name)
                          ? 'success.main'
                          : 'primary.main',
                      color: 'white',
                    },
                    transition: 'all 0.3s ease-in-out',
                    transform: wrongAnswer === country.name || (showCorrect && country.name === currentCountry?.name)
                      ? 'scale(1.05)'
                      : 'scale(1)',
                    boxShadow: wrongAnswer === country.name || (showCorrect && country.name === currentCountry?.name)
                      ? '0 4px 20px rgba(0, 0, 0, 0.2)'
                      : 'none',
                    border: wrongAnswer === country.name
                      ? '2px solid #d32f2f'
                      : (showCorrect && country.name === currentCountry?.name)
                        ? '2px solid #2e7d32'
                        : '2px solid transparent',
                    touchAction: 'manipulation',
                    WebkitTapHighlightColor: 'transparent',
                    userSelect: 'none',
                    '-webkit-user-select': 'none',
                    '-webkit-touch-callout': 'none',
                    '@media (hover: none)': {
                      '&:hover': {
                        bgcolor: wrongAnswer === country.name 
                          ? 'error.main' 
                          : (showCorrect && country.name === currentCountry?.name)
                            ? 'success.main'
                            : 'background.paper'
                      }
                    }
                  }}
                >
                  {country.name}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FlagTrainer;
