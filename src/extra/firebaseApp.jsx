import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "Key",
  authDomain: "moneymate-8e5f7.firebaseapp.com",
  projectId: "moneymate-8e5f7",
  storageBucket: "moneymate-8e5f7.firebasestorage.app",
  messagingSenderId: "130358027299",
  appId: "own ID",
  measurementId: "G-9NPCRLK6ML"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
export default firebaseApp;
