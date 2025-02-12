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
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
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
  const [options, setOptions] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const generateQuestion = () => {
    // Clear current language first to prevent any feedback flashing
    setCurrentLanguage(null);
    setShowResult(false);
    setShowFeedback(false);
    setSelectedAnswer('');
    
    // Small delay before showing new question
    setTimeout(() => {
      const randomLanguage = languages[Math.floor(Math.random() * languages.length)];
      const wrongOptions = languages
        .filter(lang => lang.name !== randomLanguage.name)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(lang => lang.name);
      
      const allOptions = [...wrongOptions, randomLanguage.name].sort(() => 0.5 - Math.random());
      
      setCurrentLanguage(randomLanguage);
      setOptions(allOptions);
      setShowHint(false);
    }, 50);
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    if (currentLanguage) {
      setShowResult(true);
      setShowFeedback(true);
      setTotalQuestions(prev => prev + 1);
      if (answer === currentLanguage.name) {
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
            Language Trainer
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

        {currentLanguage && (
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
                  Which language is this?
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
                    How to identify this script:
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {currentLanguage.hints.writing}
                  </Typography>
                  <Typography variant="body1">
                    {currentLanguage.hints.examples}
                  </Typography>
                </Paper>
              </Collapse>
              
              <Paper 
                elevation={3} 
                sx={{ 
                  p: { xs: 3, sm: 5 }, 
                  mb: { xs: 3, sm: 4 }, 
                  bgcolor: alpha('#fff', 0.8),
                  borderRadius: 3,
                  textAlign: 'center',
                  fontSize: { xs: '1.25rem', sm: '2rem' },
                  fontWeight: 500
                }}
              >
                {currentLanguage.sample}
              </Paper>

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
                          ? option === currentLanguage.name
                            ? 'success.main'
                            : option === selectedAnswer
                              ? 'error.main'
                              : 'primary.main'
                          : 'primary.main',
                        '&:hover': {
                          bgcolor: showResult
                            ? option === currentLanguage.name
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
                    bgcolor: selectedAnswer === currentLanguage?.name ? 'success.main' : 'error.main',
                    color: 'white',
                    borderRadius: 2,
                    fontSize: { xs: '1.1rem', sm: '1.3rem' }
                  }}
                >
                  <Typography variant="h6">
                    {selectedAnswer === currentLanguage?.name 
                      ? getEncouragement()
                      : currentLanguage?.quickTip
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

export default LanguageTrainer;
