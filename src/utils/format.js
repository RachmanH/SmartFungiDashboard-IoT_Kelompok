/**
 * Format a number to fixed decimal places.
 */
export function formatNumber(value, digits = 1) {
  if (value === undefined || value === null || isNaN(value)) return '-';
  return Number(value).toFixed(digits);
}

/**
 * Format uptime seconds to "Xj Ym Zs".
 */
export function formatUptime(seconds) {
  if (!seconds && seconds !== 0) return '-';
  const jam = Math.floor(seconds / 3600);
  const menit = Math.floor((seconds % 3600) / 60);
  const detik = seconds % 60;
  return `${jam}j ${menit}m ${detik}d`;
}

/**
 * Format a timestamp to Indonesian locale string.
 */
export function formatTimestamp(isoString) {
  if (!isoString) return '-';
  return new Date(isoString).toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/**
 * Format relative time (e.g. "2 menit yang lalu").
 */
export function formatRelativeTime(isoString) {
  if (!isoString) return '-';
  const diff = Date.now() - new Date(isoString).getTime();
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds} detik lalu`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  const days = Math.floor(hours / 24);
  return `${days} hari lalu`;
}
