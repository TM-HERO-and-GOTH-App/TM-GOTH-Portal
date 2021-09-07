import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
    // Your firebase config data in Firebase setting
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;