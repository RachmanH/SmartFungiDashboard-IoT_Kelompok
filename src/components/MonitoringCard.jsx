import { Thermometer, Droplets, Droplet, ShieldAlert } from 'lucide-react';
import { useWindowWidth } from '../hooks/useWindowWidth';

const CARD_CONFIG = {
  temperature: {
    label: 'Suhu',
    note: 'Udara kandang',
    unit: '°C',
    icon: Thermometer,
    color: 'text-red-600 dark:text-red-100',
    bg: 'bg-red-200 dark:bg-red-950',
    cardBg: 'bg-white dark:bg-neutral-900',
  },
  humidity: {
    label: 'Kelembaban',
    note: 'Area rawan lembab',
    unit: '%',
    icon: Droplets,
    color: 'text-blue-600 dark:text-blue-300',
    bg: 'bg-blue-200 dark:bg-blue-800',
    cardBg: 'bg-white dark:bg-neutral-900',
  },
  dewPoint: {
    label: 'Titik Embun',
    note: 'Risiko kondensasi',
    unit: '°C',
    icon: Droplet,
    color: 'text-cyan-600 dark:text-cyan-300',
    bg: 'bg-cyan-200 dark:bg-cyan-800',
    cardBg: 'bg-white dark:bg-neutral-900',
  },
  riskScore: {
    label: 'Skor Risiko',
    note: 'Lingkungan murai',
    unit: '/100',
    icon: ShieldAlert,
    color: 'text-orange-600 dark:text-orange-300',
    bg: 'bg-orange-200 dark:bg-orange-800',
    cardBg: 'bg-white dark:bg-neutral-900',
  },
};

export default function MonitoringCard({ type, value, loading }) {
  const width = useWindowWidth();
  const isMobile = width < 640;
  const cfg = CARD_CONFIG[type];
  if (!cfg) return null;

  const Icon = cfg.icon;
  const displayValue = value ?? '-';
  const formattedValue = typeof displayValue === 'number' ? displayValue.toFixed(1) : displayValue;

  return (
    <div className={`${cfg.cardBg} rounded-xl ${isMobile ? 'p-3 border-2' : 'p-5 border-4'} border-black dark:border-violet-200 ${isMobile ? 'shadow-neo-sm' : 'shadow-neo'} dark:shadow-[5px_5px_0px_0px_rgba(221,214,254,0.24)] transition-transform hover:-translate-y-1`}>
      <div className={`flex items-center justify-between ${isMobile ? 'mb-2' : 'mb-3'}`}>
        <div className="min-w-0">
          <span className={`${isMobile ? 'text-[10px]' : 'text-xs'} font-bold uppercase text-gray-500 dark:text-violet-200/70 tracking-wider`}>{cfg.label}</span>
          {!isMobile && (
            <p className="mt-0.5 text-[11px] font-bold text-gray-400 dark:text-amber-100/60">{cfg.note}</p>
          )}
        </div>
        <div className={`${isMobile ? 'p-1.5' : 'p-2'} rounded-lg border-2 border-black dark:border-violet-200 ${cfg.bg} shrink-0`}>
          <Icon size={isMobile ? 14 : 18} className={cfg.color} />
        </div>
      </div>

      {loading ? (
        <div className="animate-pulse">
          <div className={`${isMobile ? 'h-7' : 'h-9'} bg-gray-200 dark:bg-gray-700 rounded w-3/4`} />
        </div>
      ) : (
        <div className="flex items-baseline gap-1">
          <span className={`${isMobile ? 'text-xl' : 'text-2xl sm:text-3xl'} font-black text-gray-900 dark:text-violet-50`}>
            {formattedValue}
          </span>
          <span className={`${isMobile ? 'text-xs' : 'text-sm sm:text-base'} font-bold text-gray-400 dark:text-violet-200/60`}>{cfg.unit}</span>
        </div>
      )}
    </div>
  );
}
