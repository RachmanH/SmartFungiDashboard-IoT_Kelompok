/**
 * Export array of sensor readings to a CSV file download.
 */
export function exportCsv(data) {
  if (!data || data.length === 0) return;

  const headers = [
    'Timestamp',
    'Suhu (°C)',
    'Kelembaban (%)',
    'Titik Embun (°C)',
    'Selisih Suhu-Titik Embun (°C)',
    'Skor Risiko',
    'Status',
    'Rekomendasi',
    'Uptime (detik)',
  ];

  const rows = data.map((d) => [
    d.timestamp || '',
    d.temperature ?? '',
    d.humidity ?? '',
    d.dewPoint ?? '',
    d.tempDewDiff ?? '',
    d.riskScore ?? '',
    d.status || '',
    (d.recommendation || '').replace(/\n/g, ' '),
    d.uptime ?? '',
  ]);

  const csvContent =
    [headers, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `smart-fungi-log-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
