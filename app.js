import { db, app } from "./firebase.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

let currentUser = null;

// Esperar autenticação
onAuthStateChanged(auth, (user) => {
  if (!user) {
    console.log("Sem login");
    return;
  }

  currentUser = user;
  console.log("Utilizador autenticado:", user.uid);
});

// ELEMENTOS
const guestNameInput = document.getElementById("guestName");
const demoMessage = document.getElementById("demoMessage");
const qrContainer = document.getElementById("qrcode");
const form = document.getElementById("demo-form");

let qrInstance = null;

// SUBMIT
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!currentUser) {
    alert("Precisa fazer login primeiro");
    return;
  }

  const name = guestNameInput.value.trim();

  if (!name) {
    demoMessage.textContent = "Informe o nome";
    return;
  }

  try {
    const docRef = await addDoc(collection(db, "guests"), {
      name: name,
      user_id: currentUser.uid,
      confirmed: true,
      checked_in: false
    });


    demoMessage.textContent = "Presença confirmada ✔";

    const qrPayload = JSON.stringify({
      guest_id: docRef.id,
      nome: name
    });

    createQrCode(qrPayload);


  } catch (error) {
    console.error(error);
    demoMessage.textContent = "Erro ao confirmar";
  }
});

// QR
function createQrCode(payload) {
  qrContainer.innerHTML = "";

  qrInstance = new QRCode(qrContainer, {
    text: payload,
    width: 132,
    height: 132,
    colorDark: "#c9a646",
    colorLight: "#0b0b0b",
    correctLevel: QRCode.CorrectLevel.H
  });
}
