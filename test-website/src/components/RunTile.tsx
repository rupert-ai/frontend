import { ClickableTile, SkeletonPlaceholder, SkeletonText, Tag } from 'carbon-components-react';
import { ResearchItem } from '../services/backend';
import PreviewImage from './PreviewImage';
import './RunTile.css';

type RunTileProps = {
  instance: ResearchItem;
  isChamp: boolean;
  index: number;
  isLoading: boolean;
  onClick: () => void;
};

export function RunTile({ instance, isChamp, index, onClick, isLoading }: RunTileProps) {
  return (
    <ClickableTile className="rai-run-tile" disabled={isLoading} onClick={onClick}>
      {isLoading ? (
        <SkeletonPlaceholder className="rai-run-tile-skeleton" />
      ) : (
        <PreviewImage
          image={{ name: instance.name, url: instance.imageOriginal }}
          style={{ width: '100%', height: 'unset', objectFit: 'cover' }}
        />
      )}
      <div className="rai-run-tile-content">
        <div className="rai-run-tile-tags">
          <Tag type="cool-gray" size="md" className="rai-run-tile-tag">
            #{index}
          </Tag>
          <Tag type="blue" size="md" className="rai-run-tile-tag">
            {Number(instance.score).toFixed(1)}
          </Tag>
          {isChamp && (
            <Tag type="green" size="md" className="rai-run-tile-tag">
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
            <div className="rai-run-tile-name">{isLoading ? <SkeletonText /> : instance.name}</div>
          )}
        </div>
      </div>
    </ClickableTile>
  );
}
