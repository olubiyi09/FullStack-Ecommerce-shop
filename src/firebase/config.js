import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDU5dPUJW1zT2Tqi9Bt0C0LWJMFosxccKk",
  authDomain: "mshop-f8831.firebaseapp.com",
  projectId: "mshop-f8831",
  storageBucket: "mshop-f8831.appspot.com",
  messagingSenderId: "189046501627",
  appId: "1:189046501627:web:ae7c56352ad9ab39a1c05e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
