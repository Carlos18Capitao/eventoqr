import { db } from "./firebase.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const status = document.getElementById("status");

function onScanSuccess(decodedText) {
  try {
    const data = JSON.parse(decodedText);

    validarEntrada(data.guest_id);

  } catch (e) {
    status.innerText = "QR inválido";
  }
}

async function validarEntrada(guestId) {
  const ref = doc(db, "guests", guestId);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    status.innerText = "Convidado não encontrado";
    return;
  }

  const guest = snap.data();

  if (guest.checked_in) {
    status.innerText = "Entrada já utilizada ❌";
    return;
  }

  await updateDoc(ref, {
    checked_in: true
  });

  status.innerText = "Entrada autorizada ✔";
}

const html5QrCode = new Html5Qrcode("preview");

Html5Qrcode.getCameras().then(devices => {
  if (devices && devices.length) {
    html5QrCode.start(
      devices[0].id,
      {
        fps: 10,
        qrbox: 250
      },
      onScanSuccess
    );
  }
});