import { subscribeAuthState } from "./src/services/auth-service.js";
import { checkInGuest, getGuestById } from "./src/services/guest-service.js";
import { parseQrPayload } from "./src/services/scanner-service.js";
import { UI_MESSAGES } from "./src/shared/utils/constants.js";

const status = document.getElementById("status");
let scannerStarted = false;
const html5QrCode = new Html5Qrcode("preview");

function setStatus(message) {
  status.innerText = message;
}

function onScanSuccess(decodedText) {
  const parsed = parseQrPayload(decodedText);

  if (!parsed.ok) {
    setStatus(UI_MESSAGES.invalidQr);
    return;
  }

  validarEntrada(parsed.payload.guest_id);
}

async function validarEntrada(guestId) {
  const snap = await getGuestById(guestId);

  if (!snap.exists()) {
    setStatus(UI_MESSAGES.guestNotFound);
    return;
  }

  const guest = snap.data();

  if (guest.checked_in) {
    setStatus(`${UI_MESSAGES.alreadyCheckedIn} X`);
    return;
  }

  await checkInGuest(guestId);

  setStatus(`${UI_MESSAGES.entryAuthorized} OK`);
}

async function startScanner() {
  if (scannerStarted) {
    return;
  }

  const devices = await Html5Qrcode.getCameras();

  if (!devices || !devices.length) {
    setStatus("Nenhuma camera encontrada");
    return;
  }

  await html5QrCode.start(
    devices[0].id,
    {
      fps: 10,
      qrbox: 250,
    },
    onScanSuccess
  );

  scannerStarted = true;
}

subscribeAuthState((user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  startScanner().catch(() => {
    setStatus("Erro ao iniciar scanner");
  });
});