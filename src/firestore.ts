// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwClQf_tZvKk51wU6AoTpqgfjEuJQ8gAk",
  authDomain: "n-shop-b6c92.firebaseapp.com",
  databaseURL: "https://n-shop-b6c92-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "n-shop-b6c92",
  storageBucket: "n-shop-b6c92.appspot.com",
  messagingSenderId: "658444567440",
  appId: "1:658444567440:web:c59fde8db3306c0688e915",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
