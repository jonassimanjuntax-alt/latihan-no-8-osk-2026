import React, { useMemo, useState } from 'react';
import { Volume2, RotateCcw } from 'lucide-react';
import { solveDoubleAtwood } from '../physics/solvers';
import { PhysicsCanvas } from './PhysicsCanvas';
import { MathDisplay } from './MathBlock';
import { misterJoNarrator } from '../utils/ttsNarrator';

export const AnimationLab: React.FC = () => {
  const [m1, setM1] = useState(2.0);
  const [m2, setM2] = useState(3.0);
  const [m3, setM3] = useState(6.0);
  const [g, setG] = useState(10.0);
  const [aLift, setALift] = useState(0.0);
  const [mPulleyTop, setMPulleyTop] = useState(0.0);

  const solved = useMemo(
    () =>
      solveDoubleAtwood({
        m1,
        m2,
        m3,
        g,
        aLift,
        mPulleyTop,
      }),
    [m1, m2, m3, g, aLift, mPulleyTop]
  );

  const animConfig = useMemo(
    () => ({
      type: aLift !== 0 ? ('lift' as const) : ('double' as const),
      m1,
      m2,
      m3,
      g,
      aLift,
      mPulleyTop,
      a1Display: solved.a1Up,
      a2Display: solved.a2Down,
      a3Display: solved.a3Down,
      aPulleyBottomDown: solved.aPulleyBottomDown,
      t1Value: solved.t1Left,
      t2Value: solved.t2Left,
      equationsTimeline: [
        {
          phaseLabel: 'Tahap 1 · Massa Efektif Bawah',
          tex: `m_{\\text{eff}} = \\frac{4(${m2.toFixed(1).replace('.', ',')})(${m3.toFixed(1).replace('.', ',')})}{${m2.toFixed(1).replace('.', ',')}+${m3.toFixed(1).replace('.', ',')}} = ${solved.mEffBottom.toFixed(1).replace('.', ',')}\\text{ kg}`,
          caption: 'Subsistem katrol bawah ekuivalen dengan massa efektif tunggal di tali kanan.',
        },
        {
          phaseLabel: 'Tahap 2 · Gravitasi Efektif & Percepatan m₁',
          tex: `a_1 = \\frac{${solved.mEffBottom.toFixed(1).replace('.', ',')} - ${m1.toFixed(1).replace('.', ',')}}{${(solved.mEffBottom + m1 + 0.5 * mPulleyTop).toFixed(1).replace('.', ',')}}(${solved.gEff.toFixed(0)}) = ${solved.a1Up.toFixed(2).replace('.', ',')}\\text{ m/s}^2`,
          caption:
            solved.a1Up >= 0
              ? 'Karena m_eff > m₁, massa m₁ bergerak dipercepat ke ATAS.'
              : 'Karena m₁ > m_eff, massa m₁ bergerak dipercepat ke BAWAH.',
        },
        {
          phaseLabel: 'Tahap 3 · Tegangan Tali & Rasio a₁/g',
          tex: `T_1 = ${solved.t1Left.toFixed(1).replace('.', ',')}\\text{ N} \\; ; \\; T_2 = ${solved.t2Left.toFixed(1).replace('.', ',')}\\text{ N}`,
          caption: `Rasio a₁/g_eff = ${(solved.a1Up / solved.gEff).toFixed(2).replace('.', ',')}.`,
        },
      ],
    }),
    [m1, m2, m3, g, aLift, mPulleyTop, solved]
  );

  const applyPreset = (preset: 'q8' | 'm2-still' | 'massive-top' | 'lift') => {
    if (preset === 'q8') {
      setM1(2.0);
      setM2(3.0);
      setM3(6.0);
      setG(10.0);
      setALift(0.0);
      setMPulleyTop(0.0);
    } else if (preset === 'm2-still') {
      setM1(4.5);
      setM2(3.0);
      setM3(9.0);
      setG(10.0);
      setALift(0.0);
      setMPulleyTop(0.0);
    } else if (preset === 'massive-top') {
      setM1(2.0);
      setM2(3.0);
      setM3(6.0);
      setG(10.0);
      setALift(0.0);
      setMPulleyTop(2.0);
    } else {
      setM1(2.0);
      setM2(3.0);
      setM3(6.0);
      setG(10.0);
      setALift(2.0);
      setMPulleyTop(0.0);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-28 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-pink-200/80 pb-5">
        <div>
          <p className="text-xs font-semibold text-pink-700 mb-1">
            Laboratorium Simulasi Interaktif · Sistem Katrol No. 8
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Animasi Fisika & Eksplorasi Parameter
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Ubah massa beban, percepatan lift, dan massa katrol atas untuk mengamati perubahan percepatan, arah gerak, serta tegangan tali secara langsung.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            misterJoNarrator.speak(
              'Penjelasan Laboratorium Simulasi Katrol',
              `Pada simulasi saat ini, m satu bernilai ${m1.toFixed(1).replace('.', ',')} kilogram, m dua ${m2.toFixed(1).replace('.', ',')} kilogram, dan m tiga ${m3.toFixed(1).replace('.', ',')} kilogram. Massa efektif katrol bawah adalah ${solved.mEffBottom.toFixed(2).replace('.', ',')} kilogram. Percepatan m satu adalah ${Math.abs(solved.a1Up).toFixed(2).replace('.', ',')} meter per sekon kuadrat ke arah ${solved.a1Up >= 0 ? 'atas' : 'bawah'}, dengan tegangan tali T satu ${solved.t1Left.toFixed(1).replace('.', ',')} Newton dan T dua ${solved.t2Left.toFixed(1).replace('.', ',')} Newton.`
            )
          }
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-600 text-white text-xs font-semibold hover:bg-pink-700 transition-colors self-start"
        >
          <Volume2 className="w-4 h-4" />
          Bacakan Hasil Simulasi
        </button>
      </div>

      {/* Presets */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-600 mr-1">Preset Kasus:</span>
        <button
          type="button"
          onClick={() => applyPreset('q8')}
          className="px-3 py-1.5 rounded-lg border border-pink-200 bg-white text-xs font-medium text-slate-700 hover:bg-pink-50 transition-colors"
        >
          Soal Asli No. 8 (2:3:6)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('m2-still')}
          className="px-3 py-1.5 rounded-lg border border-pink-200 bg-white text-xs font-medium text-slate-700 hover:bg-pink-50 transition-colors"
        >
          Kondisi m₂ Diam (4,5:3:9)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('massive-top')}
          className="px-3 py-1.5 rounded-lg border border-pink-200 bg-white text-xs font-medium text-slate-700 hover:bg-pink-50 transition-colors"
        >
          Katrol Atas Bermassa (Soal 8)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('lift')}
          className="px-3 py-1.5 rounded-lg border border-pink-200 bg-white text-xs font-medium text-slate-700 hover:bg-pink-50 transition-colors"
        >
          Di Dalam Lift Naik (Soal 7)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Interactive Stage */}
        <div className="lg:col-span-7 space-y-4">
          <PhysicsCanvas
            config={animConfig}
            title="Simulasi Dinamika Sistem Katrol Majemuk (Real-Time)"
          />
        </div>

        {/* Parameter Deck & Live Calculations */}
        <div className="lg:col-span-5 rounded-2xl border border-pink-200 bg-white p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-pink-100 pb-3">
            <h3 className="text-sm font-bold text-slate-900">Panel Kontrol Parameter</h3>
            <button
              type="button"
              onClick={() => applyPreset('q8')}
              className="inline-flex items-center gap-1 text-xs font-medium text-pink-700 hover:text-pink-800"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset ke No. 8
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <label className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Massa m₁ (kiri atas)</span>
                <span className="font-mono font-bold text-pink-700 tabular-nums">
                  {m1.toFixed(1).replace('.', ',')} kg
                </span>
              </label>
              <input
                type="range"
                min={0.5}
                max={12}
                step={0.5}
                value={m1}
                aria-label="Massa m1"
                onChange={(e) => setM1(Number(e.target.value))}
                className="w-full accent-pink-600 cursor-pointer"
              />
            </div>

            <div>
              <label className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Massa m₂ (kiri bawah)</span>
                <span className="font-mono font-bold text-pink-700 tabular-nums">
                  {m2.toFixed(1).replace('.', ',')} kg
                </span>
              </label>
              <input
                type="range"
                min={1}
                max={12}
                step={0.5}
                value={m2}
                aria-label="Massa m2"
                onChange={(e) => setM2(Number(e.target.value))}
                className="w-full accent-pink-600 cursor-pointer"
              />
            </div>

            <div>
              <label className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Massa m₃ (kanan bawah)</span>
                <span className="font-mono font-bold text-pink-700 tabular-nums">
                  {m3.toFixed(1).replace('.', ',')} kg
                </span>
              </label>
              <input
                type="range"
                min={1}
                max={12}
                step={0.5}
                value={m3}
                aria-label="Massa m3"
                onChange={(e) => setM3(Number(e.target.value))}
                className="w-full accent-pink-600 cursor-pointer"
              />
            </div>

            <div>
              <label className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Percepatan Lift (a_lift)</span>
                <span className="font-mono font-bold text-sky-700 tabular-nums">
                  {aLift.toFixed(1).replace('.', ',')} m/s²
                </span>
              </label>
              <input
                type="range"
                min={-4}
                max={6}
                step={0.5}
                value={aLift}
                aria-label="Percepatan Lift"
                onChange={(e) => setALift(Number(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
            </div>

            <div>
              <label className="flex justify-between text-xs font-medium text-slate-700 mb-1">
                <span>Massa Katrol Atas M₁ (Silinder Pejal)</span>
                <span className="font-mono font-bold text-amber-700 tabular-nums">
                  {mPulleyTop.toFixed(1).replace('.', ',')} kg
                </span>
              </label>
              <input
                type="range"
                min={0}
                max={6}
                step={0.5}
                value={mPulleyTop}
                aria-label="Massa Katrol Atas"
                onChange={(e) => setMPulleyTop(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Live Readout Table */}
          <div className="pt-3 border-t border-pink-100 space-y-2">
            <p className="text-xs font-bold text-slate-800">Hasil Perhitungan Eksak</p>
            <div className="grid grid-cols-2 gap-2 text-xs tabular-nums">
              <div className="p-2.5 rounded-lg bg-pink-50/70 border border-pink-100">
                <span className="text-slate-500 block">a₁ (relatif P₁)</span>
                <strong className="font-mono text-pink-800">
                  {solved.a1Up.toFixed(2).replace('.', ',')} m/s²{' '}
                  {solved.a1Up >= 0 ? '↑' : '↓'}
                </strong>
              </div>
              <div className="p-2.5 rounded-lg bg-pink-50/70 border border-pink-100">
                <span className="text-slate-500 block">Rasio a₁ / g_eff</span>
                <strong className="font-mono text-pink-800">
                  {(solved.a1Up / solved.gEff).toFixed(2).replace('.', ',')}
                </strong>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 block">a₂ (ke bawah)</span>
                <strong className="font-mono text-slate-900">
                  {solved.a2Down.toFixed(2).replace('.', ',')} m/s²
                </strong>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 block">a₃ (ke bawah)</span>
                <strong className="font-mono text-slate-900">
                  {solved.a3Down.toFixed(2).replace('.', ',')} m/s²
                </strong>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 block">Tegangan T₁ (kiri)</span>
                <strong className="font-mono text-slate-900">
                  {solved.t1Left.toFixed(1).replace('.', ',')} N
                </strong>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="text-slate-500 block">Tegangan T₂</span>
                <strong className="font-mono text-slate-900">
                  {solved.t2Left.toFixed(1).replace('.', ',')} N
                </strong>
              </div>
            </div>

            <div className="p-2.5 rounded-lg bg-pink-50/40 border border-pink-100 text-xs">
              <MathDisplay
                tex={`m_{\\text{eff}} = ${solved.mEffBottom.toFixed(2).replace('.', ',')}\\text{ kg} \\quad ; \\quad a_{\\text{PM}} = ${solved.aComDown.toFixed(2).replace('.', ',')}\\text{ m/s}^2`}
                block
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
