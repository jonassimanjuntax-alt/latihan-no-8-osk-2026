import { PROBLEMS_PART_1 } from './problemsPart1';
import { PROBLEMS_PART_2 } from './problemsPart2';
import { PhysicsProblem } from './problemsTypes';

export const ALL_PROBLEMS: PhysicsProblem[] = [...PROBLEMS_PART_1, ...PROBLEMS_PART_2];

export const TIER_GROUPS = [
  {
    tier: 'Fundamental & Penguatan Konsep',
    range: 'Soal 1–3',
    description: 'Membangun pemahaman dasar mesin Atwood, relasi T₁ = 2T₂, dan kendala kinematika tali.',
  },
  {
    tier: 'Aplikasi Konsep & Penalaran Matematis',
    range: 'Soal 4–6',
    description: 'Penguasaan penuh Soal Asli No. 8 OSK 2026, gerak relatif terhadap katrol bergerak, dan kondisi m₂ diam.',
  },
  {
    tier: 'Analisis Fenomena Tingkat Menengah',
    range: 'Soal 7–9',
    description: 'Kerangka non-inersia di dalam lift, katrol bermassa dengan inersia rotasi, dan metode energi.',
  },
  {
    tier: 'HOTS & Kombinasi Prinsip Fisika',
    range: 'Soal 10–12',
    description: 'Kombinasi bidang miring ber-gesekan, batas tegangan putus tali, dan sistem katrol tiga tingkat.',
  },
  {
    tier: 'Tantangan Olimpiade Tingkat Kota',
    range: 'Soal 13–15',
    description: 'Katrol atas ikut bergerak ditarik gaya luar, percepatan pusat massa sistem, dan dua katrol bermassa.',
  },
] as const;

export * from './problemsTypes';
