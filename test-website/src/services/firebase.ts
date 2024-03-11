// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: 'AIzaSyDj7bzkt_TPNquqoVol6kEpFH2hbFEvgTg',
  authDomain: 'rupert-ai.firebaseapp.com',
  projectId: 'rupert-ai',
  storageBucket: 'rupert-ai.appspot.com',
  messagingSenderId: '1035384553660',
  appId: '1:1035384553660:web:0273b2d5ebb03d665990b9',
  measurementId: 'G-F4QTCT694M',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
