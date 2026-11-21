export interface SourceAnalysisPoint {
  number: number;
  title: string;
  summary: string;
  detail: string;
  formula?: string;
}

export const SOURCE_DOCUMENT_META = {
  title: 'Soal OSK Fisika SMA 2026 – Soal Nomor 8',
  sourceFile: 'Soal_OSK_Fisika_SMA_2026_93d459b4.pdf (Halaman 3)',
  topic: 'Hukum Newton · Dinamika Sistem Katrol Majemuk (Double Atwood Machine)',
  originalText:
    'Pada gambar sistem katrol berikut ini diketahui m₁ = 2 kg, m₂ = 3 kg, dan m₃ = 6 kg. Asumsi kedua katrol licin tak bermassa, seluruh tali tak bermassa dan tak dapat mulur. Percepatan gravitasi sama dengan g. Jika a₁ adalah percepatan m₁ relatif terhadap katrol atas, maka a₁/g sama dengan ...',
  officialAnswer: '0,6',
  narrationScript:
    'Selamat datang di pelatihan khusus Soal Nomor 8 OSK Fisika SMA 2026 bersama Mister Jo. Pada soal sumber, kita memiliki dua buah katrol licin tak bermassa: satu katrol tetap di atas yang tergantung pada atap, dan satu katrol bergerak di bawah. Massa m satu sebesar dua kilogram menggantung di sisi kiri katrol atas. Sisi kanan tali atas menarik poros katrol bawah yang mengikat massa m dua sebesar tiga kilogram dan massa m tiga sebesar enam kilogram. Karena semua tali tak dapat mulur dan katrol tak bermassa, tegangan tali atas T satu sama dengan dua kali tegangan tali bawah T dua. Dengan menggabungkan Hukum Kedua Newton dan persamaan kendala tali, kita memperoleh percepatan m satu ke atas sebesar nol koma enam g.',
};

export const SOURCE_ANALYSIS_POINTS: SourceAnalysisPoint[] = [
  {
    number: 1,
    title: 'Pokok Bahasan Fisika',
    summary: 'Dinamika Partikel dan Hukum Newton pada Sistem Benda Terikat (Katrol Majemuk).',
    detail:
      'Soal ini merupakan bagian dari topik Hukum Newton (Halaman 3 naskah OSK Fisika SMA 2026) yang menguji kemampuan memodelkan gerak translasi benda-benda yang saling terhubung melalui dua tali berbeda dan dua katrol.',
  },
  {
    number: 2,
    title: 'Submateri & Konsep Fisika Utama',
    summary: 'Mesin Atwood Ganda, Kendala Kinematika Tali, dan Percepatan Relatif.',
    detail:
      'Siswa harus membedakan sistem katrol tetap atas (sebagai acuan inersia) dan katrol bergerak bawah (yang ikut berakselerasi), serta memahami cara kerja tegangan tali berantai pada katrol tak bermassa.',
  },
  {
    number: 3,
    title: 'Hukum, Prinsip & Persamaan Dasar',
    summary: 'Hukum II Newton, Kesetimbangan Katrol Tak Bermassa, dan Kekekalan Panjang Tali.',
    detail:
      'Setiap beban memenuhi hukum kedua Newton, katrol bawah memenuhi kesetimbangan gaya karena massanya nol, dan panjang kedua tali bersifat konstan terhadap waktu.',
    formula: '\\sum F_y = m a_y \\quad ; \\quad T_1 - 2T_2 = m_{\\text{katrol}} a_p = 0 \\implies T_1 = 2T_2',
  },
  {
    number: 4,
    title: 'Besaran Diketahui & Ditanyakan',
    summary: 'Diketahui m₁ = 2 kg, m₂ = 3 kg, m₃ = 6 kg, percepatan gravitasi g; Ditanyakan rasio a₁/g.',
    detail:
      'Karena yang ditanyakan adalah rasio tak berdimensi a₁/g, nilai numerik percepatan gravitasi g akan saling menghilangkan sehingga hasil akhir tepat bernilai 0,6 tanpa bergantung pada apakah g = 9,8 atau 10 m/s².',
  },
  {
    number: 5,
    title: 'Hubungan Matematis Antarbesaran',
    summary: 'Kopling percepatan melalui dua persamaan kendala geometris.',
    detail:
      'Jika posisi vertikal diukur ke bawah dari atap: y₁ + yₚ = L₁ (konstan) dan (y₂ − yₚ) + (y₃ − yₚ) = L₂ (konstan). Turunan keduanya menghasilkan hubungan percepatan yang mengikat keempat benda.',
    formula: 'a_p = -a_{1,\\text{turun}} = a_{1,\\text{naik}} \\quad \\text{dan} \\quad a_2 + a_3 = 2a_p',
  },
  {
    number: 6,
    title: 'Model & Idealisasi Fisika',
    summary: 'Katrol licin tak bermassa, tali tak bermassa dan tak dapat mulur, tanpa hambatan udara.',
    detail:
      'Idealisasi ini membuat tegangan sepanjang satu segmen tali seragam (T₁ di kiri = T₁ di kanan katrol atas; T₂ di kiri = T₂ di kanan katrol bawah) dan mengeliminasi torsi inersia rotasi katrol (akan dikembangkan pada Soal 8 & 15).',
  },
  {
    number: 7,
    title: 'Diagram & Stimulus Soal Asli',
    summary: 'Skema katrol tetap atas tergantung di langit-langit dengan vektor acuan g ke bawah.',
    detail:
      'Gambar soal menunjukkan batang penyangga tetap pada katrol atas, beban m₁ di kiri, katrol bergerak di kanan, serta beban m₂ (kiri) dan m₃ (kanan) pada tali kedua. Perhatikan perbedaan tinggi awal m₁, m₂, dan m₃ tidak memengaruhi percepatan.',
  },
  {
    number: 8,
    title: 'Tingkat Kesulitan & Karakteristik Penalaran',
    summary: 'Menengah-Tinggi (OSK) — Rentan kesalahan tanda arah dan penjumlahan massa yang keliru.',
    detail:
      'Kesalahan klasik siswa adalah menganggap katrol bawah bekerja seperti beban tetap m₂ + m₃ = 9 kg. Padahal karena m₂ ≠ m₃, beban bergerak relatif terhadap katrol sehingga massa efektifnya lebih kecil, yaitu 4m₂m₃/(m₂ + m₃) = 8 kg.',
  },
  {
    number: 9,
    title: 'Konsep Prasyarat',
    summary: 'Free Body Diagram (FBD), aljabar linear tiga variabel, dan konsep percepatan relatif.',
    detail:
      'Sebelum menaklukkan soal ini, siswa harus mahir menggambar vektor gaya berat dan tegangan tali untuk tiap benda secara terpisah serta menghitung percepatan relatif a_A/B = a_A − a_B.',
  },
  {
    number: 10,
    title: 'Konsep Pendukung Pengembangan Olimpiade',
    summary: 'Massa efektif katrol, kerangka non-inersia (lift), inersia rotasi katrol, dan metode energi.',
    detail:
      'Dari satu sistem ini, konsepnya berkembang menjadi analisis kerangka dipercepat (g_eff = g ± a_lift), katrol bermassa (I = ½MR²), percepatan pusat massa sistem, hingga sistem tiga tingkat katrol.',
  },
];
