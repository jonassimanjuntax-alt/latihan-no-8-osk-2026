import React from 'react';
import { ArrowRight, BookOpen, Calculator, Activity, BarChart3, Award, Volume2 } from 'lucide-react';
import { TIER_GROUPS, ALL_PROBLEMS } from '../data/problemsData';
import { SOURCE_DOCUMENT_META } from '../data/sourceAnalysis';
import { PhysicsCanvas } from './PhysicsCanvas';
import { misterJoNarrator } from '../utils/ttsNarrator';

export type ActiveRoute =
  | 'home'
  | 'theory'
  | 'problems'
  | 'animations'
  | 'progress'
  | 'eval';

interface HomeLandingProps {
  solvedCount: number;
  onNavigate: (route: ActiveRoute, problemId?: number) => void;
}

export const HomeLanding: React.FC<HomeLandingProps> = ({
  solvedCount,
  onNavigate,
}) => {
  const question8 = ALL_PROBLEMS.find((p) => p.id === 4) ?? ALL_PROBLEMS[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-28 space-y-12">
      {/* Hero Split (2-column balanced stretch) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-5 flex flex-col justify-center rounded-2xl border border-pink-200 bg-gradient-to-br from-white via-pink-50/40 to-pink-100/40 p-6 sm:p-7 space-y-5">
          <div className="space-y-3">
            <p className="text-xs font-semibold text-pink-700 tracking-wide">
              Special Training – Question No. 8 · Teacher: MISTER JO
            </p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-[1.12] [text-wrap:balance]">
              PHYSICS OLYMPIAD TRAINING
            </h1>
            <p className="text-base font-bold text-pink-700">
              15 CHALLENGING PROBLEMS
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Pelatihan intensif Olimpiade Sains Fisika SMA tingkat Kota/Kabupaten (OSK) yang mengembangkan secara tuntas konsep Sistem Katrol Majemuk dari <strong>Soal Nomor 8 OSK Fisika SMA 2026</strong> beserta pondasi teori, animasi pembuktian fisika, Free Body Diagram, dan bimbingan suara interaktif.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => onNavigate('theory')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-pink-600 text-white text-sm font-bold hover:bg-pink-700 transition-colors whitespace-nowrap"
              >
                START LEARNING
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('problems', 4)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-pink-300 bg-white text-sm font-semibold text-pink-800 hover:bg-pink-50 transition-colors whitespace-nowrap"
              >
                Lihat Soal Asli No. 8
              </button>
              <button
                type="button"
                onClick={() =>
                  misterJoNarrator.speak(
                    'Pengantar MISTER JO',
                    SOURCE_DOCUMENT_META.narrationScript
                  )
                }
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-pink-200 bg-white text-xs font-semibold text-slate-700 hover:bg-pink-50 transition-colors whitespace-nowrap"
              >
                <Volume2 className="w-4 h-4 text-pink-600" />
                Dengarkan Pengantar
              </button>
            </div>

            {/* Clean inline metadata row (zero pills) */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 pt-3 border-t border-pink-200/70 tabular-nums">
              <span>Pengajar: MISTER JO</span>
              <span aria-hidden="true">·</span>
              <span>12 Tahap Pondasi Ilmu</span>
              <span aria-hidden="true">·</span>
              <span>15 Soal Isian Numerik</span>
              <span aria-hidden="true">·</span>
              <span>Progres Anda: {solvedCount}/15 Tepat</span>
            </div>
          </div>
        </div>

        {/* Right Hero Column: Live Interactive Proof Preview of Soal No. 8 */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <PhysicsCanvas
            config={question8.animation}
            title="Pratinjau Interaktif · Soal Nomor 8 OSK 2026 (m₁=2 kg, m₂=3 kg, m₃=6 kg)"
          />
        </div>
      </section>

      {/* 6 Main Menu Cards */}
      <section aria-labelledby="menu-utama-heading" className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 id="menu-utama-heading" className="text-xl font-bold text-slate-900">
              Menu Utama Pelatihan
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Ikuti alur dari Pondasi Ilmu hingga Evaluasi Hasil agar penguasaan konsep utuh.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            type="button"
            onClick={() => onNavigate('theory')}
            className="text-left rounded-2xl border border-pink-200 bg-white p-5 hover:border-pink-400 hover:bg-pink-50/30 transition-colors space-y-2"
          >
            <div className="flex items-center justify-between text-pink-700">
              <span className="text-xs font-bold">01 · START LEARNING</span>
              <ArrowRight className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Mulai Pembelajaran Terarah</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Masuk ke alur belajar terstruktur bersama MISTER JO dari analisis dokumen soal sumber hingga latihan.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('theory')}
            className="text-left rounded-2xl border border-pink-200 bg-white p-5 hover:border-pink-400 hover:bg-pink-50/30 transition-colors space-y-2"
          >
            <div className="flex items-center justify-between text-pink-700">
              <span className="text-xs font-bold">02 · PONDASI ILMU</span>
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Mastering The Concept</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              12 tahap materi lengkap: definisi, satuan SI, penurunan rumus, metode massa efektif, dan miskonsepsi.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('problems', 1)}
            className="text-left rounded-2xl border border-pink-200 bg-white p-5 hover:border-pink-400 hover:bg-pink-50/30 transition-colors space-y-2"
          >
            <div className="flex items-center justify-between text-pink-700">
              <span className="text-xs font-bold">03 · 15 SOAL LATIHAN</span>
              <Calculator className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Isian Singkat Numerik</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              15 soal bertahap dari fundamental hingga tantangan OSK dengan pembahasan 12 langkah buka-tutup dan FBD.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('animations')}
            className="text-left rounded-2xl border border-pink-200 bg-white p-5 hover:border-pink-400 hover:bg-pink-50/30 transition-colors space-y-2"
          >
            <div className="flex items-center justify-between text-pink-700">
              <span className="text-xs font-bold">04 · ANIMASI FISIKA</span>
              <Activity className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Laboratorium Simulasi</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Ubah parameter m₁, m₂, m₃, percepatan lift, dan massa katrol atas secara interaktif dan real-time.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('progress')}
            className="text-left rounded-2xl border border-pink-200 bg-white p-5 hover:border-pink-400 hover:bg-pink-50/30 transition-colors space-y-2"
          >
            <div className="flex items-center justify-between text-pink-700">
              <span className="text-xs font-bold">05 · PROGRES BELAJAR</span>
              <BarChart3 className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Pantau Perkembangan</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Lihat status pengerjaan seluruh 15 soal dan persentase penguasaan pada tiap tingkat kesulitan.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('eval')}
            className="text-left rounded-2xl border border-pink-200 bg-white p-5 hover:border-pink-400 hover:bg-pink-50/30 transition-colors space-y-2"
          >
            <div className="flex items-center justify-between text-pink-700">
              <span className="text-xs font-bold">06 · EVALUASI HASIL</span>
              <Award className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Rekap & Rekomendasi</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Evaluasi ketepatan konsep, identifikasi soal yang perlu diulang, dan tautan langsung ke materi terkait.
            </p>
          </button>
        </div>
      </section>

      {/* 5-Tier Roadmap */}
      <section className="rounded-2xl border border-pink-200 bg-white p-6 space-y-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Peta 15 Soal Pengembangan Konsep Nomor 8
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Klik tingkat kesulitan di bawah untuk langsung melompat ke soal pertama pada tingkat tersebut.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {TIER_GROUPS.map((grp, idx) => {
            const firstProblemId = idx * 3 + 1;
            return (
              <button
                key={grp.tier}
                type="button"
                onClick={() => onNavigate('problems', firstProblemId)}
                className="text-left p-3.5 rounded-xl border border-pink-100 bg-pink-50/35 hover:bg-pink-50 hover:border-pink-300 transition-colors space-y-1.5"
              >
                <span className="text-xs font-bold text-pink-700 block">
                  {grp.range}
                </span>
                <span className="text-xs font-bold text-slate-900 block leading-snug">
                  {grp.tier}
                </span>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {grp.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
