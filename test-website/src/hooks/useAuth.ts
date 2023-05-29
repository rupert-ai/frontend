import { onAuthStateChanged, onIdTokenChanged, User } from 'firebase/auth';
import React from 'react';
import { auth } from '../services/firebase';

export const useAuth = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useLayoutEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(
      auth,
      user => {
        setUser(user);
        setIsLoading(false);
      },
      error => {
        console.error(error);
        setIsLoading(false);
      },
    );

    return () => {
      unsubscribe();
    };
  }, [auth]);

  return { user, isLoading };
};
