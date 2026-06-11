# Product Requirements Document

# Smart Fungi Alert Dashboard

## Dashboard Admin Monitoring Risiko Pertumbuhan Jamur Kandang Burung Murai Berbasis Firebase

---

## 1. Ringkasan Produk

**Smart Fungi Alert Dashboard** adalah aplikasi dashboard admin sederhana untuk memantau kondisi suhu dan kelembaban kandang penangkaran burung murai secara real-time berdasarkan data dari ESP32 + DHT22/DHT11 yang dikirim ke Firebase Realtime Database.

Dashboard ini membantu admin/pemilik kandang melihat kondisi mikroklimat kandang, skor risiko, status risiko pertumbuhan jamur, titik embun, serta rekomendasi tindakan.

Sistem ini tidak mendeteksi jamur secara langsung. Sistem hanya membaca parameter lingkungan kandang, yaitu suhu dan kelembaban udara, lalu menampilkan estimasi risiko kondisi yang dapat mendukung pertumbuhan jamur.

---

## 2. Judul Sistem

> Sistem Monitoring Suhu dan Kelembaban Kandang Penangkaran Burung Murai untuk Deteksi Risiko Pertumbuhan Jamur Berbasis Firebase Realtime Database

---

## 3. Latar Belakang

Kandang penangkaran burung murai memiliki area yang rentan lembab, seperti alas kandang, sisa pakan, tangkringan kayu, area sarang, dinding, dan lantai kandang. Jika kelembaban udara terlalu tinggi dan suhu berada pada rentang yang mendukung, lingkungan kandang dapat menjadi lebih berisiko terhadap pertumbuhan jamur.

Pemantauan manual sering terlambat karena pemilik kandang tidak selalu berada di lokasi. Oleh karena itu, dibutuhkan dashboard admin sederhana yang dapat menampilkan data sensor secara berkala dari ESP32 melalui Firebase.

Dengan dashboard ini, admin dapat melihat kondisi terbaru kandang, membaca status risiko, serta mengambil tindakan cepat seperti membuka ventilasi, membersihkan alas kandang, mengganti sisa pakan, atau mengeringkan area kandang.

---

## 4. Tujuan Produk

Tujuan utama sistem:

1. Menampilkan data suhu dan kelembaban kandang dari Firebase.
2. Menampilkan status risiko pertumbuhan jamur berdasarkan data dari ESP32.
3. Menampilkan skor risiko, titik embun, dan selisih suhu terhadap titik embun.
4. Memberikan rekomendasi tindakan berdasarkan status risiko.
5. Menyediakan tampilan dashboard admin yang sederhana, responsif, dan mudah dibaca.
6. Menyimpan riwayat lokal selama dashboard aktif.
7. Menyiapkan struktur aplikasi agar bisa dikembangkan ke histori permanen jika ESP32 menyimpan data ke `/logs`.

---

## 5. Batasan Sistem

Batasan ini wajib tampil di halaman dashboard dan pengaturan:

```text
Sistem ini tidak mendeteksi jamur secara langsung dan tidak mendiagnosis
kesehatan burung murai. Sistem hanya mendeteksi kondisi suhu dan kelembaban
udara di lingkungan kandang yang berpotensi mendukung pertumbuhan jamur.
```

Batasan teknis:

1. Dashboard hanya membaca data dari Firebase.
2. Dashboard tidak mengontrol perangkat ESP32.
3. Dashboard tidak mengirim perintah ke kipas, lampu, pompa, atau aktuator lain.
4. Data utama berasal dari path Firebase `/SmartFungiAlert/latest`.
5. Jika hanya menggunakan path `latest`, maka data lama akan tertimpa.
6. Riwayat permanen hanya tersedia jika ESP32 juga mengirim data ke `/SmartFungiAlert/logs`.

---

## 6. Target Pengguna

### Pengguna Utama

Admin atau pemilik kandang penangkaran burung murai.

### Kebutuhan Pengguna

1. Melihat suhu kandang.
2. Melihat kelembaban kandang.
3. Melihat status risiko jamur.
4. Melihat rekomendasi tindakan.
5. Melihat apakah kondisi kandang sedang aman, lembab, berisiko tinggi, atau sangat berisiko.
6. Melihat riwayat data sederhana selama dashboard terbuka.

---

## 7. Scope MVP

### Masuk Scope MVP

