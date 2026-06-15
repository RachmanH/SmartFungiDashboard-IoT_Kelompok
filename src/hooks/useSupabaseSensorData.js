import { useEffect, useRef } from 'react';
import { useApp } from '../contexts/AppContext';
import { detectStatus } from '../utils/detectStatus';
import { calcDewPoint } from '../utils/dewPoint';
import { calcRiskScore } from '../utils/riskScore';
import { getRecommendation } from '../utils/recommendation';
import { getLatestSensorData, getSensorLogs } from '../services/smartFungiApi';

function unwrapRow(raw) {
  const row = Array.isArray(raw) ? raw[0] : raw;

  if (!row || typeof row !== 'object') return null;

  return row.data || row.payload || row.reading || row.latest || row.value || row;
}

function toNumber(value) {
  if (value === null || value === undefined || value === '') return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function normalizeData(raw) {
  const row = unwrapRow(raw);

  if (!row || typeof row !== 'object') {
    throw new Error('Data kosong. Pastikan ESP32 sudah mengirim data ke Supabase.');
  }

  const timestamp = row.timestamp || row.created_at || row.updated_at || new Date().toISOString();
  const temperature = toNumber(row.temperature_c ?? row.temperature ?? row.temp_c ?? row.temp ?? row.suhu);
  const humidity = toNumber(row.humidity_pct ?? row.humidity ?? row.hum ?? row.kelembaban);
  const dewPoint = toNumber(row.dew_point_c ?? row.dew_point) ?? (temperature != null && humidity != null ? calcDewPoint(temperature, humidity) : null);
  const tempDewDiff = toNumber(row.temp_dew_diff_c ?? row.temp_dew_diff) ?? (temperature != null && dewPoint != null ? +(temperature - dewPoint).toFixed(1) : null);
  const riskScore = toNumber(row.risk_score ?? row.riskScore) ?? (temperature != null && humidity != null ? calcRiskScore(temperature, humidity) : null);
  const status = row.status ?? (temperature != null && humidity != null ? detectStatus(temperature, humidity) : null);
  const recommendation = row.recommendation ?? row.rekomendasi ?? (status ? getRecommendation(status) : null);
  const uptime = toNumber(row.uptime_s ?? row.uptime);

  return {
    id: row.id,
    deviceId: row.device_id,
    temperature,
    humidity,
    dewPoint,
    tempDewDiff,
    riskScore,
    status,
    recommendation,
    uptime,
    timestamp,
  };
}

function normalizeRows(rows) {
  if (!Array.isArray(rows)) return [];

  return rows
    .map((row) => {
      try {
        return normalizeData(row);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

export function useSupabaseSensorData() {
  const { setCurrent, setHistory, setIsConnected, setIsLoading, setError, addTransition, config } = useApp();
  const prevStatusRef = useRef(null);
  const intervalRef = useRef(null);

  const fetchData = async () => {
    try {
      const [latestRaw, logsRaw] = await Promise.all([
        getLatestSensorData(),
        getSensorLogs(),
      ]);
      const normalizedLogs = normalizeRows(logsRaw);
      const normalizedLatest = latestRaw ? normalizeData(latestRaw) : null;
      const currentReading = normalizedLatest || normalizedLogs[0] || null;

      if (!currentReading) {
        throw new Error('Belum ada data sensor. Pastikan ESP32 sudah online dan berhasil mengirim data ke Supabase.');
      }

      setCurrent(currentReading);
      setHistory(normalizedLogs.length ? normalizedLogs : [currentReading]);
      setIsConnected(true);
      setIsLoading(false);
      setError(null);

      if (prevStatusRef.current && prevStatusRef.current !== currentReading.status) {
        addTransition(prevStatusRef.current, currentReading.status, currentReading.timestamp);
      }
      prevStatusRef.current = currentReading.status;
    } catch (err) {
      setIsConnected(false);
      setIsLoading(false);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();

    intervalRef.current = setInterval(fetchData, config.refreshInterval);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [config.refreshInterval]);

  return { refetch: fetchData };
}
