import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Container } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LanguageTrainer from './pages/LanguageTrainer';
import FlagTrainer from './pages/FlagTrainer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#58cc02',
    },
    secondary: {
      main: '#ffd900',
    },
    background: {
      default: '#111',
      paper: '#1d1d1d',
    },
  },
  typography: {
    fontFamily: "'Din Round Pro', 'Arial Rounded MT Bold', system-ui, sans-serif",
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 700,
          fontSize: '1rem',
          padding: '12px 24px',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              bgcolor: 'background.default',
              width: '100vw',
              margin: 0,
              padding: 0,
              overflowX: 'hidden',
              pt: { xs: 7, sm: 8 }
            }}
          >
            <Navbar />
            <Box 
              component="main"
              sx={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                px: { xs: 2, sm: 3, md: 4 },
                py: { xs: 2, sm: 3, md: 4 },
                overflow: 'auto',
              }}
            >
              <Container 
                maxWidth={false}
                sx={{ 
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mx: 'auto',
                }}
              >
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <Home />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/language-trainer"
                    element={
                      <PrivateRoute>
                        <LanguageTrainer />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/flag-trainer"
                    element={
                      <PrivateRoute>
                        <FlagTrainer />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <Profile />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </Container>
            </Box>
          </Box>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
