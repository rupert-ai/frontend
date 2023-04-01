import { Tile } from 'carbon-components-react';
import PredictedChampionText from './PredictedChampionText';
import PreviewImage from './PreviewImage';

type RunTileProps = {
  imageUrl: string;
  label: string;
  isChamp: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function RunTile({ imageUrl, label, isChamp, style, ...rest }: RunTileProps) {
  return (
    <Tile
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        width: '100%',
        height: '100%',
        ...style,
      }}
      {...rest}
    >
      {isChamp ? <PredictedChampionText /> : <div>{label}</div>}
      <PreviewImage
        image={{ name: label, url: imageUrl }}
        style={{ width: 'auto', height: 'auto', objectFit: 'cover' }}
      />
      <div
        style={{
          wordBreak: 'break-all',
          display: '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
          overflow: 'hidden',
        }}
      >
        {label}
      </div>
    </Tile>
  );
}
