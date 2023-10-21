import { onAuthStateChanged, User } from 'firebase/auth';
import React from 'react';
import { AuthData } from '../services/authentication';
import { auth } from '../services/firebase';

export const useAuth = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [userData, setUserData] = React.useState<AuthData | null>(null);

  React.useLayoutEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(
      auth,
      user => {
        setUser(user);
        if (user) {
          user
            .getIdToken()
            .then(t =>
              fetch('https://rupert-ai-server-ds2havyh3q-ew.a.run.app/auth', {
                headers: {
                  Authorization: t,
                  Accept: 'application/json',
                },
              }),
            )
            .then(response => response.json())
            .then(data => {
              setUserData(data);
              setIsLoading(false);
            })
            .catch(() => {
              setIsLoading(false);
              throw 'Failed to authenticate. Please try again later.';
            });
        }
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

  return { user, isLoading, userData };
};
