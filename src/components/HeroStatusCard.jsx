import { AlertCircle, AlertTriangle, CheckCircle2, Flame } from 'lucide-react';

const STATUS_CONFIG = {
  'Kondisi Aman': {
    icon: CheckCircle2,
    bg: 'bg-green-300 dark:bg-green-600',
    border: 'border-black dark:border-white border-4',
    text: 'text-black dark:text-white',
    labelBg: 'bg-white dark:bg-neutral-900',
    labelText: 'text-green-600 dark:text-green-300',
    pulse: false,
    shadow: 'shadow-neo-lg',
  },
  'Waspada Lembab': {
    icon: AlertCircle,
    bg: 'bg-yellow-300 dark:bg-yellow-500',
    border: 'border-black dark:border-white border-4',
    text: 'text-black dark:text-white',
    labelBg: 'bg-white dark:bg-neutral-900',
    labelText: 'text-yellow-700 dark:text-yellow-200',
    pulse: false,
    shadow: 'shadow-neo-lg',
  },
  'Risiko Jamur Tinggi': {
    icon: AlertTriangle,
    bg: 'bg-orange-400 dark:bg-orange-600',
    border: 'border-black dark:border-white border-4',
    text: 'text-black dark:text-white',
    labelBg: 'bg-white dark:bg-neutral-900',
    labelText: 'text-orange-600 dark:text-orange-200',
    pulse: false,
    shadow: 'shadow-neo-lg',
  },
  'Risiko Sangat Tinggi': {
    icon: Flame,
    bg: 'bg-red-500 dark:bg-red-700',
    border: 'border-4',
    borderColor: 'border-red-900 dark:border-red-300',
    text: 'text-white',
    labelBg: 'bg-white dark:bg-neutral-900',
    labelText: 'text-red-600 dark:text-red-200',
    pulse: true,
    shadow: 'shadow-[8px_8px_0px_0px_#000000] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)]',
  },
};

function getStatusConfig(status) {
  return STATUS_CONFIG[status] || STATUS_CONFIG['Kondisi Aman'];
}

export default function HeroStatusCard({ status, riskScore, tempDewDiff, loading }) {
  const config = getStatusConfig(status);
  const Icon = config.icon;
  const isCondensation = tempDewDiff != null && tempDewDiff < 2;

  if (loading || !status) {
    return (
      <div className={`rounded-xl p-6 border-4 border-black dark:border-white ${config.shadow} animate-pulse bg-cream-100 dark:bg-neutral-800`}>
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2 mb-4" />
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      </div>
    );
  }

  const borderClass = config.borderColor || 'border-black dark:border-white';

  return (
    <div
      className={`rounded-xl p-6 ${config.bg} ${config.border} ${borderClass} ${config.text} ${config.shadow} ${
        config.pulse ? 'animate-pulse' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className={`p-4 rounded-xl border-3 border-black dark:border-white ${config.labelBg} shadow-neo-sm`}>
            <Icon size={32} className={config.labelText} />
          </div>
          <div>
            <h2 className="text-2xl font-black mb-1 uppercase tracking-tight">{status}</h2>
            <p className="text-sm font-bold opacity-75">
              Skor Risiko: <span className="font-black">{riskScore ?? '-'} / 100</span>
            </p>
            {isCondensation && (
              <p className="mt-3 text-sm font-bold text-red-800 dark:text-red-200 bg-white/50 dark:bg-black/30 px-3 py-1 rounded-lg border-2 border-red-900 dark:border-red-200">
                ⚠️ Kondensasi Mungkin — Selisih suhu-titik embun &lt; 2°C
              </p>
            )}
          </div>
        </div>

        <span className={`px-4 py-2 rounded-xl text-xl font-black border-3 border-black dark:border-white ${config.labelBg} ${config.labelText} shadow-neo-sm`}>
          {riskScore ?? '-'}
        </span>
      </div>
    </div>
  );
}