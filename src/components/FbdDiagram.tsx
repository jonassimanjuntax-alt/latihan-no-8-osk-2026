import React, { useState } from 'react';
import { Volume2, Layers } from 'lucide-react';
import { FbdObjectSpec } from '../data/problemsTypes';
import { MathDisplay } from './MathBlock';
import { misterJoNarrator } from '../utils/ttsNarrator';

interface FbdDiagramProps {
  objects: FbdObjectSpec[];
  narrationScript: string;
  problemCode: string;
}

export const FbdDiagram: React.FC<FbdDiagramProps> = ({
  objects,
  narrationScript,
  problemCode,
}) => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [visibleSteps, setVisibleSteps] = useState<number>(99);

  const activeObj = objects[selectedIdx] ?? objects[0];
  if (!activeObj) return null;

  const totalVectors = activeObj.vectors.length;
  const shownCount = Math.min(visibleSteps, totalVectors);

  const handleStepBuild = () => {
    setVisibleSteps((prev) => (prev >= totalVectors ? 1 : prev + 1));
  };

  return (
    <div className="rounded-xl border border-pink-200 bg-white overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-pink-100 bg-pink-50/40">
        <div>
          <h4 className="text-sm font-semibold text-slate-900">
            Free Body Diagram (FBD) & Sistem Koordinat
          </h4>
          <p className="text-xs text-slate-600">
            Pilih benda tinjauan untuk memeriksa arah vektor gaya dan komponennya.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleStepBuild}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-pink-200 bg-white text-xs font-medium text-slate-700 hover:bg-pink-50 transition-colors whitespace-nowrap"
          >
            <Layers className="w-3.5 h-3.5 text-pink-600" />
            {shownCount < totalVectors
              ? `Tambah Vektor (${shownCount}/${totalVectors})`
              : 'Bentuk Bertahap'}
          </button>
          <button
            type="button"
            onClick={() =>
              misterJoNarrator.speak(`Penjelasan FBD ${problemCode}`, narrationScript)
            }
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-600 text-white text-xs font-semibold hover:bg-pink-700 transition-colors whitespace-nowrap"
          >
            <Volume2 className="w-3.5 h-3.5" />
            Dengarkan FBD
          </button>
        </div>
      </div>

      {/* Object tabs */}
      {objects.length > 1 && (
        <div className="flex flex-wrap gap-1.5 px-4 py-2.5 border-b border-pink-100 bg-white">
          {objects.map((obj, idx) => (
            <button
              key={obj.id}
              type="button"
              onClick={() => {
                setSelectedIdx(idx);
                setVisibleSteps(99);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                selectedIdx === idx
                  ? 'bg-pink-600 text-white'
                  : 'bg-pink-50 text-slate-700 hover:bg-pink-100'
              }`}
            >
              {obj.name}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        {/* Vector Canvas */}
        <div className="md:col-span-6 p-4 flex items-center justify-center bg-gradient-to-b from-white to-pink-50/25">
          <svg viewBox="0 0 280 240" className="w-full max-w-[280px] h-auto" role="img" aria-label={`FBD ${activeObj.name}`}>
            <defs>
              <marker id="fbd-arrow-pink" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                <polygon points="0 0, 7 3.5, 0 7" fill="#db2777" />
              </marker>
              <marker id="fbd-arrow-dark" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                <polygon points="0 0, 7 3.5, 0 7" fill="#0f172a" />
              </marker>
              <marker id="fbd-arrow-blue" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                <polygon points="0 0, 7 3.5, 0 7" fill="#0284c7" />
              </marker>
              <marker id="fbd-arrow-amber" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                <polygon points="0 0, 7 3.5, 0 7" fill="#d97706" />
              </marker>
              <marker id="fbd-arrow-purple" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
                <polygon points="0 0, 7 3.5, 0 7" fill="#9333ea" />
              </marker>
            </defs>

            {/* Coordinate axes */}
            <g transform={activeObj.isInclined ? `translate(140, 120) rotate(-${activeObj.inclineDeg ?? 37})` : 'translate(140, 120)'}>
              <line x1="-100" y1="0" x2="100" y2="0" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="0" y1="-95" x2="0" y2="95" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />
              <text x="84" y="-6" className="text-[10px] fill-slate-400 font-mono">+x</text>
              <text x="6" y="-84" className="text-[10px] fill-slate-400 font-mono">+y</text>

              {activeObj.isInclined && (
                <line x1="-85" y1="16" x2="85" y2="16" stroke="#f472b6" strokeWidth="2" />
              )}
            </g>

            {/* Object & Center of Mass */}
            <rect
              x="124"
              y="104"
              width="32"
              height="32"
              rx="6"
              transform={activeObj.isInclined ? `rotate(-${activeObj.inclineDeg ?? 37} 140 120)` : undefined}
              fill="#fce7f3"
              stroke="#be185d"
              strokeWidth="2"
            />
            <circle cx="140" cy="120" r="3.5" fill="#be185d" />

            {/* Force Vectors */}
            {activeObj.vectors.slice(0, shownCount).map((vec, i) => {
              const rad = (vec.directionDeg * Math.PI) / 180;
              // SVG y points down, so y component = -sin(deg)
              const dx = Math.cos(rad) * (58 * vec.magnitudeRel);
              const dy = -Math.sin(rad) * (58 * vec.magnitudeRel);
              // Slight horizontal offset if multiple downward or upward arrows overlap
              const sameDirBefore = activeObj.vectors
                .slice(0, i)
                .filter((v) => Math.abs(v.directionDeg - vec.directionDeg) < 10).length;
              const offsetX = sameDirBefore * 12 * (sameDirBefore % 2 === 0 ? 1 : -1);

              const x1 = 140 + offsetX;
              const y1 = 120;
              const x2 = x1 + dx;
              const y2 = y1 + dy;

              const markerId =
                vec.color === '#0f172a'
                  ? 'url(#fbd-arrow-dark)'
                  : vec.color === '#0284c7'
                    ? 'url(#fbd-arrow-blue)'
                    : vec.color === '#d97706'
                      ? 'url(#fbd-arrow-amber)'
                      : vec.color === '#9333ea'
                        ? 'url(#fbd-arrow-purple)'
                        : 'url(#fbd-arrow-pink)';

              const labelX = x2 + (dx >= 0 ? 8 : -8);
              const labelY = y2 + (dy >= 0 ? 12 : -6);

              return (
                <g key={vec.id}>
                  <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={vec.color}
                    strokeWidth="2.6"
                    markerEnd={markerId}
                  />
                  <text
                    x={labelX}
                    y={labelY}
                    textAnchor={dx >= 0 ? 'start' : 'end'}
                    className="text-[11px] font-bold"
                    fill={vec.color}
                  >
                    {vec.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Vector Details & Mathematical Relation */}
        <div className="md:col-span-6 p-4 border-t md:border-t-0 md:border-l border-pink-100 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
            <span className="font-semibold text-slate-900">{activeObj.massLabel}</span>
            <span>Sumbu: {activeObj.axesLabel}</span>
          </div>

          <ul className="space-y-2">
            {activeObj.vectors.slice(0, shownCount).map((vec) => (
              <li
                key={vec.id}
                className="text-xs p-2.5 rounded-lg bg-pink-50/40 border border-pink-100"
              >
                <div className="flex items-center justify-between gap-2 font-semibold text-slate-900">
                  <span>{vec.label}</span>
                  <span className="font-mono text-pink-700">{vec.formulaLabel}</span>
                </div>
                <p className="text-slate-600 mt-0.5">{vec.explanation}</p>
              </li>
            ))}
          </ul>

          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
            <span className="text-[11px] font-semibold text-slate-500 block mb-1">
              Persamaan Dinamika / Hubungan Vektor
            </span>
            <MathDisplay tex={activeObj.mathRelation} block className="text-sm" />
          </div>
        </div>
      </div>
    </div>
  );
};
