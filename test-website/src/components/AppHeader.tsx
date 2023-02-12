import {
  Header,
  HeaderContainer,
  HeaderGlobalAction,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderName,
  Search,
  SideNav,
  SideNavDivider,
  SideNavItem,
  SideNavItems,
  SideNavLink,
  SideNavLinkText,
} from "carbon-components-react";
import { Link, useLocation } from "react-router-dom";
import { AddAlt, ListChecked, MachineLearning, MachineLearningModel, Folder, UserAvatar } from "@carbon/icons-react";
import "./AppHeader.css"
import useIsMobile from "../hooks/useIsMobile";

export function AppHeader() {
  // const auth = useAuth();
  // const navigate = useNavigate();

  // const handleLogin = async () => {
  // try {
  //   await auth?.login();
  //   navigate("/", { replace: true });
  // } catch {
  //   console.error("Failed to login. Try again later.");
  // }
  // };
  const { pathname } = useLocation();
  const isMobile = useIsMobile();

  return (
    <HeaderContainer render={({ isSideNavExpanded, onClickSideNavExpand, }) =>
      <>
        <Header aria-label="Rupert">
          <HeaderMenuButton
            aria-label="Open menu"
            isActive={isSideNavExpanded}
            onClick={onClickSideNavExpand}
          />
          <HeaderName element={Link} to="/" prefix="" className="rai-header-name">
            Rupert AI
          </HeaderName>
          {!isMobile && <Search labelText="Search projects and assets" placeholder="Search projects and assets" size="lg" className="rai-header-search-input" />}
          <HeaderGlobalBar>
            <HeaderGlobalAction>
              <UserAvatar size="20" />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
          <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
            <SideNavItems className="rai-side-nav-items">
              <SideNavLink renderIcon={AddAlt} element={Link} to="/" aria-current={pathname === '/' ? "page" : undefined}>
                Create new project
              </SideNavLink>
              <SideNavLink renderIcon={ListChecked} element={Link} to="/projects" aria-current={pathname.includes('/projects') ? "page" : undefined}>
                Projects
              </SideNavLink>
              <SideNavDivider />
              <SideNavLink aria-disabled renderIcon={MachineLearning}>
                Rupert AI tools
              </SideNavLink>
              <SideNavLink aria-disabled renderIcon={MachineLearningModel}>
                AI training
              </SideNavLink>
              <SideNavLink aria-disabled renderIcon={Folder}>
                Assets
              </SideNavLink>
            </SideNavItems>
          </SideNav>
        </Header>
      </>}
    />
  );
}

export default AppHeader;
