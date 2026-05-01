import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { auth } from "./firebase-service.js";

export function subscribeAuthState(callback) {
  return onAuthStateChanged(auth, callback);
}

export function requireAuth(redirectTo = "login.html") {
  return new Promise((resolve) => {
    const unsubscribe = subscribeAuthState((user) => {
      unsubscribe();
      if (!user) {
        window.location.href = redirectTo;
        resolve(null);
        return;
      }

      resolve(user);
    });
  });
}

export function loginWithEmailAndPassword(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logoutCurrentUser() {
  return signOut(auth);
}
