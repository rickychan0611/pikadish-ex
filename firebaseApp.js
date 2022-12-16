import { initializeApp } from 'firebase/app';

import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDh1muzJn7ZVysvLtfbkJXw2ZIxW0Hx63M',
  authDomain: 'pikadish-ex.firebaseapp.com',
  projectId: 'pikadish-ex',
  storageBucket: 'pikadish-ex.appspot.com',
  messagingSenderId: '81489256981',
  appId: '1:81489256981:web:876e27d7dcb56543e6641c',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);