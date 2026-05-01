import { validateQrPayload } from "../shared/utils/validators.js";

export function parseQrPayload(decodedText) {
  let parsed;

  try {
    parsed = JSON.parse(decodedText);
  } catch {
    return { ok: false, error: "QR invalido" };
  }

  if (!validateQrPayload(parsed)) {
    return { ok: false, error: "QR invalido" };
  }

  return { ok: true, payload: parsed };
}
