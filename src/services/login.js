import { loginWithEmailAndPassword } from "./auth-service.js";
import { validateEmail, validatePassword } from "../shared/utils/validators.js";

const btn = document.getElementById("loginBtn");

btn.addEventListener("click", login);

async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
    const msg = document.getElementById("msg");

    msg.textContent = "";

    if (!email || !password) {
        msg.textContent = "Preencha todos os campos";
        return;
    }

    if (!validateEmail(email)) {
      msg.textContent = "Email invalido";
      return;
    }

    if (!validatePassword(password)) {
      msg.textContent = "Password deve ter pelo menos 6 caracteres";
      return;
    }

    try {
      await loginWithEmailAndPassword(email, password);


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