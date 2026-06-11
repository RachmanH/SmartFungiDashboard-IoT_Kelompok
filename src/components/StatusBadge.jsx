const STATUS_STYLES = {
  'Kondisi Aman':         'bg-green-400 text-black border-2 border-black dark:border-white',
  'Waspada Lembab':       'bg-yellow-300 text-black border-2 border-black dark:border-white',
  'Risiko Jamur Tinggi':  'bg-orange-400 text-black border-2 border-black dark:border-white',
  'Risiko Sangat Tinggi': 'bg-red-500 text-white border-2 border-black dark:border-white',
};

export default function StatusBadge({ status }) {
  const style = STATUS_STYLES[status] || 'bg-gray-200 text-black border-2 border-black dark:border-white dark:bg-gray-600 dark:text-white';
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider ${style}`}>
      {status || 'Unknown'}
    </span>
  );
}