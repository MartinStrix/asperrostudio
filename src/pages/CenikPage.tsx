import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon, CheckIcon, CalculatorIcon } from '@heroicons/react/24/outline';
import { Container } from '../components/common/Container';
import { AnimatedBackground } from '../components/common/AnimatedBackground';
import { SEO } from '../components/common/SEO';
import { PageBadge } from '../components/common/PageBadge';
import { findPromoCode, PromoCode } from '../data/pricing';

// ============================================================
//  CENÍK / POPTÁVKA BEZ BARIÉR
//  Jednostránkový formulář: klient naklikne, co hledá, vidí
//  orientační ceny "od", vybere rozpočet a vše se předvyplní
//  do kontaktního formuláře jako nezávazná poptávka.
//  Nabídku služeb i rozpočty upravíš v polích níže.
// ============================================================

interface ServiceOption {
  id: string;
  label: string;
  price?: string; // orientační cena "od" (nezobrazí se u položek na míru)
}

const SERVICES: ServiceOption[] = [
  { id: 'edit', label: 'Video edit / střih', price: 'od 250 Kč za video' },
  { id: 'reels', label: 'Reels & social videa', price: 'od 250 Kč za video' },
  { id: 'reklama', label: 'Reklamní video', price: 'od 7 500 Kč' },
  { id: 'firemni', label: 'Firemní video', price: 'od 4 500 Kč' },
  { id: 'svatba', label: 'Svatební video', price: 'od 10 000 Kč' },
  { id: 'nataceni', label: 'Natáčení (kamera + dron)', price: 'od 2 500 Kč' },
  { id: 'sprava', label: 'Pravidelný obsah / správa', price: 'cena na míru' },
  { id: 'web', label: 'Web design', price: 'cena na míru' },
  { id: 'ai', label: 'AI řešení & automatizace', price: 'cena na míru' },
  { id: 'jine', label: 'Mám zájem o něco jiného' },
];

const BUDGETS = [
  'do 5 000 Kč',
  '5 000 – 10 000 Kč',
  '10 000 – 15 000 Kč',
  '15 000 – 20 000 Kč',
  '20 000 – 30 000 Kč',
  '30 000 – 50 000 Kč',
  '50 000+ Kč',
  'ještě nevím',
];

// Číslovaná hlavička sekce (moderní styl původní kalkulačky)
const FieldLabel = ({ n, children }: { n: number; children: React.ReactNode }) => (
  <h2 className="flex items-center gap-3 text-base md:text-lg font-bold font-display mb-4">
    <span className="w-7 h-7 shrink-0 rounded-full bg-gradient-to-br from-cyan-400 to-pink-500 text-white text-xs font-bold flex items-center justify-center shadow-lg shadow-pink-500/25">
      {n}
    </span>
    {children}
  </h2>
);

const inputCls =
  'w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/70 transition-colors';

