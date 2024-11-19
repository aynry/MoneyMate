import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "Key",
  authDomain: "ID",
  projectId: "*****",
  storageBucket: "*****",
  messagingSenderId: "130358027299",
  appId: "own ID",
  measurementId: "G-9NPCRLK6ML"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
export default firebaseApp;
