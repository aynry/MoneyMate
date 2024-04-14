import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "own API",
  authDomain: "moneymate-44dea.firebaseapp.com",
  projectId: "moneymate-44dea",
  storageBucket: "moneymate-44dea.appspot.com",
  messagingSenderId: "314604223200",
  appId: "Own ID"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
