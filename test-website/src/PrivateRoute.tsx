import { Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, isLoading } = useAuth();

  return !!user && !isLoading ? children : !user && !isLoading ? <Navigate to="/login" /> : <></>;
}

export default PrivateRoute;
