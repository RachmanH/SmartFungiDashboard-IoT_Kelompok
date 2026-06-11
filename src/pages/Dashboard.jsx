import { useApp } from '../contexts/AppContext';
import HeroStatusCard from '../components/HeroStatusCard';
import MonitoringCard from '../components/MonitoringCard';
import RecommendationBox from '../components/RecommendationBox';
import SensorChart from '../components/SensorChart';
import HistoryTable from '../components/HistoryTable';
import ConnectionBadge from '../components/ConnectionBadge';
import { formatUptime, formatRelativeTime } from '../utils/format';
import { AlertCircle } from 'lucide-react';

function DisclaimerBanner() {
  return (
    <div className="bg-blue-200 dark:bg-blue-950 border-4 border-black dark:border-blue-200 rounded-xl p-4 shadow-neo-sm dark:shadow-[3px_3px_0px_0px_rgba(191,219,254,0.24)]">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg border-2 border-black dark:border-blue-200 bg-white dark:bg-neutral-900 shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(191,219,254,0.2)] shrink-0">
          <AlertCircle size={18} className="text-blue-600 dark:text-blue-300" />
        </div>
        <p className="text-sm font-medium text-black dark:text-blue-50">
          <strong>Catatan:</strong> Sistem ini tidak mendeteksi jamur secara langsung dan tidak mendiagnosis kesehatan burung murai.
          Sistem hanya mendeteksi kondisi suhu dan kelembaban udara di lingkungan kandang yang berpotensi mendukung pertumbuhan jamur.
        </p>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { current, history, isConnected, isLoading, error } = useApp();

  return (
    <div className="space-y-6">
      <DisclaimerBanner />

      {/* Connection + uptime info */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <ConnectionBadge isConnected={isConnected} isLoading={isLoading} error={error} />
        {current && (
          <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-600 dark:text-violet-200/75">
            <span>Uptime ESP32: <strong className="text-black dark:text-violet-50 font-black">{formatUptime(current.uptime)}</strong></span>
            <span>Update: <strong className="text-black dark:text-violet-50 font-black">{formatRelativeTime(current.timestamp)}</strong></span>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-300 dark:bg-red-950 border-4 border-black dark:border-red-200 rounded-xl p-4 text-sm font-bold text-black dark:text-red-50 shadow-neo-sm dark:shadow-[3px_3px_0px_0px_rgba(254,202,202,0.24)]">
          {error}
        </div>
      )}

      {/* Hero status */}
      <HeroStatusCard
        status={current?.status}
        riskScore={current?.riskScore}
        tempDewDiff={current?.tempDewDiff}
        loading={isLoading}
      />

      {/* Monitoring cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MonitoringCard type="temperature" value={current?.temperature} loading={isLoading} />
        <MonitoringCard type="humidity" value={current?.humidity} loading={isLoading} />
        <MonitoringCard type="dewPoint" value={current?.dewPoint} loading={isLoading} />
        <MonitoringCard type="riskScore" value={current?.riskScore} loading={isLoading} />
      </div>

      {/* Recommendation */}
      <RecommendationBox recommendation={current?.recommendation} loading={isLoading} />

      {/* Chart */}
      <SensorChart data={history} />

      {/* History table */}
      <HistoryTable data={history} maxRows={5} />
    </div>
  );
}
