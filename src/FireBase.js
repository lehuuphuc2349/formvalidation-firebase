// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5YbZo0eHrIt1B03-3PqVSwGtVySfA9NI",
  authDomain: "formvalidation-cfe9e.firebaseapp.com",
  projectId: "formvalidation-cfe9e",
  storageBucket: "formvalidation-cfe9e.appspot.com",
  messagingSenderId: "76541341516",
  appId: "1:76541341516:web:d5819c95b4d5e5bcbae9e9",
  measurementId: "G-FFKLK1S26Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const googleProvider = new GoogleAuthProvider();
export const database = getFirestore(app);
