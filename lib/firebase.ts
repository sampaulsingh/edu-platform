import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgWD1qjovRb_Tb1f-Omu6QLIl-Zts9Mxg",
  authDomain: "edu-platform-847c3.firebaseapp.com",
  projectId: "edu-platform-847c3",
  storageBucket: "edu-platform-847c3.firebasestorage.app",
  messagingSenderId: "428909636453",
  appId: "1:428909636453:web:479caff0c3aaa5c2eb4f8c",
  measurementId: "G-60WYX92ZKM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
