// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa55hKUHUo4FcrkJhk5TpO_2xO2lezrJc",
  authDomain: "fir-upload-e256f.firebaseapp.com",
  projectId: "fir-upload-e256f",
  storageBucket: "fir-upload-e256f.appspot.com",
  messagingSenderId: "878529014451",
  appId: "1:878529014451:web:373604ea5f0fa79922dec6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
