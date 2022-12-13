import React from "react";
import { FacebookAuth, FACEBOOK_SCRIPT_ID, UserResponse } from "./facebook";

export interface FBUser extends UserResponse {
  accessToken?: string;
}

const authContext = React.createContext<
  | {
      user?: FBUser;
      isSdkLoaded: boolean;
      checked: boolean;
      login: () => Promise<void>;
      logout: () => Promise<void>;
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
  const [checked, setChecked] = React.useState(false);

  const loginStatus = React.useCallback(async () => {
    const loginStatus = await FacebookAuth.getLoginStatus();

    if (loginStatus.status === "connected") {
      const me = await FacebookAuth.getMe();
      if (!me.error) {
        setUser({
          ...me,
          accessToken: loginStatus.authResponse?.accessToken,
        });
      } else {
        setUser({
          accessToken: loginStatus.authResponse?.accessToken,
        });
      }
    }
  }, []);

  const checkStatus = async () => {
    const loginStatus = await FacebookAuth.getLoginStatus();
    if (loginStatus.status === "connected") {
      const me = await FacebookAuth.getMe();
      if (!me.error) {
        setUser({
          ...me,
          accessToken: loginStatus.authResponse?.accessToken,
        });
      } else {
        setUser({
          accessToken: loginStatus.authResponse?.accessToken,
        });
      }
    }

    return loginStatus.status;
  };

  React.useLayoutEffect(() => {
    if (document.getElementById(FACEBOOK_SCRIPT_ID)) {
      setIsSdkLoaded(true);
      return;
    }

    const init = async () => {
      await FacebookAuth.init();
      setIsSdkLoaded(true);
    };

    init();
    FacebookAuth.loadSdkAsynchronously();
  }, []);

  React.useLayoutEffect(() => {
    if (!isSdkLoaded) {
      return;
    }

    checkStatus().then(() => setChecked(true));
  }, [isSdkLoaded, loginStatus]);

  const login = async (): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      const status = await checkStatus();
      if (status !== "connected") {
        const loginResult = await FacebookAuth.login();
        if (loginResult.status === "connected") {
          const me = await FacebookAuth.getMe();
          if (!me.error) {
            setUser({
              ...me,
              accessToken: loginResult.authResponse?.accessToken,
            });
          } else {
            setUser({
              accessToken: loginResult.authResponse?.accessToken,
            });
          }
          resolve();
        } else {
          reject();
        }
      }
      resolve();
    });
  };

  const logout = async () => {
    const loginStatus = await FacebookAuth.getLoginStatus();
    if (loginStatus.status === "connected") {
      await FacebookAuth.logout();
    }
  };

  return { user, isSdkLoaded, checked, login, logout };
}
