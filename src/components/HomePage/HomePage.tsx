import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ButtonGroup,
  Headline,
  IconButton,
  MenuItem,
  Tile,
} from "@itwin/itwinui-react";
import AdsTable from "../AdsTable/AdsTable";
import { useAuth } from "../../services/useAuth";
import { Ad, Backend } from "../../services/backend";
import { SvgChevronRight, SvgGrid, SvgList } from "@itwin/itwinui-icons-react";
import SidePanel from "../SidePanel/SidePanel";
import BreadcrumbItem from "../Breadcrumbs/BreadcrumbItem";

function HomePage() {
  const auth = useAuth();
  const [data, setData] = useState<Ad[]>([]);
  const [isSynced, setIsSynced] = useState(false);
  const [isError, setIsError] = useState(false);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [showPanel, setShowPanel] = useState(false);
  const [currentAd, setCurrentAd] = useState<Ad>();
  const toggleAdVision = (ad: Ad) => {
    setCurrentAd(ad);
    setShowPanel(true);
  };
  const [currentAccount, setCurrentAccount] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [currentCampaign, setCurrentCampaign] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [currentAdSet, setCurrentAdSet] = useState<{
    id: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    if (!auth?.user?.accessToken) {
      return;
    }

    const getData = async () => {
      try {
        const res = await Backend.getAdsList(auth?.user?.accessToken ?? "");
        if (res.synced) {
          setIsSynced(true);
          setData(res.data);
        } else {
          setData(res.data);
          setTimeout(() => {
            getData();
          }, 4000);
        }
      } catch {
        setIsSynced(true);
        setIsError(true);
      }
    };

    getData();
  }, [auth?.user?.accessToken]);

  useEffect(() => {
    setCurrentCampaign(null);
  }, [currentAccount]);

  useEffect(() => {
    setCurrentAdSet(null);
  }, [currentCampaign]);

  const accountOptions = useCallback(
    (close: () => void) => {
      const accounts: Record<string, string> = {};
      data.forEach((el) => {
        accounts[el.account_id] = el.account_name;
      });
      return [
        <MenuItem
          key="All"
          onClick={() => {
            setCurrentAccount(null);
            close();
          }}
          isSelected={!currentAccount}
        >
          All
        </MenuItem>,
        ...Array.from(Object.keys(accounts)).map((id) => (
          <MenuItem
            key={id}
            onClick={() => {
              setCurrentAccount({ id, name: accounts[id] });
              close();
            }}
            isSelected={currentAccount?.id === id}
            sublabel={id}
          >
            {accounts[id]}
          </MenuItem>
        )),
      ];
    },
    [currentAccount, data]
  );

  const campaignOptions = useCallback(
    (close: () => void) => {
      const filteredData = currentAccount
        ? data.filter((el) => el.account_id === currentAccount.id)
        : data;
      const campaigns: Record<string, string> = {};
      filteredData.forEach((el) => {
        campaigns[el.campaign_id] = el.campaign_name;
      });
      return [
        <MenuItem
          key="All"
          onClick={() => {
            setCurrentCampaign(null);
            close();
          }}
          isSelected={!currentCampaign}
        >
          All
        </MenuItem>,
        ...Array.from(Object.keys(campaigns)).map((id) => (
          <MenuItem
            key={id}
            onClick={() => {
              setCurrentCampaign({ id, name: campaigns[id] });
              close();
            }}
            isSelected={currentCampaign?.id === id}
          >
            {campaigns[id]}
          </MenuItem>
        )),
      ];
    },
    [currentAccount, currentCampaign, data]
  );

  const adSetOptions = useCallback(
    (close: () => void) => {
      const filteredData =
        currentAccount || currentCampaign
          ? data.filter((el) => {
              const isSameAccount = currentAccount
                ? el.account_id === currentAccount.id
                : true;
              const isSameCampaign = currentCampaign
                ? el.campaign_id === currentCampaign.id
                : true;
              return isSameAccount && isSameCampaign;
            })
          : data;
      const adSets: Record<string, string> = {};
      filteredData.forEach((el) => {
        adSets[el.adset_id] = el.adset_name;
      });
      return [
        <MenuItem
          key="All"
          onClick={() => {
            setCurrentAdSet(null);
            close();
          }}
          isSelected={!currentAdSet}
        >
          All
        </MenuItem>,
        ...Array.from(Object.keys(adSets)).map((id) => (
          <MenuItem
            key={id}
            onClick={() => {
              setCurrentAdSet({ id, name: adSets[id] });
              close();
            }}
            isSelected={currentAdSet?.id === id}
          >
            {adSets[id]}
          </MenuItem>
        )),
      ];
    },
    [currentAccount, currentAdSet, currentCampaign, data]
  );

  const adsData = useMemo(() => {
    return currentAccount || currentCampaign || currentAdSet
      ? data.filter((el) => {
          const isSameAccount = currentAccount
            ? el.account_id === currentAccount?.id
            : true;
          const isSameCampaign = currentCampaign
            ? el.campaign_id === currentCampaign?.id
            : true;
          const isSameAdSet = currentAdSet
            ? el.adset_id === currentAdSet?.id
            : true;
          return isSameAccount && isSameCampaign && isSameAdSet;
        })
      : data;
  }, [currentAccount, currentAdSet, currentCampaign, data]);

  const Separator = () => (
    <SvgChevronRight
      style={{ width: 12, height: 12, fill: "var(--iui-color-background-1)" }}
    />
  );

  return (
    <div
      style={{
        flexGrow: 1,
        padding: "24px 48px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          rowGap: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 32,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Headline style={{ margin: 0 }}>User Ads</Headline>
          <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <BreadcrumbItem
              label="Ad Account"
              menuItems={accountOptions}
              currentItem={currentAccount?.name}
            />
            <Separator />
            <BreadcrumbItem
              label="Campaign"
              menuItems={campaignOptions}
              currentItem={currentCampaign?.name}
            />
            <Separator />
            <BreadcrumbItem
              label="Ad Set"
              menuItems={adSetOptions}
              currentItem={currentAdSet?.name}
            />
          </span>
        </div>
        <div>
          <ButtonGroup>
            <IconButton
              key="grid-button"
              isActive={viewType === "grid"}
              onClick={() => setViewType("grid")}
              styleType="borderless"
            >
              <SvgGrid />
            </IconButton>
            <IconButton
              key="list-button"
              isActive={viewType === "list"}
              onClick={() => {
                setCurrentAd(undefined);
                setViewType("list");
              }}
              styleType="borderless"
            >
              <SvgList />
            </IconButton>
          </ButtonGroup>
        </div>
      </div>
      {viewType === "grid" && (
        <div>
          <SidePanel
            isOpen={showPanel}
            ad={currentAd}
            onClose={() => {
              setShowPanel(false);
              setCurrentAd(undefined);
            }}
            relative={false}
          >
            <div
              style={{
                display: "grid",
                gap: 24,
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(100%, 256px), 1fr))",
                padding: "3px 0",
              }}
            >
              {adsData.map((el) => (
                <Tile
                  isActionable
                  isSelected={currentAd?.name === el.name}
                  name={el.name}
                  thumbnail={el.image_url}
                  onClick={() => toggleAdVision(el)}
                />
              ))}
            </div>
          </SidePanel>
        </div>
      )}
      {viewType === "list" && (
        <AdsTable data={adsData} isLoading={!isSynced} isError={isError} />
      )}
    </div>
  );
}

export default HomePage;