1. Dashboard utama.
2. Koneksi ke Firebase Realtime Database.
3. Membaca data dari `/SmartFungiAlert/latest`.
4. Auto-refresh data setiap 10 detik.
5. Status koneksi Firebase.
6. Card suhu.
7. Card kelembaban.
8. Card titik embun.
9. Card skor risiko.
10. Hero status card.
11. Recommendation box.
12. Grafik suhu dan kelembaban dari riwayat lokal.
13. Tabel riwayat lokal.
14. Export CSV dari riwayat lokal.
15. Dark mode.
16. Halaman pengaturan sederhana.
17. Disclaimer sistem.

### Tidak Masuk Scope MVP

1. Login admin.
2. Multi-user.
3. Multi-kandang.
4. Kontrol kipas otomatis.
5. Deteksi visual jamur menggunakan kamera.
6. Diagnosis kesehatan burung.
7. Machine learning.
8. Histori permanen jika Firebase belum menyediakan `/logs`.
9. Notifikasi WhatsApp.
10. Panel edit threshold dari dashboard.

---

## 8. Stack Teknologi

Frontend:

```text
React
Vite
Tailwind CSS
Recharts
Lucide React
React Router DOM
```

Data source:

```text
Firebase Realtime Database
```

Metode pengambilan data MVP:

```text
Firebase REST API / fetch()
```

Refresh interval:

```text
10 detik
```

Alasan 10 detik:

1. Sesuai interval pengiriman ESP32.
2. Tidak terlalu agresif ke Firebase.
3. Cukup untuk monitoring kandang.
4. Lebih stabil untuk pengujian dibanding 1–2 detik.

---

## 9. Struktur Database Firebase

### 9.1 Path Utama MVP

Dashboard membaca data dari:

```text
/SmartFungiAlert/latest
```

Endpoint REST:

```text
https://sepuhagry-default-rtdb.asia-southeast1.firebasedatabase.app/SmartFungiAlert/latest.json
```

Jika membutuhkan auth token:

```text
https://sepuhagry-default-rtdb.asia-southeast1.firebasedatabase.app/SmartFungiAlert/latest.json?auth=TOKEN
```

---

## 10. Data Contract Firebase

Data yang dikirim ESP32 ke Firebase:

```json
{
  "uptime_s": 120,
  "temperature_c": 27.5,
  "humidity_pct": 82.3,
  "dew_point_c": 24.1,
  "temp_dew_diff_c": 3.4,
  "risk_score": 76,
  "status": "Risiko Jamur Tinggi",
  "recommendation": "Nyalakan kipas, bersihkan kandang, ganti sisa pakan, periksa area sarang"
}
```

### Penjelasan Field

| Field             |   Tipe | Keterangan                       |
| ----------------- | -----: | -------------------------------- |
| `uptime_s`        | number | Waktu ESP32 aktif dalam detik    |
| `temperature_c`   | number | Suhu udara kandang dalam Celsius |
| `humidity_pct`    | number | Kelembaban udara dalam persen    |
| `dew_point_c`     | number | Titik embun                      |
| `temp_dew_diff_c` | number | Selisih suhu dan titik embun     |
| `risk_score`      | number | Skor risiko 0–100                |
| `status`          | string | Status kondisi kandang           |
| `recommendation`  | string | Rekomendasi tindakan             |

---

## 11. Catatan Source of Truth

Untuk MVP, dashboard tidak perlu menghitung ulang status utama jika Firebase sudah mengirim:

```text
status
risk_score
dew_point_c
recommendation
```

Dashboard menjadikan Firebase sebagai source of truth.

Namun dashboard boleh memiliki fallback calculation jika data dari Firebase tidak lengkap.

Prioritas data:

```text
1. Gunakan data dari Firebase jika tersedia.
2. Jika field tertentu kosong, hitung ulang di frontend.
3. Jika data tidak tersedia sama sekali, tampilkan error state.
```

---

## 12. Detection Logic Fallback

Fallback hanya digunakan jika Firebase tidak mengirim field `status`.

```js
export function detectStatus(temp, humidity) {
  if (humidity <= 70)
    return "Kondisi Aman";

  if (humidity > 85)
    return "Risiko Sangat Tinggi";

  if (humidity > 80 && temp >= 24 && temp <= 30)
    return "Risiko Jamur Tinggi";

  return "Waspada Lembab";
}
```

---

## 13. Risk Score Fallback

Fallback hanya digunakan jika Firebase tidak mengirim field `risk_score`.

