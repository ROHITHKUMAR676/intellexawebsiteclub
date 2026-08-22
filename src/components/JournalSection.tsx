import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * JournalSection.tsx
 * -------------------
 * Single-file version of the scroll-pinned, page-turning "club journal"
 * section: types, component, sample data, and styles all in one place.
 *
 * Usage:
 *   import JournalSection from "./JournalSection";
 *   <JournalSection events={myRealEvents} />
 *
 * If no `events` prop is passed, the component falls back to the sample
 * data in DEFAULT_EVENTS below — replace that array with your project's
 * real, existing event data. The component never alters or invents
 * content, it only renders what it's given.
 */

/* ============================================================ */
/* Types                                                         */
/* ============================================================ */

export interface JournalEvent {
  id: string | number;
  title: string;
  date: string;
  location?: string;
  description: string;
  /** Optional additional existing info, shown below a divider. */
  extra?: string;
  /** Optional handwritten-style caption for the photo group; falls back to title. */
  photoCaption?: string;
  /** ~3 used per event. */
  images: string[];
}

export interface JournalSectionProps {
  events?: JournalEvent[];
}

/* ============================================================ */
/* Sample / placeholder data — replace with your real event data */
/* ============================================================ */

export const DEFAULT_EVENTS: JournalEvent[] = [
  {
    id: "founding-night",
    title: "The Founding Night",
    date: "September 1998",
    location: "Old Chemistry Hall, Room 4",
    description:
      "Eleven members met in a borrowed lecture hall with a single overhead projector and a box of index cards. By the end of the evening, the club had a name, a treasury of forty dollars, and a mission scrawled across the chalkboard.",
    extra:
      "The original chalkboard photograph could not be recovered, but the minutes from that night are preserved in the archive box under M.",
    photoCaption: "Room 4, first meeting",
    images: [
      "https://picsum.photos/seed/journal-founding-1/700/900",
      "https://picsum.photos/seed/journal-founding-2/800/650",
      "https://picsum.photos/seed/journal-founding-3/650/850",
    ],
  },
  {
    id: "river-expedition",
    title: "The River Expedition",
    date: "June 2004",
    location: "Cedar Bend",
    description:
      "What began as a weekend hike turned into the club's first overnight expedition. Fourteen members, three canoes, and one memorable thunderstorm later, the tradition of the annual spring trip was born.",
    extra:
      "This trip is credited with doubling club membership the following autumn.",
    photoCaption: "Cedar Bend, spring trip",
    images: [
      "https://picsum.photos/seed/journal-river-1/750/950",
      "https://picsum.photos/seed/journal-river-2/820/620",
      "https://picsum.photos/seed/journal-river-3/700/900",
    ],
  },
  {
    id: "centennial-hall",
    title: "Centennial Hall Exhibition",
    date: "November 2011",
    location: "Centennial Hall, Main Campus",
    description:
      "For the club's first public exhibition, members transformed the hall's east wing into a working darkroom and print gallery, open to the whole university for one week.",
    extra:
      "Over 900 visitors signed the guestbook, still kept in the club office.",
    photoCaption: "Opening week, east wing",
    images: [
      "https://picsum.photos/seed/journal-hall-1/780/980",
      "https://picsum.photos/seed/journal-hall-2/700/700",
      "https://picsum.photos/seed/journal-hall-3/820/600",
    ],
  },
  {
    id: "night-market",
    title: "The Night Market Project",
    date: "August 2016",
    location: "Old Town Quarter",
    description:
      "A six-week documentary project following vendors through the last summer of the old night market before redevelopment. The resulting prints now hang in the club room.",
    photoCaption: "Old Town, closing week",
    images: [
      "https://picsum.photos/seed/journal-market-1/700/900",
      "https://picsum.photos/seed/journal-market-2/850/650",
      "https://picsum.photos/seed/journal-market-3/700/920",
    ],
  },
  {
    id: "anniversary",
    title: "Twenty-Five Years",
    date: "September 2023",
    location: "Old Chemistry Hall, Room 4",
    description:
      "A quarter century after the founding night, members old and new returned to the same room to mark the anniversary — chalkboard included, this time photographed properly.",
    extra: "This entry closes the first volume of the club journal.",
    photoCaption: "Room 4, twenty-five years on",
    images: [
      "https://picsum.photos/seed/journal-anniv-1/760/960",
      "https://picsum.photos/seed/journal-anniv-2/800/640",
      "https://picsum.photos/seed/journal-anniv-3/700/900",
    ],
  },
];

