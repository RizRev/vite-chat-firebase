// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCROY2lLIaTLc3ME-K80XRztOApo9LAUCI",
  authDomain: "next-chat-app-ac409.firebaseapp.com",
  projectId: "next-chat-app-ac409",
  storageBucket: "next-chat-app-ac409.appspot.com",
  messagingSenderId: "1067683967985",
  appId: "1:1067683967985:web:d11a9147bd79225751ca50",
  measurementId: "G-VLG32CWY8N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()