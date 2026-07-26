import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { achievements } from "../data/content";
import { useCounter } from "../hooks/useCounter";

function AchievementCard({ a }: { a: (typeof achievements)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useCounter(a.stat, inView);

  return (
    <motion.div
      ref={ref}
      data-cursor="card"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="glass glow-electric flex h-[300px] w-[78vw] shrink-0 flex-col justify-between rounded-3xl p-7 sm:w-[360px]"
    >
      <span className="font-mono-tight text-[11px] uppercase text-[var(--color-mist-dim)]">{a.title}</span>
      <div>
        <div className="flex items-baseline gap-1">
          <span className="font-[var(--font-display)] text-5xl font-semibold text-gradient">{count}</span>
          <span className="font-[var(--font-display)] text-3xl font-semibold text-gradient">{a.suffix}</span>
        </div>
        <p className="mt-2 font-mono-tight text-[11px] uppercase text-[var(--color-cyan)]">{a.label}</p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-mist)]">{a.description}</p>
      </div>
    </motion.div>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="relative px-6 py-28 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono-tight text-xs uppercase text-[var(--color-electric)]">Track record</span>
          <h2 className="mt-4 max-w-xl font-[var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
            Recognition earned <span className="text-gradient">the slow way</span>
          </h2>
        </motion.div>

        <div className="no-scrollbar mt-14 flex gap-5 overflow-x-auto pb-4">
          {achievements.map((a) => (
            <AchievementCard key={a.title} a={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
