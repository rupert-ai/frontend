import { CheckmarkOutline } from '@carbon/icons-react';
import { Button, Tile } from 'carbon-components-react';

type PaymentTileProps = {
  title: string;
  description: string;
  price: number;
  features: string[];
  actionText?: string;
  onClick?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

export function PaymentTile({ title, description, price, features, actionText, onClick }: PaymentTileProps) {
  return (
    <Tile
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      <h3>{title}</h3>
      <div>{description}</div>
      <h1 style={{ color: 'var(--cds-support-success-inverse)' }}>€{price}</h1>
      <Button disabled={!onClick} onClick={onClick}>
        {!onClick ? 'Current plan' : actionText}
      </Button>
      {features.map(f => (
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <CheckmarkOutline fill="var(--cds-support-success-inverse)" />
          {f}
        </div>
      ))}
    </Tile>
  );
}
