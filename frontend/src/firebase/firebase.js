import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRpEO91dfEXCf_2dUBeRMn3Rttl9lo1-U",
  authDomain: "meesho-58707.firebaseapp.com",
  projectId: "meesho-58707",
  storageBucket: "meesho-58707.firebasestorage.app",
  messagingSenderId: "1007147451657",
  appId: "1:1007147451657:web:c73de0da0004bc49243fd8",
  measurementId: "G-62T116QBVK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and db
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
