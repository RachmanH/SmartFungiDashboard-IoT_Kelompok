import { Bird, Lightbulb } from 'lucide-react';

export default function RecommendationBox({ recommendation, loading }) {
  if (loading) {
    return (
      <div className="bg-cream-100 dark:bg-neutral-900 rounded-xl p-6 border-4 border-black dark:border-violet-200 shadow-neo dark:shadow-[5px_5px_0px_0px_rgba(221,214,254,0.24)] animate-pulse">
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
    <div className="bg-yellow-200 dark:bg-yellow-950 rounded-xl p-6 border-4 border-black dark:border-yellow-200 shadow-neo dark:shadow-[5px_5px_0px_0px_rgba(254,240,138,0.24)]">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-lg border-2 border-black dark:border-yellow-200 bg-white dark:bg-neutral-900 shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(254,240,138,0.22)]">
          <Lightbulb size={20} className="text-yellow-600 dark:text-yellow-300" />
        </div>
        <div>
          <h3 className="text-sm sm:text-base font-black text-black dark:text-yellow-50 uppercase tracking-tight">Rekomendasi Perawatan Kandang</h3>
          <p className="mt-0.5 flex items-center gap-1 text-xs font-black uppercase tracking-wider text-black/60 dark:text-yellow-100/70">
            <Bird size={12} />
            Fokus kandang murai
          </p>
        </div>
      </div>
      <ul className="space-y-2">
        {lines.map((line, i) => (
          <li key={i} className="flex items-start gap-3 text-xs sm:text-sm font-medium text-black dark:text-yellow-50">
            <span className="mt-0.5 shrink-0 w-6 h-6 flex items-center justify-center bg-black dark:bg-yellow-200 text-yellow-400 dark:text-yellow-900 rounded-full text-xs font-black">✓</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
