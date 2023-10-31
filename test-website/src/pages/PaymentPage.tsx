import { ArrowUpRight } from '@carbon/icons-react';
import { Button } from 'carbon-components-react';
import { PaymentTile } from '../components/payment/PaymentTile';
import { useActivatePro } from '../hooks/useActivatePro';
import { useAuth } from '../hooks/useAuth';
import { useBillingPage } from '../hooks/useBillingPage';
import { useUserData } from '../hooks/useUserData';

export function PaymentPage() {
  const auth = useAuth();
  const { mutate } = useActivatePro();
  const { data: userData, isLoading } = useUserData();
  const { mutate: billingPage } = useBillingPage();

  const goToBilling = async () => {
    const token = await auth.user?.getIdToken();
    billingPage(token ?? '', {
      onSuccess: data => {
        window.open(data.redirect_url, '_self');
      },
    });
  };

  const activatePro = async () => {
    const token = await auth.user?.getIdToken();
    mutate(token ?? '', {
      onSuccess: data => {
        window.open(data.redirect_url, '_self');
      },
    });
  };

  const hasPro = userData?.user?.plan == 'PRO';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <h2>Plans</h2>
        {!!userData?.user?.stripeCustomerId && (
          <Button kind="ghost" renderIcon={ArrowUpRight} size="sm" onClick={goToBilling}>
            Manage subscription
          </Button>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          height: '400px',
          flexWrap: 'wrap',
        }}
      >
        {[
          {
            title: 'Free',
            description: 'For people who want to try out Rupert AI risk free.',
            price: 0,
            features: [{ title: '100 credits' }, { title: 'Limited tool access' }],
            isLoading,
            actionButton: (
              <Button
                disabled={!hasPro}
                style={{ width: '100%' }}
                onClick={hasPro ? goToBilling : undefined}
                kind="secondary"
              >
                {!hasPro ? 'Current plan' : 'Downgrade to Free'}
              </Button>
            ),
          },
          {
            title: 'Pro',
            description: 'For creators and developers who need higher volumes.',
            price: 10,
            features: [
              { title: 'Unlimited credits / mo' },
              { title: 'Unlimited tool access' },
              { title: 'Model training', notAvailable: true },
              { title: 'Workflow builder', notAvailable: true },
            ],
            isLoading,
            actionButton: (
              <Button disabled={hasPro} onClick={!hasPro ? activatePro : undefined} style={{ width: '100%' }}>
                {hasPro ? 'Current plan' : 'Upgrade to Pro'}
              </Button>
            ),
          },
        ].map(instance => (
          <PaymentTile {...instance} />
        ))}
      </div>
    </div>
  );
}