export const CenikPage = () => {
  const navigate = useNavigate();

  const [services, setServices] = useState<string[]>([]);
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [budget, setBudget] = useState('');
  const [promoInput, setPromoInput] = useState('');
  const [promo, setPromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState(false);
  const [note, setNote] = useState('');

  const toggleService = (id: string) =>
    setServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );

  const applyPromo = () => {
    const found = findPromoCode(promoInput);
    if (found) {
      setPromo(found);
      setPromoError(false);
    } else {
      setPromo(null);
      setPromoError(true);
    }
  };

  // Orientační souhrn cen podle vybraných služeb
  const priceHint = useMemo(() => {
    const picked = SERVICES.filter((s) => services.includes(s.id) && s.price);
    if (picked.length === 0) return null;
    return picked.map((s) => `${s.label} — ${s.price}`).join('  ·  ');
  }, [services]);

  const buildPrefillMessage = (): string => {
    const picked = SERVICES.filter((s) => services.includes(s.id));
    const lines: string[] = ['Dobrý den,', '', 'posílám nezávaznou poptávku z vašeho ceníku:', ''];
    if (picked.length > 0) {
      lines.push(`• Hledám: ${picked.map((s) => s.label).join(', ')}`);
    }
    if (brand.trim()) lines.push(`• Značka / firma: ${brand.trim()}`);
    if (name.trim()) lines.push(`• Jméno: ${name.trim()}`);
    if (phone.trim()) lines.push(`• Telefon: ${phone.trim()}`);
    if (email.trim()) lines.push(`• E-mail: ${email.trim()}`);
    if (instagram.trim()) lines.push(`• Instagram: ${instagram.trim()}`);
    if (budget) lines.push(`• Rozpočet zhruba: ${budget}`);
    if (promo) lines.push(`• Slevový kód: ${promo.code} (−${promo.discountPercent} %)`);
    if (note.trim()) {
      lines.push('', note.trim());
    }
    lines.push('', 'Prosím o nezávaznou konzultaci zdarma.');
    return lines.join('\n');
  };

  const submit = () => {
    navigate('/kontakt', { state: { prefill: buildPrefillMessage() } });
  };

  return (
    <>
      <SEO
        title="Ceník"
        description="Poptávka bez bariér: naklikejte, co hledáte — video edit, reklamní i firemní videa, natáčení s dronem, web design nebo AI řešení. Orientační ceny od 250 Kč, konzultace zdarma."
      />
      <div className="min-h-screen bg-dark text-white pt-28 pb-28 lg:pb-24">
        <AnimatedBackground />

        <Container className="relative z-10">
          {/* Záhlaví */}
          <motion.div
            className="text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PageBadge icon={<CalculatorIcon className="w-4 h-4" />} label="Ceník" />
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Poptávka{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                bez bariér
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Žádné složité kroky. Naklikejte, co hledáte, rovnou vidíte ceny
              "od" — a my se vám ozveme s nabídkou na míru. Konzultace je
              vždy zdarma.
            </p>
          </motion.div>

          {/* Formulář + živý přehled */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr),300px] gap-8 items-start">
          <motion.div
            className="space-y-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Hledám */}
            <div className="p-6 md:p-7 rounded-2xl bg-white/5 border border-white/10">
              <FieldLabel n={1}>Co hledáte?</FieldLabel>
              <div className="flex flex-wrap gap-2.5">
                {SERVICES.map((s) => {
                  const selected = services.includes(s.id);
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleService(s.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all active:scale-[0.97] ${
                        selected
                          ? 'text-white bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 shadow-lg shadow-purple-500/25'
                          : 'text-gray-300 bg-white/5 border border-white/20 hover:border-white/45 hover:bg-white/10'
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
              {priceHint && (
                <p className="mt-4 font-mono text-[11px] leading-relaxed tracking-wide text-gray-500 uppercase">
                  Orientačně: <span className="text-cyan-400/90 normal-case">{priceHint}</span>
                </p>
              )}
            </div>

            {/* Značka */}
            <div className="p-6 md:p-7 rounded-2xl bg-white/5 border border-white/10">
              <FieldLabel n={2}>Pro jakou značku / firmu?</FieldLabel>
              <input
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="Název značky…"
                maxLength={80}
                className={inputCls}
              />
            </div>

            {/* Jméno */}
            <div className="p-6 md:p-7 rounded-2xl bg-white/5 border border-white/10">
              <FieldLabel n={3}>Vaše jméno</FieldLabel>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Vaše jméno…"
                maxLength={80}
                autoComplete="name"
                className={inputCls}
              />
            </div>

            {/* Telefon */}
            <div className="p-6 md:p-7 rounded-2xl bg-white/5 border border-white/10">
              <FieldLabel n={4}>Telefon</FieldLabel>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+420 …"
                maxLength={20}
                autoComplete="tel"
                className={inputCls}
              />
            </div>

            {/* E-mail */}
            <div className="p-6 md:p-7 rounded-2xl bg-white/5 border border-white/10">
              <FieldLabel n={5}>E-mail</FieldLabel>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@domena.cz…"
                maxLength={100}
                autoComplete="email"
                className={inputCls}
              />
            </div>

            {/* Instagram */}
            <div className="p-6 md:p-7 rounded-2xl bg-white/5 border border-white/10">
              <FieldLabel n={6}>Instagram (nepovinné)</FieldLabel>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="@vase.znacka"
                maxLength={60}
                className={inputCls}
              />
            </div>

            {/* Rozpočet */}
            <div className="p-6 md:p-7 rounded-2xl bg-white/5 border border-white/10">
              <FieldLabel n={7}>Rozpočet zhruba</FieldLabel>
              <div className="flex flex-wrap gap-2.5">
                {BUDGETS.map((b) => {
                  const selected = budget === b;
                  return (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setBudget(selected ? '' : b)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all active:scale-[0.97] ${
                        selected
                          ? 'text-white bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 shadow-lg shadow-purple-500/25'
                          : 'text-gray-300 bg-white/5 border border-white/20 hover:border-white/45 hover:bg-white/10'
                      }`}
                    >
                      {b}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slevový kód */}
            <div className="p-6 md:p-7 rounded-2xl bg-white/5 border border-white/10">
              <FieldLabel n={8}>Slevový kód (nepovinné)</FieldLabel>
              {promo ? (
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 text-green-400 font-medium">
                    <CheckIcon className="w-5 h-5" />
                    {promo.code} — sleva {promo.discountPercent} %
                    {promo.label ? ` (${promo.label})` : ''}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setPromo(null);
                      setPromoInput('');
                    }}
                    className="text-gray-500 hover:text-white text-sm underline transition-colors"
                  >
                    Odebrat
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => {
                        setPromoInput(e.target.value);
                        setPromoError(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          applyPromo();
                        }
                      }}
                      placeholder="Kód z akce nebo voucher…"
                      maxLength={30}
                      className={inputCls}
                    />
                    <button
                      type="button"
                      onClick={applyPromo}
                      disabled={promoInput.trim().length === 0}
                      className="shrink-0 self-end mb-1 px-5 py-2 rounded-full text-sm font-semibold text-white bg-white/10 border border-white/20 hover:border-cyan-400 hover:text-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      Uplatnit
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-pink-400 text-sm mt-2">
                      Tento kód neznáme. Zkontrolujte prosím překlepy.
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Zpráva */}
            <div className="p-6 md:p-7 rounded-2xl bg-white/5 border border-white/10">
              <FieldLabel n={9}>Ještě pár slov</FieldLabel>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                maxLength={800}
                placeholder="Řekněte nám, co máte na srdci…"
                className={`${inputCls} resize-none`}
              />
            </div>

            {/* Odeslat */}
            <button
              type="button"
              onClick={submit}
              disabled={services.length === 0}
              className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-cyan-400 to-pink-500 hover:shadow-xl hover:shadow-pink-500/30 hover:brightness-110 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Odeslat poptávku
              <ArrowRightIcon className="w-5 h-5" />
            </button>
            <p className="text-gray-600 text-xs text-center mt-4">
              {services.length === 0
                ? 'Nejdřív vyberte, co hledáte — pak vás přesuneme do nezávazné poptávky.'
                : 'Vše se předvyplní do kontaktního formuláře — před odesláním si to ještě zkontrolujete.'}
            </p>
          </motion.div>

          {/* ===== ŽIVÝ PŘEHLED (desktop) ===== */}
          <aside className="hidden lg:block sticky top-28 rounded-2xl bg-white/5 border border-white/10 p-6">
            <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-3">
              Vaše poptávka
            </h3>
            <div className="text-sm space-y-2 pb-4 border-b border-white/10">
              {services.length === 0 ? (
                <p className="text-gray-600">Zatím nic nevybráno</p>
              ) : (
                SERVICES.filter((sv) => services.includes(sv.id)).map((sv) => (
                  <p key={sv.id} className="flex justify-between gap-2">
                    <span className="text-white">{sv.label}</span>
                    {sv.price && (
                      <span className="shrink-0 text-cyan-400/90 text-xs font-medium whitespace-nowrap">
                        {sv.price}
                      </span>
                    )}
                  </p>
                ))
              )}
            </div>
            <div className="text-sm py-3 border-b border-white/10 flex justify-between gap-3">
              <span className="text-gray-500">Rozpočet</span>
              <span className={budget ? 'text-white font-medium text-right' : 'text-gray-600'}>
                {budget || '—'}
              </span>
            </div>
            <div className="text-sm py-3 flex justify-between gap-3">
              <span className="text-gray-500">Sleva</span>
              <span className={promo ? 'text-green-400 font-medium' : 'text-gray-600'}>
                {promo ? `${promo.code} · −${promo.discountPercent} %` : '—'}
              </span>
            </div>
            <p className="text-gray-600 text-[11px] mt-2">
              Ceny jsou orientační "od" — finální nabídka vzniká na
              konzultaci zdarma.
            </p>
          </aside>
          </div>
        </Container>

        {/* ===== MOBILNÍ LIŠTA S PŘEHLEDEM ===== */}
        {services.length > 0 && (
          <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-dark-100/95 backdrop-blur-xl px-4 py-3">
            <div className="flex items-center justify-between gap-3 max-w-xl mx-auto">
              <div className="min-w-0">
                <p className="text-[11px] text-gray-500 truncate">
                  {services.length}× služba
                  {budget ? ` · ${budget}` : ''}
                  {promo ? ` · −${promo.discountPercent} %` : ''}
                </p>
                <p className="text-sm font-semibold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                  Konzultace zdarma · ceny "od"
                </p>
              </div>
              <button
                type="button"
                onClick={submit}
                className="shrink-0 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-cyan-400 to-pink-500 hover:brightness-110 transition-all"
              >
                Poptat
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
