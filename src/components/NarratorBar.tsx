import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Pause, Play, RotateCcw, ChevronDown } from 'lucide-react';
import { misterJoNarrator, NarratorState } from '../utils/ttsNarrator';

export const NarratorBar: React.FC = () => {
  const [state, setState] = useState<NarratorState>({
    status: 'idle',
    title: 'MISTER JO siap membimbing Anda',
    rate: 1.0,
    muted: false,
    supported: true,
    currentText: '',
  });
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    return misterJoNarrator.subscribe((next) => {
      setState(next);
      if (next.status === 'speaking' || next.status === 'paused') {
        setExpanded(true);
      }
    });
  }, []);

  const rates = [0.85, 1.0, 1.15, 1.3];

  if (!expanded) {
    return (
      <div className="fixed bottom-4 right-4 z-40">
        <button
          type="button"
          onClick={() => {
            setExpanded(true);
            if (!state.currentText) {
              misterJoNarrator.speak(
                'Sambutan MISTER JO',
                'Halo calon juara Olimpiade Fisika! Saya Mister Jo. Pilih menu Pondasi Ilmu untuk mempelajari konsep dasar, atau langsung uji kemampuan Anda pada lima belas soal latihan terstruktur dari Soal Nomor delapan OSK dua ribu dua puluh enam.'
              );
            }
          }}
          aria-label="Buka panel narator suara MISTER JO"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-pink-300 bg-white/95 backdrop-blur-md shadow-md text-xs font-bold text-pink-700 hover:bg-pink-50 transition-colors"
        >
          <Volume2 className="w-4 h-4 text-pink-600" />
          <span>Narator MISTER JO</span>
        </button>
      </div>
    );
  }

  return (
    <aside
      aria-label="Kontrol Narator Suara MISTER JO"
      className="fixed bottom-3 right-3 left-3 sm:left-auto sm:w-[470px] z-40 rounded-xl border border-pink-200 bg-white/95 backdrop-blur-md shadow-lg px-3.5 py-2.5"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[11px] font-bold tracking-wide text-pink-700 truncate">
            MISTER JO · NARATOR FISIKA
          </p>
          <p className="text-xs text-slate-700 truncate" title={state.title}>
            {state.title}
          </p>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {state.status === 'speaking' ? (
            <button
              type="button"
              onClick={() => misterJoNarrator.pause()}
              aria-label="Pause narasi suara"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-pink-600 text-white text-xs font-medium hover:bg-pink-700 transition-colors"
            >
              <Pause className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pause</span>
            </button>
          ) : state.status === 'paused' ? (
            <button
              type="button"
              onClick={() => misterJoNarrator.resume()}
              aria-label="Lanjutkan narasi suara"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-pink-600 text-white text-xs font-medium hover:bg-pink-700 transition-colors"
            >
              <Play className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lanjutkan</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() =>
                state.currentText
                  ? misterJoNarrator.replay()
                  : misterJoNarrator.speak(
                      'Sambutan MISTER JO',
                      'Halo calon juara Olimpiade Fisika! Saya Mister Jo. Pilih menu Pondasi Ilmu untuk mempelajari konsep dasar, atau langsung uji kemampuan Anda pada lima belas soal latihan terstruktur dari Soal Nomor delapan OSK dua ribu dua puluh enam.'
                    )
              }
              aria-label="Dengarkan narasi MISTER JO"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-pink-600 text-white text-xs font-medium hover:bg-pink-700 transition-colors"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Dengarkan</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => misterJoNarrator.replay()}
            disabled={!state.currentText}
            aria-label="Ulangi narasi terakhir"
            className="p-1.5 rounded-lg border border-pink-200 text-slate-700 hover:bg-pink-50 disabled:opacity-40 transition-colors"
            title="Ulangi"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <select
            aria-label="Kecepatan suara narator"
            value={state.rate}
            onChange={(e) => misterJoNarrator.setRate(Number(e.target.value))}
            className="px-1.5 py-1 rounded-lg border border-pink-200 bg-white text-[11px] font-mono text-slate-700"
          >
            {rates.map((r) => (
              <option key={r} value={r}>
                {r.toString().replace('.', ',')}x
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => misterJoNarrator.toggleMute()}
            aria-label={state.muted ? 'Nyalakan suara narator' : 'Matikan suara narator'}
            className={`p-1.5 rounded-lg border transition-colors ${
              state.muted
                ? 'border-rose-300 bg-rose-50 text-rose-700'
                : 'border-pink-200 text-slate-700 hover:bg-pink-50'
            }`}
            title={state.muted ? 'Aktifkan Suara' : 'Matikan Suara'}
          >
            {state.muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={() => setExpanded(false)}
            aria-label="Perkecil panel narator"
            className="p-1.5 rounded-lg border border-pink-200 text-slate-600 hover:bg-pink-50 transition-colors"
            title="Perkecil"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
