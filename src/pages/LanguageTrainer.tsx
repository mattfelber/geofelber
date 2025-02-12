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

interface Language {
  name: string;
  sample: string;
  hints: {
    writing: string;
    unique: string;
    examples: string;
  };
  quickTip: string;
}

const languages: Language[] = [
  {
    name: 'Thai',
    sample: 'สวัสดีครับ ยินดีต้อนรับสู่ประเทศไทย',
    hints: {
      writing: 'Curved and loopy script with many circles and hooks',
      unique: 'Letters hang from an invisible line at the top',
      examples: 'Look for: ส, ด, ป - common Thai characters'
    },
    quickTip: 'Look for the distinctive circular shapes and hanging letters'
  },
  {
    name: 'Japanese',
    sample: 'こんにちは。日本へようこそ。',
    hints: {
      writing: 'Mix of curved (Hiragana) and complex square characters (Kanji)',
      unique: 'Simpler characters mixed with Chinese characters',
      examples: 'Look for: は, の, こ - common Hiragana characters'
    },
    quickTip: 'Mix of simple curved and complex square characters'
  },
  {
    name: 'Korean',
    sample: '안녕하세요. 한국에 오신 것을 환영합니다.',
    hints: {
      writing: 'Distinctive blocks of syllables made up of simple shapes',
      unique: 'Lots of circles and straight lines combined into blocks',
      examples: 'Look for: ㅇ, ㄱ, ㅎ - common basic shapes'
    },
    quickTip: 'Look for blocks of syllables made up of simple shapes'
  },
  {
    name: 'Arabic',
    sample: 'مرحبا بكم في المملكة العربية السعودية',
    hints: {
      writing: 'Flowing cursive script that connects letters',
      unique: 'Lots of dots above and below the letters',
      examples: 'Look for: ا, م, ب - common Arabic letters'
    },
    quickTip: 'Look for flowing cursive script with dots above and below letters'
  },
  {
    name: 'Russian',
    sample: 'Добро пожаловать в Россию',
    hints: {
      writing: 'Similar to Latin alphabet but with unique characters',
      unique: 'Reversed letters and characters with extra strokes',
      examples: 'Look for: я, ж, д - distinctive Cyrillic letters'
    },
    quickTip: 'Look for reversed letters and characters with extra strokes'
  },
  {
    name: 'Greek',
    sample: 'Καλώς ήρθατε στην Ελλάδα',
    hints: {
      writing: 'Similar to Latin but with distinctive curves',
      unique: 'Looks like math symbols you might know',
      examples: 'Look for: λ, π, Σ - familiar from math/science'
    },
    quickTip: 'Look for distinctive curves and math-like symbols'
  },
  {
    name: 'Hindi',
    sample: 'नमस्ते। भारत में आपका स्वागत है।',
    hints: {
      writing: 'Characters connected by a horizontal line at the top',
      unique: 'Curves and loops with a distinctive horizontal bar',
      examples: 'Look for: म, स, त - common Devanagari letters'
    },
    quickTip: 'Look for characters connected by a horizontal line at the top'
  },
  {
    name: 'Vietnamese',
    sample: 'Chào mừng đến với Việt Nam',
    hints: {
      writing: 'Latin alphabet with many diacritical marks',
      unique: 'Lots of accent marks above and below letters',
      examples: 'Look for: ă, ớ, ể - distinctive Vietnamese combinations'
    },
    quickTip: 'Look for Latin alphabet with many diacritical marks'
  },
];

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

  useEffect(() => {
    selectNewLanguage();
  }, []);

  const selectNewLanguage = () => {
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
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          Current Streak: {streak}
        </Typography>
        {encouragement && (
          <Typography 
            variant="h6" 
            color="primary" 
            sx={{ 
              fontWeight: 700,
              animation: 'fadeIn 0.5s ease-in',
              '@keyframes fadeIn': {
                '0%': { opacity: 0, transform: 'translateY(10px)' },
                '100%': { opacity: 1, transform: 'translateY(0)' },
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
