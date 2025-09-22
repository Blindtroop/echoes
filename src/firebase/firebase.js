// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUvPkhX1sltX01aUboxqw9OCBEPhRi9cU",
  storageBucket: "echoes-80ccf.appspot.com",
  projectId: "echoes-80ccf",
  storageBucket: "echoes-80ccf.firebasestorage.app",
  messagingSenderId: "482296312785",
  appId: "1:482296312785:web:896783c7eef07fdbc2a6f0",
  measurementId: "G-T673N5XHBX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
      