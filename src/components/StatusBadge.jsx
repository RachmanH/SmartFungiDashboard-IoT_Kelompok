const STATUS_STYLES = {
  'Kondisi Aman':         'bg-green-400 dark:bg-emerald-500 text-black border-2 border-black dark:border-emerald-100',
  'Waspada Lembab':       'bg-yellow-300 dark:bg-yellow-400 text-black border-2 border-black dark:border-yellow-100',
  'Risiko Jamur Tinggi':  'bg-orange-400 dark:bg-orange-500 text-black border-2 border-black dark:border-orange-100',
  'Risiko Sangat Tinggi': 'bg-red-500 dark:bg-red-600 text-white border-2 border-black dark:border-red-100',
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || 'bg-gray-200 text-black border-2 border-black dark:border-violet-200 dark:bg-neutral-900 dark:text-violet-50';
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${style}`}>
      {status || 'Unknown'}
    </span>
  );
}
