import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getFirestore,
  getDocs,
  collection
} from 'firebase/firestore';

// 🔐 Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCWsRC1yuoj1IRX3Mf9UN-MrmvTRZykfJk",
  authDomain: "m-movil.firebaseapp.com",
  projectId: "m-movil",
  storageBucket: "m-movil.appspot.com",
  messagingSenderId: "329445921322",
  appId: "1:329445921322:web:45846e6d162a479e05e953"
};

// 🔄 Inicialización de Firebase App (singleton)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 🔐 Inicialización de Auth con AsyncStorage para persistencia
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// 🔥 Inicialización de Firestore
export const db = getFirestore(app);

// ✅ Obtener todos los productos desde la colección 'products'
export const getItems = async () => {
  const snapshot = await getDocs(collection(db, 'products'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// ✅ Obtener géneros desde la colección 'genres'
export const getGenres = async () => {
  const snapshot = await getDocs(collection(db, 'genres'));
  return snapshot.docs.map(doc => doc.data().name);
};