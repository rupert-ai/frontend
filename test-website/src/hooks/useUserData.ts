import { useQuery } from '@tanstack/react-query';
import { AuthData } from '../services/authentication';
import { useAuth } from './useAuth';

export const useUserData = () => {
  const { user } = useAuth();

  return useQuery<AuthData>(
    ['UserData'],
    async () => {
      const token = (await user?.getIdToken()) ?? '';
      const response = await fetch('https://rupert-ai-server-ds2havyh3q-ew.a.run.app/auth', {
        headers: {
          Authorization: token,
          Accept: 'application/json',
        },
      });
      return response.json();
    },
    { enabled: !!user },
  );
};