```js
export function calcRiskScore(temp, humidity) {
  const humScore = Math.max(0, Math.min(100, ((humidity - 60) / 35) * 100));

  const tempInOptimal = temp >= 24 && temp <= 30;

  const tempScore = tempInOptimal
    ? 100 - (Math.abs(temp - 27) / 3) * 40
    : Math.max(0, 40 - Math.abs(temp - 27) * 4);

  return Math.round(humScore * 0.65 + tempScore * 0.35);
}
```

---

## 14. Dew Point Fallback

Fallback hanya digunakan jika Firebase tidak mengirim field `dew_point_c`.

```js
export function calcDewPoint(temp, humidity) {
  const a = 17.27;
  const b = 237.7;

  const safeHumidity = Math.max(1, Math.min(100, humidity));

  const alpha =
    (a * temp) / (b + temp) + Math.log(safeHumidity / 100);

  return +((b * alpha) / (a - alpha)).toFixed(1);
}
```

Jika:

```text
temperature_c - dew_point_c < 2°C
```

maka dashboard menampilkan warning:

```text
Kondensasi Mungkin
```

---

## 15. Status Risiko dan Warna UI

| Status               | Warna  | Tailwind     | Icon            |
| -------------------- | ------ | ------------ | --------------- |
| Kondisi Aman         | Hijau  | `green-500`  | `CheckCircle2`  |
| Waspada Lembab       | Kuning | `yellow-400` | `AlertCircle`   |
| Risiko Jamur Tinggi  | Oranye | `orange-500` | `AlertTriangle` |
| Risiko Sangat Tinggi | Merah  | `red-600`    | `Flame`         |

Khusus `Risiko Sangat Tinggi`:

```text
Border card menggunakan animate-pulse
```

---

## 16. Rekomendasi Tindakan

Jika Firebase mengirim `recommendation`, dashboard langsung menampilkan rekomendasi tersebut.

Jika tidak ada, dashboard menggunakan rekomendasi fallback berdasarkan status.

### Kondisi Aman

```text
Kandang relatif kering. Lanjutkan monitoring rutin.
```

### Waspada Lembab

```text
Buka ventilasi kandang.
Periksa alas kandang dari kotoran atau kelembaban.
Cek wadah minum, pastikan tidak tumpah.
Tingkatkan frekuensi monitoring.
```

### Risiko Jamur Tinggi

```text
Buka ventilasi maksimal.
Nyalakan kipas kecil untuk sirkulasi udara.
Buang dan ganti sisa pakan yang lembab.
Bersihkan dan keringkan alas kandang.
Periksa tangkringan kayu dan area sarang.
Bersihkan dan sterilkan wadah minum.
Jemur kandang jika memungkinkan.
```

### Risiko Sangat Tinggi

```text
Lakukan semua tindakan pencegahan segera.
Pertimbangkan memindahkan burung sementara.
Disinfeksi menyeluruh kandang.
Hubungi dokter hewan jika burung menunjukkan gejala tidak normal.
```

---

## 17. Halaman Aplikasi

## 17.1 Dashboard `/`

Komponen:

1. HeroStatusCard
2. MonitoringCard suhu
3. MonitoringCard kelembaban
4. MonitoringCard titik embun
5. MonitoringCard skor risiko
6. RecommendationBox
7. SensorChart suhu dan kelembaban
8. HistoryTable preview
9. Firebase connection status

Data source:

```text
/SmartFungiAlert/latest
```

Refresh:

```text
Setiap 10 detik
```

---

## 17.2 Riwayat `/riwayat`

Riwayat pada MVP berasal dari data yang dikumpulkan selama dashboard terbuka.

Fitur:

1. Tabel data pembacaan.
2. Search status.
3. Filter berdasarkan status.
4. Pagination.
5. Export CSV.
6. Keterangan bahwa histori bersifat lokal jika Firebase belum memiliki `/logs`.

Catatan penting:

```text
Jika browser di-refresh, riwayat lokal akan hilang kecuali disimpan ke localStorage.
```

Opsi MVP:

```text
Simpan history lokal ke localStorage.
```

---

## 17.3 Analitik `/analitik`

Data source:

```text
Local history dari dashboard
```

Fitur:

1. Rata-rata suhu.
2. Rata-rata kelembaban.
3. Rata-rata titik embun.
4. Rata-rata skor risiko.
5. Total status Aman.
6. Total status Waspada.
7. Total status Risiko Tinggi.
8. Total status Risiko Sangat Tinggi.
9. Pie chart distribusi status.
10. Line chart tren suhu.
11. Line chart tren kelembaban.
12. Line chart tren skor risiko.

