import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { BaseLogin } from '../components/BaseLogin';
import { signInWithEmail, signInWithGoogle } from '../services/authentication';

export function LoginPage() {
  const navigate = useNavigate();

  const useSignInWithGoogle = useMutation(signInWithGoogle, {
    onSuccess() {
      navigate('../');
    },
  });

  const useSignInWithEmail = useMutation(signInWithEmail, {
    onSuccess() {
      navigate('../');
    },
  });

  const signInGoogle = () => {
    useSignInWithGoogle.mutate();
  };

  const signInAccount = (email: string, password: string) => {
    if (!email || !password) {
      return;
    }
    useSignInWithEmail.mutate({ email, password });
  };

  return <BaseLogin onEmailLogin={signInAccount} onGoogleLogin={signInGoogle} mode="login" />;
}
