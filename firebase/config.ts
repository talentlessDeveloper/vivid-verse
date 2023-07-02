// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBBsMfcjHyNnBCs6d6z9OftimgL0sqU8kw',
  authDomain: 'next-chatter-50261.firebaseapp.com',
  projectId: 'next-chatter-50261',
  storageBucket: 'next-chatter-50261.appspot.com',
  messagingSenderId: '643045245970',
  appId: '1:643045245970:web:5cda8df51082274010c4cb',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, db, provider, storage };
