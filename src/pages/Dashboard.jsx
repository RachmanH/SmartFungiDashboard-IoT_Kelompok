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
    <div className="bg-blue-200 dark:bg-blue-800 border-4 border-black dark:border-white rounded-xl p-4 shadow-neo-sm">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg border-2 border-black dark:border-white bg-white dark:bg-neutral-900 shadow-neo-sm shrink-0">
          <AlertCircle size={18} className="text-blue-600 dark:text-blue-300" />
        </div>
        <p className="text-sm font-medium text-black dark:text-white">
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
          <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-600 dark:text-gray-400">
            <span>Uptime ESP32: <strong className="text-black dark:text-white font-black">{formatUptime(current.uptime)}</strong></span>
            <span>Update: <strong className="text-black dark:text-white font-black">{formatRelativeTime(current.timestamp)}</strong></span>
          </div>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-300 dark:bg-red-700 border-4 border-black dark:border-white rounded-xl p-4 text-sm font-bold text-black dark:text-white shadow-neo-sm">
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
