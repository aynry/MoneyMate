import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAchFiwigFdvybtDzJeA1e5qfVf8jthFSk",
  authDomain: "moneymate-44dea.firebaseapp.com",
  projectId: "moneymate-44dea",
  storageBucket: "moneymate-44dea.appspot.com",
  messagingSenderId: "314604223200",
  appId: "1:314604223200:web:20ca72af77f643685d6e85"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;