// src/utils/date.utils.js

/**
 * Returns the start (1st of month 00:00:00) and end (last moment of month) of current month
 * in UTC (or local time — depending on your needs)
 * @returns {{ start: Date, end: Date }}
 */
function getCurrentMonthRange() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);
  
  // Last day of month = day 0 of next month
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  
  return { start, end };
}

/**
 * Returns start and end of a specific month/year
 * @param {number} year 
 * @param {number} month  // 1–12
 * @returns {{ start: Date, end: Date }}
 */
function getMonthRange(year, month) {
  const start = new Date(year, month - 1, 1, 0, 0, 0, 0);
  const end   = new Date(year, month, 0, 23, 59, 59, 999);
  return { start, end };
}

/**
 * Helper: is the date valid and parseable?
 * Useful for input validation in controllers/services
 * @param {any} dateStr 
 * @returns {boolean}
 */
function isValidDate(dateStr) {
  if (!dateStr) return false;
  const d = new Date(dateStr);
  return !isNaN(d.getTime());
}

/**
 * Convert YYYY-MM-DD string → Date at start of day (UTC or local)
 * @param {string} dateStr 
 * @returns {Date | null}
 */
function parseStartOfDay(dateStr) {
  if (!isValidDate(dateStr)) return null;
  const d = new Date(dateStr);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Convert YYYY-MM-DD string → Date at end of day
 * @param {string} dateStr 
 * @returns {Date | null}
 */
function parseEndOfDay(dateStr) {
  if (!isValidDate(dateStr)) return null;
  const d = new Date(dateStr);
  d.setHours(23, 59, 59, 999);
  return d;
}

module.exports = {
  getCurrentMonthRange,
  getMonthRange,
  isValidDate,
  parseStartOfDay,
  parseEndOfDay,
};