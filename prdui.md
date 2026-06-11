Ubah tema UI aplikasi Smart Fungi Alert Dashboard menjadi gaya **modern neobrutalism** yang tetap profesional dan mudah dibaca untuk dashboard monitoring kandang.

Konteks aplikasi:

* Aplikasi React + Vite + Tailwind CSS.
* Domain: dashboard admin monitoring suhu dan kelembaban kandang burung murai.
* Data berasal dari Firebase Realtime Database.
* Status risiko: Kondisi Aman, Waspada Lembab, Risiko Jamur Tinggi, Risiko Sangat Tinggi.
* Dashboard harus tetap informatif, bukan sekadar dekoratif.

Arahan desain utama:

1. Gunakan gaya neobrutalism dengan:

   * Border hitam tebal 2–4px.
   * Shadow keras/off-set, misalnya `shadow-[6px_6px_0px_#000]`.
   * Card berbentuk kotak dengan radius kecil atau medium.
   * Warna solid dan kontras tinggi.
   * Typography tegas, bold, dan mudah dibaca.
   * Hindari gradient halus dan glassmorphism.
   * Hindari tampilan terlalu soft atau corporate minimalism.

2. Palet warna:

   * Background utama: warna terang seperti `#fef3c7`, `#fff7ed`, atau `#f8fafc`.
   * Text utama: hitam pekat atau slate gelap.
   * Card: putih atau warna pastel solid.
   * Accent utama: kuning, hijau, oranye, merah, biru.
   * Tetap gunakan warna status:

     * Kondisi Aman: hijau solid.
     * Waspada Lembab: kuning solid.
     * Risiko Jamur Tinggi: oranye solid.
     * Risiko Sangat Tinggi: merah solid.

3. Komponen yang harus diubah:

   * Navbar
   * Sidebar
   * HeroStatusCard
   * MonitoringCard
   * RecommendationBox
   * SensorChart
   * HistoryTable
   * StatusBadge
   * ConnectionBadge
   * Dashboard, History, Analytics, dan Settings page

4. HeroStatusCard:

   * Jadikan card paling dominan.
   * Gunakan border hitam tebal.
   * Gunakan shadow offset besar.
   * Warna background mengikuti status risiko.
   * Jika status `Risiko Sangat Tinggi`, gunakan border merah/hitam dan animasi pulse yang tetap tidak berlebihan.
   * Pastikan teks status, skor risiko, suhu, kelembaban, dan rekomendasi tetap sangat jelas.

5. MonitoringCard:

   * Gunakan layout kotak neobrutalist.
   * Border hitam tebal.
   * Shadow offset.
   * Icon besar dari Lucide React.
   * Value sensor dibuat besar dan bold.
   * Satuan seperti °C dan % tetap kecil tapi jelas.

6. Table dan chart:

   * Tabel menggunakan border hitam.
   * Header tabel memakai background solid kontras.
   * Row hover boleh menggunakan warna pastel.
   * Chart tetap bersih dan mudah dibaca.
   * Jangan sampai chart kehilangan keterbacaan karena terlalu banyak dekorasi.

7. Dark mode:

   * Tetap mendukung dark mode.
   * Background dark boleh menggunakan slate/neutral gelap.
   * Card tetap punya border kontras.
   * Shadow di dark mode bisa diganti warna gelap/putih transparan agar tetap terlihat.
   * Warna status harus tetap mudah dibedakan.

8. UX constraints:

   * Jangan mengubah logic Firebase.
   * Jangan mengubah struktur data.
   * Jangan mengubah routing.
   * Jangan menghapus fitur existing.
   * Fokus hanya pada styling, layout refinement, dan visual theme.
   * Pastikan responsive di mobile, tablet, dan desktop.
   * Pastikan dashboard tetap cocok untuk monitoring, bukan menjadi terlalu playful.

9. Tailwind style examples:

   * Card: `border-4 border-black rounded-xl shadow-[6px_6px_0px_#000]`
   * Button: `border-2 border-black bg-yellow-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none`
   * Badge: `border-2 border-black rounded-full px-3 py-1 font-black`
   * Section title: `text-2xl font-black tracking-tight`
   * Layout background: `bg-amber-100 dark:bg-neutral-950`

Hasil akhir yang diinginkan:
Dashboard terlihat seperti **clean neobrutalist admin panel**: tegas, kontras, playful secukupnya, tetapi tetap serius untuk monitoring risiko lingkungan kandang. Jangan membuat desain terlalu ramai, terlalu kartun, atau mengorbankan keterbacaan data sensor.
