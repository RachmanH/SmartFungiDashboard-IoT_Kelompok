import { Thermometer, Droplets, Droplet, ShieldAlert } from 'lucide-react';

const CARD_CONFIG = {
  temperature: {
    label: 'Suhu',
    unit: '°C',
    icon: Thermometer,
    color: 'text-red-600',
    bg: 'bg-red-200 dark:bg-red-800',
    cardBg: 'bg-white dark:bg-neutral-800',
  },
  humidity: {
    label: 'Kelembaban',
    unit: '%',
    icon: Droplets,
    color: 'text-blue-600 dark:text-blue-300',
    bg: 'bg-blue-200 dark:bg-blue-800',
    cardBg: 'bg-white dark:bg-neutral-800',
  },
  dewPoint: {
    label: 'Titik Embun',
    unit: '°C',
    icon: Droplet,
    color: 'text-cyan-600 dark:text-cyan-300',
    bg: 'bg-cyan-200 dark:bg-cyan-800',
    cardBg: 'bg-white dark:bg-neutral-800',
  },
  riskScore: {
    label: 'Skor Risiko',
    unit: '/100',
    icon: ShieldAlert,
    color: 'text-orange-600 dark:text-orange-300',
    bg: 'bg-orange-200 dark:bg-orange-800',
    cardBg: 'bg-white dark:bg-neutral-800',
  },
};

export default function MonitoringCard({ type, value, loading }) {
  const cfg = CARD_CONFIG[type];
  if (!cfg) return null;

  const Icon = cfg.icon;
  const displayValue = value ?? '-';
  const formattedValue = typeof displayValue === 'number' ? displayValue.toFixed(1) : displayValue;

  return (
    <div className={`${cfg.cardBg} rounded-xl p-5 border-4 border-black dark:border-white shadow-neo transition-transform hover:-translate-y-1`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold uppercase text-gray-500 dark:text-gray-400 tracking-wider">{cfg.label}</span>
        <div className={`p-2 rounded-lg border-2 border-black dark:border-white ${cfg.bg}`}>
          <Icon size={18} className={cfg.color} />
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse">
          <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        </div>
      ) : (
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-black text-gray-900 dark:text-white">
            {formattedValue}
          </span>
          <span className="text-base font-bold text-gray-400">{cfg.unit}</span>
        </div>
      )}
    </div>
  );
}