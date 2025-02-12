import { Box, Typography, Card, CardContent, CardActionArea, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LanguageIcon from '@mui/icons-material/Language';
import FlagIcon from '@mui/icons-material/Flag';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Language Trainer',
      description: 'Learn to identify languages from different regions to improve your GeoGuessr skills',
      icon: <LanguageIcon sx={{ fontSize: 40 }} />,
      path: '/language-trainer'
    },
    {
      title: 'Flag Trainer',
      description: 'Master country flags recognition to quickly identify locations',
      icon: <FlagIcon sx={{ fontSize: 40 }} />,
      path: '/flag-trainer'
    }
  ];

  return (
    <Box>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Welcome to GeoFelber
      </Typography>
      <Typography variant="h6" gutterBottom align="center" color="text.secondary">
        Your Ultimate GeoGuessr Training Hub
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {features.map((feature) => (
          <Grid item xs={12} sm={6} key={feature.title}>
            <Card>
              <CardActionArea onClick={() => navigate(feature.path)}>
                <CardContent sx={{ textAlign: 'center', py: 4 }}>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography gutterBottom variant="h5" component="div">
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
