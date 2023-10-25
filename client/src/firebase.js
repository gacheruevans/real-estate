// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-35f19.firebaseapp.com",
  projectId: "realestate-35f19",
  storageBucket: "realestate-35f19.appspot.com",
  messagingSenderId: "380623929382",
  appId: "1:380623929382:web:6f8fb6b1c7c0351966e6e7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);