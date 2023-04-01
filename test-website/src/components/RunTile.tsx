import { Tile } from 'carbon-components-react';
import { ResearchItem } from '../services/backend';
import PredictedChampionText from './PredictedChampionText';
import PreviewImage from './PreviewImage';

type RunTileProps = {
  instance: ResearchItem;
  isChamp: boolean;
  index: number;
} & React.HTMLAttributes<HTMLDivElement>;

export function RunTile({ instance, isChamp, index, style, ...rest }: RunTileProps) {
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
      {isChamp ? <PredictedChampionText /> : <div>{`# ${index}`}</div>}
      <PreviewImage
        image={{ name: instance.name, url: instance.imageOriginal }}
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
        {instance.name}
      </div>
    </Tile>
  );
}
