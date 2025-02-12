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

interface Country {
  name: string;
  code: string;
  hints: {
    colors: string;
    symbols: string;
    pattern: string;
  };
  quickTip: string;
}

const countries: Country[] = [
  {
    name: 'Brazil',
    code: 'br',
    hints: {
      colors: 'Green background with yellow diamond',
      symbols: 'Blue circle with stars and "Ordem e Progresso" banner',
      pattern: 'Diamond shape in center'
    },
    quickTip: 'Look for the distinctive yellow diamond on green background'
  },
  {
    name: 'Japan',
    code: 'jp',
    hints: {
      colors: 'White background with red circle',
      symbols: 'Single red circle (sun)',
      pattern: 'Simple, centered design'
    },
    quickTip: 'Red circle on white background - very minimal design'
  },
  {
    name: 'South Korea',
    code: 'kr',
    hints: {
      colors: 'White background with red and blue taegeuk',
      symbols: 'Taegeuk symbol',
      pattern: 'Taegeuk symbol in center'
    },
    quickTip: 'Look for the taegeuk symbol on white background'
  },
  {
    name: 'Thailand',
    code: 'th',
    hints: {
      colors: 'Red, white, and blue stripes',
      symbols: 'None',
      pattern: 'Five horizontal stripes'
    },
    quickTip: 'Red, white, and blue stripes - very distinctive'
  },
  {
    name: 'Vietnam',
    code: 'vn',
    hints: {
      colors: 'Red background with yellow star',
      symbols: 'Yellow five-pointed star',
      pattern: 'Star in center'
    },
    quickTip: 'Look for the yellow star on red background'
  },
  {
    name: 'Indonesia',
    code: 'id',
    hints: {
      colors: 'Red and white stripes',
      symbols: 'None',
      pattern: 'Two horizontal stripes'
    },
    quickTip: 'Red and white stripes - very simple design'
  },
  {
    name: 'Malaysia',
    code: 'my',
    hints: {
      colors: 'Blue, white, and red stripes',
      symbols: 'Crescent moon and 14-pointed star',
      pattern: 'Stripes with crescent moon and star'
    },
    quickTip: 'Look for the crescent moon and star on blue background'
  },
  {
    name: 'Singapore',
    code: 'sg',
    hints: {
      colors: 'Red and white',
      symbols: 'Crescent moon and five stars',
      pattern: 'Crescent moon and stars in center'
    },
    quickTip: 'Look for the crescent moon and stars on red background'
  },
  {
    name: 'Philippines',
    code: 'ph',
    hints: {
      colors: 'White, blue, red, and yellow',
      symbols: 'White triangle with blue, red, and yellow stripes',
      pattern: 'Triangle with stripes'
    },
    quickTip: 'Look for the white triangle with stripes'
  },
  {
    name: 'Australia',
    code: 'au',
    hints: {
      colors: 'Blue, white, and red',
      symbols: 'Union Jack and Southern Cross',
      pattern: 'Union Jack in upper left corner'
    },
    quickTip: 'Look for the Union Jack and Southern Cross on blue background'
  },
  {
    name: 'New Zealand',
    code: 'nz',
    hints: {
      colors: 'Blue, white, and red',
      symbols: 'Union Jack and Southern Cross',
      pattern: 'Union Jack in upper left corner'
    },
    quickTip: 'Look for the Union Jack and Southern Cross on blue background'
  },
  {
    name: 'South Africa',
    code: 'za',
    hints: {
      colors: 'Red, white, blue, green, yellow, and black',
      symbols: 'Six colors',
      pattern: 'Six colors in a "Y" shape'
    },
    quickTip: 'Look for the six colors in a "Y" shape'
  },
  {
    name: 'Kenya',
    code: 'ke',
    hints: {
      colors: 'Black, red, and green',
      symbols: 'Maasai spears and shield',
      pattern: 'Spears and shield in center'
    },
    quickTip: 'Look for the Maasai spears and shield on black background'
  },
  {
    name: 'Nigeria',
    code: 'ng',
    hints: {
      colors: 'Green and white',
      symbols: 'Eagle',
      pattern: 'Eagle in center'
    },
    quickTip: 'Look for the eagle on green background'
  },
  {
    name: 'Ghana',
    code: 'gh',
    hints: {
      colors: 'Red, gold, and green',
      symbols: 'Black star',
      pattern: 'Black star in center'
    },
    quickTip: 'Look for the black star on red background'
  },
];

const getEncouragement = () => {
  const messages = ['Great job! 🎯', 'Perfect! ⭐', 'Excellent! 🏆', 'Amazing! 🌟'];
  return messages[Math.floor(Math.random() * messages.length)];
};

