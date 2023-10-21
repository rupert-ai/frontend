import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  AuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './firebase';

export class AuthService {}

export type AuthData = {
  user: {
    id: number;
    profileId: string;
    name: string;
    credits: Number;
    plan: 'FREE' | 'PRO';
    planExpiresAt?: Date;
    stripeCustomerId?: string;
  };
};

// export const getAuthData = (): Promise<AuthData> => {
//   return new Promise((resolve, reject) => {
//     const unsub = onAuthStateChanged(auth, user => {
//       if (user) {
//           fetch('https://rupert-ai-server-ds2havyh3q-ew.a.run.app/auth')
//             .then(response => response.json())
//             .then(response => resolve({ ...response.data, user }));
//       } else {
//         unsub();
//         reject(new Error('Not authorized'));
//       }
//     });
//   });
// };

const postToBackend = (token: string) =>
  fetch('https://rupert-ai-server-ds2havyh3q-ew.a.run.app/auth', {
    method: 'POST',
    body: JSON.stringify({ token: token }),
    headers: { 'Content-type': 'application/json; charset=UTF-8' },
  }).then(() => {
    console.log('resolve token', token);
    return token;
  });

const signIn = (provider: AuthProvider) =>
  signInWithPopup(auth, provider).then(async result => {
    const token = await result.user.getIdToken();
    return postToBackend(token);
  });

export const signUp = (email: string, password: string) => createUserWithEmailAndPassword(auth, email, password);

export const signInWithGoogle = async (): Promise<string> => {
  const provider = new GoogleAuthProvider();
  return signIn(provider);
};

export const signInWithFacebook = async (): Promise<string> => {
  const provider = new FacebookAuthProvider();
  return signIn(provider);
};

export const signInWithEmail = async ({ email, password }: { email: string; password: string }) =>
  signInWithEmailAndPassword(auth, email, password).then(async result => {
    const token = await result.user.getIdToken();
    return postToBackend(token);
  });

export const createWithEmail = async ({ email, password }: { email: string; password: string }) =>
  createUserWithEmailAndPassword(auth, email, password).then(async result => {
    const token = await result.user.getIdToken();
    return postToBackend(token);
  });

export const checkAuth = (): Promise<boolean> => {
  return new Promise(resolve => {
    const unsub = onAuthStateChanged(auth, user => {
      if (user) {
        auth.currentUser
          ?.getIdToken()
          .then(() => resolve(true))
          .catch(() => resolve(false))
          .finally(() => unsub());
      } else {
        unsub();
        resolve(false);
      }
    });
  });
};
