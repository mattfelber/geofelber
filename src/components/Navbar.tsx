import { AppBar, Toolbar, Button, Box, IconButton, useTheme, useMediaQuery, Typography } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { Menu, MenuItem } from '@mui/material';

const Navbar = () => {
  const { user, signOut, isGuest } = useAuth();
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

  // Show nav items for both logged-in users and guests
  const navItems = (user || isGuest) ? [
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
          {(user || isGuest) && (
            <>
              <IconButton
                size="large"
                edge="start"
                color="primary"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
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
                {navItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    onClick={handleClose}
                    component={RouterLink}
                    to={item.path}
                    selected={isActive(item.path)}
                  >
                    {item.label}
                  </MenuItem>
                ))}
                {user ? (
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                ) : isGuest ? (
                  <MenuItem component={RouterLink} to="/login">Sign In</MenuItem>
                ) : null}
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    );
  }

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
        <Box sx={{ display: 'flex', gap: 2 }}>
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={RouterLink}
              to={item.path}
              color="primary"
              sx={{
                fontWeight: isActive(item.path) ? 700 : 400,
                textDecoration: isActive(item.path) ? 'underline' : 'none',
              }}
            >
              {item.label}
            </Button>
          ))}
          {user ? (
            <>
              <Button
                component={RouterLink}
                to="/profile"
                color="primary"
                sx={{
                  fontWeight: isActive('/profile') ? 700 : 400,
                  textDecoration: isActive('/profile') ? 'underline' : 'none',
                }}
              >
                Profile
              </Button>
              <Button color="primary" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : isGuest ? (
            <Button component={RouterLink} to="/login" color="primary">
              Sign In
            </Button>
          ) : null}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
