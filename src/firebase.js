import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDYR4HyRrX39jUqGTViszlN8ngW49w27fI",
  authDomain: "sprout-55ee6.firebaseapp.com",
  projectId: "sprout-55ee6",
  storageBucket: "sprout-55ee6.firebasestorage.app",
  messagingSenderId: "778031879386",
  appId: "1:778031879386:web:5cfc3e7af22f323dce81e3",
  measurementId: "G-0SFCVFDYNE"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// ✅ Ensure session persists
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error("Firebase persistence error:", error);
});

export { auth, googleProvider, app, analytics };
