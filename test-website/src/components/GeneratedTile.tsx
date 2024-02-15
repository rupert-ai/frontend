import { SkeletonPlaceholder, SkeletonText, Tag, SelectableTile } from 'carbon-components-react';
import PreviewImage from './PreviewImage';

type GeneratedTileProps = {
  isTop?: boolean;
  isOriginal?: boolean;
  isLoading: boolean;
  image?:
    | File
    | {
        name: string;
        url: string;
      };
  text?: string;
  selected?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function GeneratedTile({ text, image, isTop, isOriginal, style, isLoading, ...rest }: GeneratedTileProps) {
  return (
    <SelectableTile
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        padding: 0,
        ...style,
      }}
      {...rest}
      title={image?.name}
    >
      {isLoading || !image ? (
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
