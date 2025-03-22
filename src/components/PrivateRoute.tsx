import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isGuest } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // Allow access if user is logged in or in guest mode
  if (!user && !isGuest) {
    return <Navigate to="/login" />;
  }

  return children;
}
