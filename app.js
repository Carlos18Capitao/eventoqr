const demoForm = document.getElementById("demo-form");
const guestNameInput = document.getElementById("guestName");
const demoMessage = document.getElementById("demoMessage");
const qrContainer = document.getElementById("qrcode");

let qrInstance = null;

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

demoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const guestName = guestNameInput.value.trim();

  if (!guestName) {
    demoMessage.textContent = "Por favor, informe o seu nome.";
    qrContainer.innerHTML = "";
    return;
  }

  const qrPayload = JSON.stringify({
    sistema: "EventoQR",
    nome: guestName,
    estado: "Confirmado",
    criadoEm: new Date().toISOString()
  });

  demoMessage.textContent = "Confirmado com sucesso";

  if (qrInstance) {
    qrContainer.innerHTML = "";
  }

  createQrCode(qrPayload);
});

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
