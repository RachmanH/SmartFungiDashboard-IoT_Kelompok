# Smart Fungi Alert

Dashboard web untuk memantau kondisi mikroklimat kandang burung murai berdasarkan suhu dan kelembaban udara. Aplikasi ini membantu mendeteksi kondisi lingkungan yang berpotensi mendukung pertumbuhan jamur, menampilkan status risiko, rekomendasi perawatan, riwayat pembacaan, grafik tren, dan analitik.

> Sistem ini tidak mendeteksi jamur secara langsung dan tidak mendiagnosis kesehatan burung. Sistem hanya membaca kondisi lingkungan kandang yang dapat meningkatkan risiko pertumbuhan jamur.

## Gambaran Sistem

Smart Fungi Alert terdiri dari perangkat ESP32, sensor suhu/kelembaban, Supabase sebagai penyimpanan data, dan dashboard React sebagai antarmuka monitoring.

```txt
ESP32 + Sensor -> WiFi -> Supabase -> Dashboard Web
```

Alur utamanya:

1. ESP32 membaca suhu dan kelembaban kandang.
2. ESP32 menghitung atau mengirim data sensor ke Supabase.
3. Supabase menyimpan data terbaru dan riwayat pembacaan.
4. Dashboard React membaca data dari Supabase REST API.
5. Dashboard menampilkan status risiko, grafik, rekomendasi, dan riwayat.

## Fitur Utama

- Dashboard monitoring real-time berbasis polling Supabase.
- Status risiko lingkungan kandang: `Kondisi Aman`, `Waspada Lembab`, `Risiko Jamur Tinggi`, dan `Risiko Sangat Tinggi`.
- Kartu monitoring suhu, kelembaban, titik embun, dan skor risiko.
- Rekomendasi perawatan kandang berdasarkan status risiko.
- Grafik tren suhu dan kelembaban.
- Halaman riwayat dengan filter status, pencarian, filter tanggal, sorting, pagination, dan export CSV.
- Halaman analitik dengan ringkasan rata-rata, distribusi status, dan grafik tren.
- Dark mode dengan preferensi tersimpan di `localStorage`.
- Layout responsif untuk desktop dan mobile.
- Deploy-ready untuk Vercel.

## Tech Stack

- React 18
- Vite 6
- React Router DOM 7
- TailwindCSS 3
- Recharts
- Lucide React
- Supabase REST/PostgREST
- Vercel

## Struktur Project

```txt
SmartFungi/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
├── catatan.md
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── routes/
    │   └── index.jsx
    ├── layouts/
    │   └── MainLayout.jsx
    ├── contexts/
    │   └── AppContext.jsx
    ├── hooks/
    │   ├── useDarkMode.js
    │   ├── useSupabaseSensorData.js
    │   └── useWindowWidth.js
    ├── services/
    │   └── smartFungiApi.js
    ├── pages/
    │   ├── Dashboard.jsx
    │   ├── History.jsx
    │   ├── Analytics.jsx
    │   └── About.jsx
    ├── components/
    │   ├── ConnectionBadge.jsx
    │   ├── HeroStatusCard.jsx
    │   ├── HistoryTable.jsx
    │   ├── MonitoringCard.jsx
    │   ├── RecommendationBox.jsx
    │   ├── SensorChart.jsx
    │   ├── Sidebar.jsx
    │   └── StatusBadge.jsx
    └── utils/
        ├── dewPoint.js
        ├── detectStatus.js
        ├── exportCsv.js
        ├── format.js
        ├── recommendation.js
        └── riskScore.js
```

## Routing

Routing didefinisikan di `src/routes/index.jsx`.

| Path | Halaman | Fungsi |
| --- | --- | --- |
| `/` | Dashboard | Monitoring utama dan kondisi terbaru |
| `/riwayat` | History | Riwayat pembacaan dan export CSV |
| `/analitik` | Analytics | Statistik dan grafik analitik |
| `/tentang` | About | Informasi aplikasi dan sistem |

Semua halaman dibungkus oleh `MainLayout`, yang juga menjalankan dark mode dan polling data Supabase.

