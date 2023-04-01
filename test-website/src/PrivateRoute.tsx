// import { useEffect } from 'react';
// import { useAuth } from './services/useAuth';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps) {
  // const auth = useAuth();

  // useEffect(() => {
  //     if (!auth?.user?.accessToken && auth?.checked) {
  //         auth?.login();
  //     }
  // }, [auth?.checked]);
  // return true ? (
  return <>{children}</>;
  // ) : (
  // <></>
  // );
}

export default PrivateRoute;
