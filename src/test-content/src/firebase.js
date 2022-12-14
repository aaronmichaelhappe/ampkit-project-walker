/* eslint-disable no-unused-vars */
// TODO: create an action to remove eslint-disable for entire files
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";
import firebaseConfig from "./firebase-config.js";

function initializeServices() {
  const isConfigured = getApps().length > 0;
  const firebaseApp = initializeApp(firebaseConfig);
  const firestore = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  getCurrentUser();
  return { firebaseApp, firestore, auth, isConfigured };
}

function connectToEmulators({ auth, firestore }) {
  if (location.hostname === "localhost") {
    connectFirestoreEmulator(firestore, "localhost", 8081);
    connectAuthEmulator(auth, "http://localhost:9099");
  }
}

export function getFirebase() {
  const services = initializeServices();

  if (!services.isConfigured) {
    connectToEmulators(services);
  }
  return services;
}

export function getCurrentUser() {
  return () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = getAuth().onAuthStateChanged((user) => {
        unsubscribe();
        resolve(user);
      }, reject);
    });
  };
}
