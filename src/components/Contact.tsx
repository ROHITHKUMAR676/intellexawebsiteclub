import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sent");
    setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <section id="contact" className="relative px-6 py-28 sm:px-10 sm:py-40">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono-tight text-xs uppercase text-[var(--color-electric)]">Get in touch</span>
          <h2 className="mt-4 font-[var(--font-display)] text-4xl font-semibold tracking-tight sm:text-5xl">
            Have an idea? <span className="text-gradient">Bring it to the lab.</span>
          </h2>
          <p className="mt-5 max-w-md text-[var(--color-mist)]">
            Whether you want to join a domain, propose a session, collaborate on an event, or take part in the
            next program, we read everything that comes through.
          </p>

          <div className="mt-10 flex flex-col gap-5">
            <ContactRow label="Email" value="intellexa@rajalakshmi.edu.in" />
            <ContactRow label="Location" value="Innovation Lab, REC Campus, Chennai" />
            <ContactRow label="Programs" value="Learning sessions, showcases, and technical events" />
          </div>

          <div className="mt-10 flex gap-3">
            {["Instagram", "LinkedIn", "GitHub"].map((s) => (
              <a
                key={s}
                href="#"
                data-cursor="link"
                className="visible-focus rounded-full border border-white/12 px-4 py-2 text-xs text-[var(--color-mist)] transition-colors hover:border-white/30 hover:text-[var(--color-ink)]"
              >
                {s}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="glass relative overflow-hidden rounded-3xl p-8 sm:p-10"
        >
          <AnimatePresence mode="wait">
            {status === "idle" ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-5"
              >
                <Field label="Name" type="text" placeholder="Your name" required />
                <Field label="Email" type="email" placeholder="you@rajalakshmi.edu.in" required />
                <div className="flex flex-col gap-2">
                  <label className="font-mono-tight text-[11px] uppercase text-[var(--color-mist-dim)]">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what you want to learn, build, or organize."
                    className="visible-focus resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-mist-dim)] focus:border-[var(--color-electric)]"
                  />
                </div>
                <button
                  type="submit"
                  data-cursor="button"
                  className="visible-focus mt-2 rounded-full bg-[var(--color-ink)] px-6 py-3.5 text-sm font-medium text-[var(--color-void)] transition-transform hover:scale-[1.02]"
                >
                  Send message
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                  className="mb-5 flex h-16 w-16 items-center justify-center rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(103,232,249,0.2), transparent 70%)" }}
                >
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="var(--color-cyan)" strokeWidth="2">
                    <motion.path
                      d="M5 13l4 4L19 7"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                  </svg>
                </motion.div>
                <h3 className="font-[var(--font-display)] text-xl font-medium">Message sent</h3>
                <p className="mt-2 text-sm text-[var(--color-mist)]">We'll get back to you within a couple of days.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-white/8 pb-4">
      <span className="font-mono-tight text-[10px] uppercase text-[var(--color-mist-dim)]">{label}</span>
      <span className="text-sm text-[var(--color-ink)]">{value}</span>
    </div>
  );
}

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono-tight text-[11px] uppercase text-[var(--color-mist-dim)]">{label}</label>
      <input
        {...props}
        className="visible-focus rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-mist-dim)] focus:border-[var(--color-electric)]"
      />
    </div>
  );
}
