import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { FlagAttempt } from '../lib/database.types';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  TextField,
  TableSortLabel,
  InputAdornment,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Slider,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { countryDisplayNames } from '../data/countryDisplay';
import { languageDisplayNames } from '../data/languageDisplay';

interface FlagStats {
  flag_code: string;
  total_attempts: number;
  correct_attempts: number;
  incorrect_attempts: number;
  last_attempt_date: string;
  success_rate: number;
  last_correct_answer: string;
  last_user_answer: string;
}

interface LanguageStats {
  language_code: string;
  total_attempts: number;
  correct_attempts: number;
  incorrect_attempts: number;
  last_attempt_date: string;
  success_rate: number;
}

type SortField = 'country' | 'language' | 'total_attempts' | 'correct_attempts' | 'incorrect_attempts' | 'success_rate' | 'last_attempt_date';
type SortOrder = 'asc' | 'desc';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`stats-tabpanel-${index}`}
      aria-labelledby={`stats-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `stats-tab-${index}`,
    'aria-controls': `stats-tabpanel-${index}`,
  };
}

export default function Profile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [flagStats, setFlagStats] = useState<FlagStats[]>([]);
  const [languageStats, setLanguageStats] = useState<LanguageStats[]>([]);
  const [filteredFlagStats, setFilteredFlagStats] = useState<FlagStats[]>([]);
  const [filteredLanguageStats, setFilteredLanguageStats] = useState<LanguageStats[]>([]);
  const [flagOverallStats, setFlagOverallStats] = useState({
    totalAttempts: 0,
    correctAttempts: 0,
    successRate: 0,
  });
  const [languageOverallStats, setLanguageOverallStats] = useState({
    totalAttempts: 0,
    correctAttempts: 0,
    successRate: 0,
  });
  const [sortField, setSortField] = useState<SortField>('total_attempts');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [successRateRange, setSuccessRateRange] = useState<[number, number]>([0, 100]);
  const [minAttempts, setMinAttempts] = useState(0);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleFilterDialogOpen = () => {
    setFilterDialogOpen(true);
  };

  const handleFilterDialogClose = () => {
    setFilterDialogOpen(false);
  };

  const applyFilters = () => {
    const filterStats = (stats: FlagStats[] | LanguageStats[]) => {
      return stats.filter(stat => 
        stat.success_rate >= successRateRange[0] && 
        stat.success_rate <= successRateRange[1] &&
        stat.total_attempts >= minAttempts
      );
    };

    setFilteredFlagStats(filterStats(flagStats));
    setFilteredLanguageStats(filterStats(languageStats));
    handleFilterDialogClose();
  };

  const resetFilters = () => {
    setSuccessRateRange([0, 100]);
    setMinAttempts(0);
    setFilteredFlagStats(flagStats);
    setFilteredLanguageStats(languageStats);
    handleFilterDialogClose();
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const fetchFlagStats = async () => {
    try {
      const { data: attempts, error } = await supabase
        .from('flag_attempts')
        .select('*')
        .eq('user_id', user?.id)
        .order('attempt_date', { ascending: false });

      if (error) throw error;

      if (attempts && attempts.length > 0) {
        const statsMap = new Map<string, FlagStats>();
        
        attempts.forEach((attempt: FlagAttempt) => {
          const existing = statsMap.get(attempt.flag_code) || {
            flag_code: attempt.flag_code,
            total_attempts: 0,
            correct_attempts: 0,
            incorrect_attempts: 0,
            last_attempt_date: attempt.attempt_date,
            success_rate: 0,
            last_correct_answer: attempt.correct_answer,
            last_user_answer: attempt.user_answer
          };

          existing.total_attempts++;
          if (attempt.is_correct) {
            existing.correct_attempts++;
          } else {
            existing.incorrect_attempts++;
          }

          if (new Date(attempt.attempt_date) > new Date(existing.last_attempt_date)) {
            existing.last_attempt_date = attempt.attempt_date;
            existing.last_correct_answer = attempt.correct_answer;
            existing.last_user_answer = attempt.user_answer;
          }

          existing.success_rate = (existing.correct_attempts / existing.total_attempts) * 100;
          statsMap.set(attempt.flag_code, existing);
        });

        const stats = Array.from(statsMap.values());
        setFlagStats(stats);
        setFilteredFlagStats(stats);

        const total = attempts.length;
        const correct = attempts.filter(a => a.is_correct).length;
        setFlagOverallStats({
          totalAttempts: total,
          correctAttempts: correct,
          successRate: total > 0 ? (correct / total) * 100 : 0,
        });
      } else {
        setFlagOverallStats({
          totalAttempts: 0,
          correctAttempts: 0,
          successRate: 0,
        });
      }
    } catch (error) {
      console.error('Error loading flag statistics:', error);
    }
  };

  const fetchLanguageStats = async () => {
    try {
      const { data: languageData, error: languageError } = await supabase
        .from('learning_progress')
        .select('*')
        .eq('user_id', user?.id)
        .eq('trainer_type', 'language');

      if (languageError) throw languageError;

      const stats: LanguageStats[] = languageData.map((item) => ({
        language_code: item.item_id,
        total_attempts: item.correct_attempts + item.wrong_attempts,
        correct_attempts: item.correct_attempts,
        incorrect_attempts: item.wrong_attempts,
        last_attempt_date: item.last_attempt_at,
        success_rate: item.correct_attempts / (item.correct_attempts + item.wrong_attempts) * 100 || 0,
      }));

      const totalAttempts = stats.reduce((sum, stat) => sum + stat.total_attempts, 0);
      const correctAttempts = stats.reduce((sum, stat) => sum + stat.correct_attempts, 0);

      setLanguageStats(stats);
      setFilteredLanguageStats(stats);
      setLanguageOverallStats({
        totalAttempts,
        correctAttempts,
        successRate: totalAttempts > 0 ? (correctAttempts / totalAttempts) * 100 : 0,
      });
    } catch (error) {
      console.error('Error fetching language stats:', error);
    }
  };

  useEffect(() => {
    if (user) {
      Promise.all([fetchFlagStats(), fetchLanguageStats()]).then(() => setLoading(false));
    }
  }, [user]);

  useEffect(() => {
    let sortedFlagStats = [...filteredFlagStats];
    let sortedLanguageStats = [...filteredLanguageStats];

    const compareValues = (a: any, b: any, field: SortField) => {
      let compareA: string | number = 0;
      let compareB: string | number = 0;

      switch (field) {
        case 'country':
          compareA = countryDisplayNames[a.flag_code.toUpperCase()] || a.flag_code;
          compareB = countryDisplayNames[b.flag_code.toUpperCase()] || b.flag_code;
          break;
        case 'language':
          compareA = languageDisplayNames[a.language_code] || a.language_code;
          compareB = languageDisplayNames[b.language_code] || b.language_code;
          break;
        case 'total_attempts':
          compareA = a.total_attempts;
          compareB = b.total_attempts;
          break;
        case 'correct_attempts':
          compareA = a.correct_attempts;
          compareB = b.correct_attempts;
          break;
        case 'incorrect_attempts':
          compareA = a.incorrect_attempts;
          compareB = b.incorrect_attempts;
          break;
        case 'success_rate':
          compareA = a.success_rate;
          compareB = b.success_rate;
          break;
        case 'last_attempt_date':
          compareA = new Date(a.last_attempt_date || 0).getTime();
          compareB = new Date(b.last_attempt_date || 0).getTime();
          break;
      }

      if (typeof compareA === 'string' && typeof compareB === 'string') {
        return sortOrder === 'asc'
          ? compareA.localeCompare(compareB)
          : compareB.localeCompare(compareA);
      }

      return sortOrder === 'asc'
        ? (compareA as number) - (compareB as number)
        : (compareB as number) - (compareA as number);
    };

    sortedFlagStats.sort((a, b) => compareValues(a, b, sortField));
    sortedLanguageStats.sort((a, b) => compareValues(a, b, sortField));

    setFilteredFlagStats(sortedFlagStats);
    setFilteredLanguageStats(sortedLanguageStats);
  }, [sortField, sortOrder, flagStats, languageStats]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Your Learning Statistics
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="stats tabs">
            <Tab label="Flag Trainer" {...a11yProps(0)} />
            <Tab label="Language Trainer" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Total Attempts
                    </Typography>
                    <Typography variant="h4">
                      {flagOverallStats.totalAttempts}
                    </Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Correct Answers
                    </Typography>
                    <Typography variant="h4">
                      {flagOverallStats.correctAttempts}
                    </Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Success Rate
                    </Typography>
                    <Typography variant="h4">
                      {flagOverallStats.successRate.toFixed(1)}%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  label="Search Country"
                  value=""
                  onChange={(e) => {
                    const searchTerm = e.target.value.toLowerCase();
                    setFilteredFlagStats(
                      flagStats.filter((stat) =>
                        countryDisplayNames[stat.flag_code.toUpperCase()]?.toLowerCase().includes(searchTerm) ||
                        stat.flag_code.toLowerCase().includes(searchTerm)
                      )
                    );
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <IconButton onClick={handleFilterDialogOpen} color="primary">
                  <FilterListIcon />
                </IconButton>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <TableSortLabel
                          active={sortField === 'country'}
                          direction={sortOrder}
                          onClick={() => handleSort('country')}
                        >
                          Country
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="right">
                        <TableSortLabel
                          active={sortField === 'total_attempts'}
                          direction={sortOrder}
                          onClick={() => handleSort('total_attempts')}
                        >
                          Total Attempts
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="right">
                        <TableSortLabel
                          active={sortField === 'correct_attempts'}
                          direction={sortOrder}
                          onClick={() => handleSort('correct_attempts')}
                        >
                          Correct
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="right">
                        <TableSortLabel
                          active={sortField === 'incorrect_attempts'}
                          direction={sortOrder}
                          onClick={() => handleSort('incorrect_attempts')}
                        >
                          Incorrect
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="right">
                        <TableSortLabel
                          active={sortField === 'success_rate'}
                          direction={sortOrder}
                          onClick={() => handleSort('success_rate')}
                        >
                          Success Rate
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="right">
                        <TableSortLabel
                          active={sortField === 'last_attempt_date'}
                          direction={sortOrder}
                          onClick={() => handleSort('last_attempt_date')}
                        >
                          Last Attempt
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="right">Last Answer</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredFlagStats.map((stat) => (
                      <TableRow key={stat.flag_code}>
                        <TableCell>{countryDisplayNames[stat.flag_code.toUpperCase()] || stat.flag_code}</TableCell>
                        <TableCell align="right">{stat.total_attempts}</TableCell>
                        <TableCell align="right">{stat.correct_attempts}</TableCell>
                        <TableCell align="right">{stat.incorrect_attempts}</TableCell>
                        <TableCell align="right">{stat.success_rate.toFixed(1)}%</TableCell>
                        <TableCell align="right">
                          {new Date(stat.last_attempt_date).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="right">
                          {stat.last_user_answer}
                          {stat.last_user_answer !== stat.last_correct_answer && (
                            <Typography component="span" color="error">
                              {" "}(Correct: {stat.last_correct_answer})
                            </Typography>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Grid container spacing={3} sx={{ mb: 4 }}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Total Attempts
                    </Typography>
                    <Typography variant="h4">
                      {languageOverallStats.totalAttempts}
                    </Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Correct Answers
                    </Typography>
                    <Typography variant="h4">
                      {languageOverallStats.correctAttempts}
                    </Typography>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Success Rate
                    </Typography>
                    <Typography variant="h4">
                      {languageOverallStats.successRate.toFixed(1)}%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Search languages..."
                  onChange={(e) => {
                    const searchTerm = e.target.value.toLowerCase();
                    setFilteredLanguageStats(
                      languageStats.filter((stat) =>
                        languageDisplayNames[stat.language_code]?.toLowerCase().includes(searchTerm)
                      )
                    );
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
                <IconButton onClick={handleFilterDialogOpen} color="primary">
                  <FilterListIcon />
                </IconButton>
              </Box>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <TableSortLabel
                          active={sortField === 'language'}
                          direction={sortOrder}
                          onClick={() => handleSort('language')}
                        >
                          Language
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="right">
                        <TableSortLabel
                          active={sortField === 'total_attempts'}
                          direction={sortOrder}
                          onClick={() => handleSort('total_attempts')}
                        >
                          Total Attempts
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="right">
                        <TableSortLabel
                          active={sortField === 'correct_attempts'}
                          direction={sortOrder}
                          onClick={() => handleSort('correct_attempts')}
                        >
                          Correct
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="right">
                        <TableSortLabel
                          active={sortField === 'incorrect_attempts'}
                          direction={sortOrder}
                          onClick={() => handleSort('incorrect_attempts')}
                        >
                          Incorrect
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="right">
                        <TableSortLabel
                          active={sortField === 'success_rate'}
                          direction={sortOrder}
                          onClick={() => handleSort('success_rate')}
                        >
                          Success Rate
                        </TableSortLabel>
                      </TableCell>
                      <TableCell align="right">
                        <TableSortLabel
                          active={sortField === 'last_attempt_date'}
                          direction={sortOrder}
                          onClick={() => handleSort('last_attempt_date')}
                        >
                          Last Attempt
                        </TableSortLabel>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredLanguageStats.map((stat) => (
                      <TableRow key={stat.language_code}>
                        <TableCell>{languageDisplayNames[stat.language_code] || stat.language_code}</TableCell>
                        <TableCell align="right">{stat.total_attempts}</TableCell>
                        <TableCell align="right">{stat.correct_attempts}</TableCell>
                        <TableCell align="right">{stat.incorrect_attempts}</TableCell>
                        <TableCell align="right">{stat.success_rate.toFixed(1)}%</TableCell>
                        <TableCell align="right">
                          {stat.last_attempt_date
                            ? new Date(stat.last_attempt_date).toLocaleDateString()
                            : 'Never'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </TabPanel>
      </Paper>

      <Dialog open={filterDialogOpen} onClose={handleFilterDialogClose}>
        <DialogTitle>Filter Statistics</DialogTitle>
        <DialogContent>
          <Box sx={{ width: 300, mt: 2 }}>
            <Typography gutterBottom>
              Success Rate Range (%)
            </Typography>
            <Slider
              value={successRateRange}
              onChange={(_, newValue) => setSuccessRateRange(newValue as [number, number])}
              valueLabelDisplay="auto"
              min={0}
              max={100}
            />
            <TextField
              fullWidth
              type="number"
              label="Minimum Attempts"
              value={minAttempts}
              onChange={(e) => setMinAttempts(parseInt(e.target.value) || 0)}
              inputProps={{ min: 0 }}
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={resetFilters}>Reset</Button>
          <Button onClick={applyFilters} variant="contained">Apply</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
