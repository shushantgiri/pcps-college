"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getInitials } from "@/lib/utils";
import type { Alumni } from "@/types";

// ─── Avatar ────────────────────────────────────────────────────────────────
function Avatar({
  src, name, size = 56, ring = false,
}: { src?: string | null; name: string; size?: number; ring?: boolean }) {
  const [failed, setFailed] = useState(false);
  const initials = getInitials(name);

  if (src && !failed) {
    return (
      <div
        className={`relative shrink-0 rounded-full overflow-hidden
                    ${ring ? "ring-[2.5px] ring-[#e63946]" : ""}`}
        style={{ width: size, height: size }}
      >
        <Image
          src={src} alt={name} fill
          className="object-cover"
          sizes={`${size}px`}
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div
      className={`shrink-0 rounded-full flex items-center justify-center font-extrabold
                  bg-[#1a1a2e] text-white ${ring ? "ring-[2.5px] ring-[#e63946]" : ""}`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.3) }}
    >
      {initials}
    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────
export default function TestimonialsSection({ alumni }: { alumni: Alumni[] }) {
  const [idx, setIdx] = useState(0);

  const prev = useCallback(() => setIdx((i) => (i - 1 + alumni.length) % alumni.length), [alumni.length]);
  const next = useCallback(() => setIdx((i) => (i + 1) % alumni.length), [alumni.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((i) => (i + 1) % alumni.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [alumni.length]);

  const person = alumni[idx];
  if (!person) return null;

  const VISIBLE = 4;
  const getVisibleIndices = () => {
    const half = Math.floor(VISIBLE / 2);
    let start = idx - half;
    start = Math.max(0, Math.min(start, alumni.length - VISIBLE));
    return Array.from({ length: Math.min(VISIBLE, alumni.length) }, (_, k) => start + k);
  };
  const visibleIndices = getVisibleIndices();

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-gray-100">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-16">

        {/* ── Section header ── */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-7 h-[1.5px] bg-[#e63946] rounded-full" />
            <span className="text-[10.5px] font-bold uppercase tracking-[.18em] text-[#e63946]">
              Success Stories
            </span>
            <span className="w-7 h-[1.5px] bg-[#e63946] rounded-full" />
          </div>
          <h2 className="text-[1.7rem] sm:text-[2.1rem] font-extrabold text-[#1a1a2e]
                         leading-tight tracking-tight">
            What our students say
          </h2>
        </div>

        {/* ── Main panel ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]
                        rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-100">

          {/* LEFT — dark spotlight */}
          <div className="relative bg-[#1a1a2e] px-6 py-8 sm:px-10 sm:py-8 md:px-14 md:py-10
                          flex flex-col justify-between overflow-hidden min-h-[320px]">
            {/* Decorative rings */}
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full
                            border border-white/[.05] pointer-events-none" />
            <div className="absolute -bottom-20 -left-10 w-44 h-44 rounded-full
                            border border-white/[.04] pointer-events-none" />

            {/* Quote */}
            <div>
              <div className="text-[48px] sm:text-[64px] leading-[.75] font-black
                              text-[#e63946] opacity-70 font-serif select-none mb-3 sm:mb-4">
                &ldquo;
              </div>
              <p className="text-[0.95rem] sm:text-[1.05rem] text-white/85 leading-[1.8] italic">
                {person.testimonial}
              </p>
            </div>

            {/* Person */}
            <div className="mt-6 sm:mt-7">
              <div className="flex items-center gap-3 sm:gap-4 mb-5 sm:mb-6">
                <Avatar src={person.image} name={person.name} size={48} ring />
                <div>
                  <p className="text-[14px] sm:text-[15px] font-bold text-white leading-snug">
                    {person.name}
                  </p>
                  <p className="text-[11px] sm:text-[11.5px] text-white/45 mt-1 leading-relaxed">
                    {person.currentRole} · {person.currentCompany}
                  </p>
                  {person.batch && (
                    <span className="inline-block mt-1.5 sm:mt-2 text-[9.5px] font-bold uppercase
                                     tracking-widest text-[#e63946]
                                     bg-[#e63946]/[.12] px-2.5 py-0.5 rounded-full">
                      Batch of {person.batch}
                    </span>
                  )}
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/15
                             flex items-center justify-center
                             text-white/70 hover:bg-white/10 hover:border-white/30 hover:text-white
                             transition-all duration-150"
                >
                  <ChevronLeft size={15} />
                </button>

                <div className="flex-1 flex items-center justify-center gap-1.5 flex-wrap">
                  {alumni.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIdx(i)}
                      aria-label={`Go to testimonial ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-200
                        ${i === idx
                          ? "w-5 bg-[#e63946]"
                          : "w-1.5 bg-white/20 hover:bg-white/40"
                        }`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-white/15
                             flex items-center justify-center
                             text-white/70 hover:bg-white/10 hover:border-white/30 hover:text-white
                             transition-all duration-150"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT — thumbnail list (hidden on mobile, shown lg+) */}
          <div className="hidden lg:flex bg-[#f8f8f8] flex-col">
            {/* Header */}
            <div className="px-5 xl:px-6 py-4 border-b border-gray-100">
              <p className="text-[10px] font-bold uppercase tracking-[.14em] text-gray-400 mb-0.5">
                All alumni voices
              </p>
              <p className="text-[13px] font-bold text-[#1a1a2e]">800+ success stories</p>
            </div>

            {/* Thumbnails */}
            <div className="flex-1 flex flex-col">
              {visibleIndices.map((i) => {
                const a = alumni[i];
                return (
                  <button
                    key={a.id}
                    onClick={() => setIdx(i)}
                    className={`
                      flex items-center gap-3 px-4 xl:px-5 py-3 text-left w-full
                      border-l-[3px] transition-all duration-150
                      ${i === idx
                        ? "bg-white border-l-[#e63946]"
                        : "bg-transparent border-l-transparent hover:bg-white/60"
                      }
                      border-b border-gray-100/80
                    `}
                  >
                    <Avatar src={a.image} name={a.name} size={36} />
                    <div className="flex-1 min-w-0">
                      <p className={`text-[12px] xl:text-[12.5px] font-bold truncate leading-snug
                                     ${i === idx ? "text-[#1a1a2e]" : "text-gray-600"}`}>
                        {a.name}
                      </p>
                      <p className="text-[10.5px] xl:text-[11px] text-gray-400 truncate mt-0.5">
                        {a.currentRole} · {a.currentCompany}
                      </p>
                      <p className="text-[10.5px] xl:text-[11px] text-gray-300 truncate italic mt-0.5">
                        {a.testimonial.substring(0, 52)}…
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-3 border-t border-gray-100">
              {[
                { num: "96.2%", label: "Placement" },
                { num: "800+",  label: "Alumni"    },
                { num: "10+",   label: "Years"     },
              ].map(({ num, label }, i) => (
                <div
                  key={label}
                  className={`flex flex-col items-center py-3 xl:py-4
                               ${i < 2 ? "border-r border-gray-100" : ""}`}
                >
                  <span className="text-[15px] xl:text-[17px] font-extrabold text-[#1a1a2e]">
                    {num}
                  </span>
                  <span className="text-[9px] xl:text-[9.5px] font-bold uppercase tracking-widest
                                   text-gray-400 mt-0.5">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* MOBILE ONLY — compact stats bar below quote panel */}
          <div className="grid grid-cols-3 bg-[#f8f8f8] border-t border-gray-100 lg:hidden">
            {[
              { num: "96.2%", label: "Placement" },
              { num: "800+",  label: "Alumni"    },
              { num: "10+",   label: "Years"     },
            ].map(({ num, label }, i) => (
              <div
                key={label}
                className={`flex flex-col items-center py-3
                             ${i < 2 ? "border-r border-gray-100" : ""}`}
              >
                <span className="text-[15px] font-extrabold text-[#1a1a2e]">{num}</span>
                <span className="text-[9px] font-bold uppercase tracking-widest
                                 text-gray-400 mt-0.5">
                  {label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}