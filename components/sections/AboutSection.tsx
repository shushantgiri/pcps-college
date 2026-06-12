"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import type { CollegeStats } from "@/types";
import { useEffect, useRef } from "react";

export default function AboutSection({ stats }: { stats: CollegeStats }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>("[data-fade]");
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const statItems = [
    { num: `${stats.activeAlumni}+`,      label: "Alumni"         },
    { num: `${stats.activeStudents}+`,    label: "Students"       },
    { num: `${stats.placementRate}%`,     label: "Placement Rate" },
    { num: `${stats.yearsOfExperience}+`, label: "Years Running"  },
  ];

  return (
    <>
      <style>{`
        [data-fade] {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.65s ease, transform 0.65s ease;
        }
        [data-fade].is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        @media (prefers-reduced-motion: reduce) {
          [data-fade] {
            opacity: 1;
            transform: none;
            transition: none;
          }
        }
      `}</style>

      <section className="bg-[#f8f9fb] py-16 sm:py-20 lg:py-28 overflow-hidden">
        <div ref={ref} className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-16">

          {/* ── Header ── */}
          <div
            data-fade
            style={{ transitionDelay: "0ms" }}
            className="flex flex-col items-center text-center gap-3 mb-12 lg:mb-16"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-red-500">
              About PCPS College
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] xl:text-5xl font-black text-[#1a1a2e]
                           leading-[1.08] tracking-tight max-w-2xl">
              Your British Future,<br className="hidden sm:block" />
              <span className="text-[#e63946]"> Built Right Here.</span>
            </h2>
            <p className="text-[14px] sm:text-[15px] text-gray-400 leading-relaxed max-w-lg">
              The only college in Nepal offering on-campus UK undergraduate degrees
              — accredited by the University of Bedfordshire.
            </p>
          </div>

          {/* ── Main grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-5 sm:gap-6 items-stretch">

            {/* ── LEFT: stacked image cards ── */}
            <div className="flex flex-col gap-5 sm:gap-6">

              {/* Big image */}
              <div
                data-fade
                style={{ transitionDelay: "100ms" }}
                className="relative rounded-2xl sm:rounded-3xl overflow-hidden
                           aspect-[16/9] sm:aspect-[16/10]
                           shadow-[0_20px_56px_rgba(0,0,0,0.11)] group"
              >
                <Image
                  src="/images/college.jpg"
                  alt="PCPS College campus"
                  fill
                  className="object-cover group-hover:scale-105
                             transition-transform duration-700 ease-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 55vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t
                                from-[#1a1a2e]/70 via-transparent to-transparent" />

                {/* Est. chip */}
                <div className="absolute top-3 left-3 sm:top-5 sm:left-5
                                bg-white/10 backdrop-blur-md border border-white/20
                                rounded-full px-3 sm:px-4 py-1 sm:py-1.5
                                flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-white text-[10px] sm:text-[11px] font-semibold">
                    Est. 2009 · Lalitpur, Nepal
                  </span>
                </div>

                {/* #1 badge */}
                <div className="absolute top-3 right-3 sm:top-5 sm:right-5
                                bg-[#e63946] text-white rounded-xl
                                px-3 sm:px-4 py-1.5 sm:py-2 text-center shadow-lg">
                  <div className="text-sm sm:text-base font-black leading-none">#1</div>
                  <div className="text-[8px] sm:text-[9px] font-semibold opacity-80 mt-0.5 whitespace-nowrap">
                    UK Degree in Nepal
                  </div>
                </div>

                {/* Bottom location */}
                <div className="absolute bottom-3 left-4 sm:bottom-5 sm:left-6">
                  <p className="text-white font-bold text-xs sm:text-sm">PCPS College</p>
                  <p className="text-white/50 text-[10px] sm:text-xs mt-0.5">Lalitpur, Nepal</p>
                </div>
              </div>

              {/* Stats bar card */}
              <div
                data-fade
                style={{ transitionDelay: "180ms" }}
                className="bg-[#1a1a2e] rounded-2xl sm:rounded-3xl px-4 sm:px-8 py-5 sm:py-7
                           grid grid-cols-4 divide-x divide-white/10"
              >
                {statItems.map(({ num, label }) => (
                  <div key={label} className="flex flex-col items-center text-center px-1 sm:px-4">
                    <span className="text-white text-lg sm:text-xl font-black leading-none">
                      {num}
                    </span>
                    <span className="text-white/40 text-[9px] sm:text-[10.5px] font-medium mt-1.5 sm:mt-2">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT: content ── */}
            <div className="flex flex-col gap-5 sm:gap-6">

              {/* Partner card */}
              <div
                data-fade
                style={{ transitionDelay: "140ms" }}
                className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl
                           px-4 sm:px-6 py-4 sm:py-5
                           flex items-center gap-3 sm:gap-4 shadow-sm"
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#1a1a2e]
                                flex items-center justify-center shrink-0">
                  <span className="text-white text-[10px] font-black">UB</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] sm:text-[13px] font-bold text-gray-800 leading-tight">
                    University of Bedfordshire
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5">
                    Official UK Academic Partner
                  </p>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50
                                 border border-emerald-100 px-2.5 sm:px-3 py-1 sm:py-1.5
                                 rounded-full shrink-0">
                  Accredited
                </span>
              </div>

              {/* About text card */}
              <div
                data-fade
                style={{ transitionDelay: "200ms" }}
                className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl
                           px-4 sm:px-6 py-5 sm:py-6
                           flex flex-col gap-3 sm:gap-4 shadow-sm flex-1"
              >
                <h3 className="text-[1.1rem] sm:text-[1.2rem] font-black text-[#1a1a2e]
                               leading-snug tracking-tight">
                  Nepal's Only On-Campus<br />UK Degree Partnership
                </h3>
                <p className="text-[13px] sm:text-[14px] text-gray-400 leading-relaxed">
                  UK undergraduate programmes in Software Engineering, Business
                  Management, Business Analytics, and Digital Marketing —
                  taught by experienced faculty on our Lalitpur campus.
                </p>

                {/* Key points */}
                <div className="flex flex-col gap-2.5 sm:gap-3 mt-1">
                  {[
                    "Earn a UK degree without leaving Nepal",
                    "Small class sizes with hands-on learning",
                    "Dedicated placement & career support",
                  ].map((point) => (
                    <div key={point} className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-5 h-5 rounded-full bg-red-50 border border-red-100
                                      flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#e63946]" />
                      </div>
                      <span className="text-[12px] sm:text-[13px] text-gray-500">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA card */}
              <div
                data-fade
                style={{ transitionDelay: "260ms" }}
                className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl
                           px-4 sm:px-6 py-4 sm:py-5
                           flex items-center justify-between gap-4 shadow-sm"
              >
                <div>
                  <p className="text-[12px] sm:text-[13px] font-bold text-gray-800">
                    Ready to apply?
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-gray-400 mt-0.5">
                    Admissions open for 2025–26
                  </p>
                </div>
                <Button href="/about">Learn More</Button>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}