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

// Popisek sekce ve stylu předlohy
const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="flex items-baseline gap-2 text-sm italic font-medium text-cyan-300 mb-3">
    <span className="font-mono not-italic text-[10px] text-cyan-500/80">//</span>
    {children}
  </p>
);

const inputCls =
  'w-full bg-transparent border-0 border-b border-white/15 focus:border-cyan-400 focus:ring-0 focus:outline-none px-0 py-2.5 text-lg text-white placeholder-gray-600 transition-colors';

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
      <div className="min-h-screen bg-dark text-white pt-28 pb-24">
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
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent italic">
                bez bariér.
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Žádné složité kroky. Naklikejte, co hledáte, rovnou vidíte ceny
              "od" — a my se vám ozveme s nabídkou na míru. Konzultace je
              vždy zdarma.
            </p>
          </motion.div>

          {/* Formulář */}
          <motion.div
            className="max-w-2xl mx-auto rounded-3xl border border-cyan-400/25 bg-dark-100/60 backdrop-blur-xl shadow-2xl shadow-cyan-500/5 p-6 md:p-10"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Hledám */}
            <div className="pb-7 border-b border-white/10">
              <FieldLabel>hledám</FieldLabel>
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
            <div className="py-6 border-b border-white/10">
              <FieldLabel>pro moji značku / firmu</FieldLabel>
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
            <div className="py-6 border-b border-white/10">
              <FieldLabel>a jsem</FieldLabel>
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
            <div className="py-6 border-b border-white/10">
              <FieldLabel>kontaktujte mě na</FieldLabel>
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
            <div className="py-6 border-b border-white/10">
              <FieldLabel>pište mi na</FieldLabel>
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
            <div className="py-6 border-b border-white/10">
              <FieldLabel>můj instagram (nepovinné)</FieldLabel>
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
            <div className="py-6 border-b border-white/10">
              <FieldLabel>rozpočet zhruba</FieldLabel>
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
            <div className="py-6 border-b border-white/10">
              <FieldLabel>mám slevový kód (nepovinné)</FieldLabel>
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
            <div className="py-6">
              <FieldLabel>a ještě pár slov</FieldLabel>
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
              className="w-full mt-2 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-mono text-sm font-semibold tracking-[0.2em] uppercase text-white bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 hover:shadow-xl hover:shadow-purple-500/30 hover:brightness-110 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              Odeslat poptávku
              <ArrowRightIcon className="w-4 h-4" />
            </button>
            <p className="text-gray-600 text-xs text-center mt-4">
              {services.length === 0
                ? 'Nejdřív vyberte, co hledáte — pak vás přesuneme do nezávazné poptávky.'
                : 'Vše se předvyplní do kontaktního formuláře — před odesláním si to ještě zkontrolujete.'}
            </p>
          </motion.div>
        </Container>
      </div>
    </>
  );
};
