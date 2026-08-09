import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="glass glow-border flex h-[300px] w-[78vw] shrink-0 flex-col justify-between rounded-3xl p-7 sm:w-[360px]"
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);

  return (
    <section id="achievements" className="relative">
      <div className="px-6 pt-28 sm:px-10 sm:pt-40">
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
        </div>
      </div>

      {/* Desktop: scroll-driven horizontal track. Mobile: native horizontal swipe. */}
      <div ref={sectionRef} className="relative hidden h-[320vh] md:block">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-5 pl-10">
            {achievements.map((a) => (
              <AchievementCard key={a.title} a={a} />
            ))}
            <div className="w-[10vw] shrink-0" />
          </motion.div>
        </div>
      </div>
      <div className="hidden pb-28 sm:pb-40 md:block" />

      <div className="no-scrollbar flex gap-5 overflow-x-auto px-6 py-28 md:hidden">
        {achievements.map((a) => (
          <div key={a.title} className="shrink-0">
            <AchievementCard a={a} />
          </div>
        ))}
      </div>
    </section>
  );
}