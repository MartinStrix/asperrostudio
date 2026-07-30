import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

// ============================================================
//  ASPERRO ASISTENT – plovoucí AI chat v pravém dolním rohu
//  Backend: /api/chat (vyžaduje ANTHROPIC_API_KEY na Vercelu)
// ============================================================

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: 'assistant',
  content:
    'Ahoj! 👋 Jsem AI asistent AsperroStudia. Zeptejte se mě na cokoliv ohledně videotvorby, našich služeb nebo konzultace zdarma.',
};

const SUGGESTIONS = [
  'Jaké služby nabízíte?',
  'Jak probíhá spolupráce?',
  'Co obnáší konzultace zdarma?',
];

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Automatický scroll na poslední zprávu
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Fokus na input po otevření
  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    setError(null);
    setInput('');

    const nextMessages: Message[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Uvítací zprávu neposíláme – bot ji zná ze svého nastavení
        body: JSON.stringify({
          messages: nextMessages.filter((m) => m !== WELCOME_MESSAGE).slice(-20),
        }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok || !data.reply) {
        setError(data.error ?? 'Něco se pokazilo. Zkuste to prosím znovu.');
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply! }]);
      }
    } catch {
      setError('Nepodařilo se spojit s asistentem. Zkuste to prosím znovu.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void sendMessage(input);
  };

  return (
    <>
      {/* Plovoucí tlačítko */}
      <motion.button
        type="button"
        aria-label={isOpen ? 'Zavřít chat' : 'Otevřít chat s AI asistentem'}
        onClick={() => setIsOpen((open) => !open)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-pink-500 text-white shadow-lg shadow-pink-500/30 flex items-center justify-center hover:brightness-110 active:scale-95 transition-all"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 260, damping: 18 }}
      >
        {isOpen ? (
          <XMarkIcon className="w-7 h-7" />
        ) : (
          <ChatBubbleLeftRightIcon className="w-7 h-7" />
        )}
      </motion.button>

      {/* Okno chatu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-5 left-5 sm:left-auto z-50 sm:w-96 max-h-[70vh] flex flex-col rounded-3xl bg-dark-100/95 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/50 overflow-hidden"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-label="Chat s AI asistentem AsperroStudio"
          >
            {/* Hlavička */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-pink-500 flex items-center justify-center shrink-0">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <p className="font-bold font-display leading-tight">Asperro asistent</p>
                <p className="text-xs text-gray-400">AI · odpovídá hned</p>
              </div>
            </div>

            {/* Zprávy */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words ${
                      message.role === 'user'
                        ? 'rounded-2xl rounded-br-md bg-gradient-to-br from-cyan-500 to-pink-500 text-white'
                        : 'rounded-2xl rounded-bl-md bg-white/10 text-gray-100'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}

              {/* Návrhy otázek na začátku */}
              {messages.length === 1 && !isLoading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => void sendMessage(suggestion)}
                      className="px-3 py-1.5 text-xs rounded-full border border-white/20 text-gray-300 hover:border-cyan-400 hover:text-cyan-400 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {/* Indikátor psaní */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-bl-md bg-white/10 px-4 py-3 flex items-center gap-1.5">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="w-1.5 h-1.5 rounded-full bg-gray-300"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: dot * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Chyba */}
              {error && (
                <div className="text-center">
                  <p className="text-sm text-pink-400">{error}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Nebo nám napište přes{' '}
                    <Link
                      to="/kontakt"
                      onClick={() => setIsOpen(false)}
                      className="underline hover:text-white"
                    >
                      kontaktní formulář
                    </Link>
                    .
                  </p>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Vstupní pole */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-4 py-3 border-t border-white/10 bg-white/5"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Napište zprávu…"
                maxLength={1000}
                className="flex-1 min-w-0 bg-white/10 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
              />
              <button
                type="submit"
                disabled={isLoading || input.trim().length === 0}
                aria-label="Odeslat zprávu"
                className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-cyan-400 to-pink-500 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 active:scale-95 transition-all"
              >
                <PaperAirplaneIcon className="w-5 h-5" />
              </button>
            </form>

            {/* Poznámka */}
            <p className="text-center text-[10px] text-gray-500 pb-2 px-4">
              AI asistent se může mýlit. Závazné informace získáte na nezávazné
              konzultaci zdarma.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
