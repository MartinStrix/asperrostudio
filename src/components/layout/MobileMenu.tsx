import { motion } from 'framer-motion';
import { NAV_LINKS } from '../../utils/constants';

interface MobileMenuProps {
  onClose: () => void;
}

export const MobileMenu = ({ onClose }: MobileMenuProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-40 bg-dark/95 backdrop-blur-lg lg:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="flex flex-col items-center justify-center h-full">
        <motion.ul
          className="flex flex-col items-center gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 },
            },
          }}
        >
          {NAV_LINKS.map((link) => (
            <motion.li
              key={link.href}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <a
                href={link.href}
                className="text-2xl font-semibold text-white hover:text-cyan-400 transition-colors"
                onClick={onClose}
              >
                {link.label}
              </a>
            </motion.li>
          ))}
          <motion.li
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            <a
              href="#contact"
              className="mt-4 inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-cyan-400 to-pink-500 text-white font-semibold rounded-lg"
              onClick={onClose}
            >
              Kontaktujte nás
            </a>
          </motion.li>
        </motion.ul>
      </nav>
    </motion.div>
  );
};
