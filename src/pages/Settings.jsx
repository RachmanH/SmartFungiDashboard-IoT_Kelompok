import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { AlertTriangle, Bird, Moon, RefreshCw, Save, Sun } from 'lucide-react';

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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl neo-section-title mb-1">Pengaturan</h1>
        <p className="text-xs sm:text-sm font-medium neo-muted">Konfigurasi dashboard Smart Fungi Alert.</p>
        <span className="bird-tag mt-3">
          <Bird size={14} />
          Profil Kandang Murai
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Refresh interval */}
        <section className="neo-panel p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg border-2 border-black dark:border-emerald-200 bg-green-200 dark:bg-emerald-950 shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(167,243,208,0.22)]">
              <RefreshCw size={18} className="text-green-600 dark:text-green-300" />
            </div>
            <h2 className="neo-section-title">Refresh Interval</h2>
          </div>
          <div className="flex items-center flex-wrap gap-3">
            <input
              type="number"
              min={5}
              max={60}
              value={refreshInput}
              onChange={(e) => setRefreshInput(Number(e.target.value))}
              className="w-24 px-4 py-3 border-3 border-black dark:border-violet-200 rounded-xl text-xs sm:text-sm bg-cream-100 dark:bg-neutral-950 text-gray-900 dark:text-violet-50 font-bold focus:outline-none focus:ring-0"
            />
            <span className="text-xs sm:text-sm font-bold neo-muted">detik</span>
            <button
              onClick={handleRefreshChange}
              className={`flex items-center gap-2 px-4 py-3 font-bold border-3 border-black rounded-xl text-xs sm:text-sm transition-all active:scale-95 ${
                saved
                  ? 'bg-green-400 dark:bg-emerald-500 text-black dark:border-emerald-100 shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(167,243,208,0.24)]'
                  : 'bg-yellow-300 hover:bg-yellow-400 dark:bg-yellow-400 dark:hover:bg-yellow-300 text-black dark:border-yellow-100 shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(254,240,138,0.24)]'
              }`}
            >
              <Save size={16} />
              {saved ? 'Tersimpan!' : 'Simpan'}
            </button>
          </div>
          <p className="text-xs font-medium neo-muted">Minimal 5 detik, maksimal 60 detik.</p>
        </section>

        {/* Dark mode */}
        <section className="neo-panel p-6">
          <div className="flex h-full items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg border-2 border-black dark:border-violet-200 shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(221,214,254,0.22)] ${darkMode ? 'bg-violet-950' : 'bg-orange-200'}`}>
                {darkMode ? <Moon size={18} className="text-yellow-300" /> : <Sun size={18} className="text-orange-600" />}
              </div>
              <div>
                <h2 className="neo-section-title">Dark Mode</h2>
                <p className="text-xs sm:text-sm font-medium neo-muted">Aktifkan tema gelap.</p>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className={`relative h-8 w-14 shrink-0 rounded-xl border-3 border-black dark:border-violet-200 transition-colors ${
                darkMode ? 'bg-violet-950' : 'bg-cream-200'
              }`}
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-lg bg-yellow-300 dark:bg-violet-200 border-2 border-black transition-all ${
                  darkMode ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>
        </section>
      </div>

      {/* System limitations */}
      <section className="neo-panel p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg border-2 border-black dark:border-amber-200 bg-amber-200 dark:bg-amber-950 shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(253,230,138,0.22)]">
            <AlertTriangle size={18} className="text-amber-600 dark:text-amber-300" />
          </div>
          <h2 className="neo-section-title">Batasan Sistem</h2>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-violet-100/85">
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 mt-2 rounded-full bg-black dark:bg-white shrink-0" />
            Tema visual berfokus pada monitoring kandang burung murai.
          </li>
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
             Riwayat permanen hanya tersedia jika ESP32 menyimpan data ke <code className="bg-cream-200 dark:bg-neutral-950 px-1.5 py-0.5 rounded border border-black dark:border-violet-200 font-mono text-xs">/logs</code>.
          </li>
        </ul>
        <div className="mt-4 p-4 bg-blue-200 dark:bg-blue-950 border-4 border-black dark:border-blue-200 rounded-xl text-xs sm:text-sm font-medium text-black dark:text-blue-50 shadow-neo-sm dark:shadow-[3px_3px_0px_0px_rgba(191,219,254,0.22)]">
          <strong>Disclaimer:</strong> Sistem ini tidak mendeteksi jamur secara langsung dan tidak mendiagnosis kesehatan burung murai.
          Sistem hanya mendeteksi kondisi suhu dan kelembaban udara di lingkungan kandang yang berpotensi mendukung pertumbuhan jamur.
        </div>
      </section>
    </div>
  );
}
