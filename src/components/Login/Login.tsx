import { Button, Headline, Small, toaster } from "@itwin/itwinui-react";
import "./Login.css";
import { useAuth } from "../../services/useAuth";
import { useNavigate } from "react-router-dom";
import React from "react";

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  // React.useEffect(() => {
  //   // if (document.getElementById("facebook-jssdk")) {
  //   //   console.log("loaded");
  //   //   return;
  //   // }

  //   (window as any).fbAsyncInit = () => {
  //     (window as any).FB.init({
  //       version: "v12.0",
  //       appId: "158812729745471",
  //       xfbml: true,
  //     });
  //     // this.setStateIfMounted({ isSdkLoaded: true });
  //     (window as any).FB.getLoginStatus((response: any) => {
  //       console.log("login status", response);
  //       if (response.status === "connected") {
  //         (window as any).FB.api(
  //           "/me",
  //           { fields: "name,email,picture" },
  //           (me: any) => {
  //             Object.assign(me, response.authResponse);
  //             console.log("user", me);
  //           }
  //         );
  //       } else {
  //         (window as any).FB.login(
  //           (loginResponse: any) => checkLoginState(loginResponse),
  //           true
  //         );
  //       }
  //       // else {
  //       //   window.FB.login(loginResponse => this.checkLoginState(loginResponse), true);
  //       // }
  //     });
  //     loadSdkAsynchronously();
  //     let fbRoot = document.getElementById("fb-root");
  //     if (!fbRoot) {
  //       fbRoot = document.createElement("div");
  //       fbRoot.id = "fb-root";
  //       document.body.appendChild(fbRoot);
  //     }
  //   };
  // }, []);

  // const checkLoginState = (response: any) => {
  //   console.log("login status", response);
  //   if (response.authResponse) {
  //     responseApi(response.authResponse);
  //   } else {
  //     console.log("error", response);
  //   }
  // };

  // const responseApi = (authResponse: any) => {
  //   (window as any).FB.api(
  //     "/me",
  //     { fields: "name,email,picture" },
  //     (me: any) => {
  //       Object.assign(me, authResponse);
  //       console.log("response", me);
  //     }
  //   );
  // };

  // const loadSdkAsynchronously = () => {
  //   ((d, s, id) => {
  //     const element = d.getElementsByTagName(s)[0];
  //     const fjs = element as any;
  //     let js = element;
  //     if (d.getElementById(id)) {
  //       return;
  //     }
  //     js = d.createElement(s);
  //     js.id = id;
  //     (js as any).src = `https://connect.facebook.net/en_US/sdk.js`;
  //     fjs.parentNode.insertBefore(js, fjs);
  //   })(document, "script", "facebook-jssdk");
  // };

  // // (window as any).FB.login(function (response: any) {
  // //   if (response.authResponse) {
  // //     console.log(response);
  // //     console.log("Welcome!  Fetching your information.... ");
  // //     (window as any).FB.api("/me", function (response: any) {
  // //       console.log(response);
  // //       console.log("Good to see you, " + response.name + ".");
  // //     });
  // //   } else {
  // //     console.log("User cancelled login or did not fully authorize.");
  // //   }
  // // });

  const handleLogin = () => {
    auth?.login(
      () => {
        console.log("navigate");
        navigate("/", { replace: true });
      },
      () => {
        toaster.negative("Failed to login. Try again later.");
      }
    );
  };

  return (
    <div className="login-container">
      <Headline>Rupert AI</Headline>
      <Button
        styleType="high-visibility"
        disabled={!auth?.isSdkLoaded}
        onClick={handleLogin}
      >
        Login using Facebook
      </Button>
      <div className="login-legal">
        <Small>Privacy policy</Small>
        &middot;
        <Small>Terms of use</Small>
      </div>
    </div>
  );
}

export default Login;
