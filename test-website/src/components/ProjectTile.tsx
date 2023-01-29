import { Tile } from "carbon-components-react";
import PredictedChampionText from "./PredictedChampionText";
import PreviewImage from "./PreviewImage";

type ProjectTileProps = {
  image: File;
  label: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function ProjectTile({ image, label, style, ...rest }: ProjectTileProps) {

  return <Tile
    style={{
      display: "flex",
      flexDirection: "column",
      gap: 32,
      width: "100%",
      ...style
    }}
    {...rest}
  >
    <div>{label}</div>
    <PredictedChampionText />
    <PreviewImage
      image={image}
      style={{ width: "auto", height: "auto" }}
    />
  </Tile>
}