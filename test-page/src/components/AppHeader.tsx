import {
  Button,
  Header,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenu,
  HeaderMenuButton,
  HeaderMenuItem,
  HeaderName,
  HeaderNavigation,
  Search,
  Switcher,
} from "carbon-components-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../services/useAuth";

export function AppHeader() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await auth?.login();
      navigate("/test", { replace: true });
    } catch {
      console.error("Failed to login. Try again later.");
    }
  };

  return (
    <Header aria-label="Rupert">
      <HeaderMenuButton
        aria-label="Open menu"
        isCollapsible
        //  onClick={onClickSideNavExpand}
        //  isActive={isSideNavExpanded}
      />
      <HeaderName element={Link} to="/" prefix="">
        Rupert
      </HeaderName>
      <HeaderNavigation aria-label="Rupert">
        <HeaderMenuItem element={Link} to="/test">
          Create a test
        </HeaderMenuItem>
        <HeaderMenuItem href="#">History</HeaderMenuItem>
      </HeaderNavigation>
      {!auth?.user?.accessToken && (
        <HeaderGlobalBar>
          <HeaderGlobalAction aria-label="Login" onClick={handleLogin}>
            <Button>Login</Button>
          </HeaderGlobalAction>
        </HeaderGlobalBar>
      )}
    </Header>
  );
}

export default AppHeader;
