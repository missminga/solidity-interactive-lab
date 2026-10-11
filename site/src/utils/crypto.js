export async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function secureRandomHex(length) {
  const bytes = new Uint8Array(Math.ceil(length / 2));
  crypto.getRandomValues(bytes);
  return Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('').slice(0, length);
}

export function generateKeyPair() {
  const privateKey = secureRandomHex(64);
  const publicKey = secureRandomHex(128);
  return { privateKey, publicKey, isDemo: true };
}

export function generateAddress(publicKey) {
  return '0x' + publicKey.slice(0, 40);
}

export function generateTxHash() {
  return '0x' + secureRandomHex(64);
}
