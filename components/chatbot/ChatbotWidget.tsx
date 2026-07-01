'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { getResponse, pickRandom } from './chatbot-engine';
import type { ChatMessage } from '@/lib/types';
import styles from './Chatbot.module.css';

const WELCOME: ChatMessage = {
  id: 'welcome',
  role: 'bot',
  text: "Hey! 👋 I'm the Autonex AI assistant. How can I help you today?",
  timestamp: new Date(),
};

const WELCOME_CHIPS = ['Our Services', 'Book a Call', 'Pricing', 'About Autonex'];

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [chips, setChips] = useState<string[]>(WELCOME_CHIPS);
  const [link, setLink] = useState<{ label: string; href: string } | null>(null);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  function sendMessage(text: string) {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text.trim(),
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setChips([]);
    setLink(null);
    setTyping(true);

    setTimeout(() => {
      const intent = getResponse(text.trim());
      const responseText = pickRandom(intent.responses);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: responseText,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
      setChips(intent.followUp ?? []);
      setLink(intent.link ?? null);
      setTyping(false);
    }, 800 + Math.random() * 400);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <>
      {/* Floating button */}
      <button
        className={styles.toggle}
        onClick={() => setOpen(o => !o)}
        aria-label="Open chat"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close"
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}
            >✕</motion.span>
          ) : (
            <motion.span key="open"
              initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }} transition={{ duration: 0.2 }}
            >🤖</motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.window}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerDot} />
              <div>
                <div className={styles.headerTitle}>Autonex Assistant</div>
                <div className={styles.headerSub}>Online · AI-Powered</div>
              </div>
            </div>

            {/* Messages */}
            <div className={styles.messages}>
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  className={`${styles.message} ${styles[msg.role]}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {msg.text}
                </motion.div>
              ))}
              {typing && (
                <div className={`${styles.message} ${styles.bot} ${styles.typing}`}>
                  <span /><span /><span />
                </div>
              )}
              {/* Link button */}
              {!typing && link && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {link.href.startsWith('http') ? (
                    <a href={link.href} target="_blank" rel="noreferrer" className={styles.linkBtn}>
                      {link.label} →
                    </a>
                  ) : (
                    <Link href={link.href} className={styles.linkBtn} onClick={() => setOpen(false)}>
                      {link.label} →
                    </Link>
                  )}
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick-reply chips */}
            {chips.length > 0 && (
              <div className={styles.chips}>
                {chips.map(chip => (
                  <button
                    key={chip}
                    className={styles.chip}
                    onClick={() => sendMessage(chip)}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className={styles.inputRow}>
              <input
                className={styles.input}
                type="text"
                placeholder="Type a message..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button
                className={styles.send}
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
              >
                ↑
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
