import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { aboutCards, aboutStats } from "../data/content";
import { useCounter } from "../hooks/useCounter";

const icons: Record<string, React.ReactNode> = {
  spark: (
    <path d="M12 2v6M12 16v6M4.9 4.9l4.2 4.2M14.9 14.9l4.2 4.2M2 12h6M16 12h6M4.9 19.1l4.2-4.2M14.9 9.1l4.2-4.2" />
  ),
  orbit: <><circle cx="12" cy="12" r="3" /><ellipse cx="12" cy="12" rx="9" ry="4" /></>,
  signal: <><path d="M4 20h16" /><path d="M8 20V12" /><path d="M14 20V6" /><path d="M20 20V9" /></>,
};

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCounter(value, inView);
  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span className="font-[var(--font-display)] text-3xl font-semibold sm:text-4xl">
        {count.toLocaleString()}
        {suffix}
      </span>
      <span className="font-mono-tight text-[11px] uppercase text-[var(--color-mist-dim)]">{label}</span>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative px-5 py-20 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="font-mono-tight text-xs uppercase text-[var(--color-electric)]">About the club</span>
          <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight sm:text-5xl">
            A year built around <span className="text-gradient">learning by doing</span>.
          </h2>
          <p className="mt-5 text-[var(--color-mist)]">
            Intellexa REC's 2025-2026 report captures a calendar of practical sessions, showcases, and competitions
            shaped around curiosity, peer learning, and real-world problem solving.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-4 sm:mt-16 sm:grid-cols-3 sm:gap-5">
          {aboutCards.map((card, i) => (
            <motion.div
              key={card.title}
              data-cursor="card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
              style={{ transformPerspective: 800 }}
              className="glass glow-border group flex flex-col gap-4 rounded-2xl p-5 sm:p-7"
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                className="orbit-ring flex h-11 w-11 items-center justify-center"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-cyan)" strokeWidth="1.5" className="h-5 w-5">
                  {icons[card.icon]}
                </svg>
              </motion.div>
              <h3 className="font-[var(--font-display)] text-lg font-medium">{card.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-mist)]">{card.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
          className="glass mt-6 grid grid-cols-2 gap-6 rounded-2xl px-5 py-7 sm:mt-8 sm:grid-cols-4 sm:gap-8 sm:px-8 sm:py-10"
        >
          {aboutStats.map((s) => (
            <StatCounter key={s.label} value={s.value} suffix={s.suffix} label={s.label} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
