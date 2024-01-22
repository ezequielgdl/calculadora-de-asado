import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "parrillometro.firebaseapp.com",
  projectId: "parrillometro",
  storageBucket: "parrillometro.appspot.com",
  messagingSenderId: "590307860285",
  appId: "1:590307860285:web:73c2ce78db9414b3606f54"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
