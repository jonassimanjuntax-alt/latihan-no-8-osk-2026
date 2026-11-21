import React from 'react';
import { CheckCircle2, XCircle, Circle, RotateCcw, ArrowRight, BookOpen } from 'lucide-react';
import { ALL_PROBLEMS, TIER_GROUPS } from '../data/problemsData';
import { ProblemAttemptState } from './ProblemWorkspace';
import { misterJoNarrator } from '../utils/ttsNarrator';

interface ProgressAndEvalProps {
  mode: 'progress' | 'eval';
  attempts: Record<number, ProblemAttemptState>;
  onOpenProblem: (id: number) => void;
  onOpenTheory: (theoryId: number) => void;
  onResetAll: () => void;
}

export const ProgressAndEval: React.FC<ProgressAndEvalProps> = ({
  mode,
  attempts,
  onOpenProblem,
  onOpenTheory,
  onResetAll,
}) => {
  const total = ALL_PROBLEMS.length;
  const correctList = ALL_PROBLEMS.filter((p) => attempts[p.id]?.result?.isCorrect);
  const wrongList = ALL_PROBLEMS.filter(
    (p) => attempts[p.id]?.result && !attempts[p.id]?.result?.isCorrect
  );
  const pendingList = ALL_PROBLEMS.filter((p) => !attempts[p.id]?.result);
  const scorePercent = Math.round((correctList.length / total) * 100);

  const recommendedTheoryIds = Array.from(
    new Set(wrongList.map((p) => p.recommendedTheoryId))
  );

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-28 space-y-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-pink-200/80 pb-5">
        <div>
          <p className="text-xs font-semibold text-pink-700 mb-1">
            {mode === 'progress' ? 'Pelacakan Progres Belajar' : 'Rekapitulasi & Evaluasi Hasil'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {mode === 'progress'
              ? 'Progres Penguasaan 15 Soal Olimpiade'
              : 'Evaluasi Hasil Latihan Bersama MISTER JO'}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() =>
              misterJoNarrator.speak(
                'Ringkasan Evaluasi Belajar',
                `Anda telah menjawab benar ${correctList.length} dari lima belas soal latihan, dengan nilai penguasaan ${scorePercent} persen. ${
                  wrongList.length > 0
                    ? `Terdapat ${wrongList.length} soal yang masih perlu diperbaiki. Periksa rekomendasi materi Pondasi Ilmu di bawah.`
                    : pendingList.length === 0
                      ? 'Luar biasa! Seluruh lima belas soal telah diselesaikan dengan tepat!'
                      : `Masih ada ${pendingList.length} soal yang belum dikerjakan.`
                }`
              )
            }
            className="px-4 py-2 rounded-xl bg-pink-600 text-white text-xs font-semibold hover:bg-pink-700 transition-colors"
          >
            Dengarkan Evaluasi
          </button>
          <button
            type="button"
            onClick={onResetAll}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-pink-200 bg-white text-xs font-semibold text-slate-700 hover:bg-pink-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Semua Progres
          </button>
        </div>
      </div>

      {/* Summary KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 tabular-nums">
        <div className="rounded-2xl border border-pink-200 bg-white p-4">
          <span className="text-xs text-slate-500 block">Skor Penguasaan</span>
          <strong className="text-2xl font-bold text-pink-700 mt-1 block">
            {scorePercent}%
          </strong>
        </div>
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/40 p-4">
          <span className="text-xs text-emerald-800 block">Jawaban Benar</span>
          <strong className="text-2xl font-bold text-emerald-700 mt-1 block">
            {correctList.length} / {total}
          </strong>
        </div>
        <div className="rounded-2xl border border-rose-200 bg-rose-50/40 p-4">
          <span className="text-xs text-rose-800 block">Perlu Diperbaiki</span>
          <strong className="text-2xl font-bold text-rose-700 mt-1 block">
            {wrongList.length} Soal
          </strong>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <span className="text-xs text-slate-500 block">Belum Dikerjakan</span>
          <strong className="text-2xl font-bold text-slate-800 mt-1 block">
            {pendingList.length} Soal
          </strong>
        </div>
      </div>

      {/* Tier Breakdown */}
      <div className="rounded-2xl border border-pink-200 bg-white p-5 space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Penguasaan Per Tingkat Kesulitan
        </h3>
        <div className="space-y-3">
          {TIER_GROUPS.map((grp) => {
            const tierProblems = ALL_PROBLEMS.filter((p) => p.tier === grp.tier);
            const tierCorrect = tierProblems.filter(
              (p) => attempts[p.id]?.result?.isCorrect
            ).length;
            const pct = Math.round((tierCorrect / tierProblems.length) * 100);

            return (
              <div key={grp.tier} className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="font-semibold text-slate-800">
                    {grp.range} · {grp.tier}
                  </span>
                  <span className="font-mono font-semibold text-pink-700 tabular-nums">
                    {tierCorrect}/{tierProblems.length} ({pct}%)
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-pink-100 overflow-hidden">
                  <div
                    className="h-full bg-pink-600 transition-all duration-300"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500">{grp.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommendations if there are incorrect problems */}
      {wrongList.length > 0 && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5 space-y-3">
          <h3 className="text-sm font-bold text-amber-950">
            Rekomendasi Penguatan Materi dari MISTER JO
          </h3>
          <p className="text-xs text-slate-700">
            Berdasarkan soal yang belum tepat, pelajari kembali tahap Pondasi Ilmu berikut sebelum mengulang soal:
          </p>
          <div className="flex flex-wrap gap-2">
            {recommendedTheoryIds.map((tid) => (
              <button
                key={tid}
                type="button"
                onClick={() => onOpenTheory(tid)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-amber-300 text-xs font-semibold text-amber-900 hover:bg-amber-100 transition-colors"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Buka Pondasi Ilmu Tahap {tid}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Detailed 15-Question Table */}
      <div className="rounded-2xl border border-pink-200 bg-white overflow-hidden">
        <div className="px-5 py-3.5 border-b border-pink-100 bg-pink-50/40">
          <h3 className="text-sm font-bold text-slate-900">
            Rincian Status 15 Soal Latihan
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse tabular-nums">
            <thead>
              <tr className="border-b border-pink-100 text-slate-600 bg-pink-50/20">
                <th className="py-2.5 px-4">No</th>
                <th className="py-2.5 px-4">Judul & Konsep</th>
                <th className="py-2.5 px-4">Jawaban Anda</th>
                <th className="py-2.5 px-4">Status</th>
                <th className="py-2.5 px-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-pink-100">
              {ALL_PROBLEMS.map((p) => {
                const att = attempts[p.id];
                const isCorrect = att?.result?.isCorrect;
                const isWrong = att?.result && !att.result.isCorrect;

                return (
                  <tr key={p.id} className="hover:bg-pink-50/20">
                    <td className="py-3 px-4 font-bold text-slate-900">{p.id}</td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-900 block">
                        {p.title}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {p.tier}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-800">
                      {att?.answerInput ? att.answerInput : '—'}
                    </td>
                    <td className="py-3 px-4">
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                          <CheckCircle2 className="w-4 h-4" />
                          Benar
                        </span>
                      ) : isWrong ? (
                        <span className="inline-flex items-center gap-1 text-rose-700 font-semibold">
                          <XCircle className="w-4 h-4" />
                          Belum Tepat
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-slate-500">
                          <Circle className="w-3.5 h-3.5" />
                          Belum Dijawab
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => onOpenProblem(p.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-pink-50 text-pink-700 font-semibold hover:bg-pink-100 transition-colors"
                      >
                        {isCorrect || isWrong ? 'Buka / Ulangi' : 'Kerjakan'}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
