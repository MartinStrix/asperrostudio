import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  getConsent,
  setConsent,
  SETTINGS_OPEN_EVENT,
} from '../../utils/cookieConsent';

// ============================================================
//  COOKIE LIŠTA – zobrazí se při první návštěvě,
//  znovu ji lze otevřít odkazem "Nastavení cookies" v patičce
// ============================================================

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Zobrazit, pokud návštěvník ještě nevolil
    if (getConsent() === null) {
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const reopen = () => setIsVisible(true);
    window.addEventListener(SETTINGS_OPEN_EVENT, reopen);
    return () => window.removeEventListener(SETTINGS_OPEN_EVENT, reopen);
  }, []);

  const choose = (consent: 'all' | 'necessary') => {
    setConsent(consent);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-5"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-label="Nastavení cookies"
        >
          <div className="max-w-3xl mx-auto rounded-2xl bg-dark-100/95 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/50 p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
              <div className="flex-1">
                <p className="font-bold font-display mb-1">🍪 Cookies na tomto webu</p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Sami žádné sledovací cookies nepoužíváme. Ukládáme pouze vaši
                  volbu souhlasu. Vložená YouTube videa však mohou po přehrání
                  ukládat cookies služby Google.{' '}
                  <Link
                    to="/cookies"
                    className="underline text-gray-400 hover:text-white transition-colors"
                  >
                    Zásady cookies
                  </Link>
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => choose('necessary')}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold border-2 border-white/20 text-white hover:border-white/50 active:scale-[0.98] transition-all"
                >
                  Pouze nezbytné
                </button>
                <button
                  type="button"
                  onClick={() => choose('all')}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-400 to-pink-500 hover:brightness-110 hover:shadow-lg hover:shadow-pink-500/25 active:scale-[0.98] transition-all"
                >
                  Přijmout vše
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
