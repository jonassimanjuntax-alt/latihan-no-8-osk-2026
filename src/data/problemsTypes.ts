export type DifficultyTier =
  | 'Fundamental & Penguatan Konsep'
  | 'Aplikasi Konsep & Penalaran Matematis'
  | 'Analisis Fenomena Tingkat Menengah'
  | 'HOTS & Kombinasi Prinsip Fisika'
  | 'Tantangan Olimpiade Tingkat Kota';

export type AnimationSystemType =
  | 'single'
  | 'double'
  | 'incline'
  | 'triple'
  | 'lift'
  | 'moving-top';

export interface FbdForceVector {
  id: string;
  label: string;
  directionDeg: number; // 0 = right (+x), 90 = up (+y), 180 = left, 270 = down (-y)
  magnitudeRel: number; // relative visual length (0.4 to 1.4)
  color: string;
  formulaLabel: string;
  explanation: string;
}

export interface FbdObjectSpec {
  id: string;
  name: string;
  massLabel: string;
  axesLabel: string;
  isInclined?: boolean;
  inclineDeg?: number;
  vectors: FbdForceVector[];
  mathRelation: string;
}

export interface ProblemAnimationConfig {
  type: AnimationSystemType;
  m1: number;
  m2: number;
  m3: number;
  m4?: number;
  g: number;
  aLift?: number;
  mPulleyTop?: number;
  mPulleyBottom?: number;
  thetaDeg?: number;
  muK?: number;
  fUp?: number;
  a1Display: number; // magnitude or signed velocity driver
  a2Display: number;
  a3Display: number;
  a4Display?: number;
  aPulleyTopUp?: number;
  aPulleyBottomDown: number;
  t1Value: number;
  t2Value: number;
  equationsTimeline: Array<{
    phaseLabel: string;
    tex: string;
    caption: string;
  }>;
}

export interface Pembahasan12Steps {
  memahamiPersoalan: string;
  identifikasiInformasi: {
    diketahui: string[];
    ditanyakan: string;
    asumsiFisika: string[];
    batasanSistem: string[];
  };
  visualisasiFisika: string;
  analisisKonsep: string;
  persamaanDasar: string[];
  penurunanMatematis: string[];
  substitusiAngka: string[];
  perhitungan: string[];
  pembulatan: string;
  kesimpulan: string;
  insightOlimpiade: string;
  kesalahanUmum: string;
}

export interface PhysicsProblem {
  id: number;
  code: string;
  title: string;
  tier: DifficultyTier;
  tierRange: string;
  conceptTested: string;
  recommendedTheoryId: number;
  stimulusSummary: string;
  stimulusTable?: {
    caption: string;
    headers: string[];
    rows: string[][];
  };
  questionPrompt: string;
  unit: string;
  expectedAnswer: number;
  expectedFormatted: string;
  animation: ProblemAnimationConfig;
  fbdObjects: FbdObjectSpec[];
  pembahasan: Pembahasan12Steps;
  narrationStimulus: string;
  narrationFbd: string;
  narrationPembahasan: string;
}
