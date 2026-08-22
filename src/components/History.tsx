import { motion } from "framer-motion";
import JournalSection, { type JournalEvent } from "./JournalSection";
import { historyMilestones } from "../data/content";

/**
 * Maps your existing `historyMilestones` data onto the shape JournalSection
 * expects. Nothing here rewrites your content — it's a pure reshape.
 *
 * NOTE: if a milestone doesn't have an `images` array, that entry will
 * render with no photos on the journal's left page (safe fallback) rather
 * than throwing. Add real image URLs to your milestone data — or tell me
 * the actual field name/shape and I'll adjust this mapper — to get photos
 * showing for each entry.
 */
function toJournalEvents(
  milestones: typeof historyMilestones
): JournalEvent[] {
  return milestones.map((m, i) => {
    const maybeImages = (m as { images?: unknown }).images;
    const images = Array.isArray(maybeImages)
      ? (maybeImages as string[])
      : [];

    return {
      id: m.year ?? i,
      title: m.title,
      date: String(m.year),
      description: m.description,
      images,
    };
  });
}

export default function History() {
  const events = toJournalEvents(historyMilestones);

  return (
    <section id="history" className="relative">
      <div className="px-5 pt-20 sm:px-10 sm:pt-40">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center sm:mb-20"
          >
            <span className="font-mono-tight text-xs uppercase text-[var(--color-electric)]">
              2025-2026 report
            </span>
            <h2 className="mt-4 font-[var(--font-display)] text-3xl font-semibold tracking-tight sm:text-5xl">
              A year of{" "}
              <span className="text-gradient">programs and competitions</span>
            </h2>
          </motion.div>
        </div>
      </div>

      <JournalSection events={events} />
    </section>
  );
}