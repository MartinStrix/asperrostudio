import { motion } from 'framer-motion';
import { Container } from '../components/common/Container';
import { SEO } from '../components/common/SEO';
import { openCookieSettings } from '../utils/cookieConsent';
import { CONTACT_INFO } from '../utils/constants';

// ============================================================
//  ZÁSADY POUŽÍVÁNÍ SOUBORŮ COOKIE
//  Texty klidně upravuj. Datum poslední aktualizace dole
//  změň, kdykoliv zásady upravíš.
// ============================================================

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="text-xl md:text-2xl font-bold font-display mb-3">{title}</h2>
    <div className="text-gray-300 leading-relaxed space-y-3">{children}</div>
  </div>
);

export const CookiesPage = () => {
  return (
    <>
      <SEO
        title="Zásady cookies"
        description="Informace o používání souborů cookie na webu AsperroStudio."
      />
      <div className="min-h-screen bg-dark text-white pt-28 pb-20">
        {/* Background – jemné záře ve firemních barvách */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-[128px]" />
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-pink-500/15 rounded-full blur-[128px]" />
        </div>

        <Container className="relative z-10">
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-10">
              Zásady používání{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                souborů cookie
              </span>
            </h1>

            <Section title="Kdo je správcem">
              <p>
                Provozovatelem webu www.asperrostudio.cz je AsperroStudio
                (Martin Poláček, IČO 24399949). V případě jakýchkoliv dotazů
                ohledně cookies nebo zpracování údajů nás kontaktujte na{' '}
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
                >
                  {CONTACT_INFO.email}
                </a>
                .
              </p>
            </Section>

            <Section title="Co jsou cookies">
              <p>
                Cookies jsou malé textové soubory, které webové stránky
                ukládají do vašeho prohlížeče. Slouží například k zapamatování
                vašich voleb nebo k fungování vložených služeb třetích stran.
                Podobně funguje i tzv. localStorage — úložiště prohlížeče,
                které používáme k zapamatování vaší volby souhlasu.
              </p>
            </Section>

            <Section title="Jaké cookies používáme">
              <p>
                <strong className="text-white">Nezbytné:</strong> Ukládáme
                pouze jedinou položku — vaši volbu souhlasu s cookies (v
                localStorage pod klíčem{' '}
                <code className="text-sm bg-white/10 px-1.5 py-0.5 rounded">
                  asperro-cookie-consent
                </code>
                ). Zůstává uložená, dokud ji nesmažete v prohlížeči. Žádné
                vlastní analytické ani marketingové cookies nepoužíváme.
              </p>
              <p>
                <strong className="text-white">Cookies třetích stran
                (YouTube):</strong> Na webu jsou vložena videa ze služby
                YouTube provozované společností Google. Video se načte až ve
                chvíli, kdy na něj kliknete — a pokud jste povolili pouze
                nezbytné cookies, požádáme vás před přehráním o dodatečný
                souhlas. Po načtení přehrávače může Google ukládat vlastní
                cookies dle svých{' '}
                <a
                  href="https://policies.google.com/technologies/cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
                >
                  zásad používání cookies
                </a>
                .
              </p>
            </Section>

            <Section title="Jak změnit své nastavení">
              <p>
                Svou volbu můžete kdykoliv změnit kliknutím na tlačítko níže
                nebo na odkaz „Nastavení cookies" v patičce webu. Cookies a
                localStorage můžete také smazat přímo v nastavení svého
                prohlížeče.
              </p>
              <button
                type="button"
                onClick={openCookieSettings}
                className="inline-flex items-center gap-2 mt-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-400 to-pink-500 hover:brightness-110 hover:shadow-lg hover:shadow-pink-500/25 active:scale-[0.98] transition-all"
              >
                Otevřít nastavení cookies
              </button>
            </Section>

            <Section title="Vaše práva">
              <p>
                V souvislosti se zpracováním osobních údajů máte zejména právo
                na informace, přístup, opravu, výmaz a právo vznést námitku.
                Se svými požadavky se na nás můžete kdykoliv obrátit e-mailem.
                Máte také právo podat stížnost u Úřadu pro ochranu osobních
                údajů (www.uoou.gov.cz).
              </p>
            </Section>

            <p className="text-sm text-gray-500 mt-12">
              Poslední aktualizace: srpen 2026
            </p>
          </motion.div>
        </Container>
      </div>
    </>
  );
};
