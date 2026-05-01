import { db } from "./firebase.js";
import { collection, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const table = document.getElementById("guestTable");

const totalEl = document.getElementById("total");
const confirmedEl = document.getElementById("confirmed");
const checkedEl = document.getElementById("checked");

onSnapshot(collection(db, "guests"), (snapshot) => {
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
