import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDQNV2JPEulbPPugRLY7TxjTOh5b7h54Lk",
  authDomain: "invoicy-dde37.firebaseapp.com",
  projectId: "invoicy-dde37",
  storageBucket: "invoicy-dde37.appspot.com",
  messagingSenderId: "933565972177",
  appId: process.env.APP_ID
};


const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const db = firebaseApp.firestore();

export {
  auth,
  db
}

