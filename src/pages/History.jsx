import { useState, useMemo } from 'react';
import { useApp } from '../contexts/AppContext';
import HistoryTable from '../components/HistoryTable';
import { exportCsv } from '../utils/exportCsv';
import { ArrowDownAZ, ArrowUpAZ, Bird, CalendarDays, Download, Search } from 'lucide-react';

const STATUS_OPTIONS = ['Semua', 'Kondisi Aman', 'Waspada Lembab', 'Risiko Jamur Tinggi', 'Risiko Sangat Tinggi'];
const PAGE_SIZE = 20;

export default function History() {
  const { history } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const start = startDate ? new Date(startDate + 'T00:00:00') : null;
    const end = endDate ? new Date(endDate + 'T23:59:59') : null;

    const result = history.filter((d) => {
      const matchSearch =
        !search ||
        d.status?.toLowerCase().includes(search.toLowerCase()) ||
        d.recommendation?.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'Semua' || d.status === statusFilter;

      let matchDate = true;
      if (start || end) {
        const ts = new Date(d.timestamp);
        if (start && ts < start) matchDate = false;
        if (end && ts > end) matchDate = false;
      }

      return matchSearch && matchStatus && matchDate;
    });

    result.sort((a, b) => {
      const ta = new Date(a.timestamp).getTime();
      const tb = new Date(b.timestamp).getTime();
      return sortOrder === 'desc' ? tb - ta : ta - tb;
    });

    return result;
  }, [history, search, statusFilter, startDate, endDate, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl neo-section-title mb-1">Riwayat Pembacaan</h1>
        <p className="text-xs sm:text-sm font-medium neo-muted">
          {filtered.length} data dari riwayat Supabase perangkat.
        </p>
        <span className="bird-tag mt-3">
          <Bird size={14} />
          Jejak Kondisi Kandang
        </span>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-violet-200/70" />
          <input
            type="text"
            placeholder="Cari status atau rekomendasi..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-3 border-3 border-black dark:border-violet-200 rounded-xl text-xs sm:text-sm bg-white dark:bg-neutral-900 text-gray-900 dark:text-violet-50 font-medium focus:outline-none focus:ring-0 dark:placeholder:text-violet-200/50"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-4 py-3 border-3 border-black dark:border-violet-200 rounded-xl text-xs sm:text-sm bg-white dark:bg-neutral-900 text-gray-900 dark:text-violet-50 font-bold focus:outline-none focus:ring-0"
        >
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <button
          onClick={() => exportCsv(filtered)}
          disabled={!filtered.length}
          className="flex items-center gap-2 px-4 py-3 bg-green-400 hover:bg-green-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 disabled:opacity-50 text-black font-bold border-3 border-black dark:border-emerald-100 rounded-xl text-xs sm:text-sm transition-all active:scale-95 shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(167,243,208,0.25)]"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Date range + sort */}
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex items-center gap-2 rounded-xl border-3 border-black dark:border-violet-200 bg-white dark:bg-neutral-900 px-3 py-3 shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(221,214,254,0.22)]">
          <CalendarDays size={16} className="text-gray-500 dark:text-violet-200/70 shrink-0" />
          <input
            type="date"
            value={startDate}
            onChange={(e) => { setStartDate(e.target.value); setPage(1); }}
            className="bg-transparent text-xs sm:text-sm font-bold text-gray-900 dark:text-violet-50 focus:outline-none"
          />
          <span className="text-xs font-black text-gray-400 dark:text-violet-200/50">—</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => { setEndDate(e.target.value); setPage(1); }}
            className="bg-transparent text-xs sm:text-sm font-bold text-gray-900 dark:text-violet-50 focus:outline-none"
          />
          {(startDate || endDate) && (
            <button
              onClick={() => { setStartDate(''); setEndDate(''); setPage(1); }}
              className="ml-1 text-[10px] font-black text-red-500 dark:text-red-300 hover:underline"
            >
              Reset
            </button>
          )}
        </div>
        <button
          onClick={() => setSortOrder((s) => s === 'desc' ? 'asc' : 'desc')}
          className="flex items-center gap-2 px-4 py-3 bg-white hover:bg-cream-100 dark:bg-neutral-900 dark:hover:bg-violet-950 text-black dark:text-violet-50 font-bold border-3 border-black dark:border-violet-200 rounded-xl text-xs sm:text-sm transition-all active:scale-95 shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(221,214,254,0.22)]"
        >
          {sortOrder === 'desc' ? <ArrowDownAZ size={16} /> : <ArrowUpAZ size={16} />}
          {sortOrder === 'desc' ? 'Terbaru' : 'Terlama'}
        </button>
      </div>

      {/* Table */}
      <HistoryTable data={paginated} maxRows={PAGE_SIZE} />

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border-3 border-black dark:border-violet-200 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-neutral-900 text-black dark:text-violet-50 disabled:opacity-40 hover:bg-cream-100 dark:hover:bg-violet-950 transition-all active:scale-95"
          >
            ← Prev
          </button>
          <span className="px-4 py-2 border-3 border-black dark:border-yellow-100 rounded-xl text-xs sm:text-sm font-black bg-yellow-300 dark:bg-yellow-400 text-black shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(254,240,138,0.24)]">
            Halaman {page} dari {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border-3 border-black dark:border-violet-200 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-neutral-900 text-black dark:text-violet-50 disabled:opacity-40 hover:bg-cream-100 dark:hover:bg-violet-950 transition-all active:scale-95"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