## Alur Data Frontend

File utama alur data:

- `src/layouts/MainLayout.jsx`
- `src/hooks/useSupabaseSensorData.js`
- `src/services/smartFungiApi.js`
- `src/contexts/AppContext.jsx`

Alurnya:

1. `App.jsx` membungkus aplikasi dengan `AppProvider`.
2. `MainLayout.jsx` memanggil `useSupabaseSensorData()`.
3. `useSupabaseSensorData()` mengambil data terbaru dan riwayat dari Supabase.
4. Data dinormalisasi agar kompatibel dengan beberapa nama field sensor.
5. Data disimpan ke `AppContext` sebagai `current` dan `history`.
6. Halaman Dashboard, History, dan Analytics membaca data dari context.

State utama di `AppContext`:

- `current`: data sensor terbaru.
- `history`: daftar riwayat pembacaan.
- `transitions`: catatan perubahan status.
- `isConnected`: status koneksi Supabase.
- `isLoading`: status loading.
- `error`: pesan error.
- `darkMode`: preferensi mode gelap.
- `config.refreshInterval`: interval polling, default `10000` ms.

## Perhitungan Fallback

Jika Supabase tidak mengirim field tertentu, frontend memiliki fallback perhitungan:

- `src/utils/dewPoint.js`: menghitung titik embun dengan formula Magnus.
- `src/utils/riskScore.js`: menghitung skor risiko berbasis suhu dan kelembaban.
- `src/utils/detectStatus.js`: menentukan status risiko.
- `src/utils/recommendation.js`: menentukan rekomendasi berdasarkan status.

Status fallback:

- Kelembaban `<= 70`: `Kondisi Aman`
- Kelembaban `> 85`: `Risiko Sangat Tinggi`
- Kelembaban `> 80` dan suhu `24-30°C`: `Risiko Jamur Tinggi`
- Kondisi lainnya: `Waspada Lembab`

## Supabase

Dashboard membaca dua tabel utama:

- `smart_fungi_latest`: menyimpan data sensor terbaru per device.
- `smart_fungi_logs`: menyimpan seluruh riwayat pembacaan sensor.

### Tabel `smart_fungi_latest`

Contoh struktur:

```sql
create table smart_fungi_latest (
  device_id text primary key,
  uptime_s bigint,
  uptime_text text,
  temperature_c numeric,
  humidity_pct numeric,
  dew_point_c numeric,
  temp_dew_diff_c numeric,
  risk_score integer,
  status text,
  recommendation text,
  updated_at timestamptz default now()
);
```

### Tabel `smart_fungi_logs`

Contoh struktur:

```sql
create table smart_fungi_logs (
  id bigserial primary key,
  device_id text not null,
  uptime_s bigint,
  uptime_text text,
  temperature_c numeric,
  humidity_pct numeric,
  dew_point_c numeric,
  temp_dew_diff_c numeric,
  risk_score integer,
  status text,
  recommendation text,
  created_at timestamptz default now()
);
```

### Endpoint Yang Dipakai Frontend

Data terbaru:

```http
GET /smart_fungi_latest?device_id=eq.<DEVICE_ID>&select=*&limit=1
```

Riwayat pembacaan:

```http
GET /smart_fungi_logs?device_id=eq.<DEVICE_ID>&select=*&order=created_at.desc
```

Service API ada di `src/services/smartFungiApi.js`.

## Environment Variables

Buat file `.env` di root project.

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_supabase_anon_or_publishable_key
VITE_DEVICE_ID=esp32_kandang_murai_01
```

Variabel yang dibaca aplikasi:

- `VITE_SUPABASE_URL`: URL project Supabase.
- `VITE_SUPABASE_ANON_KEY`: anon/publishable key Supabase untuk frontend.
- `VITE_SUPABASE_PUBLISHABLE_KEY`: fallback jika `VITE_SUPABASE_ANON_KEY` tidak tersedia.
- `VITE_DEVICE_ID`: ID device ESP32 yang datanya ditampilkan dashboard.

Catatan:

- Jangan memakai service role key di frontend.
- `.env` sudah masuk `.gitignore`.
- Pastikan konfigurasi environment juga diatur di Vercel saat deploy.

## Instalasi Lokal

Pastikan Node.js dan npm sudah tersedia.

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Build production:

```bash
npm run build
```

Preview hasil build:

```bash
npm run preview
```

## Deploy Vercel

Project sudah memiliki `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

