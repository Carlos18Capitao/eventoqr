import { db } from "./firebase.js";
import {
collection,
onSnapshot,
query,
where
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
getAuth,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth();

const table = document.getElementById("guestTable");
const totalEl = document.getElementById("total");
const confirmedEl = document.getElementById("confirmed");
const checkedEl = document.getElementById("checked");

// ESPERA O LOGIN
onAuthStateChanged(auth, (user) => {

if (!user) {
window.location.href = "login.html";
return;
}

console.log("Utilizador:", user.uid);

// AGORA SIM cria a query
const q = query(
collection(db, "guests"),
where("user_id", "==", user.uid)
);

// ESCUTA EM TEMPO REAL
onSnapshot(q, (snapshot) => {

  table.innerHTML = "";

  let total = 0;
  let confirmed = 0;
  let checked = 0;

  snapshot.forEach((doc) => {
    const g = doc.data();

    total++;

    if (g.confirmed) confirmed++;
    if (g.checked_in) checked++;

    const row = `<tr><td>${g.name}</td><td>${g.confirmed ? "Confirmado" : "Pendente"}</td><td>${g.checked_in ? "Entrou" : "—"}</td></tr>`;

    table.innerHTML += row;
  });

  totalEl.innerText = total;
  confirmedEl.innerText = confirmed;
  checkedEl.innerText = checked;

});

});
