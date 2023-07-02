import { SkeletonPlaceholder, SkeletonText, Tag, Tile } from 'carbon-components-react';
import PreviewImage from './PreviewImage';

type GeneratedTileLoadingProps =
  | { isLoading: true; text?: undefined; image?: undefined }
  | {
      isLoading?: false;
      image:
        | File
        | {
            name: string;
            url: string;
          };
      text: string;
    };

type GeneratedTileProps = {
  isTop?: boolean;
  isOriginal?: boolean;
  isLoading: boolean;
} & GeneratedTileLoadingProps &
  React.HTMLAttributes<HTMLDivElement>;

export function GeneratedTile({ text, image, isTop, isOriginal, style, isLoading, ...rest }: GeneratedTileProps) {
  return (
    <Tile
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: 0,
        ...style,
      }}
      {...rest}
      disabled
    >
      {isLoading ? (
        <SkeletonPlaceholder style={{ width: '100%', height: '100%', aspectRatio: '1/1' }} />
      ) : (
        <PreviewImage image={image} style={{ width: '100%', height: 'unset', objectFit: 'cover' }} />
      )}
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {isOriginal && (
            <Tag type="gray" size="md" style={{ marginLeft: 0 }}>
              Original
            </Tag>
          )}
          {isTop && (
            <Tag type="gray" size="md" style={{ marginLeft: 0 }}>
              Top layer
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
              {text}
            </div>
          )}
        </div>
      </div>
    </Tile>
  );
}
