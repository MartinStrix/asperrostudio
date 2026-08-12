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
      className="hidden lg:flex fixed bottom-4 left-4 z-40 w-10 h-10 rounded-full bg-dark-100/80 border border-white/15 items-center justify-center text-gray-500 hover:text-white hover:border-white/40 opacity-60 hover:opacity-100 transition-all"
    >
      {lowPerf ? (
        <BoltSlashIcon className="w-5 h-5" />
      ) : (
        <BoltIcon className="w-5 h-5" />
      )}
    </button>
  );
};
