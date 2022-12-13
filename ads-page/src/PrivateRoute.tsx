import { ProgressRadial } from "@itwin/itwinui-react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./services/useAuth";

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps) {
  const auth = useAuth();

  if (!auth?.checked) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ProgressRadial size="large" indeterminate />
      </div>
    );
  }

  return !!auth?.isSdkLoaded && !!auth?.user?.accessToken ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
