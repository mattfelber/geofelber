import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PublicIcon from '@mui/icons-material/Public';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <PublicIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          GeoFelber
        </Typography>
        <Box>
          <Button color="inherit" component={RouterLink} to="/language-trainer">
            Language Trainer
          </Button>
          <Button color="inherit" component={RouterLink} to="/flag-trainer">
            Flag Trainer
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
