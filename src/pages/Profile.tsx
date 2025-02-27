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
  Slider,
  InputAdornment,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { countryDisplayNames } from '../data/countryDisplay';

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

type SortField = 'country' | 'total_attempts' | 'correct_attempts' | 'incorrect_attempts' | 'success_rate' | 'last_attempt_date';
type SortOrder = 'asc' | 'desc';

export default function Profile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [flagStats, setFlagStats] = useState<FlagStats[]>([]);
  const [filteredStats, setFilteredStats] = useState<FlagStats[]>([]);
  const [overallStats, setOverallStats] = useState({
    totalAttempts: 0,
    correctAttempts: 0,
    successRate: 0,
  });

  // Filtering states
  const [searchQuery, setSearchQuery] = useState('');
  const [successRateRange, setSuccessRateRange] = useState<[number, number]>([0, 100]);
  const [minAttempts, setMinAttempts] = useState(0);

  // Sorting states
  const [sortField, setSortField] = useState<SortField>('total_attempts');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  useEffect(() => {
    async function loadStats() {
      if (!user) return;

      try {
        const { data: attempts, error } = await supabase
          .from('flag_attempts')
          .select('*')
          .eq('user_id', user.id)
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
          setFilteredStats(stats);

          const total = attempts.length;
          const correct = attempts.filter(a => a.is_correct).length;
          setOverallStats({
            totalAttempts: total,
            correctAttempts: correct,
            successRate: total > 0 ? (correct / total) * 100 : 0,
          });
        } else {
          setOverallStats({
            totalAttempts: 0,
            correctAttempts: 0,
            successRate: 0,
          });
        }
      } catch (error) {
        console.error('Error loading statistics:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, [user]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...flagStats];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(stat => 
        countryDisplayNames[stat.flag_code.toUpperCase()]?.toLowerCase().includes(query) ||
        stat.flag_code.toLowerCase().includes(query)
      );
    }

    // Apply success rate filter
    result = result.filter(stat => 
      stat.success_rate >= successRateRange[0] && 
      stat.success_rate <= successRateRange[1]
    );

    // Apply minimum attempts filter
    if (minAttempts > 0) {
      result = result.filter(stat => stat.total_attempts >= minAttempts);
    }

    // Apply sorting
    result.sort((a, b) => {
      let compareA: string | number = 0;
      let compareB: string | number = 0;

      switch (sortField) {
        case 'country':
          compareA = countryDisplayNames[a.flag_code.toUpperCase()] || a.flag_code;
          compareB = countryDisplayNames[b.flag_code.toUpperCase()] || b.flag_code;
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
          compareA = new Date(a.last_attempt_date).getTime();
          compareB = new Date(b.last_attempt_date).getTime();
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
    });

    setFilteredStats(result);
  }, [flagStats, searchQuery, successRateRange, minAttempts, sortField, sortOrder]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Profile
      </Typography>

      {user && (
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {user.email}
        </Typography>
      )}

      <Grid container spacing={3}>
        {/* Overall Statistics */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Overall Statistics
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Total Attempts
                    </Typography>
                    <Typography variant="h4">
                      {overallStats.totalAttempts}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Correct Answers
                    </Typography>
                    <Typography variant="h4">
                      {overallStats.correctAttempts}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Card>
                  <CardContent>
                    <Typography color="text.secondary" gutterBottom>
                      Success Rate
                    </Typography>
                    <Typography variant="h4">
                      {overallStats.successRate.toFixed(1)}%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Filters */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Filters
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Search Country"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
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
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  type="number"
                  label="Minimum Attempts"
                  value={minAttempts}
                  onChange={(e) => setMinAttempts(parseInt(e.target.value) || 0)}
                  inputProps={{ min: 0 }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Detailed Flag Statistics */}
        <Grid item xs={12}>
          <Paper elevation={3}>
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
                  {filteredStats.map((stat) => (
                    <TableRow key={stat.flag_code}>
                      <TableCell component="th" scope="row">
                        {countryDisplayNames[stat.flag_code.toUpperCase()] || stat.flag_code}
                      </TableCell>
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
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
