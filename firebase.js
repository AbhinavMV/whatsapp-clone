import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAQKNo974LXnYSV37Ms6UbWOQxC0aGdPhY",
  authDomain: "whatsapp-clone-17a0d.firebaseapp.com",
  projectId: "whatsapp-clone-17a0d",
  storageBucket: "whatsapp-clone-17a0d.appspot.com",
  messagingSenderId: "937071659908",
  appId: "1:937071659908:web:85625bc77014129991ebd1",
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
