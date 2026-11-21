import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { HomeLanding, ActiveRoute } from './components/HomeLanding';
import { TheoryModule } from './components/TheoryModule';
import { ProblemWorkspace, ProblemAttemptState } from './components/ProblemWorkspace';
import { AnimationLab } from './components/AnimationLab';
import { ProgressAndEval } from './components/ProgressAndEval';
import { NarratorBar } from './components/NarratorBar';
import { AnswerCheckResult } from './physics/solvers';

const STORAGE_KEY = 'misterjo_osk_q8_attempts_v1';

export default function App() {
  const [route, setRoute] = useState<ActiveRoute>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') return 'problems';
    }
    return 'home';
  });

  const [selectedProblemId, setSelectedProblemId] = useState<number>(1);
  const [selectedTheoryId, setSelectedTheoryId] = useState<number>(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [attempts, setAttempts] = useState<Record<number, ProblemAttemptState>>(() => {
    if (typeof window === 'undefined') return {};
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(attempts));
    } catch {
      // ignore quota errors
    }
  }, [attempts]);

  const handleNavigate = (nextRoute: ActiveRoute, problemId?: number) => {
    setRoute(nextRoute);
    if (problemId !== undefined) {
      setSelectedProblemId(problemId);
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoToTheory = (theoryId: number) => {
    setSelectedTheoryId(theoryId);
    handleNavigate('theory');
  };

  const handleSubmitAttempt = (
    problemId: number,
    input: string,
    result: AnswerCheckResult
  ) => {
    setAttempts((prev) => {
      const prevCount = prev[problemId]?.attemptsCount ?? 0;
      return {
        ...prev,
        [problemId]: {
          answerInput: input,
          result,
          attemptsCount: prevCount + 1,
        },
      };
    });
  };

  const handleResetAttempt = (problemId: number) => {
    setAttempts((prev) => {
      const next = { ...prev };
      delete next[problemId];
      return next;
    });
  };

  const handleResetAll = () => {
    setAttempts({});
  };

  const solvedCount = Object.values(attempts).filter((a) => a.result?.isCorrect).length;

  const navLinks: Array<{ id: ActiveRoute; label: string }> = [
    { id: 'theory', label: 'Pondasi Ilmu' },
    { id: 'problems', label: '15 Soal Latihan' },
    { id: 'animations', label: 'Animasi Fisika' },
    { id: 'progress', label: 'Progres Belajar' },
    { id: 'eval', label: 'Evaluasi Hasil' },
  ];

  return (
    <div className="min-h-screen bg-[#fffcfd] text-slate-900 flex flex-col">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-pink-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <button
            type="button"
            onClick={() => handleNavigate('home')}
            className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 hover:text-pink-700 transition-colors whitespace-nowrap shrink-0"
          >
            MISTER JO
          </button>

          {/* Zone 2: 5 concise single-line nav links */}
          <nav
            aria-label="Navigasi Utama"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
          >
            {navLinks.map((item) => {
              const active = route === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={`whitespace-nowrap shrink-0 py-1 border-b-2 transition-colors ${
                    active
                      ? 'border-pink-600 text-pink-700 font-semibold'
                      : 'border-transparent hover:text-slate-900 hover:border-pink-200'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary CTA action (+ mobile menu toggle on small screens) */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleNavigate('problems', selectedProblemId)}
              className="px-4 py-2 rounded-xl bg-pink-600 text-white text-xs font-bold hover:bg-pink-700 transition-colors whitespace-nowrap shrink-0"
            >
              Start Learning
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
              className="md:hidden p-2 rounded-lg border border-pink-200 text-slate-700 hover:bg-pink-50"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <nav
            aria-label="Menu Seluler"
            className="md:hidden border-t border-pink-100 bg-white px-4 py-3 flex flex-col gap-1.5"
          >
            <button
              type="button"
              onClick={() => handleNavigate('home')}
              className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                route === 'home' ? 'bg-pink-50 text-pink-700 font-semibold' : 'text-slate-700'
              }`}
            >
              Beranda
            </button>
            {navLinks.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavigate(item.id)}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  route === item.id ? 'bg-pink-50 text-pink-700 font-semibold' : 'text-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {route === 'home' && (
          <HomeLanding solvedCount={solvedCount} onNavigate={handleNavigate} />
        )}
        {route === 'theory' && (
          <TheoryModule
            key={selectedTheoryId}
            initialSectionId={selectedTheoryId}
            onGoToProblems={() => handleNavigate('problems', 1)}
          />
        )}
        {route === 'problems' && (
          <ProblemWorkspace
            attempts={attempts}
            selectedProblemId={selectedProblemId}
            onSelectProblem={setSelectedProblemId}
            onSubmitAttempt={handleSubmitAttempt}
            onResetAttempt={handleResetAttempt}
            onGoToTheory={handleGoToTheory}
            onGoToEval={() => handleNavigate('eval')}
          />
        )}
        {route === 'animations' && <AnimationLab />}
        {(route === 'progress' || route === 'eval') && (
          <ProgressAndEval
            mode={route === 'progress' ? 'progress' : 'eval'}
            attempts={attempts}
            onOpenProblem={(id) => handleNavigate('problems', id)}
            onOpenTheory={handleGoToTheory}
            onResetAll={handleResetAll}
          />
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-pink-100 bg-white py-5 px-4 sm:px-6 text-xs text-slate-500 mb-14 sm:mb-0">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span>MISTER JO – Physics Olympiad Training · Special Training Question No. 8</span>
          <span>OSK Fisika SMA 2026 · Sistem Katrol Majemuk</span>
        </div>
      </footer>

      {/* Persistent MISTER JO TTS Narrator Control Bar */}
      <NarratorBar />
    </div>
  );
}
