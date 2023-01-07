// import { useAuth } from "./services/useAuth";

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps) {
  // const auth = useAuth();

  // return true ? (
  return children;
  // ) : (
  // <></>
  // );
}

export default PrivateRoute;
