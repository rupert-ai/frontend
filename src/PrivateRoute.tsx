import { Navigate } from "react-router-dom";
import { useAuth } from "./services/useAuth";

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps) {
  const auth = useAuth();
  return auth?.user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
