import { CheckmarkOutline } from '@carbon/icons-react';
import { ButtonSkeleton, Tag, Tile } from 'carbon-components-react';
import './PaymentTile.css';

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
    <Tile className="rai-payment-tile">
      <h3>{title}</h3>
      <div>{description}</div>
      <div>
        <span className="rai-payment-tile-price">€{price}</span>
        <span className="rai-payment-tile-month">/mo</span>
      </div>
      {isLoading ? <ButtonSkeleton style={{ width: '100%' }} /> : <>{actionButton}</>}
      {features.map(f => (
        <div className="rai-payment-tile-features">
          <div className="rai-payment-tile-feature-title">
            <CheckmarkOutline fill="#A7F0BA" />
            {f.title}
          </div>
          {f.notAvailable && (
            <Tag className="rai-payment-tile-feature-tag" type="purple" size="sm">
              Soon
            </Tag>
          )}
        </div>
      ))}
    </Tile>
  );
}
