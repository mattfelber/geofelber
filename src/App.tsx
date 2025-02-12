import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, Container } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import LanguageTrainer from './pages/LanguageTrainer';
import FlagTrainer from './pages/FlagTrainer';

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
          borderRadius: 16,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          bgcolor: 'background.default',
        }}>
          <Navbar />
          <Container 
            component="main" 
            sx={{ 
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              py: { xs: 2, sm: 4 },
              px: { xs: 1, sm: 2 },
              maxWidth: { sm: '100%', md: '900px' } 
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/language-trainer" element={<LanguageTrainer />} />
              <Route path="/flag-trainer" element={<FlagTrainer />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
