import { Button } from "carbon-components-react";
import React from "react";
import { useLocation } from "react-router-dom";
import PreviewImage from "../components/PreviewImage";

export function ResultPage() {
  // const { state }: { state: ResearchItem[] } = useLocation();
  const { state }: { state: File[] } = useLocation();

  const mainImage = React.useMemo(() => {
    // let bestItem: ResearchItem = { clarity_score: "0" } as ResearchItem;
    // for (let i = 0; i < state.length; ++i) {
    //   bestItem =
    //     Number(bestItem.clarity_score) > Number(state[i].clarity_score)
    //       ? bestItem
    //       : state[i];
    // }

    return state[0];
  }, [state]);

  return (
    <>
      <div className="rai-test-page">
        <h2>Your test has finished.</h2>
        <small>Here are your test results:</small>
        <div style={{ display: "flex", gap: 8 }}>
          {/* <img src={mainImage.image_original} width="128" height="128" /> */}
          <PreviewImage image={mainImage} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>This is a long text aobut results</div>
            <div style={{ display: "flex", gap: 8 }}>
              <Button size="sm">Create another test</Button>
              <Button kind="tertiary" size="sm">
                Do something else
              </Button>
            </div>
          </div>
        </div>
        <div>
          <small>Test participants</small>
          <div
            style={{
              marginTop: 32,
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            {state.map((i) => (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {/* <img src={i.image_original} width="256" height="256" /> */}
                <PreviewImage image={i} />
                <div>{i.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ResultPage;
