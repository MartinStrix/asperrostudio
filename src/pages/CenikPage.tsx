import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  ArrowPathIcon,
  DevicePhoneMobileIcon,
  MegaphoneIcon,
  HeartIcon,
  ScissorsIcon,
  PuzzlePieceIcon,
  CalculatorIcon,
} from '@heroicons/react/24/outline';
import { Container } from '../components/common/Container';
import { AnimatedBackground } from '../components/common/AnimatedBackground';
import { PageBadge } from '../components/common/PageBadge';
import { SEO } from '../components/common/SEO';
import {
  PRICING_CATEGORIES,
  PricingCategory,
  PricingTier,
  QuantityOption,
  formatPrice,
  findPromoCode,
  PromoCode,
} from '../data/pricing';

// Ikony kategorií
const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  shorts: DevicePhoneMobileIcon,
  firemni: MegaphoneIcon,
  svatba: HeartIcon,
  postprodukce: ScissorsIcon,
  namiru: PuzzlePieceIcon,
};

type Step = 'category' | 'tier' | 'quantity' | 'addons' | 'summary';

const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

export const CenikPage = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState<Step>('category');
  const [category, setCategory] = useState<PricingCategory | null>(null);
  const [tier, setTier] = useState<PricingTier | null>(null);
  const [quantity, setQuantity] = useState<QuantityOption | null>(null);
  const [addonIds, setAddonIds] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [promoInput, setPromoInput] = useState('');
  const [promo, setPromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState(false);
  const [wantConsult, setWantConsult] = useState(true);

  const qty = quantity?.count ?? 1;

  // Doplňky, které jsou u zvolené varianty už v ceně
  const isIncluded = (addonIncludedIn?: string[]) =>
    !!tier && !!addonIncludedIn?.includes(tier.id);

  // Průběžná celková cena "od"
  const total = useMemo(() => {
    if (!category || !tier) return 0;
    let sum = tier.priceFrom * qty;
    for (const addon of category.addons) {
      if (!addonIds.includes(addon.id)) continue;
      if (isIncluded(addon.includedIn)) continue;
      sum += addon.perUnit ? addon.priceFrom * qty : addon.priceFrom;
    }
    return sum;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, tier, qty, addonIds]);

  // Cena po uplatnění slevového kódu
  const discountedTotal = promo
    ? Math.round(total * (1 - promo.discountPercent / 100))
    : total;

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

  const selectedAddons = category
    ? category.addons.filter((a) => addonIds.includes(a.id))
    : [];

  // Pořadí kroků pro zvolenou kategorii
  const stepsOrder: Step[] = category?.quantities
    ? ['category', 'tier', 'quantity', 'addons', 'summary']
    : ['category', 'tier', 'addons', 'summary'];
  const stepIndex = stepsOrder.indexOf(step);

  const goBack = () => {
    if (stepIndex > 0) setStep(stepsOrder[stepIndex - 1]);
  };

  const reset = () => {
    setStep('category');
    setCategory(null);
    setTier(null);
    setQuantity(null);
    setAddonIds([]);
    setNote('');
    setPromoInput('');
    setPromo(null);
    setPromoError(false);
    setWantConsult(true);
  };

  const toggleAddon = (id: string) => {
    setAddonIds((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  // Souhrn pro předvyplnění kontaktního formuláře
  const buildPrefillMessage = (): string => {
    if (!category || !tier) return '';
    const lines: string[] = [
      'Dobrý den,',
      '',
      'prošel jsem si vaši cenovou kalkulačku a mám zájem o:',
      '',
      `• Styl videa: ${category.name}`,
      `• Varianta: ${tier.name} (od ${formatPrice(tier.priceFrom)} Kč${tier.priceSuffix ? ` ${tier.priceSuffix}` : ''})`,
    ];
    if (quantity) lines.push(`• Počet: ${quantity.label}`);
    if (selectedAddons.length > 0) {
      lines.push(
        `• Doplňky: ${selectedAddons
          .map((a) =>
            isIncluded(a.includedIn) ? `${a.name} (v ceně)` : a.name
          )
          .join(', ')}`
      );
    }
    if (note.trim()) {
      lines.push(`• Poznámka: ${note.trim()}`);
    }
    if (promo) {
      lines.push(`• Slevový kód: ${promo.code} (−${promo.discountPercent} %)`);
    }
    if (wantConsult) {
      lines.push('• Mám zájem o konzultaci zdarma');
    }
    lines.push(
      '',
      `Orientační cena z kalkulačky: od ${formatPrice(discountedTotal)} Kč`
    );
    if (wantConsult) {
      lines.push('', 'Prosím o nezávaznou konzultaci zdarma.');
    }
    return lines.join('\n');
  };

  const goToContact = () => {
    navigate('/kontakt', { state: { prefill: buildPrefillMessage() } });
  };

  const stepLabels: Record<Step, string> = {
    category: 'Styl videa',
    tier: 'Varianta',
    quantity: 'Počet',
    addons: 'Doplňky',
    summary: 'Souhrn',
  };

  // Řádek živého přehledu
  const OverviewRow = ({ label, value }: { label: string; value: string | null }) => (
    <div className="flex justify-between gap-3 text-sm py-2 border-b border-white/10 last:border-0">
      <span className="text-gray-500">{label}</span>
      <span className={`text-right ${value ? 'text-white font-medium' : 'text-gray-600'}`}>
        {value ?? '—'}
      </span>
    </div>
  );

  // Obsah živého přehledu (sdílený pro desktop panel i mobilní lištu)
  const liveTotalLabel = tier ? `od ${formatPrice(discountedTotal)} Kč` : '—';

  return (
    <>
      <SEO
        title="Ceník"
        description="Orientační ceník videotvorby AsperroStudio. Naklikejte si svůj projekt a získejte cenu během minuty. Finální nabídka na konzultaci zdarma."
      />
      <div className="min-h-screen bg-dark text-white pt-28 pb-24 lg:pb-20">
        <AnimatedBackground />

        <Container className="relative z-10">
          {/* Hlavička */}
          <motion.div
            className="text-center max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PageBadge icon={<CalculatorIcon className="w-4 h-4" />} label="Ceník" />
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Kolik bude stát{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                vaše video?
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Naklikejte si projekt a za minutu znáte orientační cenu.
              Finální nabídku upřesníme na konzultaci — ta je vždy zdarma.
            </p>
          </motion.div>

          {/* Průvodce kroky – čistý stepper bez rámečků */}
          <div className="flex items-center justify-center mb-12 select-none">
            {stepsOrder.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5 px-2 sm:px-3">
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                      i < stepIndex
                        ? 'bg-white/15 text-white'
                        : i === stepIndex
                          ? 'bg-gradient-to-br from-cyan-400 to-pink-500 text-white shadow-lg shadow-pink-500/25'
                          : 'bg-white/5 text-gray-600'
                    }`}
                  >
                    {i < stepIndex ? <CheckIcon className="w-4 h-4" /> : i + 1}
                  </span>
                  <span
                    className={`text-[11px] sm:text-xs whitespace-nowrap ${
                      i === stepIndex ? 'text-white font-semibold' : 'text-gray-500'
                    }`}
                  >
                    {stepLabels[s]}
                  </span>
                </div>
                {i < stepsOrder.length - 1 && (
                  <span
                    className={`h-px w-4 sm:w-8 mb-5 ${
                      i < stepIndex ? 'bg-white/40' : 'bg-white/10'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Layout: kroky + živý přehled */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr),290px] gap-8 items-start">
            {/* ===== LEVÝ SLOUPEC: KROKY ===== */}
            <div>
              <AnimatePresence mode="wait">
                {/* ====== KROK 1: STYL VIDEA ====== */}
                {step === 'category' && (
                  <motion.div
                    key="category"
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    {PRICING_CATEGORIES.map((cat) => {
                      const Icon = CATEGORY_ICONS[cat.id] ?? DevicePhoneMobileIcon;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => {
                            setCategory(cat);
                            setTier(null);
                            setQuantity(null);
                            setAddonIds([]);
                            setStep('tier');
                          }}
                          className="group text-left p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300"
                        >
                          <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-pink-500/20">
                            <Icon className="w-6 h-6" />
                          </div>
                          <h2 className="text-lg font-bold font-display mb-1.5">{cat.name}</h2>
                          <p className="text-gray-400 text-sm mb-3">{cat.desc}</p>
                          <span className="inline-flex items-center gap-1.5 text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            Vybrat
                            <ArrowRightIcon className="w-4 h-4" />
                          </span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}

                {/* ====== KROK 2: VARIANTA ====== */}
                {step === 'tier' && category && (
                  <motion.div
                    key="tier"
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-bold font-display mb-5 text-center lg:text-left">
                      {category.tierTitle}
                    </h2>
                    <div className="space-y-3">
                      {category.tiers.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            setTier(t);
                            setStep(category.quantities ? 'quantity' : 'addons');
                          }}
                          className="group w-full text-left p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300 flex items-center justify-between gap-4"
                        >
                          <div>
                            <h3 className="font-bold font-display mb-1">{t.name}</h3>
                            <p className="text-gray-400 text-sm">{t.desc}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <span className="block text-lg font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent whitespace-nowrap">
                              od {formatPrice(t.priceFrom)} Kč
                            </span>
                            {t.priceSuffix && (
                              <span className="text-gray-500 text-xs">{t.priceSuffix}</span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ====== KROK 3: POČET (jen krátké formáty) ====== */}
                {step === 'quantity' && category?.quantities && (
                  <motion.div
                    key="quantity"
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-bold font-display mb-5 text-center lg:text-left">
                      Kolik videí potřebujete?
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                      {category.quantities.map((q) => (
                        <button
                          key={q.count}
                          type="button"
                          onClick={() => {
                            setQuantity(q);
                            setStep('addons');
                          }}
                          className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-white/10 transition-all duration-300 text-center"
                        >
                          <span className="block font-bold font-display">{q.label}</span>
                          {q.note && (
                            <span className="block text-gray-500 text-xs mt-1">{q.note}</span>
                          )}
                          {tier && (
                            <span className="block mt-2 text-sm bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent font-semibold">
                              od {formatPrice(tier.priceFrom * q.count)} Kč
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ====== KROK 4: DOPLŇKY ====== */}
                {step === 'addons' && category && tier && (
                  <motion.div
                    key="addons"
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-bold font-display mb-1 text-center lg:text-left">
                      Volitelné doplňky
                    </h2>
                    <p className="text-gray-500 text-sm text-center lg:text-left mb-5">
                      Vyberte, co se hodí — nebo pokračujte bez doplňků.
                    </p>
                    <div className="space-y-3">
                      {category.addons.map((addon) => {
                        const selected = addonIds.includes(addon.id);
                        const included = isIncluded(addon.includedIn);
                        return (
                          <button
                            key={addon.id}
                            type="button"
                            onClick={() => !included && toggleAddon(addon.id)}
                            disabled={included}
                            className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
                              included
                                ? 'bg-white/5 border-white/10 opacity-60 cursor-default'
                                : selected
                                  ? 'bg-white/10 border-cyan-400/60'
                                  : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                            }`}
                          >
                            <span
                              className={`w-6 h-6 shrink-0 rounded-md border flex items-center justify-center transition-colors ${
                                selected || included
                                  ? 'bg-gradient-to-br from-cyan-400 to-pink-500 border-transparent'
                                  : 'border-white/30'
                              }`}
                            >
                              {(selected || included) && (
                                <CheckIcon className="w-4 h-4 text-white" />
                              )}
                            </span>
                            <span className="flex-1 min-w-0">
                              <span className="block font-semibold">{addon.name}</span>
                              {addon.desc && (
                                <span className="block text-gray-400 text-sm">{addon.desc}</span>
                              )}
                            </span>
                            <span className="shrink-0 text-sm font-semibold whitespace-nowrap text-right">
                              {included ? (
                                <span className="text-green-400">v ceně ✓</span>
                              ) : (
                                <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                                  od +{formatPrice(addon.priceFrom)} Kč
                                  {addon.perUnit && (
                                    <span className="block text-gray-500 text-xs font-normal">/ video</span>
                                  )}
                                </span>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="text-center lg:text-left mt-7">
                      <button
                        type="button"
                        onClick={() => setStep('summary')}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-cyan-400 to-pink-500 hover:shadow-xl hover:shadow-pink-500/30 hover:brightness-110 active:scale-[0.98] transition-all"
                      >
                        Zobrazit souhrn
                        <ArrowRightIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ====== KROK 5: SOUHRN ====== */}
                {step === 'summary' && category && tier && (
                  <motion.div
                    key="summary"
                    variants={stepVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.3 }}
                    className="rounded-3xl bg-white/5 border border-white/10 p-7 md:p-10"
                  >
                    <h2 className="text-2xl font-bold font-display mb-6 text-center">
                      Souhrn vašeho projektu
                    </h2>

                    <ul className="space-y-3 mb-7">
                      <li className="flex justify-between gap-4 pb-3 border-b border-white/10">
                        <span className="text-gray-400">Styl videa</span>
                        <span className="font-semibold text-right">{category.name}</span>
                      </li>
                      <li className="flex justify-between gap-4 pb-3 border-b border-white/10">
                        <span className="text-gray-400">Varianta</span>
                        <span className="font-semibold text-right">
                          {tier.name}
                          <span className="block text-sm text-gray-400 font-normal">
                            od {formatPrice(tier.priceFrom)} Kč{tier.priceSuffix ? ` ${tier.priceSuffix}` : ''}
                          </span>
                        </span>
                      </li>
                      {quantity && (
                        <li className="flex justify-between gap-4 pb-3 border-b border-white/10">
                          <span className="text-gray-400">Počet</span>
                          <span className="font-semibold">{quantity.label}</span>
                        </li>
                      )}
                      {selectedAddons.map((addon) => (
                        <li
                          key={addon.id}
                          className="flex justify-between gap-4 pb-3 border-b border-white/10"
                        >
                          <span className="text-gray-400">{addon.name}</span>
                          <span className="font-semibold whitespace-nowrap">
                            {isIncluded(addon.includedIn)
                              ? 'v ceně'
                              : `od +${formatPrice(
                                  addon.perUnit ? addon.priceFrom * qty : addon.priceFrom
                                )} Kč`}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Poznámka */}
                    <div className="mb-7">
                      <label
                        htmlFor="cenik-note"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Poznámka (nepovinné)
                      </label>
                      <textarea
                        id="cenik-note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={3}
                        maxLength={500}
                        placeholder="Např. termín, představa o stylu, odkaz na inspiraci…"
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors resize-none"
                      />
                    </div>

                    {/* Slevový kód */}
                    <div className="mb-7">
                      <label
                        htmlFor="cenik-promo"
                        className="block text-sm font-medium text-gray-300 mb-2"
                      >
                        Slevový kód (nepovinné)
                      </label>
                      {promo ? (
                        <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-white/5 border border-green-400/40">
                          <span className="text-sm">
                            <span className="font-semibold text-green-400">
                              {promo.code}
                            </span>{' '}
                            <span className="text-gray-300">
                              — sleva {promo.discountPercent} %
                              {promo.label ? ` (${promo.label})` : ''}
                            </span>
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setPromo(null);
                              setPromoInput('');
                            }}
                            className="text-gray-400 hover:text-white text-sm underline transition-colors"
                          >
                            Odebrat
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex gap-2">
                            <input
                              id="cenik-promo"
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
                              maxLength={30}
                              placeholder="Např. kód z akce nebo voucher"
                              className="flex-1 min-w-0 bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
                            />
                            <button
                              type="button"
                              onClick={applyPromo}
                              disabled={promoInput.trim().length === 0}
                              className="shrink-0 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-400 to-pink-500 hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
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

                    {/* Konzultace zdarma */}
                    <button
                      type="button"
                      onClick={() => setWantConsult((v) => !v)}
                      className={`w-full text-left mb-7 p-4 rounded-2xl border transition-all duration-300 flex items-center gap-4 ${
                        wantConsult
                          ? 'bg-white/10 border-cyan-400/60'
                          : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 shrink-0 rounded-md border flex items-center justify-center transition-colors ${
                          wantConsult
                            ? 'bg-gradient-to-br from-cyan-400 to-pink-500 border-transparent'
                            : 'border-white/30'
                        }`}
                      >
                        {wantConsult && <CheckIcon className="w-4 h-4 text-white" />}
                      </span>
                      <span className="flex-1">
                        <span className="block font-semibold">
                          Mám zájem o konzultaci zdarma
                        </span>
                        <span className="block text-gray-400 text-sm">
                          Nezávazně probereme projekt, možnosti i finální cenu.
                          Neplatíte nic.
                        </span>
                      </span>
                    </button>

                    <div className="text-center mb-2">
                      <p className="text-gray-400 text-sm mb-1">Orientační cena</p>
                      {promo && (
                        <p className="text-gray-500 line-through text-lg">
                          od {formatPrice(total)} Kč
                        </p>
                      )}
                      <p className="text-4xl md:text-5xl font-bold font-display bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                        od {formatPrice(discountedTotal)} Kč
                      </p>
                      {promo && (
                        <p className="text-green-400 text-sm mt-1">
                          Uplatněna sleva {promo.discountPercent} % (kód {promo.code})
                        </p>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm text-center mb-8">
                      Finální cenu upřesníme podle vašich představ na nezávazné
                      konzultaci — ta je vždy zdarma.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={goToContact}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg text-white bg-gradient-to-r from-cyan-400 to-pink-500 hover:shadow-xl hover:shadow-pink-500/30 hover:brightness-110 active:scale-[0.98] transition-all"
                      >
                        Nezávazně poptat
                        <ArrowRightIcon className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={reset}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold border-2 border-white/20 text-white hover:border-white/50 active:scale-[0.98] transition-all"
                      >
                        <ArrowPathIcon className="w-5 h-5" />
                        Začít znovu
                      </button>
                    </div>
                    <p className="text-gray-500 text-xs text-center mt-4">
                      Do zprávy vám rovnou předvyplníme vše, co jste si naklikali.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Zpět – výrazné tlačítko */}
              {stepIndex > 0 && step !== 'summary' && (
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 border-white/25 text-white hover:border-cyan-400 hover:text-cyan-400 active:scale-[0.98] transition-all"
                  >
                    <ArrowLeftIcon className="w-5 h-5" />
                    Zpět
                  </button>
                </div>
              )}
              {step === 'summary' && (
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={goBack}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border-2 border-white/25 text-white hover:border-cyan-400 hover:text-cyan-400 active:scale-[0.98] transition-all"
                  >
                    <ArrowLeftIcon className="w-5 h-5" />
                    Zpět na doplňky
                  </button>
                </div>
              )}
            </div>

            {/* ===== PRAVÝ SLOUPEC: ŽIVÝ PŘEHLED (desktop) ===== */}
            <aside className="hidden lg:block sticky top-28 rounded-2xl bg-white/5 border border-white/10 p-6">
              <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-3">
                Váš projekt
              </h3>
              <OverviewRow label="Styl videa" value={category?.name ?? null} />
              <OverviewRow label="Varianta" value={tier?.name ?? null} />
              {category?.quantities && (
                <OverviewRow label="Počet" value={quantity?.label ?? null} />
              )}
              <OverviewRow
                label="Doplňky"
                value={
                  selectedAddons.length > 0
                    ? selectedAddons.map((a) => a.name).join(', ')
                    : category && tier
                      ? 'žádné'
                      : null
                }
              />
              <div className="mt-5 pt-4 border-t border-white/15 text-center">
                <p className="text-gray-500 text-xs mb-1">Aktuální cena</p>
                <p className="text-2xl font-bold font-display bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                  {liveTotalLabel}
                </p>
                <p className="text-gray-600 text-[11px] mt-2">
                  Orientačně — finální nabídka na konzultaci zdarma.
                </p>
              </div>
            </aside>
          </div>
        </Container>

        {/* ===== MOBILNÍ LIŠTA S CENOU (viditelná po výběru stylu) ===== */}
        {category && (
          <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-white/10 bg-dark-100/95 backdrop-blur-xl px-4 py-3">
            <div className="flex items-center justify-between gap-3 max-w-xl mx-auto">
              <div className="min-w-0">
                <p className="text-[11px] text-gray-500 truncate">
                  {category.name}
                  {tier ? ` · ${tier.name}` : ''}
                  {quantity ? ` · ${quantity.label}` : ''}
                  {selectedAddons.length > 0 ? ` · ${selectedAddons.length}× doplněk` : ''}
                </p>
                <p className="text-lg font-bold font-display bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
                  {liveTotalLabel}
                </p>
              </div>
              {step !== 'summary' && tier && (
                <button
                  type="button"
                  onClick={() => setStep('summary')}
                  className="shrink-0 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-cyan-400 to-pink-500 hover:brightness-110 transition-all"
                >
                  Souhrn
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
