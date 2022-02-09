import { useEffect, useState } from "react";
import "./HomePage.css";
import {
  DropdownMenu,
  Header,
  HeaderLogo,
  Headline,
  IconButton,
  MenuDivider,
  MenuExtraContent,
  MenuItem,
  SidenavButton,
  SideNavigation,
  Text,
  UserIcon,
} from "@itwin/itwinui-react";
import { SvgFlag, SvgHome } from "@itwin/itwinui-icons-react";
import AdsTable from "../AdsTable/AdsTable";
import { useAuth } from "../../services/useAuth";
import { Ad, Backend } from "../../services/backend";

function HomePage() {
  const auth = useAuth();
  const [data, setData] = useState<Ad[]>([]);
  const [isSynced, setIsSynced] = useState(false);

  useEffect(() => {
    if (!auth?.user?.accessToken) {
      return;
    }

    const getData = async () => {
      const res = await Backend.getAdsList(auth?.user?.accessToken ?? "");
      if (res.synced) {
        setIsSynced(true);
        setData(res.data);
      } else {
        setTimeout(() => {
          getData();
        }, 500);
      }
    };

    getData();
  }, [auth?.user?.accessToken]);

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

  // const adsMenuItems = useCallback(
  //   () =>
  //     ["Set 1", "Set 2", "Set 3", "Set 4"].map((set) => {
  //       return (
  //         <MenuItem key={set} value="set">
  //           {set}
  //         </MenuItem>
  //       );
  //     }),
  //   []
  // );

  const getAbbr = () => {
    const name = auth?.user?.name;
    if (!name) {
      return;
    }

    const split = name.split(" ");
    return split[1] ? split[0][0] + split[1][0] : split[0];
  };

  return (
    <>
      <Header
        appLogo={
          <HeaderLogo
            logo={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#FFFFFF"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M17 16.99c-1.35 0-2.2.42-2.95.8-.65.33-1.18.6-2.05.6-.9 0-1.4-.25-2.05-.6-.75-.38-1.57-.8-2.95-.8s-2.2.42-2.95.8c-.65.33-1.17.6-2.05.6v1.95c1.35 0 2.2-.42 2.95-.8.65-.33 1.17-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.57.8 2.95.8s2.2-.42 2.95-.8c.65-.33 1.18-.6 2.05-.6.9 0 1.4.25 2.05.6.75.38 1.58.8 2.95.8v-1.95c-.9 0-1.4-.25-2.05-.6-.75-.38-1.6-.8-2.95-.8zm0-4.45c-1.35 0-2.2.43-2.95.8-.65.32-1.18.6-2.05.6-.9 0-1.4-.25-2.05-.6-.75-.38-1.57-.8-2.95-.8s-2.2.43-2.95.8c-.65.32-1.17.6-2.05.6v1.95c1.35 0 2.2-.43 2.95-.8.65-.35 1.15-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.57.8 2.95.8s2.2-.43 2.95-.8c.65-.35 1.15-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.58.8 2.95.8v-1.95c-.9 0-1.4-.25-2.05-.6-.75-.38-1.6-.8-2.95-.8zm2.95-8.08c-.75-.38-1.58-.8-2.95-.8s-2.2.42-2.95.8c-.65.32-1.18.6-2.05.6-.9 0-1.4-.25-2.05-.6-.75-.37-1.57-.8-2.95-.8s-2.2.42-2.95.8c-.65.33-1.17.6-2.05.6v1.93c1.35 0 2.2-.43 2.95-.8.65-.33 1.17-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.57.8 2.95.8s2.2-.43 2.95-.8c.65-.32 1.18-.6 2.05-.6.9 0 1.4.25 2.05.6.75.38 1.58.8 2.95.8V5.04c-.9 0-1.4-.25-2.05-.58zM17 8.09c-1.35 0-2.2.43-2.95.8-.65.35-1.15.6-2.05.6s-1.4-.25-2.05-.6c-.75-.38-1.57-.8-2.95-.8s-2.2.43-2.95.8c-.65.35-1.15.6-2.05.6v1.95c1.35 0 2.2-.43 2.95-.8.65-.32 1.18-.6 2.05-.6s1.4.25 2.05.6c.75.38 1.57.8 2.95.8s2.2-.43 2.95-.8c.65-.32 1.18-.6 2.05-.6.9 0 1.4.25 2.05.6.75.38 1.58.8 2.95.8V9.49c-.9 0-1.4-.25-2.05-.6-.75-.38-1.6-.8-2.95-.8z" />
              </svg>
            }
          >
            Rupert AI
          </HeaderLogo>
        }
        // actions={[
        //   <IconButton key={0} styleType="borderless">
        //     <SvgNotification />
        //   </IconButton>,
        // ]}
        userIcon={
          <DropdownMenu menuItems={userIconMenuItems}>
            <IconButton styleType="borderless">
              <UserIcon
                size="medium"
                title={auth?.user?.name}
                abbreviation={getAbbr()}
                backgroundColor="gray"
              />
            </IconButton>
          </DropdownMenu>
        }
      />
      <div style={{ display: "flex", height: "calc(100% - 57px)" }}>
        <SideNavigation
          items={[
            <SidenavButton startIcon={<SvgHome />} key={0}>
              Overview
            </SidenavButton>,
          ]}
          expanderPlacement="hidden"
        />
        <div
          style={{
            flexGrow: 1,
            padding: 16,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <Headline>User Ads</Headline>
          {/* <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Text as="h2">Ads</Text>
            <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
              <Text as="span" isMuted>
                Show:
              </Text>
              <DropdownButton menuItems={adsMenuItems} styleType="borderless">
                Ad set #1
              </DropdownButton>
            </span>
          </span> */}
          {/* <Toolbar /> */}
          {/* <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          justifyContent: "space-between",
        }}
      >
        <LabeledInput
          placeholder="Search by Name, Impressions, etc..."
          svgIcon={<SvgSearch />}
          iconDisplayStyle="inline"
          style={{ width: "50%" }}
        />
        <div>
          <Text as="span" isMuted>
            Sort by:
          </Text>
          <DropdownButton menuItems={() => []} styleType="borderless">
            Due Date
          </DropdownButton>
        </div>
      </div> */}
          <AdsTable data={data} isLoading={!isSynced} />
        </div>
      </div>
    </>
  );
}

export default HomePage;
