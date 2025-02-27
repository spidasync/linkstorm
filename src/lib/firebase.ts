import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBkJcrY9KdPmL84qnDhfkyWTJamTYHA7e8",
  authDomain: "code4coin-88472.firebaseapp.com",
  projectId: "code4coin-88472",
  storageBucket: "code4coin-88472.firebasestorage.app",
  messagingSenderId: "938252946481",
  appId: "1:938252946481:web:7968f63a27e37c15c1d910",
  measurementId: "G-W5GTRPG2C3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
