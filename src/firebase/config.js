import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA6wdd8iTTdrE6nredJ9g4eIlr-bAjoZP8",
  authDomain: "awesomeproject-685be.firebaseapp.com",
  databaseURL: "https://awesomeproject-685be-default-rtdb.firebaseio.com",
  projectId: "awesomeproject-685be",
  storageBucket: "awesomeproject-685be.appspot.com",
  messagingSenderId: "275415353864",
  appId: "1:275415353864:web:e46c77b2fa4645963bdfbd",
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);
