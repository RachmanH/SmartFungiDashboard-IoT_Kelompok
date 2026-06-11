/**
 * Fallback status detection.
 * Only used if Firebase does not send `status` field.
 */
export function detectStatus(temp, humidity) {
  if (humidity <= 70) return 'Kondisi Aman';
  if (humidity > 85) return 'Risiko Sangat Tinggi';
  if (humidity > 80 && temp >= 24 && temp <= 30) return 'Risiko Jamur Tinggi';
  return 'Waspada Lembab';
}
