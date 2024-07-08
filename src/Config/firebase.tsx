import { initializeApp } from "firebase/app"; 
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyDlTR9rlKLtRlZlfac07SqYX0ElGZF3NXE",
  authDomain: "resume-builder-1234b.firebaseapp.com",
  projectId: "resume-builder-1234b",
  storageBucket: "resume-builder-1234b.appspot.com",
  messagingSenderId: "589153888368",
  appId: "1:589153888368:web:749411424999578dd6ecb5",
  measurementId: "G-583TNL44F8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth (app);
export {auth}