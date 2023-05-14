import { Tag, Tile } from 'carbon-components-react';
import PreviewImage from './PreviewImage';
import { Launch } from '@carbon/icons-react';

type ItemTileProps = {
  imageUrl: string | undefined;
  imageName: string;
  tagText: string;
} & React.HTMLAttributes<HTMLDivElement>;

export function ItemTile({ imageUrl, imageName, tagText, style, ...rest }: ItemTileProps) {
  console.log(imageUrl);
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
    >
      {imageUrl ? (
        <PreviewImage
          image={{ name: imageName, url: imageUrl }}
          style={{ width: '100%', height: 'unset', objectFit: 'cover' }}
        />
      ) : (
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span>No data</span>
        </div>
      )}
      <div
        style={{ padding: '1rem', display: 'flex', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Tag type="cool-gray" size="md" style={{ marginInline: 0 }}>
          {tagText}
        </Tag>
        {!!imageUrl && (
          <a
            href={imageUrl}
            download={imageName}
            target="_blank"
            rel="noreferrer"
            style={{ color: 'var(--cds-text-primary)', height: 16, width: 16 }}
          >
            <Launch />
          </a>
        )}
      </div>
    </Tile>
  );
}
