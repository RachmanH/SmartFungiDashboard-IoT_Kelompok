/**
 * Calculate dew point using Magnus formula.
 * Only used if Supabase does not send `dew_point_c` field.
 */
export function calcDewPoint(temp, humidity) {
  const a = 17.27;
  const b = 237.7;
  const safeHumidity = Math.max(1, Math.min(100, humidity));
  const alpha = (a * temp) / (b + temp) + Math.log(safeHumidity / 100);
  return +((b * alpha) / (a - alpha)).toFixed(1);
}
