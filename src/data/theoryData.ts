export type TheoryVisualType =
  | 'phenomenon'
  | 'quantities'
  | 'dimensions'
  | 'laws-fbd'
  | 'derivation'
  | 'symbols'
  | 'validity'
  | 'math-prereq'
  | 'real-life'
  | 'connection-q8'
  | 'olympiad-effective-mass'
  | 'misconceptions';

export interface TheorySection {
  id: number;
  title: string;
  subtitle: string;
  visualType: TheoryVisualType;
  keyFormula?: string;
  bodyParagraphs: string[];
  bulletPoints?: { label: string; text: string }[];
  calloutTitle: string;
  calloutText: string;
  narrationScript: string;
}

export const THEORY_SECTIONS: TheorySection[] = [
  {
    id: 1,
    title: '01. Pengenalan Fenomena Fisika',
    subtitle: 'Bagaimana Sistem Katrol Majemuk Bekerja Secara Alami',
    visualType: 'phenomenon',
    bodyParagraphs: [
      'Bayangkan sebuah sistem katrol bertingkat seperti pada Soal Nomor 8 OSK Fisika SMA 2026. Di langit-langit terpasang sebuah katrol tetap (katrol atas), dan di salah satu ujung talinya tergantung sebuah katrol kedua yang bebas naik-turun (katrol bergerak).',
      'Ketika sistem dilepas dari keadaan diam, terdapat dua interaksi gerak sekaligus: katrol bawah bersama kedua bebannya ($m_2$ dan $m_3$) beradu tarik melawan beban tunggal $m_1$, sementara pada saat yang sama $m_2$ dan $m_3$ saling bergerak relatif satu sama lain mengelilingi katrol bawah.',
    ],
    calloutTitle: 'Intuisi Fisis Utama',
    calloutText:
      'Karena beban $m_2$ dan $m_3$ ikut bergerak relatif terhadap katrol bawah, tali bawah tidak menahan beban penuh $(m_2 + m_3)g$. Akibatnya, tarikan katrol bawah ke tali atas lebih kecil daripada berat total $(m_2 + m_3)g$.',
    narrationScript:
      'Bagian satu: Pengenalan fenomena fisika. Pada sistem katrol majemuk soal nomor delapan, terdapat dua gerak yang terjadi secara bersamaan. Pertama, beban m satu dan katrol bawah saling tarik melalui tali atas. Kedua, beban m dua dan m tiga saling bergerak relatif melewati katrol bawah. Karena m dua dan m tiga saling bergerak saat katrol bawah ikut turun, tegangan tali bawah menjadi lebih kecil daripada berat gabungannya.',
  },
  {
    id: 2,
    title: '02. Definisi dan Makna Setiap Besaran Fisika',
    subtitle: 'Membedakan Massa, Gaya Berat, Tegangan Tali, dan Percepatan Relatif',
    visualType: 'quantities',
    bulletPoints: [
      {
        label: 'Massa ($m_1, m_2, m_3$)',
        text: 'Ukuran kelembaman (inersia) masing-masing balok dalam menolak perubahan gerak.',
      },
      {
        label: 'Gaya Berat ($W = m g$)',
        text: 'Gaya gravitasi Bumi yang menarik tiap benda selalu vertikal ke bawah.',
      },
      {
        label: 'Tegangan Tali ($T_1, T_2$)',
        text: 'Gaya tarik internal pada tali tegang. Tali hanya bisa menarik, tidak pernah mendorong.',
      },
      {
        label: 'Percepatan Mutlak ($a_1, a_2, a_3, a_p$)',
        text: 'Laju perubahan kecepatan benda terhadap kerangka diam (atap atau katrol atas).',
      },
      {
        label: 'Percepatan Relatif ($a_{\\text{rel}}$)',
        text: 'Percepatan suatu beban yang diamati dari kerangka acuan benda/katrol lain yang ikut bergerak: $\\vec{a}_{A/B} = \\vec{a}_A - \\vec{a}_B$.',
      },
    ],
    bodyParagraphs: [
      'Pada Soal No. 8, ketelitian membaca kalimat "percepatan $m_1$ relatif terhadap katrol atas" sangat menentukan. Karena katrol atas terikat tetap ke atap, percepatan relatifnya sama dengan percepatan $m_1$ di kerangka laboratorium. Namun apabila katrol atas juga bergerak (seperti di Soal 13), definisi $\\vec{a}_{1/P_1} = \\vec{a}_1 - \\vec{a}_{P_1}$ menjadi krusial.',
    ],
    calloutTitle: 'Prinsip Arah Tegangan Tali',
    calloutText:
      'Pada titik sambungan mana pun, arah vektor gaya tegangan tali $T$ selalu menjauhi benda di sepanjang sumbu tali.',
    narrationScript:
      'Bagian dua: Definisi besaran fisika. Massa adalah ukuran kelembaman benda. Gaya berat selalu berarah ke pusat bumi atau vertikal ke bawah. Tegangan tali adalah gaya tarik di sepanjang tali yang selalu menarik menjauhi benda. Sedangkan percepatan relatif benda A terhadap benda B didefinisikan sebagai vektor percepatan A dikurangi vektor percepatan B.',
  },
  {
    id: 3,
    title: '03. Satuan SI dan Analisis Dimensi',
    subtitle: 'Memeriksa Konsistensi Persamaan Olimpiade dengan Dimensi',
    visualType: 'dimensions',
    keyFormula: '[a] = \\mathsf{L T^{-2}} \\quad ; \\quad [T] = \\mathsf{M L T^{-2}} \\quad ; \\quad \\left[\\frac{a_1}{g}\\right] = \\mathsf{1 \\text{ (tak berdimensi)}}',
    bodyParagraphs: [
      'Dalam soal Olimpiade, pengecekan dimensi adalah senjata cepat untuk memvalidasi rumus penurunan sebelum memasukkan angka. Semua besaran pada sistem katrol majemuk dinyatakan dalam Sistem Internasional (SI): massa dalam $\\text{kg}$, panjang dalam $\\text{m}$, waktu dalam $\\text{s}$, percepatan dalam $\\text{m/s}^2$, dan gaya/tegangan dalam Newton ($\\text{N} = \\text{kg}\\cdot\\text{m/s}^2$).',
    ],
    bulletPoints: [
      {
        label: 'Cek Dimensi Tegangan Tali',
        text: 'Pada rumus $T_2 = \\frac{4g}{\\frac{4}{m_1}+\\frac{1}{m_2}+\\frac{1}{m_3}}$, pembilang berdimensi $[g] = \\mathsf{L T^{-2}}$, penyebut berdimensi $\\mathsf{M^{-1}}$, sehingga hasil baginya berdimensi $\\mathsf{M L T^{-2}}$ (Newton). Konsisten!',
      },
      {
        label: 'Cek Dimensi Rasio $a_1/g$',
        text: 'Rasio $a_1/g$ merupakan perbandingan dua percepatan sehingga tidak memiliki satuan (tak berdimensi).',
      },
    ],
    calloutTitle: 'Aturan Emas Pembulatan & Penulisan',
    calloutText:
      'Pertahankan nilai eksak atau pecahan hingga langkah akhir. Pembulatan ke satu angka di belakang koma (contoh: 0,6 atau 5,5) baru dilakukan paling akhir.',
    narrationScript:
      'Bagian tiga: Satuan SI dan dimensi. Massa memakai kilogram, percepatan memakai meter per sekon kuadrat, dan tegangan tali memakai Newton. Pada soal nomor delapan, yang ditanyakan adalah rasio a satu dibagi g, yang bersifat tak berdimensi. Selalu periksa dimensi rumus Anda sebelum menghitung angka akhir.',
  },
  {
    id: 4,
    title: '04. Konsep Dasar & Hukum Fisika yang Berlaku',
    subtitle: 'Tiga Pilar Hukum untuk Memecahkan Sistem Katrol Majemuk',
    visualType: 'laws-fbd',
    keyFormula: '\\sum \\vec{F} = m \\vec{a} \\qquad \\text{dan} \\qquad T_1 = 2T_2',
    bodyParagraphs: [
      'Seluruh analisis Soal Nomor 8 berdiri di atas tiga hukum/prinsip utama yang saling mengunci jumlah variabel yang tidak diketahui ($a_1, a_2, a_3, a_p, T_1, T_2$):',
    ],
    bulletPoints: [
      {
        label: '1. Hukum II Newton pada Tiga Beban',
        text: 'Menghasilkan 3 persamaan dinamika untuk $m_1$, $m_2$, dan $m_3$ dalam satu arah koordinat yang konsisten (misalnya sumbu-$y$ positif ke bawah).',
      },
      {
        label: '2. Hukum II Newton pada Katrol Bawah ($m_p = 0$)',
        text: 'Karena katrol bawah tak bermassa, gaya total padanya harus nol meskipun ia bergerak dipercepat: $T_1 - 2T_2 = 0 \\cdot a_p = 0 \\implies T_1 = 2T_2$.',
      },
      {
        label: '3. Persamaan Kendala Panjang Tali Tak Mulur',
        text: 'Panjang tali atas $L_1$ dan panjang tali bawah $L_2$ bernilai konstan, menghasilkan 2 persamaan kinematika yang mengikat percepatan seluruh benda.',
      },
    ],
    calloutTitle: 'Mengapa $T_1$ Tetap Sama dengan $2T_2$ Saat Bergerak?',
    calloutText:
      'Banyak siswa mengira $T_1 = 2T_2$ hanya berlaku saat sistem diam. Salah! Selama massa katrol $m_p = 0$, hasil kali $m_p a_p$ selalu nol untuk percepatan $a_p$ berapa pun.',
    narrationScript:
      'Bagian empat: Hukum fisika yang berlaku. Ada tiga pilar utama. Pertama, Hukum Kedua Newton untuk masing-masing beban m satu, m dua, dan m tiga. Kedua, kesetimbangan gaya pada katrol bawah yang tak bermassa sehingga T satu selalu sama dengan dua kali T dua meskipun katrol sedang bergerak. Ketiga, kekekalan panjang tali tak dapat mulur yang menghasilkan persamaan kendala percepatan.',
  },
  {
    id: 5,
    title: '05. Penurunan Persamaan Matematis Lengkap',
    subtitle: 'Derivasi Eksak Sistem Soal No. 8 dari Prinsip Pertama',
    visualType: 'derivation',
    keyFormula:
      'T_2 = \\frac{4g}{\\frac{4}{m_1} + \\frac{1}{m_2} + \\frac{1}{m_3}} \\qquad \\text{dan} \\qquad a_{1,\\text{naik}} = \\frac{T_1 - m_1 g}{m_1} = \\frac{2T_2}{m_1} - g',
    bodyParagraphs: [
      'Mari kita tetapkan koordinat $y$ berarah **ke bawah** diukur dari poros katrol tetap atas ($y = 0$). Posisi beban adalah $y_1, y_2, y_3$ dan posisi katrol bawah adalah $y_p$.',
      'Langkah 1 (Kendala Tali): Panjang tali atas $L_1 = y_1 + y_p + \\pi R_1 \\implies \\ddot{y}_1 + \\ddot{y}_p = 0 \\implies a_p = -a_1$. Panjang tali bawah $L_2 = (y_2 - y_p) + (y_3 - y_p) + \\pi R_2 \\implies \\ddot{y}_2 + \\ddot{y}_3 = 2\\ddot{y}_p = -2a_1$.',
      'Langkah 2 (Hukum II Newton ke bawah): $a_1 = g - \\frac{T_1}{m_1} = g - \\frac{2T_2}{m_1}$, $a_2 = g - \\frac{T_2}{m_2}$, dan $a_3 = g - \\frac{T_2}{m_3}$.',
      'Langkah 3 (Substitusi ke Kendala): $\\left(g - \\frac{T_2}{m_2}\\right) + \\left(g - \\frac{T_2}{m_3}\\right) = -2\\left(g - \\frac{2T_2}{m_1}\\right)$. Mengelompokkan suku $g$ di kiri dan $T_2$ di kanan menghasilkan $4g = T_2 \\left(\\frac{4}{m_1} + \\frac{1}{m_2} + \\frac{1}{m_3}\\right)$.',
    ],
    calloutTitle: 'Bentuk Simetris yang Mudah Diingat',
    calloutText:
      'Perhatikan keindahannya: faktor $\\frac{4}{m_1}$ muncul karena $T_1 = 2T_2$ dan pengaruh tali atas dikalikan 2 pada kendala tali bawah ($2 \\times 2 = 4$).',
    narrationScript:
      'Bagian lima: Penurunan matematis lengkap. Dengan menetapkan sumbu Y positif ke bawah dari katrol atas, turunan kedua panjang tali atas menghasilkan percepatan katrol bawah sama dengan negatif percepatan m satu. Turunan kedua panjang tali bawah menghasilkan a dua ditambah a tiga sama dengan dua a katrol. Ketika Hukum Kedua Newton disubstitusikan ke kendala tersebut, diperoleh empat g sama dengan T dua dikalikan kurung buka empat per m satu ditambah satu per m dua ditambah satu per m tiga kurung tutup.',
  },
  {
    id: 6,
    title: '06. Penjelasan Arti Setiap Simbol dalam Persamaan',
    subtitle: 'Membaca Fisika di Balik Variabel Matematis',
    visualType: 'symbols',
    bulletPoints: [
      {
        label: '$y_1, y_2, y_3, y_p$',
        text: 'Koordinat posisi vertikal masing-masing balok dan katrol bergerak diukur ke bawah dari atap tetap.',
      },
      {
        label: '$a_1 = \\ddot{y}_1$',
        text: 'Percepatan $m_1$ ke bawah. Bila hasilnya negatif (seperti $-0{,}6g$ pada Soal No. 8), berarti $m_1$ bergerak dipercepat ke ATAS sebesar $0{,}6g$.',
      },
      {
        label: '$T_1$ dan $T_2$',
        text: 'Gaya tegangan tali pada tali atas ($T_1$) dan tali bawah ($T_2$). Selalu bernilai positif karena tali dalam kondisi tegang.',
      },
      {
        label: '$g$',
        text: 'Besar percepatan gravitasi lokal ($9{,}8\\text{ m/s}^2$ atau $10\\text{ m/s}^2$, sesuai data soal).',
      },
      {
        label: '$m_{\\text{eff}}$',
        text: 'Massa efektif gabungan katrol bawah beserta $m_2$ dan $m_3$ jika dilihat dari tali atas.',
      },
    ],
    bodyParagraphs: [
      'Menjaga konsistensi tanda positif/negatif sejak awal adalah kunci agar kita tidak perlu menebak ke mana $m_1$ bergerak sebelum menghitung. Biarkan tanda aljabar yang memberi tahu arah gerak sebenarnya!',
    ],
    calloutTitle: 'Tips Anti-Salah Tanda',
    calloutText:
      'Jika Anda menggunakan satu arah sumbu yang seragam (misal semua ke bawah positif), hasil negatif pada $a_1$ secara otomatis menandakan $m_1$ naik.',
    narrationScript:
      'Bagian enam: Arti setiap simbol. Koordinat y satu, y dua, y tiga, dan y p adalah posisi vertikal ke bawah dari katrol tetap. Jika nilai percepatan ke bawah a satu keluar bertanda negatif, artinya secara fisis massa m satu sedang bergerak dipercepat ke atas.',
  },
  {
    id: 7,
    title: '07. Syarat Berlakunya Persamaan',
    subtitle: 'Kapan Rumus Sistem Soal No. 8 Sah Digunakan & Kapan Harus Dimodifikasi',
    visualType: 'validity',
    bulletPoints: [
      {
        label: 'Katrol Tak Bermassa & Licin ($M_k = 0$)',
        text: 'Jika katrol bermassa $M_k > 0$ dan berputar tanpa slip, tegangan tali di kiri dan kanan katrol TIDAK lagi sama ($T_{\\text{kanan}} - T_{\\text{kiri}} = \\frac{1}{2}M_k a$). Ini diuji di Soal 8 & 15!',
      },
      {
        label: 'Tali Tak Mulur & Tetap Tegang ($T > 0$)',
        text: 'Jika salah satu tali putus atau kendur (misal saat benda menyentuh lantai), tegangan tali jatuh ke nol dan kendala kinematika berhenti berlaku.',
      },
      {
        label: 'Katrol Atas Diam Relatif Terhadap Acuan Inersia',
        text: 'Jika katrol atas berada di dalam lift dipercepat (Soal 7) atau ditarik gaya luar (Soal 13), kita wajib memasukkan percepatan kerangka atau kendala katrol atas.',
      },
    ],
    bodyParagraphs: [
      'Soal Olimpiade tingkat lanjut hampir selalu menguji pemahaman batas berlakunya rumus melalui modifikasi satu asumsi saja—misalnya mengganti katrol tak bermassa menjadi katrol bermassa atau memindahkan sistem ke dalam lift.',
    ],
    calloutTitle: 'Aturan Olimpiade',
    calloutText:
      'Jangan pernah menghafal rumus jadi tanpa memeriksa asumsi di balik rumus tersebut!',
    narrationScript:
      'Bagian tujuh: Syarat berlakunya persamaan. Rumus T satu sama dengan dua T dua hanya berlaku apabila katrol bawah tidak bermassa dan licin sempurna. Selain itu, semua tali harus tetap tegang dan katrol atas harus diam di kerangka inersia. Jika syarat ini berubah, misalnya katrol memiliki massa atau sistem berada di dalam lift, persamaan wajib diturunkan ulang.',
  },
  {
    id: 8,
    title: '08. Konsep Prasyarat Matematika',
    subtitle: 'Aljabar Pecahan, Diferensiasi Kinematika, dan Angka Penting',
    visualType: 'math-prereq',
    keyFormula: 'L = y_1 + y_p + \\text{konst} \\xrightarrow{\\frac{d^2}{dt^2}} \\ddot{y}_1 + \\ddot{y}_p = 0',
    bodyParagraphs: [
      'Meskipun sistem ini dapat diselesaikan murni dengan aljabar, pemahaman turunan kedua ($\\ddot{y} = \\frac{d^2 y}{dt^2}$) membuat penyusunan persamaan kendala menjadi sangat cepat dan bebas kesalahan bahkan untuk 3 atau 4 katrol sekaligus.',
    ],
    bulletPoints: [
      {
        label: 'Penjumlahan Pecahan Kebalikan',
        text: 'Seperti resistor paralel: $\\frac{4}{2} + \\frac{1}{3} + \\frac{1}{6} = 2 + \\frac{1}{2} = \\frac{5}{2}$.',
      },
      {
        label: 'Sistem Persamaan Linear',
        text: 'Mengeliminasi variabel tegangan tali $T_1, T_2$ untuk menemukan percepatan.',
      },
      {
        label: 'Pembulatan Satu Angka Desimal',
        text: 'Mengikuti aturan pembulatan standar (angka $< 5$ dibulatkan ke bawah, $\\ge 5$ dibulatkan ke atas) setelah perhitungan penuh selesai.',
      },
    ],
    calloutTitle: 'Trik Hitung Cepat Pecahan',
    calloutText:
      'Pada penyebut $\\frac{4}{m_1} + \\frac{1}{m_2} + \\frac{1}{m_3}$, samakan penyebut secara bertahap agar tidak keliru saat waktu ujian OSK terbatas.',
    narrationScript:
      'Bagian delapan: Prasyarat matematika. Anda memerlukan kelancaran turunan kedua terhadap waktu untuk mendapatkan hubungan percepatan dari panjang tali konstan, penjumlahan pecahan, serta ketelitian menjaga angka desimal hingga proses pembulatan paling akhir.',
  },
  {
    id: 9,
    title: '09. Penerapan Konsep dalam Kehidupan Nyata',
    subtitle: 'Dari Derek Konstruksi Hingga Mekanisme Pengimbang Lift Modern',
    visualType: 'real-life',
    bodyParagraphs: [
      'Konsep katrol majemuk (kombinasi katrol tetap dan katrol bergerak) bukan sekadar teka-teki abstrak. Dalam rekayasa teknik mesin, prinsip keuntungan mekanis ($T_1 = 2T_2$) digunakan pada sistem takel crane pelabuhan, lift gedung bertingkat dengan counterweight (pengimbang), hingga alat gym kabel (cable pulley machine).',
      'Perbedaannya dengan kasus statis biasa adalah pada mesin dinamis yang bergerak cepat, perancang wajib menghitung percepatan dinamis beban agar kabel tidak mengalami lonjakan tegangan melebihi batas putusnya (seperti yang akan Anda hitung pada Soal 11).',
    ],
    calloutTitle: 'Keuntungan Mekanis Dinamis',
    calloutText:
      'Katrol bergerak menggandakan gaya angkat pada tali bawah ($T_1 = 2T_2$), tetapi mengorbankan jarak perpindahan: tali atas harus ditarik $2\\times$ lebih pendek daripada jumlah perpindahan kedua sisi tali bawah.',
    narrationScript:
      'Bagian sembilan: Penerapan nyata. Sistem katrol gabungan tetap dan bergerak banyak dipakai pada derek pengangkat beban berat, mekanisme counterweight lift gedung tinggi, dan sistem katrol di kapal layar. Insinyur menggunakan analisis dinamika tegangan tali untuk memastikan kabel tidak putus saat beban berakselerasi.',
  },
  {
    id: 10,
    title: '10. Hubungan Konsep Dasar dengan Soal Nomor 8',
    subtitle: 'Menyelesaikan Soal Asli OSK Fisika SMA 2026 Langkah demi Langkah',
    visualType: 'connection-q8',
    keyFormula:
      '\\frac{4}{2} + \\frac{1}{3} + \\frac{1}{6} = \\frac{5}{2} \\implies T_2 = \\frac{4g}{5/2} = 1{,}6g \\implies T_1 = 3{,}2g \\implies a_1 = \\frac{3{,}2g - 2g}{2} = 0{,}6g',
    bodyParagraphs: [
      'Mari kita terapkan langsung seluruh pondasi di atas pada angka Soal Nomor 8: $m_1 = 2\\text{ kg}$, $m_2 = 3\\text{ kg}$, dan $m_3 = 6\\text{ kg}$.',
      'Kita peroleh $T_2 = 1{,}6g$ Newton dan $T_1 = 3{,}2g$ Newton. Karena $T_1 = 3{,}2g$ lebih besar daripada berat $m_1 g = 2g$, maka $m_1$ ditarik naik ke atas dengan percepatan $a_1 = \\frac{3{,}2g - 2g}{2} = 0{,}6g$. Jadi nilai $a_1/g = 0{,}6$.',
    ],
    calloutTitle: 'Verifikasi Silang Semua Benda',
    calloutText:
      'Periksa percepatan ke bawah $m_2$ dan $m_3$: $a_2 = g - \\frac{1{,}6g}{3} = \\frac{7}{15}g$ dan $a_3 = g - \\frac{1{,}6g}{6} = \\frac{11}{15}g$. Jumlahnya $a_2 + a_3 = \\frac{18}{15}g = 1{,}2g = 2(0{,}6g) = 2a_p$. Terbukti 100% konsisten!',
    narrationScript:
      'Bagian sepuluh: Hubungan langsung dengan Soal Nomor delapan. Dengan memasukkan m satu sama dengan dua kilogram, m dua tiga kilogram, dan m tiga enam kilogram, diperoleh T dua sama dengan satu koma enam g, sehingga T satu sama dengan tiga koma dua g. Karena tarikan tali tiga koma dua g lebih besar dari berat dua g, maka m satu bergerak ke atas dengan percepatan nol koma enam g. Maka nilai a satu dibagi g sama dengan nol koma enam.',
  },
  {
    id: 11,
    title: '11. Pengembangan Konsep Menuju Tingkat Olimpiade',
    subtitle: 'Trik Massa Efektif Katrol (Effective Mass Method)',
    visualType: 'olympiad-effective-mass',
    keyFormula:
      'm_{\\text{eff}} = \\frac{4 m_2 m_3}{m_2 + m_3} \\qquad \\Longrightarrow \\qquad a_1 = \\frac{m_{\\text{eff}} - m_1}{m_{\\text{eff}} + m_1} g',
    bodyParagraphs: [
      'Dalam persaingan Olimpiade Fisika, waktu sangat berharga. Bagaimana cara menyelesaikan sistem katrol bertingkat dua, tiga, bahkan empat tingkat dalam hitungan detik? Gunakan konsep **Massa Efektif Katrol**!',
      'Bayangkan seluruh katrol bergerak bawah beserta $m_2$ dan $m_3$ diganti menjadi satu balok tunggal bermassa $m_{\\text{eff}}$ yang tergantung pada tali atas. Dalam kerangka katrol bawah yang turun dengan percepatan $a_p$, gravitasi efektifnya adalah $g_{\\text{rel}} = g - a_p$. Tegangan tali bawah memenuhi $T_2 = \\frac{2m_2 m_3}{m_2 + m_3}(g - a_p)$, sehingga $T_1 = 2T_2 = \\left(\\frac{4m_2 m_3}{m_2 + m_3}\\right)(g - a_p) = m_{\\text{eff}}(g - a_p)$.',
      'Untuk Soal No. 8: $m_{\\text{eff}} = \\frac{4 \\times 3 \\times 6}{3 + 6} = \\frac{72}{9} = 8\\text{ kg}$! Sistem tinggal dianggap seperti mesin Atwood tunggal antara $m_1 = 2\\text{ kg}$ dan $m_{\\text{eff}} = 8\\text{ kg}$: $a_1 = \\frac{8 - 2}{8 + 2} g = 0{,}6g$ dalam dua baris perhitungan!',
    ],
    calloutTitle: 'Kekuatan Rekursif',
    calloutText:
      'Metode massa efektif ini bahkan dapat dipakai berulang (rekursif) untuk sistem katrol 3 tingkat seperti pada Soal Latihan Nomor 12!',
    narrationScript:
      'Bagian sebelas: Pengembangan menuju tingkat Olimpiade dengan metode massa efektif. Seluruh subsistem katrol bawah beserta m dua dan m tiga dapat digantikan oleh satu massa efektif sebesar empat m dua m tiga dibagi m dua tambah m tiga. Untuk soal nomor delapan, massa efektifnya adalah empat kali tiga kali enam dibagi sembilan, yaitu delapan kilogram. Kini sistem menjadi mesin Atwood sederhana antara dua kilogram dan delapan kilogram, menghasilkan delapan kurang dua dibagi delapan tambah dua sama dengan nol koma enam g secara instan.',
  },
  {
    id: 12,
    title: '12. Kesalahan Umum dan Miskonsepsi Siswa',
    subtitle: '5 Jebakan Mematikan yang Harus Dihindari di Ruang Ujian OSK',
    visualType: 'misconceptions',
    bulletPoints: [
      {
        label: 'Miskonsepsi 1: Menganggap $m_{\\text{eff}} = m_2 + m_3$',
        text: 'Salah! Pada Soal No. 8, $m_2 + m_3 = 9\\text{ kg}$, padahal massa efektifnya hanya $8\\text{ kg}$. Penjumlahan $m_2 + m_3$ hanya benar bila $m_2 = m_3$ atau katrol bawah dikunci.',
      },
      {
        label: 'Miskonsepsi 2: Menganggap $T_1 = m_1 g$',
        text: 'Salah! Selama $m_1$ mengalami percepatan ke atas ($a_1 > 0$), tegangan tali $T_1 = m_1(g + a_1)$ PASTI lebih besar dari berat $m_1 g$.',
      },
      {
        label: 'Miskonsepsi 3: Menganggap $a_2 = a_3 = a_p$',
        text: 'Salah! $m_2$ dan $m_3$ bergerak relatif terhadap katrol bawah dengan arah berlawanan. Yang benar adalah rata-rata percepatan keduanya sama dengan percepatan katrol bawah: $a_p = \\frac{a_2 + a_3}{2}$.',
      },
      {
        label: 'Miskonsepsi 4: Mengira memperbesar $m_1$ memperkecil tegangan tali bawah $T_2$',
        text: 'Salah! Memperbesar $m_1$ justru menahan katrol bawah agar tidak jatuh bebas, sehingga gravitasi efektif di katrol bawah membesar dan $T_2$ ikut naik (lihat Soal 11).',
      },
      {
        label: 'Miskonsepsi 5: Lupa memeriksa apakah katrol atas tetap atau bergerak',
        text: 'Selalu baca teliti kata "relatif terhadap katrol atas" dan periksa apakah katrol atas terikat pada penyangga tetap atau bebas bergerak (Soal 13).',
      },
    ],
    bodyParagraphs: [
      'Mengenali jebakan konseptual di atas jauh lebih berharga daripada menghafal sepuluh rumus. Jika Anda sudah memahami lima poin ini, Anda siap menaklukkan seluruh 15 soal latihan.',
    ],
    calloutTitle: 'Siap Masuk ke Arena Latihan',
    calloutText:
      'Beralihlah ke menu 15 Soal Latihan untuk menguji ketajaman analisis Anda dari level fundamental hingga tantangan OSK kompleks.',
    narrationScript:
      'Bagian dua belas: Kesalahan umum dan miskonsepsi siswa. Pertama, jangan menjumlahkan m dua dan m tiga langsung menjadi sembilan kilogram karena ketika keduanya bergerak relatif, massa efektifnya lebih kecil yaitu delapan kilogram. Kedua, jangan menyamakan T satu dengan berat m satu g saat benda sedang dipercepat. Ketiga, ingat bahwa percepatan katrol bawah adalah rata-rata dari percepatan m dua dan m tiga, bukan sama dengan keduanya. Sekarang Anda siap mengerjakan lima belas soal latihan!',
  },
];
