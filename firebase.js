import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCpRF3BwomvWF5-rLU8SuFjzmlpJwnvqAc",
  authDomain: "eventoqr-44392.firebaseapp.com",
  projectId: "eventoqr-44392",
  storageBucket: "eventoqr-44392.firebasestorage.app",
  messagingSenderId: "415804439901",
  appId: "1:415804439901:web:9ae96020bb9435303d7cb4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };