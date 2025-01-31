// /utils/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCVDiZlo4F9N76ou_glOacKUxypV6-4QHY",
    authDomain: "estore-8ed92.firebaseapp.com",
    projectId: "estore-8ed92",
    storageBucket: "estore-8ed92.firebasestorage.app",
    messagingSenderId: "794824426183",
    appId: "1:794824426183:web:8877dc5d6e94a184dc34e2",
    measurementId: "G-WSCTVSJ41J"
  };
  
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Auth instance
const auth = getAuth(app);

export { auth };
