import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyDZ7_3bd2CYP2FjWvxCNsNo8o4wy8V6F7Y",
  authDomain: "mediatunnel-325914.firebaseapp.com",
  projectId: "mediatunnel-325914",
  storageBucket: "mediatunnel-325914.appspot.com",
  messagingSenderId: "mediatunnel-325914.appspot.com",
  appId: "1:756529949727:web:b180c3ddebaa46c52e792a",
  measurementId: "G-MLWZFWT6D9",
});

export const auth = getAuth(app);
export default app;
