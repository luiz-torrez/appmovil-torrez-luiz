import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore, getDocs, collection } from 'firebase/firestore';

// 🔐 Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCWsRC1yuoj1IRX3Mf9UN-MrmvTRZykfJk",
  authDomain: "m-movil.firebaseapp.com",
  projectId: "m-movil",
  storageBucket: "m-movil.appspot.com",
  messagingSenderId: "329445921322",
  appId: "1:329445921322:web:45846e6d162a479e05e953"
};

// 🔄 Inicialización de Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// 🔐 Inicialización de Auth con AsyncStorage (solo si no fue inicializado)
let authInstance;
export const getFirebaseAuth = () => {
  if (!authInstance) {
    authInstance = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  }
  return authInstance;
};

// También podés exportar directamente el Auth estándar (opcional)
export const auth = getAuth(app);

// 🔥 Inicialización de Firestore
export const db = getFirestore(app);

// ✅ Obtener todos los productos de Firestore
export const getItems = async () => {
  const snapshot = await getDocs(collection(db, 'products'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// ✅ Obtener los géneros (categories, etc.)
export const getGenres = async () => {
  const snapshot = await getDocs(collection(db, 'genres'));
  return snapshot.docs.map(doc => doc.data().name); // Ajustar según estructura real
};