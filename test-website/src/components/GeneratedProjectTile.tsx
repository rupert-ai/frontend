import { ClickableTile } from 'carbon-components-react';
import PreviewImage from './PreviewImage';
import './GeneratedProjectTile.css';

type GeneratedProjectTileProps = {
  image:
    | File
    | {
        name: string;
        url: string;
      };
  onClick: () => void;
  index: number;
};

export function GeneratedProjectTile({ image, index, onClick }: GeneratedProjectTileProps) {
  return (
    <ClickableTile className="rai-generated-project-tile" onClick={onClick}>
      <PreviewImage image={image} style={{ width: '100%', height: 'unset', objectFit: 'cover' }} />
      <div className="rai-generated-project-tile-index">#{index}</div>
    </ClickableTile>
  );
}
