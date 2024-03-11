import { useQuery } from '@tanstack/react-query';
import { AuthData } from '../services/authentication';
import { useAuth } from './useAuth';

type useUserDataProps = {
  enabled?: boolean;
};

export const useUserData = (props?: useUserDataProps) => {
  const { user } = useAuth();

  return useQuery<AuthData>(
    ['UserData', user],
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
    { enabled: !!user && (props?.enabled ?? true) },
  );
};
