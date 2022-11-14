// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjthGi92aP0TEDXzfUI44pCV8_fbAB4sw",
    authDomain: "complain-box-10b59.firebaseapp.com",
    projectId: "complain-box-10b59",
    storageBucket: "complain-box-10b59.appspot.com",
    messagingSenderId: "290895668717",
    appId: "1:290895668717:web:febbf0008edf7e145773e4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth