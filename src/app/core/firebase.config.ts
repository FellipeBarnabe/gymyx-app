import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyCf9Ufsj7S0IAo6qNu1wiovXyWTzwS4YOY',
  authDomain: 'gymyx-12d4d.firebaseapp.com',
  databaseURL: 'https://gymyx-12d4d-default-rtdb.firebaseio.com',
  projectId: 'gymyx-12d4d',
  storageBucket: 'gymyx-12d4d.firebasestorage.app',
  messagingSenderId: '786261127970',
  appId: '1:786261127970:web:2bb57edcc64a5409396b7b',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const googleProvider = new GoogleAuthProvider();