Catatan:

```text
Analitik MVP hanya valid selama dashboard aktif atau selama data masih tersimpan di localStorage.
```

---

## 17.4 Pengaturan `/pengaturan`

Fitur:

1. Menampilkan Firebase host.
2. Menampilkan path database.
3. Mengubah refresh interval frontend.
4. Dark mode toggle.
5. Menampilkan threshold risiko.
6. Menampilkan batasan sistem.
7. Menampilkan catatan keamanan token.

Field pengaturan:

```text
Refresh interval default: 10000 ms
Min refresh interval: 5000 ms
Max refresh interval: 60000 ms
```

---

## 18. State Management

Gunakan satu context utama:

```text
AppContext
```

Tujuannya agar semua halaman menggunakan data yang sama.

State shape:

```js
{
  current: {
    temperature,
    humidity,
    dewPoint,
    tempDewDiff,
    riskScore,
    status,
    recommendation,
    uptime,
    timestamp
  },
  history: [],
  transitions: [],
  isConnected: false,
  isLoading: true,
  error: null,
  config: {
    refreshInterval: 10000,
    maxHistory: 100
  },
  darkMode: false
}
```

---

## 19. Hook Data Firebase

Nama hook:

```text
useFirebaseSensorData.js
```

Tugas:

1. Fetch data dari Firebase.
2. Normalisasi data Firebase ke state frontend.
3. Menambahkan timestamp lokal.
4. Menyimpan current reading.
5. Menambahkan data ke history.
6. Mendeteksi transisi status.
7. Mengatur error jika Firebase gagal dibaca.
8. Auto-refresh berdasarkan `config.refreshInterval`.

Flow:

```text
Dashboard dibuka
↓
Fetch /SmartFungiAlert/latest.json
↓
Validasi response
↓
Normalisasi data
↓
Update current
↓
Append ke history lokal
↓
Jika status berubah, tambahkan ke transitions
↓
Ulangi sesuai refresh interval
```

---

## 20. Normalisasi Data Firebase

Input Firebase:

```js
{
  uptime_s,
  temperature_c,
  humidity_pct,
  dew_point_c,
  temp_dew_diff_c,
  risk_score,
  status,
  recommendation
}
```

Output frontend:

```js
{
  uptime: uptime_s,
  temperature: temperature_c,
  humidity: humidity_pct,
  dewPoint: dew_point_c,
  tempDewDiff: temp_dew_diff_c,
  riskScore: risk_score,
  status,
  recommendation,
  timestamp: new Date().toISOString()
}
```

---

## 21. Struktur Folder

```text
src/
├── contexts/
│   └── AppContext.jsx
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── HeroStatusCard.jsx
│   ├── MonitoringCard.jsx
│   ├── RecommendationBox.jsx
│   ├── SensorChart.jsx
│   ├── HistoryTable.jsx
│   ├── StatusBadge.jsx
│   └── ConnectionBadge.jsx
├── pages/
│   ├── Dashboard.jsx
│   ├── History.jsx
│   ├── Analytics.jsx
│   └── Settings.jsx
├── layouts/
│   └── MainLayout.jsx
├── hooks/
│   ├── useFirebaseSensorData.js
│   └── useDarkMode.js
├── utils/
│   ├── detectStatus.js
│   ├── dewPoint.js
│   ├── riskScore.js
│   ├── recommendation.js
│   ├── exportCsv.js
│   ├── format.js
│   └── printReport.js
├── routes/
│   └── index.jsx
├── App.jsx
├── main.jsx
└── index.css
```

---

## 22. File yang Dibuat

