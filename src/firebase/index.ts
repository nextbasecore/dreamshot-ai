// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDJVf34OwcUAJu_YEmpFsD8KCk2WA8eVFY",
    authDomain: "dreamshot-bce8e.firebaseapp.com",
    projectId: "dreamshot-bce8e",
    storageBucket: "dreamshot-bce8e.firebasestorage.app",
    messagingSenderId: "1003964520896",
    appId: "1:1003964520896:web:7d735325ca90c781cc9025",
    measurementId: "G-YS5MGRSQQB"
  };  


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
// const functions = getFunctions(app);
const googleAuthProvider = new GoogleAuthProvider();
// export const analytics =
//   typeof window !== "undefined" ? getAnalytics(app) : null;


export { auth, db, storage, googleAuthProvider };