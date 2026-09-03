import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BeakerIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { Container } from '../components/common/Container';
import { AnimatedBackground } from '../components/common/AnimatedBackground';
import { SEO } from '../components/common/SEO';
import { PageBadge } from '../components/common/PageBadge';

// ============================================================
//  ASPERROLABS – experimentální dílna studia
//  Záměrně "polotajná" stránka: vede na ni jen drobný odkaz
//  v patičce. Obsah experimentů uprav podle reality.
// ============================================================

const experiments = [
  {
    code: 'LAB-01',
    title: 'AI asistovaný předstřih',
    desc: 'Učíme stroje třídit hrubý materiál — vybrat použitelné záběry dřív, než se editor vůbec posadí. Finální střih zůstává v lidských rukou.',
    status: 'Testujeme interně',
  },
  {
    code: 'LAB-02',
    title: 'Automatické titulky s korekturou',
    desc: 'Přepis mluveného slova s ruční korekturou a časováním na střihové akcenty. Rychlost automatu, kvalita člověka.',
    status: 'Nasazeno na vybraných projektech',
  },
  {
    code: 'LAB-03',
    title: 'Interaktivní web experimenty',
    desc: '3D scény řízené scrollem, node grafy a další věci, které vidíte na našem webu. Co se osvědčí tady, umíme postavit i pro vás.',
    status: 'Živě na tomto webu',
  },
  {
    code: 'LAB-04',
    title: 'Nové formáty obsahu',
    desc: 'Zkoušíme, co na sítích poletí příští rok — dřív, než to bude dělat každý. Výsledky si nechávame pro naše klienty.',
    status: 'V tichém vývoji',
  },
];

export const AsperroLabsPage = () => {
  return (
    <>
      <SEO
        title="AsperroLabs"
        description="Experimentální dílna AsperroStudia — místo, kde zkoušíme nové technologie, AI workflow a formáty, než je pustíme do klientské práce."
      />
      <div className="min-h-screen bg-dark text-white pt-28 pb-20">
        <AnimatedBackground />

        <Container className="relative z-10">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <PageBadge icon={<BeakerIcon className="w-4 h-4" />} label="AsperroLabs" />
            <h1 className="text-4xl md:text-5xl font-bold font-display mb-4">
              Naše{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                laboratoř
              </span>
            </h1>
            <p className="text-gray-400 text-lg">
              Místo, kde zkoušíme věci, které ještě nejsou v ceníku. Nové
              technologie, AI workflow a formáty testujeme tady — a do
              klientské práce pouštíme jen to, co obstojí.
            </p>
            <p className="text-gray-600 text-sm mt-3 font-mono uppercase tracking-widest">
              Našli jste nás? Gratulujeme — tahle stránka se nikde neinzeruje.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto mt-12 space-y-4">
            {experiments.map((exp, index) => (
              <motion.div
                key={exp.code}
                className="p-5 md:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-white/[0.07] transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.08, 0.25) }}
              >
                <div className="flex items-baseline justify-between gap-3 mb-1.5">
                  <span className="font-mono text-xs text-cyan-400 tracking-widest">
                    {exp.code}
                  </span>
                  <span className="font-mono text-[11px] text-gray-500 uppercase tracking-wider text-right">
                    {exp.status}
                  </span>
                </div>
                <h2 className="text-lg font-bold font-display mb-1.5">{exp.title}</h2>
                <p className="text-gray-400 text-sm">{exp.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-14"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-400 mb-5">
              Láká vás postavit něco, co ještě nikdo nemá?
            </p>
            <Link
              to="/kontakt"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-400 to-pink-500 hover:shadow-lg hover:shadow-pink-500/25 hover:brightness-110 active:scale-[0.98] transition-all"
            >
              Napište nám
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </motion.div>
        </Container>
      </div>
    </>
  );
};
