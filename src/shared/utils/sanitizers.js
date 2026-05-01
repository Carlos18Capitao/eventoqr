export function safeText(value) {
  return String(value ?? "");
}

export function normalizeWhitespace(value) {
  return safeText(value).replace(/\s+/g, " ").trim();
}
