import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, RotateCcw, RefreshCw } from 'lucide-react';
import { ProblemAnimationConfig } from '../data/problemsTypes';
import { MathDisplay } from './MathBlock';

interface PhysicsCanvasProps {
  config: ProblemAnimationConfig;
  title?: string;
  compact?: boolean;
}

const MAX_TIME = 1.6; // seconds of physical evolution shown smoothly

export const PhysicsCanvas: React.FC<PhysicsCanvasProps> = ({
  config,
  title = 'Animasi Pembuktian Fenomena Fisika',
  compact = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [simTime, setSimTime] = useState(0);
  const [speed, setSpeed] = useState<number>(1.0);
  const [showVectors, setShowVectors] = useState(true);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number | null>(null);

  // Reset when problem changes
  useEffect(() => {
    setIsPlaying(false);
    setSimTime(0);
    lastFrameRef.current = null;
  }, [config]);

  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lastFrameRef.current = null;
      return;
    }

    const step = (now: number) => {
      if (lastFrameRef.current === null) {
        lastFrameRef.current = now;
      }
      const dt = ((now - lastFrameRef.current) / 1000) * speed;
      lastFrameRef.current = now;

      setSimTime((prev) => {
        const next = prev + dt;
        if (next >= MAX_TIME) {
          setIsPlaying(false);
          return MAX_TIME;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, speed]);

  const handlePlayPause = () => {
    if (simTime >= MAX_TIME) {
      setSimTime(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((p) => !p);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setSimTime(0);
  };

  const handleReplay = () => {
    setSimTime(0);
    setIsPlaying(true);
  };

  // Compute physical displacements s = 0.5 * a * t^2
  // Scale carefully so all displacements stay comfortably inside the 340x320 SVG viewport
  const progress = simTime / MAX_TIME;
  const maxAccel = Math.max(
    Math.abs(config.a1Display),
    Math.abs(config.a2Display),
    Math.abs(config.a3Display),
    Math.abs(config.a4Display ?? 0),
    Math.abs(config.aPulleyBottomDown),
    1
  );
  // Maximum pixel displacement at MAX_TIME
  const pxScale = 34 / (0.5 * maxAccel * MAX_TIME * MAX_TIME);

  const s1 = 0.5 * config.a1Display * simTime * simTime;
  const s2 = 0.5 * config.a2Display * simTime * simTime;
  const s3 = 0.5 * config.a3Display * simTime * simTime;
  const s4 = 0.5 * (config.a4Display ?? 0) * simTime * simTime;
  const sPb = 0.5 * config.aPulleyBottomDown * simTime * simTime;
  const sPt = 0.5 * (config.aPulleyTopUp ?? 0) * simTime * simTime;

  const v1 = config.a1Display * simTime;
  const v2 = config.a2Display * simTime;
  const v3 = config.a3Display * simTime;

  // Determine active equation step from progress
  const activeStepIdx = Math.min(
    config.equationsTimeline.length - 1,
    Math.floor(progress * config.equationsTimeline.length)
  );
  const activeEq = config.equationsTimeline[activeStepIdx];

  const renderSvgScene = () => {
    if (config.type === 'single') {
      const pX = 170;
      const pY = 54;
      const r = 24;
      const dy = s1 * pxScale;
      const yA = 175 - dy;
      const yB = 155 + dy;
      const rotDeg = ((s1 * pxScale) / r) * (180 / Math.PI);

      return (
        <svg viewBox="0 0 340 300" className="w-full h-full select-none" role="img" aria-label="Simulasi Mesin Atwood Tunggal">
          {/* Ceiling */}
          <rect x="70" y="14" width="200" height="8" rx="2" fill="#9d174d" />
          <line x1={pX} y1="22" x2={pX} y2={pY} stroke="#64748b" strokeWidth="4" />

          {/* Ropes */}
          <line x1={pX - r} y1={pY} x2={pX - r} y2={yA - 16} stroke="#334155" strokeWidth="2.5" />
          <line x1={pX + r} y1={pY} x2={pX + r} y2={yB - 18} stroke="#334155" strokeWidth="2.5" />

          {/* Pulley */}
          <g transform={`translate(${pX}, ${pY}) rotate(${rotDeg})`}>
            <circle cx="0" cy="0" r={r} fill="#fdf2f8" stroke="#be185d" strokeWidth="3" />
            <line x1={-r + 4} y1="0" x2={r - 4} y2="0" stroke="#f472b6" strokeWidth="1.5" />
            <line x1="0" y1={-r + 4} x2="0" y2={r - 4} stroke="#f472b6" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="4" fill="#be185d" />
          </g>

          {/* Block A */}
          <g transform={`translate(${pX - r}, ${yA})`}>
            <rect x="-20" y="-16" width="40" height="32" rx="6" fill="#fbcfe8" stroke="#be185d" strokeWidth="2" />
            <text x="0" y="4" textAnchor="middle" className="text-[11px] font-bold fill-slate-900">
              mA={config.m1}kg
            </text>
            {showVectors && (
              <>
                <line x1="0" y1="-16" x2="0" y2="-46" stroke="#db2777" strokeWidth="2.5" markerEnd="url(#arrow-pink)" />
                <text x="8" y="-34" className="text-[10px] font-semibold fill-pink-700">T</text>
                <line x1="0" y1="16" x2="0" y2="44" stroke="#0f172a" strokeWidth="2" markerEnd="url(#arrow-dark)" />
                <text x="8" y="40" className="text-[10px] font-semibold fill-slate-800">mAg</text>
              </>
            )}
          </g>

          {/* Block B */}
          <g transform={`translate(${pX + r}, ${yB})`}>
            <rect x="-22" y="-18" width="44" height="36" rx="6" fill="#fce7f3" stroke="#9d174d" strokeWidth="2" />
            <text x="0" y="4" textAnchor="middle" className="text-[11px] font-bold fill-slate-900">
              mB={config.m2}kg
            </text>
            {showVectors && (
              <>
                <line x1="0" y1="-18" x2="0" y2="-48" stroke="#db2777" strokeWidth="2.5" markerEnd="url(#arrow-pink)" />
                <text x="8" y="-36" className="text-[10px] font-semibold fill-pink-700">T</text>
                <line x1="0" y1="18" x2="0" y2="54" stroke="#0f172a" strokeWidth="2" markerEnd="url(#arrow-dark)" />
                <text x="8" y="48" className="text-[10px] font-semibold fill-slate-800">mBg</text>
              </>
            )}
          </g>

          {/* Gravity arrow */}
          <g transform="translate(275, 42)">
            <line x1="0" y1="0" x2="0" y2="28" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow-dark)" />
            <text x="8" y="18" className="text-[11px] font-bold fill-slate-700">g</text>
          </g>
        </svg>
      );
    }

    if (config.type === 'incline') {
      // 37-degree inclined plane from bottom-left (30, 260) up-right to apex (210, 124)
      // Angle: atan2(136, 180) = 37.07 deg! Very accurate 37 deg!
      const ax = 30, ay = 260;
      const bx = 210, by = 124;
      const dx = bx - ax, dy = by - ay;
      const len = Math.hypot(dx, dy);
      const ux = dx / len, uy = dy / len; // unit along slope upward
      const nx = uy, ny = -ux; // outward normal?Wait: (-dy, dx)/len points up-left! Let's check: ux > 0, uy < 0. (-uy, ux) = (+, +) down-right; (uy, -ux) = (-, -) up-left!
      // Wait: normal pointing UP from slope is (uy, -ux) = (-0.6, -0.8)? Check dot product with (ux, uy): ux*uy + uy*(-ux) = 0. Since uy < 0, uy is negative (x left), -ux is negative (y up!). Yes!
      const nUpX = uy, nUpY = -ux;

      const p1X = bx + 8, p1Y = by - 8; // upper pulley near apex
      const r1 = 15;
      const distAlong = s1 * pxScale;
      // Block starts at t = 0.42 along slope, moves UP toward apex
      const posFrac = 0.42;
      const cx = ax + ux * (len * posFrac + distAlong) + nUpX * 14;
      const cy = ay + uy * (len * posFrac + distAlong) + nUpY * 14;

      // Rope from block center top edge parallel to slope to pulley tangent
      const ropeStartX = cx + ux * 16;
      const ropeStartY = cy + uy * 16;
      const pulleyTanTopX = p1X + nUpX * r1;
      const pulleyTanTopY = p1Y + nUpY * r1;

      // Vertical right rope down to lower pulley P2
      const p2X = p1X + r1;
      const p2Y = 172 + sPb * pxScale;
      const r2 = 14;
      const y2 = 228 + s2 * pxScale;
      const y3 = 228 + s3 * pxScale;
      const rot1 = ((s1 * pxScale) / r1) * (180 / Math.PI);
      const rot2 = (((s3 - sPb) * pxScale) / r2) * (180 / Math.PI);

      return (
        <svg viewBox="0 0 340 305" className="w-full h-full select-none" role="img" aria-label="Simulasi Bidang Miring dan Katrol Majemuk">
          {/* Ramp */}
          <polygon points={`${ax},${ay} ${bx},${ay} ${bx},${by}`} fill="#fce7f3" stroke="#be185d" strokeWidth="2" />
          <line x1="16" y1={ay} x2="320" y2={ay} stroke="#9d174d" strokeWidth="2" />
          <text x="64" y={ay - 8} className="text-[11px] font-bold fill-pink-900">θ = 37°</text>

          {/* Upper pulley bracket */}
          <line x1={bx} y1={by} x2={p1X} y2={p1Y} stroke="#64748b" strokeWidth="4" />

          {/* Ropes */}
          <line x1={ropeStartX} y1={ropeStartY} x2={pulleyTanTopX} y2={pulleyTanTopY} stroke="#334155" strokeWidth="2.2" />
          <line x1={p1X + r1} y1={p1Y} x2={p2X} y2={p2Y} stroke="#334155" strokeWidth="2.2" />
          <line x1={p2X - r2} y1={p2Y} x2={p2X - r2} y2={y2 - 12} stroke="#334155" strokeWidth="2" />
          <line x1={p2X + r2} y1={p2Y} x2={p2X + r2} y2={y3 - 13} stroke="#334155" strokeWidth="2" />

          {/* Block m1 rotated -37 deg */}
          <g transform={`translate(${cx}, ${cy}) rotate(-37)`}>
            <rect x="-18" y="-13" width="36" height="26" rx="4" fill="#fbcfe8" stroke="#be185d" strokeWidth="2" />
            <text x="0" y="4" textAnchor="middle" className="text-[10px] font-bold fill-slate-900">m₁</text>
          </g>
          {showVectors && (
            <line
              x1={cx}
              y1={cy}
              x2={cx + ux * 32}
              y2={cy + uy * 32}
              stroke="#db2777"
              strokeWidth="2.2"
              markerEnd="url(#arrow-pink)"
            />
          )}

          {/* Pulley 1 */}
          <g transform={`translate(${p1X}, ${p1Y}) rotate(${rot1})`}>
            <circle cx="0" cy="0" r={r1} fill="#fdf2f8" stroke="#be185d" strokeWidth="2.5" />
            <line x1={-r1 + 3} y1="0" x2={r1 - 3} y2="0" stroke="#f472b6" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="3" fill="#be185d" />
          </g>

          {/* Pulley 2 */}
          <g transform={`translate(${p2X}, ${p2Y}) rotate(${rot2})`}>
            <circle cx="0" cy="0" r={r2} fill="#fdf2f8" stroke="#0284c7" strokeWidth="2.5" />
            <line x1={-r2 + 3} y1="0" x2={r2 - 3} y2="0" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="3" fill="#0284c7" />
          </g>

          {/* m2 & m3 */}
          <g transform={`translate(${p2X - r2}, ${y2})`}>
            <rect x="-13" y="-12" width="26" height="24" rx="4" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            <text x="0" y="4" textAnchor="middle" className="text-[10px] font-bold fill-slate-900">m₂</text>
          </g>
          <g transform={`translate(${p2X + r2}, ${y3})`}>
            <rect x="-15" y="-13" width="30" height="26" rx="4" fill="#fce7f3" stroke="#9d174d" strokeWidth="2" />
            <text x="0" y="4" textAnchor="middle" className="text-[10px] font-bold fill-slate-900">m₃</text>
          </g>
        </svg>
      );
    }

    if (config.type === 'triple') {
      const p1X = 140, p1Y = 44, r1 = 20;
      const y1 = 152 - s1 * pxScale;
      const p2X = p1X + r1, p2Y = 104 + s1 * pxScale, r2 = 16;
      const y2 = 176 + s2 * pxScale;
      const sP3 = 2 * s1 - s2;
      const p3X = p2X + r2, p3Y = 166 + sP3 * pxScale, r3 = 14;
      const y3 = 232 + s3 * pxScale;
      const y4 = 232 + s4 * pxScale;

      return (
        <svg viewBox="0 0 340 315" className="w-full h-full select-none" role="img" aria-label="Simulasi Sistem Tiga Katrol">
          <rect x="65" y="12" width="170" height="7" rx="2" fill="#9d174d" />
          <line x1={p1X} y1="19" x2={p1X} y2={p1Y} stroke="#64748b" strokeWidth="3.5" />

          {/* Ropes */}
          <line x1={p1X - r1} y1={p1Y} x2={p1X - r1} y2={y1 - 14} stroke="#334155" strokeWidth="2" />
          <line x1={p1X + r1} y1={p1Y} x2={p2X} y2={p2Y} stroke="#334155" strokeWidth="2" />
          <line x1={p2X - r2} y1={p2Y} x2={p2X - r2} y2={y2 - 13} stroke="#334155" strokeWidth="2" />
          <line x1={p2X + r2} y1={p2Y} x2={p3X} y2={p3Y} stroke="#334155" strokeWidth="2" />
          <line x1={p3X - r3} y1={p3Y} x2={p3X - r3} y2={y3 - 11} stroke="#334155" strokeWidth="1.8" />
          <line x1={p3X + r3} y1={p3Y} x2={p3X + r3} y2={y4 - 12} stroke="#334155" strokeWidth="1.8" />

          {/* Pulleys */}
          <g transform={`translate(${p1X}, ${p1Y}) rotate(${((s1 * pxScale) / r1) * 57.3})`}>
            <circle cx="0" cy="0" r={r1} fill="#fdf2f8" stroke="#be185d" strokeWidth="2.5" />
            <line x1={-r1 + 3} y1="0" x2={r1 - 3} y2="0" stroke="#f472b6" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="3" fill="#be185d" />
          </g>
          <g transform={`translate(${p2X}, ${p2Y}) rotate(${(((sP3 - s1) * pxScale) / r2) * 57.3})`}>
            <circle cx="0" cy="0" r={r2} fill="#fdf2f8" stroke="#db2777" strokeWidth="2.5" />
            <line x1={-r2 + 3} y1="0" x2={r2 - 3} y2="0" stroke="#f472b6" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="3" fill="#db2777" />
          </g>
          <g transform={`translate(${p3X}, ${p3Y}) rotate(${(((s4 - sP3) * pxScale) / r3) * 57.3})`}>
            <circle cx="0" cy="0" r={r3} fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" />
            <line x1={-r3 + 3} y1="0" x2={r3 - 3} y2="0" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="3" fill="#0284c7" />
          </g>

          {/* Masses */}
          <g transform={`translate(${p1X - r1}, ${y1})`}>
            <rect x="-16" y="-14" width="32" height="28" rx="5" fill="#fbcfe8" stroke="#be185d" strokeWidth="2" />
            <text x="0" y="4" textAnchor="middle" className="text-[10px] font-bold fill-slate-900">m₁</text>
          </g>
          <g transform={`translate(${p2X - r2}, ${y2})`}>
            <rect x="-15" y="-13" width="30" height="26" rx="5" fill="#fce7f3" stroke="#db2777" strokeWidth="2" />
            <text x="0" y="4" textAnchor="middle" className="text-[10px] font-bold fill-slate-900">m₂</text>
          </g>
          <g transform={`translate(${p3X - r3}, ${y3})`}>
            <rect x="-13" y="-11" width="26" height="22" rx="4" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            <text x="0" y="4" textAnchor="middle" className="text-[10px] font-bold fill-slate-900">m₃</text>
          </g>
          <g transform={`translate(${p3X + r3}, ${y4})`}>
            <rect x="-14" y="-12" width="28" height="24" rx="4" fill="#f3e8ff" stroke="#7e22ce" strokeWidth="2" />
            <text x="0" y="4" textAnchor="middle" className="text-[10px] font-bold fill-slate-900">m₄</text>
          </g>
        </svg>
      );
    }

    // Default 'double', 'lift', or 'moving-top'
    const isMovingTop = config.type === 'moving-top';
    const isLift = config.type === 'lift';

    const p1X = 152;
    const p1Y = isMovingTop ? 92 - sPt * pxScale : 54;
    const r1 = 22;
    const p2X = p1X + r1;
    const p2Y = 128 + sPb * pxScale;
    const r2 = 18;

    const y1 = 166 - s1 * pxScale;
    const y2 = 216 + s2 * pxScale;
    const y3 = 216 + s3 * pxScale;

    const rot1 = (((s1 - sPt) * pxScale) / r1) * 57.3;
    const rot2 = (((s3 - sPb) * pxScale) / r2) * 57.3;
    const liftOffset = isLift ? -(0.5 * (config.aLift ?? 0) * simTime * simTime * pxScale * 0.55) : 0;

    return (
      <svg viewBox="0 0 340 315" className="w-full h-full select-none" role="img" aria-label="Simulasi Sistem Katrol Majemuk Soal No. 8">
        <g transform={`translate(0, ${liftOffset})`}>
          {/* Lift frame or ceiling */}
          {isLift ? (
            <g>
              <rect x="44" y="20" width="252" height="275" rx="10" fill="none" stroke="#be185d" strokeWidth="2.5" strokeDasharray="6 4" />
              <rect x="44" y="20" width="252" height="10" rx="2" fill="#9d174d" />
              <line x1="296" y1="90" x2="296" y2="42" stroke="#0284c7" strokeWidth="2.5" markerEnd="url(#arrow-blue)" />
              <text x="302" y="68" className="text-[10px] font-bold fill-sky-700">a_lift</text>
            </g>
          ) : !isMovingTop ? (
            <rect x="65" y="16" width="200" height="8" rx="2" fill="#9d174d" />
          ) : null}

          {/* Support rod or External Force F */}
          {isMovingTop ? (
            <g>
              <line x1={p1X} y1={p1Y} x2={p1X} y2={p1Y - 46} stroke="#0284c7" strokeWidth="3" markerEnd="url(#arrow-blue)" />
              <text x={p1X + 8} y={p1Y - 34} className="text-[11px] font-bold fill-sky-700">
                F = {config.fUp} N
              </text>
            </g>
          ) : (
            <line x1={p1X} y1={isLift ? 30 : 24} x2={p1X} y2={p1Y} stroke="#64748b" strokeWidth="4" />
          )}

          {/* Rope 1 */}
          <line x1={p1X - r1} y1={p1Y} x2={p1X - r1} y2={y1 - 16} stroke="#334155" strokeWidth="2.4" />
          <line x1={p1X + r1} y1={p1Y} x2={p2X} y2={p2Y} stroke="#334155" strokeWidth="2.4" />

          {/* Rope 2 */}
          <line x1={p2X - r2} y1={p2Y} x2={p2X - r2} y2={y2 - 14} stroke="#475569" strokeWidth="2" />
          <line x1={p2X + r2} y1={p2Y} x2={p2X + r2} y2={y3 - 15} stroke="#475569" strokeWidth="2" />

          {/* Pulley 1 (Top) */}
          <g transform={`translate(${p1X}, ${p1Y}) rotate(${rot1})`}>
            <circle
              cx="0"
              cy="0"
              r={r1}
              fill={config.mPulleyTop ? '#fde047' : '#fdf2f8'}
              fillOpacity={config.mPulleyTop ? 0.35 : 1}
              stroke="#be185d"
              strokeWidth={config.mPulleyTop ? 3.5 : 2.5}
            />
            <line x1={-r1 + 4} y1="0" x2={r1 - 4} y2="0" stroke="#f472b6" strokeWidth="1.5" />
            <line x1="0" y1={-r1 + 4} x2="0" y2={r1 - 4} stroke="#f472b6" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="3.5" fill="#be185d" />
          </g>
          {config.mPulleyTop ? (
            <text x={p1X - 42} y={p1Y - 22} className="text-[10px] font-semibold fill-amber-800">
              M₁={config.mPulleyTop}kg
            </text>
          ) : null}

          {/* Pulley 2 (Bottom) */}
          <g transform={`translate(${p2X}, ${p2Y}) rotate(${rot2})`}>
            <circle
              cx="0"
              cy="0"
              r={r2}
              fill={config.mPulleyBottom ? '#fde047' : '#e0f2fe'}
              fillOpacity={config.mPulleyBottom ? 0.45 : 0.85}
              stroke="#0284c7"
              strokeWidth={config.mPulleyBottom ? 3.5 : 2.5}
            />
            <line x1={-r2 + 3} y1="0" x2={r2 - 3} y2="0" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="0" y1={-r2 + 3} x2="0" y2={r2 - 3} stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="0" cy="0" r="3.5" fill="#0284c7" />
          </g>
          {config.mPulleyBottom ? (
            <text x={p2X + 24} y={p2Y + 4} className="text-[10px] font-semibold fill-amber-800">
              M₂={config.mPulleyBottom}kg
            </text>
          ) : null}

          {/* Mass m1 */}
          <g transform={`translate(${p1X - r1}, ${y1})`}>
            <rect x="-18" y="-16" width="36" height="32" rx="5" fill="#fed7aa" stroke="#ea580c" strokeWidth="2" />
            <text x="0" y="4" textAnchor="middle" className="text-[10px] font-bold fill-slate-900">
              m₁
            </text>
            {showVectors && (
              <>
                <line x1="0" y1="-16" x2="0" y2="-40" stroke="#db2777" strokeWidth="2" markerEnd="url(#arrow-pink)" />
                <text x="-28" y="-26" className="text-[9px] font-bold fill-pink-700">T₁</text>
              </>
            )}
          </g>

          {/* Mass m2 */}
          <g transform={`translate(${p2X - r2}, ${y2})`}>
            <rect x="-15" y="-14" width="30" height="28" rx="5" fill="#bbf7d0" stroke="#16a34a" strokeWidth="2" />
            <text x="0" y="4" textAnchor="middle" className="text-[10px] font-bold fill-slate-900">
              m₂
            </text>
            {showVectors && (
              <>
                <line x1="0" y1="-14" x2="0" y2="-34" stroke="#be185d" strokeWidth="1.8" markerEnd="url(#arrow-pink)" />
              </>
            )}
          </g>

          {/* Mass m3 */}
          <g transform={`translate(${p2X + r2}, ${y3})`}>
            <rect x="-16" y="-15" width="32" height="30" rx="5" fill="#e9d5ff" stroke="#7e22ce" strokeWidth="2" />
            <text x="0" y="4" textAnchor="middle" className="text-[10px] font-bold fill-slate-900">
              m₃
            </text>
            {showVectors && (
              <>
                <line x1="0" y1="-15" x2="0" y2="-35" stroke="#be185d" strokeWidth="1.8" markerEnd="url(#arrow-pink)" />
              </>
            )}
          </g>

          {/* Gravity indicator */}
          <g transform="translate(272, 46)">
            <line x1="0" y1="0" x2="0" y2="26" stroke="#334155" strokeWidth="2" markerEnd="url(#arrow-dark)" />
            <text x="8" y="18" className="text-[11px] font-bold fill-slate-700">g</text>
          </g>
        </g>
      </svg>
    );
  };

  return (
    <div
      className="rounded-xl border border-pink-200/80 bg-white overflow-hidden"
      data-testid="physics-canvas"
    >
      {/* Shared SVG marker defs */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <marker id="arrow-pink" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" fill="#db2777" />
          </marker>
          <marker id="arrow-dark" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" fill="#0f172a" />
          </marker>
          <marker id="arrow-blue" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <polygon points="0 0, 7 3.5, 0 7" fill="#0284c7" />
          </marker>
        </defs>
      </svg>

      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-pink-100 bg-pink-50/40">
        <div>
          <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
          <p className="text-xs text-slate-600 tabular-nums">
            t = {simTime.toFixed(2).replace('.', ',')} s · Kondisi:{' '}
            {simTime === 0
              ? 'Keadaan Awal (Diam)'
              : simTime >= MAX_TIME
                ? 'Kondisi Akhir Pengamatan'
                : 'Sistem Sedang Dipercepat'}
          </p>
        </div>

        <label className="inline-flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
          <input
            type="checkbox"
            checked={showVectors}
            onChange={(e) => setShowVectors(e.target.checked)}
            className="accent-pink-600 rounded"
          />
          Tampilkan Vektor Gaya
        </label>
      </div>

      <div className={`grid grid-cols-1 ${compact ? '' : 'lg:grid-cols-12'} gap-0`}>
        {/* Visual Stage */}
        <div className={`${compact ? '' : 'lg:col-span-7'} bg-gradient-to-b from-white to-pink-50/30 p-3 flex items-center justify-center min-h-[270px]`}>
          <div className="w-full max-w-[340px] aspect-[340/310]">{renderSvgScene()}</div>
        </div>

        {/* Live Telemetry & Equation Timeline */}
        <div className={`${compact ? '' : 'lg:col-span-5'} border-t ${compact ? '' : 'lg:border-t-0 lg:border-l'} border-pink-100 p-4 flex flex-col justify-between gap-4 bg-white`}>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-pink-700 mb-2">
              {activeEq?.phaseLabel}
            </p>
            {activeEq && (
              <div className="p-2.5 rounded-lg bg-pink-50/60 border border-pink-100 mb-2 overflow-x-auto">
                <MathDisplay
                  tex={activeEq.tex}
                  block
                  className="text-[11px] [&_.katex-display]:my-0 [&_.katex]:text-[0.85em]"
                />
                <p className="text-xs text-slate-700 mt-1.5">{activeEq.caption}</p>
              </div>
            )}

            {/* Instantaneous quantities */}
            <div className="grid grid-cols-2 gap-2 text-xs tabular-nums mt-3">
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/70">
                <span className="text-slate-500 block">Laju m₁ (v₁)</span>
                <strong className="text-slate-900 font-mono">
                  {Math.abs(v1).toFixed(2).replace('.', ',')} m/s
                </strong>
              </div>
              <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/70">
                <span className="text-slate-500 block">
                  {config.type === 'single' ? 'Laju mB (vB)' : 'Laju m₃ (v₃)'}
                </span>
                <strong className="text-slate-900 font-mono">
                  {Math.abs(config.type === 'single' ? v2 : v3).toFixed(2).replace('.', ',')} m/s
                </strong>
              </div>
              <div className="p-2 rounded-lg bg-pink-50/50 border border-pink-100">
                <span className="text-pink-700 block">Tegangan T₁</span>
                <strong className="text-slate-900 font-mono">
                  {config.t1Value.toFixed(1).replace('.', ',')} N
                </strong>
              </div>
              <div className="p-2 rounded-lg bg-pink-50/50 border border-pink-100">
                <span className="text-pink-700 block">Tegangan T₂</span>
                <strong className="text-slate-900 font-mono">
                  {config.t2Value.toFixed(1).replace('.', ',')} N
                </strong>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-2.5 pt-2 border-t border-pink-100">
            <div>
              <label className="flex items-center justify-between text-xs text-slate-600 mb-1">
                <span>Timeline Simulasi</span>
                <span className="font-mono tabular-nums">{Math.round(progress * 100)}%</span>
              </label>
              <input
                type="range"
                min={0}
                max={MAX_TIME}
                step={0.01}
                value={simTime}
                aria-label="Timeline Simulasi Fisika"
                onChange={(e) => {
                  setIsPlaying(false);
                  setSimTime(Number(e.target.value));
                }}
                className="w-full accent-pink-600 cursor-pointer"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handlePlayPause}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-pink-600 text-white text-xs font-semibold hover:bg-pink-700 transition-colors whitespace-nowrap"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-pink-200 bg-white text-slate-700 text-xs font-medium hover:bg-pink-50 transition-colors whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset
                </button>
                <button
                  type="button"
                  onClick={handleReplay}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-pink-200 bg-white text-slate-700 text-xs font-medium hover:bg-pink-50 transition-colors whitespace-nowrap"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Replay
                </button>
              </div>

              <div className="flex items-center gap-1 bg-pink-50 p-0.5 rounded-lg border border-pink-100">
                {[0.5, 1, 1.5].map((spd) => (
                  <button
                    key={spd}
                    type="button"
                    onClick={() => setSpeed(spd)}
                    className={`px-2 py-1 text-[11px] font-medium rounded-md transition-colors ${
                      speed === spd
                        ? 'bg-white text-pink-700 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {spd.toString().replace('.', ',')}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
