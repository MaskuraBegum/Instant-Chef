// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAisrDGYah87qXoKP1L7YKjl17RmDUDdvM",
  authDomain: "instant-chef-91882.firebaseapp.com",
  projectId: "instant-chef-91882",
  storageBucket: "instant-chef-91882.firebasestorage.app",
  messagingSenderId: "963577054467",
  appId: "1:963577054467:web:6fba749a8cbd879885d536"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;