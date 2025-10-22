const sanitizeHtml = require('sanitize-html');

/**
 * Sanitizes all string fields in an object recursively.
 */
function sanitizeInput(obj) {
  const cleanObj = {};
  for (const key in obj) {
    const value = obj[key];
    if (typeof value === 'object' && value !== null) {
      cleanObj[key] = sanitizeInput(value);
    } else if (typeof value === 'string') {
      cleanObj[key] = sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} });
    } else {
      cleanObj[key] = value;
    }
  }
  return cleanObj;
}

module.exports = sanitizeInput;
