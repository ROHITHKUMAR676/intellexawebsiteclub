import { motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import ParticleField from "../three/ParticleField";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] } },
};

export default function Hero() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      setTilt({
        x: (e.clientX / window.innerWidth - 0.5) * 10,
        y: (e.clientY / window.innerHeight - 0.5) * 10,
      });
    }
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  function scrollTo(href: string) {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 sm:pt-28">
      <ParticleField />

      {/* animated grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 40%, black 40%, transparent 80%)",
        }}
      />

      {/* floating geometric elements */}
      <motion.div
        className="pointer-events-none absolute right-[8%] top-[22%] h-24 w-24 rounded-full border border-[var(--color-electric)]/30 sm:h-40 sm:w-40"
        style={{ transform: `translate(${tilt.x}px, ${tilt.y}px)` }}
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute left-[10%] top-[62%] h-16 w-16 rotate-45 border border-[var(--color-violet)]/30 sm:h-24 sm:w-24"
        style={{ transform: `translate(${tilt.x * -1.4}px, ${tilt.y * -1.4}px)` }}
        animate={{ y: [0, 14, 0], rotate: [45, 60, 45] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-start px-5 sm:px-10"
      >
        <motion.span
          variants={item}
          className="glass mb-5 flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono-tight text-[10px] uppercase text-[var(--color-mist)] sm:mb-6 sm:px-4 sm:text-[11px]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)]" />
          Rajalakshmi Engineering College
        </motion.span>

        <motion.h1
          variants={item}
          className="max-w-4xl font-[var(--font-display)] text-[12.5vw] font-semibold leading-[0.98] tracking-tight sm:text-7xl sm:leading-[0.95] md:text-8xl"
        >
          Innovate.
          <br />
          Impact. <span className="text-gradient">Inspire.</span>
        </motion.h1>

        <motion.p variants={item} className="mt-6 max-w-xl text-base leading-relaxed text-[var(--color-mist)] sm:mt-8 sm:text-lg">
          Intellexa is a Student-driven Technical Community at Rajalakshmi Engineering College, creating spaces to learn emerging technologies, build real-world solutions, compete, and grow together.
        </motion.p>

        <motion.div variants={item} className="mt-8 flex w-full flex-wrap items-center gap-3 sm:mt-10 sm:w-auto sm:gap-4">
          <button
            data-cursor="button"
            onClick={() => scrollTo("#members")}
            className="visible-focus group relative flex-1 overflow-hidden rounded-full bg-[var(--color-ink)] px-5 py-3.5 text-sm font-medium text-[var(--color-void)] transition-transform hover:scale-105 sm:flex-none sm:px-7"
          >
            Meet the team
          </button>
          <button
            data-cursor="link"
            onClick={() => scrollTo("#events")}
            className="visible-focus flex-1 rounded-full border border-white/15 px-5 py-3.5 text-sm font-medium text-[var(--color-ink)] transition-colors hover:border-white/40 sm:flex-none sm:px-7"
          >
            See the events
          </button>
        </motion.div>

        <motion.div variants={item} className="mt-12 flex flex-wrap items-center gap-4 font-mono-tight text-[11px] text-[var(--color-mist-dim)] sm:mt-16 sm:gap-12 sm:text-xs">
          <span>20+ PROGRAMS & SESSIONS</span>
          <span className="h-1 w-1 rounded-full bg-[var(--color-mist-dim)]" />
          <span>5 TITANIUM EVENTS</span>
          <span className="h-1 w-1 rounded-full bg-[var(--color-mist-dim)]" />
          <span>₹95K PRIZE POOL</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-mono-tight text-[10px] uppercase text-[var(--color-mist-dim)]">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-[var(--color-mist-dim)] to-transparent" />
      </motion.div>
    </section>
  );
}
