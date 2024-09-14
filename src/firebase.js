// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to uses
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtjATCjHFn2Iqds_nbXOQEGoT6g3dpvB8",
  authDomain: "pennywise-9c3f5.firebaseapp.com",
  projectId: "pennywise-9c3f5",
  storageBucket: "pennywise-9c3f5.appspot.com",
  messagingSenderId: "910287397881",
  appId: "1:910287397881:web:6661cb070261c29bfa5328",
  measurementId: "G-S5HJWJC8QR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { db, auth, provider, doc, setDoc };
