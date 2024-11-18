import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "key",
  authDomain: "moneymate-8e5f7.firebaseapp.com",
  projectId: "moneymate-8e5f7",
  storageBucket: "moneymate-8e5f7.firebasestorage.app",
  messagingSenderId: "130358027299",
  appId: "ID",
  measurementId: ""
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
export default firebaseApp;
