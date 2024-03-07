// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "rentastics-3a29b.firebaseapp.com",
  projectId: "rentastics-3a29b",
  storageBucket: "rentastics-3a29b.appspot.com",
  messagingSenderId: "576725538379",
  appId: "1:576725538379:web:6bb540428da497cf725fce"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);