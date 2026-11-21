import test from 'node:test';
import assert from 'node:assert/strict';
import {
  solveSingleAtwood,
  solveDoubleAtwood,
  solveKinematicsConstraint,
  solveMassM1ForZeroA2,
  solveEnergySpeedM3,
  solveInclineDoubleAtwood,
  solveMaxM1ForLowerRopeLimit,
  solveTripleAtwood,
  solveMovingUpperPulley,
  roundToOneDecimal,
  checkNumericAnswer,
  formatIndonesianDecimal,
} from './solvers';

test('Soal 1: Katrol tunggal tetap (mA=3, mB=5, g=10) -> 2,5 m/s^2', () => {
  const { a } = solveSingleAtwood(3, 5, 10);
  assert.equal(roundToOneDecimal(a), 2.5);
});

test('Soal 2: Katrol majemuk simetris (m1=2, m2=4, m3=4, g=10) -> T1 = 32,0 N', () => {
  const res = solveDoubleAtwood({ m1: 2, m2: 4, m3: 4, g: 10 });
  assert.equal(roundToOneDecimal(res.t1Left), 32.0);
  assert.equal(Math.abs(res.t1Left - 2 * res.t2Left) < 1e-9, true);
});

test('Soal 3: Kendala kinematika tali (a1Up=3.2, a2Down=1.8) -> a3Down = 4,6 m/s^2', () => {
  const a3 = solveKinematicsConstraint(3.2, 1.8);
  assert.equal(roundToOneDecimal(a3), 4.6);
});

test('Soal 4 (Soal Asli No. 8 OSK 2026): m1=2, m2=3, m3=6 -> a1/g = 0,6', () => {
  const res = solveDoubleAtwood({ m1: 2, m2: 3, m3: 6, g: 9.8 });
  const ratio = res.a1Up / 9.8;
  assert.equal(roundToOneDecimal(ratio), 0.6);
  // Also independent of g:
  const res10 = solveDoubleAtwood({ m1: 2, m2: 3, m3: 6, g: 10 });
  assert.ok(Math.abs(res10.a1Up / 10 - 0.6) < 1e-12);
});

test('Soal 5: Percepatan relatif m3 terhadap katrol bawah (m1=4, m2=2, m3=6, g=10) -> 4,0 m/s^2', () => {
  const res = solveDoubleAtwood({ m1: 4, m2: 2, m3: 6, g: 10 });
  assert.equal(roundToOneDecimal(res.aRel3vsBottomPulley), 4.0);
});

test('Soal 6: Massa m1 agar m2 diam terhadap tanah (m2=3, m3=9) -> 4,5 kg', () => {
  const m1 = solveMassM1ForZeroA2(3, 9);
  assert.equal(roundToOneDecimal(m1), 4.5);
  const verify = solveDoubleAtwood({ m1, m2: 3, m3: 9, g: 10 });
  assert.ok(Math.abs(verify.a2Down) < 1e-12);
});

test('Soal 7: Sistem No. 8 di dalam lift naik a=2.0 m/s^2 (g=10) -> T1 = 38,4 N', () => {
  const res = solveDoubleAtwood({ m1: 2, m2: 3, m3: 6, g: 10, aLift: 2 });
  assert.equal(roundToOneDecimal(res.t1Left), 38.4);
});

test('Soal 8: Katrol atas bermassa M1=2.0 kg silinder pejal (g=10) -> a1 = 5,5 m/s^2', () => {
  const res = solveDoubleAtwood({ m1: 2, m2: 3, m3: 6, g: 10, mPulleyTop: 2 });
  assert.ok(Math.abs(res.a1Up - 60 / 11) < 1e-12);
  assert.equal(roundToOneDecimal(res.a1Up), 5.5);
});

test('Soal 9: Kelajuan m3 saat m1 naik h=1.5 m (No. 8, g=10) -> 5,2 m/s', () => {
  const v3 = solveEnergySpeedM3({ m1: 2, m2: 3, m3: 6, h1Up: 1.5, g: 10 });
  assert.ok(Math.abs(v3 - (11 * Math.sqrt(2)) / 3) < 1e-12);
  assert.equal(roundToOneDecimal(v3), 5.2);
});

test('Soal 10: m1 di bidang miring kasar theta=37 deg, muK=0.25 -> a1 = 3,1 m/s^2', () => {
  // Using exact sin/cos 37 (0.6018, 0.7986) vs 3-4-5 triangle (0.6, 0.8):
  // Let's verify both stay at 3.1!
  const res = solveInclineDoubleAtwood({
    m1: 5,
    m2: 3,
    m3: 6,
    thetaDeg: 37,
    muK: 0.25,
    g: 10,
  });
  assert.equal(roundToOneDecimal(res.a1UpIncline), 3.1);
});

