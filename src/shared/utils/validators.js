const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email) {
  return EMAIL_REGEX.test(String(email || "").trim());
}

export function validatePassword(password) {
  return typeof password === "string" && password.trim().length >= 6;
}

export function validateGuestName(name) {
  const trimmed = String(name || "").trim();
  return trimmed.length >= 2 && trimmed.length <= 120;
}

export function validateQrPayload(payload) {
  if (!payload || typeof payload !== "object") {
    return false;
  }

  return typeof payload.guest_id === "string" && payload.guest_id.trim().length > 0;
}
