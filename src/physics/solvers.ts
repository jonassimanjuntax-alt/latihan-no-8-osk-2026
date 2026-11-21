export interface DoubleAtwoodParams {
  m1: number;
  m2: number;
  m3: number;
  g: number;
  aLift?: number; // upward acceleration of elevator frame
  mPulleyTop?: number; // solid cylinder mass of upper pulley (I = 0.5 M R^2)
  mPulleyBottom?: number; // solid cylinder mass of lower pulley (I = 0.5 M R^2)
}

export interface DoubleAtwoodResult {
  gEff: number;
  mEffBottom: number;
  a1Up: number; // acceleration of m1 upward relative to upper pulley
  aPulleyBottomDown: number; // downward acceleration of lower pulley relative to upper pulley
  a2Down: number; // downward acceleration of m2 relative to upper pulley
  a3Down: number; // downward acceleration of m3 relative to upper pulley
  aRel3vsBottomPulley: number; // downward acceleration of m3 relative to lower pulley
  t1Left: number;
  t1Right: number;
  t2Left: number;
  t2Right: number;
  aComDown: number; // center-of-mass downward acceleration (for massless pulleys)
}

export function solveSingleAtwood(mA: number, mB: number, g: number) {
  const a = ((mB - mA) / (mA + mB)) * g; // positive = mB down, mA up
  const T = ((2 * mA * mB) / (mA + mB)) * g;
  return { a, T };
}

export function solveDoubleAtwood(params: DoubleAtwoodParams): DoubleAtwoodResult {
  const { m1, m2, m3, g, aLift = 0, mPulleyTop = 0, mPulleyBottom = 0 } = params;
  const gEff = g + aLift;

  // Lower assembly: m2 (left), m3 (right), lower pulley mass M2 (I = 0.5 M2 R^2)
  // Relative to lower pulley (which accelerates down at a1Up):
  // g_rel = gEff - a1Up
  // T2R - T2L = 0.5 * M2 * a_rel
  // m3 * (g_rel - a_rel) - m2 * (g_rel + a_rel) = 0.5 * M2 * a_rel
  // => a_rel = ((m3 - m2) / (m2 + m3 + 0.5 * M2)) * (gEff - a1Up)
  const denomRel = m2 + m3 + 0.5 * mPulleyBottom;
  const relFactor = (m3 - m2) / denomRel;
  // T2L + T2R = (m2 + m3) * g_rel - (m3 - m2) * a_rel
  // T1R = M2 * g_rel + T2L + T2R = mEffBottom * (gEff - a1Up)
  const mEffBottom =
    mPulleyBottom + (m2 + m3) - (m3 - m2) * relFactor;

  // Upper pulley: T1L = m1 * (gEff + a1Up), T1R - T1L = 0.5 * M1 * a1Up
  // => T1R = m1 * gEff + (m1 + 0.5 * M1) * a1Up
  // Equating: m1 * gEff + (m1 + 0.5 * M1) * a1Up = mEffBottom * (gEff - a1Up)
  const a1Up =
    ((mEffBottom - m1) / (mEffBottom + m1 + 0.5 * mPulleyTop)) * gEff;

  const gRel = gEff - a1Up;
  const aRel3vsBottomPulley = relFactor * gRel;

  const aPulleyBottomDown = a1Up;
  const a2Down = aPulleyBottomDown - aRel3vsBottomPulley;
  const a3Down = aPulleyBottomDown + aRel3vsBottomPulley;

  const t1Left = m1 * (gEff + a1Up);
  const t1Right = t1Left + 0.5 * mPulleyTop * a1Up;
  const t2Left = m2 * (gRel + aRel3vsBottomPulley);
  const t2Right = m3 * (gRel - aRel3vsBottomPulley);

  const totalMass = m1 + m2 + m3 + mPulleyBottom;
  const aComDown =
    (-m1 * a1Up + m2 * a2Down + m3 * a3Down + mPulleyBottom * aPulleyBottomDown) /
    totalMass;

  return {
    gEff,
    mEffBottom,
    a1Up,
    aPulleyBottomDown,
    a2Down,
    a3Down,
    aRel3vsBottomPulley,
    t1Left,
    t1Right,
    t2Left,
    t2Right,
    aComDown,
  };
}

