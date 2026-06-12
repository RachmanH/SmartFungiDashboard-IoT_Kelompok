/**
 * Calculate risk score.
 * Only used if Supabase does not send `risk_score` field.
 */
export function calcRiskScore(temp, humidity) {
  const humScore = Math.max(0, Math.min(100, ((humidity - 60) / 35) * 100));
  const tempInOptimal = temp >= 24 && temp <= 30;
  const tempScore = tempInOptimal
    ? 100 - (Math.abs(temp - 27) / 3) * 40
    : Math.max(0, 40 - Math.abs(temp - 27) * 4);
  return Math.round(humScore * 0.65 + tempScore * 0.35);
}
