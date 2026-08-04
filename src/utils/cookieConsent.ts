// ============================================================
//  SPRÁVA SOUHLASU S COOKIES
//  - volba se ukládá do localStorage (to je ta jediná "nezbytná"
//    položka, kterou si web sám ukládá)
//  - 'all'       = povoleno vše včetně YouTube
//  - 'necessary' = pouze nezbytné (YouTube videa se nenačtou,
//                  dokud je návštěvník nepovolí)
// ============================================================

export type CookieConsent = 'all' | 'necessary';

const STORAGE_KEY = 'asperro-cookie-consent';
export const CONSENT_CHANGED_EVENT = 'asperro:cookie-consent-changed';
export const SETTINGS_OPEN_EVENT = 'asperro:cookie-settings-open';

export const getConsent = (): CookieConsent | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'all' || value === 'necessary' ? value : null;
  } catch {
    return null;
  }
};

export const setConsent = (consent: CookieConsent): void => {
  try {
    localStorage.setItem(STORAGE_KEY, consent);
  } catch {
    // localStorage nedostupné (např. přísný režim prohlížeče) – nevadí
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: consent }));
};

/** Otevře cookie lištu znovu (např. z odkazu v patičce) */
export const openCookieSettings = (): void => {
  window.dispatchEvent(new CustomEvent(SETTINGS_OPEN_EVENT));
};
