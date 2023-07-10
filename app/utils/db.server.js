import admin from "firebase-admin";
import {
  applicationDefault,
  initializeApp as initializeAdminApp,
} from "firebase-admin/app";
import { initializeApp } from "firebase/app";
import {
  signInWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";

require("dotenv").config();

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo5b8_3Ii901CQG3cjoyYLsZledjKw4hE",
  authDomain: "card-processor.firebaseapp.com",
  databaseURL: "https://card-processor-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "card-processor",
  storageBucket: "card-processor.appspot.com",
  messagingSenderId: "651371541694",
  appId: "1:651371541694:web:d320c6fc83282199d91aef",
  measurementId: "G-WGG79SKPYY"
};

if (!admin.apps.length) {
  initializeAdminApp({
    credential: applicationDefault(),
    databaseURL: "https://card-processor-default-rtdb.europe-west1.firebasedatabase.app",
  });
}

const adminAuth = admin.auth();

let Firebase;

if (!Firebase?.apps?.length) {
  Firebase = initializeApp(firebaseConfig);
}

async function signIn(email, password) {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
}

async function getSessionToken(idToken) {
  const decodedToken = await adminAuth.verifyIdToken(idToken);
  if (new Date().getTime() / 1000 - decodedToken.auth_time > 5 * 60) {
    throw new Error("Recent sign in required");
  }
  const twoWeeks = 60 * 60 * 24 * 14 * 1000;
  return adminAuth.createSessionCookie(idToken, { expiresIn: twoWeeks });
}

async function signOutFirebase() {
  await signOut(getAuth());
}

export { getSessionToken, signOutFirebase, signIn, adminAuth };
