import { useMemo } from 'react';
import { useApp } from '../contexts/AppContext';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip as PieTooltip,
} from 'recharts';
import {
  AlertCircle,
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Droplet,
  Droplets,
  Flame,
  ShieldAlert,
  Thermometer,
} from 'lucide-react';

const STATUS_COLORS = {
  'Kondisi Aman':        '#16a34a',
  'Waspada Lembab':      '#ca8a04',
  'Risiko Jamur Tinggi': '#ea580c',
  'Risiko Sangat Tinggi':'#dc2626',
};

function avg(arr) {
  const valid = arr.filter((v) => v != null);
  if (!valid.length) return '-';
  return (valid.reduce((a, b) => a + b, 0) / valid.length).toFixed(1);
}

function countStatus(data, status) {
  return data.filter((d) => d.status === status).length;
}

function percent(count, total) {
  if (!total) return 0;
  return Math.round((count / total) * 100);
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white dark:bg-neutral-950 border-3 border-black dark:border-violet-200 rounded-xl p-3 shadow-neo dark:shadow-[3px_3px_0px_0px_rgba(221,214,254,0.24)] text-sm">
      <p className="font-bold text-gray-600 dark:text-violet-100 mb-2">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} style={{ color: entry.color }} className="font-bold">
          {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value} {entry.unit || ''}
        </p>
      ))}
    </div>
  );
}

