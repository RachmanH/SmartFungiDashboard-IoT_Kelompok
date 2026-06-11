/**
 * Fallback recommendations based on status.
 * Only used if Firebase does not send `recommendation` field.
 */
export function getRecommendation(status) {
  switch (status) {
    case 'Kondisi Aman':
      return 'Kandang relatif kering. Lanjutkan monitoring rutin.';
    case 'Waspada Lembab':
      return 'Buka ventilasi kandang.\nPeriksa alas kandang dari kotoran atau kelembaban.\nCek wadah minum, pastikan tidak tumpah.\nTingkatkan frekuensi monitoring.';
    case 'Risiko Jamur Tinggi':
      return 'Buka ventilasi maksimal.\nNyalakan kipas kecil untuk sirkulasi udara.\nBuang dan ganti sisa pakan yang lembab.\nBersihkan dan keringkan alas kandang.\nPeriksa tangkringan kayu dan area sarang.\nBersihkan dan sterilkan wadah minum.\nJemur kandang jika memungkinkan.';
    case 'Risiko Sangat Tinggi':
      return 'Lakukan semua tindakan pencegahan segera.\nPertimbangkan memindahkan burung sementara.\nDisinfeksi menyeluruh kandang.\nHubungi dokter hewan jika burung menunjukkan gejala tidak normal.';
    default:
      return 'Tidak ada rekomendasi.';
  }
}
