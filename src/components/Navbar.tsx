import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PublicIcon from '@mui/icons-material/Public';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { text: 'Language Trainer', path: '/language-trainer' },
    { text: 'Flag Trainer', path: '/flag-trainer' },
  ];

  return (
    <AppBar 
      position="static" 
      sx={{ 
        bgcolor: 'background.paper',
        boxShadow: 1,
        width: '100vw',
        left: 0,
        right: 0,
      }}
    >
      <Toolbar 
        sx={{ 
          justifyContent: 'space-between',
          maxWidth: 'lg',
          width: '100%',
          mx: 'auto',
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box 
          component={RouterLink} 
          to="/" 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none', 
            color: 'inherit' 
          }}
        >
          <PublicIcon 
            sx={{ 
              mr: 1.5,
              fontSize: '28px',
              color: 'primary.main'
            }} 
          />
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              fontSize: { xs: '1.2rem', sm: '1.4rem' },
              background: 'linear-gradient(45deg, #58cc02 30%, #ffd900 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            GeoFelber
          </Typography>
        </Box>

        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {menuItems.map((item) => (
                <MenuItem 
                  key={item.path}
                  onClick={handleClose}
                  component={RouterLink}
                  to={item.path}
                  sx={{ 
                    py: 1.5,
                    px: 3,
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                    }
                  }}
                >
                  {item.text}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {menuItems.map((item) => (
              <Button
                key={item.path}
                component={RouterLink}
                to={item.path}
                sx={{
                  color: 'text.primary',
                  px: 2,
                  py: 1,
                  '&:hover': {
                    bgcolor: 'primary.main',
                    color: 'white',
                  }
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
