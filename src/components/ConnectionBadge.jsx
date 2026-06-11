import { Wifi, WifiOff, Loader2 } from 'lucide-react';

export default function ConnectionBadge({ isConnected, isLoading, error }) {
  if (isLoading) {
    return (
      <div className="inline-flex items-center gap-2 rounded-xl border-2 border-black dark:border-violet-200 bg-white dark:bg-neutral-900 px-3 py-2 text-sm font-black text-gray-600 dark:text-violet-100 shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(221,214,254,0.22)]">
        <Loader2 size={14} className="animate-spin" />
        <span>Menghubungi Firebase...</span>
      </div>
    );
  }

  if (error || !isConnected) {
    return (
      <div className="inline-flex items-center gap-2 rounded-xl border-2 border-black dark:border-red-200 bg-red-200 dark:bg-red-950 px-3 py-2 text-sm font-black text-red-700 dark:text-red-100 shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(254,202,202,0.24)]">
        <WifiOff size={14} />
        <span>Offline</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-xl border-2 border-black dark:border-emerald-200 bg-green-200 dark:bg-emerald-950 px-3 py-2 text-sm font-black text-green-700 dark:text-emerald-100 shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(167,243,208,0.24)]">
      <Wifi size={14} />
      <span>Terhubung</span>
    </div>
  );
}
