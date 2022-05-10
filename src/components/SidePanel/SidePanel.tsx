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
};

function SidePanel({ children, ad, isOpen, onClose }: SidePanelProps) {
  const [index, setIndex] = useState(0);

  return (
    <>
      {children}
      <InformationPanel isOpen={isOpen && !!ad}>
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
            onTabSelected={setIndex}
          >
            {index === 0 && (
              <>
                <Leading>Text</Leading>
                <InformationPanelContent>
                  {ad?.vision.fullTextAnnotation.pages?.map(
                    (page, pageIndex) => {
                      return (
                        <ExpandableBlock title={`Page ${pageIndex}`}>
                          Confidence {page.confidence}
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
                  <Text>Full text: ${ad?.vision.fullTextAnnotation.text}</Text>
                </InformationPanelContent>
                <hr />
                <InformationPanelContent>
                  <Leading>Colors</Leading>
                  <div style={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    {ad?.vision.imagePropertiesAnnotation.dominantColors.colors?.map(
                      (color) => {
                        return (
                          <Tooltip content={color.score}>
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
                  <Leading>Faces</Leading>
                  {ad?.vision.faceAnnotations?.map((face, faceIndex) => {
                    return (
                      <>
                        <Leading>Face #{faceIndex}:</Leading>
                        <div>Joy: {face.joyLikelihood}</div>
                        <div>Sorrow: {face.sorrowLikelihood}</div>
                        <div>Anger: {face.angerLikelihood}</div>
                        <div>Surprise: {face.surpriseLikelihood}</div>
                        <div>Exposed: {face.underExposedLikelihood}</div>
                        <div>Blurred: {face.blurredLikelihood}</div>
                        <div>Headwear: {face.headwearLikelihood}</div>
                        <div style={{ display: "flex", gap: 2 }}>
                          <span>Roll: {face.rollAngle}</span>
                          <span>Tilt: {face.tiltAngle}</span>
                          <span>Pan: {face.panAngle}</span>
                        </div>
                        <div>Confidence: {face.detectionConfidence}</div>
                      </>
                    );
                  })}
                </InformationPanelContent>
                <hr />
                <InformationPanelContent>
                  <Leading>Localized objects</Leading>
                  {ad?.vision.localizedObjectAnnotations?.map((obj) => {
                    return (
                      <div>
                        {obj.name}: {obj.score}
                      </div>
                    );
                  })}
                </InformationPanelContent>
                <hr />
                <InformationPanelContent>
                  <Leading>Labels</Leading>
                  <div
                    style={{ display: "flex", gap: 4, flexDirection: "column" }}
                  >
                    {ad?.vision.labelAnnotations?.map((label) => {
                      return (
                        <div>
                          {label.description}: {label.score}
                        </div>
                      );
                    })}
                  </div>
                </InformationPanelContent>
                <hr />
                <InformationPanelContent>
                  <Leading>Safe search</Leading>
                  <div
                    style={{ display: "flex", gap: 4, flexDirection: "column" }}
                  >
                    <div>Adult: {ad?.vision.safeSearchAnnotation.adult}</div>
                    <div>
                      Medical: {ad?.vision.safeSearchAnnotation.medical}
                    </div>
                    <div>Racy: {ad?.vision.safeSearchAnnotation.racy}</div>
                    <div>Spoof: {ad?.vision.safeSearchAnnotation.spoof}</div>
                    <div>
                      Violence: {ad?.vision.safeSearchAnnotation.violence}
                    </div>
                  </div>
                </InformationPanelContent>
              </>
            )}
          </HorizontalTabs>
        </InformationPanelBody>
      </InformationPanel>
    </>
  );
}

export default SidePanel;
