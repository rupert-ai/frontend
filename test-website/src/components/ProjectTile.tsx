import { ClickableTile } from 'carbon-components-react';
import PredictedChampionText from './PredictedChampionText';
import PreviewImage from './PreviewImage';

type ProjectTileProps = {
  imageUrl: string;
  label: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function ProjectTile({ imageUrl, label, style, ...rest }: ProjectTileProps) {
  return (
    <ClickableTile
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 32,
        width: '100%',
        ...style,
      }}
      {...rest}
    >
      <div style={{ wordBreak: 'break-all' }}>{label}</div>
      <PredictedChampionText />
      <PreviewImage
        image={{ name: label, url: imageUrl }}
        style={{ width: 'auto', height: 'auto', objectFit: 'cover' }}
      />
    </ClickableTile>
  );
}
