// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCfMmT0NImtMsxXUXPedCAzYrYUTmJS9zM",
    authDomain: "mini-shop-react-c84ad.firebaseapp.com",
    projectId: "mini-shop-react-c84ad",
    storageBucket: "mini-shop-react-c84ad.firebasestorage.app",
    messagingSenderId: "934506586773",
    appId: "1:934506586773:web:1a56cf1eaa4be2e4b0719c",
    measurementId: "G-013P8Z0PTJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);