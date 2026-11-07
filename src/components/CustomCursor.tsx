import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "link" | "button" | "card";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot) dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }

    function loop() {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      if (ring) {
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(loop);
    }

    function onOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (target.closest("[data-cursor='button']")) setState("button");
      else if (target.closest("[data-cursor='link']")) setState("link");
      else if (target.closest("[data-cursor='card']")) setState("card");
      else setState("default");
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    const raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  const ringSize = state === "button" ? 64 : state === "link" ? 52 : state === "card" ? 90 : 36;
  const ringColor =
    state === "button" ? "var(--color-electric)" : state === "card" ? "var(--color-violet)" : "var(--color-cyan)";

  return (
    <div className="custom-cursor pointer-events-none fixed inset-0 z-[999]" aria-hidden="true">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-[var(--color-ink)]"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 rounded-full transition-[width,height,border-color,background-color] duration-300 ease-out"
        style={{
          width: ringSize,
          height: ringSize,
          border: `1px solid ${ringColor}`,
          background:
            state === "button" ? "color-mix(in srgb, var(--color-electric) 14%, transparent)" : "transparent",
          willChange: "transform",
        }}
      />
    </div>
  );
}
