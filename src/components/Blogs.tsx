import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { blogs } from "../data/content";

type Blog = (typeof blogs)[number];

function BlogCard({ blog, index, onOpen }: { blog: Blog; index: number; onOpen: (blog: Blog) => void }) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(blog)}
      data-cursor="card"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 4) * 0.07 }}
      whileHover={{ y: -6 }}
      className="visible-focus glass glow-border flex h-full flex-col justify-between rounded-2xl p-7 text-left"
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="font-mono-tight text-[11px] uppercase text-[var(--color-cyan)]">{blog.category}</span>
          <span className="font-mono-tight text-[11px] uppercase text-[var(--color-mist-dim)]">{blog.date}</span>
        </div>
        <h3 className="mt-5 font-[var(--font-display)] text-xl font-medium leading-snug text-[var(--color-ink)]">
          {blog.title}
        </h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[var(--color-mist)]">{blog.excerpt}</p>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <span className="font-mono-tight text-[11px] uppercase text-[var(--color-mist-dim)]">{blog.readTime}</span>
        <span className="flex items-center gap-1.5 font-mono-tight text-[11px] uppercase text-[var(--color-electric)]">
          Read
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
            <path d="M3 8h9M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </motion.button>
  );
}

function BlogModal({ blog, onClose }: { blog: Blog; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[900] flex items-start justify-center overflow-y-auto px-4 py-10 sm:py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.article
        role="dialog"
        aria-modal="true"
        className="glass relative z-10 w-full max-w-2xl rounded-3xl p-8 sm:p-10"
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          onClick={onClose}
          data-cursor="button"
          aria-label="Close"
          className="visible-focus absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-[var(--color-mist)] transition-colors hover:text-[var(--color-ink)]"
        >
          <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
        </button>

        <div className="flex items-center gap-4 pr-10">
          <span className="font-mono-tight text-[11px] uppercase text-[var(--color-cyan)]">{blog.category}</span>
          <span className="font-mono-tight text-[11px] uppercase text-[var(--color-mist-dim)]">{blog.date}</span>
          <span className="font-mono-tight text-[11px] uppercase text-[var(--color-mist-dim)]">{blog.readTime}</span>
        </div>

        <h2 className="mt-4 font-[var(--font-display)] text-2xl font-semibold leading-tight text-[var(--color-ink)] sm:text-3xl">
          {blog.title}
        </h2>

        <div className="mt-6 space-y-4">
          {blog.content.map((paragraph, index) => (
            <p key={index} className="text-[15px] leading-relaxed text-[var(--color-mist)]">
              {paragraph}
            </p>
          ))}
        </div>
      </motion.article>
    </motion.div>
  );
}

export default function Blogs() {
  const [active, setActive] = useState<Blog | null>(null);

  return (
    <section id="blogs" className="relative px-6 py-28 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="font-mono-tight text-xs uppercase text-[var(--color-electric)]">From the report</span>
          <h2 className="mt-4 font-[var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
            Event notes <span className="text-gradient">and highlights</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--color-mist)]">
            Recaps adapted from the Intellexa REC 2025-2026 magazine and annual report.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {blogs.map((blog, index) => (
            <BlogCard key={blog.slug} blog={blog} index={index} onOpen={setActive} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <BlogModal blog={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
