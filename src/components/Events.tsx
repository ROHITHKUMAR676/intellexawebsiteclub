import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { events } from "../data/content";

export default function Events() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-72%"]);

  return (
    <section id="events" className="relative">
      <div className="px-5 pt-20 sm:px-10 sm:pt-40">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono-tight text-xs uppercase text-[var(--color-electric)]">Events &amp; programs</span>
            <h2 className="mt-4 max-w-xl font-[var(--font-display)] text-3xl font-semibold tracking-tight sm:text-5xl">
              Things we run <span className="text-gradient">all year round</span>
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Desktop: scroll-driven horizontal track. Mobile: native horizontal swipe. */}
      <div ref={sectionRef} className="relative hidden h-[320vh] md:block">
        <div className="sticky top-0 flex h-screen items-start overflow-hidden pt-40">
          <motion.div style={{ x }} className="flex gap-6 pl-10">
            {events.map((ev) => (
              <EventCard key={ev.title} ev={ev} />
            ))}
            <div className="w-[10vw] shrink-0" />
          </motion.div>
        </div>
      </div>
      <div className="hidden pb-28 sm:pb-40 md:block" />

      <div className="no-scrollbar flex gap-4 overflow-x-auto px-5 py-16 md:hidden">
        {events.map((ev) => (
          <div key={ev.title} className="shrink-0">
            <EventCard ev={ev} />
          </div>
        ))}
      </div>
    </section>
  );
}

function EventCard({ ev }: { ev: (typeof events)[number] }) {
  return (
    <motion.div
      data-cursor="card"
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="glass glow-border h-[390px] w-[86vw] shrink-0 rounded-2xl sm:h-[420px] sm:w-[420px] sm:rounded-3xl"
    >
      <div className="flex h-full flex-col justify-between overflow-hidden rounded-2xl p-5 sm:rounded-3xl sm:p-8">
        <div>
          <div className="flex items-center justify-between">
            <span className="font-mono-tight text-[11px] uppercase text-[var(--color-cyan)]">{ev.tag}</span>
            <span className="font-mono-tight text-[11px] uppercase text-[var(--color-mist-dim)]">{ev.date}</span>
          </div>
          <div className="mt-6 flex h-28 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-electric)]/15 via-transparent to-[var(--color-violet)]/15 sm:mt-8 sm:h-32">
            <svg viewBox="0 0 64 64" className="h-14 w-14 opacity-70">
              <circle cx="32" cy="32" r="22" fill="none" stroke="var(--color-electric)" strokeWidth="1.2" />
              <circle cx="32" cy="32" r="12" fill="none" stroke="var(--color-violet)" strokeWidth="1.2" />
              <circle cx="32" cy="32" r="3" fill="var(--color-cyan)" />
            </svg>
          </div>
        </div>
        <div>
          <h3 className="font-[var(--font-display)] text-xl font-medium sm:text-2xl">{ev.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-mist)]">{ev.description}</p>
        </div>
      </div>
    </motion.div>
  );
}
