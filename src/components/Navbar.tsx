import { AppBar, Toolbar, Button, Box, IconButton, useTheme, useMediaQuery, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      handleClose();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = user ? [
    { path: '/', label: 'Home' },
    { path: '/language-trainer', label: 'Language Trainer' },
    { path: '/flag-trainer', label: 'Flag Trainer' },
  ] : [];

  if (isMobile) {
    return (
      <AppBar position="sticky" sx={{ bgcolor: 'background.paper' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              color: 'primary.main',
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            GeoFelber
          </Typography>
          
          {user && (
            <>
              <IconButton
                edge="end"
                color="primary"
                aria-label="menu"
                onClick={handleMenu}
                sx={{
                  '&:hover': {
                    backgroundColor: 'rgba(88, 204, 2, 0.1)'
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                PaperProps={{
                  elevation: 4,
                  sx: {
                    mt: 2,
                    minWidth: 200
                  }
                }}
              >
                {navItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    component={RouterLink}
                    to={item.path}
                    onClick={handleClose}
                    selected={isActive(item.path)}
                    sx={{
                      py: 1.5,
                      '&.Mui-selected': {
                        backgroundColor: 'primary.main',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: 'primary.dark',
                        }
                      }
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
                <MenuItem 
                  component={RouterLink} 
                  to="/profile" 
                  onClick={handleClose}
                  selected={isActive('/profile')}
                  sx={{
                    py: 1.5,
                    '&.Mui-selected': {
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'primary.dark',
                      }
                    }
                  }}
                >
                  Profile
                </MenuItem>
                <MenuItem 
                  onClick={handleLogout}
                  sx={{ py: 1.5 }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
          {!user && (
            <Button
              component={RouterLink}
              to="/login"
              color="primary"
              variant="contained"
              sx={{ ml: 'auto' }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'background.paper' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={RouterLink}
              to={item.path}
              color="primary"
              variant={isActive(item.path) ? 'contained' : 'text'}
            >
              {item.label}
            </Button>
          ))}
        </Box>
        {user ? (
          <>
            <Button color="inherit" component={RouterLink} to="/profile">
              Profile
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <Button
            component={RouterLink}
            to="/login"
            color="primary"
            variant="contained"
          >
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
