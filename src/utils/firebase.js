// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpNK-_1d4ohfQJPEO0JKTNDQQFff77GMY",
  authDomain: "sprout-5148a.firebaseapp.com",
  projectId: "sprout-5148a",
  storageBucket: "sprout-5148a.firebasestorage.app",
  messagingSenderId: "535661460769",
  appId: "1:535661460769:web:7de39a054bd08fe0795260",
  measurementId: "G-KSGY7WZ2FZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Auth
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export { auth, googleProvider, facebookProvider };
