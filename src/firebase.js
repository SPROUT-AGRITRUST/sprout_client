import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

// ✅ Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyDmeOHRLo1zb735pCIM-v4R-c1aaviG-AU",
  authDomain: "sprout-430f4.firebaseapp.com",
  projectId: "sprout-430f4",
  storageBucket: "sprout-430f4.firebasestorage.app",
  messagingSenderId: "7716600084",
  appId: "1:7716600084:web:72b4f8d7b8b9154f54aa01",
  measurementId: "G-FZ6TQD4TRB",
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