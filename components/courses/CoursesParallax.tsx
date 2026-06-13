"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function CoursesParallax() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = bgRef.current;
    if (!el) return;

    let rafId: number;

    function onScroll() {
      rafId = requestAnimationFrame(() => {
        if (!el) return;
        const rect = el.parentElement!.getBoundingClientRect();
        const offset = -rect.top * 0.35;
        el.style.transform = `translateY(${offset}px)`;
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="relative h-[420px] sm:h-[480px] overflow-hidden">

      {/* Parallax image layer — extra height top+bottom so it never shows edges */}
      <div
        ref={bgRef}
        className="absolute inset-x-0 will-change-transform"
        style={{ top: "-80px", bottom: "-80px" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1600&q=80"
          alt="PCPS graduates"
          fill
          className="object-cover object-center"
          unoptimized
          priority
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/90 via-[#0f3460]/75 to-[#1a1a2e]/85" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5 gap-5">
        <p className="text-[10px] font-bold text-red-400 uppercase tracking-[0.18em]">
          University of Bedfordshire · Nepal Campus
        </p>
        <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight max-w-3xl">
          800+ Graduates Working Across{" "}
          <span className="text-red-400">Nepal, UK &amp; Australia</span>
        </h2>
        <p className="text-white/55 text-sm max-w-lg leading-relaxed">
          Every programme is built around real industry outcomes — not just academic
          theory. Our 94% placement rate is the proof.
        </p>
      </div>

    </div>
  );
}