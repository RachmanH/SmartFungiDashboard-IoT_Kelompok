import { AlertTriangle, Bird, Cpu, Database, Globe, Info, MonitorSmartphone, Wifi } from 'lucide-react';

const APP_VERSION = '1.0.0';
const TECH_STACK = [
  { label: 'Frontend', value: 'React 18 + Vite 6' },
  { label: 'Styling', value: 'TailwindCSS 3' },
  { label: 'Chart', value: 'Recharts' },
  { label: 'Routing', value: 'React Router v7' },
  { label: 'Backend', value: 'Supabase (PostgREST)' },
  { label: 'Deploy', value: 'Vercel' },
];

const FEATURES = [
  'Monitoring suhu dan kelembaban kandang secara real-time',
  'Perhitungan titik embun otomatis menggunakan formula Magnus',
  'Skor risiko lingkungan berbasis suhu dan kelembaban',
  'Deteksi kondisi: Aman, Waspada, Risiko Tinggi, Sangat Tinggi',
  'Rekomendasi perawatan kandang berdasarkan status risiko',
  'Grafik tren data sensor (suhu, kelembaban, skor risiko)',
  'Riwayat pembacaan dengan filter tanggal dan status',
  'Export data ke CSV',
  'Mode gelap (dark mode)',
  'Desain responsif untuk desktop dan mobile',
];

