// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCY3SURcElSavfbmvnZrSfWQQLC87if5ak',
	authDomain: 'turing-cell-410207.firebaseapp.com',
	projectId: 'turing-cell-410207',
	storageBucket: 'turing-cell-410207.appspot.com',
	messagingSenderId: '892182850935',
	appId: '1:892182850935:web:9e9365f1dabbbd5dd80572',
	measurementId: 'G-TTPZR89NKM',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
