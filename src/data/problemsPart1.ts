import { PhysicsProblem } from './problemsTypes';

export const PROBLEMS_PART_1: PhysicsProblem[] = [
  {
    id: 1,
    code: 'Soal 1',
    title: 'Mesin Atwood Dasar (Katrol Tunggal Tetap)',
    tier: 'Fundamental & Penguatan Konsep',
    tierRange: 'Soal 1–3',
    conceptTested: 'Hukum II Newton pada sistem dua beban terhubung katrol tetap licin tak bermassa',
    recommendedTheoryId: 4,
    stimulusSummary:
      'Dua balok bermassa berbeda dihubungkan seutas tali ringan tak dapat mulur melalui sebuah katrol tetap licin tak bermassa di langit-langit.',
    stimulusTable: {
      caption: 'Parameter Eksperimen Katrol Tunggal',
      headers: ['Besaran', 'Simbol', 'Nilai'],
      rows: [
        ['Massa balok kiri', 'm_A', '3,0 kg'],
        ['Massa balok kanan', 'm_B', '5,0 kg'],
        ['Percepatan gravitasi', 'g', '10 m/s²'],
      ],
    },
    questionPrompt:
      'Dua balok $m_A = 3{,}0\\text{ kg}$ dan $m_B = 5{,}0\\text{ kg}$ dihubungkan oleh seutas tali ringan tak dapat mulur melalui sebuah katrol tetap yang licin dan tak bermassa. Diketahui percepatan gravitasi $g = 10\\text{ m/s}^2$. Tentukan besar percepatan sistem sesaat setelah dilepaskan dari keadaan diam (dalam satuan $\\text{m/s}^2$).',
    unit: 'm/s²',
    expectedAnswer: 2.5,
    expectedFormatted: '2,5',
    animation: {
      type: 'single',
      m1: 3.0,
      m2: 5.0,
      m3: 0,
      g: 10,
      a1Display: 2.5,
      a2Display: 2.5,
      a3Display: 0,
      aPulleyBottomDown: 0,
      t1Value: 37.5,
      t2Value: 37.5,
      equationsTimeline: [
        {
          phaseLabel: 'Tahap 1 · Kendala Tali',
          tex: 'y_A + y_B = L_1 \\implies a_A = a_B = a',
          caption: 'Karena tali tak mulur, besar percepatan kedua benda identik.',
        },
        {
          phaseLabel: 'Tahap 2 · Dinamika Newton',
          tex: 'T - m_A g = m_A a \\quad ; \\quad m_B g - T = m_B a',
          caption: 'Balok B lebih berat sehingga menarik sistem searah gerak jarum jam.',
        },
        {
          phaseLabel: 'Tahap 3 · Hasil Percepatan',
          tex: 'a = \\frac{m_B - m_A}{m_A + m_B}g = \\frac{5 - 3}{5 + 3}(10) = 2{,}5\\text{ m/s}^2',
          caption: 'Percepatan konstan sebesar 2,5 m/s² (A naik, B turun).',
        },
      ],
    },
    fbdObjects: [
      {
        id: 'mA',
        name: 'Balok A (3,0 kg)',
        massLabel: 'm_A = 3,0 kg',
        axesLabel: '+y ke atas (searah gerak)',
        vectors: [
          {
            id: 'TA',
            label: 'T',
            directionDeg: 90,
            magnitudeRel: 1.0,
            color: '#db2777',
            formulaLabel: 'T = 37,5 N',
            explanation: 'Tegangan tali menarik balok A vertikal ke atas.',
          },
          {
            id: 'WA',
            label: 'm_A g',
            directionDeg: 270,
            magnitudeRel: 0.78,
            color: '#0f172a',
            formulaLabel: 'W_A = 30,0 N',
            explanation: 'Gaya berat menarik balok A vertikal ke bawah.',
          },
        ],
        mathRelation: 'T - m_A g = m_A a',
      },
      {
        id: 'mB',
        name: 'Balok B (5,0 kg)',
        massLabel: 'm_B = 5,0 kg',
        axesLabel: '+y ke bawah (searah gerak)',
        vectors: [
          {
            id: 'TB',
            label: 'T',
            directionDeg: 90,
            magnitudeRel: 0.75,
            color: '#db2777',
            formulaLabel: 'T = 37,5 N',
            explanation: 'Tegangan tali menahan balok B vertikal ke atas.',
          },
          {
            id: 'WB',
            label: 'm_B g',
            directionDeg: 270,
            magnitudeRel: 1.1,
            color: '#0f172a',
            formulaLabel: 'W_B = 50,0 N',
            explanation: 'Gaya berat menarik balok B vertikal ke bawah lebih kuat dari T.',
          },
        ],
        mathRelation: 'm_B g - T = m_B a',
      },
    ],
    pembahasan: {
      memahamiPersoalan:
        'Soal ini membangun fondasi bagian atas dari sistem Soal Nomor 8, yaitu mesin Atwood tunggal. Karena balok B lebih berat daripada balok A, balok B akan turun dipercepat dan balok A naik dengan besar percepatan yang sama.',
      identifikasiInformasi: {
        diketahui: [
          'Massa balok kiri $m_A = 3{,}0\\text{ kg}$',
          'Massa balok kanan $m_B = 5{,}0\\text{ kg}$',
          'Percepatan gravitasi $g = 10\\text{ m/s}^2$',
        ],
        ditanyakan: 'Besar percepatan sistem $a$ (dalam $\\text{m/s}^2$)',
        asumsiFisika: [
          'Katrol licin dan tak bermassa sehingga tegangan tali di kedua sisi katrol sama besar ($T_A = T_B = T$).',
          'Tali tak bermassa dan tak dapat mulur.',
        ],
        batasanSistem: ['Benda bergerak vertikal tanpa hambatan udara dan belum menyentuh katrol/lantai.'],
      },
      visualisasiFisika:
        'Pada FBD balok A bekerja gaya berat $m_A g$ ke bawah dan tegangan $T$ ke atas. Pada balok B bekerja $m_B g$ ke bawah dan $T$ ke atas. Karena $m_B > m_A$, arah percepatan A ke atas dan B ke bawah.',
      analisisKonsep:
        'Gunakan Hukum II Newton secara terpisah pada masing-masing balok sesuai arah geraknya, lalu eliminasi gaya dalam (tegangan tali $T$).',
      persamaanDasar: [
        '\\sum F_A = m_A a \\implies T - m_A g = m_A a',
        '\\sum F_B = m_B a \\implies m_B g - T = m_B a',
      ],
      penurunanMatematis: [
        'Jumlahkan kedua persamaan Hukum II Newton:',
        '(T - m_A g) + (m_B g - T) = m_A a + m_B a',
        '(m_B - m_A) g = (m_A + m_B) a',
        'a = \\frac{m_B - m_A}{m_A + m_B} g',
      ],
      substitusiAngka: [
        'a = \\frac{5{,}0 - 3{,}0}{3{,}0 + 5{,}0} \\times 10',
      ],
      perhitungan: ['a = \\frac{2{,}0}{8{,}0} \\times 10 = 0{,}25 \\times 10 = 2{,}5\\text{ m/s}^2'],
      pembulatan: 'Hasil sudah tepat satu angka di belakang koma: $2{,}5$.',
      kesimpulan: 'Besar percepatan sistem adalah **2,5** $\\text{m/s}^2$.',
      insightOlimpiade:
        'Pandang kedua balok sebagai satu sistem 1D dengan massa total $(m_A + m_B)$ dan gaya penggerak netto $(m_B - m_A)g$, maka $a = \\frac{F_{\\text{netto}}}{m_{\\text{total}}}$ dapat ditulis seketika.',
      kesalahanUmum:
        'Menganggap tegangan tali sama dengan berat salah satu balok ($T = m_A g$), padahal selama sistem dipercepat, $m_A g < T < m_B g$.',
    },
    narrationStimulus:
      'Soal satu. Dua balok m A tiga koma nol kilogram dan m B lima koma nol kilogram dihubungkan tali ringan melalui katrol tetap licin tak bermassa. Dengan g sama dengan sepuluh meter per sekon kuadrat, tentukan besar percepatan sistem.',
    narrationFbd:
      'Perhatikan diagram gaya bebas. Pada balok A, tegangan tali T mengarah ke atas dan lebih besar daripada gaya berat m A g ke bawah sehingga A naik. Pada balok B, gaya berat m B g ke bawah lebih besar daripada tegangan tali T ke atas sehingga B turun.',
    narrationPembahasan:
      'Pembahasan soal satu. Dengan Hukum Kedua Newton pada balok A, T dikurangi m A g sama dengan m A a. Pada balok B, m B g dikurangi T sama dengan m B a. Jika kedua persamaan dijumlahkan, T saling menghilangkan, sehingga percepatan a sama dengan selisih massa dibagi jumlah massa dikali g, yaitu lima kurang tiga dibagi delapan dikali sepuluh, menghasilkan dua koma lima meter per sekon kuadrat.',
  },
  {
    id: 2,
    code: 'Soal 2',
    title: 'Tegangan Tali pada Katrol Majemuk Simetris',
    tier: 'Fundamental & Penguatan Konsep',
    tierRange: 'Soal 1–3',
    conceptTested: 'Relasi tegangan tali $T_1 = 2T_2$ pada katrol bergerak tak bermassa saat $m_2 = m_3$',
    recommendedTheoryId: 4,
    stimulusSummary:
      'Sistem katrol majemuk identik dengan konfigurasi Soal No. 8, dengan dua beban bawah memiliki massa yang sama persis.',
    stimulusTable: {
      caption: 'Data Massa Sistem Simetris',
      headers: ['Komponen', 'Simbol', 'Nilai'],
      rows: [
        ['Beban kiri katrol atas', 'm₁', '2,0 kg'],
        ['Beban kiri katrol bawah', 'm₂', '4,0 kg'],
        ['Beban kanan katrol bawah', 'm₃', '4,0 kg'],
        ['Percepatan gravitasi', 'g', '10 m/s²'],
      ],
    },
    questionPrompt:
      'Pada sistem katrol majemuk dua katrol (identik dengan gambar Soal No. 8), diketahui $m_1 = 2{,}0\\text{ kg}$, sedangkan katrol bergerak bawah mengikat dua beban identik $m_2 = m_3 = 4{,}0\\text{ kg}$. Semua katrol licin tak bermassa dan tali tak bermassa tak dapat mulur. Jika $g = 10\\text{ m/s}^2$, tentukan besar tegangan tali atas ($T_1$) yang mengikat $m_1$ (dalam satuan Newton).',
    unit: 'N',
    expectedAnswer: 32.0,
    expectedFormatted: '32,0',
    animation: {
      type: 'double',
      m1: 2.0,
      m2: 4.0,
      m3: 4.0,
      g: 10,
      a1Display: 6.0,
      a2Display: 6.0,
      a3Display: 6.0,
      aPulleyBottomDown: 6.0,
      t1Value: 32.0,
      t2Value: 16.0,
      equationsTimeline: [
        {
          phaseLabel: 'Tahap 1 · Simetri Katrol Bawah',
          tex: 'm_2 = m_3 = 4{,}0\\text{ kg} \\implies a_{\\text{rel}} = 0',
          caption: 'Karena kedua beban bawah sama berat, tidak ada gerak relatif terhadap katrol bawah.',
        },
        {
          phaseLabel: 'Tahap 2 · Percepatan Sistem',
          tex: 'a_1 = \\frac{(m_2 + m_3) - m_1}{m_1 + m_2 + m_3}g = \\frac{8 - 2}{10}(10) = 6{,}0\\text{ m/s}^2',
          caption: 'Katrol bawah dan kedua bebannya turun bersama dengan percepatan 6,0 m/s².',
        },
        {
          phaseLabel: 'Tahap 3 · Tegangan Tali Atas',
          tex: 'T_1 = m_1(g + a_1) = 2{,}0(10 + 6{,}0) = 32{,}0\\text{ N}',
          caption: 'Tegangan tali atas adalah 32,0 N (dan tegangan tali bawah T₂ = 16,0 N).',
        },
      ],
    },
    fbdObjects: [
      {
        id: 'm1',
        name: 'Massa m₁ (2,0 kg)',
        massLabel: 'm₁ = 2,0 kg',
        axesLabel: '+y ke atas',
        vectors: [
          {
            id: 'T1',
            label: 'T₁',
            directionDeg: 90,
            magnitudeRel: 1.15,
            color: '#db2777',
            formulaLabel: 'T₁ = 32,0 N',
            explanation: 'Tegangan tali atas menarik m₁ ke atas.',
          },
          {
            id: 'W1',
            label: 'm₁g',
            directionDeg: 270,
            magnitudeRel: 0.72,
            color: '#0f172a',
            formulaLabel: 'm₁g = 20,0 N',
            explanation: 'Gaya berat m₁ ke bawah.',
          },
        ],
        mathRelation: 'T_1 - m_1 g = m_1 a_1',
      },
      {
        id: 'P2',
        name: 'Katrol Bawah P₂ (Tak Bermassa)',
        massLabel: 'mₚ = 0 kg',
        axesLabel: '+y ke bawah',
        vectors: [
          {
            id: 'T1p',
            label: 'T₁',
            directionDeg: 90,
            magnitudeRel: 1.1,
            color: '#db2777',
            formulaLabel: 'T₁ = 32,0 N',
            explanation: 'Tali atas menarik poros katrol P₂ ke atas.',
          },
          {
            id: 'T2L',
            label: 'T₂ (kiri)',
            directionDeg: 270,
            magnitudeRel: 0.55,
            color: '#be185d',
            formulaLabel: 'T₂ = 16,0 N',
            explanation: 'Sisi kiri tali bawah menarik katrol ke bawah.',
          },
          {
            id: 'T2R',
            label: 'T₂ (kanan)',
            directionDeg: 270,
            magnitudeRel: 0.55,
            color: '#be185d',
            formulaLabel: 'T₂ = 16,0 N',
            explanation: 'Sisi kanan tali bawah menarik katrol ke bawah.',
          },
        ],
        mathRelation: 'T_1 - 2T_2 = 0 \\implies T_1 = 2T_2',
      },
    ],
    pembahasan: {
      memahamiPersoalan:
        'Karena $m_2 = m_3$, sistem bawah dalam keadaan simetris sempurna sehingga $m_2$ dan $m_3$ tidak saling berputar melewati katrol bawah. Keduanya turun bersama katrol bawah seperti satu balok berjumlah massa $8{,}0\\text{ kg}$.',
      identifikasiInformasi: {
        diketahui: [
          '$m_1 = 2{,}0\\text{ kg}$',
          '$m_2 = 4{,}0\\text{ kg}$, $m_3 = 4{,}0\\text{ kg}$',
          '$g = 10\\text{ m/s}^2$',
        ],
        ditanyakan: 'Tegangan tali atas $T_1$ (dalam Newton)',
        asumsiFisika: [
          'Katrol bawah tak bermassa sehingga $T_1 = 2T_2$.',
          'Tidak ada gerak relatif antara $m_2$ dan $m_3$ terhadap katrol bawah.',
        ],
        batasanSistem: ['Benda bergerak vertikal lurus.'],
      },
      visualisasiFisika:
        'FBD $m_1$ memiliki $T_1$ ke atas dan $m_1 g$ ke bawah. FBD katrol $P_2$ memiliki $T_1$ ke atas dan dua tarikan $T_2$ ke bawah.',
      analisisKonsep:
        'Hukum II Newton berlaku pada $m_1$, $m_2$, $m_3$, serta kesetimbangan gaya pada katrol tak bermassa $P_2$.',
      persamaanDasar: [
        'T_1 - m_1 g = m_1 a_1',
        'T_1 = 2T_2',
        'm_2 g - T_2 = m_2 a_p \\quad ; \\quad m_3 g - T_2 = m_3 a_p',
      ],
      penurunanMatematis: [
        'Karena $m_2 = m_3$ dan $a_p = a_1$, maka $a_2 = a_3 = a_1$:',
        '(m_2 + m_3)g - 2T_2 = (m_2 + m_3)a_1 \\implies (m_2 + m_3)g - T_1 = (m_2 + m_3)a_1',
        'Tambahkan dengan $T_1 - m_1 g = m_1 a_1$:',
        'a_1 = \\frac{(m_2 + m_3) - m_1}{m_1 + m_2 + m_3} g',
        'T_1 = m_1(g + a_1)',
      ],
      substitusiAngka: [
        'a_1 = \\frac{(4{,}0 + 4{,}0) - 2{,}0}{2{,}0 + 4{,}0 + 4{,}0} \\times 10',
        'T_1 = 2{,}0(10 + a_1)',
      ],
      perhitungan: [
        'a_1 = \\frac{6{,}0}{10{,}0} \\times 10 = 6{,}0\\text{ m/s}^2',
        'T_1 = 2{,}0 \\times (10 + 6{,}0) = 32{,}0\\text{ N}',
      ],
      pembulatan: 'Hasil eksak $32$ ditulis dalam format satu desimal menjadi $32{,}0$.',
      kesimpulan: 'Besar tegangan tali atas $T_1$ adalah **32,0** N.',
      insightOlimpiade:
        'Rumus massa efektif $m_{\\text{eff}} = \\frac{4m_2 m_3}{m_2 + m_3} = \\frac{4(4)(4)}{8} = 8{,}0\\text{ kg}$ langsung membuktikan bahwa saat $m_2 = m_3$, $m_{\\text{eff}}$ tepat sama dengan $m_2 + m_3$.',
      kesalahanUmum:
        'Mengira tegangan tali sama dengan $m_1 g = 20\\text{ N}$ atau sama dengan $(m_2 + m_3)g = 80\\text{ N}$.',
    },
    narrationStimulus:
      'Soal dua. Pada sistem katrol majemuk dua katrol, m satu sama dengan dua koma nol kilogram, sedangkan m dua dan m tiga sama-sama empat koma nol kilogram. Jika g sama dengan sepuluh meter per sekon kuadrat, tentukan besar gaya tegangan tali atas T satu dalam satuan Newton.',
    narrationFbd:
      'Pada benda m satu, tegangan T satu menarik ke atas dan berat m satu g menarik ke bawah. Pada katrol bawah yang tak bermassa, gaya ke atas oleh tali T satu diimbangi tepat oleh dua tarikan tali T dua ke bawah.',
    narrationPembahasan:
      'Pembahasan soal dua. Karena m dua dan m tiga sama besar, keduanya tidak bergerak relatif terhadap katrol bawah, sehingga gabungan katrol bawah berfungsi seperti beban delapan kilogram. Percepatan m satu ke atas menjadi delapan kurang dua dibagi sepuluh dikali sepuluh, yaitu enam koma nol meter per sekon kuadrat. Maka T satu sama dengan m satu dikalikan kurung buka g tambah a satu kurung tutup, menghasilkan tiga puluh dua koma nol Newton.',
  },
  {
    id: 3,
    code: 'Soal 3',
    title: 'Kendala Kinematika Tali Tak Dapat Mulur',
    tier: 'Fundamental & Penguatan Konsep',
    tierRange: 'Soal 1–3',
    conceptTested: 'Persamaan kendala percepatan $a_2 + a_3 = 2a_p$ pada katrol majemuk',
    recommendedTheoryId: 5,
    stimulusSummary:
      'Pengamatan kinematika gerak vertikal ketiga beban pada sistem katrol Soal No. 8 menggunakan sensor posisi.',
    stimulusTable: {
      caption: 'Hasil Pengukuran Percepatan Sesaat',
      headers: ['Objek', 'Arah Gerak', 'Besar Percepatan'],
      rows: [
        ['Massa m₁', 'Vertikal ke atas', '3,2 m/s²'],
        ['Massa m₂', 'Vertikal ke bawah', '1,8 m/s²'],
        ['Massa m₃', 'Vertikal ke bawah', 'Dicari (m/s²)'],
      ],
    },
    questionPrompt:
      'Pada sistem katrol dua tingkat seperti gambar Soal No. 8 (katrol atas tetap, katrol bawah bergerak, seluruh tali tak dapat mulur), suatu saat diamati massa $m_1$ bergerak dipercepat ke **atas** dengan percepatan $3{,}2\\text{ m/s}^2$, sedangkan massa $m_2$ bergerak dipercepat ke **bawah** dengan percepatan $1{,}8\\text{ m/s}^2$ terhadap lantai. Berapakah besar percepatan ke bawah massa $m_3$ terhadap lantai (dalam satuan $\\text{m/s}^2$)?',
    unit: 'm/s²',
    expectedAnswer: 4.6,
    expectedFormatted: '4,6',
    animation: {
      type: 'double',
      m1: 2.0,
      m2: 3.0,
      m3: 4.0,
      g: 10,
      a1Display: 3.2,
      a2Display: 1.8,
      a3Display: 4.6,
      aPulleyBottomDown: 3.2,
      t1Value: 26.4,
      t2Value: 13.2,
      equationsTimeline: [
        {
          phaseLabel: 'Tahap 1 · Kendala Tali Atas',
          tex: '\\Delta y_p = \\Delta y_{1,\\text{naik}} \\implies a_p = 3{,}2\\text{ m/s}^2\\text{ (turun)}',
          caption: 'Saat m₁ naik Δy, katrol bawah P₂ turun tepat sejauh Δy.',
        },
        {
          phaseLabel: 'Tahap 2 · Kendala Tali Bawah',
          tex: 'y_2 + y_3 - 2y_p = \\text{konstan} \\implies a_2 + a_3 = 2a_p',
          caption: 'Jumlah percepatan turun m₂ dan m₃ harus sama dengan dua kali percepatan turun katrol P₂.',
        },
        {
          phaseLabel: 'Tahap 3 · Nilai a₃',
          tex: '1{,}8 + a_3 = 2(3{,}2) = 6{,}4 \\implies a_3 = 4{,}6\\text{ m/s}^2',
          caption: 'Massa m₃ turun dengan percepatan 4,6 m/s².',
        },
      ],
    },
    fbdObjects: [
      {
        id: 'kinematika',
        name: 'Kendala Panjang Tali Bawah',
        massLabel: 'L₂ = konstan',
        axesLabel: '+y ke bawah dari katrol atas',
        vectors: [
          {
            id: 'ap',
            label: 'aₚ (katrol)',
            directionDeg: 270,
            magnitudeRel: 0.75,
            color: '#db2777',
            formulaLabel: 'aₚ = 3,2 m/s²',
            explanation: 'Katrol bawah turun seiring naiknya m₁.',
          },
          {
            id: 'a2',
            label: 'a₂',
            directionDeg: 270,
            magnitudeRel: 0.45,
            color: '#0284c7',
            formulaLabel: 'a₂ = 1,8 m/s²',
            explanation: 'm₂ turun lebih lambat daripada katrol karena tali di sisi m₂ tertarik ke atas relatif terhadap katrol.',
          },
          {
            id: 'a3',
            label: 'a₃',
            directionDeg: 270,
            magnitudeRel: 1.05,
            color: '#be185d',
            formulaLabel: 'a₃ = 4,6 m/s²',
            explanation: 'm₃ turun lebih cepat daripada katrol sehingga rata-rata a₂ dan a₃ tepat sama dengan aₚ.',
          },
        ],
        mathRelation: 'a_p = \\frac{a_2 + a_3}{2}',
      },
    ],
    pembahasan: {
      memahamiPersoalan:
        'Soal ini menguji inti kinematika katrol bergerak tanpa perlu mengetahui besar massa maupun gaya. Cukup dengan menjaga panjang kedua tali tetap konstan, percepatan benda ketiga terkunci secara geometris.',
      identifikasiInformasi: {
        diketahui: [
          'Percepatan $m_1$ ke atas: $a_{1,\\text{naik}} = 3{,}2\\text{ m/s}^2$',
          'Percepatan $m_2$ ke bawah: $a_2 = 1{,}8\\text{ m/s}^2$',
        ],
        ditanyakan: 'Percepatan ke bawah $m_3$ terhadap lantai (dalam $\\text{m/s}^2$)',
        asumsiFisika: [
          'Tali atas dan tali bawah tidak dapat mulur.',
          'Katrol atas diam relatif terhadap lantai.',
        ],
        batasanSistem: ['Semua tali dalam keadaan tegang selama pengamatan.'],
      },
      visualisasiFisika:
        'Ukur seluruh posisi vertikal ke bawah dari poros katrol atas ($y = 0$). Panjang tali atas mengikat $y_1$ dan $y_p$; panjang tali bawah mengikat $y_2, y_3,$ dan $y_p$.',
      analisisKonsep:
        'Gunakan kekekalan panjang tali (metode koordinat dan turunan kedua terhadap waktu) untuk menurunkan hubungan antara $a_1, a_2, a_3$.',
      persamaanDasar: [
        'L_1 = y_1 + y_p + \\text{konst} \\implies \\ddot{y}_1 + \\ddot{y}_p = 0',
        'L_2 = (y_2 - y_p) + (y_3 - y_p) + \\text{konst} \\implies \\ddot{y}_2 + \\ddot{y}_3 = 2\\ddot{y}_p',
      ],
      penurunanMatematis: [
        'Karena $m_1$ naik dengan $3{,}2\\text{ m/s}^2$, maka percepatan ke bawah $m_1$ adalah $\\ddot{y}_1 = -3{,}2\\text{ m/s}^2$.',
        'Dari persamaan tali atas: $a_p = \\ddot{y}_p = -\\ddot{y}_1 = +3{,}2\\text{ m/s}^2$ (ke bawah).',
        'Dari persamaan tali bawah: $a_2 + a_3 = 2a_p$.',
        'a_3 = 2a_p - a_2',
      ],
      substitusiAngka: ['a_3 = 2(3{,}2) - 1{,}8'],
      perhitungan: ['a_3 = 6{,}4 - 1{,}8 = 4{,}6\\text{ m/s}^2'],
      pembulatan: 'Hasil eksak satu desimal adalah $4{,}6$.',
      kesimpulan: 'Besar percepatan ke bawah massa $m_3$ terhadap lantai adalah **4,6** $\\text{m/s}^2$.',
      insightOlimpiade:
        'Ingat selalu sifat rata-rata katrol bergerak: percepatan poros katrol bergerak adalah **rata-rata aritmetika** dari percepatan kedua sisi talinya, yakni $a_p = \\frac{a_2 + a_3}{2}$.',
      kesalahanUmum:
        'Menganggap selisih percepatan $(a_3 - a_2)$ sama dengan $a_p$, atau lupa mengalikan $a_p$ dengan faktor 2 pada kendala tali bawah.',
    },
    narrationStimulus:
      'Soal tiga. Pada sistem katrol majemuk dua tingkat, massa m satu diamati bergerak dipercepat ke atas sebesar tiga koma dua meter per sekon kuadrat, dan massa m dua turun dengan percepatan satu koma delapan meter per sekon kuadrat. Berapakah percepatan ke bawah massa m tiga?',
    narrationFbd:
      'Diagram kinematika menunjukkan tiga vektor percepatan ke bawah: katrol bawah turun sebesar tiga koma dua, m dua turun lebih lambat yaitu satu koma delapan, sehingga m tiga harus turun lebih cepat agar rata-rata keduanya tetap tiga koma dua.',
    narrationPembahasan:
      'Pembahasan soal tiga. Karena m satu naik tiga koma dua, maka katrol bawah turun dengan percepatan tiga koma dua. Dari kekekalan panjang tali bawah, a dua ditambah a tiga sama dengan dua kali percepatan katrol bawah. Jadi a tiga sama dengan dua kali tiga koma dua dikurangi satu koma delapan, yaitu enam koma empat dikurangi satu koma delapan, sama dengan empat koma enam meter per sekon kuadrat.',
  },
  {
    id: 4,
    code: 'Soal 4 (Asli No. 8)',
    title: 'Soal Utama OSK 2026 Nomor 8 — Rasio Percepatan a₁/g',
    tier: 'Aplikasi Konsep & Penalaran Matematis',
    tierRange: 'Soal 4–6',
    conceptTested: 'Penyelesaian penuh Mesin Atwood Ganda (Hukum II Newton + Kendala Tali + Tegangan Berantai)',
    recommendedTheoryId: 10,
    stimulusSummary:
      'Soal sumber asli Nomor 8 OSK Fisika SMA 2026: katrol atas tetap di atap, katrol bawah bergerak, tiga massa tak seimbang.',
    stimulusTable: {
      caption: 'Data Resmi Soal No. 8 OSK 2026',
      headers: ['Besaran', 'Simbol', 'Nilai'],
      rows: [
        ['Massa kiri atas', 'm₁', '2 kg'],
        ['Massa kiri bawah', 'm₂', '3 kg'],
        ['Massa kanan bawah', 'm₃', '6 kg'],
        ['Percepatan gravitasi', 'g', 'Simbolik (g)'],
      ],
    },
    questionPrompt:
      '**[Soal Sumber Nomor 8 OSK Fisika SMA 2026]** Pada sistem dua katrol seperti pada animasi, diketahui $m_1 = 2\\text{ kg}$, $m_2 = 3\\text{ kg}$, dan $m_3 = 6\\text{ kg}$. Kedua katrol licin tak bermassa, seluruh tali tak bermassa dan tak dapat mulur, serta percepatan gravitasi sama dengan $g$. Jika $a_1$ adalah besar percepatan $m_1$ relatif terhadap katrol atas, maka nilai $a_1/g$ sama dengan ...',
    unit: 'tanpa satuan',
    expectedAnswer: 0.6,
    expectedFormatted: '0,6',
    animation: {
      type: 'double',
      m1: 2.0,
      m2: 3.0,
      m3: 6.0,
      g: 10,
      a1Display: 6.0,
      a2Display: 4.67,
      a3Display: 7.33,
      aPulleyBottomDown: 6.0,
      t1Value: 32.0,
      t2Value: 16.0,
      equationsTimeline: [
        {
          phaseLabel: 'Tahap 1 · FBD & Tegangan Katrol',
          tex: 'T_1 = 2T_2',
          caption: 'Katrol bawah tak bermassa membuat T₁ tepat dua kali T₂.',
        },
        {
          phaseLabel: 'Tahap 2 · Persamaan Kunci T₂',
          tex: 'T_2 = \\frac{4g}{2 + \\frac{1}{3} + \\frac{1}{6}} = 1{,}6g',
          caption: 'Substitusi Hukum II Newton ke kendala tali menghasilkan T₂ = 1,6g dan T₁ = 3,2g.',
        },
        {
          phaseLabel: 'Tahap 3 · Percepatan m₁',
          tex: 'a_1 = \\frac{3{,}2g - 2g}{2} = 0{,}6g',
          caption: 'Massa m₁ dipercepat ke atas sebesar 0,6g relatif terhadap katrol atas.',
        },
      ],
    },
    fbdObjects: [
      {
        id: 'm1',
        name: 'Massa m₁ (2 kg)',
        massLabel: 'm₁ = 2 kg',
        axesLabel: '+y ke bawah (atau ke atas)',
        vectors: [
          {
            id: 'T1',
            label: 'T₁',
            directionDeg: 90,
            magnitudeRel: 1.15,
            color: '#db2777',
            formulaLabel: 'T₁ = 3,2g',
            explanation: 'Tegangan tali atas menarik m₁ ke atas.',
          },
          {
            id: 'W1',
            label: 'm₁g',
            directionDeg: 270,
            magnitudeRel: 0.72,
            color: '#0f172a',
            formulaLabel: 'm₁g = 2,0g',
            explanation: 'Berat m₁ ke bawah lebih kecil daripada T₁, sehingga m₁ naik.',
          },
        ],
        mathRelation: 'T_1 - m_1 g = m_1 a_1',
      },
      {
        id: 'P2',
        name: 'Katrol Bawah P₂ (Tak Bermassa)',
        massLabel: 'mₚ = 0 kg',
        axesLabel: '+y ke bawah',
        vectors: [
          {
            id: 'T1p',
            label: 'T₁',
            directionDeg: 90,
            magnitudeRel: 1.1,
            color: '#db2777',
            formulaLabel: 'T₁ = 3,2g',
            explanation: 'Tarikan tali atas menahan poros P₂ ke atas.',
          },
          {
            id: 'T2a',
            label: 'T₂',
            directionDeg: 270,
            magnitudeRel: 0.55,
            color: '#be185d',
            formulaLabel: 'T₂ = 1,6g',
            explanation: 'Tarikan sisi kiri tali bawah.',
          },
          {
            id: 'T2b',
            label: 'T₂',
            directionDeg: 270,
            magnitudeRel: 0.55,
            color: '#be185d',
            formulaLabel: 'T₂ = 1,6g',
            explanation: 'Tarikan sisi kanan tali bawah.',
          },
        ],
        mathRelation: 'T_1 - 2T_2 = 0 \\implies T_1 = 2T_2',
      },
      {
        id: 'm2',
        name: 'Massa m₂ (3 kg)',
        massLabel: 'm₂ = 3 kg',
        axesLabel: '+y ke bawah',
        vectors: [
          {
            id: 'T2_2',
            label: 'T₂',
            directionDeg: 90,
            magnitudeRel: 0.55,
            color: '#be185d',
            formulaLabel: 'T₂ = 1,6g',
            explanation: 'Tegangan tali bawah menahan m₂ ke atas.',
          },
          {
            id: 'W2',
            label: 'm₂g',
            directionDeg: 270,
            magnitudeRel: 1.0,
            color: '#0f172a',
            formulaLabel: 'm₂g = 3,0g',
            explanation: 'Berat m₂ ke bawah lebih besar dari T₂ sehingga m₂ tetap turun (7g/15).',
          },
        ],
        mathRelation: 'm_2 g - T_2 = m_2 a_2',
      },
      {
        id: 'm3',
        name: 'Massa m₃ (6 kg)',
        massLabel: 'm₃ = 6 kg',
        axesLabel: '+y ke bawah',
        vectors: [
          {
            id: 'T2_3',
            label: 'T₂',
            directionDeg: 90,
            magnitudeRel: 0.45,
            color: '#be185d',
            formulaLabel: 'T₂ = 1,6g',
            explanation: 'Tegangan tali bawah menahan m₃ ke atas.',
          },
          {
            id: 'W3',
            label: 'm₃g',
            directionDeg: 270,
            magnitudeRel: 1.35,
            color: '#0f172a',
            formulaLabel: 'm₃g = 6,0g',
            explanation: 'Berat m₃ jauh lebih besar dari T₂ sehingga m₃ turun paling cepat (11g/15).',
          },
        ],
        mathRelation: 'm_3 g - T_2 = m_3 a_3',
      },
    ],
    pembahasan: {
      memahamiPersoalan:
        'Ini adalah soal sumber OSK Fisika SMA 2026 Nomor 8. Karena katrol atas terikat tetap pada atap, percepatan $m_1$ relatif terhadap katrol atas sama dengan percepatan $m_1$ di kerangka diam.',
      identifikasiInformasi: {
        diketahui: ['$m_1 = 2\\text{ kg}$', '$m_2 = 3\\text{ kg}$', '$m_3 = 6\\text{ kg}$', 'Percepatan gravitasi $g$'],
        ditanyakan: 'Rasio percepatan $a_1 / g$',
        asumsiFisika: [
          'Katrol atas tetap, kedua katrol licin tak bermassa.',
          'Kedua tali tak bermassa dan tak dapat mulur.',
        ],
        batasanSistem: ['Gerak satu dimensi sepanjang sumbu vertikal sebelum beban menyentuh katrol/lantai.'],
      },
      visualisasiFisika:
        'Terdapat 4 benda tinjauan: $m_1$, katrol $P_2$, $m_2$, dan $m_3$. Semua vektor gaya bekerja pada sumbu vertikal.',
      analisisKonsep:
        'Gabungkan 3 persamaan Hukum II Newton, kesetimbangan katrol tak bermassa ($T_1 = 2T_2$), dan persamaan kendala percepatan $a_2 + a_3 = 2a_p = -2a_{1,\\text{turun}}$.',
      persamaanDasar: [
        'm_1 g - T_1 = m_1 a_{1,\\text{turun}}',
        'm_2 g - T_2 = m_2 a_2 \\quad ; \\quad m_3 g - T_2 = m_3 a_3',
        'T_1 = 2T_2 \\quad ; \\quad a_2 + a_3 = -2a_{1,\\text{turun}}',
      ],
      penurunanMatematis: [
        'Nyatakan percepatan ke bawah masing-masing dalam $T_2$:',
        'a_{1,\\text{turun}} = g - \\frac{2T_2}{m_1}, \\quad a_2 = g - \\frac{T_2}{m_2}, \\quad a_3 = g - \\frac{T_2}{m_3}',
        'Substitusi ke persamaan kendala $a_2 + a_3 = -2a_{1,\\text{turun}}$:',
        '\\left(g - \\frac{T_2}{m_2}\\right) + \\left(g - \\frac{T_2}{m_3}\\right) = -2\\left(g - \\frac{2T_2}{m_1}\\right)',
        '4g = T_2 \\left(\\frac{4}{m_1} + \\frac{1}{m_2} + \\frac{1}{m_3}\\right)',
      ],
      substitusiAngka: [
        '4g = T_2 \\left(\\frac{4}{2} + \\frac{1}{3} + \\frac{1}{6}\\right) = T_2 \\left(2 + \\frac{1}{2}\\right) = \\frac{5}{2} T_2',
        'T_2 = \\frac{8}{5} g = 1{,}6 g \\implies T_1 = 2T_2 = 3{,}2 g',
      ],
      perhitungan: [
        'a_{1,\\text{turun}} = g - \\frac{3{,}2 g}{2} = g - 1{,}6 g = -0{,}6 g',
        '\\text{Tanda minus berarti } m_1 \\text{ bergerak ke atas dengan } a_1 = 0{,}6 g \\implies \\frac{a_1}{g} = 0{,}6',
      ],
      pembulatan: 'Hasil eksak sudah satu angka di belakang koma: $0{,}6$.',
      kesimpulan: 'Nilai $a_1 / g$ sama dengan **0,6**.',
      insightOlimpiade:
        'Metode Massa Efektif: $m_{\\text{eff}} = \\frac{4 m_2 m_3}{m_2 + m_3} = \\frac{4(3)(6)}{3+6} = 8\\text{ kg}$. Maka $a_1 = \\frac{m_{\\text{eff}} - m_1}{m_{\\text{eff}} + m_1} g = \\frac{8 - 2}{8 + 2} g = 0{,}6 g$ hanya dalam 10 detik!',
      kesalahanUmum:
        'Menghitung $m_{\\text{eff}} = m_2 + m_3 = 9\\text{ kg}$ sehingga mendapat jawaban keliru $\\frac{9-2}{9+2} = 0{,}636 \\approx 0{,}6$ (kebetulan dekat di soal ini, tetapi gagal fatal pada soal lain seperti Soal 2, 5, 6, 11, dan 12!).',
    },
    narrationStimulus:
      'Soal empat, yaitu soal sumber asli nomor delapan OSK Fisika SMA dua ribu dua puluh enam. Diketahui m satu dua kilogram, m dua tiga kilogram, dan m tiga enam kilogram. Kedua katrol licin tak bermassa dan tali tak dapat mulur. Tentukan rasio percepatan m satu relatif terhadap katrol atas dibagi g.',
    narrationFbd:
      'Pada m satu, gaya tarik tali T satu sebesar tiga koma dua g melawan berat dua g, sehingga m satu naik. Pada katrol bawah P dua, tarikan T satu ke atas diimbangi dua kali T dua ke bawah. Baik m dua maupun m tiga tetap mengalami resultan gaya ke bawah karena beratnya masing-masing lebih besar dari T dua.',
    narrationPembahasan:
      'Pembahasan soal empat. Dengan menjumlahkan Hukum Kedua Newton dan kendala tali, diperoleh empat g sama dengan T dua dikalikan empat per dua tambah satu per tiga tambah satu per enam, atau dua koma lima T dua. Maka T dua sama dengan satu koma enam g dan T satu sama dengan tiga koma dua g. Percepatan m satu ke atas menjadi tiga koma dua g kurang dua g dibagi dua, yaitu nol koma enam g. Sehingga rasio a satu per g sama dengan nol koma enam.',
  },
  {
    id: 5,
    code: 'Soal 5',
    title: 'Percepatan Relatif Beban Bawah Terhadap Katrol Bergerak',
    tier: 'Aplikasi Konsep & Penalaran Matematis',
    tierRange: 'Soal 4–6',
    conceptTested: 'Kerangka acuan non-inersia katrol bergerak dan gravitasi efektif $g_{\\text{eff}} = g - a_p$',
    recommendedTheoryId: 11,
    stimulusSummary:
      'Analisis gerak relatif beban $m_3$ terhadap poros katrol bergerak $P_2$ yang sedang turun dipercepat.',
    stimulusTable: {
      caption: 'Parameter Sistem Katrol Soal 5',
      headers: ['Besaran', 'Simbol', 'Nilai'],
      rows: [
        ['Massa kiri atas', 'm₁', '4,0 kg'],
        ['Massa kiri bawah', 'm₂', '2,0 kg'],
        ['Massa kanan bawah', 'm₃', '6,0 kg'],
        ['Percepatan gravitasi', 'g', '10 m/s²'],
      ],
    },
    questionPrompt:
      'Pada sistem katrol majemuk dua tingkat dengan $m_1 = 4{,}0\\text{ kg}$, $m_2 = 2{,}0\\text{ kg}$, dan $m_3 = 6{,}0\\text{ kg}$ ($g = 10\\text{ m/s}^2$), seluruh katrol dan tali licin serta tak bermassa. Tentukan besar percepatan massa $m_3$ **relatif terhadap katrol bawah yang bergerak** (dalam satuan $\\text{m/s}^2$).',
    unit: 'm/s²',
    expectedAnswer: 4.0,
    expectedFormatted: '4,0',
    animation: {
      type: 'double',
      m1: 4.0,
      m2: 2.0,
      m3: 6.0,
      g: 10,
      a1Display: 2.0,
      a2Display: -2.0,
      a3Display: 6.0,
      aPulleyBottomDown: 2.0,
      t1Value: 48.0,
      t2Value: 24.0,
      equationsTimeline: [
        {
          phaseLabel: 'Tahap 1 · Massa Efektif Bawah',
          tex: 'm_{\\text{eff}} = \\frac{4(2)(6)}{2+6} = 6{,}0\\text{ kg}',
          caption: 'Subsistem katrol bawah ekuivalen dengan massa 6,0 kg.',
        },
        {
          phaseLabel: 'Tahap 2 · Percepatan Katrol P₂',
          tex: 'a_p = \\frac{6{,}0 - 4{,}0}{6{,}0 + 4{,}0}(10) = 2{,}0\\text{ m/s}^2\\text{ (turun)}',
          caption: 'Katrol bawah turun dipercepat 2,0 m/s² sehingga g_eff = 10 − 2 = 8,0 m/s².',
        },
        {
          phaseLabel: 'Tahap 3 · Percepatan Relatif m₃',
          tex: 'a_{\\text{rel}} = \\frac{m_3 - m_2}{m_3 + m_2} g_{\\text{eff}} = \\frac{6 - 2}{6 + 2}(8{,}0) = 4{,}0\\text{ m/s}^2',
          caption: 'Diukur dari katrol bawah, m₃ turun 4,0 m/s² dan m₂ naik 4,0 m/s².',
        },
      ],
    },
    fbdObjects: [
      {
        id: 'm3_rel',
        name: 'Massa m₃ (Kerangka Katrol P₂)',
        massLabel: 'm₃ = 6,0 kg',
        axesLabel: '+y ke bawah relatif P₂',
        vectors: [
          {
            id: 'T2',
            label: 'T₂',
            directionDeg: 90,
            magnitudeRel: 0.65,
            color: '#db2777',
            formulaLabel: 'T₂ = 24,0 N',
            explanation: 'Tegangan tali bawah menarik m₃ ke atas.',
          },
          {
            id: 'Fpseudo',
            label: 'm₃ aₚ (fiktif)',
            directionDeg: 90,
            magnitudeRel: 0.35,
            color: '#9333ea',
            formulaLabel: 'm₃ aₚ = 12,0 N',
            explanation: 'Gaya fiktif ke atas karena kerangka katrol P₂ turun dipercepat.',
          },
          {
            id: 'W3',
            label: 'm₃ g',
            directionDeg: 270,
            magnitudeRel: 1.25,
            color: '#0f172a',
            formulaLabel: 'm₃ g = 60,0 N',
            explanation: 'Gaya berat nyata m₃ ke bawah.',
          },
        ],
        mathRelation: 'm_3 g_{\\text{eff}} - T_2 = m_3 a_{\\text{rel}}, \\; g_{\\text{eff}} = g - a_p',
      },
      {
        id: 'm1',
        name: 'Massa m₁ (Kerangka Tanah)',
        massLabel: 'm₁ = 4,0 kg',
        axesLabel: '+y ke atas',
        vectors: [
          {
            id: 'T1',
            label: 'T₁',
            directionDeg: 90,
            magnitudeRel: 1.1,
            color: '#db2777',
            formulaLabel: 'T₁ = 48,0 N',
            explanation: 'Tegangan tali atas.',
          },
          {
            id: 'W1',
            label: 'm₁ g',
            directionDeg: 270,
            magnitudeRel: 0.9,
            color: '#0f172a',
            formulaLabel: 'm₁ g = 40,0 N',
            explanation: 'Gaya berat m₁.',
          },
        ],
        mathRelation: 'T_1 - m_1 g = m_1 a_1',
      },
    ],
    pembahasan: {
      memahamiPersoalan:
        'Soal meminta percepatan $m_3$ **relatif terhadap katrol bawah** ($a_{3/P_2}$), bukan terhadap tanah! Perhatikan pula bahwa di sini $m_2$ justru mengalami percepatan ke atas sebesar $2{,}0\\text{ m/s}^2$ terhadap tanah karena $a_{\\text{rel}} = 4{,}0 > a_p = 2{,}0$.',
      identifikasiInformasi: {
        diketahui: ['$m_1 = 4{,}0\\text{ kg}$', '$m_2 = 2{,}0\\text{ kg}$', '$m_3 = 6{,}0\\text{ kg}$', '$g = 10\\text{ m/s}^2$'],
        ditanyakan: 'Percepatan $m_3$ relatif terhadap katrol bawah $P_2$ (dalam $\\text{m/s}^2$)',
        asumsiFisika: ['Katrol licin tak bermassa, tali tak mulur.'],
        batasanSistem: ['Benda bergerak bebas di udara sebelum menyentuh katrol.'],
      },
      visualisasiFisika:
        'Jika kita berdiri di atas katrol bawah $P_2$ yang turun dengan percepatan $a_p$, dunia tampak memiliki gravitasi efektif $g_{\\text{eff}} = g - a_p$, dan $m_2$ dengan $m_3$ tampak seperti mesin Atwood biasa.',
      analisisKonsep:
        'Bisa diselesaikan dengan dua cara: (1) Kerangka non-inersia katrol bawah ($g_{\\text{eff}} = g - a_p$), atau (2) Hitung $a_3$ dan $a_p$ di kerangka tanah lalu kurangkan $a_{\\text{rel}} = a_3 - a_p$.',
      persamaanDasar: [
        'm_{\\text{eff}} = \\frac{4 m_2 m_3}{m_2 + m_3}',
        'a_p = \\frac{m_{\\text{eff}} - m_1}{m_{\\text{eff}} + m_1} g',
        'a_{\\text{rel}} = \\frac{m_3 - m_2}{m_3 + m_2}(g - a_p)',
      ],
      penurunanMatematis: [
        'Hitung massa efektif katrol bawah: $m_{\\text{eff}} = \\frac{4 \\times 2{,}0 \\times 6{,}0}{2{,}0 + 6{,}0} = 6{,}0\\text{ kg}$.',
        'Hitung percepatan turun katrol bawah $a_p$: $a_p = \\frac{6{,}0 - 4{,}0}{6{,}0 + 4{,}0} g = 0{,}2 g$.',
        'Gravitasi efektif di katrol bawah: $g_{\\text{eff}} = g - a_p = 0{,}8 g$.',
        'Percepatan relatif $m_3$ terhadap $P_2$: $a_{\\text{rel}} = \\frac{m_3 - m_2}{m_3 + m_2} g_{\\text{eff}}$.',
      ],
      substitusiAngka: [
        'a_p = 0{,}2 \\times 10 = 2{,}0\\text{ m/s}^2',
        'g_{\\text{eff}} = 10 - 2{,}0 = 8{,}0\\text{ m/s}^2',
        'a_{\\text{rel}} = \\frac{6{,}0 - 2{,}0}{6{,}0 + 2{,}0} \\times 8{,}0',
      ],
      perhitungan: ['a_{\\text{rel}} = \\frac{4{,}0}{8{,}0} \\times 8{,}0 = 4{,}0\\text{ m/s}^2'],
      pembulatan: 'Hasil eksak satu desimal adalah $4{,}0$.',
      kesimpulan: 'Besar percepatan $m_3$ relatif terhadap katrol bawah adalah **4,0** $\\text{m/s}^2$.',
      insightOlimpiade:
        'Cek lewat kerangka tanah: $T_1 = 4(10 + 2) = 48\\text{ N} \\implies T_2 = 24\\text{ N}$. Maka $a_3 = 10 - \\frac{24}{6} = 6{,}0\\text{ m/s}^2$ ke bawah. Relatif terhadap $P_2$ yang turun $2{,}0\\text{ m/s}^2$, $a_{3/P_2} = 6{,}0 - 2{,}0 = 4{,}0\\text{ m/s}^2$. Cocok sempurna!',
      kesalahanUmum:
        'Menghitung $a_{\\text{rel}} = \\frac{m_3 - m_2}{m_3 + m_2}g = 5{,}0\\text{ m/s}^2$ karena lupa bahwa katrol bawah ikut turun dipercepat sehingga gravitasi efektif berkurang menjadi $g - a_p$.',
    },
    narrationStimulus:
      'Soal lima. Diketahui m satu empat koma nol kilogram, m dua dua koma nol kilogram, m tiga enam koma nol kilogram, dan g sepuluh meter per sekon kuadrat. Tentukan besar percepatan massa m tiga relatif terhadap katrol bawah yang bergerak.',
    narrationFbd:
      'Dalam kerangka pengamat yang ikut turun bersama katrol bawah sebesar a p, benda m tiga seolah berada dalam medan gravitasi efektif g dikurangi a p, dengan gaya fiktif m tiga a p mengarah ke atas.',
    narrationPembahasan:
      'Pembahasan soal lima. Pertama hitung massa efektif katrol bawah yaitu empat kali dua kali enam dibagi delapan, sama dengan enam kilogram. Maka katrol bawah turun dengan percepatan a p sebesar enam kurang empat dibagi sepuluh dikali sepuluh, yaitu dua koma nol meter per sekon kuadrat. Gravitasi efektif di katrol bawah adalah sepuluh dikurangi dua, yaitu delapan meter per sekon kuadrat. Jadi percepatan relatif m tiga terhadap katrol bawah adalah enam kurang dua dibagi delapan dikali delapan, sama dengan empat koma nol meter per sekon kuadrat.',
  },
  {
    id: 6,
    code: 'Soal 6',
    title: 'Kondisi Keseimbangan Dinamis: Membuat Massa m₂ Diam',
    tier: 'Aplikasi Konsep & Penalaran Matematis',
    tierRange: 'Soal 4–6',
    conceptTested: 'Rekayasa parameter sistem katrol majemuk agar salah satu beban berakselerasi nol ($a_2 = 0$)',
    recommendedTheoryId: 5,
    stimulusSummary:
      'Sebuah eksperimen katrol majemuk menginginkan massa $m_2$ tetap diam melayang di udara ($a_2 = 0$) selama $m_1$ dan $m_3$ bergerak.',
    stimulusTable: {
      caption: 'Kondisi Target Desain Eksperimen',
      headers: ['Besaran', 'Simbol', 'Nilai'],
      rows: [
        ['Massa kiri bawah (target diam)', 'm₂', '3,0 kg'],
        ['Massa kanan bawah', 'm₃', '9,0 kg'],
        ['Percepatan m₂ terhadap tanah', 'a₂', '0 m/s²'],
        ['Massa kiri atas', 'm₁', 'Dicari (kg)'],
      ],
    },
    questionPrompt:
      'Pada sistem dua katrol seperti gambar Soal No. 8, diketahui $m_2 = 3{,}0\\text{ kg}$ dan $m_3 = 9{,}0\\text{ kg}$. Semua katrol licin tak bermassa dan tali tak bermassa tak dapat mulur. Berapakah massa $m_1$ (dalam satuan $\\text{kg}$) agar sesaat setelah sistem dilepaskan dari keadaan diam, massa $m_2$ tetap **diam terhadap tanah** ($a_2 = 0$)?',
    unit: 'kg',
    expectedAnswer: 4.5,
    expectedFormatted: '4,5',
    animation: {
      type: 'double',
      m1: 4.5,
      m2: 3.0,
      m3: 9.0,
      g: 10,
      a1Display: 3.333,
      a2Display: 0.0,
      a3Display: 6.667,
      aPulleyBottomDown: 3.333,
      t1Value: 60.0,
      t2Value: 30.0,
      equationsTimeline: [
        {
          phaseLabel: 'Tahap 1 · Syarat m₂ Diam',
          tex: 'a_2 = 0 \\implies T_2 = m_2 g = 3{,}0g \\implies T_1 = 6{,}0g',
          caption: 'Agar m₂ diam, tegangan tali bawah harus tepat mengimbangi berat m₂.',
        },
        {
          phaseLabel: 'Tahap 2 · Gerak m₃ & Katrol P₂',
          tex: 'a_3 = g - \\frac{3g}{9} = \\frac{2}{3}g \\implies a_p = \\frac{0 + a_3}{2} = \\frac{1}{3}g',
          caption: 'Katrol P₂ turun dengan percepatan g/3 sehingga m₁ naik dengan g/3.',
        },
        {
          phaseLabel: 'Tahap 3 · Nilai Massa m₁',
          tex: '6{,}0g - m_1 g = m_1\\left(\\frac{1}{3}g\\right) \\implies m_1 = \\frac{18}{4} = 4{,}5\\text{ kg}',
          caption: 'Tepat saat m₁ = 4,5 kg, m₂ tetap diam di posisinya.',
        },
      ],
    },
    fbdObjects: [
      {
        id: 'm2',
        name: 'Massa m₂ (Diam: a₂ = 0)',
        massLabel: 'm₂ = 3,0 kg',
        axesLabel: '+y ke atas',
        vectors: [
          {
            id: 'T2',
            label: 'T₂',
            directionDeg: 90,
            magnitudeRel: 0.9,
            color: '#db2777',
            formulaLabel: 'T₂ = 3,0g',
            explanation: 'Tegangan tali tepat mengimbangi berat m₂.',
          },
          {
            id: 'W2',
            label: 'm₂ g',
            directionDeg: 270,
            magnitudeRel: 0.9,
            color: '#0f172a',
            formulaLabel: 'm₂ g = 3,0g',
            explanation: 'Gaya berat m₂ seimbang dengan T₂ sehingga a₂ = 0.',
          },
        ],
        mathRelation: 'T_2 - m_2 g = 0 \\implies T_2 = m_2 g',
      },
      {
        id: 'm1',
        name: 'Massa m₁ (Dicari)',
        massLabel: 'm₁ = 4,5 kg',
        axesLabel: '+y ke atas',
        vectors: [
          {
            id: 'T1',
            label: 'T₁',
            directionDeg: 90,
            magnitudeRel: 1.2,
            color: '#db2777',
            formulaLabel: 'T₁ = 2T₂ = 6,0g',
            explanation: 'Tegangan tali atas menarik m₁ ke atas.',
          },
          {
            id: 'W1',
            label: 'm₁ g',
            directionDeg: 270,
            magnitudeRel: 0.9,
            color: '#0f172a',
            formulaLabel: 'm₁ g = 4,5g',
            explanation: 'Berat m₁ ke bawah.',
          },
        ],
        mathRelation: 'T_1 - m_1 g = m_1 a_1',
      },
    ],
    pembahasan: {
      memahamiPersoalan:
        'Agar $m_2$ diam terhadap tanah ($a_2 = 0$), tidak berarti seluruh sistem diam! Karena $m_3 > m_2$, massa $m_3$ tetap jatuh dan katrol bawah tetap turun sambil memutar tali sehingga tali di sisi $m_2$ terulur ke atas dengan laju yang persis mengimbangi turunnya katrol.',
      identifikasiInformasi: {
        diketahui: ['$m_2 = 3{,}0\\text{ kg}$', '$m_3 = 9{,}0\\text{ kg}$', '$a_2 = 0$'],
        ditanyakan: 'Massa $m_1$ (dalam $\\text{kg}$)',
        asumsiFisika: ['Katrol licin tak bermassa ($T_1 = 2T_2$), tali tak mulur.'],
        batasanSistem: ['Kondisi berlaku sesaat setelah sistem dilepaskan dari keadaan diam.'],
      },
      visualisasiFisika:
        'Pada $m_2$, dua panah gaya ($T_2$ ke atas dan $m_2 g$ ke bawah) memiliki panjang yang sama persis. Pada $m_3$, gaya berat jauh melebihi $T_2$.',
      analisisKonsep:
        'Mulai dari syarat kesetimbangan $m_2$ untuk mengunci nilai $T_2$ dan $T_1$, lalu cari percepatan $m_3$, $P_2$, dan $m_1$ dari kendala tali.',
      persamaanDasar: [
        'T_2 = m_2 g \\quad ; \\quad T_1 = 2T_2 = 2m_2 g',
        'm_3 g - T_2 = m_3 a_3',
        'a_2 + a_3 = 2a_p = 2a_1',
        'T_1 - m_1 g = m_1 a_1',
      ],
      penurunanMatematis: [
        'Substitusi $T_2 = m_2 g$ ke persamaan $m_3$: $a_3 = g\\left(1 - \\frac{m_2}{m_3}\\right)$.',
        'Karena $a_2 = 0$, kendala tali memberikan: $a_1 = a_p = \\frac{a_3}{2} = \\frac{g}{2}\\left(1 - \\frac{m_2}{m_3}\\right)$.',
        'Masukkan ke persamaan $m_1$: $2m_2 g - m_1 g = m_1 a_1 \\implies 2m_2 = m_1\\left(1 + \\frac{1}{2} - \\frac{m_2}{2m_3}\\right)$.',
      ],
      substitusiAngka: [
        'a_3 = g\\left(1 - \\frac{3{,}0}{9{,}0}\\right) = \\frac{2}{3}g \\implies a_1 = \\frac{1}{3}g',
        '6{,}0 g - m_1 g = m_1 \\left(\\frac{1}{3}g\\right)',
      ],
      perhitungan: ['6{,}0 = \\frac{4}{3} m_1 \\implies m_1 = \\frac{18{,}0}{4} = 4{,}5\\text{ kg}'],
      pembulatan: 'Hasil eksak satu desimal adalah $4{,}5$.',
      kesimpulan: 'Massa $m_1$ yang diperlukan agar $m_2$ diam terhadap tanah adalah **4,5** kg.',
      insightOlimpiade:
        'Bisa juga langsung memakai rumus $T_2$ dari Soal No. 8: $T_2 = \\frac{4g}{\\frac{4}{m_1} + \\frac{1}{3} + \\frac{1}{9}} = 3g \\implies \\frac{4}{m_1} + \\frac{4}{9} = \\frac{4}{3} \\implies \\frac{4}{m_1} = \\frac{8}{9} \\implies m_1 = 4{,}5\\text{ kg}$!',
      kesalahanUmum:
        'Mengira agar $m_2$ diam maka seluruh sistem harus seimbang ($m_1 = m_{\\text{eff}}$), padahal jika seluruh sistem diam maka $T_2 = \\frac{2m_2 m_3}{m_2 + m_3}g \\neq m_2 g$.',
    },
    narrationStimulus:
      'Soal enam. Pada sistem dua katrol seperti soal nomor delapan, diketahui m dua tiga koma nol kilogram dan m tiga sembilan koma nol kilogram. Berapakah massa m satu agar sesaat setelah sistem dilepaskan dari diam, massa m dua tetap diam terhadap tanah?',
    narrationFbd:
      'Karena m dua harus diam terhadap tanah, pada diagram gaya bebas m dua, tegangan T dua ke atas harus tepat sama dengan berat m dua g ke bawah. Akibatnya T satu sama dengan dua kali berat m dua.',
    narrationPembahasan:
      'Pembahasan soal enam. Agar m dua diam, T dua harus sama dengan tiga g sehingga T satu enam g. Untuk m tiga sebesar sembilan kilogram, percepatan ke bawah m tiga menjadi g dikurangi tiga g per sembilan, yaitu dua pertiga g. Dari kendala tali, katrol bawah turun dan m satu naik sebesar setengahnya, yaitu sepertiga g. Akhirnya dari persamaan gerak m satu, enam g dikurangi m satu g sama dengan m satu dikali sepertiga g, memberikan m satu sama dengan empat koma lima kilogram.',
  },
  {
    id: 7,
    code: 'Soal 7',
    title: 'Sistem Katrol No. 8 di Dalam Lift yang Dipercepat',
    tier: 'Analisis Fenomena Tingkat Menengah',
    tierRange: 'Soal 7–9',
    conceptTested: 'Prinsip Ekuivalensi dan kerangka acuan non-inersia ($g_{\\text{eff}} = g + a_{\\text{lift}}$)',
    recommendedTheoryId: 7,
    stimulusSummary:
      'Seluruh rangkaian katrol Soal No. 8 dipasang di langit-langit sebuah lift yang sedang melaju dipercepat ke atas.',
    stimulusTable: {
      caption: 'Parameter Sistem dalam Lift',
      headers: ['Besaran', 'Simbol', 'Nilai'],
      rows: [
        ['Massa benda-benda', 'm₁, m₂, m₃', '2,0 kg; 3,0 kg; 6,0 kg'],
        ['Percepatan lift ke atas', 'a_lift', '2,0 m/s²'],
        ['Percepatan gravitasi', 'g', '10 m/s²'],
      ],
    },
    questionPrompt:
      'Sistem katrol majemuk identik dengan Soal No. 8 ($m_1 = 2{,}0\\text{ kg}$, $m_2 = 3{,}0\\text{ kg}$, dan $m_3 = 6{,}0\\text{ kg}$) dipasang pada atap di dalam sebuah lift yang sedang bergerak dipercepat ke **atas** sebesar $a_{\\text{lift}} = 2{,}0\\text{ m/s}^2$. Jika $g = 10\\text{ m/s}^2$, tentukan besar tegangan tali atas $T_1$ (dalam satuan Newton).',
    unit: 'N',
    expectedAnswer: 38.4,
    expectedFormatted: '38,4',
    animation: {
      type: 'lift',
      m1: 2.0,
      m2: 3.0,
      m3: 6.0,
      g: 10,
      aLift: 2.0,
      a1Display: 7.2,
      a2Display: 5.6,
      a3Display: 8.8,
      aPulleyBottomDown: 7.2,
      t1Value: 38.4,
      t2Value: 19.2,
      equationsTimeline: [
        {
          phaseLabel: 'Tahap 1 · Gravitasi Efektif Lift',
          tex: 'g_{\\text{eff}} = g + a_{\\text{lift}} = 10 + 2{,}0 = 12{,}0\\text{ m/s}^2',
          caption: 'Lift naik dipercepat menambah gaya fiktif ke bawah sehingga g_eff = 12,0 m/s².',
        },
        {
          phaseLabel: 'Tahap 2 · Solusi Skala Soal No. 8',
          tex: 'a_{1,\\text{rel lift}} = 0{,}6\\,g_{\\text{eff}} = 7{,}2\\text{ m/s}^2',
          caption: 'Relatif terhadap atap lift, percepatan m₁ ke atas adalah 0,6 kali g_eff.',
        },
        {
          phaseLabel: 'Tahap 3 · Tegangan Tali T₁',
          tex: 'T_1 = 3{,}2\\,g_{\\text{eff}} = 3{,}2 \\times 12{,}0 = 38{,}4\\text{ N}',
          caption: 'Tegangan tali atas menjadi 38,4 N (naik 20% dibanding saat lift diam).',
        },
      ],
    },
    fbdObjects: [
      {
        id: 'm1_lift',
        name: 'Massa m₁ (Kerangka Lift)',
        massLabel: 'm₁ = 2,0 kg',
        axesLabel: '+y ke atas relatif atap lift',
        vectors: [
          {
            id: 'T1',
            label: 'T₁',
            directionDeg: 90,
            magnitudeRel: 1.2,
            color: '#db2777',
            formulaLabel: 'T₁ = 38,4 N',
            explanation: 'Tegangan tali atas menarik m₁.',
          },
          {
            id: 'W1',
            label: 'm₁ g',
            directionDeg: 270,
            magnitudeRel: 0.65,
            color: '#0f172a',
            formulaLabel: 'm₁ g = 20,0 N',
            explanation: 'Berat gravitasi nyata.',
          },
          {
            id: 'Fpseudo',
            label: 'm₁ a_lift (fiktif)',
            directionDeg: 270,
            magnitudeRel: 0.25,
            color: '#9333ea',
            formulaLabel: 'm₁ a_lift = 4,0 N',
            explanation: 'Gaya fiktif ke bawah akibat lift berakselerasi ke atas.',
          },
        ],
        mathRelation: 'T_1 - m_1(g + a_{\\text{lift}}) = m_1 a_{1,\\text{rel}}',
      },
    ],
    pembahasan: {
      memahamiPersoalan:
        'Lift yang dipercepat ke atas dengan $a_{\\text{lift}}$ membuat seluruh benda di dalamnya merasakan tambahan gaya inersia (gaya fiktif) ke bawah sebesar $m a_{\\text{lift}}$. Secara lokal di dalam lift, seluruh fenomena fisika berlangsung seolah-olah gravitasi bernilai $g_{\\text{eff}} = g + a_{\\text{lift}}$.',
      identifikasiInformasi: {
        diketahui: [
          '$m_1 = 2{,}0\\text{ kg}$, $m_2 = 3{,}0\\text{ kg}$, $m_3 = 6{,}0\\text{ kg}$',
          '$a_{\\text{lift}} = 2{,}0\\text{ m/s}^2$ (ke atas)',
          '$g = 10\\text{ m/s}^2$',
        ],
        ditanyakan: 'Tegangan tali atas $T_1$ (dalam Newton)',
        asumsiFisika: ['Katrol dan tali licin tak bermassa; percepatan lift konstan ke atas.'],
        batasanSistem: ['Gerak diamati sebelum beban mencapai ujung tali.'],
      },
      visualisasiFisika:
        'Dalam kerangka lift, setiap gaya berat $m_i g$ bertambah gaya fiktif $m_i a_{\\text{lift}}$ ke bawah. Dalam kerangka tanah (inersia), percepatan total $m_1$ ke atas adalah $a_{1,\\text{tanah}} = a_{1,\\text{rel}} + a_{\\text{lift}}$.',
      analisisKonsep:
        'Gunakan Prinsip Ekuivalensi Einstein untuk kerangka dipercepat: ganti $g$ pada seluruh hasil Soal No. 8 dengan $g_{\\text{eff}} = g + a_{\\text{lift}}$.',
      persamaanDasar: [
        'g_{\\text{eff}} = g + a_{\\text{lift}}',
        'T_2 = \\frac{4 g_{\\text{eff}}}{\\frac{4}{m_1} + \\frac{1}{m_2} + \\frac{1}{m_3}} \\quad ; \\quad T_1 = 2T_2',
      ],
      penurunanMatematis: [
        'Dari hasil Soal No. 8 untuk $m_1 = 2$, $m_2 = 3$, $m_3 = 6$:',
        'T_2 = 1{,}6\\,g_{\\text{eff}} \\implies T_1 = 3{,}2\\,g_{\\text{eff}}',
        'Substitusi $g_{\\text{eff}} = g + a_{\\text{lift}}$:',
        'T_1 = 3{,}2(g + a_{\\text{lift}})',
      ],
      substitusiAngka: ['T_1 = 3{,}2(10 + 2{,}0)'],
      perhitungan: ['T_1 = 3{,}2 \\times 12{,}0 = 38{,}4\\text{ N}'],
      pembulatan: 'Hasil eksak satu desimal adalah $38{,}4$.',
      kesimpulan: 'Besar tegangan tali atas $T_1$ adalah **38,4** N.',
      insightOlimpiade:
        'Verifikasi dari kerangka inersia tanah: $a_{1,\\text{rel}} = 0{,}6(12) = 7{,}2\\text{ m/s}^2$, sehingga percepatan mutlak $m_1$ terhadap tanah adalah $7{,}2 + 2{,}0 = 9{,}2\\text{ m/s}^2$ ke atas. Maka $T_1 = m_1(g + a_{1,\\text{tanah}}) = 2(10 + 9{,}2) = 38{,}4\\text{ N}$. Sama persis!',
      kesalahanUmum:
        'Mengurangi gravitasi menjadi $g - a_{\\text{lift}}$ saat lift dipercepat ke atas, atau lupa menambahkan $a_{\\text{lift}}$ pada $a_{1,\\text{tanah}}$ saat memakai kerangka tanah.',
    },
    narrationStimulus:
      'Soal tujuh. Sistem katrol majemuk identik dengan soal nomor delapan dipasang pada atap di dalam lift yang bergerak dipercepat ke atas sebesar dua koma nol meter per sekon kuadrat. Jika g sama dengan sepuluh meter per sekon kuadrat, tentukan besar tegangan tali atas T satu dalam satuan Newton.',
    narrationFbd:
      'Di dalam kerangka lift yang dipercepat ke atas, setiap massa mengalami gaya fiktif ke bawah sebesar m kali a lift, sehingga berat efektif seluruh beban meningkat dengan gravitasi efektif dua belas meter per sekon kuadrat.',
    narrationPembahasan:
      'Pembahasan soal tujuh. Gravitasi efektif di dalam lift adalah sepuluh ditambah dua, yaitu dua belas meter per sekon kuadrat. Dari rumus soal nomor delapan, tegangan tali atas T satu sama dengan tiga koma dua dikalikan g efektif. Dengan mengalikan tiga koma dua dengan dua belas, diperoleh tiga puluh delapan koma empat Newton.',
  },
  {
    id: 8,
    code: 'Soal 8',
    title: 'Katrol Atas Bermassa (Inersia Rotasi Silinder Pejal)',
    tier: 'Analisis Fenomena Tingkat Menengah',
    tierRange: 'Soal 7–9',
    conceptTested: 'Menghilangkan asumsi "katrol atas tak bermassa": dinamika rotasi $\\sum \\tau = I\\alpha$',
    recommendedTheoryId: 7,
    stimulusSummary:
      'Modifikasi langsung Soal No. 8: katrol tetap atas kini bermassa $M_k = 2{,}0\\text{ kg}$ berbentuk silinder pejal yang berotasi tanpa slip terhadap tali.',
    stimulusTable: {
      caption: 'Parameter Katrol Atas Bermassa',
      headers: ['Besaran', 'Simbol', 'Nilai'],
      rows: [
        ['Massa beban-beban', 'm₁, m₂, m₃', '2,0 kg; 3,0 kg; 6,0 kg'],
        ['Massa katrol atas (silinder pejal)', 'M_k', '2,0 kg (I = ½M_k R²)'],
        ['Massa katrol bawah', 'mₚ', '0 kg (tetap tak bermassa)'],
        ['Percepatan gravitasi', 'g', '10 m/s²'],
      ],
    },
    questionPrompt:
      'Pada sistem Soal No. 8 ($m_1 = 2{,}0\\text{ kg}$, $m_2 = 3{,}0\\text{ kg}$, $m_3 = 6{,}0\\text{ kg}$, $g = 10\\text{ m/s}^2$), asumsi katrol atas tak bermassa kini diubah: katrol atas berupa **silinder pejal homogen** bermassa $M_k = 2{,}0\\text{ kg}$ ($I = \\frac{1}{2} M_k R^2$) yang berputar tanpa slip terhadap tali, sedangkan katrol bawah tetap licin tak bermassa. Tentukan besar percepatan $m_1$ (dalam satuan $\\text{m/s}^2$).',
    unit: 'm/s²',
    expectedAnswer: 5.5,
    expectedFormatted: '5,5',
    animation: {
      type: 'double',
      m1: 2.0,
      m2: 3.0,
      m3: 6.0,
      g: 10,
      mPulleyTop: 2.0,
      a1Display: 5.4545,
      a2Display: 4.8485,
      a3Display: 6.0606,
      aPulleyBottomDown: 5.4545,
      t1Value: 30.91,
      t2Value: 18.18,
      equationsTimeline: [
        {
          phaseLabel: 'Tahap 1 · Tegangan Kiri ≠ Kanan',
          tex: '(T_{1R} - T_{1L})R = I\\alpha = \\frac{1}{2}M_k R^2\\left(\\frac{a_1}{R}\\right) \\implies T_{1R} - T_{1L} = \\frac{1}{2}M_k a_1',
          caption: 'Karena katrol atas bermassa, dibutuhkan selisih tegangan untuk memutarnya.',
        },
        {
          phaseLabel: 'Tahap 2 · Subsistem Bawah',
          tex: 'T_{1R} = m_{\\text{eff}}(g - a_1) = 8{,}0(10 - a_1)',
          caption: 'Katrol bawah tetap tak bermassa sehingga T₁R = 2T₂ dengan m_eff = 8,0 kg.',
        },
        {
          phaseLabel: 'Tahap 3 · Nilai Percepatan a₁',
          tex: '20 + 3a_1 = 80 - 8a_1 \\implies a_1 = \\frac{60}{11} \\approx 5{,}5\\text{ m/s}^2',
          caption: 'Inersia rotasi katrol atas memperkecil percepatan dari 6,0 menjadi 5,5 m/s².',
        },
      ],
    },
    fbdObjects: [
      {
        id: 'P1_massive',
        name: 'Katrol Atas P₁ (Silinder Pejal Mₖ = 2 kg)',
        massLabel: 'I = ½ Mₖ R²',
        axesLabel: 'Rotasi searah jarum jam (+)',
        vectors: [
          {
            id: 'T1R',
            label: 'T₁ kanan',
            directionDeg: 270,
            magnitudeRel: 1.2,
            color: '#be185d',
            formulaLabel: 'T₁R = 36,4 N',
            explanation: 'Tarikan tali kanan (sisi katrol bawah) memberi torka positif searah jarum jam.',
          },
          {
            id: 'T1L',
            label: 'T₁ kiri',
            directionDeg: 270,
            magnitudeRel: 0.95,
            color: '#db2777',
            formulaLabel: 'T₁L = 30,9 N',
            explanation: 'Tarikan tali kiri (sisi m₁) memberi torka penghambat berlawanan jarum jam.',
          },
          {
            id: 'Fporos',
            label: 'F_poros',
            directionDeg: 90,
            magnitudeRel: 1.35,
            color: '#0f172a',
            formulaLabel: 'F_poros = T₁L + T₁R + Mₖ g',
            explanation: 'Gaya penyangga atap tepat melewati poros sehingga torsinya nol.',
          },
        ],
        mathRelation: '(T_{1R} - T_{1L})R = \\frac{1}{2}M_k R^2 \\frac{a_1}{R}',
      },
      {
        id: 'm1',
        name: 'Massa m₁ (2,0 kg)',
        massLabel: 'm₁ = 2,0 kg',
        axesLabel: '+y ke atas',
        vectors: [
          {
            id: 'T1L_m1',
            label: 'T₁ kiri',
            directionDeg: 90,
            magnitudeRel: 1.1,
            color: '#db2777',
            formulaLabel: 'T₁L = 30,9 N',
            explanation: 'Tegangan tali kiri menarik m₁ ke atas.',
          },
          {
            id: 'W1',
            label: 'm₁ g',
            directionDeg: 270,
            magnitudeRel: 0.72,
            color: '#0f172a',
            formulaLabel: 'm₁ g = 20,0 N',
            explanation: 'Berat m₁ ke bawah.',
          },
        ],
        mathRelation: 'T_{1L} - m_1 g = m_1 a_1',
      },
    ],
    pembahasan: {
      memahamiPersoalan:
        'Pada Soal No. 8 asli, kedua katrol diasumsikan tak bermassa. Ketika katrol atas memiliki massa $M_k$ dan berputar tanpa slip, tali di sisi kiri dan sisi kanan katrol atas memiliki tegangan yang **berbeda** ($T_{1R} > T_{1L}$) untuk menghasilkan torka pemutar katrol.',
      identifikasiInformasi: {
        diketahui: [
          '$m_1 = 2{,}0\\text{ kg}$, $m_2 = 3{,}0\\text{ kg}$, $m_3 = 6{,}0\\text{ kg}$',
          'Massa katrol atas silinder pejal $M_k = 2{,}0\\text{ kg}$, $I = \\frac{1}{2}M_k R^2$',
          '$g = 10\\text{ m/s}^2$',
        ],
        ditanyakan: 'Besar percepatan $m_1$ (dalam $\\text{m/s}^2$)',
        asumsiFisika: [
          'Tali tidak slip terhadap katrol atas sehingga $\\alpha = a_1 / R$.',
          'Katrol bawah tetap tak bermassa sehingga $T_{1R} = 2T_2$.',
        ],
        batasanSistem: ['Gesekan pada poros katrol atas diabaikan.'],
      },
      visualisasiFisika:
        'Katrol atas berotasi searah jarum jam saat $m_1$ naik dan $P_2$ turun. Selisih $(T_{1R} - T_{1L})R$ menjadi torka penggerak rotasi katrol atas.',
      analisisKonsep:
        'Gabungkan dinamika rotasi katrol atas $\\sum \\tau = I \\alpha$ dengan massa efektif katrol bawah $m_{\\text{eff}} = \\frac{4 m_2 m_3}{m_2 + m_3} = 8{,}0\\text{ kg}$.',
      persamaanDasar: [
        'T_{1L} - m_1 g = m_1 a_1',
        '(T_{1R} - T_{1L}) R = \\frac{1}{2} M_k R^2 \\left(\\frac{a_1}{R}\\right) \\implies T_{1R} - T_{1L} = \\frac{1}{2} M_k a_1',
        'T_{1R} = m_{\\text{eff}}(g - a_1)',
      ],
      penurunanMatematis: [
        'Dari persamaan katrol dan $m_1$: $T_{1R} = m_1 g + \\left(m_1 + \\frac{1}{2}M_k\\right)a_1$.',
        'Samakan dengan $T_{1R} = m_{\\text{eff}}(g - a_1)$:',
        'm_1 g + \\left(m_1 + \\frac{1}{2}M_k\\right)a_1 = m_{\\text{eff}} g - m_{\\text{eff}} a_1',
        'a_1 = \\frac{m_{\\text{eff}} - m_1}{m_{\\text{eff}} + m_1 + \\frac{1}{2}M_k} g',
      ],
      substitusiAngka: [
        'm_{\\text{eff}} = \\frac{4 \\times 3{,}0 \\times 6{,}0}{3{,}0 + 6{,}0} = 8{,}0\\text{ kg}',
        'a_1 = \\frac{8{,}0 - 2{,}0}{8{,}0 + 2{,}0 + \\frac{1}{2}(2{,}0)} \\times 10',
      ],
      perhitungan: ['a_1 = \\frac{6{,}0}{11{,}0} \\times 10 = \\frac{60}{11} = 5{,}4545...\\text{ m/s}^2'],
      pembulatan: 'Angka kedua di belakang koma adalah $5$ (tepatnya $5{,}4545...$), sehingga dibulatkan ke atas menjadi $5{,}5$.',
      kesimpulan: 'Besar percepatan $m_1$ adalah **5,5** $\\text{m/s}^2$.',
      insightOlimpiade:
        'Setiap katrol tetap berbentuk silinder pejal bermassa $M_k$ yang berputar tanpa slip hanya menambah inersia sistem sebesar $\\frac{1}{2}M_k$ pada penyebut rumus percepatan, tanpa menambah gaya berat penggerak pada pembilang!',
      kesalahanUmum:
        'Tetap menyamakan $T_{1L} = T_{1R}$ meski katrol atas bermassa, atau memasukkan $M_k g$ sebagai gaya tarik ke bawah pada pembilang.',
    },
    narrationStimulus:
      'Soal delapan. Pada sistem soal nomor delapan dengan g sama dengan sepuluh meter per sekon kuadrat, katrol atas diganti menjadi silinder pejal homogen bermassa dua koma nol kilogram yang berotasi tanpa slip, sedangkan katrol bawah tetap tak bermassa. Tentukan besar percepatan m satu.',
    narrationFbd:
      'Karena katrol atas kini memiliki momen inersia, tegangan tali di kanan katrol atas harus lebih besar daripada tegangan tali di kiri katrol atas agar menghasilkan torka rotasi searah jarum jam.',
    narrationPembahasan:
      'Pembahasan soal delapan. Dari dinamika rotasi katrol atas, selisih tegangan kanan dan kiri sama dengan setengah M k dikali a satu. Ini setara dengan menambah massa inersia sebesar setengah kali dua, yaitu satu kilogram, pada penyebut rumus percepatan tanpa mengubah pembilangnya. Dengan massa efektif bawah tetap delapan kilogram, percepatan a satu sama dengan delapan kurang dua dibagi delapan tambah dua tambah satu dikali sepuluh, yaitu enam puluh per sebelas atau lima koma empat lima empat, yang dibulatkan menjadi lima koma lima meter per sekon kuadrat.',
  },
];
