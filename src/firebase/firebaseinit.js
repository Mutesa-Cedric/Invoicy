import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBrhbSVGo8jN07B_5_oeSPaVeWBHzdgLwI",
  authDomain: "invoicy-9da51.firebaseapp.com",
  projectId: "invoicy-9da51",
  storageBucket: "invoicy-9da51.appspot.com",
  messagingSenderId: "463691539768",
  appId: "1:463691539768:web:a91919679fd01f4c5e8dcd",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();
