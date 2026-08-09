import { motion } from "framer-motion";
import intellexaLogo from "../assets/intellexa_logo_white.svg";

export default function Footer() {
  return (
    <footer className="relative px-6 pb-10 pt-6 sm:px-10">
      <div className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-[var(--color-electric)]/40 to-transparent" />
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center"
        >
          <img src={intellexaLogo} alt="Intellexa" className="h-10 w-auto" />
        </motion.div>

        <div className="flex gap-6 font-mono-tight text-[11px] uppercase text-[var(--color-mist-dim)]">
          <a href="#home" data-cursor="link" className="visible-focus hover:text-[var(--color-ink)]">Home</a>
          <a href="#events" data-cursor="link" className="visible-focus hover:text-[var(--color-ink)]">Events</a>
          <a href="#members" data-cursor="link" className="visible-focus hover:text-[var(--color-ink)]">Members</a>
          <a href="#contact" data-cursor="link" className="visible-focus hover:text-[var(--color-ink)]">Contact</a>
        </div>
      </div>
      <p className="text-center font-mono-tight text-[10px] uppercase text-[var(--color-mist-dim)]">
        © {new Date().getFullYear()} INTELLEXA · Rajalakshmi Engineering College · Create · Innovate · Impact
      </p>
    </footer>
  );
}