export default function About() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl neo-section-title mb-1">Tentang Aplikasi</h1>
        <p className="text-xs sm:text-sm font-medium neo-muted">Informasi seputar Smart Fungi Alert dan cara kerjanya.</p>
        <span className="bird-tag mt-3">
          <Bird size={14} />
          Monitoring Kandang Murai
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* App identity */}
        <section className="neo-panel p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg border-2 border-black dark:border-violet-200 bg-violet-200 dark:bg-violet-950 shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(221,214,254,0.22)]">
              <Info size={18} className="text-violet-600 dark:text-violet-300" />
            </div>
            <h2 className="neo-section-title">Identitas Aplikasi</h2>
          </div>
          <dl className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-violet-200/20 pb-2">
              <dt className="font-bold text-gray-500 dark:text-violet-200/70">Nama</dt>
              <dd className="font-black text-gray-900 dark:text-violet-50">Smart Fungi Alert</dd>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-violet-200/20 pb-2">
              <dt className="font-bold text-gray-500 dark:text-violet-200/70">Sub-judul</dt>
              <dd className="font-black text-gray-900 dark:text-violet-50">Murai Monitor</dd>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-violet-200/20 pb-2">
              <dt className="font-bold text-gray-500 dark:text-violet-200/70">Versi</dt>
              <dd className="font-black text-gray-900 dark:text-violet-50">v{APP_VERSION}</dd>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-violet-200/20 pb-2">
              <dt className="font-bold text-gray-500 dark:text-violet-200/70">Target</dt>
              <dd className="font-black text-gray-900 dark:text-violet-50">Kandang Burung Murai</dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="font-bold text-gray-500 dark:text-violet-200/70">Tujuan</dt>
              <dd className="font-black text-gray-900 dark:text-violet-50 text-right max-w-[60%]">Deteksi dini kondisi lingkungan yang mendukung pertumbuhan jamur</dd>
            </div>
          </dl>
        </section>

        {/* Device info */}
        <section className="neo-panel p-6 space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg border-2 border-black dark:border-emerald-200 bg-emerald-200 dark:bg-emerald-950 shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(167,243,208,0.22)]">
              <Cpu size={18} className="text-emerald-600 dark:text-emerald-300" />
            </div>
            <h2 className="neo-section-title">Perangkat</h2>
          </div>
          <dl className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-violet-200/20 pb-2">
              <dt className="font-bold text-gray-500 dark:text-violet-200/70">Mikrokontroler</dt>
              <dd className="font-black text-gray-900 dark:text-violet-50">ESP32</dd>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-violet-200/20 pb-2">
              <dt className="font-bold text-gray-500 dark:text-violet-200/70">Device ID</dt>
              <dd className="font-mono text-xs font-bold text-gray-900 dark:text-violet-50 bg-gray-100 dark:bg-neutral-800 px-2 py-1 rounded">esp32_kandang_murai_01</dd>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-violet-200/20 pb-2">
              <dt className="font-bold text-gray-500 dark:text-violet-200/70">Sensor</dt>
              <dd className="font-black text-gray-900 dark:text-violet-50">Suhu & Kelembaban</dd>
            </div>
            <div className="flex justify-between items-center border-b border-gray-200 dark:border-violet-200/20 pb-2">
              <dt className="font-bold text-gray-500 dark:text-violet-200/70">Koneksi</dt>
              <dd className="font-black text-gray-900 dark:text-violet-50">WiFi → Supabase</dd>
            </div>
            <div className="flex justify-between items-center">
              <dt className="font-bold text-gray-500 dark:text-violet-200/70">Interval Kirim</dt>
              <dd className="font-black text-gray-900 dark:text-violet-50">Periodik (ESP32)</dd>
            </div>
          </dl>
        </section>
      </div>

      {/* Tech stack */}
      <section className="neo-panel p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg border-2 border-black dark:border-cyan-200 bg-cyan-200 dark:bg-cyan-950 shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(165,243,252,0.22)]">
            <MonitorSmartphone size={18} className="text-cyan-600 dark:text-cyan-300" />
          </div>
          <h2 className="neo-section-title">Teknologi</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {TECH_STACK.map(({ label, value }) => (
            <div key={label} className="bg-cream-100 dark:bg-neutral-950 border-2 border-black dark:border-violet-200 rounded-xl p-3 shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(221,214,254,0.2)]">
              <p className="text-[10px] font-black uppercase tracking-wider text-gray-500 dark:text-violet-200/60 mb-1">{label}</p>
              <p className="text-xs sm:text-sm font-black text-gray-900 dark:text-violet-50">{value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="neo-panel p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg border-2 border-black dark:border-amber-200 bg-amber-200 dark:bg-amber-950 shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(253,230,138,0.22)]">
            <Globe size={18} className="text-amber-600 dark:text-amber-300" />
          </div>
          <h2 className="neo-section-title">Fitur</h2>
        </div>
        <ul className="space-y-2">
          {FEATURES.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-xs sm:text-sm font-medium text-gray-700 dark:text-violet-100/85">
              <span className="mt-1.5 w-2 h-2 rounded-full bg-black dark:bg-violet-200 shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </section>

      {/* Data flow */}
      <section className="neo-panel p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-lg border-2 border-black dark:border-blue-200 bg-blue-200 dark:bg-blue-950 shadow-neo-sm dark:shadow-[2px_2px_0px_0px_rgba(191,219,254,0.22)]">
            <Database size={18} className="text-blue-600 dark:text-blue-300" />
          </div>
          <h2 className="neo-section-title">Alur Data</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold">
          <span className="px-3 py-2 bg-emerald-200 dark:bg-emerald-950 border-2 border-black dark:border-emerald-200 rounded-xl">ESP32 + Sensor</span>
          <span className="text-gray-400 dark:text-violet-200/50">→</span>
          <span className="px-3 py-2 bg-blue-200 dark:bg-blue-950 border-2 border-black dark:border-blue-200 rounded-xl flex items-center gap-1.5"><Wifi size={14} /> WiFi</span>
          <span className="text-gray-400 dark:text-violet-200/50">→</span>
          <span className="px-3 py-2 bg-violet-200 dark:bg-violet-950 border-2 border-black dark:border-violet-200 rounded-xl">Supabase</span>
          <span className="text-gray-400 dark:text-violet-200/50">→</span>
          <span className="px-3 py-2 bg-yellow-300 dark:bg-yellow-950 border-2 border-black dark:border-yellow-200 rounded-xl">Dashboard Web</span>
        </div>
        <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-violet-200/75">
          Dashboard ini hanya <strong>membaca</strong> data dari Supabase dan tidak mengirim perintah ke perangkat ESP32.
        </p>
      </section>

      {/* Limitations + disclaimer */}
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
            Dashboard tidak mengontrol perangkat ESP32.
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 mt-2 rounded-full bg-black dark:bg-white shrink-0" />
            Dashboard tidak mengirim perintah ke kipas, lampu, pompa, atau aktuator lain.
          </li>
          <li className="flex items-start gap-2">
            <span className="w-2 h-2 mt-2 rounded-full bg-black dark:bg-white shrink-0" />
            Riwayat data bergantung pada ESP32 yang berhasil menyimpan log ke Supabase.
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
