import { subscribeAuthState } from "./auth-service.js";
import { addGuest } from "./guest-service.js";
import { normalizeWhitespace } from "../shared/utils/sanitizers.js";
import { validateGuestName } from "../shared/utils/validators.js";

let currentUser = null;

// Esperar autenticação
subscribeAuthState((user) => {
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

  const name = normalizeWhitespace(guestNameInput.value);

  if (!validateGuestName(name)) {
    demoMessage.textContent = "Informe um nome valido";
    return;
  }

  try {
    const docRef = await addGuest({
      name,
      userId: currentUser.uid,
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
