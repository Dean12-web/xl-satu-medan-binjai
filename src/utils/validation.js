/**
 * Validation and sanitization helpers adhering to STANDAR_KODE.md
 */

/**
 * Validates Indonesian telephone / WhatsApp number.
 * Must start with 08, 628, or +628, and have 10 - 14 digits.
 *
 * @param {string} phone
 * @returns {boolean}
 */
export function validateIndonesianPhone(phone) {
  if (!phone) return false;
  const cleaned = phone.replace(/[\s-]/g, '');
  return /^(\+628|628|08)[0-9]{8,12}$/.test(cleaned);
}

/**
 * Trims input and enforces max character length.
 *
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
export function sanitizeString(str, maxLength = 255) {
  if (!str || typeof str !== 'string') return '';
  return str.trim().slice(0, maxLength);
}

/**
 * Safely opens external links in a new tab preventing reverse tabnabbing.
 *
 * @param {string} url
 */
export function safeOpenExternal(url) {
  if (!url) return;
  window.open(url, '_blank', 'noopener,noreferrer');
}
