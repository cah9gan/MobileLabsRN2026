import { initializeApp, getApps, getApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
  Auth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyBQxOy_7h0xbOT4PXAuKObeSGKdrGsKWUs",
  authDomain: "lab6-3cbac.firebaseapp.com",
  projectId: "lab6-3cbac",
  storageBucket: "lab6-3cbac.firebasestorage.app",
  messagingSenderId: "532052325162",
  appId: "1:532052325162:web:d27e8b0437860ef3ef2453",
  measurementId: "G-53ML000Q27",
};

let app;
let auth: Auth;

// Перевірка на наявність вже ініціалізованого додатка (для уникнення помилок при Fast Refresh в Expo)
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  app = getApp();
  auth = getAuth(app);
}

// 3. Инициализируем базу данных
export const db = getFirestore(app);
export { auth };
