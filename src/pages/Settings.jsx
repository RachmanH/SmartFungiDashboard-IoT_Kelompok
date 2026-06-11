import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { RefreshCw, Database, AlertTriangle, Moon, Sun, Save } from 'lucide-react';

const FIREBASE_DB_URL = import.meta.env.VITE_FIREBASE_DB_URL;
const FIREBASE_PATH = import.meta.env.VITE_FIREBASE_PATH;

export default function Settings() {
  const { config, updateConfig, darkMode, toggleDarkMode } = useApp();
  const [refreshInput, setRefreshInput] = useState(config.refreshInterval / 1000);
  const [saved, setSaved] = useState(false);

  const handleRefreshChange = () => {
    const seconds = Math.max(5, Math.min(60, refreshInput));
    setRefreshInput(seconds);
    updateConfig({ refreshInterval: seconds * 1000 });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 dark:text-white mb-1 uppercase tracking-tight">Pengaturan</h1>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Konfigurasi dashboard Smart Fungi Alert.</p>
      </div>

      {/* Firebase info */}
      <section className="bg-white dark:bg-neutral-800 rounded-xl p-6 border-4 border-black dark:border-white shadow-neo space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg border-2 border-black dark:border-white bg-blue-200 dark:bg-blue-800 shadow-neo-sm">
            <Database size={18} className="text-blue-600 dark:text-blue-300" />
          </div>
          <h2 className="font-black text-gray-700 dark:text-gray-200 uppercase tracking-tight">Firebase Configuration</h2>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <span className="font-bold text-gray-600 dark:text-gray-400 uppercase text-xs tracking-wider">Database URL</span>
            <code className="text-gray-800 dark:text-gray-200 bg-cream-100 dark:bg-neutral-900 px-3 py-2 rounded-lg border-2 border-black dark:border-white font-mono text-xs break-all">
              {FIREBASE_DB_URL}
            </code>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <span className="font-bold text-gray-600 dark:text-gray-400 uppercase text-xs tracking-wider">Path</span>
            <code className="text-gray-800 dark:text-gray-200 bg-cream-100 dark:bg-neutral-900 px-3 py-2 rounded-lg border-2 border-black dark:border-white font-mono text-xs">
              {FIREBASE_PATH}
            </code>
          </div>
        </div>
      </section>

      {/* Refresh interval */}
      <section className="bg-white dark:bg-neutral-800 rounded-xl p-6 border-4 border-black dark:border-white shadow-neo space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg border-2 border-black dark:border-white bg-green-200 dark:bg-green-800 shadow-neo-sm">
            <RefreshCw size={18} className="text-green-600 dark:text-green-300" />
          </div>
          <h2 className="font-black text-gray-700 dark:text-gray-200 uppercase tracking-tight">Refresh Interval</h2>
        </div>
        <div className="flex items-center flex-wrap gap-3">
          <input
            type="number"
            min={5}
            max={60}
            value={refreshInput}
            onChange={(e) => setRefreshInput(Number(e.target.value))}
            className="w-24 px-4 py-3 border-3 border-black dark:border-white rounded-xl text-sm bg-cream-100 dark:bg-neutral-900 text-gray-900 dark:text-white font-bold focus:outline-none focus:ring-0"
          />
          <span className="text-sm font-bold text-gray-600 dark:text-gray-300">detik</span>
          <button
            onClick={handleRefreshChange}
            className={`flex items-center gap-2 px-4 py-3 font-bold border-3 border-black dark:border-white rounded-xl text-sm transition-all active:scale-95 ${
              saved
                ? 'bg-green-400 text-black shadow-neo-sm'
                : 'bg-yellow-300 hover:bg-yellow-400 text-black shadow-neo-sm'
            }`}
          >
            <Save size={16} />
            {saved ? 'Tersimpan!' : 'Simpan'}
          </button>
        </div>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Minimal 5 detik, maksimal 60 detik.</p>
      </section>

      {/* Dark mode */}
      <section className="bg-white dark:bg-neutral-800 rounded-xl p-6 border-4 border-black dark:border-white shadow-neo">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg border-2 border-black dark:border-white shadow-neo-sm ${darkMode ? 'bg-neutral-900' : 'bg-orange-200'}`}>
              {darkMode ? <Moon size={18} className="text-yellow-300" /> : <Sun size={18} className="text-orange-600" />}
            </div>
            <div>
              <h2 className="font-black text-gray-700 dark:text-gray-200 uppercase tracking-tight">Dark Mode</h2>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Aktifkan tema gelap.</p>
            </div>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`relative w-14 h-8 rounded-xl border-3 border-black dark:border-white transition-colors ${
              darkMode ? 'bg-black' : 'bg-cream-200'
            }`}
          >
            <span
              className={`absolute top-1 w-5 h-5 rounded-lg bg-yellow-300 border-2 border-black transition-all ${
                darkMode ? 'left-7' : 'left-1'
              }`}
            />
          </button>
        </div>
      </section>

      {/* System limitations */}
      <section className="bg-white dark:bg-neutral-800 rounded-xl p-6 border-4 border-black dark:border-white shadow-neo space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg border-2 border-black dark:border-white bg-amber-200 dark:bg-amber-800 shadow-neo-sm">
            <AlertTriangle size={18} className="text-amber-600 dark:text-amber-300" />
          </div>
          <h2 className="font-black text-gray-700 dark:text-gray-200 uppercase tracking-tight">Batasan Sistem</h2>
        </div>
        <ul className="space-y-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 mt-2 rounded-full bg-black dark:bg-white shrink-0" />
            Dashboard hanya membaca data dari Firebase.
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 mt-2 rounded-full bg-black dark:bg-white shrink-0" />
            Dashboard tidak mengontrol perangkat ESP32.
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 mt-2 rounded-full bg-black dark:bg-white shrink-0" />
            Dashboard tidak mengirim perintah ke kipas, lampu, pompa, atau aktuator lain.
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 mt-2 rounded-full bg-black dark:bg-white shrink-0" />
            Riwayat permanen hanya tersedia jika ESP32 menyimpan data ke <code className="bg-cream-200 dark:bg-neutral-900 px-1.5 py-0.5 rounded border border-black dark:border-white font-mono text-xs">/logs</code>.
          </li>
        </ul>
        <div className="mt-4 p-4 bg-blue-200 dark:bg-blue-800 border-4 border-black dark:border-white rounded-xl text-sm font-medium text-black dark:text-white shadow-neo-sm">
          <strong>Disclaimer:</strong> Sistem ini tidak mendeteksi jamur secara langsung dan tidak mendiagnosis kesehatan burung murai.
          Sistem hanya mendeteksi kondisi suhu dan kelembaban udara di lingkungan kandang yang berpotensi mendukung pertumbuhan jamur.
        </div>
      </section>
    </div>
  );
}