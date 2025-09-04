// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYaeCJNAf0Whfz8UH5Az58qzSkvYEynMM",
  authDomain: "sprout-agritrust-09.firebaseapp.com",
  projectId: "sprout-agritrust-09",
  storageBucket: "sprout-agritrust-09.firebasestorage.app",
  messagingSenderId: "1020477674101",
  appId: "1:1020477674101:web:3c52b66895924030e01e3c",
  measurementId: "G-M5SEG6PSNZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
