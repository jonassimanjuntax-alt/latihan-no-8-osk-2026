import React, { useState } from 'react';
import { Volume2, ArrowRight, ArrowLeft, BookOpen, FileSearch } from 'lucide-react';
import { THEORY_SECTIONS } from '../data/theoryData';
import { SOURCE_ANALYSIS_POINTS, SOURCE_DOCUMENT_META } from '../data/sourceAnalysis';
import { MathDisplay, RichMathText } from './MathBlock';
import { TheoryVisuals } from './TheoryVisuals';
import { misterJoNarrator } from '../utils/ttsNarrator';

interface TheoryModuleProps {
  initialSectionId?: number;
  onGoToProblems: () => void;
}

export const TheoryModule: React.FC<TheoryModuleProps> = ({
  initialSectionId = 1,
  onGoToProblems,
}) => {
  const [mode, setMode] = useState<'curriculum' | 'source'>('curriculum');
  const [activeId, setActiveId] = useState<number>(initialSectionId);

  const currentSection =
    THEORY_SECTIONS.find((s) => s.id === activeId) ?? THEORY_SECTIONS[0];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-28 space-y-6">
      {/* Header & Sub-tab Switch */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-pink-200/80 pb-5">
        <div>
          <p className="text-xs font-semibold text-pink-700 mb-1">
            Pondasi Ilmu · Mastering the Concept
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Teori Dasar & Analisis Soal Nomor 8
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Pelajari konsep sistem katrol majemuk secara bertahap mulai dari pengenalan fenomena hingga teknik massa efektif Olimpiade bersama MISTER JO.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-pink-50 border border-pink-200 rounded-xl self-start">
          <button
            type="button"
            onClick={() => setMode('curriculum')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              mode === 'curriculum'
                ? 'bg-white text-pink-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            12 Tahap Pondasi Ilmu
          </button>
          <button
            type="button"
            onClick={() => setMode('source')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              mode === 'source'
                ? 'bg-white text-pink-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileSearch className="w-3.5 h-3.5" />
            Bedah Dokumen Soal No. 8
          </button>
        </div>
      </div>

      {mode === 'source' ? (
        <div className="space-y-6">
          <div className="rounded-2xl border border-pink-200 bg-white p-6 space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Sumber Resmi · {SOURCE_DOCUMENT_META.sourceFile}
                </p>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {SOURCE_DOCUMENT_META.title}
                </h3>
                <p className="text-xs text-pink-700 font-medium mt-0.5">
                  {SOURCE_DOCUMENT_META.topic}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  misterJoNarrator.speak(
                    'Analisis Soal Sumber Nomor 8',
                    SOURCE_DOCUMENT_META.narrationScript
                  )
                }
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-600 text-white text-xs font-semibold hover:bg-pink-700 transition-colors whitespace-nowrap"
              >
                <Volume2 className="w-4 h-4" />
                Dengarkan Ringkasan Soal Sumber
              </button>
            </div>

            <div className="p-4 rounded-xl bg-pink-50/70 border border-pink-200 text-sm text-slate-800 leading-relaxed">
              “{SOURCE_DOCUMENT_META.originalText}”
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SOURCE_ANALYSIS_POINTS.map((pt) => (
              <article
                key={pt.number}
                className="rounded-xl border border-pink-200/80 bg-white p-5 space-y-2"
              >
                <p className="text-xs font-semibold text-pink-700">
                  {String(pt.number).padStart(2, '0')}. {pt.title}
                </p>
                <h4 className="text-sm font-bold text-slate-900">{pt.summary}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{pt.detail}</p>
                {pt.formula && (
                  <div className="pt-1">
                    <MathDisplay tex={pt.formula} block className="text-xs" />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Navigation List */}
          <nav
            aria-label="Daftar 12 Tahap Pondasi Ilmu"
            className="lg:col-span-4 rounded-2xl border border-pink-200 bg-white p-3 space-y-1"
          >
            <p className="px-2 py-1.5 text-xs font-semibold text-slate-500">
              Urutan Pembelajaran Terstruktur
            </p>
            {THEORY_SECTIONS.map((sec) => {
              const isActive = sec.id === currentSection.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveId(sec.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-colors ${
                    isActive
                      ? 'bg-pink-600 text-white font-semibold'
                      : 'text-slate-700 hover:bg-pink-50 font-medium'
                  }`}
                >
                  {sec.title}
                </button>
              );
            })}
          </nav>

          {/* Right Active Section Detail */}
          <article className="lg:col-span-8 rounded-2xl border border-pink-200 bg-white p-5 sm:p-7 space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-pink-100 pb-4">
              <div>
                <p className="text-xs font-semibold text-pink-700">
                  Tahap {currentSection.id} dari {THEORY_SECTIONS.length}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
                  {currentSection.title}
                </h3>
                <p className="text-sm text-slate-600 mt-1">{currentSection.subtitle}</p>
              </div>

              <button
                type="button"
                onClick={() =>
                  misterJoNarrator.speak(currentSection.title, currentSection.narrationScript)
                }
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-pink-600 text-white text-xs font-semibold hover:bg-pink-700 transition-colors whitespace-nowrap shrink-0"
              >
                <Volume2 className="w-4 h-4" />
                Dengarkan Penjelasan
              </button>
            </div>

            {/* Key Formula Highlight */}
            {currentSection.keyFormula && (
              <div className="p-4 rounded-xl bg-pink-50/70 border border-pink-200">
                <p className="text-[11px] font-semibold text-pink-800 mb-1">
                  Persamaan Kunci
                </p>
                <MathDisplay tex={currentSection.keyFormula} block />
              </div>
            )}

            {/* Prose */}
            <div className="space-y-3 text-sm sm:text-[15px] text-slate-700 leading-relaxed">
              {currentSection.bodyParagraphs.map((p, idx) => (
                <p key={idx}>
                  <RichMathText text={p} />
                </p>
              ))}
            </div>

            {/* Structured Bullet Points */}
            {currentSection.bulletPoints && (
              <ul className="space-y-2.5">
                {currentSection.bulletPoints.map((bp, idx) => (
                  <li
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-sm"
                  >
                    <span className="font-semibold text-slate-900 block mb-0.5">
                      <RichMathText text={bp.label} />
                    </span>
                    <span className="text-slate-700 text-[13.5px] leading-relaxed">
                      <RichMathText text={bp.text} />
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {/* Interactive Scientific Stimulus */}
            <TheoryVisuals type={currentSection.visualType} />

            {/* Highlight Callout Box */}
            <div className="p-4 rounded-xl bg-pink-50/50 border border-pink-200">
              <p className="text-xs font-bold text-pink-800 mb-1">
                {currentSection.calloutTitle}
              </p>
              <p className="text-sm text-slate-800 leading-relaxed">
                <RichMathText text={currentSection.calloutText} />
              </p>
            </div>

            {/* Footer Prev/Next */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-pink-100">
              <button
                type="button"
                disabled={currentSection.id <= 1}
                onClick={() => setActiveId((id) => Math.max(1, id - 1))}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-pink-200 bg-white text-xs font-semibold text-slate-700 hover:bg-pink-50 disabled:opacity-40 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Materi Sebelumnya
              </button>

              {currentSection.id < THEORY_SECTIONS.length ? (
                <button
                  type="button"
                  onClick={() =>
                    setActiveId((id) => Math.min(THEORY_SECTIONS.length, id + 1))
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pink-600 text-white text-xs font-semibold hover:bg-pink-700 transition-colors"
                >
                  Materi Berikutnya
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onGoToProblems}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-pink-600 text-white text-xs font-semibold hover:bg-pink-700 transition-colors"
                >
                  Mulai 15 Soal Latihan
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </article>
        </div>
      )}
    </section>
  );
};
