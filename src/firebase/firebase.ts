import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBfgESgpERtI7bZ-TTCH_Q6wIq5fBATkGY",
    authDomain: "task-manager-ab26d.firebaseapp.com",
    projectId: "task-manager-ab26d",
    storageBucket: "task-manager-ab26d.firebasestorage.app",
    messagingSenderId: "130657307175",
    appId: "1:130657307175:web:64327fb4de561e5ba69c02"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };