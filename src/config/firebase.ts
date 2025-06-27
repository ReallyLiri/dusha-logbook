import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6vVdr83YkesZp_wcYyTkmDEGW4w_Gths",
  authDomain: "dusha-logbook.firebaseapp.com",
  projectId: "dusha-logbook",
  storageBucket: "dusha-logbook.firebasestorage.app",
  messagingSenderId: "480617884223",
  appId: "1:480617884223:web:c7c635bc851a5497a9268a",
  measurementId: "G-14MJQC31JG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;