export function solveKinematicsConstraint(a1Up: number, a2Down: number): number {
  // a_p_down = a1_up; constraint: a2_down + a3_down = 2 * a_p_down
  return 2 * a1Up - a2Down;
}

export function solveMassM1ForZeroA2(m2: number, m3: number): number {
  // When a2_down = 0: T2 = m2 * g, T1 = 2 * m2 * g
  // a3_down = g - T2 / m3 = g * (1 - m2 / m3)
  // a1_up = a_p_down = (a2 + a3) / 2 = 0.5 * g * (1 - m2 / m3)
  // T1 - m1 * g = m1 * a1_up => 2 * m2 = m1 * (1 + 0.5 * (1 - m2 / m3))
  const factor = 1 + 0.5 * (1 - m2 / m3);
  return (2 * m2) / factor;
}

export function solveEnergySpeedM3(params: {
  m1: number;
  m2: number;
  m3: number;
  h1Up: number;
  g: number;
}): number {
  const res = solveDoubleAtwood(params);
  // t^2 = 2 * h1Up / a1Up; v3 = a3Down * t
  const tSquared = (2 * params.h1Up) / res.a1Up;
  return res.a3Down * Math.sqrt(tSquared);
}

export function solveInclineDoubleAtwood(params: {
  m1: number;
  m2: number;
  m3: number;
  thetaDeg: number;
  muK: number;
  g: number;
}) {
  const { m1, m2, m3, thetaDeg, muK, g } = params;
  const rad = (thetaDeg * Math.PI) / 180;
  const sinT = Math.sin(rad);
  const cosT = Math.cos(rad);
  const mEffBottom = (4 * m2 * m3) / (m2 + m3);
  // Assume m1 accelerates up the incline: T1 = m1*g*(sinT + muK*cosT) + m1*a1
  // T1 = mEffBottom*(g - a1)
  const resistive = m1 * g * (sinT + muK * cosT);
  const a1UpIncline = (mEffBottom * g - resistive) / (mEffBottom + m1);
  const t1 = mEffBottom * (g - a1UpIncline);
  return { a1UpIncline, t1, mEffBottom };
}

export function solveMaxM1ForLowerRopeLimit(params: {
  m2: number;
  m3: number;
  t2Max: number;
  g: number;
}): number {
  // T2 = 4*g / (4/m1 + 1/m2 + 1/m3) <= t2Max
  const { m2, m3, t2Max, g } = params;
  const rhs = (4 * g) / t2Max - (1 / m2 + 1 / m3);
  return 4 / rhs;
}

export function solveTripleAtwood(params: {
  m1: number;
  m2: number;
  m3: number;
  m4: number;
  g: number;
}): number {
  const { m1, m2, m3, m4, g } = params;
  const mEff3 = (4 * m3 * m4) / (m3 + m4);
  const mEff2 = (4 * m2 * mEff3) / (m2 + mEff3);
  return ((mEff2 - m1) / (mEff2 + m1)) * g;
}

export function solveMovingUpperPulley(params: {
  m1: number;
  m2: number;
  m3: number;
  fUp: number;
  g: number;
}) {
  const { m1, m2, m3, fUp, g } = params;
  // Upper pulley massless => T1 = Fup / 2, T2 = T1 / 2
  const t1 = fUp / 2;
  const t2 = t1 / 2;
  const a1Up = t1 / m1 - g;
  const a2Down = g - t2 / m2;
  const a3Down = g - t2 / m3;
  const aPulleyBottomDown = (a2Down + a3Down) / 2;
  const aPulleyTopUp = (a1Up - aPulleyBottomDown) / 2;
  const a1RelUpperPulley = a1Up - aPulleyTopUp;
  return {
    t1,
    t2,
    a1Up,
    a2Down,
    a3Down,
    aPulleyBottomDown,
    aPulleyTopUp,
    a1RelUpperPulley,
  };
}

