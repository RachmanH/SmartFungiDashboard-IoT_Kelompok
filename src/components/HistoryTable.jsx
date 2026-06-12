import { formatTimestamp } from '../utils/format';
import StatusBadge from './StatusBadge';
import { Bird } from 'lucide-react';

export default function HistoryTable({ data, maxRows = 10 }) {
  const rows = data.slice(0, maxRows);

  if (!rows.length) {
    return (
        <div className="neo-panel p-6">
        <h3 className="neo-section-title mb-4">Riwayat Terbaru</h3>
        <div className="text-center text-gray-400 dark:text-violet-200/60 text-xs sm:text-sm font-medium py-8 border-2 border-dashed border-gray-300 dark:border-violet-300/40 rounded-lg">
          <Bird size={28} className="mx-auto mb-2 text-amber-500 dark:text-amber-200" />
          Belum ada jejak pembacaan kandang.
        </div>
      </div>
    );
  }

  return (
    <div className="neo-panel p-6">
      <h3 className="neo-section-title mb-4">Riwayat Terbaru</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm">
          <thead>
            <tr className="border-b-2 border-black dark:border-violet-200">
              <th className="text-left py-3 pr-4 font-black text-gray-600 dark:text-violet-200 uppercase tracking-wider text-xs">Waktu</th>
              <th className="text-right py-3 px-3 font-black text-gray-600 dark:text-violet-200 uppercase tracking-wider text-xs">Suhu</th>
              <th className="text-right py-3 px-3 font-black text-gray-600 dark:text-violet-200 uppercase tracking-wider text-xs">Kelembaban</th>
              <th className="text-right py-3 px-3 font-black text-gray-600 dark:text-violet-200 uppercase tracking-wider text-xs">Titik Embun</th>
              <th className="text-right py-3 px-3 font-black text-gray-600 dark:text-violet-200 uppercase tracking-wider text-xs">Skor</th>
              <th className="text-left py-3 pl-3 font-black text-gray-600 dark:text-violet-200 uppercase tracking-wider text-xs">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={row.id ?? row.timestamp ?? i} className="border-b border-gray-200 dark:border-violet-200/20 hover:bg-cream-100 dark:hover:bg-violet-950/70 transition-colors">
                <td className="py-3 pr-4 font-medium text-gray-700 dark:text-violet-100/80">{formatTimestamp(row.timestamp)}</td>
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
