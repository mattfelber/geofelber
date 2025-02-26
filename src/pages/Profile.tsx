import { useEffect, useState } from 'react';
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
} from '@mui/material';

interface FlagStats {
  flag_code: string;
  total_attempts: number;
  correct_attempts: number;
  incorrect_attempts: number;
  last_attempt_date: string;
  success_rate: number;
}

export default function Profile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [flagStats, setFlagStats] = useState<FlagStats[]>([]);
  const [overallStats, setOverallStats] = useState({
    totalAttempts: 0,
    correctAttempts: 0,
    successRate: 0,
  });

  useEffect(() => {
    async function loadStats() {
      if (!user) return;

      try {
        // Load flag attempts
        const { data: attempts, error } = await supabase
          .from('flag_attempts')
          .select('*')
          .eq('user_id', user.id);

        if (error) throw error;

        if (attempts && attempts.length > 0) {
          // Process attempts into statistics
          const statsMap = new Map<string, FlagStats>();
          
          attempts.forEach((attempt: FlagAttempt) => {
            const existing = statsMap.get(attempt.flag_code) || {
              flag_code: attempt.flag_code,
              total_attempts: 0,
              correct_attempts: 0,
              incorrect_attempts: 0,
              last_attempt_date: attempt.attempt_date,
              success_rate: 0,
            };

            existing.total_attempts++;
            if (attempt.is_correct) {
              existing.correct_attempts++;
            } else {
              existing.incorrect_attempts++;
            }

            // Update last attempt date if more recent
            if (new Date(attempt.attempt_date) > new Date(existing.last_attempt_date)) {
              existing.last_attempt_date = attempt.attempt_date;
            }

            existing.success_rate = (existing.correct_attempts / existing.total_attempts) * 100;
            statsMap.set(attempt.flag_code, existing);
          });

          const stats = Array.from(statsMap.values());
          setFlagStats(stats);

          // Calculate overall statistics
          const total = attempts.length;
          const correct = attempts.filter(a => a.is_correct).length;
          setOverallStats({
            totalAttempts: total,
            correctAttempts: correct,
            successRate: (correct / total) * 100,
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

        {/* Detailed Flag Statistics */}
        <Grid item xs={12}>
          <Paper elevation={3}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Flag</TableCell>
                    <TableCell align="right">Total Attempts</TableCell>
                    <TableCell align="right">Correct</TableCell>
                    <TableCell align="right">Incorrect</TableCell>
                    <TableCell align="right">Success Rate</TableCell>
                    <TableCell>Last Attempt</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {flagStats.map((stat) => (
                    <TableRow key={stat.flag_code}>
                      <TableCell>{stat.flag_code}</TableCell>
                      <TableCell align="right">{stat.total_attempts}</TableCell>
                      <TableCell align="right">{stat.correct_attempts}</TableCell>
                      <TableCell align="right">{stat.incorrect_attempts}</TableCell>
                      <TableCell align="right">
                        {stat.success_rate.toFixed(1)}%
                      </TableCell>
                      <TableCell>
                        {new Date(stat.last_attempt_date).toLocaleDateString()}
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
