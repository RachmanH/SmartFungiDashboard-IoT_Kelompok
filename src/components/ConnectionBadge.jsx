import { Wifi, WifiOff, Loader2 } from 'lucide-react';

export default function ConnectionBadge({ isConnected, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Loader2 size={14} className="animate-spin" />
        <span>Menghubungi Firebase...</span>
      </div>
    );
  }

  if (error || !isConnected) {
    return (
      <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
        <WifiOff size={14} />
        <span>Offline</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
      <Wifi size={14} />
      <span>Terhubung</span>
    </div>
  );
}
