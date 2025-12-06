import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { Container } from '../common/Container';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { CONTACT_INFO, SOCIAL_LINKS } from '../../utils/constants';

export const Contact = () => {
  const { ref, controls } = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    // For now, just log the data
    console.log('Form submitted:', formData);
    alert('Děkujeme za zprávu! Brzy se vám ozveme.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="section-padding relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-50 to-transparent" />

      <Container className="relative z-10">
        <SectionHeading
          title="Kontakt"
          subtitle="Máte projekt na mysli? Rádi si s vámi popovídáme o vašich představách."
        />

        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={controls}
          className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto"
        >
          {/* Contact Form */}
          <motion.div variants={fadeInUp}>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Jméno *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                  placeholder="Vaše jméno"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                  placeholder="vas@email.cz"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                  placeholder="+420 XXX XXX XXX"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Zpráva *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none"
                  placeholder="Popište váš projekt nebo dotaz..."
                />
              </div>

              <Button className="w-full">Odeslat zprávu</Button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInUp} className="lg:pl-8">
            <div className="space-y-8">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <EnvelopeIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Email</h4>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <PhoneIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Telefon</h4>
                  <a
                    href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold text-white mb-4">Sledujte nás</h4>
                <div className="flex gap-4">
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-pink-500 hover:text-white hover:border-transparent transition-all"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a
                    href={SOCIAL_LINKS.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-pink-500 hover:text-white hover:border-transparent transition-all"
                    aria-label="YouTube"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a
                    href={SOCIAL_LINKS.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-gradient-to-r hover:from-cyan-400 hover:to-pink-500 hover:text-white hover:border-transparent transition-all"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Additional info */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h4 className="font-semibold text-white mb-2">Rychlá odpověď</h4>
                <p className="text-gray-400 text-sm">
                  Na všechny zprávy odpovídáme do 24 hodin. Pro urgentní záležitosti
                  nás prosím kontaktujte telefonicky.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
};