export function roundToOneDecimal(num: number): number {
  return Math.round((num + Number.EPSILON) * 10) / 10;
}

export function formatIndonesianDecimal(num: number, decimals = 1): string {
  return num.toFixed(decimals).replace('.', ',');
}

export interface ParsedAnswer {
  valid: boolean;
  value: number | null;
  hasComma: boolean;
  decimalPlaces: number;
  reason?: string;
}

export function parseIndonesianDecimal(raw: string): ParsedAnswer {
  const trimmed = raw.trim();
  if (!trimmed) {
    return {
      valid: false,
      value: null,
      hasComma: false,
      decimalPlaces: 0,
      reason: 'Kolom jawaban masih kosong. Masukkan angka desimal (contoh: 0,6).',
    };
  }

  // Reject characters outside digits, sign, comma, dot
  if (!/^[+-]?\d+([.,]\d+)?$/.test(trimmed)) {
    return {
      valid: false,
      value: null,
      hasComma: trimmed.includes(','),
      decimalPlaces: 0,
      reason: 'Format tidak valid. Gunakan angka dengan koma desimal, misalnya 0,6 atau 12,5.',
    };
  }

  const hasComma = trimmed.includes(',');
  const sepIndex = Math.max(trimmed.indexOf(','), trimmed.indexOf('.'));
  const decimalPlaces = sepIndex >= 0 ? trimmed.length - sepIndex - 1 : 0;
  const normalized = trimmed.replace(',', '.');
  const value = Number(normalized);

  if (!Number.isFinite(value)) {
    return {
      valid: false,
      value: null,
      hasComma,
      decimalPlaces,
      reason: 'Nilai numerik tidak dikenali.',
    };
  }

  return {
    valid: true,
    value,
    hasComma,
    decimalPlaces,
  };
}

export interface AnswerCheckResult {
  validFormat: boolean;
  isCorrect: boolean;
  parsedValue: number | null;
  expectedFormatted: string;
  feedback: string;
  formatNote?: string;
}

export function checkNumericAnswer(
  rawInput: string,
  expectedRoundedOneDecimal: number
): AnswerCheckResult {
  const parsed = parseIndonesianDecimal(rawInput);
  const expectedFormatted = formatIndonesianDecimal(expectedRoundedOneDecimal, 1);

  if (!parsed.valid || parsed.value === null) {
    return {
      validFormat: false,
      isCorrect: false,
      parsedValue: null,
      expectedFormatted,
      feedback: parsed.reason ?? 'Masukkan jawaban numerik yang valid.',
    };
  }

  const diff = Math.abs(parsed.value - expectedRoundedOneDecimal);
  // Tolerance +/- 0.05 accommodates exact 1-decimal match and slight unrounded entry,
  // while rejecting a 0.1-off wrong rounding.
  const isCorrect = diff <= 0.050001;

  let formatNote: string | undefined;
  if (parsed.decimalPlaces !== 1 || (!parsed.hasComma && rawInput.includes('.'))) {
    formatNote = `Catatan penulisan: biasakan menulis tepat 1 angka di belakang koma menggunakan tanda koma, misalnya ${expectedFormatted}.`;
  }

  if (isCorrect) {
    return {
      validFormat: true,
      isCorrect: true,
      parsedValue: parsed.value,
      expectedFormatted,
      feedback: `Tepat sekali! Jawaban Anda (${rawInput.trim()}) sesuai dengan hasil fisika (${expectedFormatted}).`,
      formatNote,
    };
  }

  return {
    validFormat: true,
    isCorrect: false,
    parsedValue: parsed.value,
    expectedFormatted,
    feedback: `Jawaban Anda (${rawInput.trim()}) belum tepat. Periksa kembali diagram gaya bebas (FBD), persamaan kendala tali, atau pembulatan satu angka desimal.`,
    formatNote,
  };
}
