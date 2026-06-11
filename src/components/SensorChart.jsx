import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Bird } from 'lucide-react';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-neutral-950 border-3 border-black dark:border-violet-200 rounded-xl p-3 shadow-neo dark:shadow-[3px_3px_0px_0px_rgba(221,214,254,0.24)] text-sm">
      <p className="font-bold text-gray-600 dark:text-violet-100 mb-2">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} style={{ color: entry.color }} className="font-bold">
          {entry.name}: {entry.value?.toFixed(1)} {entry.unit}
        </p>
      ))}
    </div>
  );
}

export default function SensorChart({ data }) {
  const chartData = [...data].reverse().map((d) => ({
    time: d.timestamp ? new Date(d.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-',
    Suhu: d.temperature,
    Kelembaban: d.humidity,
  }));

  if (!chartData.length) {
    return (
      <div className="neo-panel p-6">
        <h3 className="neo-section-title mb-4">Grafik Sensor</h3>
        <div className="h-64 flex items-center justify-center text-gray-400 dark:text-violet-200/60 text-sm font-medium border-2 border-dashed border-gray-300 dark:border-violet-300/40 rounded-lg">
          <div className="text-center">
            <Bird size={28} className="mx-auto mb-2 text-amber-500 dark:text-amber-200" />
            Belum ada jejak kondisi kandang untuk ditampilkan.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="neo-panel p-6">
      <h3 className="neo-section-title mb-4">Grafik Sensor</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 11, fontWeight: 'bold', fill: 'var(--chart-axis)' }}
            tickLine={false}
            axisLine={{ stroke: 'var(--chart-axis)', strokeWidth: 2 }}
          />
          <YAxis tick={{ fontSize: 11, fontWeight: 'bold', fill: 'var(--chart-axis)' }} tickLine={false} axisLine={{ stroke: 'var(--chart-axis)', strokeWidth: 2 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, fontWeight: 'bold' }} />
          <Line
            type="monotone"
            dataKey="Suhu"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ fill: 'var(--chart-dot)', strokeWidth: 2, r: 4 }}
            name="Suhu (°C)"
            unit="°C"
          />
          <Line
            type="monotone"
            dataKey="Kelembaban"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: 'var(--chart-dot)', strokeWidth: 2, r: 4 }}
            name="Kelembaban (%)"
            unit="%"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
