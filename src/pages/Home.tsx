import { Box, Typography, Card, CardContent, CardActionArea, Grid, Button, Container, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import FlagIcon from '@mui/icons-material/Flag';
import PublicIcon from '@mui/icons-material/Public';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SchoolIcon from '@mui/icons-material/School';

const Home = () => {
  const navigate = useNavigate();

  const handleStartTraining = () => {
    // On mobile, scroll to modules
    if (window.innerWidth < 600) {
      const modulesSection = document.getElementById('training-modules');
      if (modulesSection) {
        modulesSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // On desktop, go directly to Language Trainer
      navigate('/language-trainer');
    }
  };

  const features = [
    {
      title: 'Language Trainer',
      description: 'Master the art of identifying languages from different regions. Perfect your GeoGuessr skills by learning to recognize text patterns and unique characters.',
      icon: <LanguageIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      path: '/language-trainer'
    },
    {
      title: 'Flag Trainer',
      description: 'Become an expert at recognizing country flags. Learn the subtle differences between similar flags and improve your quick identification skills.',
      icon: <FlagIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      path: '/flag-trainer'
    }
  ];

  return (
    <Box sx={{ width: '100%' }}>
      {/* Hero Section */}
      <Paper 
        elevation={0}
        sx={{ 
          bgcolor: 'background.paper',
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative',
          mb: 6,
          p: { xs: 4, md: 6 },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <PublicIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              background: 'linear-gradient(45deg, #58cc02 30%, #ffd900 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Welcome to GeoFelber
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4,
              color: 'text.secondary',
              maxWidth: '800px',
            }}
          >
            Level up your GeoGuessr game with our specialized training tools. Master languages and flags to become a location-guessing expert!
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
            <Button 
              variant="contained" 
              size="large"
              onClick={handleStartTraining}
              startIcon={<SchoolIcon />}
            >
              Start Training
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Features Section */}
      <Box id="training-modules">
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 4,
            textAlign: 'center',
            fontWeight: 700,
          }}
        >
          Training Modules
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} md={6} key={feature.title}>
              <Card 
                sx={{ 
                  height: '100%',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: (theme) => `0 8px 24px ${theme.palette.primary.main}20`,
                  }
                }}
              >
                <CardActionArea 
                  onClick={() => navigate(feature.path)}
                  sx={{ height: '100%' }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography 
                      gutterBottom 
                      variant="h5" 
                      component="h3"
                      sx={{ fontWeight: 700 }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
