// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDssmxA7DtSo7j55DRQpDLGJ_qBE97Iej0",

  authDomain: "chatbot-8cbdd.firebaseapp.com",

  projectId: "chatbot-8cbdd",

  storageBucket: "chatbot-8cbdd.appspot.com",

  messagingSenderId: "309527460561",

  appId: "1:309527460561:web:48e7d3c4ea8603b985e3f0",

  measurementId: "G-EGZT4X0RXY",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);


