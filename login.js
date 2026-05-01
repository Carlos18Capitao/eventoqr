import { app } from "./firebase.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

const btn = document.getElementById("loginBtn");

btn.addEventListener("click", login);

async function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const msg = document.getElementById("msg");

    msg.textContent = "";

    if (!email || !password) {
        msg.textContent = "Preencha todos os campos";
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email, password);


        window.location.href = "dashboard.html";


    } catch (error) {
        msg.textContent = "Credenciais inválidas";
    }
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    login();
  }
});