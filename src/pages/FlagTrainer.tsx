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
  const [showHint, setShowHint] = useState(false);
  const [streak, setStreak] = useState(0);
  const [encouragement, setEncouragement] = useState('');
  const [options, setOptions] = useState<Country[]>([]);
  const [history, setHistory] = useState<Country[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    selectNewCountry();
  }, []);

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

    if (addToHistory) {
      // Add to history and update index
      setHistory(prev => {
        const newHistory = [...prev.slice(0, historyIndex + 1), newCountry];
        setHistoryIndex(newHistory.length - 1);
        return newHistory;
      });
    }
  };

  const handleCorrectGuess = () => {
    setStreak(prev => prev + 1);
    setEncouragement(getEncouragement());
    selectNewCountry();
  };

  const handleIncorrectGuess = () => {
    setStreak(0);
    setEncouragement('');
  };

  const goBack = () => {
    if (historyIndex > 0) {
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
    }
  };

  const goForward = () => {
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
    } else {
      // Generate new country
      selectNewCountry();
    }
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
          Flag Trainer
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
        {/* Flag Card */}
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
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Box
                  component="img"
                  src={`https://flagcdn.com/w640/${currentCountry.code}.png`}
                  alt={`Flag of ${currentCountry.name}`}
                  sx={{
                    maxWidth: '100%',
                    height: 'auto',
                    maxHeight: { xs: '120px', md: '200px' },
                  }}
                />
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
                    <strong>Colors:</strong> {currentCountry.hints.colors}
                  </Typography>
                  <Typography paragraph>
                    <strong>Symbols:</strong> {currentCountry.hints.symbols}
                  </Typography>
                  <Typography>
                    <strong>Pattern:</strong> {currentCountry.hints.pattern}
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
            {options.map((country) => (
              <Grid item xs={12} sm={6} md={4} key={country.name}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    if (country.name === currentCountry?.name) {
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
