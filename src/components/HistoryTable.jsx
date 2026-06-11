import { formatTimestamp } from '../utils/format';
import StatusBadge from './StatusBadge';

export default function HistoryTable({ data, maxRows = 10 }) {
  const rows = data.slice(0, maxRows);

  if (!rows.length) {
    return (
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border-4 border-black dark:border-white shadow-neo">
        <h3 className="font-black text-gray-700 dark:text-gray-200 mb-4 uppercase tracking-tight">Riwayat Terbaru</h3>
        <div className="text-center text-gray-400 text-sm font-medium py-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          Belum ada data riwayat.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border-4 border-black dark:border-white shadow-neo">
      <h3 className="font-black text-gray-700 dark:text-gray-200 mb-4 uppercase tracking-tight">Riwayat Terbaru</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-black dark:border-white">
              <th className="text-left py-3 pr-4 font-black text-gray-600 dark:text-gray-300 uppercase tracking-wider text-xs">Waktu</th>
              <th className="text-right py-3 px-3 font-black text-gray-600 dark:text-gray-300 uppercase tracking-wider text-xs">Suhu</th>
              <th className="text-right py-3 px-3 font-black text-gray-600 dark:text-gray-300 uppercase tracking-wider text-xs">Kelembaban</th>
              <th className="text-right py-3 px-3 font-black text-gray-600 dark:text-gray-300 uppercase tracking-wider text-xs">Titik Embun</th>
              <th className="text-right py-3 px-3 font-black text-gray-600 dark:text-gray-300 uppercase tracking-wider text-xs">Skor</th>
              <th className="text-left py-3 pl-3 font-black text-gray-600 dark:text-gray-300 uppercase tracking-wider text-xs">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-cream-100 dark:hover:bg-neutral-700/50 transition-colors">
                <td className="py-3 pr-4 font-medium text-gray-700 dark:text-gray-300">{formatTimestamp(row.timestamp)}</td>
                <td className="text-right py-3 px-3 font-black">{row.temperature?.toFixed(1) ?? '-'} °C</td>
                <td className="text-right py-3 px-3 font-black">{row.humidity?.toFixed(1) ?? '-'} %</td>
                <td className="text-right py-3 px-3 font-black">{row.dewPoint?.toFixed(1) ?? '-'} °C</td>
                <td className="text-right py-3 px-3 font-black">{row.riskScore ?? '-'}</td>
                <td className="py-3 pl-3"><StatusBadge status={row.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}