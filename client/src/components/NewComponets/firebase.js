// firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, onValue, remove, push } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyD-JKqvA1fMfANc6DOVSh-tqJL7SGlPc70",
    authDomain: "medai-6f597.firebaseapp.com",
    projectId: "medai-6f597",
    storageBucket: "medai-6f597.appspot.com",
    databaseURL: 'https://medai-6f597-default-rtdb.asia-southeast1.firebasedatabase.app/',
    messagingSenderId: "262204079989",
    appId: "1:262204079989:web:857033c9ec4c28d4c4dd3c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, get, child, remove, onValue, push };
