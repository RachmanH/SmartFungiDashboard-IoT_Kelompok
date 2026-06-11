import { useEffect, useRef } from 'react';
import { useApp } from '../contexts/AppContext';
import { detectStatus } from '../utils/detectStatus';
import { calcDewPoint } from '../utils/dewPoint';
import { calcRiskScore } from '../utils/riskScore';
import { getRecommendation } from '../utils/recommendation';

const FIREBASE_DB_URL = import.meta.env.VITE_FIREBASE_DB_URL;
const FIREBASE_PATH = import.meta.env.VITE_FIREBASE_PATH;
const FIREBASE_AUTH = import.meta.env.VITE_FIREBASE_AUTH;

function buildUrl() {
  if (!FIREBASE_DB_URL || !FIREBASE_PATH) {
    throw new Error('Konfigurasi Firebase belum lengkap. Periksa VITE_FIREBASE_DB_URL dan VITE_FIREBASE_PATH di file .env.');
  }

  const baseUrl = FIREBASE_DB_URL.replace(/\/$/, '');
  const path = FIREBASE_PATH.startsWith('/') ? FIREBASE_PATH : `/${FIREBASE_PATH}`;
  const url = new URL(`${baseUrl}${path}`);

  if (FIREBASE_AUTH) {
    url.searchParams.set('auth', FIREBASE_AUTH);
  }

  return url.toString();
}

function normalizeData(raw) {
  const timestamp = new Date().toISOString();

  const temperature = raw.temperature_c ?? null;
  const humidity = raw.humidity_pct ?? null;
  const dewPoint = raw.dew_point_c ?? (temperature != null && humidity != null ? calcDewPoint(temperature, humidity) : null);
  const tempDewDiff = raw.temp_dew_diff_c ?? (temperature != null && dewPoint != null ? +(temperature - dewPoint).toFixed(1) : null);
  const riskScore = raw.risk_score ?? (temperature != null && humidity != null ? calcRiskScore(temperature, humidity) : null);
  const status = raw.status ?? (temperature != null && humidity != null ? detectStatus(temperature, humidity) : null);
  const recommendation = raw.recommendation ?? (status ? getRecommendation(status) : null);
  const uptime = raw.uptime_s ?? null;

  return {
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

export function useFirebaseSensorData() {
  const { setCurrent, setIsConnected, setIsLoading, setError, addToHistory, addTransition, config } = useApp();
  const prevStatusRef = useRef(null);
  const intervalRef = useRef(null);

  const fetchData = async () => {
    try {
      const url = buildUrl();
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: Gagal mengambil data dari Firebase`);
      }

      const raw = await res.json();

      if (!raw || Object.keys(raw).length === 0) {
        throw new Error('Data kosong. Pastikan ESP32 sudah mengirim data.');
      }

      const normalized = normalizeData(raw);
      setCurrent(normalized);
      setIsConnected(true);
      setIsLoading(false);
      setError(null);
      addToHistory(normalized);

      if (prevStatusRef.current && prevStatusRef.current !== normalized.status) {
        addTransition(prevStatusRef.current, normalized.status, normalized.timestamp);
      }
      prevStatusRef.current = normalized.status;
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
