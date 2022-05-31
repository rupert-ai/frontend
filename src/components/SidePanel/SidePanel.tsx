import {
  ColorSwatch,
  ExpandableBlock,
  HorizontalTabs,
  InformationPanel,
  InformationPanelBody,
  InformationPanelContent,
  InformationPanelHeader,
  Leading,
  Tab,
  Text,
  Tooltip,
} from "@itwin/itwinui-react";
import { ReactNode, useState } from "react";
import { Ad } from "../../services/backend";
import "./SidePanel.css";

type SidePanelProps = {
  children: ReactNode;
  ad: Ad | undefined;
  isOpen: boolean;
  onClose?: () => void;
  relative?: boolean;
};

function SidePanel({
  children,
  ad,
  isOpen,
  onClose,
  relative = true,
}: SidePanelProps) {
  const [index, setIndex] = useState(0);

  return (
    <>
      {children}
      <InformationPanel
        isOpen={isOpen && !!ad}
        className={`${!relative ? "panel-relative" : undefined}`}
      >
        <InformationPanelHeader
          onClose={() => {
            onClose?.();
          }}
        >
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <img
              src={ad?.image_url}
              alt={`${ad?.name} ad thumbnail`}
              width={32}
              height={32}
            />
            <Text
              variant="subheading"
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
            >
              {ad?.name}
            </Text>
          </div>
        </InformationPanelHeader>
        <InformationPanelBody>
          <HorizontalTabs
            labels={[
              <Tab key="Details" label="Details" />,
              <Tab key="Statistics" label="Statistics" />,
            ]}
            type="pill"
            onTabSelected={setIndex}
          >
            {index === 0 && (
              <>
                <InformationPanelContent>
                  <h3 className="iui-text-spacing">
                    Clarity score: {ad?.clarity_score}
                  </h3>
                </InformationPanelContent>
                <hr />
                {ad?.vision.error ? (
                  <>
                    <h3 className="iui-text-spacing">Error</h3>
                    <div>{ad?.vision.error.message}</div>
                  </>
                ) : (
                  <>
                    <h3 className="iui-text-spacing">Text</h3>
                    <InformationPanelContent>
                      {ad?.vision.fullTextAnnotation?.pages?.map(
                        (page, pageIndex) => {
                          return (
                            <ExpandableBlock title={`Page ${pageIndex}`}>
                              Confidence {page.confidence.toFixed(2)}
                              {/* {page.blocks?.map((block, blockIndex) => {
                          return (
                            <ExpandableBlock title={`Block ${blockIndex}`}>
                              {block.paragraphs?.map((par) => (
                                <div>{par.words?.map(word => <div>{word.}</div>)}</div>
                              ))}
                            </ExpandableBlock>
                          );
                        })} */}
                            </ExpandableBlock>
                          );
                        }
                      )}
                      {ad?.vision.fullTextAnnotation?.text && (
                        <Text>
                          Full text: ${ad?.vision.fullTextAnnotation?.text}
                        </Text>
                      )}
                    </InformationPanelContent>
                    <hr />
                    <InformationPanelContent>
                      <h3 className="iui-text-spacing">Colors</h3>
                      <div
                        style={{ display: "flex", gap: 2, flexWrap: "wrap" }}
                      >
                        {ad?.vision.imagePropertiesAnnotation?.dominantColors.colors?.map(
                          (color) => {
                            return (
                              <Tooltip content={color.score} key={color.hex}>
                                <ColorSwatch
                                  color={{
                                    r: color.color.red,
                                    g: color.color.green,
                                    b: color.color.blue,
                                    a: color.color.alpha,
                                  }}
                                />
                              </Tooltip>
                            );
                          }
                        )}
                      </div>
                    </InformationPanelContent>
                    <hr />
                    <InformationPanelContent>
                      <h3 className="iui-text-spacing">Faces</h3>
                      {ad?.vision.faceAnnotations?.map((face, faceIndex) => {
                        return (
                          <div
                            style={{
                              display: "flex",
                              gap: 4,
                              flexDirection: "column",
                            }}
                          >
                            <Leading>Face #{faceIndex}:</Leading>
                            <div>Joy: {face.joyLikelihood}</div>
                            <div>Sorrow: {face.sorrowLikelihood}</div>
                            <div>Anger: {face.angerLikelihood}</div>
                            <div>Surprise: {face.surpriseLikelihood}</div>
                            <div>Exposed: {face.underExposedLikelihood}</div>
                            <div>Blurred: {face.blurredLikelihood}</div>
                            <div>Headwear: {face.headwearLikelihood}</div>
                            <div>Roll: {face.rollAngle.toFixed(2)}</div>
                            <div>Tilt: {face.tiltAngle.toFixed(2)}</div>
                            <div>Pan: {face.panAngle.toFixed(2)}</div>
                            <div>
                              Confidence: {face.detectionConfidence.toFixed(2)}
                            </div>
                          </div>
                        );
                      })}
                    </InformationPanelContent>
                    <hr />
                    <InformationPanelContent>
                      <h3 className="iui-text-spacing">Localized objects</h3>
                      {ad?.vision.localizedObjectAnnotations?.map((obj) => {
                        return (
                          <div>
                            {obj.name}: {obj.score.toFixed(2)}
                          </div>
                        );
                      })}
                    </InformationPanelContent>
                    <hr />
                    <InformationPanelContent>
                      <h3 className="iui-text-spacing">Labels</h3>
                      <div
                        style={{
                          display: "flex",
                          gap: 4,
                          flexDirection: "column",
                        }}
                      >
                        {ad?.vision.labelAnnotations?.map((label) => {
                          return (
                            <div>
                              {label.description}: {label.score.toFixed(2)}
                            </div>
                          );
                        })}
                      </div>
                    </InformationPanelContent>
                    <hr />
                    <InformationPanelContent>
                      <h3 className="iui-text-spacing">Safe search</h3>
                      {ad?.vision.safeSearchAnnotation && (
                        <div
                          style={{
                            display: "flex",
                            gap: 4,
                            flexDirection: "column",
                          }}
                        >
                          <div>
                            Adult: {ad?.vision.safeSearchAnnotation?.adult}
                          </div>
                          <div>
                            Medical: {ad?.vision.safeSearchAnnotation?.medical}
                          </div>
                          <div>
                            Racy: {ad?.vision.safeSearchAnnotation?.racy}
                          </div>
                          <div>
                            Spoof: {ad?.vision.safeSearchAnnotation?.spoof}
                          </div>
                          <div>
                            Violence:{" "}
                            {ad?.vision.safeSearchAnnotation?.violence}
                          </div>
                        </div>
                      )}
                    </InformationPanelContent>
                  </>
                )}
              </>
            )}
            {index === 1 && (
              <div
                style={{ display: "flex", gap: 16, flexDirection: "column" }}
              >
                <div>Impressions: {ad?.impressions?.toFixed(2)}</div>
                <div>Amount Spent: {ad?.amount_spent?.toFixed(2)}</div>
                <div>Clicks: {ad?.clicks?.toFixed(2)}</div>
                <div>CPC: {ad?.cpc?.toFixed(2)}</div>
                <div>CTR: {ad?.ctr?.toFixed(2)}</div>
                <div>Reach: {ad?.reach?.toFixed(2)}</div>
                <div>Link Clicks: {ad?.inline_link_clicks?.toFixed(2)}</div>
                <div>Outbound Clicks: {ad?.outbound_clicks?.toFixed(2)}</div>
              </div>
            )}
          </HorizontalTabs>
        </InformationPanelBody>
      </InformationPanel>
    </>
  );
}

export default SidePanel;
