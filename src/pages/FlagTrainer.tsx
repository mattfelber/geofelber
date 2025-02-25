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
  const [bestStreak, setBestStreak] = useState(0);  
  const [encouragement, setEncouragement] = useState('');
  const [options, setOptions] = useState<Country[]>([]);
  const [history, setHistory] = useState<Country[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [wrongAnswer, setWrongAnswer] = useState<string | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load saved streaks from localStorage
  useEffect(() => {
    const savedStreak = localStorage.getItem('flagStreak');
    const savedBestStreak = localStorage.getItem('flagBestStreak');
    
    if (savedStreak) {
      setStreak(parseInt(savedStreak, 10));
    }
    if (savedBestStreak) {
      setBestStreak(parseInt(savedBestStreak, 10));
    }
  }, []);

  // Save streaks to localStorage
  useEffect(() => {
    localStorage.setItem('flagStreak', streak.toString());
    if (streak > bestStreak) {
      setBestStreak(streak);
      localStorage.setItem('flagBestStreak', streak.toString());
    }
  }, [streak, bestStreak]);

  useEffect(() => {
    selectNewCountry();
  }, []);

  useEffect(() => {
    // Scroll to bottom whenever options change
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, [options]);

  useEffect(() => {
    console.log('Debug - streak changed to:', streak);
  }, [streak]);

  const getStreakMessage = (streak: number): string => {
    if (streak >= 25) return 'Legendary! 🏆';
    if (streak >= 20) return 'Unstoppable! 🌟';
    if (streak >= 15) return 'Amazing! ⭐';
    if (streak >= 10) return 'Fantastic! 🎯';
    if (streak >= 5) return 'Great job! 🔥';
    return getEncouragement();
  };

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
    setShowCorrect(true);
    
    // Increment streak on every correct answer
    const newStreak = streak + 1;
    setStreak(newStreak);
    setEncouragement(getStreakMessage(newStreak));
    
    setTimeout(() => {
      selectNewCountry();
      setIsTransitioning(false);
    }, 1000);
  };

  const handleIncorrectGuess = (selectedName: string) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setStreak(0); // Reset streak on wrong answer
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
        gap: { xs: 1, md: 2 },
        minHeight: '100vh',
        py: { xs: 2, md: 3 },
        px: { xs: 2, md: 0 },
        position: 'relative',
      }}
    >
      {/* Header Section with reduced height and margin */}
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
          Flag Trainer
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            gap: 2,
            flexWrap: 'nowrap',
          }}
        >
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={goBack}
            disabled={historyIndex <= 0 || isTransitioning}
            size="small"
            sx={{
              minWidth: { xs: '80px', sm: '100px' },
              height: '36px',
              flexShrink: 0,
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
              gap: 1,
              minWidth: '150px',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Box component="span">Streak: {streak}</Box>
            {bestStreak > 0 && (
              <Box 
                component="span" 
                sx={{ 
                  fontSize: '0.8em',
                  opacity: 0.8,
                  display: 'flex',
                  alignItems: 'center',
                  '&::before': {
                    content: '"•"',
                    mx: 1,
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
            disabled={isTransitioning}
            size="small"
            sx={{
              minWidth: { xs: '80px', sm: '100px' },
              height: '36px',
              flexShrink: 0,
            }}
          >
            Skip
          </Button>
        </Box>
      </Box>

      {/* Main Content with fixed heights */}
      <Grid 
        container 
        spacing={3}
        sx={{ 
          width: '100%',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        {/* Flag Card */}
        <Grid item xs={12} md={8}>
          <Card 
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              minHeight: { xs: '450px', md: '500px' },
              maxHeight: { xs: '600px', md: '700px' },
            }}
          >
            <CardContent 
              sx={{ 
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
                p: { xs: 2, md: 3 },
                height: '100%',
              }}
            >
              {/* Facts Section with fixed height */}
              <Box sx={{ 
                width: '100%',
                height: { xs: '120px', md: '150px' },
                mb: 2,
                overflow: 'hidden',
              }}>
                {!showHint ? (
                  <Button
                    startIcon={<LightbulbIcon />}
                    onClick={handleShowHint}
                    variant="outlined"
                    color="primary"
                    fullWidth
                    sx={{ height: '48px' }}
                  >
                    Show Facts
                  </Button>
                ) : (
                  <Card 
                    sx={{ 
                      height: '100%',
                      overflow: 'auto',
                      bgcolor: 'background.paper',
                      '&::-webkit-scrollbar': {
                        width: '8px',
                      },
                      '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                        borderRadius: '4px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background: '#888',
                        borderRadius: '4px',
                        '&:hover': {
                          background: '#555',
                        },
                      },
                    }}
                  >
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
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

              {/* Flag Container with fixed height */}
              <Box 
                sx={{ 
                  width: '100%',
                  bgcolor: 'background.paper',
                  p: { xs: 2, md: 3 },
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: { xs: '200px', sm: '250px', md: '300px' },
                  flexShrink: 0,
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
                    maxHeight: '100%',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  }}
                />
              </Box>

              {/* Encouragement Message with fixed height */}
              <Box sx={{ 
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
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

        {/* Buttons Grid with fixed heights */}
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
                height: '64px',
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
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                    lineHeight: 1.2,
                    padding: '8px 16px',
                    whiteSpace: 'normal',
                    wordBreak: 'break-word',
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
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                    },
                    '&:active': {
                      bgcolor: wrongAnswer === country.name 
                        ? 'error.main' 
                        : (showCorrect && country.name === currentCountry?.name)
                          ? 'success.main'
                          : 'primary.main',
                      color: 'white',
                      transform: 'translateY(1px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                    transform: wrongAnswer === country.name || (showCorrect && country.name === currentCountry?.name)
                      ? 'scale(1.05)'
                      : 'scale(1)',
                    boxShadow: wrongAnswer === country.name || (showCorrect && country.name === currentCountry?.name)
                      ? '0 4px 20px rgba(0, 0, 0, 0.2)'
                      : '0 2px 4px rgba(0, 0, 0, 0.1)',
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
