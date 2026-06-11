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

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-neutral-800 border-3 border-black dark:border-white rounded-xl p-3 shadow-neo text-sm">
      <p className="font-bold text-gray-600 dark:text-gray-300 mb-2">{label}</p>
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
      <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border-4 border-black dark:border-white shadow-neo">
        <h3 className="font-black text-gray-700 dark:text-gray-200 mb-4 uppercase tracking-tight">Grafik Sensor</h3>
        <div className="h-64 flex items-center justify-center text-gray-400 text-sm font-medium border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg">
          Belum ada data untuk ditampilkan.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 border-4 border-black dark:border-white shadow-neo">
      <h3 className="font-black text-gray-700 dark:text-gray-200 mb-4 uppercase tracking-tight">Grafik Sensor</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#d1d5db" />
          <XAxis
            dataKey="time"
            tick={{ fontSize: 11, fontWeight: 'bold' }}
            tickLine={false}
            axisLine={{ stroke: '#000', strokeWidth: 2 }}
          />
          <YAxis tick={{ fontSize: 11, fontWeight: 'bold' }} tickLine={false} axisLine={{ stroke: '#000', strokeWidth: 2 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 12, fontWeight: 'bold' }} />
          <Line
            type="monotone"
            dataKey="Suhu"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ fill: '#000', strokeWidth: 2, r: 4 }}
            name="Suhu (°C)"
            unit="°C"
          />
          <Line
            type="monotone"
            dataKey="Kelembaban"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: '#000', strokeWidth: 2, r: 4 }}
            name="Kelembaban (%)"
            unit="%"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}