const FlagTrainer = () => {
  const [currentCountry, setCurrentCountry] = useState<Country | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const generateQuestion = () => {
    setCurrentCountry(null);
    setShowResult(false);
    setShowFeedback(false);
    setSelectedAnswer('');
    
    setTimeout(() => {
      const randomCountry = countries[Math.floor(Math.random() * countries.length)];
      const wrongOptions = countries
        .filter(country => country.name !== randomCountry.name)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(country => country.name);
      
      const allOptions = [...wrongOptions, randomCountry.name].sort(() => 0.5 - Math.random());
      
      setCurrentCountry(randomCountry);
      setOptions(allOptions);
      setShowHint(false);
    }, 50);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (currentCountry) {
      setShowResult(true);
      setShowFeedback(true);
      setTotalQuestions(prev => prev + 1);
      if (answer === currentCountry.name) {
        setScore(prev => prev + 1);
        setStreak(prev => prev + 1);
      } else {
        setStreak(0);
      }
      setTimeout(() => {
        generateQuestion();
      }, 2000);
    }
  };

  useEffect(() => {
    generateQuestion();
  }, []);

  return (
    <Box sx={{ 
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      bgcolor: 'background.default',
      py: { xs: 2, sm: 4 }
    }}>
      <Box sx={{ 
        width: '100%',
        maxWidth: '800px',
        mx: 'auto',
        px: { xs: 2, sm: 4 }
      }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            mb: { xs: 3, sm: 5 },
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 }
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              color: 'primary.main',
              fontSize: { xs: '1.75rem', sm: '2.5rem' },
              fontWeight: 600
            }}
          >
            Flag Trainer
          </Typography>
          <Box 
            sx={{ 
              display: 'flex', 
              gap: 3,
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            <Paper 
              sx={{ 
                px: { xs: 3, sm: 4 }, 
                py: { xs: 1.5, sm: 2 }, 
                flex: { xs: 1, sm: 'auto' },
                minWidth: { sm: '160px' },
                textAlign: 'center',
                bgcolor: 'primary.main', 
                color: 'white',
                borderRadius: 2
              }}
            >
              <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.3rem' } }}>
                Score: {score}/{totalQuestions}
              </Typography>
            </Paper>
            <Paper 
              sx={{ 
                px: { xs: 3, sm: 4 }, 
                py: { xs: 1.5, sm: 2 }, 
                flex: { xs: 1, sm: 'auto' },
                minWidth: { sm: '160px' },
                textAlign: 'center',
                bgcolor: 'secondary.main', 
                color: 'white',
                borderRadius: 2
              }}
            >
              <Typography variant="h6" sx={{ fontSize: { xs: '1.1rem', sm: '1.3rem' } }}>
                Streak: {streak} 🔥
              </Typography>
            </Paper>
          </Box>
        </Box>

        {currentCountry && (
          <Card 
            elevation={4} 
            sx={{ 
              borderRadius: 3,
              bgcolor: 'background.paper',
              boxShadow: theme => `0 8px 32px ${alpha(theme.palette.primary.main, 0.1)}`
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 4 } }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: 3 
              }}>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    color: 'text.primary',
                    fontSize: { xs: '1.25rem', sm: '1.75rem' },
                    fontWeight: 500
                  }}
                >
                  Which country's flag is this?
                </Typography>
                <Tooltip title={showHint ? "Hide hint" : "Show hint"}>
                  <IconButton 
                    onClick={() => setShowHint(!showHint)}
                    sx={{ 
                      color: showHint ? 'secondary.main' : 'text.secondary',
                      '&:hover': { color: 'secondary.main' }
                    }}
                  >
                    {showHint ? <CloseIcon /> : <LightbulbIcon />}
                  </IconButton>
                </Tooltip>
              </Box>

              <Collapse in={showHint}>
                <Paper 
                  sx={{ 
                    p: { xs: 2, sm: 3 }, 
                    mb: 4, 
                    bgcolor: alpha('#fff', 0.6),
                    border: '1px solid',
                    borderColor: 'secondary.main',
                    borderRadius: 2
                  }}
                >
                  <Typography variant="subtitle1" color="secondary.main" gutterBottom>
                    Flag characteristics:
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {currentCountry.hints.colors}
                  </Typography>
                  <Typography variant="body1">
                    {currentCountry.hints.symbols}
                  </Typography>
                </Paper>
              </Collapse>
              
              <Box 
                sx={{ 
                  display: 'flex',
                  justifyContent: 'center',
                  mb: { xs: 3, sm: 4 }
                }}
              >
                <img 
                  src={`https://flagcdn.com/${currentCountry.code.toLowerCase()}.svg`}
                  alt={`Flag of ${currentCountry.name}`}
                  style={{ 
                    width: '100%',
                    maxWidth: '400px',
                    height: 'auto',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                />
              </Box>

              <Grid 
                container 
                spacing={2}
                sx={{ 
                  maxWidth: '700px', 
                  mx: 'auto',
                  mt: { xs: 1, sm: 2 }
                }}
              >
                {options.map((option) => (
                  <Grid item xs={12} sm={6} key={option}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={() => !showResult && handleAnswer(option)}
                      disabled={showResult}
                      sx={{
                        py: { xs: 1.5, sm: 2.5 },
                        fontSize: { xs: '1rem', sm: '1.2rem' },
                        borderRadius: 2,
                        textTransform: 'none',
                        bgcolor: showResult
                          ? option === currentCountry.name
                            ? 'success.main'
                            : option === selectedAnswer
                              ? 'error.main'
                              : 'primary.main'
                          : 'primary.main',
                        '&:hover': {
                          bgcolor: showResult
                            ? option === currentCountry.name
                              ? 'success.dark'
                              : option === selectedAnswer
                                ? 'error.dark'
                                : 'primary.dark'
                            : 'primary.dark'
                        }
                      }}
                    >
                      {option}
                    </Button>
                  </Grid>
                ))}
              </Grid>

              <Collapse in={showFeedback && showResult}>
                <Paper 
                  sx={{ 
                    p: { xs: 2, sm: 3 },
                    mt: { xs: 2, sm: 3 },
                    textAlign: 'center',
                    bgcolor: selectedAnswer === currentCountry?.name ? 'success.main' : 'error.main',
                    color: 'white',
                    borderRadius: 2,
                    fontSize: { xs: '1.1rem', sm: '1.3rem' }
                  }}
                >
                  <Typography variant="h6">
                    {selectedAnswer === currentCountry?.name 
                      ? getEncouragement()
                      : currentCountry?.quickTip
                    }
                  </Typography>
                </Paper>
              </Collapse>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default FlagTrainer;
