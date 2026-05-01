import { db } from "./firebase.js";
import { addDoc, collection } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

let currentUser = null;

onAuthStateChanged(auth, (user) => {
  if (!user) {
    console.log("Sem login");
  }
  currentUser = user;
  console.log("Utilizador autenticado:", user.uid);

});

await addDoc(collection(db, "guests"), {
  name: name,
  user_id: currentUser.uid,
  confirmed: true,
  checked_in: false
});

const guestNameInput = document.getElementById("guestName");
const demoMessage = document.getElementById("demoMessage");
const qrContainer = document.getElementById("qrcode");

let qrInstance = null;

const form = document.getElementById("demo-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!currentUser) {
    alert("Precisa fazer login primeiro");
    return;
  }

  const name = guestNameInput.value.trim();

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
  }
});

function createQrCode(payload) {
  qrContainer.innerHTML = "";
  qrContainer.style.animation = "none";

  // Trigger reflow to restart animation
  void qrContainer.offsetWidth;
  qrContainer.style.animation = "qrFade 0.6s ease-out";

  qrInstance = new QRCode(qrContainer, {
    text: payload,
    width: 132,
    height: 132,
    colorDark: "#c9a646",
    colorLight: "#0b0b0b",
    correctLevel: QRCode.CorrectLevel.H
  });
}


const revealElements = document.querySelectorAll(".fade-in");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -30px 0px"
  }
);

revealElements.forEach((element) => observer.observe(element));
