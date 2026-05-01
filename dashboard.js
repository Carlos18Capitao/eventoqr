import { subscribeAuthState } from "./src/services/auth-service.js";
import { subscribeGuestsByUser } from "./src/services/guest-service.js";
import { safeText } from "./src/shared/utils/sanitizers.js";

const table = document.getElementById("guestTable");
const totalEl = document.getElementById("total");
const confirmedEl = document.getElementById("confirmed");
const checkedEl = document.getElementById("checked");

subscribeAuthState((user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  subscribeGuestsByUser(
    user.uid,
    (snapshot) => {
      table.textContent = "";

      let total = 0;
      let confirmed = 0;
      let checked = 0;

      snapshot.forEach((guestDoc) => {
        const guest = guestDoc.data();

        total += 1;
        if (guest.confirmed) confirmed += 1;
        if (guest.checked_in) checked += 1;

        const row = document.createElement("tr");

        const nameCell = document.createElement("td");
        nameCell.textContent = safeText(guest.name);

        const statusCell = document.createElement("td");
        statusCell.textContent = guest.confirmed ? "Confirmado" : "Pendente";

        const checkedInCell = document.createElement("td");
        checkedInCell.textContent = guest.checked_in ? "Entrou" : "-";

        row.append(nameCell, statusCell, checkedInCell);
        table.appendChild(row);
      });

      totalEl.innerText = String(total);
      confirmedEl.innerText = String(confirmed);
      checkedEl.innerText = String(checked);
    },
    () => {
      table.textContent = "Erro ao carregar convidados";
    }
  );
});
