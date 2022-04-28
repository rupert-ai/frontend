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
  error?: {
    code: number;
    error_subcode: number;
    fbtrace_id: string;
    message: string;
    type: string;
  };
}

export const FACEBOOK_SCRIPT_ID = "facebook-sdk";

export class FacebookAuth {
  public static getLoginStatus = (
    roundtrip: boolean = false
  ): Promise<StatusResponse> => {
    return new Promise((resolve, reject) => {
      (window as any).FB.getLoginStatus((response: StatusResponse) => {
        resolve(response);
      }, roundtrip);
    });
  };

  public static login = (): Promise<StatusResponse> => {
    return new Promise((resolve) => {
      (window as any).FB.login(
        (response: StatusResponse) => {
          resolve(response);
        },
        { scope: "email,ads_management,ads_read,business_management" }
      );
    });
  };

  public static logout = (): Promise<StatusResponse> => {
    return new Promise((resolve) => {
      (window as any).FB.logout((response: StatusResponse) => {
        resolve(response);
      });
    });
  };

  public static init = (): Promise<void> => {
    return new Promise((resolve) => {
      (window as any).fbAsyncInit = () => {
        (window as any).FB.init({
          version: "v12.0",
          appId: process.env.REACT_APP_FACEBOOK_APP_ID,
          xfbml: true,
        });
        resolve();
      };
    });
  };

  public static getMe = (): Promise<UserResponse> => {
    return new Promise((resolve) => {
      (window as any).FB.api(
        "/me",
        { fields: "name,email,picture" },
        (me: UserResponse) => {
          resolve(me);
        }
      );
    });
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
    })(document, "script", FACEBOOK_SCRIPT_ID);
  };
}
