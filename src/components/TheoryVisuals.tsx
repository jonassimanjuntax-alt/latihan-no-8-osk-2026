import React, { useState } from 'react';
import { TheoryVisualType } from '../data/theoryData';
import { MathDisplay } from './MathBlock';

interface TheoryVisualsProps {
  type: TheoryVisualType;
}

export const TheoryVisuals: React.FC<TheoryVisualsProps> = ({ type }) => {
  const [m2Ratio, setM2Ratio] = useState(3);

  if (type === 'dimensions') {
    return (
      <div className="rounded-xl border border-pink-200 bg-white p-4">
        <h5 className="text-xs font-semibold text-pink-800 mb-3">
          Tabel Satuan SI & Dimensi Besaran Sistem Katrol
        </h5>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse tabular-nums">
            <thead>
              <tr className="border-b border-pink-200 text-slate-700 bg-pink-50/60">
                <th className="py-2 px-3">Besaran</th>
                <th className="py-2 px-3">Simbol</th>
                <th className="py-2 px-3">Satuan SI</th>
                <th className="py-2 px-3">Dimensi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-100">
              <tr>
                <td className="py-2 px-3 font-medium">Massa beban</td>
                <td className="py-2 px-3 font-mono">m₁, m₂, m₃</td>
                <td className="py-2 px-3">kg</td>
                <td className="py-2 px-3 font-mono">[M]</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">Percepatan & gravitasi</td>
                <td className="py-2 px-3 font-mono">a, g</td>
                <td className="py-2 px-3">m/s²</td>
                <td className="py-2 px-3 font-mono">[L T⁻²]</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">Tegangan tali & berat</td>
                <td className="py-2 px-3 font-mono">T₁, T₂, W</td>
                <td className="py-2 px-3">N (kg·m/s²)</td>
                <td className="py-2 px-3 font-mono">[M L T⁻²]</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-medium">Rasio percepatan</td>
                <td className="py-2 px-3 font-mono">a₁ / g</td>
                <td className="py-2 px-3">Tanpa satuan</td>
                <td className="py-2 px-3 font-mono">[1]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  if (type === 'olympiad-effective-mass' || type === 'misconceptions') {
    // Interactive curve comparing m_eff = 4*m2*m3/(m2+m3) vs naive (m2+m3) for m3 = 6 kg
    const m3 = 6;
    const mEff = (4 * m2Ratio * m3) / (m2Ratio + m3);
    const mNaive = m2Ratio + m3;

    const pointsEff: string[] = [];
    const pointsNaive: string[] = [];
    for (let x = 1; x <= 10; x += 0.5) {
      const px = 35 + ((x - 1) / 9) * 240;
      const yEff = 165 - ((4 * x * m3) / (x + m3) / 18) * 135;
      const yNai = 165 - ((x + m3) / 18) * 135;
      pointsEff.push(`${px.toFixed(1)},${yEff.toFixed(1)}`);
      pointsNaive.push(`${px.toFixed(1)},${yNai.toFixed(1)}`);
    }

    const curX = 35 + ((m2Ratio - 1) / 9) * 240;
    const curYEff = 165 - (mEff / 18) * 135;
    const curYNai = 165 - (mNaive / 18) * 135;

    return (
      <div className="rounded-xl border border-pink-200 bg-white p-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h5 className="text-xs font-semibold text-pink-800">
            Grafik Perbandingan: Massa Efektif vs Penjumlahan Naif (m₃ = 6 kg)
          </h5>
          <span className="text-xs font-mono text-slate-600 tabular-nums">
            m₂ = {m2Ratio.toFixed(1).replace('.', ',')} kg
          </span>
        </div>

        <svg viewBox="0 0 310 190" className="w-full max-w-[360px] mx-auto block" role="img" aria-label="Grafik Massa Efektif Katrol">
          {/* Axes */}
          <line x1="35" y1="20" x2="35" y2="165" stroke="#64748b" strokeWidth="1.5" />
          <line x1="35" y1="165" x2="290" y2="165" stroke="#64748b" strokeWidth="1.5" />
          <text x="15" y="18" className="text-[10px] fill-slate-600">m (kg)</text>
          <text x="270" y="182" className="text-[10px] fill-slate-600">m₂ (kg)</text>

          {/* Naive curve */}
          <polyline fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 4" points={pointsNaive.join(' ')} />
          {/* Effective mass curve */}
          <polyline fill="none" stroke="#db2777" strokeWidth="2.8" points={pointsEff.join(' ')} />

          {/* Current points */}
          <line x1={curX} y1="25" x2={curX} y2="165" stroke="#fbcfe8" strokeWidth="1.2" />
          <circle cx={curX} cy={curYNai} r="4" fill="#64748b" />
          <circle cx={curX} cy={curYEff} r="4.5" fill="#db2777" />

          {/* Legend */}
          <line x1="48" y1="32" x2="66" y2="32" stroke="#db2777" strokeWidth="2.8" />
          <text x="72" y="35" className="text-[10px] font-semibold fill-pink-800">m_eff = 4m₂m₃/(m₂+m₃)</text>
          <line x1="48" y1="47" x2="66" y2="47" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 3" />
          <text x="72" y="50" className="text-[10px] fill-slate-600">Keliru: m₂ + m₃</text>
        </svg>

        <div className="space-y-2">
          <label className="flex items-center justify-between text-xs text-slate-700">
            <span>Geser nilai massa m₂ (dengan m₃ = 6,0 kg):</span>
            <span className="font-mono font-semibold text-pink-700 tabular-nums">
              m_eff = {mEff.toFixed(2).replace('.', ',')} kg · (m₂+m₃ = {mNaive.toFixed(1).replace('.', ',')} kg)
            </span>
          </label>
          <input
            type="range"
            min={1}
            max={10}
            step={0.5}
            value={m2Ratio}
            aria-label="Atur massa m2 pada grafik perbandingan massa efektif"
            onChange={(e) => setM2Ratio(Number(e.target.value))}
            className="w-full accent-pink-600 cursor-pointer"
          />
        </div>
      </div>
    );
  }

  if (type === 'laws-fbd' || type === 'derivation' || type === 'connection-q8') {
    return (
      <div className="rounded-xl border border-pink-200 bg-white p-4">
        <h5 className="text-xs font-semibold text-pink-800 mb-2">
          Diagram Skematik & FBD Terintegrasi Soal Nomor 8
        </h5>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <svg viewBox="0 0 260 250" className="w-full max-w-[250px] mx-auto" role="img" aria-label="Diagram Sistem Katrol Soal No 8">
            <defs>
              <marker id="tv-pink" markerWidth="6" markerHeight="6" refX="4.5" refY="3" orient="auto">
                <polygon points="0 0, 6 3, 0 6" fill="#db2777" />
              </marker>
              <marker id="tv-dark" markerWidth="6" markerHeight="6" refX="4.5" refY="3" orient="auto">
                <polygon points="0 0, 6 3, 0 6" fill="#0f172a" />
              </marker>
            </defs>
            {/* Ceiling & fixed pulley P1 */}
            <rect x="45" y="10" width="160" height="7" rx="2" fill="#9d174d" />
            <line x1="115" y1="17" x2="115" y2="44" stroke="#64748b" strokeWidth="3.5" />
            <circle cx="115" cy="44" r="18" fill="#fdf2f8" stroke="#be185d" strokeWidth="2.5" />
            <circle cx="115" cy="44" r="3" fill="#be185d" />
            <text x="72" y="34" className="text-[10px] font-semibold fill-pink-800">P₁ (tetap)</text>

            {/* Ropes 1 */}
            <line x1="97" y1="44" x2="97" y2="128" stroke="#334155" strokeWidth="2" />
            <line x1="133" y1="44" x2="133" y2="110" stroke="#334155" strokeWidth="2" />

            {/* Lower Pulley P2 */}
            <circle cx="133" cy="110" r="15" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" />
            <circle cx="133" cy="110" r="2.8" fill="#0284c7" />
            <text x="152" y="114" className="text-[10px] font-semibold fill-sky-800">P₂ (bergerak)</text>

            {/* Ropes 2 */}
            <line x1="118" y1="110" x2="118" y2="180" stroke="#475569" strokeWidth="1.8" />
            <line x1="148" y1="110" x2="148" y2="195" stroke="#475569" strokeWidth="1.8" />

            {/* m1 */}
            <rect x="83" y="128" width="28" height="24" rx="4" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.8" />
            <text x="97" y="144" textAnchor="middle" className="text-[10px] font-bold fill-slate-900">m₁</text>
            <line x1="97" y1="128" x2="97" y2="100" stroke="#db2777" strokeWidth="2" markerEnd="url(#tv-pink)" />
            <text x="80" y="108" className="text-[9px] font-bold fill-pink-700">T₁</text>
            <line x1="97" y1="152" x2="97" y2="176" stroke="#0f172a" strokeWidth="1.8" markerEnd="url(#tv-dark)" />
            <text x="72" y="175" className="text-[9px] font-bold fill-slate-800">m₁g</text>

            {/* m2 */}
            <rect x="106" y="180" width="24" height="22" rx="4" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.8" />
            <text x="118" y="195" textAnchor="middle" className="text-[10px] font-bold fill-slate-900">m₂</text>
            <line x1="118" y1="180" x2="118" y2="158" stroke="#db2777" strokeWidth="1.8" markerEnd="url(#tv-pink)" />
            <text x="105" y="166" className="text-[9px] font-bold fill-pink-700">T₂</text>

            {/* m3 */}
            <rect x="135" y="195" width="26" height="24" rx="4" fill="#e9d5ff" stroke="#7e22ce" strokeWidth="1.8" />
            <text x="148" y="211" textAnchor="middle" className="text-[10px] font-bold fill-slate-900">m₃</text>
            <line x1="148" y1="195" x2="148" y2="173" stroke="#db2777" strokeWidth="1.8" markerEnd="url(#tv-pink)" />
            <text x="154" y="180" className="text-[9px] font-bold fill-pink-700">T₂</text>

            {/* Coordinate axis y */}
            <line x1="215" y1="20" x2="215" y2="95" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#tv-dark)" />
            <text x="221" y="60" className="text-[10px] font-semibold fill-slate-700">+y (bawah)</text>
          </svg>

          <div className="space-y-2 text-xs text-slate-700">
            <div className="p-2.5 rounded-lg bg-pink-50/70 border border-pink-100">
              <strong className="block text-pink-800 mb-0.5">Keseimbangan Katrol P₂</strong>
              <MathDisplay tex="T_1 = 2T_2" />
            </div>
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/80">
              <strong className="block text-slate-800 mb-0.5">Kendala Panjang Tali</strong>
              <MathDisplay tex="y_1 + y_p = L_1 \implies a_p = -a_{1,\text{turun}}" />
              <MathDisplay tex="y_2 + y_3 - 2y_p = L_2 \implies a_2 + a_3 = 2a_p" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default schematic phenomenon / coordinate / real-life visual
  return (
    <div className="rounded-xl border border-pink-200 bg-white p-4">
      <h5 className="text-xs font-semibold text-pink-800 mb-2">
        Visualisasi Konsep · Hubungan Sebab-Akibat Sistem Katrol Majemuk
      </h5>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3 rounded-lg bg-pink-50/60 border border-pink-100">
          <span className="font-semibold text-pink-800 block mb-1">1. Tali Atas (T₁)</span>
          <p className="text-slate-700">
            Menghubungkan <MathDisplay tex="m_1" /> dengan poros katrol bawah <MathDisplay tex="P_2" /> melewati katrol tetap atas <MathDisplay tex="P_1" />.
          </p>
        </div>
        <div className="p-3 rounded-lg bg-sky-50/60 border border-sky-100">
          <span className="font-semibold text-sky-900 block mb-1">2. Katrol Bergerak (P₂)</span>
          <p className="text-slate-700">
            Ikut bergerak naik/turun sambil membagi tegangan <MathDisplay tex="T_1" /> menjadi dua cabang <MathDisplay tex="T_2" /> yang sama besar.
          </p>
        </div>
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
          <span className="font-semibold text-slate-900 block mb-1">3. Tali Bawah (T₂)</span>
          <p className="text-slate-700">
            Memungkinkan <MathDisplay tex="m_2" /> dan <MathDisplay tex="m_3" /> bergerak relatif satu sama lain dengan percepatan rata-rata sama dengan <MathDisplay tex="a_p" />.
          </p>
        </div>
      </div>
    </div>
  );
};
