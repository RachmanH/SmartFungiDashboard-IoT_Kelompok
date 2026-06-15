/**
 * Export array of sensor readings to a CSV file download.
 */
export function exportCsv(data, startDate, endDate) {
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

  let dateSuffix;
  if (startDate && endDate) {
    dateSuffix = `${startDate}_to_${endDate}`;
  } else if (startDate) {
    dateSuffix = `${startDate}_onward`;
  } else if (endDate) {
    dateSuffix = `until_${endDate}`;
  } else {
    dateSuffix = new Date().toISOString().slice(0, 10);
  }

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `smart-fungi-log-${dateSuffix}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
