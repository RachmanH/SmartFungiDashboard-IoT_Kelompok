const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const DEVICE_ID = import.meta.env.VITE_DEVICE_ID;

function getBaseRestUrl() {
  if (!SUPABASE_URL || !SUPABASE_KEY || !DEVICE_ID) {
    throw new Error('Konfigurasi Supabase belum lengkap. Periksa VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, dan VITE_DEVICE_ID di file .env.');
  }

  return `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1`;
}

function buildUrl(table, params) {
  const url = new URL(`${getBaseRestUrl()}/${table}`);
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => url.searchParams.append(key, item));
      return;
    }

    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
}

async function request(url) {
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error ${response.status}: ${errorText || 'Gagal mengambil data dari Supabase'}`);
  }

  return response.json();
}

async function fetchAllPages(table, params = {}, batchSize = 1000) {
  const allRows = [];
  let offset = 0;

  while (true) {
    const pageParams = { ...params, limit: batchSize, offset };
    const url = buildUrl(table, pageParams);
    const rows = await request(url);

    if (!Array.isArray(rows) || rows.length === 0) break;

    allRows.push(...rows);

    if (rows.length < batchSize) break;
    offset += batchSize;
  }

  return allRows;
}

export async function getLatestSensorData() {
  const url = buildUrl('smart_fungi_latest', {
    device_id: `eq.${DEVICE_ID}`,
    select: '*',
    limit: 1,
  });

  const data = await request(url);
  return data[0] || null;
}

export async function getSensorLogs() {
  return fetchAllPages('smart_fungi_logs', {
    device_id: `eq.${DEVICE_ID}`,
    select: '*',
    order: 'created_at.desc',
  });
}

export async function getHighRiskLogs() {
  return fetchAllPages('smart_fungi_logs', {
    device_id: `eq.${DEVICE_ID}`,
    risk_score: 'gte.70',
    select: '*',
    order: 'created_at.desc',
  });
}

export async function getLogsByDateRange(startISO, endISO) {
  return fetchAllPages('smart_fungi_logs', {
    device_id: `eq.${DEVICE_ID}`,
    created_at: [`gte.${startISO}`, `lt.${endISO}`],
    select: '*',
    order: 'created_at.asc',
  });
}
