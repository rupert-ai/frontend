import { useAuth } from "./services/useAuth";

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps) {
  const auth = useAuth();

  return !!auth?.isSdkLoaded && !!auth?.user?.accessToken && auth?.checked ? (
    children
  ) : (
    <></>
  );
}

export default PrivateRoute;
