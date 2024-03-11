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
  // @ts-ignore
  Popover,
  // @ts-ignore
  PopoverContent,
  Button,
  SideNavMenu,
  SideNavMenuItem,
  ButtonSkeleton,
} from 'carbon-components-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AddAlt, MachineLearning, MachineLearningModel, Folder, UserAvatar } from '@carbon/icons-react';
import './AppHeader.css';
import { useAuth } from '../hooks/useAuth';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useUserData } from '../hooks/useUserData';

const isNewProject = (path: string) => path === '/' || path === '/generate/' || path === '/test';

export function AppHeader() {
  const { user } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: userData, isLoading } = useUserData({ enabled: pathname !== '/login' });

  const goToPlans = async () => {
    setShowUserMenu(false);
    navigate('./plans');
  };

  // const handleLogin = async () => {
  //   try {
  //     await auth?.login();
  //     navigate('/', { replace: true });
  //   } catch {
  //     console.error('Failed to login. Try again later.');
  //   }
  // };

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
            {/* @ts-ignore */}
            <HeaderName as={Link} to="/" prefix="" className="rai-header-name">
              Rupert AI
            </HeaderName>
            <HeaderGlobalBar>
              {/* <HeaderGlobalAction aria-label="Search">
                <ExpandableSearch labelText="Search" />
              </HeaderGlobalAction> */}
              {!!user &&
                pathname !== '/login' &&
                (isLoading ? (
                  <ButtonSkeleton
                    className="rai-credits-link cds--layout--size-sm"
                    size="sm"
                    style={{ width: '5rem' }}
                  />
                ) : (
                  <Button className="rai-credits-link" kind="ghost" size="sm" as={Link} to="./plans">
                    {userData?.user?.plan === 'PRO' ? 'Unlimited credits' : `${userData?.user?.credits ?? 0} credits`}
                  </Button>
                ))}
              {!!user && (
                <Popover open={showUserMenu} autoAlign>
                  <Button className="cds--header__action rai-user-avatar" onClick={() => setShowUserMenu(v => !v)}>
                    <UserAvatar size="20" />
                  </Button>
                  <PopoverContent className="rai-menu-content">
                    {!!userData?.user?.stripeCustomerId && (
                      <OverflowMenuItem hasDivider itemText="Plans" onClick={goToPlans} />
                    )}
                    <OverflowMenuItem hasDivider itemText="Sign out" onClick={logOut} />
                  </PopoverContent>
                </Popover>
              )}
            </HeaderGlobalBar>
            {pathname !== '/login' && pathname !== '/register' && (
              <SideNav aria-label="Side navigation" expanded={isSideNavExpanded}>
                <SideNavItems className="rai-side-nav-new-project">
                  <SideNavLink
                    renderIcon={AddAlt}
                    // @ts-ignore
                    as={Link}
                    to="/"
                    aria-current={isNewProject(pathname) ? 'page' : undefined}
                    onClick={onClickSideNavExpand}
                  >
                    Create new project
                  </SideNavLink>
                </SideNavItems>
                <SideNavItems className="rai-side-nav-items">
                  <SideNavMenu title="My projects">
                    <SideNavMenuItem
                      // @ts-ignore
                      element={Link}
                      to="/generated"
                      aria-current={pathname === '/generated' ? 'page' : undefined}
                      onClick={onClickSideNavExpand}
                    >
                      My generated ads
                    </SideNavMenuItem>
                    <SideNavMenuItem
                      // @ts-ignore
                      element={Link}
                      to="/projects"
                      aria-current={pathname.includes('/projects') ? 'page' : undefined}
                      onClick={onClickSideNavExpand}
                    >
                      My tests
                    </SideNavMenuItem>
                  </SideNavMenu>
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