/* ============================================================ */
/* Styles                                                         */
/* ============================================================ */
/*
   Recolored/refonted to match the site's Tailwind theme tokens
   (defined in your global @theme block) instead of hardcoded values,
   so this stays in sync if the palette ever changes.

     Surround / void          : var(--color-void)
     Paper (graphite)         : var(--color-graphite) / -2 / -3
     Ink (primary text)       : var(--color-ink)
     Ink, muted               : var(--color-mist) / var(--color-mist-dim)
     Accent — electric blue   : var(--color-electric)
     Accent — violet          : var(--color-violet)
     Accent — cyan            : var(--color-cyan)

   Type:
     Display : var(--font-display)  ("Space Grotesk", titles)
     Body    : var(--font-body)     ("Inter", descriptions/meta)
     Label   : var(--font-mono)     ("JetBrains Mono", chapter/meta labels)

   These are read live from the page's :root — no font-loading or
   @theme changes needed here, this file just references the tokens.
*/
const JOURNAL_STYLES = `
.cjs-root {
  position: relative;
  width: 100%;
  background: var(--color-void);
}

.cjs-stage {
  position: relative;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background:
    radial-gradient(120% 90% at 50% 8%, color-mix(in srgb, var(--color-electric) 10%, transparent), transparent 60%),
    var(--color-void);
}

.cjs-stage::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  box-shadow: inset 0 0 18vw rgba(0, 0, 0, 0.7);
}

.cjs-journal {
  position: relative;
  width: min(86vw, 1180px);
  height: min(78vh, 720px);
  display: flex;
  perspective: 2600px;
  -webkit-perspective: 2600px;
}

.cjs-journal-shadow {
  position: absolute;
  left: 6%;
  right: 6%;
  bottom: -3.5%;
  height: 10%;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.7), transparent 72%);
  filter: blur(6px);
  z-index: 0;
}

.cjs-paper-texture {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-color: var(--color-graphite-2);
  background-image:
    linear-gradient(90deg, rgba(0, 0, 0, 0.3) 0%, transparent 4%, transparent 96%, rgba(0, 0, 0, 0.35) 100%),
    linear-gradient(180deg, rgba(0, 0, 0, 0.22) 0%, transparent 5%, transparent 95%, rgba(0, 0, 0, 0.22) 100%),
    linear-gradient(90deg, transparent 0, transparent calc(100% - 1px), rgba(154, 160, 172, 0.05) 100%),
    repeating-linear-gradient(0deg, transparent, transparent 27px, rgba(154, 160, 172, 0.035) 28px),
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.9  0 0 0 0 0.92  0 0 0 0 0.97  0 0 0 0.035 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-blend-mode: normal, normal, normal, normal, screen;
  box-shadow: inset 0 0 3vw rgba(0, 0, 0, 0.35);
}

.cjs-left-page {
  position: relative;
  flex: 1 1 50%;
  border-radius: 3px 0 0 3px;
  overflow: hidden;
  box-shadow:
    -6px 8px 24px rgba(0, 0, 0, 0.55),
    inset -14px 0 22px -18px rgba(0, 0, 0, 0.6),
    inset 1px 0 0 rgba(154, 160, 172, 0.06);
}

.cjs-photo-board {
  position: absolute;
  inset: 0;
}

.cjs-photo-group {
  position: absolute;
  inset: 0;
  padding: 7% 8%;
}

.cjs-photo {
  position: absolute;
  margin: 0;
  padding: 10px 10px 34px;
  background: var(--color-graphite-3);
  box-shadow:
    0 10px 22px rgba(0, 0, 0, 0.55),
    0 2px 4px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(154, 160, 172, 0.06);
  border: 1px solid rgba(154, 160, 172, 0.08);
}

.cjs-photo img {
  display: block;
  width: 100%;
  height: 100%;
  max-width: 15vw;
  max-height: 22vh;
  object-fit: cover;
  filter: saturate(0.82) contrast(1.08) brightness(0.94);
}

.cjs-photo-0 {
  top: 6%;
  left: 4%;
  transform: rotate(-6deg);
  z-index: 3;
}
.cjs-photo-1 {
  top: 34%;
  left: 32%;
  transform: rotate(4deg);
  z-index: 2;
}
.cjs-photo-2 {
  top: 52%;
  left: 6%;
  transform: rotate(8deg);
  z-index: 4;
}

.cjs-tape {
  position: absolute;
  top: -14px;
  left: 50%;
  width: 64px;
  height: 26px;
  background: color-mix(in srgb, var(--color-electric) 38%, transparent);
  border: 1px solid color-mix(in srgb, var(--color-electric) 45%, transparent);
  transform: translateX(-50%) rotate(-3deg);
  box-shadow: 0 2px 6px rgba(74, 124, 255, 0.15);
  opacity: 0.85;
  backdrop-filter: blur(1px);
}
.cjs-photo-1 .cjs-tape {
  background: color-mix(in srgb, var(--color-violet) 36%, transparent);
  border-color: color-mix(in srgb, var(--color-violet) 45%, transparent);
  box-shadow: 0 2px 6px rgba(139, 92, 246, 0.15);
  transform: translateX(-50%) rotate(5deg);
}

.cjs-handwritten {
  position: absolute;
  bottom: 6%;
  right: 9%;
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.05rem;
  color: var(--color-cyan);
  transform: rotate(-2deg);
}

.cjs-spine {
  position: relative;
  flex: 0 0 22px;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.6),
    var(--color-void) 25%,
    var(--color-void) 75%,
    rgba(0, 0, 0, 0.6)
  );
  z-index: 50;
}

.cjs-spine::after {
  content: "";
  position: absolute;
  top: 6%;
  bottom: 6%;
  left: 50%;
  width: 1px;
  transform: translateX(-50%);
  background: linear-gradient(
    180deg,
    transparent,
    color-mix(in srgb, var(--color-electric) 55%, transparent) 45%,
    color-mix(in srgb, var(--color-violet) 45%, transparent) 60%,
    transparent
  );
  filter: blur(1px);
  opacity: 0.7;
}

.cjs-right-stack {
  position: relative;
  flex: 1 1 50%;
  transform-style: preserve-3d;
}

.cjs-page {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  transform-origin: left center;
  border-radius: 0 3px 3px 0;
  will-change: transform;
}

.cjs-page-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  overflow: hidden;
  box-shadow:
    6px 8px 24px rgba(0, 0, 0, 0.55),
    inset 14px 0 22px -18px rgba(0, 0, 0, 0.55),
    inset -1px 0 0 rgba(154, 160, 172, 0.06);
}

.cjs-page-front {
  padding: 8% 9%;
  display: flex;
  flex-direction: column;
}

.cjs-page-back {
  transform: rotateY(180deg);
}

.cjs-chapter {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-electric);
  position: relative;
  z-index: 1;
}

.cjs-title {
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: -0.01em;
  font-size: clamp(2rem, 3.4vw, 3rem);
  line-height: 1.05;
  color: var(--color-ink);
  margin: 0.5em 0 0.4em;
  position: relative;
  z-index: 1;
}

.cjs-description {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.65;
  color: var(--color-mist);
  max-width: 46ch;
  position: relative;
  z-index: 1;
}

.cjs-meta-row {
  margin-top: auto;
  padding-top: 1.4rem;
  display: flex;
  gap: 1.4rem;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  color: var(--color-mist-dim);
  position: relative;
  z-index: 1;
}

.cjs-divider {
  margin: 1.1rem 0;
  border: none;
  border-top: 1px solid color-mix(in srgb, var(--color-electric) 35%, transparent);
  box-shadow: 0 1px 4px color-mix(in srgb, var(--color-electric) 20%, transparent);
  width: 40%;
  position: relative;
  z-index: 1;
}

.cjs-extra {
  font-family: var(--font-body);
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--color-mist-dim);
  font-style: italic;
  max-width: 44ch;
  position: relative;
  z-index: 1;
}

.cjs-mobile-photos {
  display: none;
}

@media (max-width: 860px) {
  .cjs-journal {
    width: 92vw;
    height: 84vh;
    perspective: none;
  }

  .cjs-left-page {
    display: none;
  }

  .cjs-spine {
    display: none;
  }

  .cjs-right-stack {
    flex-basis: 100%;
  }

  .cjs-page {
    transform-origin: center;
  }

  .cjs-page-back {
    display: none;
  }

  .cjs-page-front {
    padding: 7% 6% 6%;
    overflow-y: auto;
  }

  .cjs-mobile-photos {
    display: flex;
    gap: 14px;
    overflow-x: auto;
    padding: 4px 4px 22px;
    margin-bottom: 0.6rem;
    position: relative;
    z-index: 1;
    -webkit-overflow-scrolling: touch;
  }

  .cjs-mobile-photos .cjs-photo {
    position: relative;
    inset: auto;
    flex: 0 0 auto;
    width: 42vw;
    max-width: 220px;
  }

  .cjs-mobile-photos img {
    width: 100%;
    height: 32vh;
    max-height: 260px;
    object-fit: cover;
    filter: saturate(0.82) contrast(1.08) brightness(0.94);
  }

  .cjs-m-photo-0 {
    transform: rotate(-4deg);
  }
  .cjs-m-photo-1 {
    transform: rotate(3deg);
    margin-top: 10px;
  }
  .cjs-m-photo-2 {
    transform: rotate(-2deg);
  }

  .cjs-title {
    font-size: clamp(1.7rem, 7vw, 2.3rem);
  }

  .cjs-description,
  .cjs-extra {
    max-width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .cjs-page,
  .cjs-photo-group {
    transition: none !important;
  }
}
`;

