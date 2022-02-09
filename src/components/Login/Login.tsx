import { Button, Headline, Small, toaster } from "@itwin/itwinui-react";
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
