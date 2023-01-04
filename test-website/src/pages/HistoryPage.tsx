import {
  Content,
  SideNav,
  SideNavItems,
  Switcher,
  SwitcherItem,
} from "carbon-components-react";
import React from "react";
import PreviewImage from "../components/PreviewImage";
import { useTestsContext } from "../hooks/useTestsContext";

export function HistoryPage() {
  const { runs } = useTestsContext();
  const [currentRun, setCurrentRun] = React.useState(0);

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
              >{`Test #${index}`}</SwitcherItem>
            ))}
          </Switcher>
        </SideNavItems>
      </SideNav>
      <Content>
        <div>
          {runs[currentRun].files.map((file) => (
            <PreviewImage image={file} />
          ))}
        </div>
      </Content>
    </>
  );
}
