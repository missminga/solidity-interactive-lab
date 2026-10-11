const escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

export function escapeHtml(str) {
  if (typeof str !== 'string') return String(str);
  return str.replace(/[&<>"']/g, char => escapeMap[char]);
}

export function escapeAttr(str) {
  return escapeHtml(str);
}
