import { Anchor, Button, Headline, toaster } from "@itwin/itwinui-react";
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
      <Headline>Rupert AI</Headline>
      <Button
        styleType="high-visibility"
        disabled={!auth?.isSdkLoaded}
        onClick={handleLogin}
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