| File                                   | Fungsi                      |
| -------------------------------------- | --------------------------- |
| `src/contexts/AppContext.jsx`          | Shared state dashboard      |
| `src/hooks/useFirebaseSensorData.js`   | Ambil data Firebase         |
| `src/hooks/useDarkMode.js`             | Dark mode dan localStorage  |
| `src/utils/detectStatus.js`            | Fallback status             |
| `src/utils/dewPoint.js`                | Fallback titik embun        |
| `src/utils/riskScore.js`               | Fallback skor risiko        |
| `src/utils/recommendation.js`          | Fallback rekomendasi        |
| `src/utils/exportCsv.js`               | Export CSV                  |
| `src/utils/format.js`                  | Format angka, waktu, uptime |
| `src/utils/printReport.js`             | Print halaman               |
| `src/components/HeroStatusCard.jsx`    | Status utama                |
| `src/components/MonitoringCard.jsx`    | Card sensor                 |
| `src/components/RecommendationBox.jsx` | Rekomendasi tindakan        |
| `src/components/SensorChart.jsx`       | Grafik sensor               |
| `src/components/HistoryTable.jsx`      | Tabel riwayat               |
| `src/components/StatusBadge.jsx`       | Badge status                |
| `src/components/ConnectionBadge.jsx`   | Status koneksi Firebase     |
| `src/components/Navbar.jsx`            | Header dashboard            |
| `src/components/Sidebar.jsx`           | Navigasi                    |
| `src/layouts/MainLayout.jsx`           | Layout utama                |
| `src/pages/Dashboard.jsx`              | Halaman dashboard           |
| `src/pages/History.jsx`                | Halaman riwayat             |
| `src/pages/Analytics.jsx`              | Halaman analitik            |
| `src/pages/Settings.jsx`               | Halaman pengaturan          |
| `src/routes/index.jsx`                 | Routing                     |
| `src/App.jsx`                          | Root app                    |
| `src/main.jsx`                         | Entry point                 |

---

## 23. Setup Project

```bash
cd "/home/agribychaniago/www/Smart Fungi Alert"

npm create vite@latest . -- --template react

npm install

npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p

npm install recharts lucide-react react-router-dom
```

---

## 24. Firebase Config Frontend

Gunakan environment variable.

File:

```text
.env
```

Isi:

```env
VITE_FIREBASE_DB_URL=https://sepuhagry-default-rtdb.asia-southeast1.firebasedatabase.app
VITE_FIREBASE_PATH=/SmartFungiAlert/latest.json
```

Jika masih butuh token untuk testing:

```env
VITE_FIREBASE_AUTH=ISI_TOKEN_FIREBASE
```

Catatan keamanan:

```text
Jangan commit file .env ke GitHub jika berisi token asli.
```

Tambahkan `.env` ke `.gitignore`.

---

## 25. Firebase Rules untuk Testing

Jika hanya ingin dashboard membaca data:

```json
{
  "rules": {
    "SmartFungiAlert": {
      ".read": true,
      ".write": false
    }
  }
}
```

Jika ESP32 masih butuh menulis data tanpa auth, maka untuk testing sementara:

```json
{
  "rules": {
    "SmartFungiAlert": {
      ".read": true,
      ".write": true
    }
  }
}
```

Namun rules ini tidak aman untuk produksi.

Rules produksi sebaiknya menggunakan authentication atau token khusus.

---

## 26. Risiko Teknis

| Risiko                      | Dampak                       | Mitigasi                                      |
| --------------------------- | ---------------------------- | --------------------------------------------- |
| Firebase rules tertutup     | Dashboard gagal membaca data | Atur `.read` untuk path `SmartFungiAlert`     |
| Path Firebase salah         | Data tidak muncul            | Pastikan path `/SmartFungiAlert/latest` benar |
| ESP32 hanya update `latest` | Tidak ada histori permanen   | Simpan history lokal atau tambah `/logs`      |
| Token ditaruh di frontend   | Risiko bocor                 | Pakai rules read-only atau backend proxy      |
| Refresh terlalu cepat       | Firebase request berlebihan  | Default 10 detik                              |
| Sensor gagal baca           | Data tidak update            | Tampilkan last known data dan status error    |
| Internet ESP32 putus        | Data Firebase stale          | Tampilkan indikator last update               |

---

## 27. Future Improvement

### 27.1 Histori Permanen Firebase

Tambahkan path:

```text
/SmartFungiAlert/logs/{pushId}
```

Contoh data:

```json
{
  "uptime_s": 120,
  "temperature_c": 27.5,
  "humidity_pct": 82.3,
  "dew_point_c": 24.1,
  "temp_dew_diff_c": 3.4,
  "risk_score": 76,
  "status": "Risiko Jamur Tinggi",
  "recommendation": "Nyalakan kipas, bersihkan kandang",
  "created_at_ms": 1710000000000
}
```

Jika `/logs` tersedia, halaman Riwayat dan Analitik sebaiknya membaca dari `/logs`, bukan dari local history.

---

### 27.2 Multi Kandang

Struktur database masa depan:

