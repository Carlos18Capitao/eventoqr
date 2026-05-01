import { subscribeAuthState } from "./src/services/auth-service.js";

subscribeAuthState((user) => {
  if (!user) {
    window.location.href = "login.html";
  }
});