/* ============================================================ */
/* Component                                                      */
/* ============================================================ */

export default function JournalSection({
  events = DEFAULT_EVENTS,
}: JournalSectionProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const pageRefs = useRef<(HTMLElement | null)[]>([]);
  const photoGroupRefs = useRef<(HTMLDivElement | null)[]>([]);

  pageRefs.current = [];
  photoGroupRefs.current = [];

  useLayoutEffect(() => {
    const n = events.length;
    if (n === 0) return;

    const ctx = gsap.context(() => {
      const setActivePhotoGroup = (idx: number) => {
        photoGroupRefs.current.forEach((group, gi) => {
          if (!group) return;
          gsap.to(group, {
            autoAlpha: gi === idx ? 1 : 0,
            y: gi === idx ? 0 : 10,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
          });
        });
      };

      ScrollTrigger.matchMedia({
        // ---------- Desktop: true two-page spine flip ----------
        "(min-width: 861px)": function () {
          const pages = pageRefs.current;

          pages.forEach((page, i) => {
            gsap.set(page, { rotateY: 0, zIndex: n - i });
          });
          setActivePhotoGroup(0);

          const tl = gsap.timeline();

          pages.forEach((page, i) => {
            if (i === n - 1) return; // last page has nothing to flip to

            tl.to(
              page,
              {
                rotateY: -172,
                duration: 1,
                ease: "power1.inOut",
                onStart: () => gsap.set(page, { zIndex: n + i }),
                onReverseComplete: () => gsap.set(page, { zIndex: n - i }),
              },
              i
            ).call(() => setActivePhotoGroup(i + 1), [], i + 0.5);

            // reverse: restore previous photo group when scrolling back up
            tl.call(() => setActivePhotoGroup(i), [], i + 0.02);
          });

          const st = ScrollTrigger.create({
            trigger: rootRef.current,
            start: "top top",
            end: () => `+=${(n - 1) * 100}%`,
            pin: stageRef.current,
            anticipatePin: 1,
            scrub: 0.65,
            animation: tl,
          });

          return () => st.kill();
        },

        // ---------- Mobile / narrow: single page, scroll-scrubbed stack ----------
        "(max-width: 860px)": function () {
          const pages = pageRefs.current;

          pages.forEach((page, i) => {
            gsap.set(page, {
              rotateY: 0,
              zIndex: n - i,
              autoAlpha: i === 0 ? 1 : 0,
              y: i === 0 ? 0 : 24,
            });
          });
          setActivePhotoGroup(0);

          const tl = gsap.timeline();

          pages.forEach((page, i) => {
            if (i === n - 1) return;
            const next = pages[i + 1];

            tl.to(
              page,
              {
                autoAlpha: 0,
                y: -24,
                duration: 0.6,
                ease: "power1.inOut",
              },
              i
            )
              .to(
                next,
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.6,
                  ease: "power1.inOut",
                },
                i + 0.15
              )
              .call(() => setActivePhotoGroup(i + 1), [], i + 0.5)
              .call(() => setActivePhotoGroup(i), [], i + 0.05);
          });

          const st = ScrollTrigger.create({
            trigger: rootRef.current,
            start: "top top",
            end: () => `+=${(n - 1) * 100}%`,
            pin: stageRef.current,
            anticipatePin: 1,
            scrub: 0.65,
            animation: tl,
          });

          return () => st.kill();
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [events]);

  return (
    <section
      className="cjs-root"
      ref={rootRef}
      style={{ height: `${Math.max(events.length, 1) * 100}vh` }}
      aria-label="Club history journal"
    >
      <style>{JOURNAL_STYLES}</style>

      <div className="cjs-stage" ref={stageRef}>
        <div className="cjs-journal">
          <div className="cjs-journal-shadow" aria-hidden="true" />

          <div className="cjs-left-page">
            <div className="cjs-paper-texture" aria-hidden="true" />
            <div className="cjs-photo-board">
              {events.map((ev, i) => (
                <div
                  className="cjs-photo-group"
                  key={ev.id ?? i}
                  ref={(el) => {
                    photoGroupRefs.current[i] = el;
                  }}
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  {ev.images?.slice(0, 3).map((src, pi) => (
                    <figure className={`cjs-photo cjs-photo-${pi}`} key={pi}>
                      <span className="cjs-tape" aria-hidden="true" />
                      <img src={src} alt="" loading="lazy" />
                    </figure>
                  ))}
                  <span className="cjs-handwritten">
                    {ev.photoCaption ?? ev.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="cjs-spine" aria-hidden="true" />

          <div className="cjs-right-stack">
            {events.map((ev, i) => (
              <article
                className="cjs-page"
                key={ev.id ?? i}
                ref={(el) => {
                  pageRefs.current[i] = el;
                }}
              >
                <div className="cjs-page-face cjs-page-front">
                  <div className="cjs-paper-texture" aria-hidden="true" />
                  <span className="cjs-chapter">
                    Entry {String(i + 1).padStart(2, "0")} /{" "}
                    {String(events.length).padStart(2, "0")}
                  </span>

                  {/* Mobile-only: photos stack above the text since the
                      two-page spread collapses to a single page (hidden
                      on desktop via CSS, where the left page handles photos). */}
                  <div className="cjs-mobile-photos">
                    {ev.images?.slice(0, 3).map((src, pi) => (
                      <figure
                        className={`cjs-photo cjs-m-photo-${pi}`}
                        key={pi}
                      >
                        <span className="cjs-tape" aria-hidden="true" />
                        <img src={src} alt="" loading="lazy" />
                      </figure>
                    ))}
                  </div>

                  <h2 className="cjs-title">{ev.title}</h2>
                  <p className="cjs-description">{ev.description}</p>
                  <div className="cjs-meta-row">
                    <span>{ev.date}</span>
                    {ev.location && <span>{ev.location}</span>}
                  </div>
                  {ev.extra && (
                    <>
                      <hr className="cjs-divider" />
                      <p className="cjs-extra">{ev.extra}</p>
                    </>
                  )}
                </div>
                <div className="cjs-page-face cjs-page-back" aria-hidden="true">
                  <div className="cjs-paper-texture" aria-hidden="true" />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}