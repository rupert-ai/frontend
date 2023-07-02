import {
  Header,
  HeaderContainer,
  HeaderGlobalBar,
  HeaderMenuButton,
  HeaderName,
  OverflowMenuItem,
  SideNav,
  SideNavDivider,
  SideNavItems,
  SideNavLink,
  Popover,
  PopoverContent,
  Button,
} from 'carbon-components-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AddAlt, ListChecked, MachineLearning, MachineLearningModel, Folder, UserAvatar } from '@carbon/icons-react';
import './AppHeader.css';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';

const isNewProject = (path: string) => path === '/' || path.includes('/generate') || path === '/test';

export function AppHeader() {
  const { user } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  // const navigate = useNavigate();

  // const handleLogin = async () => {
  //   try {
  //     await auth?.login();
  //     navigate('/', { replace: true });
  //   } catch {
  //     console.error('Failed to login. Try again later.');
  //   }
  // };
  const { pathname } = useLocation();

  const logOut = () => {
    setShowUserMenu(false);
    signOut(auth).then(() => navigate('/login'));
  };

  return (
    <HeaderContainer
      render={({ isSideNavExpanded, onClickSideNavExpand }) => (
        <>
          <Header aria-label="Rupert">
            <HeaderMenuButton aria-label="Open menu" isActive={isSideNavExpanded} onClick={onClickSideNavExpand} />
            <HeaderName element={Link} to="/" prefix="" className="rai-header-name">
              Rupert AI
            </HeaderName>
            <HeaderGlobalBar>
              {/* <HeaderGlobalAction aria-label="Search">
                <ExpandableSearch labelText="Search" />
              </HeaderGlobalAction> */}
              {!!user && (
                <Popover open={showUserMenu} autoAlign>
                  <Button
                    className="cds--header__action"
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                    onClick={() => setShowUserMenu(v => !v)}
                  >
                    <UserAvatar size="20" />
                  </Button>
                  <PopoverContent>
                    <OverflowMenuItem hasDivider itemText="Sign out" onClick={logOut} />
                  </PopoverContent>
                </Popover>
              )}
            </HeaderGlobalBar>
            {pathname !== '/login' && pathname !== '/register' && (
              <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
                <SideNavItems className="rai-side-nav-items">
                  <SideNavLink
                    renderIcon={AddAlt}
                    element={Link}
                    to="/"
                    aria-current={isNewProject(pathname) ? 'page' : undefined}
                    onClick={onClickSideNavExpand}
                  >
                    Create new project
                  </SideNavLink>
                  <SideNavLink
                    renderIcon={ListChecked}
                    element={Link}
                    to="/projects"
                    aria-current={pathname.includes('/projects') ? 'page' : undefined}
                    onClick={onClickSideNavExpand}
                  >
                    Projects
                  </SideNavLink>
                  <SideNavDivider />
                  <SideNavLink aria-disabled renderIcon={MachineLearning} onClick={onClickSideNavExpand}>
                    Rupert AI tools
                  </SideNavLink>
                  <SideNavLink aria-disabled renderIcon={MachineLearningModel} onClick={onClickSideNavExpand}>
                    AI training
                  </SideNavLink>
                  <SideNavLink aria-disabled renderIcon={Folder} onClick={onClickSideNavExpand}>
                    Assets
                  </SideNavLink>
                </SideNavItems>
              </SideNav>
            )}
          </Header>
        </>
      )}
    />
  );
}

export default AppHeader;
