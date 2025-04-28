import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAo0k8SN1dMatHBpFcl-a8jBRqWaIYxXew",
  authDomain: "ai-tpj.firebaseapp.com",
  projectId: "ai-tpj",
  storageBucket: "ai-tpj.firebasestorage.app",
  messagingSenderId: "1075074292177",
  appId: "1:1075074292177:web:5cd46fec1c443b1436a8f0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);