export default function Analytics() {
  const { history } = useApp();

  const stats = useMemo(() => {
    if (!history.length) return null;
    return {
      avgTemp:      avg(history.map((d) => d.temperature)),
      avgHumidity: avg(history.map((d) => d.humidity)),
      avgDewPoint:  avg(history.map((d) => d.dewPoint)),
      avgRiskScore: avg(history.map((d) => d.riskScore)),
      countAman:        countStatus(history, 'Kondisi Aman'),
      countWaspada:      countStatus(history, 'Waspada Lembab'),
      countTinggi:       countStatus(history, 'Risiko Jamur Tinggi'),
      countSangatTinggi: countStatus(history, 'Risiko Sangat Tinggi'),
    };
  }, [history]);

  const pieData = useMemo(() => {
    if (!stats) return [];
    return [
      { name: 'Aman',             value: stats.countAman,        color: STATUS_COLORS['Kondisi Aman'] },
      { name: 'Waspada',          value: stats.countWaspada,      color: STATUS_COLORS['Waspada Lembab'] },
      { name: 'Risiko Tinggi',    value: stats.countTinggi,       color: STATUS_COLORS['Risiko Jamur Tinggi'] },
      { name: 'Sangat Tinggi',    value: stats.countSangatTinggi, color: STATUS_COLORS['Risiko Sangat Tinggi'] },
    ].filter((d) => d.value > 0);
  }, [stats]);

  const trendData = useMemo(() => {
    return [...history].reverse().map((d) => ({
      time: d.timestamp ? new Date(d.timestamp).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) : '-',
      Suhu: d.temperature,
      Kelembaban: d.humidity,
      'Skor Risiko': d.riskScore,
    }));
  }, [history]);

  const summaryCards = stats
    ? [
        {
          label: 'Rata-rata Suhu',
          value: stats.avgTemp,
          unit: '°C',
          icon: Thermometer,
          bg: 'bg-red-200 dark:bg-red-900/70',
          iconBg: 'bg-red-400',
          valueColor: 'text-red-700 dark:text-red-200',
          note: 'Kondisi panas kandang',
        },
        {
          label: 'Rata-rata Kelembaban',
          value: stats.avgHumidity,
          unit: '%',
          icon: Droplets,
          bg: 'bg-blue-200 dark:bg-blue-900/70',
          iconBg: 'bg-blue-400',
          valueColor: 'text-blue-700 dark:text-blue-200',
          note: 'Indikator udara lembab',
        },
        {
          label: 'Rata-rata Titik Embun',
          value: stats.avgDewPoint,
          unit: '°C',
          icon: Droplet,
          bg: 'bg-cyan-200 dark:bg-cyan-900/70',
          iconBg: 'bg-cyan-400',
          valueColor: 'text-cyan-700 dark:text-cyan-200',
          note: 'Dekat ke risiko kondensasi',
        },
        {
          label: 'Rata-rata Skor Risiko',
          value: stats.avgRiskScore,
          unit: '/100',
          icon: ShieldAlert,
          bg: 'bg-orange-200 dark:bg-orange-900/70',
          iconBg: 'bg-orange-400',
          valueColor: 'text-orange-700 dark:text-orange-200',
          note: 'Skor gabungan lingkungan',
        },
      ]
    : [];

  const statusCards = stats
    ? [
        {
          label: 'Aman',
          count: stats.countAman,
          icon: CheckCircle2,
          bg: 'bg-green-300 dark:bg-green-800',
          iconBg: 'bg-green-500',
          text: 'text-green-950 dark:text-green-100',
        },
        {
          label: 'Waspada',
          count: stats.countWaspada,
          icon: AlertCircle,
          bg: 'bg-yellow-300 dark:bg-yellow-700',
          iconBg: 'bg-yellow-400',
          text: 'text-yellow-950 dark:text-yellow-100',
        },
        {
          label: 'Risiko Tinggi',
          count: stats.countTinggi,
          icon: AlertTriangle,
          bg: 'bg-orange-400 dark:bg-orange-800',
          iconBg: 'bg-orange-500',
          text: 'text-orange-950 dark:text-orange-100',
        },
        {
          label: 'Sangat Tinggi',
          count: stats.countSangatTinggi,
          icon: Flame,
          bg: 'bg-red-500 dark:bg-red-800',
          iconBg: 'bg-red-600',
          text: 'text-white',
        },
      ]
    : [];

  if (!history.length) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl neo-section-title mb-1">Analitik</h1>
          <p className="text-sm font-medium neo-muted">Statistik dan tren data sensor.</p>
        </div>
        <div className="neo-panel p-8 text-center">
          <div className="p-4 rounded-xl border-3 border-black dark:border-violet-200 bg-cream-100 dark:bg-violet-950 shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(221,214,254,0.24)] inline-block mb-4">
            <BarChart3 size={32} className="text-gray-400 dark:text-violet-200" />
          </div>
          <p className="text-gray-500 dark:text-violet-200/75 font-medium">
            Belum ada data untuk dianalisis. Buka dashboard untuk mulai menerima data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl neo-section-title mb-1">Analitik</h1>
        <p className="text-sm font-medium neo-muted">
          {history.length} pembacaan. Data bersifat lokal selama dashboard aktif.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {summaryCards.map(({ label, value, unit, icon: Icon, bg, iconBg, valueColor, note }) => (
          <div key={label} className={`${bg} rounded-xl p-5 border-4 border-black dark:border-violet-200 shadow-neo dark:shadow-[5px_5px_0px_0px_rgba(221,214,254,0.22)] transition-transform hover:-translate-y-1`}>
            <div className="flex items-start justify-between gap-3 mb-5">
              <div>
                <p className="text-xs font-black uppercase text-black/60 dark:text-violet-100/80 tracking-wider">{label}</p>
                <p className="mt-1 text-xs font-bold text-black/55 dark:text-violet-200/65">{note}</p>
              </div>
              <div className={`${iconBg} border-3 border-black dark:border-violet-100 rounded-xl p-3 shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(221,214,254,0.22)] shrink-0`}>
                <Icon size={22} className="text-black dark:text-violet-50" />
              </div>
            </div>
            <div className="flex items-end justify-between gap-3">
              <p className={`text-4xl font-black tracking-tight ${valueColor}`}>{value}</p>
              <span className="mb-1 rounded-lg border-2 border-black dark:border-violet-200 bg-white dark:bg-neutral-950 px-2.5 py-1 text-xs font-black text-black dark:text-violet-50 shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(221,214,254,0.2)]">
                {unit}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Status counts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statusCards.map(({ label, count, icon: Icon, bg, iconBg, text }) => (
          <div key={label} className={`${bg} rounded-xl p-5 border-4 border-black dark:border-violet-100 shadow-neo-sm dark:shadow-[3px_3px_0px_0px_rgba(221,214,254,0.22)]`}>
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className={`rounded-xl border-3 border-black dark:border-violet-100 ${iconBg} p-2.5 shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(221,214,254,0.2)]`}>
                <Icon size={20} className="text-black dark:text-violet-50" />
              </div>
              <span className="rounded-full border-2 border-black dark:border-violet-200 bg-white dark:bg-neutral-950 px-3 py-1 text-xs font-black text-black dark:text-violet-50">
                {percent(count, history.length)}%
              </span>
            </div>
            <p className={`text-sm font-black uppercase ${text} tracking-wider`}>{label}</p>
            <div className="mt-2 flex items-end justify-between gap-3">
              <p className={`text-4xl font-black ${text}`}>{count}</p>
              <p className={`mb-1 text-xs font-bold ${text} opacity-80`}>dari {history.length} data</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pie chart */}
      {pieData.length > 0 && (
        <div className="neo-panel p-6">
          <h3 className="neo-section-title mb-4">Distribusi Status</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <PieTooltip content={<CustomTooltip />} />
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} stroke="var(--chart-axis)" strokeWidth={2} />
                ))}
              </Pie>
              <Legend wrapperStyle={{ fontSize: 12, fontWeight: 'bold', color: 'var(--chart-axis)' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Trend charts */}
      <div className="neo-panel p-6">
        <h3 className="neo-section-title mb-4">Tren Data</h3>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={trendData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
            <XAxis dataKey="time" tick={{ fontSize: 11, fontWeight: 'bold', fill: 'var(--chart-axis)' }} tickLine={false} axisLine={{ stroke: 'var(--chart-axis)', strokeWidth: 2 }} />
            <YAxis tick={{ fontSize: 11, fontWeight: 'bold', fill: 'var(--chart-axis)' }} tickLine={false} axisLine={{ stroke: 'var(--chart-axis)', strokeWidth: 2 }} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, fontWeight: 'bold', color: 'var(--chart-axis)' }} />
            <Line type="monotone" dataKey="Suhu" stroke="#ef4444" strokeWidth={3} dot={{ fill: 'var(--chart-dot)', strokeWidth: 2, r: 4 }} name="Suhu (°C)" unit="°C" />
            <Line type="monotone" dataKey="Kelembaban" stroke="#3b82f6" strokeWidth={3} dot={{ fill: 'var(--chart-dot)', strokeWidth: 2, r: 4 }} name="Kelembaban (%)" unit="%" />
            <Line type="monotone" dataKey="Skor Risiko" stroke="#f97316" strokeWidth={3} dot={{ fill: 'var(--chart-dot)', strokeWidth: 2, r: 4 }} name="Skor Risiko" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
