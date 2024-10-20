// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwq7W_CVOsgGuK-pWuBiVUfWQ_9mmaxdQ",
  authDomain: "e-commercewebsite-645fb.firebaseapp.com",
  databaseURL: "https://e-commercewebsite-645fb-default-rtdb.firebaseio.com",
  projectId: "e-commercewebsite-645fb",
  storageBucket: "e-commercewebsite-645fb.appspot.com",
  messagingSenderId: "682014935245",
  appId: "1:682014935245:web:3459224b3ea8e33c040184",
  measurementId: "G-4F29WG76RC"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);   
