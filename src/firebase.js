// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-ta.firebaseapp.com",
  projectId: "mern-ta",
  storageBucket: "mern-ta.appspot.com",
  messagingSenderId: "63096220489",
  appId: "1:63096220489:web:605c2cb98b3eb8d635c898"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);