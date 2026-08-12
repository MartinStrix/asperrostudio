import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { XMarkIcon, GiftIcon, CheckIcon } from '@heroicons/react/24/outline';

// ============================================================
//  UVÍTACÍ NABÍDKA SLEVY
//  Zobrazí se jednou (zavření se pamatuje v prohlížeči).
//  Kód a výši slevy měníš tady; kód musí existovat
//  i v src/data/pricing.ts v PROMO_CODES, aby v ceníku fungoval.
//  Akci vypneš smazáním <PromoPopup /> v App.tsx
//  (a řádku kódu v pricing.ts).
// ============================================================

const PROMO_CODE = 'OpenAS2026';
const PROMO_DISCOUNT = 25; // % – jen pro zobrazení v textu
const STORAGE_KEY = 'asperro-promo-openas2026-zavreno';

export const PromoPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      // úložiště nedostupné – nabídku raději nezobrazíme opakovaně agresivně
    }
    const timer = setTimeout(() => setIsVisible(true), 2500);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setIsVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignorujeme
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(PROMO_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // starší prohlížeče – kód je vidět, uživatel ho opíše
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Nabídka slevy"
        >
          {/* Pozadí */}
          <div
            className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
            onClick={close}
            aria-hidden="true"
          />

          {/* Karta */}
          <motion.div
            className="relative w-full max-w-md rounded-3xl bg-dark-100/95 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/60 p-7 md:p-9 text-center overflow-hidden"
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ duration: 0.3 }}
          >
            {/* Záře uvnitř karty */}
            <div
              aria-hidden="true"
              className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-gradient-to-br from-cyan-500/25 to-pink-500/25 blur-3xl pointer-events-none"
            />

            {/* Zavřít */}
            <button
              type="button"
              onClick={close}
              aria-label="Zavřít nabídku"
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>

            <div className="relative">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-pink-500/30">
                <GiftIcon className="w-7 h-7" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold font-display mb-2">
                Sleva{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  {PROMO_DISCOUNT} %
                </span>{' '}
                na váš projekt
              </h2>

              <AnimatePresence mode="wait">
                {!revealed ? (
                  <motion.div
                    key="offer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-gray-300 mb-6">
                      Získejte slevový kód a uplatněte ho v našem ceníku
                      při nezávazné kalkulaci.
                    </p>
                    <button
                      type="button"
                      onClick={() => setRevealed(true)}
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-cyan-400 to-pink-500 hover:shadow-xl hover:shadow-pink-500/30 hover:brightness-110 active:scale-[0.98] transition-all"
                    >
                      Chci slevu
                    </button>
                    <button
                      type="button"
                      onClick={close}
                      className="mt-3 text-sm text-gray-500 hover:text-gray-300 transition-colors"
                    >
                      Ne, děkuji
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="code"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="text-gray-300 mb-4">Váš slevový kód:</p>
                    <button
                      type="button"
                      onClick={copyCode}
                      className="w-full mb-4 px-6 py-4 rounded-xl border-2 border-dashed border-cyan-400/60 bg-white/5 hover:bg-white/10 transition-colors"
                      aria-label="Zkopírovat kód"
                    >
                      <span className="block font-mono text-2xl font-bold tracking-wider bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                        {PROMO_CODE}
                      </span>
                      <span className="mt-1 inline-flex items-center gap-1.5 text-xs text-gray-400">
                        {copied ? (
                          <>
                            <CheckIcon className="w-4 h-4 text-green-400" />
                            <span className="text-green-400">Zkopírováno!</span>
                          </>
                        ) : (
                          'Kliknutím zkopírujete'
                        )}
                      </span>
                    </button>
                    <Link
                      to="/cenik"
                      onClick={close}
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-cyan-400 to-pink-500 hover:shadow-xl hover:shadow-pink-500/30 hover:brightness-110 active:scale-[0.98] transition-all"
                    >
                      Použít v ceníku
                    </Link>
                    <p className="text-gray-500 text-xs mt-3">
                      Kód uplatníte v souhrnu nezávazné kalkulace.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
