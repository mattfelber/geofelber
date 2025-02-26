import { Box, Typography, Card, CardContent, CardActionArea, Grid, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PublicIcon from '@mui/icons-material/Public';
import LanguageIcon from '@mui/icons-material/Language';
import FlagIcon from '@mui/icons-material/Flag';

const Home = () => {
  const navigate = useNavigate();

  const handleStartTraining = () => {
    navigate('/flag-trainer');
  };

  const modules = [
    {
      title: 'Language Trainer',
      description: 'Test your ability to identify languages from around the world. Learn to recognize different writing systems and unique characters.',
      icon: <LanguageIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      path: 'language-trainer'
    },
    {
      title: 'Flag Trainer',
      description: 'Become an expert at recognizing country flags. Learn the subtle differences between similar flags and improve your quick identification skills.',
      icon: <FlagIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      path: 'flag-trainer'
    }
  ];

  return (
    <Box sx={{ 
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: { xs: 6, md: 8 },
    }}>
      {/* Hero Section */}
      <Paper 
        elevation={0}
        sx={{ 
          bgcolor: 'background.paper',
          borderRadius: 4,
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
          p: { xs: 4, md: 6 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Box sx={{ 
          position: 'relative',
          zIndex: 1,
          maxWidth: '800px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
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
              maxWidth: '100%',
            }}
          >
            Welcome to GeoFelber!
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4,
              color: 'text.secondary',
              maxWidth: '600px',
            }}
          >
            Level up your Geography skills with our specialized training tools. Master languages and flags to become a location-guessing expert!
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button 
              variant="contained" 
              size="large"
              onClick={handleStartTraining}
            >
              Start Training
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Features Section */}
      <Box 
        id="training-modules" 
        sx={{ 
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
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
        
        <Grid 
          container 
          spacing={4} 
          sx={{ 
            width: '100%',
            justifyContent: 'center',
          }}
        >
          {modules.map((module) => (
            <Grid item xs={12} md={6} key={module.title}>
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
                  onClick={() => navigate(module.path)}
                  sx={{ height: '100%' }}
                >
                  <CardContent sx={{ 
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}>
                    <Box sx={{ mb: 2 }}>
                      {module.icon}
                    </Box>
                    <Typography 
                      gutterBottom 
                      variant="h5" 
                      component="h3"
                      sx={{ fontWeight: 700 }}
                    >
                      {module.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {module.description}
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
