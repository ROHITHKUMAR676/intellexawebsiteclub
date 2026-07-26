import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TAGLINE = ["Create", "Innovate", "Impact"];

export default function IntroSequence({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      finish();
      return;
    }

    const timers = [
      window.setTimeout(() => setRevealed(true), 150),
      window.setTimeout(() => finish(), 2600),
    ];

    return () => timers.forEach((timer) => window.clearTimeout(timer));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish() {
    setVisible(false);
    window.setTimeout(onDone, 550);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        >
          {/* Ambient gradient backdrop */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(74,124,255,0.18),rgba(0,0,0,0)_55%)]" />
            <motion.div
              className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(56,226,255,0.16),rgba(0,0,0,0)_70%)]"
              animate={{ scale: [0.9, 1.08, 0.96], opacity: [0.6, 0.9, 0.7] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:88px_88px] opacity-25" />
          </motion.div>

          <button
            onClick={finish}
            data-cursor="button"
            className="visible-focus absolute z-40 font-mono-tight text-xs uppercase text-white/60 transition-colors hover:text-white"
            style={{ right: 40, top: 34 }}
          >
            Skip intro
          </button>

          <div className="relative z-20 flex flex-col items-center text-center">
            {/* Orbiting ring mark */}
            <motion.div
              className="relative mb-8 flex h-16 w-16 items-center justify-center rounded-full"
              initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
              animate={{
                opacity: revealed ? 1 : 0,
                scale: revealed ? 1 : 0.6,
                rotate: revealed ? 0 : -30,
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="absolute inset-0 rounded-full border border-[var(--color-cyan)]/50"
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              <motion.span
                className="absolute inset-2 rounded-full border border-white/15"
                animate={{ rotate: -360 }}
                transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
              />
              <span className="h-2 w-2 rounded-full bg-[var(--color-cyan)] shadow-[0_0_18px_rgba(56,226,255,0.9)]" />
            </motion.div>

            <motion.div
              className="font-[var(--font-display)] text-[clamp(2.6rem,9vw,6rem)] font-semibold leading-none text-white drop-shadow-[0_0_36px_rgba(255,255,255,0.2)]"
              initial={{ opacity: 0, y: 18, letterSpacing: "0.3em" }}
              animate={{
                opacity: revealed ? 1 : 0,
                y: revealed ? 0 : 18,
                letterSpacing: revealed ? "0.02em" : "0.3em",
              }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              INTELLEXA
            </motion.div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono-tight text-[10px] uppercase text-white/65 sm:text-xs">
              {TAGLINE.map((word, index) => (
                <span key={word} className="flex items-center gap-4">
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 10 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.12 }}
                  >
                    {word}
                  </motion.span>
                  {index < TAGLINE.length - 1 && <span className="h-1 w-1 rounded-full bg-[var(--color-cyan)]" />}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
