import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD3bI8YRLgxFt1utWCN2EQwUaputl8Crjc",
    authDomain: "testing-7662b.firebaseapp.com",
    projectId: "testing-7662b",
    storageBucket: "testing-7662b.appspot.com",
    messagingSenderId: "1000650631489",
    appId: "1:1000650631489:web:38b48c9b8b29eb80a559c0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;