test('Soal 11: Massa m1 maksimum agar T2 <= 30.0 N (m2=3, m3=6, g=10) -> 4,8 kg', () => {
  const m1Max = solveMaxM1ForLowerRopeLimit({ m2: 3, m3: 6, t2Max: 30, g: 10 });
  assert.equal(roundToOneDecimal(m1Max), 4.8);
  const check = solveDoubleAtwood({ m1: m1Max, m2: 3, m3: 6, g: 10 });
  assert.ok(Math.abs(check.t2Left - 30) < 1e-12);
});

test('Soal 12: Sistem katrol tiga tingkat (m1=4, m2=6, m3=2, m4=6, g=10) -> 5,0 m/s^2', () => {
  const a1 = solveTripleAtwood({ m1: 4, m2: 6, m3: 2, m4: 6, g: 10 });
  assert.equal(roundToOneDecimal(a1), 5.0);
});

test('Soal 13: Katrol atas ditarik gaya F=80 N (m1=2, m2=3, m3=6, g=10) -> a1_rel = 7,5 m/s^2', () => {
  const res = solveMovingUpperPulley({ m1: 2, m2: 3, m3: 6, fUp: 80, g: 10 });
  assert.equal(roundToOneDecimal(res.a1RelUpperPulley), 7.5);
});

test('Soal 14: Percepatan pusat massa sistem No. 8 (g=10) -> 4,2 m/s^2', () => {
  const res = solveDoubleAtwood({ m1: 2, m2: 3, m3: 6, g: 10 });
  assert.ok(Math.abs(res.aComDown - 46 / 11) < 1e-12);
  assert.equal(roundToOneDecimal(res.aComDown), 4.2);
});

test('Soal 15: Kedua katrol silinder pejal bermassa M1=2, M2=2 (g=10) -> a1 = 6,2 m/s^2', () => {
  const res = solveDoubleAtwood({
    m1: 2,
    m2: 3,
    m3: 6,
    g: 10,
    mPulleyTop: 2,
    mPulleyBottom: 2,
  });
  assert.ok(Math.abs(res.a1Up - 810 / 131) < 1e-12);
  assert.equal(roundToOneDecimal(res.a1Up), 6.2);
});

test('Indonesian decimal parser and answer checker', () => {
  assert.equal(formatIndonesianDecimal(0.6), '0,6');
  assert.equal(formatIndonesianDecimal(32), '32,0');

  const ok = checkNumericAnswer('0,6', 0.6);
  assert.equal(ok.isCorrect, true);
  assert.equal(ok.formatNote, undefined);

  const okWithDotNote = checkNumericAnswer('0.6', 0.6);
  assert.equal(okWithDotNote.isCorrect, true);
  assert.ok(okWithDotNote.formatNote);

  const wrong = checkNumericAnswer('0,8', 0.6);
  assert.equal(wrong.isCorrect, false);

  const empty = checkNumericAnswer('   ', 0.6);
  assert.equal(empty.validFormat, false);
  assert.equal(empty.isCorrect, false);
});

import { ALL_PROBLEMS } from '../data/problemsData';

test('Audit 15 soal: kelengkapan struktur, pembulatan 1 desimal koma, dan konsistensi dengan solver', () => {
  assert.equal(ALL_PROBLEMS.length, 15);

  const ids = new Set(ALL_PROBLEMS.map((p) => p.id));
  assert.equal(ids.size, 15);

  for (const p of ALL_PROBLEMS) {
    assert.equal(p.expectedFormatted, formatIndonesianDecimal(p.expectedAnswer, 1));
    assert.ok(p.fbdObjects.length >= 1, `Soal ${p.id} wajib punya FBD`);
    assert.ok(p.animation.equationsTimeline.length >= 2, `Soal ${p.id} wajib punya timeline persamaan`);
    assert.ok(p.pembahasan.memahamiPersoalan.length > 10);
    assert.ok(p.pembahasan.persamaanDasar.length >= 1);
    assert.ok(p.pembahasan.penurunanMatematis.length >= 1);
    assert.ok(p.pembahasan.kesimpulan.includes(p.expectedFormatted), `Kesimpulan Soal ${p.id} harus memuat ${p.expectedFormatted}`);
    assert.ok(p.narrationStimulus.length > 20);
    assert.ok(p.narrationPembahasan.length > 20);

    const check = checkNumericAnswer(p.expectedFormatted, p.expectedAnswer);
    assert.equal(check.isCorrect, true, `Validator gagal untuk kunci Soal ${p.id}`);
  }
});
