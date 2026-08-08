import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import intellexaLogo from "../assets/Intellexa-Logo.png";
import { navItems, socialLinks } from "../data/content";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
      <path d="M6.94 8.98H3.8V20h3.14V8.98ZM7.2 5.57A1.82 1.82 0 1 0 3.56 5.56 1.82 1.82 0 0 0 7.2 5.57ZM20.45 20v-6.16c0-3.03-1.62-4.44-3.78-4.44a3.25 3.25 0 0 0-2.95 1.62h-.04V8.98h-3V20h3.13v-5.45c0-1.44.27-2.83 2.05-2.83 1.76 0 1.78 1.64 1.78 2.92V20h2.81Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.9">
      <rect x="4" y="4" width="16" height="16" rx="4.2" />
      <circle cx="12" cy="12" r="3.7" />
      <path d="M17.35 6.85h.01" strokeLinecap="round" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
      <path d="M21.58 7.19a2.7 2.7 0 0 0-1.9-1.91C18 4.84 12 4.84 12 4.84s-6 0-7.68.44a2.7 2.7 0 0 0-1.9 1.91A28.2 28.2 0 0 0 2 12.01a28.2 28.2 0 0 0 .42 4.8 2.7 2.7 0 0 0 1.9 1.91c1.68.44 7.68.44 7.68.44s6 0 7.68-.44a2.7 2.7 0 0 0 1.9-1.91 28.2 28.2 0 0 0 .42-4.8 28.2 28.2 0 0 0-.42-4.82ZM10 15.08V8.94l5.23 3.07L10 15.08Z" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((n) => document.querySelector(n.href))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  function handleClick(e: React.MouseEvent, href: string) {
    e.preventDefault();
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.15 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6"
    >
      <nav
        className={`glass flex w-full max-w-5xl items-center justify-between rounded-2xl px-4 transition-all duration-500 sm:px-6 ${
          scrolled ? "py-2.5" : "py-3.5"
        }`}
      >
        <a
          href="#home"
          data-cursor="link"
          onClick={(e) => handleClick(e, "#home")}
          className="visible-focus flex h-16 w-52 items-center justify-center overflow-hidden"
          aria-label="Intellexa home"
        >
          <img
            src={intellexaLogo}
            alt="Intellexa"
            className="h-16 w-52 object-cover object-[50%_49%]"
          />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                data-cursor="link"
                onClick={(e) => handleClick(e, item.href)}
                className={`visible-focus relative rounded-full px-3.5 py-2 text-sm transition-colors ${
                  active === item.href ? "text-[var(--color-ink)]" : "text-[var(--color-mist)] hover:text-[var(--color-ink)]"
                }`}
              >
                {active === item.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white/8"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={socialLinks.linkedin}
            data-cursor="link"
            aria-label="Intellexa LinkedIn"
            target="_blank"
            rel="noreferrer"
            className="visible-focus flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-ink)] text-[var(--color-void)] transition-transform hover:scale-105"
          >
            <LinkedInIcon />
          </a>
          <a
            href={socialLinks.instagram}
            data-cursor="link"
            aria-label="Intellexa Instagram"
            target="_blank"
            rel="noreferrer"
            className="visible-focus flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[var(--color-ink)] transition-transform hover:scale-105 hover:border-[var(--color-cyan)]"
          >
            <InstagramIcon />
          </a>
          <a
            href={socialLinks.youtube}
            data-cursor="link"
            aria-label="Intellexa YouTube"
            target="_blank"
            rel="noreferrer"
            className="visible-focus flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-[var(--color-ink)] transition-transform hover:scale-105 hover:border-[var(--color-cyan)]"
          >
            <YouTubeIcon />
          </a>
        </div>

        <button
          className="visible-focus flex h-9 w-9 items-center justify-center rounded-full md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <div className="flex flex-col gap-1.5">
            <span
              className={`h-px w-5 bg-[var(--color-ink)] transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-5 bg-[var(--color-ink)] transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </div>
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="glass absolute left-4 right-4 top-[72px] rounded-2xl p-3 md:hidden"
        >
          <ul className="flex flex-col">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`block rounded-xl px-4 py-3 text-sm ${
                    active === item.href ? "bg-white/8 text-[var(--color-ink)]" : "text-[var(--color-mist)]"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
