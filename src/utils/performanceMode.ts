// ============================================================
//  ÚSPORNÝ REŽIM (web bez animací pro slabší počítače)
//  - volba se ukládá do localStorage a přežije obnovení stránky
//  - zapíná třídu "low-perf" na <html>, na kterou reagují styly
// ============================================================
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'asperro-usporny-rezim';
const EVENT = 'asperro:performance-mode-changed';

export const isLowPerf = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
};

/** Zapne/vypne úsporný režim a ihned ho promítne do stránky */
export const setLowPerf = (enabled: boolean): void => {
  try {
    if (enabled) {
      localStorage.setItem(STORAGE_KEY, '1');
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // úložiště nedostupné – režim bude platit jen do obnovení stránky
  }
  applyLowPerfClass(enabled);
  window.dispatchEvent(new CustomEvent(EVENT, { detail: enabled }));
};

export const applyLowPerfClass = (enabled: boolean): void => {
  document.documentElement.classList.toggle('low-perf', enabled);
};

/** React hook – aktuální stav úsporného režimu */
export const useLowPerf = (): boolean => {
  const [enabled, setEnabled] = useState(isLowPerf);

  useEffect(() => {
    // při načtení promítnout uloženou volbu
    applyLowPerfClass(isLowPerf());
    const onChange = (e: Event) =>
      setEnabled((e as CustomEvent<boolean>).detail ?? isLowPerf());
    window.addEventListener(EVENT, onChange);
    return () => window.removeEventListener(EVENT, onChange);
  }, []);

  return enabled;
};
