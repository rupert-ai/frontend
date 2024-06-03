import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  return !!user && !isLoading ? (
    children
  ) : !user && !isLoading ? (
    <Navigate to="/login" state={{ redirect: location.pathname }} />
  ) : (
    <></>
  );
}

export default PrivateRoute;
