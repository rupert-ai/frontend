import { useEffect, useState } from "react";
import { ButtonGroup, Headline, IconButton, Tile } from "@itwin/itwinui-react";
import AdsTable from "../AdsTable/AdsTable";
import { useAuth } from "../../services/useAuth";
import { Ad, Backend } from "../../services/backend";
import { SvgGrid, SvgList } from "@itwin/itwinui-icons-react";
import SidePanel from "../SidePanel/SidePanel";

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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Headline style={{ margin: 0 }}>User Ads</Headline>
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
              {data.map((el) => (
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
        <AdsTable data={data} isLoading={!isSynced} isError={isError} />
      )}
    </div>
  );
}

export default HomePage;
