import { Tile } from "carbon-components-react";
import PredictedChampionText from "./PredictedChampionText";
import PreviewImage from "./PreviewImage";

type RunTileProps = {
  image: File;
  label: string;
  isChamp: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function RunTile({image, label, isChamp, style, ...rest}: RunTileProps) {
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
  {isChamp ? <PredictedChampionText /> : <div>{label}</div>}
  <div>{image.name}</div>
  <PreviewImage
    image={image}
    style={{ width: "auto", height: "auto" }}
  />
</Tile>
}