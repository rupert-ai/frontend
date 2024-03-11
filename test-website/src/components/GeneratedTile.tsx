import { SkeletonPlaceholder, SkeletonText, SelectableTile } from 'carbon-components-react';
import PreviewImage from './PreviewImage';

type GeneratedTileProps = {
  isLoading: boolean;
  image?:
    | File
    | {
        name: string;
        url: string;
      };
  text?: string;
  selected?: boolean;
  onClick: () => void;
};

export function GeneratedTile({ text, image, isLoading, onClick }: GeneratedTileProps) {
  return (
    <SelectableTile
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: 0,
      }}
      onClick={onClick}
      value=""
    >
      {isLoading || !image ? (
        <SkeletonPlaceholder style={{ width: '100%', height: '100%', aspectRatio: '1/1' }} />
      ) : (
        <PreviewImage image={image} style={{ width: '100%', height: 'unset', objectFit: 'cover' }} />
      )}
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          {isLoading ? (
            <>
              <SkeletonText />
              <SkeletonText />
            </>
          ) : (
            <div
              style={{
                wordBreak: 'break-word',
                display: '-webkit-box',
                '-webkit-line-clamp': '3',
                '-webkit-box-orient': 'vertical',
                overflow: 'hidden',
              }}
              title={text}
            >
              {text}
            </div>
          )}
        </div>
      </div>
    </SelectableTile>
  );
}
