import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "invoicy-9da51.firebaseapp.com",
  projectId: "invoicy-9da51",
  storageBucket: "invoicy-9da51.appspot.com",
  messagingSenderId: "463691539768",
  appId: process.env.APP_ID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
