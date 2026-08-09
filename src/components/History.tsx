import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { historyMilestones } from "../data/content";

export default function History() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.4"],
  });
  const lineHeight = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  return (
    <section id="history" className="relative px-6 py-28 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <span className="font-mono-tight text-xs uppercase text-[var(--color-electric)]">2025-2026 report</span>
          <h2 className="mt-4 font-[var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
            A year of <span className="text-gradient">programs and competitions</span>
          </h2>
        </motion.div>

        <div ref={containerRef} className="relative">
          <div className="absolute left-[7px] top-0 h-full w-px bg-white/10 sm:left-1/2 sm:-translate-x-1/2" />
          <motion.div
            className="absolute left-[7px] top-0 w-px bg-gradient-to-b from-[var(--color-cyan)] via-[var(--color-electric)] to-[var(--color-violet)] sm:left-1/2 sm:-translate-x-1/2"
            style={{ scaleY: lineHeight, transformOrigin: "top" }}
          />

          <div className="flex flex-col gap-12 sm:gap-20">
            {historyMilestones.map((m, i) => {
              const left = i % 2 === 0;
              return (
                <div key={m.year} className="relative flex items-center pl-9 sm:pl-0">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-40% 0px -40% 0px" }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 20 }}
                    className="absolute left-[1px] z-10 h-3.5 w-3.5 rounded-full bg-[var(--color-cyan)] shadow-[0_0_16px_4px_rgba(103,232,249,0.5)] sm:left-1/2 sm:-translate-x-1/2"
                  />
                  <motion.div
                    initial={{ opacity: 0, x: left ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
                    className={`glass glow-border w-full rounded-2xl p-6 text-left sm:w-[calc(50%-2rem)] sm:p-7 ${
                      left ? "sm:mr-auto sm:text-right" : "sm:ml-auto"
                    }`}
                  >
                    <span className="font-mono-tight text-sm text-[var(--color-electric)]">{m.year}</span>
                    <h3 className="mt-2 font-[var(--font-display)] text-lg font-medium sm:text-xl">{m.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-mist)]">{m.description}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}