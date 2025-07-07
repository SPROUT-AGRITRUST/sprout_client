// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // ✅ import auth

const firebaseConfig = {
  apiKey: "AIzaSyCczC5yLuArNhVa-UVJnEB8_0fk2QrEZH8",
  authDomain: "sprout-8cc15.firebaseapp.com",
  projectId: "sprout-8cc15",
  storageBucket: "sprout-8cc15.firebasestorage.app",
  messagingSenderId: "77916338836",
  appId: "1:77916338836:web:3ad4eb1d65ed9cf4085281",
  measurementId: "G-SD1RBCMLGY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // ✅ get the auth instance

export { auth }; // ✅ export auth
