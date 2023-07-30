import { ClickableTile, Tag } from 'carbon-components-react';
import PreviewImage from './PreviewImage';

type GeneratedProjectTileProps = {
  image:
    | File
    | {
        name: string;
        url: string;
      };
  selected?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export function GeneratedProjectTile({ image, style, ...rest }: GeneratedProjectTileProps) {
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
    >
      <PreviewImage image={image} style={{ width: '100%', height: 'unset', objectFit: 'cover' }} />
      <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Tag type="gray" size="md" style={{ marginLeft: 0 }}>
            Original
          </Tag>
        </div>
      </div>
    </ClickableTile>
  );
}
