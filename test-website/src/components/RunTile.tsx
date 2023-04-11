import { ClickableTile, SkeletonPlaceholder, SkeletonText, Tag, Tile } from 'carbon-components-react';
import { ResearchItem } from '../services/backend';
import PredictedChampionText from './PredictedChampionText';
import PreviewImage from './PreviewImage';

type RunTileProps = {
  instance: ResearchItem;
  isChamp: boolean;
  index: number;
  isLoading: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function RunTile({ instance, isChamp, index, style, isLoading, ...rest }: RunTileProps) {
  return (
    <ClickableTile
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: 0,
        ...style,
      }}
      {...rest}
      disabled={isLoading}
    >
      {isLoading ? (
        <SkeletonPlaceholder style={{ width: '100%', height: '100%', aspectRatio: '1/1' }} />
      ) : (
        <PreviewImage
          image={{ name: instance.name, url: instance.imageOriginal }}
          style={{ width: 'auto', height: 'auto', objectFit: 'cover' }}
        />
      )}
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Tag type="cool-gray" size="md" style={{ marginInline: 0 }}>
            #{index}
          </Tag>
          {isChamp && (
            <Tag type="green" size="md" style={{ marginLeft: 0 }}>
              Test winner
            </Tag>
          )}
        </div>
        <div>
          {isLoading ? (
            <>
              <SkeletonText />
              <SkeletonText />
            </>
          ) : (
            <div
              style={{
                wordBreak: 'break-all',
                display: '-webkit-box',
                '-webkit-line-clamp': '2',
                '-webkit-box-orient': 'vertical',
                overflow: 'hidden',
              }}
            >
              {isLoading ? <SkeletonText /> : instance.name}
            </div>
          )}
        </div>
      </div>
    </ClickableTile>
  );
}
