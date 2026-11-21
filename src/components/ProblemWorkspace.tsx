import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Volume2,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  BookOpen,
} from 'lucide-react';
import { ALL_PROBLEMS, PhysicsProblem } from '../data/problemsData';
import { checkNumericAnswer, AnswerCheckResult } from '../physics/solvers';
import { MathDisplay, RichMathText } from './MathBlock';
import { PhysicsCanvas } from './PhysicsCanvas';
import { FbdDiagram } from './FbdDiagram';
import { misterJoNarrator } from '../utils/ttsNarrator';

export interface ProblemAttemptState {
  answerInput: string;
  result: AnswerCheckResult | null;
  attemptsCount: number;
}

interface ProblemWorkspaceProps {
  attempts: Record<number, ProblemAttemptState>;
  selectedProblemId: number;
  onSelectProblem: (id: number) => void;
  onSubmitAttempt: (problemId: number, input: string, result: AnswerCheckResult) => void;
  onResetAttempt: (problemId: number) => void;
  onGoToTheory: (theorySectionId: number) => void;
  onGoToEval: () => void;
}

export const ProblemWorkspace: React.FC<ProblemWorkspaceProps> = ({
  attempts,
  selectedProblemId,
  onSelectProblem,
  onSubmitAttempt,
  onResetAttempt,
  onGoToTheory,
  onGoToEval,
}) => {
  const problem: PhysicsProblem =
    ALL_PROBLEMS.find((p) => p.id === selectedProblemId) ?? ALL_PROBLEMS[0];

  const existingAttempt = attempts[problem.id];
  const [inputValue, setInputValue] = useState(existingAttempt?.answerInput ?? '');
  const [isPembahasanOpen, setIsPembahasanOpen] = useState(false);

  // Sync input and close pembahasan whenever switching problems
  useEffect(() => {
    setInputValue(attempts[problem.id]?.answerInput ?? '');
    setIsPembahasanOpen(false);
  }, [problem.id, attempts]);

  const solvedCount = Object.values(attempts).filter((a) => a.result?.isCorrect).length;
  const attemptedCount = Object.values(attempts).filter((a) => a.result !== null).length;
  const hasSubmitted = Boolean(existingAttempt?.result);

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const res = checkNumericAnswer(inputValue, problem.expectedAnswer);
    onSubmitAttempt(problem.id, inputValue, res);
  };

  const handleRetry = () => {
    setInputValue('');
    setIsPembahasanOpen(false);
    onResetAttempt(problem.id);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-28 space-y-6">
      {/* Header & Progress Strip */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-pink-200/80 pb-5">
        <div>
          <p className="text-xs font-semibold text-pink-700 mb-1">
            15 Soal Isian Singkat Numerik · Berbasis Soal No. 8 OSK 2026
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Arena Latihan Olimpiade Fisika
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="tabular-nums">
            <span className="text-slate-500">Progres Tepat: </span>
            <strong className="text-pink-700 font-bold">{solvedCount}/15 Soal</strong>
            <span className="text-slate-400 mx-1.5">·</span>
            <span className="text-slate-600">{attemptedCount}/15 Dikerjakan</span>
          </div>
          <button
            type="button"
            onClick={onGoToEval}
            className="px-3.5 py-2 rounded-xl border border-pink-200 bg-white text-xs font-semibold text-pink-700 hover:bg-pink-50 transition-colors whitespace-nowrap"
          >
            Lihat Rekap Evaluasi
          </button>
        </div>
      </div>

      {/* Direct Number Selector Grid (1–15) */}
      <div className="rounded-2xl border border-pink-200 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <p className="text-xs font-semibold text-slate-700">
            Navigasi Langsung Nomor Soal (1–15)
          </p>
          <p className="text-[11px] text-slate-500">
            Hijau = Benar · Merah = Perlu Diperbaiki · Putih = Belum Dijawab
          </p>
        </div>
        <div className="grid grid-cols-5 sm:grid-cols-15 gap-1.5" role="navigation" aria-label="Nomor Soal 1 sampai 15">
          {ALL_PROBLEMS.map((p) => {
            const att = attempts[p.id];
            const isSelected = p.id === problem.id;
            const isCorrect = att?.result?.isCorrect;
            const isWrong = att?.result && !att.result.isCorrect;

            let btnStyle = 'bg-pink-50/50 text-slate-700 border-pink-200 hover:bg-pink-100';
            if (isCorrect) {
              btnStyle = 'bg-emerald-50 text-emerald-800 border-emerald-300';
            } else if (isWrong) {
              btnStyle = 'bg-rose-50 text-rose-800 border-rose-300';
            }
            if (isSelected) {
              btnStyle = 'bg-pink-600 text-white border-pink-600 shadow-xs';
            }

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelectProblem(p.id)}
                aria-label={`Buka Soal ${p.id}${isCorrect ? ' (Sudah Benar)' : isWrong ? ' (Belum Tepat)' : ''}`}
                aria-current={isSelected ? 'step' : undefined}
                className={`py-2 rounded-lg border text-xs font-bold tabular-nums transition-colors ${btnStyle}`}
              >
                {p.id}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Problem Card */}
      <article className="rounded-2xl border border-pink-200 bg-white p-5 sm:p-7 space-y-6">
        {/* Problem Metadata (Zero-pill clean inline typography) */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-pink-100 pb-4">
          <div className="space-y-1">
            <p className="text-xs font-medium text-pink-700">
              {problem.code} · {problem.tier} ({problem.tierRange})
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              {problem.title}
            </h3>
          </div>

          <button
            type="button"
            onClick={() =>
              misterJoNarrator.speak(
                `${problem.code} – ${problem.title}`,
                problem.narrationStimulus
              )
            }
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-600 text-white text-xs font-semibold hover:bg-pink-700 transition-colors whitespace-nowrap shrink-0"
          >
            <Volume2 className="w-4 h-4" />
            Dengarkan Soal
          </button>
        </div>

        {/* Stimulus Data Table & Physics Proof Animation */}
        <div className="space-y-4">
          <p className="text-xs font-semibold text-slate-500">
            Stimulus Data & Animasi Pembuktian Fenomena Fisika
          </p>

          {problem.stimulusTable && (
            <div className="overflow-x-auto rounded-xl border border-pink-100 bg-pink-50/30">
              <table className="w-full text-xs text-left border-collapse tabular-nums">
                <thead>
                  <tr className="border-b border-pink-100 text-pink-900 bg-pink-50/70">
                    {problem.stimulusTable.headers.map((h) => (
                      <th key={h} className="py-2 px-3 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-pink-100/70">
                  {problem.stimulusTable.rows.map((row, idx) => (
                    <tr key={idx}>
                      {row.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className={`py-2 px-3 ${
                            cIdx === 1 ? 'font-mono text-pink-800' : 'text-slate-700'
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Mandatory Physics Proof Animation */}
          <PhysicsCanvas
            config={problem.animation}
            title={`Animasi Pembuktian · ${problem.code}`}
          />
        </div>

        {/* Question Prompt */}
        <div className="p-4 sm:p-5 rounded-xl bg-pink-50/40 border border-pink-200 space-y-2">
          <p className="text-xs font-semibold text-pink-800">Pertanyaan</p>
          <div className="text-sm sm:text-base text-slate-900 leading-relaxed">
            <RichMathText text={problem.questionPrompt} />
          </div>
          <p className="text-xs text-slate-600 pt-1">
            Masukkan jawaban Anda dalam <strong>satu angka di belakang koma</strong> menggunakan tanda koma (Contoh: 8,4). Satuan: <strong>{problem.unit}</strong>.
          </p>
        </div>

        {/* Numeric Answer Form (Isian Singkat Numerik ONLY) */}
        <form onSubmit={handleCheck} className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end gap-3">
            <div className="flex-1 max-w-xs">
              <label
                htmlFor={`answer-input-${problem.id}`}
                className="block text-xs font-semibold text-slate-800 mb-1.5"
              >
                Jawaban Numerik ({problem.unit})
              </label>
              <div className="flex items-center gap-2">
                <input
                  id={`answer-input-${problem.id}`}
                  type="text"
                  inputMode="decimal"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Contoh: 0,6"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-pink-300 bg-white text-sm font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                <span className="text-xs font-medium text-slate-600 whitespace-nowrap">
                  {problem.unit !== 'tanpa satuan' ? problem.unit : ''}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-pink-600 text-white text-xs sm:text-sm font-semibold hover:bg-pink-700 transition-colors whitespace-nowrap"
              >
                Periksa Jawaban
              </button>
              {hasSubmitted && (
                <button
                  type="button"
                  onClick={handleRetry}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-pink-200 bg-white text-xs font-semibold text-slate-700 hover:bg-pink-50 transition-colors whitespace-nowrap"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Ulangi Soal
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Feedback Banner (STRICTLY hidden until user submits an answer) */}
        {existingAttempt?.result && (
          <div
            role="status"
            className={`rounded-xl border p-4 space-y-2.5 ${
              existingAttempt.result.isCorrect
                ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                : 'bg-rose-50/70 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {existingAttempt.result.isCorrect ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1 text-sm">
                <p className="font-bold">
                  {existingAttempt.result.isCorrect
                    ? 'BENAR · Jawaban Anda Tepat!'
                    : existingAttempt.result.validFormat
                      ? 'BELUM TEPAT · Coba Periksa Kembali'
                      : 'FORMAT BELUM SESUAI'}
                </p>
                <p className="text-xs sm:text-sm">{existingAttempt.result.feedback}</p>
                {existingAttempt.result.formatNote && (
                  <p className="text-xs text-amber-800 font-medium">
                    {existingAttempt.result.formatNote}
                  </p>
                )}
                {existingAttempt.result.validFormat && (
                  <div className="pt-1.5 text-xs space-y-1 text-slate-700">
                    <p>
                      <strong>Jawaban Benar:</strong>{' '}
                      <span className="font-mono font-bold text-slate-900">
                        {existingAttempt.result.expectedFormatted}{' '}
                        {problem.unit !== 'tanpa satuan' ? problem.unit : ''}
                      </span>
                    </p>
                    <p>
                      <strong>Konsep yang Diuji:</strong>{' '}
                      <RichMathText text={problem.conceptTested} />
                    </p>
                    {!existingAttempt.result.isCorrect && (
                      <p className="pt-1">
                        <strong>Rekomendasi Materi:</strong>{' '}
                        <button
                          type="button"
                          onClick={() => onGoToTheory(problem.recommendedTheoryId)}
                          className="inline-flex items-center gap-1 text-pink-700 font-semibold underline hover:text-pink-800"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          Pelajari kembali Pondasi Ilmu Tahap {problem.recommendedTheoryId}
                        </button>
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Collapsible 12-Step Pembahasan (Accessible after submission, or via explicit toggle) */}
        <div className="pt-2 border-t border-pink-100">
          {!existingAttempt?.result?.validFormat ? (
            <p className="text-xs text-slate-500 italic">
              Kirimkan jawaban numerik Anda terlebih dahulu untuk membuka tombol pembahasan lengkap dan kunci jawaban.
            </p>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  aria-expanded={isPembahasanOpen}
                  onClick={() => setIsPembahasanOpen((o) => !o)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold tracking-wide hover:bg-slate-800 transition-colors"
                >
                  <span>LIHAT PEMBAHASAN LENGKAP</span>
                  {isPembahasanOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {isPembahasanOpen && (
                  <button
                    type="button"
                    onClick={() =>
                      misterJoNarrator.speak(
                        `Pembahasan Lengkap ${problem.code}`,
                        problem.narrationPembahasan
                      )
                    }
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-600 text-white text-xs font-semibold hover:bg-pink-700 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                    Dengarkan Pembahasan Lengkap
                  </button>
                )}
              </div>

              {isPembahasanOpen && (
                <div className="space-y-5 pt-2">
                  {/* 1. Memahami Persoalan */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <h4 className="text-xs font-bold text-pink-800">
                      1. Memahami Persoalan
                    </h4>
                    <p className="text-sm text-slate-800 leading-relaxed">
                      <RichMathText text={problem.pembahasan.memahamiPersoalan} />
                    </p>
                  </div>

                  {/* 2. Identifikasi Informasi */}
                  <div className="p-4 rounded-xl bg-white border border-pink-200 space-y-3">
                    <h4 className="text-xs font-bold text-pink-800">
                      2. Identifikasi Informasi
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                      <div>
                        <strong className="text-slate-900 block mb-1">Diketahui:</strong>
                        <ul className="list-disc list-inside space-y-1 text-slate-700">
                          {problem.pembahasan.identifikasiInformasi.diketahui.map((d, i) => (
                            <li key={i}>
                              <RichMathText text={d} />
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <strong className="text-slate-900 block mb-1">Ditanyakan:</strong>
                        <p className="text-slate-700 mb-2">
                          <RichMathText text={problem.pembahasan.identifikasiInformasi.ditanyakan} />
                        </p>
                        <strong className="text-slate-900 block mb-1">Asumsi & Batasan Sistem:</strong>
                        <ul className="list-disc list-inside space-y-1 text-slate-700">
                          {problem.pembahasan.identifikasiInformasi.asumsiFisika.map((a, i) => (
                            <li key={i}>
                              <RichMathText text={a} />
                            </li>
                          ))}
                          {problem.pembahasan.identifikasiInformasi.batasanSistem.map((b, i) => (
                            <li key={`b-${i}`}>
                              <RichMathText text={b} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 3. Visualisasi Fisika & Free Body Diagram (FBD) */}
                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-white border border-pink-200 space-y-1.5">
                      <h4 className="text-xs font-bold text-pink-800">
                        3. Visualisasi Fisika & Free Body Diagram (FBD)
                      </h4>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        <RichMathText text={problem.pembahasan.visualisasiFisika} />
                      </p>
                    </div>
                    <FbdDiagram
                      objects={problem.fbdObjects}
                      narrationScript={problem.narrationFbd}
                      problemCode={problem.code}
                    />
                  </div>

                  {/* 4. Analisis Konsep & 5. Persamaan Dasar */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-pink-50/60 border border-pink-200 space-y-1.5">
                      <h4 className="text-xs font-bold text-pink-900">
                        4. Analisis Konsep (Hukum Utama)
                      </h4>
                      <p className="text-sm text-slate-800 leading-relaxed">
                        <RichMathText text={problem.pembahasan.analisisKonsep} />
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-pink-50/60 border border-pink-200 space-y-2">
                      <h4 className="text-xs font-bold text-pink-900">
                        5. Persamaan Dasar (Rumus Penting)
                      </h4>
                      <div className="space-y-1.5">
                        {problem.pembahasan.persamaanDasar.map((eq, i) => (
                          <MathDisplay key={i} tex={eq} block className="text-xs sm:text-sm" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 6. Penurunan Matematis */}
                  <div className="p-4 rounded-xl bg-white border border-pink-200 space-y-2">
                    <h4 className="text-xs font-bold text-pink-800">
                      6. Penurunan Matematis (Runtut Tanpa Lompat)
                    </h4>
                    <div className="space-y-2 text-sm text-slate-800">
                      {problem.pembahasan.penurunanMatematis.map((step, i) => (
                        <div key={i} className="leading-relaxed">
                          {step.includes('=') && !step.includes(' ') ? (
                            <MathDisplay tex={step} block />
                          ) : (
                            <RichMathText text={step} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 7. Substitusi & 8. Perhitungan */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <h4 className="text-xs font-bold text-slate-800">
                        7. Substitusi Angka
                      </h4>
                      <div className="space-y-1.5">
                        {problem.pembahasan.substitusiAngka.map((s, i) => (
                          <MathDisplay key={i} tex={s} block className="text-xs sm:text-sm" />
                        ))}
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                      <h4 className="text-xs font-bold text-slate-800">
                        8. Perhitungan
                      </h4>
                      <div className="space-y-1.5">
                        {problem.pembahasan.perhitungan.map((c, i) => (
                          <MathDisplay key={i} tex={c} block className="text-xs sm:text-sm" />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 9. Pembulatan & 10. Kesimpulan (Hasil Akhir) */}
                  <div className="p-5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                    <h4 className="text-xs font-bold text-emerald-900">
                      9. Pembulatan & 10. Kesimpulan (Hasil Akhir)
                    </h4>
                    <p className="text-sm text-slate-800">
                      <RichMathText text={problem.pembahasan.pembulatan} />
                    </p>
                    <p className="text-base font-bold text-emerald-950">
                      <RichMathText text={problem.pembahasan.kesimpulan} />
                    </p>
                  </div>

                  {/* 11. Insight Olimpiade & 12. Kesalahan Umum */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-200 space-y-1.5">
                      <h4 className="text-xs font-bold text-sky-900">
                        11. Insight Olimpiade (Konsep Kunci)
                      </h4>
                      <p className="text-sm text-slate-800 leading-relaxed">
                        <RichMathText text={problem.pembahasan.insightOlimpiade} />
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-1.5">
                      <h4 className="text-xs font-bold text-amber-900">
                        12. Peringatan Kesalahan Umum
                      </h4>
                      <p className="text-sm text-slate-800 leading-relaxed">
                        <RichMathText text={problem.pembahasan.kesalahanUmum} />
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Prev / Next Problem Navigation */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-pink-100">
          <button
            type="button"
            disabled={problem.id <= 1}
            onClick={() => onSelectProblem(Math.max(1, problem.id - 1))}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-pink-200 bg-white text-xs font-semibold text-slate-700 hover:bg-pink-50 disabled:opacity-40 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Soal Sebelumnya
          </button>

          <button
            type="button"
            disabled={problem.id >= ALL_PROBLEMS.length}
            onClick={() =>
              onSelectProblem(Math.min(ALL_PROBLEMS.length, problem.id + 1))
            }
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pink-600 text-white text-xs font-semibold hover:bg-pink-700 disabled:opacity-40 transition-colors"
          >
            Soal Berikutnya
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </article>
    </section>
  );
};