```text
/SmartFungiAlert/cages/{cageId}/latest
/SmartFungiAlert/cages/{cageId}/logs
```

Contoh:

```text
/SmartFungiAlert/cages/kandang-01/latest
/SmartFungiAlert/cages/kandang-02/latest
```

---

### 27.3 Notifikasi Dashboard

Fitur tambahan:

1. Browser notification.
2. Alert sound.
3. Telegram status indicator.
4. Warning jika data tidak update lebih dari 1 menit.

---

## 28. Alur Sistem

```text
DHT22 membaca suhu dan kelembaban
↓
ESP32 menghitung titik embun, skor risiko, status, rekomendasi
↓
ESP32 mengirim data ke Firebase /SmartFungiAlert/latest
↓
Dashboard React mengambil data Firebase setiap 10 detik
↓
Dashboard menampilkan status, card sensor, rekomendasi, grafik, dan tabel
↓
Admin mengambil tindakan berdasarkan rekomendasi
```

---

## 29. Acceptance Criteria

Dashboard dianggap selesai jika:

1. Data dari Firebase tampil di dashboard.
2. Card suhu menampilkan `temperature_c`.
3. Card kelembaban menampilkan `humidity_pct`.
4. Card titik embun menampilkan `dew_point_c`.
5. Card skor risiko menampilkan `risk_score`.
6. Status utama mengikuti field `status` dari Firebase.
7. Rekomendasi mengikuti field `recommendation` dari Firebase.
8. Dashboard refresh otomatis setiap 10 detik.
9. Jika Firebase gagal dibaca, muncul pesan error.
10. Jika data kosong, muncul empty state.
11. Jika status `Risiko Sangat Tinggi`, card utama menampilkan visual merah dan pulse.
12. Jika `temp_dew_diff_c < 2`, muncul warning kondensasi.
13. Riwayat lokal bertambah saat data baru masuk.
14. Grafik membaca dari riwayat lokal.
15. Export CSV berfungsi.
16. Dark mode berfungsi dan tersimpan di localStorage.
17. Navigasi antar halaman tidak mereset state.
18. Halaman pengaturan menampilkan batasan sistem.
19. Dashboard responsif di mobile.
20. Tidak ada token asli yang di-hardcode di source code.

---

## 30. Verification Checklist

```bash
npm run dev
```

Checklist:

* [ ] App berjalan di `http://localhost:5173`
* [ ] Firebase URL terbaca dari `.env`
* [ ] Data `/SmartFungiAlert/latest` berhasil tampil
* [ ] Suhu tampil dengan satuan °C
* [ ] Kelembaban tampil dengan satuan %
* [ ] Titik embun tampil dengan satuan °C
* [ ] Skor risiko tampil 0–100
* [ ] Status badge sesuai status Firebase
* [ ] Rekomendasi tampil dari Firebase
* [ ] Warning kondensasi muncul jika `temp_dew_diff_c < 2`
* [ ] Auto refresh berjalan setiap 10 detik
* [ ] Error state muncul jika Firebase gagal
* [ ] History lokal bertambah
* [ ] Chart berubah setelah data baru masuk
* [ ] Export CSV berhasil
* [ ] Dark mode toggle berhasil
* [ ] Sidebar dan navbar responsif
* [ ] Disclaimer tampil di Dashboard dan Settings
* [ ] Tidak ada token asli di source code

---

## 31. Prioritas Pengerjaan

### Prioritas 1 — Wajib

1. Setup React + Vite + Tailwind.
2. Buat Firebase fetch hook.
3. Buat AppContext.
4. Buat Dashboard utama.
5. Tampilkan data dari `/SmartFungiAlert/latest`.

### Prioritas 2 — Penting

1. Tambahkan chart.
2. Tambahkan history lokal.
3. Tambahkan export CSV.
4. Tambahkan halaman History.
5. Tambahkan halaman Settings.

### Prioritas 3 — Tambahan

1. Analytics.
2. Browser notification.
3. Print report.
4. Histori permanen dari `/logs`.
5. Multi-kandang.

---

## 32. Catatan Keputusan

Keputusan penting pada PRD ini:

```text
Dashboard tidak lagi menggunakan mock data sebagai sumber utama.
Dashboard mengikuti database Firebase yang dikirim ESP32.
Path utama MVP adalah /SmartFungiAlert/latest.
History dan analytics pada MVP bersifat lokal kecuali ESP32 ditambah fitur /logs.
```
