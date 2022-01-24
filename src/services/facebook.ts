interface AuthResponse {
  accessToken?: string;
  expiresIn: string;
  reauthorize_required_in: string;
  signedRequest: string;
  userId: string;
}

interface StatusResponse {
  status: "connected" | "not_authorized" | "unknown";
  authResponse?: AuthResponse;
}

export interface UserResponse {
  email?: string;
  id?: string;
  name?: string;
  error: {
    code: number;
    error_subcode: number;
    fbtrace_id: string;
    message: string;
    type: string;
  };
}

export class FacebookAuth {
  public static getLoginStatus = (
    callback: (response: StatusResponse) => void
  ) => {
    (window as any).FB.getLoginStatus((response: StatusResponse) => {
      console.log("status check response", response);
      callback(response);
    });
  };

  public static login = (callback: (response: StatusResponse) => void) => {
    (window as any).FB.login((response: StatusResponse) => {
      console.log("login response", response);
      callback(response);
    });
  };

  public static logout = (callback: (response: StatusResponse) => void) => {
    (window as any).FB.logout((response: StatusResponse) => {
      console.log("logout response", response);
      callback(response);
    });
  };

  public static setAsyncSdk = (callback: () => void) => {
    (window as any).fbAsyncInit = () => {
      (window as any).FB.init({
        version: "v12.0",
        appId: "158812729745471",
        xfbml: true,
      });
      callback();
    };
  };

  public static getMe = (callback: (user: UserResponse) => void) => {
    (window as any).FB.api(
      "/me",
      { fields: "name,email,picture" },
      (me: UserResponse) => {
        console.log("user", me);
        callback(me);
      }
    );
  };

  public static loadSdkAsynchronously = () => {
    ((d, s, id) => {
      const element = d.getElementsByTagName(s)[0];
      const fjs = element as HTMLScriptElement;
      let js = element as HTMLScriptElement;
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = `https://connect.facebook.net/en_US/sdk.js`;
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  };
}
