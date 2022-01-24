import React from "react";
import { FacebookAuth, UserResponse } from "./facebook";

interface FBUser extends UserResponse {
  accessToken?: string;
}

const authContext = React.createContext<
  | {
      user?: FBUser;
      isSdkLoaded: boolean;
      login: (onSuccess: () => void, onError: () => void) => void;
      logout: () => void;
    }
  | undefined
>(undefined);

export function ProvideAuth({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return React.useContext(authContext);
};

function useProvideAuth() {
  const [isSdkLoaded, setIsSdkLoaded] = React.useState(false);
  const [user, setUser] = React.useState<FBUser>();

  React.useEffect(() => {
    if (document.getElementById("facebook-jssdk")) {
      setIsSdkLoaded(true);
      return;
    }
    FacebookAuth.setAsyncSdk(() => {
      setIsSdkLoaded(true);
    });
    FacebookAuth.loadSdkAsynchronously();
  }, []);

  const login = (onSuccess: () => void, onError: () => void) => {
    if (!isSdkLoaded) {
      return;
    }
    FacebookAuth.getLoginStatus((response) => {
      if (response.status === "connected") {
        FacebookAuth.getMe((user) => {
          if (!user.error) {
            setUser({
              ...user,
              accessToken: response.authResponse?.accessToken,
            });
            onSuccess();
          } else {
            // need to logout and login again?
          }
        });
      } else {
        FacebookAuth.login((loginResponse) => {
          if (loginResponse.status === "connected") {
            FacebookAuth.getMe((user) => {
              setUser({
                ...user,
                accessToken: response.authResponse?.accessToken,
              });
              onSuccess();
            });
          } else {
            onError();
          }
        });
      }
    });
  };

  const logout = () => {
    FacebookAuth.logout(() => {
      setUser(undefined);
    });
  };

  return { user, isSdkLoaded, login, logout };
}
