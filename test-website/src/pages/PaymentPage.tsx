import { PaymentTile } from '../components/payment/PaymentTile';
import TilesList from '../components/TilesList';
import { useActivatePro } from '../hooks/useActivatePro';
import { useAuth } from '../hooks/useAuth';

export function PaymentPage() {
  const auth = useAuth();
  const { mutate } = useActivatePro();

  const activatePro = async () => {
    const token = await auth.user?.getIdToken();
    mutate(token ?? '', {
      onSuccess: data => {
        window.open(data.redirect_url, '_self');
      },
    });
  };

  return (
    <TilesList
      data={[
        {
          title: 'Free',
          description: 'For people who want to try out Rupert AI risk free.',
          price: 0,
          features: ['100 credits', 'Limited tool access'],
          actionText: 'You already have Pro plan',
        },
        {
          title: 'Pro',
          description: 'For creators and developers who need higher volumes.',
          price: 10,
          features: ['Unlimited credits', 'Unlimited tool access'],
          actionText: 'Upgrade to Pro',
          onClick: activatePro,
        },
      ]}
      renderer={instance => {
        return <PaymentTile {...instance} />;
      }}
    />
  );
}
