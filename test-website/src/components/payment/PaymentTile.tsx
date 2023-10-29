import { CheckmarkOutline } from '@carbon/icons-react';
import { Button, ButtonSkeleton, Tag, Tile } from 'carbon-components-react';

type PaymentTileProps = {
  title: string;
  description: string;
  price: number;
  features: { title: string; notAvailable?: boolean }[];
  isLoading: boolean;
  actionButton: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function PaymentTile({ title, description, price, features, actionButton, isLoading }: PaymentTileProps) {
  return (
    <Tile
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        width: '16.75rem',
      }}
    >
      <h3>{title}</h3>
      <div>{description}</div>
      <div>
        <span style={{ color: '#A7F0BA', fontSize: '3rem' }}>€{price}</span>
        <span style={{ verticalAlign: 'sub', fontSize: 'smaller' }}>/mo</span>
      </div>
      {isLoading ? <ButtonSkeleton style={{ width: '100%' }} /> : <>{actionButton}</>}
      {features.map(f => (
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '1.2rem',
          }}
        >
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <CheckmarkOutline fill="#A7F0BA" />
            {f.title}
          </div>
          {f.notAvailable && (
            <Tag type="purple" size="sm" style={{ marginInline: 0, minHeight: '1.2rem' }}>
              Soon
            </Tag>
          )}
        </div>
      ))}
    </Tile>
  );
}
