import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import intellexaLogo from "../assets/intellexa_logo_white_blue.svg";

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

          <div className="relative z-20 flex flex-col items-center text-center">
            <motion.img
              src={intellexaLogo}
              alt="Intellexa"
              className="w-[min(78vw,560px)] object-contain drop-shadow-[0_0_36px_rgba(255,255,255,0.18)]"
              initial={{ opacity: 0, y: 18, scale: 0.94 }}
              animate={{
                opacity: revealed ? 1 : 0,
                y: revealed ? 0 : 18,
                scale: revealed ? 1 : 0.94,
              }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            />

            
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