Konfigurasi ini memastikan SPA React Router tetap berjalan saat refresh halaman seperti `/riwayat` atau `/analitik`.

Langkah deploy umum:

1. Import repository ke Vercel.
2. Set framework ke Vite jika belum terdeteksi otomatis.
3. Tambahkan environment variables Supabase di Vercel.
4. Build command: `npm run build`.
5. Output directory: `dist`.

## Keamanan

Poin penting:

- Frontend hanya boleh memakai Supabase anon key atau publishable key.
- Jangan pernah expose service role key, Telegram bot token, WiFi password, atau credential rahasia lain.
- Pastikan Row Level Security Supabase dikonfigurasi dengan benar.
- Batasi akses tulis dari anon key jika dashboard hanya perlu membaca data.
- Review policy Supabase sebelum aplikasi dipublikasikan.

Contoh prinsip RLS:

- Dashboard web: read-only untuk tabel sensor yang diperlukan.
- ESP32: mekanisme tulis sebaiknya dibatasi dan tidak memakai secret yang tersebar publik.
- Service role key hanya dipakai di environment server yang aman, bukan browser.

## Batasan Sistem

- Dashboard tidak mendeteksi jamur secara langsung.
- Dashboard tidak mendiagnosis kesehatan burung murai.
- Dashboard tidak mengontrol perangkat ESP32.
- Dashboard tidak mengirim perintah ke kipas, lampu, pompa, atau aktuator lain.
- Akurasi bergantung pada sensor, koneksi WiFi, dan data yang berhasil masuk ke Supabase.
- Riwayat dan analitik bergantung pada ketersediaan data di `smart_fungi_logs`.

## Troubleshooting

### Dashboard Menampilkan Offline

Periksa:

- `VITE_SUPABASE_URL` sudah benar.
- `VITE_SUPABASE_ANON_KEY` valid.
- `VITE_DEVICE_ID` sesuai dengan data di Supabase.
- Tabel `smart_fungi_latest` dan `smart_fungi_logs` tersedia.
- RLS Supabase mengizinkan akses baca sesuai kebutuhan.
- Browser tidak memblokir request ke Supabase.

### Data Tidak Muncul

Periksa:

- ESP32 sudah mengirim data ke Supabase.
- `device_id` di data sama dengan `VITE_DEVICE_ID`.
- Kolom timestamp tersedia sebagai `created_at`, `updated_at`, atau `timestamp`.
- Kolom sensor tersedia, misalnya `temperature_c` dan `humidity_pct`.

### Route 404 Saat Refresh Di Production

Pastikan `vercel.json` ikut terdeploy dan rewrite SPA aktif.

### Grafik Kosong

Periksa apakah `smart_fungi_logs` memiliki data riwayat untuk device yang sama.

Dashboard utama masih bisa tampil dari `smart_fungi_latest`, tetapi grafik dan riwayat membutuhkan data logs.

## Catatan Pengembangan

Area yang bisa dikembangkan berikutnya:

- Membatasi jumlah log yang di-fetch secara berkala agar lebih efisien.
- Menggunakan query Supabase berdasarkan rentang tanggal untuk History dan Analytics.
- Menambahkan halaman pengaturan untuk mengatur interval refresh.
- Menambahkan script lint/test/format.
- Menghapus atau mengintegrasikan komponen yang tidak dipakai.
- Menambahkan dokumentasi policy RLS Supabase yang final.

## Referensi Internal

- Dokumentasi REST API dan struktur tabel tambahan tersedia di `catatan.md`.
- Konfigurasi deploy SPA tersedia di `vercel.json`.
- Konfigurasi Tailwind tersedia di `tailwind.config.js`.
