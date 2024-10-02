// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5oXiaq3JcwCC6p_Ji97jeAcRgqZ0asoM",
  authDomain: "mama-care-782fa.firebaseapp.com",
  projectId: "mama-care-782fa",
  storageBucket: "mama-care-782fa.appspot.com",
  messagingSenderId: "872486895579",
  appId: "1:872486895579:web:c82a7f9d3fa9bdac13b1fe",
  measurementId: "G-R3G33BZ5LJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
