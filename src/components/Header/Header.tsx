import {
  DropdownMenu,
  IconButton,
  MenuDivider,
  MenuExtraContent,
  MenuItem,
  UserIcon,
  Text,
} from "@itwin/itwinui-react";
import { useAuth } from "../../services/useAuth";

const Header = () => {
  const auth = useAuth();

  const getAbbr = () => {
    const name = auth?.user?.name;
    if (!name) {
      return;
    }

    const split = name.split(" ");
    return split[1] ? split[0][0] + split[1][0] : split[0];
  };

  const userIconMenuItems = (close: () => void) => [
    <MenuExtraContent key={0}>
      <>
        <Text variant="leading">{auth?.user?.name}</Text>
        <Text isMuted style={{ marginBottom: 8 }}>
          {auth?.user?.email}
        </Text>
      </>
    </MenuExtraContent>,
    <MenuDivider key={1} />,
    <MenuItem key={2} value="Sign out" onClick={() => auth?.logout()}>
      Sign out
    </MenuItem>,
  ];

  return (
    <div
      style={{
        borderBottom: "1px solid hsla(0, 0%, 100%, 0.2)",
      }}
    >
      <nav
        style={{
          padding: "16px 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a href="/">
          <img
            src="https://uploads-ssl.webflow.com/616f247b1bc869eb00d4dd00/620aa47e2c45839dc43667cf_logo-white.svg"
            alt="Rupert logo"
          />
        </a>
        {!!auth?.user && (
          <DropdownMenu
            menuItems={userIconMenuItems}
            style={{ backgroundColor: "#161616" }}
          >
            <div style={{ cursor: "pointer" }}>
              <UserIcon
                size="large"
                title={auth?.user?.name}
                abbreviation={getAbbr()}
                backgroundColor="#161616"
              />
            </div>
          </DropdownMenu>
        )}
      </nav>
    </div>
  );
};

export default Header;
