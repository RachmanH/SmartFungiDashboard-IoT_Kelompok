import { Lightbulb } from 'lucide-react';

export default function RecommendationBox({ recommendation, loading }) {
  if (loading) {
    return (
      <div className="bg-cream-100 dark:bg-neutral-800 rounded-xl p-6 border-4 border-black dark:border-white shadow-neo animate-pulse">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-3" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        </div>
      </div>
    );
  }

  const lines = (recommendation || 'Tidak ada rekomendasi.').split('\n').filter(Boolean);

  return (
    <div className="bg-yellow-200 dark:bg-yellow-600 rounded-xl p-6 border-4 border-black dark:border-white shadow-neo">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg border-2 border-black dark:border-white bg-white dark:bg-neutral-900 shadow-neo-sm">
          <Lightbulb size={20} className="text-yellow-600 dark:text-yellow-300" />
        </div>
        <h3 className="font-black text-black dark:text-white uppercase tracking-tight">Rekomendasi Tindakan</h3>
      </div>
      <ul className="space-y-2">
        {lines.map((line, i) => (
          <li key={i} className="flex items-start gap-3 text-sm font-medium text-black dark:text-white">
            <span className="mt-0.5 shrink-0 w-6 h-6 flex items-center justify-center bg-black dark:bg-white text-yellow-400 dark:text-yellow-600 rounded-full text-xs font-black">✓</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}