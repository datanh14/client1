import firebase from "firebase/app";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDgxHBxjeLvtOmVHVKLrjYgPSDwZhjyVJA",
    authDomain: "duanimage-50853.firebaseapp.com",
    projectId: "duanimage-50853",
    storageBucket: "duanimage-50853.appspot.com",
    messagingSenderId: "612455159873",
    appId: "1:612455159873:web:c5bafb8c56fca491784ec0",
    measurementId: "G-922R3F9SBP"
  };

  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {storage, firebaseConfig as default};