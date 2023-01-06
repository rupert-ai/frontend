import {
  Content,
  SideNav,
  SideNavItems,
  Switcher,
  SwitcherItem,
  Tile,
} from "carbon-components-react";
import React from "react";
import { useLocation } from "react-router-dom";
import PreviewImage from "../components/PreviewImage";
import { useTestsContext } from "../hooks/useTestsContext";

export function HistoryPage() {
  const { runs } = useTestsContext();
  const location = useLocation();
  const data = location.state;
  const [currentRun, setCurrentRun] = React.useState(data?.lastRun ?? 0);

  return (
    <>
      <SideNav
        aria-label="Uploaded images panel"
        expanded
        style={{
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "20rem",
        }}
      >
        <SideNavItems>
          <Switcher>
            {runs.map((_, index) => (
              <SwitcherItem
                isSelected={index === currentRun}
                onClick={() => setCurrentRun(index)}
              >{`Test #${index + 1}`}</SwitcherItem>
            ))}
          </Switcher>
        </SideNavItems>
      </SideNav>
      <Content style={{ width: "calc(100% - 16rem)" }}>
        <div
          style={{
            display: "grid",
            gridGap: 24,
            gridTemplateColumns:
              "repeat(auto-fill, minmax(MIN(100%, 256px), 1fr))",
          }}
        >
          {runs[currentRun]?.files.map((file, index) => (
            <div>
              <Tile
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 32,
                  width: "100%",
                }}
              >
                <div>{index === 0 ? "CHAMPION" : `#${index + 1}`}</div>
                <PreviewImage
                  image={file}
                  style={{ width: "auto", height: "auto" }}
                />
              </Tile>
            </div>
          ))}
        </div>
      </Content>
    </>
  );
}
