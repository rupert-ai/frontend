import { ClickableTile } from 'carbon-components-react';
import PredictedChampionText from './PredictedChampionText';
import PreviewImage from './PreviewImage';
import './ProjectTile.css';

type ProjectTileProps = {
  imageUrl: string;
  label: string;
  onClick: () => void;
};

export function ProjectTile({ imageUrl, label, onClick }: ProjectTileProps) {
  return (
    <ClickableTile className="rai-project-tile" onClick={onClick}>
      <div className="rai-project-tile-label">{label}</div>
      <PredictedChampionText />
      <PreviewImage
        image={{ name: label, url: imageUrl }}
        style={{ width: '100%', height: 'unset', objectFit: 'cover' }}
      />
    </ClickableTile>
  );
}
