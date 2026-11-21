import { PhysicsProblem } from './problemsTypes';

export const PROBLEMS_PART_2: PhysicsProblem[] = [
  {
    id: 9,
    code: 'Soal 9',
    title: 'Pendekatan Kekekalan Energi Mekanik pada Sistem No. 8',
    tier: 'Analisis Fenomena Tingkat Menengah',
    tierRange: 'Soal 7–9',
    conceptTested: 'Kekekalan Energi Mekanik dan perbandingan perpindahan/kelajuan pada sistem katrol majemuk',
    recommendedTheoryId: 10,
    stimulusSummary:
      'Sistem katrol Soal No. 8 dilepaskan dari keadaan diam hingga $m_1$ naik sejauh $h = 1{,}5\\text{ m}$; kelajuan beban $m_3$ dihitung melalui penurunan energi potensial.',
    stimulusTable: {
      caption: 'Data Gerak & Energi Sistem No. 8',
      headers: ['Besaran', 'Simbol', 'Nilai'],
      rows: [
        ['Massa sistem', 'm₁, m₂, m₃', '2,0 kg; 3,0 kg; 6,0 kg'],
        ['Kenaikan posisi m₁', 'h', '1,5 m (dari diam)'],
        ['Percepatan gravitasi', 'g', '10 m/s²'],
      ],
    },
    questionPrompt:
      'Sistem katrol identik dengan Soal No. 8 ($m_1 = 2{,}0\\text{ kg}$, $m_2 = 3{,}0\\text{ kg}$, $m_3 = 6{,}0\\text{ kg}$, kedua katrol dan tali licin tak bermassa, $g = 10\\text{ m/s}^2$) dilepaskan dari keadaan diam. Tepat ketika massa $m_1$ telah naik setinggi $h = 1{,}5\\text{ m}$, tentukan kelajuan massa $m_3$ pada saat tersebut (dalam satuan $\\text{m/s}$).',
    unit: 'm/s',
    expectedAnswer: 5.2,
    expectedFormatted: '5,2',
    animation: {
      type: 'double',
      m1: 2.0,
      m2: 3.0,
      m3: 6.0,
      g: 10,
      a1Display: 6.0,
      a2Display: 4.667,
      a3Display: 7.333,
      aPulleyBottomDown: 6.0,
      t1Value: 32.0,
      t2Value: 16.0,
      equationsTimeline: [
        {
          phaseLabel: 'Tahap 1 · Rasio Perpindahan & Kecepatan',
          tex: 'a_1 : a_2 : a_3 = \\frac{9}{15} : \\frac{7}{15} : \\frac{11}{15} = 9 : 7 : 11',
          caption: 'Dari diam dengan percepatan konstan, jarak dan laju berbanding lurus dengan percepatan.',
        },
        {
          phaseLabel: 'Tahap 2 · Kekekalan Energi Mekanik',
          tex: 'm_2 g \\Delta y_2 + m_3 g \\Delta y_3 - m_1 g h = \\frac{1}{2}m_1 v_1^2 + \\frac{1}{2}m_2 v_2^2 + \\frac{1}{2}m_3 v_3^2',
          caption: 'Penurunan energi potensial total sistem diubah menjadi energi kinetik ketiga massa.',
        },
        {
          phaseLabel: 'Tahap 3 · Kelajuan m₃',
          tex: '115\\text{ J} = \\frac{1}{2}v_3^2\\left(\\frac{1035}{121}\\right) \\implies v_3 = \\frac{11\\sqrt{2}}{3} \\approx 5{,}2\\text{ m/s}',
          caption: 'Saat m₁ naik 1,5 m (t = √0,5 s), kelajuan m₃ mencapai 5,2 m/s.',
        },
      ],
    },
    fbdObjects: [
      {
        id: 'energi_sistem',
        name: 'Keseimbangan Kerja & Energi Sistem',
        massLabel: 'ΔE_M = 0',
        axesLabel: 'Kerja gaya dalam (tegangan tali) saling meniadakan',
        vectors: [
          {
            id: 'W3',
            label: 'm₃g (+usaha)',
            directionDeg: 270,
            magnitudeRel: 1.3,
            color: '#be185d',
            formulaLabel: 'W₃ = 60 N · Δy₃ = 110 J',
            explanation: 'm₃ turun 11/6 m sehingga menyumbang energi 110 J.',
          },
          {
            id: 'W2',
            label: 'm₂g (+usaha)',
            directionDeg: 270,
            magnitudeRel: 0.85,
            color: '#0284c7',
            formulaLabel: 'W₂ = 30 N · Δy₂ = 35 J',
            explanation: 'm₂ turun 7/6 m sehingga menyumbang energi 35 J.',
          },
          {
            id: 'W1',
            label: 'm₁g (−usaha)',
            directionDeg: 270,
            magnitudeRel: 0.65,
            color: '#0f172a',
            formulaLabel: 'W₁ = −20 N · 1,5 m = −30 J',
            explanation: 'm₁ naik 1,5 m sehingga menyerap energi potensial 30 J.',
          },
        ],
        mathRelation: '\\sum W_{\\text{gravitasi}} = 110 + 35 - 30 = 115\\text{ J} = \\Delta E_k',
      },
    ],
    pembahasan: {
      memahamiPersoalan:
        'Karena seluruh katrol licin dan tali tak mulur, tidak ada energi yang hilang menjadi panas. Selisih penurunan energi potensial gravitasi ketiga balok berubah seluruhnya menjadi energi kinetik total sistem.',
      identifikasiInformasi: {
        diketahui: [
          '$m_1 = 2{,}0\\text{ kg}$, $m_2 = 3{,}0\\text{ kg}$, $m_3 = 6{,}0\\text{ kg}$',
          'Kenaikan $m_1$: $h = 1{,}5\\text{ m}$ ($v_0 = 0$)',
          '$g = 10\\text{ m/s}^2$',
        ],
        ditanyakan: 'Kelajuan $m_3$ saat $m_1$ naik $1{,}5\\text{ m}$ (dalam $\\text{m/s}$)',
        asumsiFisika: ['Sistem dilepas dari diam, tanpa gesekan, tali tetap tegang.'],
        batasanSistem: ['Benda bergerak dalam selang waktu sebelum menyentuh katrol/lantai.'],
      },
      visualisasiFisika:
        'Saat $m_1$ naik $1{,}5\\text{ m}$, katrol $P_2$ turun $1{,}5\\text{ m}$. Karena $a_2 = \\frac{7}{15}g$ dan $a_3 = \\frac{11}{15}g$, $m_2$ turun $\\frac{7}{6}\\text{ m}$ dan $m_3$ turun $\\frac{11}{6}\\text{ m}$.',
      analisisKonsep:
        'Dapat diselesaikan dengan Kinematika GLBB ($t = \\sqrt{2h/a_1}$, lalu $v_3 = a_3 t$) sekaligus diverifikasi dengan Kekekalan Energi Mekanik ($-\\Delta E_p = \\Delta E_k$).',
      persamaanDasar: [
        'a_1 = 0{,}6 g = 6{,}0\\text{ m/s}^2',
        'a_3 = g - \\frac{T_2}{m_3} = 10 - \\frac{16}{6} = \\frac{22}{3}\\text{ m/s}^2',
        'h = \\frac{1}{2} a_1 t^2 \\quad ; \\quad v_3 = a_3 t',
      ],
      penurunanMatematis: [
        'Dari rumus GLBB untuk $m_1$: $t = \\sqrt{\\frac{2h}{a_1}}$.',
        'Substitusikan ke $v_3 = a_3 t$: $v_3 = a_3 \\sqrt{\\frac{2h}{a_1}}$.',
        'Cek Energi: $v_1 : v_2 : v_3 = 9 : 7 : 11$, sehingga $\\Delta E_k = \\frac{1}{2}v_3^2\\left[2\\left(\\frac{9}{11}\\right)^2 + 3\\left(\\frac{7}{11}\\right)^2 + 6\\right] = \\frac{1035}{242}v_3^2 = 115\\text{ J}$.',
      ],
      substitusiAngka: [
        't^2 = \\frac{2(1{,}5)}{6{,}0} = 0{,}5\\text{ s}^2',
        'v_3 = \\frac{22}{3} \\sqrt{0{,}5} = \\frac{22}{3\\sqrt{2}} = \\frac{11\\sqrt{2}}{3}',
      ],
      perhitungan: [
        'v_3 = \\frac{11 \\times 1{,}41421...}{3} = 5{,}18545...\\text{ m/s}',
      ],
      pembulatan: 'Angka kedua di belakang koma adalah $8 \\ge 5$, sehingga $5{,}185...$ dibulatkan ke atas menjadi $5{,}2$.',
      kesimpulan: 'Kelajuan massa $m_3$ pada saat tersebut adalah **5,2** $\\text{m/s}$.',
      insightOlimpiade:
        'Metode energi mekanik sangat ampuh jika suatu saat percepatan tidak lagi konstan (misal jika ada pegas atau rantai), sementara GLBB lebih cepat untuk sistem tali konstan setelah $a_1$ dan $a_3$ diketahui.',
      kesalahanUmum:
        'Menganggap $v_3 = v_1$, padahal $m_3$ turun jauh lebih cepat daripada naiknya $m_1$ karena $m_3$ ikut terbawa turun oleh katrol $P_2$ sekaligus bergerak turun relatif terhadap $P_2$.',
    },
    narrationStimulus:
      'Soal sembilan. Sistem katrol identik dengan soal nomor delapan dengan g sama dengan sepuluh meter per sekon kuadrat dilepaskan dari keadaan diam. Tepat ketika massa m satu telah naik setinggi satu koma lima meter, tentukan kelajuan massa m tiga pada saat tersebut.',
    narrationFbd:
      'Dari sudut pandang usaha dan energi, gaya tegangan tali adalah gaya internal dengan total usaha nol. Hanya gaya berat m dua dan m tiga yang melakukan usaha positif, sedangkan berat m satu melakukan usaha negatif.',
    narrationPembahasan:
      'Pembahasan soal sembilan. Dari soal nomor delapan dengan g sepuluh, percepatan naik m satu adalah enam meter per sekon kuadrat dan percepatan turun m tiga adalah dua puluh dua per tiga meter per sekon kuadrat. Waktu yang dibutuhkan m satu naik satu koma lima meter memenuhi t kuadrat sama dengan dua kali satu koma lima dibagi enam, yaitu nol koma lima sekon kuadrat. Maka kelajuan m tiga adalah dua puluh dua per tiga dikali akar nol koma lima, yaitu sebelas akar dua per tiga, sama dengan lima koma satu delapan lima, yang dibulatkan menjadi lima koma dua meter per sekon.',
  },
  {
    id: 10,
    code: 'Soal 10',
    title: 'Kombinasi Bidang Miring Kasar & Katrol Majemuk',
    tier: 'HOTS & Kombinasi Prinsip Fisika',
    tierRange: 'Soal 10–12',
    conceptTested: 'Penguraian vektor gaya pada bidang miring, gaya normal, gesekan kinetik, dan katrol majemuk',
    recommendedTheoryId: 11,
    stimulusSummary:
      'Massa $m_1$ tidak lagi menggantung bebas, melainkan diletakkan di atas bidang miring kasar bersudut $\\theta = 37^\\circ$ dengan tali penarik sejajar bidang miring.',
    stimulusTable: {
      caption: 'Parameter Bidang Miring & Katrol Majemuk',
      headers: ['Besaran', 'Simbol', 'Nilai'],
      rows: [
        ['Massa di bidang miring', 'm₁', '5,0 kg'],
        ['Sudut kemiringan & gesekan', 'θ, μ_k', '37° (sin 37°=0,6; cos 37°=0,8), μ_k = 0,25'],
        ['Massa katrol bawah', 'm₂, m₃', '3,0 kg; 6,0 kg'],
        ['Percepatan gravitasi', 'g', '10 m/s²'],
      ],
    },
    questionPrompt:
      'Kini massa $m_1 = 5{,}0\\text{ kg}$ diletakkan di atas sebuah bidang miring kasar dengan sudut kemiringan $\\theta = 37^\\circ$ ($\\sin 37^\\circ = 0{,}6$; $\\cos 37^\\circ = 0{,}8$) dan koefisien gesek kinetik $\\mu_k = 0{,}25$ (diketahui sistem langsung bergerak). Tali atas sejajar bidang miring melewati katrol atas di puncak bidang menuju katrol bergerak yang mengikat $m_2 = 3{,}0\\text{ kg}$ dan $m_3 = 6{,}0\\text{ kg}$. Semua katrol dan tali licin tak bermassa, dan $g = 10\\text{ m/s}^2$. Tentukan besar percepatan $m_1$ menaiki bidang miring (dalam $\\text{m/s}^2$).',
    unit: 'm/s²',
    expectedAnswer: 3.1,
    expectedFormatted: '3,1',
    animation: {
      type: 'incline',
      m1: 5.0,
      m2: 3.0,
      m3: 6.0,
      g: 10,
      thetaDeg: 37,
      muK: 0.25,
      a1Display: 3.0769,
      a2Display: 0.7692,
      a3Display: 5.3846,
      aPulleyBottomDown: 3.0769,
      t1Value: 55.38,
      t2Value: 27.69,
      equationsTimeline: [
        {
          phaseLabel: 'Tahap 1 · Gaya Penghambat di Bidang Miring',
          tex: 'F_{\\text{hambat}} = m_1 g \\sin 37^\\circ + \\mu_k m_1 g \\cos 37^\\circ = 30 + 10 = 40\\text{ N}',
          caption: 'Komponen berat sejajar bidang (30 N) + gaya gesek kinetik (10 N) menahan m₁.',
        },
        {
          phaseLabel: 'Tahap 2 · Tarikan Efektif Katrol Bawah',
          tex: 'm_{\\text{eff}} = \\frac{4(3)(6)}{3+6} = 8{,}0\\text{ kg} \\implies T_1 = 8{,}0(10 - a_1)',
          caption: 'Subsistem katrol bawah menarik tali atas dengan massa efektif 8,0 kg.',
        },
        {
          phaseLabel: 'Tahap 3 · Percepatan Menaiki Bidang',
          tex: '40 + 5a_1 = 80 - 8a_1 \\implies a_1 = \\frac{40}{13} \\approx 3{,}1\\text{ m/s}^2',
          caption: 'Balok m₁ dipercepat menaiki bidang miring sebesar 3,1 m/s².',
        },
      ],
    },
    fbdObjects: [
      {
        id: 'm1_incline',
        name: 'Balok m₁ di Bidang Miring (θ = 37°)',
        massLabel: 'm₁ = 5,0 kg',
        axesLabel: '+x sejajar miring ke atas, +y tegak lurus bidang',
        isInclined: true,
        inclineDeg: 37,
        vectors: [
          {
            id: 'T1',
            label: 'T₁',
            directionDeg: 37,
            magnitudeRel: 1.15,
            color: '#db2777',
            formulaLabel: 'T₁ = 55,4 N',
            explanation: 'Tegangan tali menarik m₁ sejajar bidang miring ke atas.',
          },
          {
            id: 'N',
            label: 'N',
            directionDeg: 127,
            magnitudeRel: 0.85,
            color: '#0284c7',
            formulaLabel: 'N = m₁g cos 37° = 40 N',
            explanation: 'Gaya normal tegak lurus permukaan bidang miring.',
          },
          {
            id: 'fk',
            label: 'f_k',
            directionDeg: 217,
            magnitudeRel: 0.35,
            color: '#d97706',
            formulaLabel: 'f_k = μ_k N = 10 N',
            explanation: 'Gaya gesek kinetik berlawanan arah gerak (sejajar bidang ke bawah).',
          },
          {
            id: 'W1',
            label: 'm₁g',
            directionDeg: 270,
            magnitudeRel: 1.05,
            color: '#0f172a',
            formulaLabel: 'm₁g = 50 N (m₁g sin 37° = 30 N)',
            explanation: 'Gaya berat vertikal ke bawah diuraikan menjadi komponen sejajar & tegak lurus bidang.',
          },
        ],
        mathRelation: 'T_1 - m_1 g \\sin\\theta - \\mu_k m_1 g \\cos\\theta = m_1 a_1',
      },
      {
        id: 'P2',
        name: 'Katrol Bawah P₂',
        massLabel: 'm_eff = 8,0 kg',
        axesLabel: '+y ke bawah',
        vectors: [
          {
            id: 'T1p',
            label: 'T₁',
            directionDeg: 90,
            magnitudeRel: 1.1,
            color: '#db2777',
            formulaLabel: 'T₁ = 55,4 N',
            explanation: 'Tarikan tali atas menahan katrol P₂.',
          },
          {
            id: 'T2a',
            label: 'T₂',
            directionDeg: 270,
            magnitudeRel: 0.55,
            color: '#be185d',
            formulaLabel: 'T₂ = 27,7 N',
            explanation: 'Tegangan tali bawah di sisi m₂.',
          },
          {
            id: 'T2b',
            label: 'T₂',
            directionDeg: 270,
            magnitudeRel: 0.55,
            color: '#be185d',
            formulaLabel: 'T₂ = 27,7 N',
            explanation: 'Tegangan tali bawah di sisi m₃.',
          },
        ],
        mathRelation: 'T_1 = m_{\\text{eff}}(g - a_1)',
      },
    ],
    pembahasan: {
      memahamiPersoalan:
        'Soal ini menggabungkan dinamika bidang miring dengan sistem katrol majemuk Soal No. 8. Gaya penarik di tali atas masih dihasilkan oleh katrol bawah ($m_{\\text{eff}} = 8{,}0\\text{ kg}$), sedangkan gaya penahan pada $m_1$ bukan lagi $m_1 g$ penuh melainkan $m_1 g \\sin 37^\\circ + \\mu_k m_1 g \\cos 37^\\circ$.',
      identifikasiInformasi: {
        diketahui: [
          '$m_1 = 5{,}0\\text{ kg}$ pada bidang miring $\\theta = 37^\\circ$ ($\\sin 37^\\circ = 0{,}6; \\cos 37^\\circ = 0{,}8$)',
          'Koefisien gesek kinetik $\\mu_k = 0{,}25$',
          '$m_2 = 3{,}0\\text{ kg}$, $m_3 = 6{,}0\\text{ kg}$, $g = 10\\text{ m/s}^2$',
        ],
        ditanyakan: 'Percepatan $m_1$ menaiki bidang miring (dalam $\\text{m/s}^2$)',
        asumsiFisika: ['Tali atas sejajar bidang miring; kedua katrol licin tak bermassa.'],
        batasanSistem: ['Benda bergerak naik bidang miring sehingga arah gesekan kinetik ke bawah bidang.'],
      },
      visualisasiFisika:
        'Pada FBD $m_1$, sumbu miring diputar $37^\\circ$: gaya normal $N = m_1 g \\cos 37^\\circ$ mengimbangi komponen berat tegak lurus bidang, sementara $T_1$ melawan $m_1 g \\sin 37^\\circ$ dan $f_k = \\mu_k N$.',
      analisisKonsep:
        'Terapkan keseimbangan arah tegak lurus bidang pada $m_1$, Hukum II Newton arah sejajar bidang pada $m_1$, dan persamaan massa efektif pada subsistem katrol bawah.',
      persamaanDasar: [
        'N = m_1 g \\cos\\theta \\quad ; \\quad f_k = \\mu_k N',
        'T_1 - m_1 g \\sin\\theta - f_k = m_1 a_1',
        'T_1 = m_{\\text{eff}}(g - a_1), \\quad m_{\\text{eff}} = \\frac{4 m_2 m_3}{m_2 + m_3}',
      ],
      penurunanMatematis: [
        'Samakan kedua ekspresi $T_1$:',
        'm_1 g(\\sin\\theta + \\mu_k \\cos\\theta) + m_1 a_1 = m_{\\text{eff}} g - m_{\\text{eff}} a_1',
        'a_1 = \\frac{m_{\\text{eff}} - m_1(\\sin\\theta + \\mu_k \\cos\\theta)}{m_{\\text{eff}} + m_1} g',
      ],
      substitusiAngka: [
        'm_{\\text{eff}} = \\frac{4(3{,}0)(6{,}0)}{3{,}0 + 6{,}0} = 8{,}0\\text{ kg}',
        'm_1 g(\\sin 37^\\circ + \\mu_k \\cos 37^\\circ) = 5{,}0(10)[0{,}6 + 0{,}25(0{,}8)] = 50(0{,}8) = 40{,}0\\text{ N}',
        '40{,}0 + 5{,}0 a_1 = 8{,}0(10 - a_1) = 80{,}0 - 8{,}0 a_1',
      ],
      perhitungan: ['13{,}0 a_1 = 40{,}0 \\implies a_1 = \\frac{40}{13} = 3{,}0769...\\text{ m/s}^2'],
      pembulatan: 'Angka kedua di belakang koma adalah $7 \\ge 5$, sehingga dibulatkan ke atas menjadi $3{,}1$.',
      kesimpulan: 'Besar percepatan $m_1$ menaiki bidang miring adalah **3,1** $\\text{m/s}^2$.',
      insightOlimpiade:
        'Perhatikan gaya penggerak efektif di pembilang: tarikannya $m_{\\text{eff}} g = 80\\text{ N}$ ke kanan-bawah, hambatannya $40\\text{ N}$, dibagi total massa efektif yang berakselerasi $(m_1 + m_{\\text{eff}}) = 13\\text{ kg}$, langsung memberi $40/13\\text{ m/s}^2$!',
      kesalahanUmum:
        'Memakai $N = m_1 g$ (lupa dikali $\\cos 37^\\circ$) saat menghitung gaya gesek kinetik, atau salah menentukan arah gaya gesek ke atas bidang.',
    },
    narrationStimulus:
      'Soal sepuluh. Massa m satu sebesar lima koma nol kilogram kini diletakkan di atas bidang miring kasar bersudut tiga puluh tujuh derajat dengan koefisien gesek kinetik nol koma dua lima. Tali penarik sejajar bidang menuju katrol bawah yang mengikat m dua tiga kilogram dan m tiga enam kilogram. Jika g sepuluh meter per sekon kuadrat, tentukan percepatan m satu menaiki bidang miring.',
    narrationFbd:
      'Pada diagram gaya bebas di bidang miring, gaya normal N tegak lurus bidang sama dengan m satu g kosinus tiga puluh tujuh derajat, yaitu empat puluh Newton. Gaya gesek kinetik sebesar sepuluh Newton dan komponen berat sejajar bidang tiga puluh Newton sama-sama menghambat tarikan tali T satu.',
    narrationPembahasan:
      'Pembahasan soal sepuluh. Total gaya penghambat pada m satu adalah tiga puluh ditambah sepuluh, sama dengan empat puluh Newton. Dari katrol bawah dengan massa efektif delapan kilogram, T satu sama dengan delapan kali sepuluh kurang a satu. Dengan menyamakan T satu, diperoleh empat puluh tambah lima a satu sama dengan delapan puluh kurang delapan a satu. Jadi tiga belas a satu sama dengan empat puluh, menghasilkan tiga koma nol tujuh tujuh, dibulatkan menjadi tiga koma satu meter per sekon kuadrat.',
  },
  {
    id: 11,
    code: 'Soal 11',
    title: 'Analisis Batas Kegagalan: Tegangan Putus Maksimum Tali Bawah',
    tier: 'HOTS & Kombinasi Prinsip Fisika',
    tierRange: 'Soal 10–12',
    conceptTested: 'Monotonisitas tegangan tali bawah $T_2$ terhadap penambahan massa $m_1$ dan batas kekuatan tali',
    recommendedTheoryId: 12,
    stimulusSummary:
      'Sebuah tali bawah memiliki batas kekuatan tarik $T_{2,\\text{maks}} = 30{,}0\\text{ N}$; dicari nilai maksimum massa $m_1$ agar tali bawah tidak putus.',
    stimulusTable: {
      caption: 'Spesifikasi Kekuatan Tali & Beban Bawah',
      headers: ['Besaran', 'Simbol', 'Nilai'],
      rows: [
        ['Massa kiri bawah', 'm₂', '3,0 kg'],
        ['Massa kanan bawah', 'm₃', '6,0 kg'],
        ['Tegangan putus tali bawah', 'T₂,maks', '30,0 N'],
        ['Percepatan gravitasi', 'g', '10 m/s²'],
      ],
    },
    questionPrompt:
      'Pada sistem katrol Soal No. 8, diketahui $m_2 = 3{,}0\\text{ kg}$, $m_3 = 6{,}0\\text{ kg}$, dan $g = 10\\text{ m/s}^2$. Tali atas sangat kuat, namun tali bawah hanya mampu menahan tegangan maksimum $T_{2,\\text{maks}} = 30{,}0\\text{ N}$ sebelum putus. Berapakah nilai **maksimum** massa $m_1$ (dalam $\\text{kg}$) yang boleh digantungkan agar tali bawah tidak putus sesaat setelah sistem dilepaskan?',
    unit: 'kg',
    expectedAnswer: 4.8,
    expectedFormatted: '4,8',
    animation: {
      type: 'double',
      m1: 4.8,
      m2: 3.0,
      m3: 6.0,
      g: 10,
      a1Display: 2.5,
      a2Display: 0.0,
      a3Display: 5.0,
      aPulleyBottomDown: 2.5,
      t1Value: 60.0,
      t2Value: 30.0,
      equationsTimeline: [
        {
          phaseLabel: 'Tahap 1 · Ketergantungan T₂ pada m₁',
          tex: 'T_2 = \\frac{4g}{\\frac{4}{m_1} + \\frac{1}{m_2} + \\frac{1}{m_3}}',
          caption: 'Memperbesar m₁ mengecilkan 4/m₁ di penyebut sehingga T₂ NAIK!',
        },
        {
          phaseLabel: 'Tahap 2 · Batas T₂ = 30,0 N',
          tex: '\\frac{4(10)}{\\frac{4}{m_1} + \\frac{1}{3} + \\frac{1}{6}} \\le 30{,}0 \\implies \\frac{4}{m_1} + 0{,}5 \\ge \\frac{4}{3}',
          caption: 'Substitusikan m₂ = 3,0 kg dan m₃ = 6,0 kg pada kondisi ambang batas.',
        },
        {
          phaseLabel: 'Tahap 3 · Massa Maksimum m₁',
          tex: '\\frac{4}{m_1} = \\frac{5}{6} \\implies m_{1,\\text{maks}} = \\frac{24}{5} = 4{,}8\\text{ kg}',
          caption: 'Pada m₁ = 4,8 kg, T₂ tepat 30,0 N (kebetulan membuat m₂ juga diam!).',
        },
      ],
    },
    fbdObjects: [
      {
        id: 'P2_limit',
        name: 'Katrol Bawah P₂ pada Batas T₂ = 30 N',
        massLabel: 'T₁ = 2 T₂,maks = 60 N',
        axesLabel: '+y ke bawah',
        vectors: [
          {
            id: 'T1',
            label: 'T₁',
            directionDeg: 90,
            magnitudeRel: 1.2,
            color: '#db2777',
            formulaLabel: 'T₁ = 60,0 N',
            explanation: 'Makin berat m₁, makin kuat T₁ menahan katrol P₂ ke atas.',
          },
          {
            id: 'T2a',
            label: 'T₂ (kiri)',
            directionDeg: 270,
            magnitudeRel: 0.6,
            color: '#be185d',
            formulaLabel: 'T₂ ≤ 30,0 N',
            explanation: 'Batas maksimum tegangan tali bawah.',
          },
          {
            id: 'T2b',
            label: 'T₂ (kanan)',
            directionDeg: 270,
            magnitudeRel: 0.6,
            color: '#be185d',
            formulaLabel: 'T₂ ≤ 30,0 N',
            explanation: 'Batas maksimum tegangan tali bawah.',
          },
        ],
        mathRelation: 'T_2 = \\frac{2m_2 m_3}{m_2 + m_3}(g - a_p) \\le 30{,}0\\text{ N}',
      },
    ],
    pembahasan: {
      memahamiPersoalan:
        'Soal ini menguji pemahaman fisis yang sering mengecoh: mengapa ada batas **maksimum** untuk $m_1$? Karena semakin besar $m_1$, katrol bawah tertahan (percepatan turunnya $a_p$ mengecil), sehingga gravitasi efektif $g_{\\text{eff}} = g - a_p$ pada katrol bawah justru membesar dan membuat $T_2$ meningkat!',
      identifikasiInformasi: {
        diketahui: [
          '$m_2 = 3{,}0\\text{ kg}$, $m_3 = 6{,}0\\text{ kg}$',
          '$T_{2,\\text{maks}} = 30{,}0\\text{ N}$',
          '$g = 10\\text{ m/s}^2$',
        ],
        ditanyakan: 'Massa maksimum $m_1$ (dalam $\\text{kg}$)',
        asumsiFisika: ['Katrol licin tak bermassa, tali tak bermassa tak mulur.'],
        batasanSistem: ['Syarat tidak putus: $T_2 \\le 30{,}0\\text{ N}$.'],
      },
      visualisasiFisika:
        'Saat $m_1 = 4{,}8\\text{ kg}$, kebetulan $T_2 = 30{,}0\\text{ N} = m_2 g$, sehingga $m_2$ berada tepat dalam keadaan diam sementara $m_3$ turun dengan $a_3 = 5{,}0\\text{ m/s}^2$ dan $P_2$ turun $2{,}5\\text{ m/s}^2$.',
      analisisKonsep:
        'Gunakan rumus eksak $T_2$ dari sistem Soal No. 8 dan terapkan pertidaksamaan $T_2 \\le T_{2,\\text{maks}}$.',
      persamaanDasar: [
        'T_2 = \\frac{4g}{\\frac{4}{m_1} + \\frac{1}{m_2} + \\frac{1}{m_3}} \\le T_{2,\\text{maks}}',
      ],
      penurunanMatematis: [
        'Balikkan pertidaksamaan (karena semua suku positif):',
        '\\frac{4}{m_1} + \\frac{1}{m_2} + \\frac{1}{m_3} \\ge \\frac{4g}{T_{2,\\text{maks}}}',
        '\\frac{4}{m_1} \\ge \\frac{4g}{T_{2,\\text{maks}}} - \\frac{1}{m_2} - \\frac{1}{m_3}',
      ],
      substitusiAngka: [
        '\\frac{4}{m_1} \\ge \\frac{4(10)}{30{,}0} - \\frac{1}{3{,}0} - \\frac{1}{6{,}0}',
        '\\frac{4}{m_1} \\ge \\frac{4}{3} - \\frac{1}{2}',
      ],
      perhitungan: [
        '\\frac{4}{m_1} \\ge \\frac{8 - 3}{6} = \\frac{5}{6}',
        'm_1 \\le \\frac{24}{5} = 4{,}8\\text{ kg}',
      ],
      pembulatan: 'Hasil eksak satu desimal adalah $4{,}8$.',
      kesimpulan: 'Nilai maksimum massa $m_1$ agar tali bawah tidak putus adalah **4,8** kg.',
      insightOlimpiade:
        'Cek batas ekstrem: jika $m_1 = 0$, katrol bawah jatuh bebas ($a_p = g$), sehingga $T_2 = 0$ (tali tidak mungkin putus). Jika $m_1 \\to \\infty$, $m_1$ menarik katrol ke atas sehingga $T_2$ terus naik!',
      kesalahanUmum:
        'Menduga semakin besar $m_1$ maka semakin kecil $T_2$, atau menyamakan $T_2$ statis $\\frac{2m_2 m_3}{m_2 + m_3}g = 40\\text{ N}$ tanpa memperhitungkan percepatan katrol bawah.',
    },
    narrationStimulus:
      'Soal sebelas. Pada sistem katrol soal nomor delapan, m dua tiga kilogram dan m tiga enam kilogram. Tali bawah akan putus jika tegangannya melebihi tiga puluh Newton. Berapakah massa maksimum m satu yang boleh dipasang agar tali bawah tidak putus?',
    narrationFbd:
      'Semakin besar massa m satu, semakin kuat tarikan T satu yang menahan katrol bawah agar tidak jatuh bebas. Hal ini memperbesar gravitasi efektif yang dirasakan beban bawah, sehingga tegangan tali T dua ikut membesar.',
    narrationPembahasan:
      'Pembahasan soal sebelas. Dari rumus tegangan tali soal nomor delapan, empat puluh dibagi kurung buka empat per m satu tambah setengah kurung tutup harus kurang dari atau sama dengan tiga puluh. Berarti empat per m satu tambah nol koma lima lebih besar atau sama dengan empat per tiga, sehingga empat per m satu sama dengan lima per enam. Maka m satu maksimum adalah dua puluh empat dibagi lima, yaitu empat koma delapan kilogram.',
  },
  {
    id: 12,
    code: 'Soal 12',
    title: 'Ekstensi Tiga Tingkat: Sistem Tiga Katrol Bertingkat',
    tier: 'HOTS & Kombinasi Prinsip Fisika',
    tierRange: 'Soal 10–12',
    conceptTested: 'Aplikasi rekursif Metode Massa Efektif Katrol ($m_{\\text{eff}}$) pada rantai tiga katrol',
    recommendedTheoryId: 11,
    stimulusSummary:
      'Pola katrol Soal No. 8 diperluas menjadi 3 tingkat: katrol atas tetap ($P_1$), katrol bergerak tengah ($P_2$), dan katrol bergerak paling bawah ($P_3$).',
    stimulusTable: {
      caption: 'Konfigurasi Sistem Katrol Tiga Tingkat',
      headers: ['Level Katrol', 'Beban Kiri', 'Beban Kanan'],
      rows: [
        ['Katrol P₁ (tetap atas)', 'm₁ = 4,0 kg', 'Poros Katrol P₂'],
        ['Katrol P₂ (bergerak tengah)', 'm₂ = 6,0 kg', 'Poros Katrol P₃'],
        ['Katrol P₃ (bergerak bawah)', 'm₃ = 2,0 kg', 'm₄ = 6,0 kg'],
      ],
    },
    questionPrompt:
      'Pola Soal No. 8 kini diperluas menjadi sistem **tiga katrol** licin tak bermassa dengan seluruh tali tak bermassa tak mulur: katrol atas $P_1$ (tetap) mengikat $m_1 = 4{,}0\\text{ kg}$ di kiri dan katrol bergerak $P_2$ di kanan; katrol $P_2$ mengikat $m_2 = 6{,}0\\text{ kg}$ di kiri dan katrol bergerak $P_3$ di kanan; katrol $P_3$ mengikat $m_3 = 2{,}0\\text{ kg}$ di kiri dan $m_4 = 6{,}0\\text{ kg}$ di kanan. Jika $g = 10\\text{ m/s}^2$, tentukan besar percepatan $m_1$ (dalam $\\text{m/s}^2$).',
    unit: 'm/s²',
    expectedAnswer: 5.0,
    expectedFormatted: '5,0',
    animation: {
      type: 'triple',
      m1: 4.0,
      m2: 6.0,
      m3: 2.0,
      m4: 6.0,
      g: 10,
      a1Display: 5.0,
      a2Display: 5.0,
      a3Display: 2.5,
      a4Display: 7.5,
      aPulleyBottomDown: 5.0,
      t1Value: 60.0,
      t2Value: 30.0,
      equationsTimeline: [
        {
          phaseLabel: 'Tahap 1 · Reduksi Katrol P₃',
          tex: 'm_{\\text{eff},3} = \\frac{4 m_3 m_4}{m_3 + m_4} = \\frac{4(2)(6)}{2+6} = 6{,}0\\text{ kg}',
          caption: 'Katrol paling bawah P₃ beserta m₃ dan m₄ digantikan massa efektif 6,0 kg.',
        },
        {
          phaseLabel: 'Tahap 2 · Reduksi Katrol P₂',
          tex: 'm_{\\text{eff},2} = \\frac{4 m_2 m_{\\text{eff},3}}{m_2 + m_{\\text{eff},3}} = \\frac{4(6)(6)}{6+6} = 12{,}0\\text{ kg}',
          caption: 'Katrol tengah P₂ beserta m₂ dan m_eff,3 menjadi massa efektif 12,0 kg.',
        },
        {
          phaseLabel: 'Tahap 3 · Percepatan m₁ pada P₁',
          tex: 'a_1 = \\frac{12{,}0 - 4{,}0}{12{,}0 + 4{,}0}(10) = 5{,}0\\text{ m/s}^2',
          caption: 'Katrol atas P₁ menarik m₁ ke atas dengan percepatan eksak 5,0 m/s².',
        },
      ],
    },
    fbdObjects: [
      {
        id: 'P1_triple',
        name: 'Reduksi Katrol Atas P₁',
        massLabel: 'm₁ = 4 kg vs m_eff,2 = 12 kg',
        axesLabel: '+y ke atas untuk m₁',
        vectors: [
          {
            id: 'T1',
            label: 'T₁',
            directionDeg: 90,
            magnitudeRel: 1.2,
            color: '#db2777',
            formulaLabel: 'T₁ = 60,0 N',
            explanation: 'Tegangan tali paling atas (T₁ = 2T₂ = 4T₃).',
          },
          {
            id: 'W1',
            label: 'm₁ g',
            directionDeg: 270,
            magnitudeRel: 0.8,
            color: '#0f172a',
            formulaLabel: 'm₁ g = 40,0 N',
            explanation: 'Berat beban m₁.',
          },
        ],
        mathRelation: 'T_1 - m_1 g = m_1 a_1 \\quad ; \\quad T_1 = m_{\\text{eff},2}(g - a_1)',
      },
      {
        id: 'P3_triple',
        name: 'Katrol P₃ (m₃ = 2 kg, m₄ = 6 kg)',
        massLabel: 'T₂ = 2 T₃',
        axesLabel: '+y ke bawah',
        vectors: [
          {
            id: 'T2',
            label: 'T₂',
            directionDeg: 90,
            magnitudeRel: 1.0,
            color: '#be185d',
            formulaLabel: 'T₂ = 30,0 N',
            explanation: 'Tali tengah menahan poros P₃.',
          },
          {
            id: 'T3a',
            label: 'T₃ (kiri)',
            directionDeg: 270,
            magnitudeRel: 0.5,
            color: '#0284c7',
            formulaLabel: 'T₃ = 15,0 N',
            explanation: 'Tegangan tali paling bawah.',
          },
          {
            id: 'T3b',
            label: 'T₃ (kanan)',
            directionDeg: 270,
            magnitudeRel: 0.5,
            color: '#0284c7',
            formulaLabel: 'T₃ = 15,0 N',
            explanation: 'Tegangan tali paling bawah.',
          },
        ],
        mathRelation: 'T_2 = 2 T_3 \\implies T_1 = 4 T_3',
      },
    ],
    pembahasan: {
      memahamiPersoalan:
        'Menyelesaikan sistem 3 katrol dan 4 beban dengan menulis 7 persamaan simultan sangat rawan salah hitung. Dengan **Metode Massa Efektif Rekursif** dari Pondasi Ilmu Bagian 11, kita dapat melipat sistem dari katrol paling bawah ($P_3$) ke atas ($P_2$, lalu $P_1$) secara beruntun.',
      identifikasiInformasi: {
        diketahui: [
          '$m_1 = 4{,}0\\text{ kg}$, $m_2 = 6{,}0\\text{ kg}$, $m_3 = 2{,}0\\text{ kg}$, $m_4 = 6{,}0\\text{ kg}$',
          '$g = 10\\text{ m/s}^2$',
        ],
        ditanyakan: 'Besar percepatan $m_1$ (dalam $\\text{m/s}^2$)',
        asumsiFisika: ['Ketiga katrol licin tak bermassa ($T_1 = 2T_2 = 4T_3$), seluruh tali tak mulur.'],
        batasanSistem: ['Gerak vertikal murni sebelum beban menabrak katrol.'],
      },
      visualisasiFisika:
        'Setiap tingkat katrol bergerak melipatgandakan gaya tegang tali ($T_1 = 2T_2 = 4T_3$) dan menggabungkan kedua cabangnya secara harmonik lewat $\\frac{4 m_a m_b}{m_a + m_b}$.',
      analisisKonsep:
        'Gunakan prinsip ekuivalensi massa efektif secara berantai dari bawah ke atas, lalu verifikasi dengan persamaan kendala umum.',
      persamaanDasar: [
        'm_{\\text{eff},3} = \\frac{4 m_3 m_4}{m_3 + m_4}',
        'm_{\\text{eff},2} = \\frac{4 m_2 m_{\\text{eff},3}}{m_2 + m_{\\text{eff},3}}',
        'a_1 = \\frac{m_{\\text{eff},2} - m_1}{m_{\\text{eff},2} + m_1} g',
      ],
      penurunanMatematis: [
        'Pembuktian aljabar penuh: kendala berturut-turut memberikan $4\\ddot{y}_1 + 2\\ddot{y}_2 + \\ddot{y}_3 + \\ddot{y}_4 = 0$.',
        'Dengan $T_1 = 4T_3$ dan $T_2 = 2T_3$, diperoleh $8g = T_3\\left(\\frac{16}{m_1} + \\frac{4}{m_2} + \\frac{1}{m_3} + \\frac{1}{m_4}\\right)$.',
        'Bentuk ini persis ekuivalen dengan reduksi dua langkah massa efektif!',
      ],
      substitusiAngka: [
        'm_{\\text{eff},3} = \\frac{4(2{,}0)(6{,}0)}{2{,}0 + 6{,}0} = 6{,}0\\text{ kg}',
        'm_{\\text{eff},2} = \\frac{4(6{,}0)(6{,}0)}{6{,}0 + 6{,}0} = 12{,}0\\text{ kg}',
        'a_1 = \\frac{12{,}0 - 4{,}0}{12{,}0 + 4{,}0} \\times 10',
      ],
      perhitungan: ['a_1 = \\frac{8{,}0}{16{,}0} \\times 10 = 5{,}0\\text{ m/s}^2'],
      pembulatan: 'Hasil eksak satu desimal adalah $5{,}0$.',
      kesimpulan: 'Besar percepatan massa $m_1$ adalah **5,0** $\\text{m/s}^2$ (ke atas).',
      insightOlimpiade:
        'Cek dengan rumus cepat $T_3$: $\\frac{16}{4} + \\frac{4}{6} + \\frac{1}{2} + \\frac{1}{6} = 4 + \\frac{8}{6} = \\frac{16}{3}$. Maka $T_3 = \\frac{8g}{16/3} = 1{,}5g = 15\\text{ N}$, $T_1 = 4(15) = 60\\text{ N}$, dan $a_1 = \\frac{60 - 40}{4} = 5{,}0\\text{ m/s}^2$. Tepat sama!',
      kesalahanUmum:
        'Menjumlahkan massa langsung ($6 + 2 + 6 = 14\\text{ kg}$) atau salah mengalikan faktor 2 pada katrol tingkat kedua.',
    },
    narrationStimulus:
      'Soal dua belas. Pola katrol soal nomor delapan kini diperluas menjadi tiga tingkat katrol licin tak bermassa. Katrol atas mengikat m satu empat kilogram di kiri dan katrol tengah P dua di kanan. Katrol tengah mengikat m dua enam kilogram dan katrol bawah P tiga. Katrol bawah mengikat m tiga dua kilogram dan m empat enam kilogram. Tentukan percepatan m satu.',
    narrationFbd:
      'Karena ketiga katrol tidak bermassa, tegangan tali atas T satu sama dengan dua kali T dua dan empat kali T tiga. Sistem dapat disederhanakan bertahap dari katrol paling bawah ke katrol paling atas.',
    narrationPembahasan:
      'Pembahasan soal dua belas. Pakai metode massa efektif secara berantai. Pertama, massa efektif katrol P tiga adalah empat kali dua kali enam dibagi delapan, yaitu enam kilogram. Kedua, massa efektif katrol P dua adalah empat kali enam kali enam dibagi dua belas, yaitu dua belas kilogram. Terakhir pada katrol atas, percepatan m satu menjadi dua belas kurang empat dibagi dua belas tambah empat dikali sepuluh, menghasilkan lima koma nol meter per sekon kuadrat.',
  },
  {
    id: 13,
    code: 'Soal 13',
    title: 'Katrol Atas Ikut Bergerak oleh Gaya Luar Vertikal',
    tier: 'Tantangan Olimpiade Tingkat Kota',
    tierRange: 'Soal 13–15',
    conceptTested: 'Percepatan relatif $a_{1/P_1}$ sesungguhnya ketika katrol atas tidak terikat ke atap melainkan ditarik gaya $F$',
    recommendedTheoryId: 2,
    stimulusSummary:
      'Penyangga atap pada katrol atas Soal No. 8 dilepas! Kini poros katrol atas ditarik langsung ke atas oleh gaya eksternal konstan $F = 80{,}0\\text{ N}$.',
    stimulusTable: {
      caption: 'Parameter Katrol Atas Bergerak',
      headers: ['Besaran', 'Simbol', 'Nilai'],
      rows: [
        ['Gaya tarik ke atas pada katrol P₁', 'F', '80,0 N'],
        ['Massa beban-beban', 'm₁, m₂, m₃', '2,0 kg; 3,0 kg; 6,0 kg'],
        ['Massa kedua katrol', 'M_P1, M_P2', '0 kg (tak bermassa)'],
        ['Percepatan gravitasi', 'g', '10 m/s²'],
      ],
    },
    questionPrompt:
      'Pada sistem tiga beban Soal No. 8 ($m_1 = 2{,}0\\text{ kg}$, $m_2 = 3{,}0\\text{ kg}$, $m_3 = 6{,}0\\text{ kg}$, kedua katrol licin tak bermassa, $g = 10\\text{ m/s}^2$), penyangga tetap pada katrol atas kini dilepas dan poros katrol atas ditarik ke **atas** oleh gaya luar konstan $F = 80{,}0\\text{ N}$. Berapakah besar percepatan $m_1$ **relatif terhadap katrol atas** (dalam $\\text{m/s}^2$)?',
    unit: 'm/s²',
    expectedAnswer: 7.5,
    expectedFormatted: '7,5',
    animation: {
      type: 'moving-top',
      m1: 2.0,
      m2: 3.0,
      m3: 6.0,
      g: 10,
      fUp: 80.0,
      a1Display: 10.0,
      a2Display: 3.333,
      a3Display: 6.667,
      aPulleyTopUp: 2.5,
      aPulleyBottomDown: 5.0,
      t1Value: 40.0,
      t2Value: 20.0,
      equationsTimeline: [
        {
          phaseLabel: 'Tahap 1 · Tegangan Tali Langsung dari F',
          tex: 'F - 2T_1 = 0 \\implies T_1 = 40{,}0\\text{ N} \\implies T_2 = 20{,}0\\text{ N}',
          caption: 'Karena kedua katrol tak bermassa, gaya F langsung menentukan T₁ dan T₂!',
        },
        {
          phaseLabel: 'Tahap 2 · Percepatan Mutlak Tiap Benda',
          tex: 'a_{1,\\text{naik}} = 10{,}0\\text{ m/s}^2 \\; ; \\; a_2 = \\frac{10}{3}\\text{ m/s}^2 \\text{ (turun)} \\; ; \\; a_3 = \\frac{20}{3}\\text{ m/s}^2 \\text{ (turun)}',
          caption: 'Katrol bawah turun dengan a_P2 = (a₂ + a₃)/2 = 5,0 m/s².',
        },
        {
          phaseLabel: 'Tahap 3 · Gerak Katrol Atas & Percepatan Relatif',
          tex: 'a_{P_1,\\text{naik}} = \\frac{10 - 5}{2} = 2{,}5\\text{ m/s}^2 \\implies a_{1/P_1} = 10{,}0 - 2{,}5 = 7{,}5\\text{ m/s}^2',
          caption: 'Karena katrol atas ikut naik 2,5 m/s², percepatan relatif m₁ terhadapnya adalah 7,5 m/s².',
        },
      ],
    },
    fbdObjects: [
      {
        id: 'P1_moving',
        name: 'Katrol Atas P₁ (Tak Bermassa, Ditarik F)',
        massLabel: 'm_P1 = 0 kg',
        axesLabel: '+z ke atas',
        vectors: [
          {
            id: 'Fext',
            label: 'F',
            directionDeg: 90,
            magnitudeRel: 1.25,
            color: '#0284c7',
            formulaLabel: 'F = 80,0 N',
            explanation: 'Gaya luar menarik poros katrol atas P₁ ke atas.',
          },
          {
            id: 'T1L',
            label: 'T₁ (kiri)',
            directionDeg: 270,
            magnitudeRel: 0.62,
            color: '#db2777',
            formulaLabel: 'T₁ = 40,0 N',
            explanation: 'Tegangan tali sisi m₁.',
          },
          {
            id: 'T1R',
            label: 'T₁ (kanan)',
            directionDeg: 270,
            magnitudeRel: 0.62,
            color: '#db2777',
            formulaLabel: 'T₁ = 40,0 N',
            explanation: 'Tegangan tali sisi katrol P₂.',
          },
        ],
        mathRelation: 'F - 2T_1 = 0 \\implies T_1 = \\frac{F}{2} = 40{,}0\\text{ N}',
      },
      {
        id: 'm1_moving',
        name: 'Massa m₁ (2,0 kg)',
        massLabel: 'm₁ = 2,0 kg',
        axesLabel: '+z ke atas relatif tanah',
        vectors: [
          {
            id: 'T1',
            label: 'T₁',
            directionDeg: 90,
            magnitudeRel: 1.2,
            color: '#db2777',
            formulaLabel: 'T₁ = 40,0 N',
            explanation: 'Tegangan tali menarik m₁ ke atas.',
          },
          {
            id: 'W1',
            label: 'm₁ g',
            directionDeg: 270,
            magnitudeRel: 0.6,
            color: '#0f172a',
            formulaLabel: 'm₁ g = 20,0 N',
            explanation: 'Berat m₁ ke bawah.',
          },
        ],
        mathRelation: 'a_{1,\\text{tanah}} = \\frac{40 - 20}{2} = 10{,}0\\text{ m/s}^2\\text{ (ke atas)}',
      },
    ],
    pembahasan: {
      memahamiPersoalan:
        'Pada Soal No. 8 asli, kata "relatif terhadap katrol atas" tidak mengubah angka karena katrol atas diam. Di soal tantangan ini, katrol atas ikut bergerak dipercepat oleh gaya $F$, sehingga kita wajib mencari percepatan katrol atas $a_{P_1}$ lalu menghitung $a_{1/P_1} = a_1 - a_{P_1}$!',
      identifikasiInformasi: {
        diketahui: [
          '$F = 80{,}0\\text{ N}$ ke atas pada poros katrol atas $P_1$',
          '$m_1 = 2{,}0\\text{ kg}$, $m_2 = 3{,}0\\text{ kg}$, $m_3 = 6{,}0\\text{ kg}$',
          '$g = 10\\text{ m/s}^2$, kedua katrol tak bermassa',
        ],
        ditanyakan: 'Percepatan $m_1$ relatif terhadap katrol atas $P_1$ (dalam $\\text{m/s}^2$)',
        asumsiFisika: ['Katrol tak bermassa ($F = 2T_1$ dan $T_1 = 2T_2$), tali tak mulur.'],
        batasanSistem: ['Semua tali tegang selama gaya $F$ bekerja.'],
      },
      visualisasiFisika:
        'Misalkan koordinat $z$ positif ke atas dari lantai untuk semua objek: $z_1, z_2, z_3, z_{P1}, z_{P2}$. Panjang tali atas memenuhi $(z_{P1} - z_1) + (z_{P1} - z_{P2}) = L_1$.',
      analisisKonsep:
        'Uniknya masalah katrol tak bermassa yang ditarik gaya $F$: nilai seluruh tegangan tali langsung diketahui di langkah pertama ($T_1 = F/2$ dan $T_2 = F/4$), lalu percepatan tiap benda dan tiap katrol menyusul dari kendala tali!',
      persamaanDasar: [
        'F = 2T_1 \\quad ; \\quad T_1 = 2T_2',
        '\\ddot{z}_1 = \\frac{T_1}{m_1} - g \\quad ; \\quad \\ddot{z}_2 = \\frac{T_2}{m_2} - g \\quad ; \\quad \\ddot{z}_3 = \\frac{T_2}{m_3} - g',
        '\\ddot{z}_{P2} = \\frac{\\ddot{z}_2 + \\ddot{z}_3}{2} \\quad ; \\quad \\ddot{z}_{P1} = \\frac{\\ddot{z}_1 + \\ddot{z}_{P2}}{2}',
      ],
      penurunanMatematis: [
        'Dari $L_1 = (z_{P1} - z_1) + (z_{P1} - z_{P2}) + \\text{konst}$, turunan kedua memberikan $2\\ddot{z}_{P1} = \\ddot{z}_1 + \\ddot{z}_{P2}$.',
        'Percepatan relatif $m_1$ terhadap katrol atas adalah:',
        'a_{1/P_1} = \\ddot{z}_1 - \\ddot{z}_{P1} = \\ddot{z}_1 - \\frac{\\ddot{z}_1 + \\ddot{z}_{P2}}{2} = \\frac{\\ddot{z}_1 - \\ddot{z}_{P2}}{2}',
      ],
      substitusiAngka: [
        'T_1 = \\frac{80{,}0}{2} = 40{,}0\\text{ N} \\implies T_2 = 20{,}0\\text{ N}',
        '\\ddot{z}_1 = \\frac{40{,}0}{2{,}0} - 10 = +10{,}0\\text{ m/s}^2\\text{ (ke atas)}',
        '\\ddot{z}_2 = \\frac{20{,}0}{3{,}0} - 10 = -\\frac{10}{3}\\text{ m/s}^2 \\quad ; \\quad \\ddot{z}_3 = \\frac{20{,}0}{6{,}0} - 10 = -\\frac{20}{3}\\text{ m/s}^2',
      ],
      perhitungan: [
        '\\ddot{z}_{P2} = \\frac{-\\frac{10}{3} - \\frac{20}{3}}{2} = -5{,}0\\text{ m/s}^2\\text{ (turun } 5{,}0\\text{ m/s}^2\\text{)}',
        '\\ddot{z}_{P1} = \\frac{10{,}0 + (-5{,}0)}{2} = +2{,}5\\text{ m/s}^2\\text{ (naik } 2{,}5\\text{ m/s}^2\\text{)}',
        'a_{1/P_1} = 10{,}0 - 2{,}5 = 7{,}5\\text{ m/s}^2',
      ],
      pembulatan: 'Hasil eksak satu desimal adalah $7{,}5$.',
      kesimpulan: 'Besar percepatan $m_1$ relatif terhadap katrol atas adalah **7,5** $\\text{m/s}^2$.',
      insightOlimpiade:
        'Cara super cepat dari kerangka katrol atas $P_1$: karena $P_1$ naik dengan $a_{P1} = 2{,}5\\text{ m/s}^2$, gravitasi efektifnya $g_{\\text{eff}} = 10 + 2{,}5 = 12{,}5\\text{ m/s}^2$! Maka memakai rumus Soal No. 8: $a_{1/P_1} = 0{,}6 \\times g_{\\text{eff}} = 0{,}6 \\times 12{,}5 = 7{,}5\\text{ m/s}^2$! Luar biasa konsisten!',
      kesalahanUmum:
        'Menjawab $10{,}0\\text{ m/s}^2$ karena hanya menghitung percepatan $m_1$ terhadap tanah tanpa mengurangi percepatan naik katrol atas $P_1$.',
    },
    narrationStimulus:
      'Soal tiga belas. Penyangga atap pada katrol atas soal nomor delapan dilepas, lalu poros katrol atas ditarik ke atas oleh gaya konstan delapan puluh Newton. Jika g sepuluh meter per sekon kuadrat, berapakah percepatan m satu relatif terhadap katrol atas?',
    narrationFbd:
      'Karena katrol atas tidak bermassa dan ditarik gaya delapan puluh Newton, maka tegangan tali atas langsung bernilai setengahnya yaitu empat puluh Newton, dan tegangan tali bawah dua puluh Newton.',
    narrationPembahasan:
      'Pembahasan soal tiga belas. Dari T satu empat puluh Newton, m satu naik dengan percepatan sepuluh meter per sekon kuadrat terhadap tanah. Dari T dua dua puluh Newton, m dua turun sepuluh per tiga dan m tiga turun dua puluh per tiga, sehingga katrol bawah turun lima meter per sekon kuadrat. Karena katrol atas berada di tengah kendala tali atas, percepatan naik katrol atas adalah rata-rata dari plus sepuluh dan minus lima, yaitu dua koma lima meter per sekon kuadrat. Maka percepatan m satu relatif terhadap katrol atas adalah sepuluh dikurangi dua koma lima, sama dengan tujuh koma lima meter per sekon kuadrat.',
  },
  {
    id: 14,
    code: 'Soal 14',
    title: 'Percepatan Pusat Massa Seluruh Sistem Beban Soal No. 8',
    tier: 'Tantangan Olimpiade Tingkat Kota',
    tierRange: 'Soal 13–15',
    conceptTested: 'Teorema Gerak Pusat Massa ($\\sum F_{\\text{eksternal}} = M_{\\text{total}} a_{\\text{PM}}$) pada sistem katrol terikat',
    recommendedTheoryId: 10,
    stimulusSummary:
      'Analisis kolektif terhadap gerak pusat massa (center of mass) gabungan $m_1$, $m_2$, dan $m_3$ pada konfigurasi asli Soal No. 8.',
    stimulusTable: {
      caption: 'Parameter Pusat Massa Sistem No. 8',
      headers: ['Besaran', 'Simbol', 'Nilai'],
      rows: [
        ['Massa tiap beban', 'm₁, m₂, m₃', '2,0 kg; 3,0 kg; 6,0 kg'],
        ['Massa total sistem beban', 'M_total', '11,0 kg'],
        ['Gaya penahan atap pada P₁', 'F_atap', '2T₁ = 64,0 N (ke atas)'],
        ['Percepatan gravitasi', 'g', '10 m/s²'],
      ],
    },
    questionPrompt:
      'Pada sistem katrol asli Soal No. 8 ($m_1 = 2{,}0\\text{ kg}$, $m_2 = 3{,}0\\text{ kg}$, $m_3 = 6{,}0\\text{ kg}$, kedua katrol licin tak bermassa, tali tak bermassa tak mulur, dan $g = 10\\text{ m/s}^2$), tentukan besar **percepatan pusat massa** sistem ketiga benda tersebut ke arah bawah (dalam satuan $\\text{m/s}^2$).',
    unit: 'm/s²',
    expectedAnswer: 4.2,
    expectedFormatted: '4,2',
    animation: {
      type: 'double',
      m1: 2.0,
      m2: 3.0,
      m3: 6.0,
      g: 10,
      a1Display: 6.0,
      a2Display: 4.667,
      a3Display: 7.333,
      aPulleyBottomDown: 6.0,
      t1Value: 32.0,
      t2Value: 16.0,
      equationsTimeline: [
        {
          phaseLabel: 'Tahap 1 · Gaya Eksternal Sistem Total',
          tex: '\\sum F_{\\text{eks, turun}} = (m_1 + m_2 + m_3)g - 2T_1',
          caption: 'Satu-satunya gaya eksternal selain gravitasi adalah gaya penahan atap 2T₁ ke atas.',
        },
        {
          phaseLabel: 'Tahap 2 · Nilai Gaya Eksternal Netto',
          tex: 'F_{\\text{netto}} = 11{,}0(10) - 2(32{,}0) = 110 - 64 = 46{,}0\\text{ N}',
          caption: 'Total gaya luar ke bawah sebesar 46,0 N menggerakkan pusat massa ke bawah.',
        },
        {
          phaseLabel: 'Tahap 3 · Percepatan Pusat Massa',
          tex: 'a_{\\text{PM}} = \\frac{46{,}0}{11{,}0} = 4{,}1818... \\approx 4{,}2\\text{ m/s}^2',
          caption: 'Pusat massa sistem turun dipercepat 4,2 m/s² (< g karena ditahan atap).',
        },
      ],
    },
    fbdObjects: [
      {
        id: 'sistem_total',
        name: 'Sistem Total (m₁ + m₂ + m₃ + Katrol)',
        massLabel: 'M_total = 11,0 kg',
        axesLabel: '+y ke bawah',
        vectors: [
          {
            id: 'Fatap',
            label: 'F_atap = 2T₁',
            directionDeg: 90,
            magnitudeRel: 0.75,
            color: '#0284c7',
            formulaLabel: 'F_atap = 64,0 N',
            explanation: 'Gaya penahan batang atap pada poros katrol atas ke atas.',
          },
          {
            id: 'Wtot',
            label: 'M_total g',
            directionDeg: 270,
            magnitudeRel: 1.25,
            color: '#0f172a',
            formulaLabel: 'M_total g = 110,0 N',
            explanation: 'Total gaya berat seluruh sistem ke bawah.',
          },
        ],
        mathRelation: 'a_{\\text{PM}} = \\frac{M_{\\text{total}} g - 2T_1}{M_{\\text{total}}} = \\frac{m_1 a_{1,\\text{turun}} + m_2 a_2 + m_3 a_3}{M_{\\text{total}}}',
      },
    ],
    pembahasan: {
      memahamiPersoalan:
        'Soal ini menguji pemahaman mendalam tentang sistem banyak partikel: pusat massa sistem selalu dipercepat ke bawah oleh gaya eksternal netto ($M_{\\text{total}}g - F_{\\text{atap}}$) dan selalu bernilai lebih kecil dari $g$ karena batang penahan katrol atas menyangga sebagian berat sistem ($2T_1$).',
      identifikasiInformasi: {
        diketahui: [
          '$m_1 = 2{,}0\\text{ kg}$, $m_2 = 3{,}0\\text{ kg}$, $m_3 = 6{,}0\\text{ kg}$',
          '$g = 10\\text{ m/s}^2$',
        ],
        ditanyakan: 'Percepatan pusat massa sistem ke arah bawah $a_{\\text{PM}}$ (dalam $\\text{m/s}^2$)',
        asumsiFisika: ['Kedua katrol dan tali tak bermassa; percepatan masing-masing benda mengikuti hasil Soal No. 8.'],
        batasanSistem: ['Benda bergerak bebas vertikal.'],
      },
      visualisasiFisika:
        'Tinjau kotak batas sistem meliputi seluruh katrol, tali, $m_1, m_2, m_3$. Seluruh tegangan tali $T_1$ dan $T_2$ menjadi gaya dalam yang saling meniadakan. Gaya luar yang menembus batas hanya berat total dan gaya batang atap $2T_1$.',
      analisisKonsep:
        'Kita dapat menghitung $a_{\\text{PM}}$ dengan dua metode independen: Metode Gaya Eksternal dan Metode Rata-Rata Berbobot Massa.',
      persamaanDasar: [
        'a_{\\text{PM}} = \\frac{\\sum m_i a_{i,\\text{turun}}}{\\sum m_i} = \\frac{M_{\\text{total}} g - F_{\\text{atap}}}{M_{\\text{total}}}',
      ],
      penurunanMatematis: [
        'Dari Soal No. 8 ($g = 10\\text{ m/s}^2$): $T_2 = 16{,}0\\text{ N}$, $T_1 = 32{,}0\\text{ N}$.',
        'Percepatan ke bawah tiap benda: $a_{1,\\text{turun}} = -6{,}0\\text{ m/s}^2$, $a_2 = \\frac{14}{3}\\text{ m/s}^2$, $a_3 = \\frac{22}{3}\\text{ m/s}^2$.',
        'Hitung pembilang: $m_1 a_{1,\\text{turun}} + m_2 a_2 + m_3 a_3$.',
      ],
      substitusiAngka: [
        'a_{\\text{PM}} = \\frac{2(-6{,}0) + 3\\left(\\frac{14}{3}\\right) + 6\\left(\\frac{22}{3}\\right)}{2{,}0 + 3{,}0 + 6{,}0}',
        '\\text{Atau via gaya luar: } a_{\\text{PM}} = \\frac{11{,}0(10) - 2(32{,}0)}{11{,}0}',
      ],
      perhitungan: [
        '\\text{Pembilang} = -12 + 14 + 44 = 46{,}0',
        'a_{\\text{PM}} = \\frac{46{,}0}{11{,}0} = 4{,}1818...\\text{ m/s}^2',
      ],
      pembulatan: 'Angka kedua di belakang koma adalah $8 \\ge 5$, sehingga $4{,}1818...$ dibulatkan menjadi $4{,}2$.',
      kesimpulan: 'Besar percepatan pusat massa sistem adalah **4,2** $\\text{m/s}^2$ (ke bawah).',
      insightOlimpiade:
        'Fakta menarik Olimpiade: pada sistem katrol tetap apa pun yang terikat ke langit-langit, pusat massa sistem tidak akan pernah naik (selama lepas dari diam); ia selalu turun atau diam ($a_{\\text{PM}} \\ge 0$) karena gaya atap tidak pernah melebihi berat total sistem saat sistem bergerak bebas!',
      kesalahanUmum:
        'Mengambil tanda positif untuk percepatan $m_1$ padahal $m_1$ bergerak ke atas (sehingga berlawanan arah dengan $m_2$ dan $m_3$), atau memakai pembagi $3$ alih-alih total massa $11\\text{ kg}$.',
    },
    narrationStimulus:
      'Soal empat belas. Pada sistem katrol asli soal nomor delapan dengan g sama dengan sepuluh meter per sekon kuadrat, tentukan besar percepatan pusat massa seluruh sistem ketiga benda ke arah bawah.',
    narrationFbd:
      'Jika seluruh katrol, tali, dan ketiga beban dipandang sebagai satu kotak sistem, tegangan tali menjadi gaya internal yang saling meniadakan. Satu-satunya gaya luar selain gravitasi adalah gaya penahan atap sebesar dua kali T satu ke atas.',
    narrationPembahasan:
      'Pembahasan soal empat belas. Dari soal nomor delapan dengan g sepuluh, tegangan tali atas T satu adalah tiga puluh dua Newton, sehingga gaya penahan atap adalah dua kali tiga puluh dua, yaitu enam puluh empat Newton. Berat total sistem adalah sebelas dikali sepuluh, yaitu seratus sepuluh Newton. Maka resultan gaya luar ke bawah adalah seratus sepuluh dikurangi enam puluh empat, sama dengan empat puluh enam Newton. Dibagi massa total sebelas kilogram, percepatan pusat massa adalah empat puluh enam per sebelas atau empat koma satu delapan satu, yang dibulatkan menjadi empat koma dua meter per sekon kuadrat.',
  },
  {
    id: 15,
    code: 'Soal 15',
    title: 'Tantangan Puncak: Kedua Katrol Bermassa (Translasi + Rotasi)',
    tier: 'Tantangan Olimpiade Tingkat Kota',
    tierRange: 'Soal 13–15',
    conceptTested: 'Menghapus seluruh idealisasi katrol tak bermassa: dinamika rotasi katrol tetap atas DAN katrol bergerak bawah yang ikut bertranslasi',
    recommendedTheoryId: 8,
    stimulusSummary:
      'Bentuk paling realistis dari sistem Soal No. 8: baik katrol atas maupun katrol bawah berupa silinder pejal bermassa $M_1 = M_2 = 2{,}0\\text{ kg}$ yang berotasi tanpa slip.',
    stimulusTable: {
      caption: 'Parameter Kedua Katrol Bermassa',
      headers: ['Besaran', 'Simbol', 'Nilai'],
      rows: [
        ['Massa beban-beban', 'm₁, m₂, m₃', '2,0 kg; 3,0 kg; 6,0 kg'],
        ['Massa katrol atas (silinder pejal)', 'M₁', '2,0 kg (I₁ = ½ M₁ R₁²)'],
        ['Massa katrol bawah (silinder pejal)', 'M₂', '2,0 kg (I₂ = ½ M₂ R₂²)'],
        ['Percepatan gravitasi', 'g', '10 m/s²'],
      ],
    },
    questionPrompt:
      'Sebagai tantangan puncak pengembangan Soal No. 8, kini **kedua katrol** bukan lagi tak bermassa melainkan silinder pejal homogen bermassa masing-masing $M_1 = 2{,}0\\text{ kg}$ (katrol atas) dan $M_2 = 2{,}0\\text{ kg}$ (katrol bawah), dengan momen inersia $I = \\frac{1}{2} M R^2$ terhadap porosnya masing-masing. Beban tetap $m_1 = 2{,}0\\text{ kg}$, $m_2 = 3{,}0\\text{ kg}$, $m_3 = 6{,}0\\text{ kg}$, dan $g = 10\\text{ m/s}^2$. Tali tidak slip terhadap kedua katrol. Tentukan besar percepatan massa $m_1$ (dalam $\\text{m/s}^2$).',
    unit: 'm/s²',
    expectedAnswer: 6.2,
    expectedFormatted: '6,2',
    animation: {
      type: 'double',
      m1: 2.0,
      m2: 3.0,
      m3: 6.0,
      g: 10,
      mPulleyTop: 2.0,
      mPulleyBottom: 2.0,
      a1Display: 6.1832,
      a2Display: 5.0382,
      a3Display: 7.3282,
      aPulleyBottomDown: 6.1832,
      t1Value: 32.37,
      t2Value: 16.03,
      equationsTimeline: [
        {
          phaseLabel: 'Tahap 1 · Rotasi & Translasi Katrol Bawah P₂',
          tex: 'a_{\\text{rel}} = \\frac{m_3 - m_2}{m_2 + m_3 + \\frac{1}{2}M_2}(g - a_1) = 0{,}3(g - a_1)',
          caption: 'Di kerangka P₂, rotasi P₂ menambah inersia ½M₂ = 1,0 kg pada tali bawah.',
        },
        {
          phaseLabel: 'Tahap 2 · Massa Efektif Bawah Lengkap',
          tex: 'T_{1R} = M_2(g - a_1) + T_{2L} + T_{2R} = 10{,}1(g - a_1)',
          caption: 'Massa M₂ = 2 kg ikut menarik ke bawah sehingga m_eff melonjak menjadi 10,1 kg!',
        },
        {
          phaseLabel: 'Tahap 3 · Nilai Akhir Percepatan a₁',
          tex: '20 + 3a_1 = 101 - 10{,}1 a_1 \\implies a_1 = \\frac{810}{131} \\approx 6{,}2\\text{ m/s}^2',
          caption: 'Berat katrol bawah M₂ justru mempercepat naiknya m₁ menjadi 6,2 m/s²!',
        },
      ],
    },
    fbdObjects: [
      {
        id: 'P2_full',
        name: 'Katrol Bawah P₂ (Translasi + Rotasi, M₂ = 2 kg)',
        massLabel: 'M₂ = 2,0 kg; I₂ = ½ M₂ R₂²',
        axesLabel: '+y ke bawah, rotasi searah jarum jam',
        vectors: [
          {
            id: 'T1R',
            label: 'T₁ kanan',
            directionDeg: 90,
            magnitudeRel: 1.25,
            color: '#db2777',
            formulaLabel: 'T₁R = 38,5 N',
            explanation: 'Tali atas kanan menarik poros katrol P₂ ke atas.',
          },
          {
            id: 'W_p2',
            label: 'M₂ g',
            directionDeg: 270,
            magnitudeRel: 0.65,
            color: '#0f172a',
            formulaLabel: 'M₂ g = 20,0 N',
            explanation: 'Katrol bawah bermassa sehingga punya gaya berat M₂ g ke bawah!',
          },
          {
            id: 'T2L',
            label: 'T₂ kiri',
            directionDeg: 270,
            magnitudeRel: 0.48,
            color: '#0284c7',
            formulaLabel: 'T₂L = 14,9 N',
            explanation: 'Tegangan tali sisi m₂ (lebih kecil dari T₂R).',
          },
          {
            id: 'T2R',
            label: 'T₂ kanan',
            directionDeg: 270,
            magnitudeRel: 0.56,
            color: '#be185d',
            formulaLabel: 'T₂R = 16,0 N',
            explanation: 'Tegangan tali sisi m₃ memberi torka rotasi searah jarum jam.',
          },
        ],
        mathRelation: 'M_2 g + T_{2L} + T_{2R} - T_{1R} = M_2 a_1 \\quad ; \\quad (T_{2R} - T_{2L}) = \\frac{1}{2}M_2 a_{\\text{rel}}',
      },
      {
        id: 'P1_full',
        name: 'Katrol Atas P₁ (M₁ = 2 kg)',
        massLabel: 'I₁ = ½ M₁ R₁²',
        axesLabel: 'Rotasi searah jarum jam',
        vectors: [
          {
            id: 'T1R_p1',
            label: 'T₁ kanan',
            directionDeg: 270,
            magnitudeRel: 1.15,
            color: '#be185d',
            formulaLabel: 'T₁R = 38,5 N',
            explanation: 'Menarik sisi kanan katrol P₁.',
          },
          {
            id: 'T1L_p1',
            label: 'T₁ kiri',
            directionDeg: 270,
            magnitudeRel: 0.95,
            color: '#db2777',
            formulaLabel: 'T₁L = 32,4 N',
            explanation: 'Menarik sisi kiri katrol P₁.',
          },
        ],
        mathRelation: 'T_{1R} - T_{1L} = \\frac{1}{2} M_1 a_1',
      },
    ],
    pembahasan: {
      memahamiPersoalan:
        'Ketika **kedua** katrol bermassa, ada 4 tegangan tali berbeda ($T_{1L}, T_{1R}, T_{2L}, T_{2R}$) dan katrol bawah $P_2$ mengalami gerak translasi ke bawah sekaligus rotasi di porosnya!',
      identifikasiInformasi: {
        diketahui: [
          '$m_1 = 2{,}0\\text{ kg}$, $m_2 = 3{,}0\\text{ kg}$, $m_3 = 6{,}0\\text{ kg}$',
          '$M_1 = 2{,}0\\text{ kg}$, $M_2 = 2{,}0\\text{ kg}$ (silinder pejal $I = \\frac{1}{2}MR^2$)',
          '$g = 10\\text{ m/s}^2$',
        ],
        ditanyakan: 'Besar percepatan $m_1$ (dalam $\\text{m/s}^2$)',
        asumsiFisika: ['Tali tidak slip pada kedua katrol; poros katrol licin.'],
        batasanSistem: ['Benda bergerak translasi vertikal dan kedua katrol berotasi tanpa slip.'],
      },
      visualisasiFisika:
        'Katrol atas $P_1$ hanya berotasi ($T_{1R} - T_{1L} = \\frac{1}{2}M_1 a_1$). Katrol bawah $P_2$ turun dengan $a_1$ dan berotasi dengan percepatan sudut $\\alpha_2 = a_{\\text{rel}} / R_2$, di mana $a_{\\text{rel}}$ adalah percepatan $m_3$ (turun) dan $m_2$ (naik) relatif terhadap $P_2$.',
      analisisKonsep:
        'Analisis subsistem bawah di kerangka katrol $P_2$ ($g_{\\text{rel}} = g - a_1$) untuk mendapatkan massa efektif lengkap subsistem bawah, lalu samakan tegangan tali $T_{1R}$ dengan subsistem atas!',
      persamaanDasar: [
        'T_{1L} = m_1(g + a_1) \\quad ; \\quad T_{1R} - T_{1L} = \\frac{1}{2}M_1 a_1',
        'T_{2L} = m_2(g - a_1 + a_{\\text{rel}}) \\quad ; \\quad T_{2R} = m_3(g - a_1 - a_{\\text{rel}})',
        'T_{2R} - T_{2L} = \\frac{1}{2} M_2 a_{\\text{rel}} \\quad ; \\quad T_{1R} = M_2(g - a_1) + T_{2L} + T_{2R}',
      ],
      penurunanMatematis: [
        'Dari selisih tegangan tali bawah: $(m_3 - m_2)(g - a_1) = \\left(m_2 + m_3 + \\frac{1}{2}M_2\\right)a_{\\text{rel}} \\implies a_{\\text{rel}} = \\frac{6 - 3}{3 + 6 + 1}(g - a_1) = 0{,}3(g - a_1)$.',
        'Jumlah tegangan tali bawah: $T_{2L} + T_{2R} = (m_2 + m_3)(g - a_1) - (m_3 - m_2)a_{\\text{rel}} = [9 - 3(0{,}3)](g - a_1) = 8{,}1(g - a_1)$.',
        'Tegangan tali kanan atas: $T_{1R} = [M_2 + 8{,}1](g - a_1) = 10{,}1(g - a_1)$.',
        'Dari subsistem atas: $T_{1R} = m_1 g + \\left(m_1 + \\frac{1}{2}M_1\\right)a_1 = 2g + 3a_1$.',
      ],
      substitusiAngka: [
        '2(10) + 3 a_1 = 10{,}1(10 - a_1)',
        '20 + 3 a_1 = 101 - 10{,}1 a_1',
      ],
      perhitungan: [
        '13{,}1 a_1 = 81 \\implies a_1 = \\frac{810}{131} = 6{,}1832...\\text{ m/s}^2',
      ],
      pembulatan: 'Angka kedua di belakang koma adalah $8 \\ge 5$, sehingga $6{,}1832...$ dibulatkan menjadi $6{,}2$.',
      kesimpulan: 'Besar percepatan massa $m_1$ adalah **6,2** $\\text{m/s}^2$ (ke atas).',
      insightOlimpiade:
        'Bandingkan efek massa kedua katrol! Pada Soal 8, hanya katrol atas bermassa ($M_1=2$) menurunkan $a_1$ dari $6{,}0$ menjadi $5{,}5\\text{ m/s}^2$. Namun ketika katrol bawah juga diberi massa $M_2 = 2\\text{ kg}$, berat katrol bawah ikut menarik ke bawah sehingga $m_{\\text{eff}}$ naik dari $8{,}0$ menjadi $10{,}1\\text{ kg}$, mendorong $a_1$ naik ke $6{,}2\\text{ m/s}^2$!',
      kesalahanUmum:
        'Melupakan gaya berat $M_2 g$ dan suku inersia translasi $M_2 a_1$ pada persamaan translasi katrol bawah, atau memakai percepatan mutlak $a_3$ sebagai $\\alpha_2 R_2$ (seharusnya percepatan **relatif** $a_{\\text{rel}}$ terhadap poros katrol $P_2$!).',
    },
    narrationStimulus:
      'Soal lima belas, tantangan puncak Olimpiade. Kini kedua katrol pada sistem soal nomor delapan merupakan silinder pejal bermassa masing-masing dua koma nol kilogram yang berotasi tanpa slip. Jika g sama dengan sepuluh meter per sekon kuadrat, tentukan besar percepatan massa m satu.',
    narrationFbd:
      'Perhatikan diagram gaya bebas katrol bawah P dua yang kini bermassa dua kilogram. Selain gaya beratnya sendiri sebesar dua puluh Newton ke bawah, selisih tegangan tali kanan dan kiri di tali bawah menghasilkan rotasi terhadap porosnya dengan percepatan relatif terhadap P dua.',
    narrationPembahasan:
      'Pembahasan soal lima belas. Pada kerangka katrol bawah yang turun dengan percepatan a satu, percepatan relatif m tiga dan m dua memenuhi tiga dikali g kurang a satu dibagi tiga tambah enam tambah satu, yaitu nol koma tiga dikalikan g kurang a satu. Dengan menjumlahkan massa katrol bawah dua kilogram dan kedua tegangan tali bawah, diperoleh massa efektif subsistem bawah sebesar sepuluh koma satu kilogram. Menyamakan T satu kanan dengan dua puluh ditambah tiga a satu menghasilkan tiga belas koma satu a satu sama dengan delapan puluh satu, yaitu delapan ratus sepuluh dibagi seratus tiga puluh satu atau enam koma satu delapan tiga, yang dibulatkan menjadi enam koma dua meter per sekon kuadrat.',
  },
];
