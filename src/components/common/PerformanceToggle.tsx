import { BoltIcon, BoltSlashIcon } from '@heroicons/react/24/outline';
import { useLowPerf, setLowPerf } from '../../utils/performanceMode';

// ============================================================
//  PŘEPÍNAČ ÚSPORNÉHO REŽIMU
//  Nenápadné tlačítko vlevo dole (jen na počítači).
//  Přepnout jde i odkazem v patičce webu.
// ============================================================

export const PerformanceToggle = () => {
  const lowPerf = useLowPerf();

  return (
    <button
      type="button"
      onClick={() => setLowPerf(!lowPerf)}
      title={
        lowPerf
          ? 'Zapnout animace'
          : 'Vypnout animace (úsporný režim pro slabší počítače)'
      }
      aria-label={
        lowPerf
          ? 'Zapnout animace webu'
          : 'Vypnout animace webu – úsporný režim'
      }
      className="hidden lg:flex fixed bottom-5 left-5 z-40 items-center gap-2 px-4 py-2.5 rounded-full bg-dark-100/95 border-2 border-white/25 text-gray-200 shadow-lg shadow-black/40 hover:text-white hover:border-cyan-400 hover:shadow-cyan-500/20 active:scale-[0.97] transition-all"
    >
      {lowPerf ? (
        <BoltSlashIcon className="w-5 h-5 text-pink-400" />
      ) : (
        <BoltIcon className="w-5 h-5 text-cyan-400" />
      )}
      <span className="text-sm font-semibold whitespace-nowrap">
        {lowPerf ? 'Zapnout animace' : 'Bez animací'}
      </span>
    </button>
  );
};
