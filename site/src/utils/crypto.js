export async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export function generateKeyPair() {
  const privateKey = Array.from({ length: 64 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
  
  const publicKey = Array.from({ length: 128 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
  
  return { privateKey, publicKey };
}

export function generateAddress(publicKey) {
  return '0x' + publicKey.slice(0, 40);
}

export function generateTxHash() {
  return '0x' + Array.from({ length: 64 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
}

export function generateBlockHash(prefix = '') {
  const hash = Array.from({ length: 64 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
  return prefix + hash.slice(prefix.length);
}

export async function mineBlock(data, difficulty, onProgress) {
  let nonce = 0;
  const target = '0'.repeat(difficulty);
  
  while (true) {
    const hash = await sha256(data + nonce);
    
    if (onProgress) {
      onProgress({ nonce, hash, found: hash.startsWith(target) });
    }
    
    if (hash.startsWith(target)) {
      return { nonce, hash };
    }
    
    nonce++;
    
    if (nonce % 100 === 0) {
      await new Promise(r => setTimeout(r, 0));
    }
    
    if (nonce > 1000000) {
      throw new Error('Mining timeout');
    }
  }
}
