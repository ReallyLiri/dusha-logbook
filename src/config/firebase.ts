import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyB6vVdr83YkesZp_wcYyTkmDEGW4w_Gths',
  authDomain: 'dusha-logbook.firebaseapp.com',
  projectId: 'dusha-logbook',
  storageBucket: 'dusha-logbook.firebasestorage.app',
  messagingSenderId: '480617884223',
  appId: '1:480617884223:web:c7c635bc851a5497a9268a',
  measurementId: 'G-14MJQC31JG',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
