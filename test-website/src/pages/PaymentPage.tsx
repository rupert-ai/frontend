import { PaymentTile } from '../components/payment/PaymentTile';
import { useActivatePro } from '../hooks/useActivatePro';
import { useAuth } from '../hooks/useAuth';
import { useUserData } from '../hooks/useUserData';

export function PaymentPage() {
  const auth = useAuth();
  const { mutate } = useActivatePro();
  const { data: userData, isFetching } = useUserData();

  const activatePro = async () => {
    const token = await auth.user?.getIdToken();
    mutate(token ?? '', {
      onSuccess: data => {
        window.open(data.redirect_url, '_self');
      },
    });
  };

  const hasPro = userData?.user.plan == 'PRO';

  return (
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
          actionText: hasPro ? 'You already have Pro' : 'Current plan',
          disabled: true,
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
          actionText: hasPro ? 'Current plan' : 'Upgrade to Pro',
          onClick: !hasPro ? activatePro : undefined,
          disabled: hasPro,
        },
      ].map(instance => (
        <PaymentTile {...instance} />
      ))}
    </div>
  );
}
