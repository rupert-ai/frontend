import { Anchor, Button, toaster } from "@itwin/itwinui-react";
import "./Login.css";
import { useAuth } from "../../services/useAuth";
import { useNavigate } from "react-router-dom";

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await auth?.login();
      navigate("/", { replace: true });
    } catch {
      toaster.negative("Failed to login. Try again later.");
    }
  };

  return (
    <div className="login-container">
      <svg
        width="43"
        height="41"
        viewBox="0 0 43 41"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginBottom: 16 }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M35.6922 31.765L28.0236 39.5737C26.7217 40.8986 24.6108 40.8986 23.3088 39.5737C22.0069 38.2487 22.0069 36.1006 23.3088 34.7757L25.3189 32.7255C26.2995 31.3899 26.2059 29.4682 25.0054 28.2465C23.7035 26.9215 21.5926 26.9215 20.2906 28.2465L12.2939 36.386C10.9919 37.7109 8.88103 37.7109 7.57907 36.386C6.27712 35.061 6.27712 32.9129 7.57907 31.5879L14.7008 24.3373C16.0028 23.0124 16.0028 20.8643 14.7008 19.5393C13.5003 18.3176 11.6119 18.2224 10.3042 19.2539C10.3032 19.2464 9.02377 20.5362 6.46602 23.1231C5.16407 24.448 3.05319 24.448 1.75124 23.1231C0.449293 21.7981 0.449293 19.65 1.75124 18.3251L12.1183 7.77496C12.1836 7.70849 12.251 7.64536 12.3202 7.58556C12.4592 7.43345 12.6015 7.28331 12.747 7.13522L14.3186 5.53588C20.8283 -1.08878 31.3827 -1.08878 37.8925 5.53588C44.4022 12.1606 44.4022 22.9013 37.8925 29.5259L36.3209 31.1253C36.1754 31.2734 36.0278 31.4181 35.8783 31.5596C35.8196 31.63 35.7575 31.6985 35.6922 31.765ZM26.1498 21.9007C28.566 21.9007 30.5248 19.9109 30.5248 17.4563C30.5248 15.0017 28.566 13.0118 26.1498 13.0118C23.7335 13.0118 21.7748 15.0017 21.7748 17.4563C21.7748 19.9109 23.7335 21.9007 26.1498 21.9007Z"
          fill="white"
        />
      </svg>
      <Button
        styleType="high-visibility"
        disabled={!auth?.isSdkLoaded}
        onClick={handleLogin}
        className="login-button"
        startIcon={
          <svg
            fill="white"
            height="512px"
            id="Layer_1"
            version="1.1"
            viewBox="0 0 512 512"
            width="512px"
            // xml:space="preserve"
            xmlns="http://www.w3.org/2000/svg"
            // xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <path d="M288,192v-38.1c0-17.2,3.8-25.9,30.5-25.9H352V64h-55.9c-68.5,0-91.1,31.4-91.1,85.3V192h-45v64h45v192h83V256h56.4l7.6-64  H288z" />
          </svg>
        }
      >
        Login with Facebook
      </Button>
      <div className="login-legal">
        <Anchor href="https://www.getrupert.com/legal">Privacy policy</Anchor>
      </div>
    </div>
  );
}

export default Login;
