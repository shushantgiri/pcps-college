"use client";

import Image from "next/image";
import Button from "@/components/ui/Button";
import type { CollegeStats } from "@/types";
import { useEffect, useRef } from "react";
import { Code2, Briefcase, BarChart3, Megaphone } from "lucide-react";

export default function AboutSection({ stats }: { stats: CollegeStats }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>("[data-fade]");
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("ab-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const statItems = [
    { num: `${stats.activeAlumni}+`, label: "Alumni", sub: "15+ countries" },
    { num: `${stats.activeStudents}+`, label: "Students", sub: "current intake" },
    { num: `${stats.placementRate}%`, label: "Placement", sub: "within 6 months" },
    { num: `${stats.yearsOfExperience}+`, label: "Years", sub: "since 2009" },
  ];

  const programmes = [
    { Icon: Code2, label: "B.Sc. Software Engineering" },
    { Icon: Briefcase, label: "B.Sc. Business Management" },
    { Icon: BarChart3, label: "B.Sc. BM with Business Analytics" },
    { Icon: Megaphone, label: "B.Sc. BM with Digital Marketing" },
  ];

  return (
    <>
      <style>{`
        [data-fade] {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.65s cubic-bezier(.22,1,.36,1),
                      transform 0.65s cubic-bezier(.22,1,.36,1);
        }
        [data-fade].ab-visible { opacity: 1; transform: translateY(0); }
        @media (prefers-reduced-motion: reduce) {
          [data-fade] { opacity:1; transform:none; transition:none; }
        }
      `}</style>

      <section className="bg-[#f8f9fb] py-16 sm:py-20 lg:py-24 overflow-hidden">
        <div ref={ref} className="mx-auto max-w-7xl px-5">

          {/* ── Eyebrow ── */}
          <div
            data-fade
            style={{ transitionDelay: "0ms" }}
            className="flex items-center gap-3 mb-10 sm:mb-12"
          >
            <span className="w-7 h-[2px] bg-[#e63946] rounded-full block" />
            <span className="text-[10.5px] font-black uppercase tracking-[0.2em] text-[#e63946]">
              About PCPS College
            </span>
          </div>

          {/* ── Main 2-col grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

            {/* ════ LEFT ════ */}
            <div
              data-fade
              style={{ transitionDelay: "60ms" }}
              className="flex flex-col gap-5"
            >
              {/* Image — fixed height, no overflow */}
              <div className="relative w-full h-[300px] sm:h-[60px] lg:h-[450px]
                              rounded-2xl overflow-hidden
                              shadow-[0_16px_48px_rgba(26,26,46,0.10)] group">
                <Image
                  src="/images/college.jpg"
                  alt="PCPS College campus, Lalitpur Nepal"
                  fill
                  className="object-cover object-center
                             group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                  sizes="(max-width:1024px) 100vw, 100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t
                                from-[#1a1a2e]/70 via-[#1a1a2e]/10 to-transparent" />
              </div>

              {/* Stats row — below image */}
              <div className="grid grid-cols-4 bg-[#1a1a2e] rounded-2xl
                              divide-x divide-white/[0.07] px-2 py-5">
                {statItems.map(({ num, label, sub }) => (
                  <div key={label} className="flex flex-col items-center text-center px-1.5">
                    <span className="text-white text-[1.35rem] sm:text-[1.6rem] font-black
                                     leading-none tracking-tight">{num}</span>
                    <span className="text-white/60 text-[10px] font-bold mt-1.5">{label}</span>
                    <span className="text-white/25 text-[9px] mt-0.5 hidden sm:block">{sub}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ════ RIGHT ════ */}
            <div
              data-fade
              style={{ transitionDelay: "120ms" }}
              className="flex flex-col gap-7"
            >
              {/* Heading */}
              <div>
                <h2 className="text-[1.65rem] sm:text-[1.9rem] lg:text-[2.1rem] font-black
                               text-[#1a1a2e] leading-[1.08] tracking-tight">
                  Nepal&apos;s Only On-Campus
                  <br />
                  <span className="text-[#e63946]">UK Degree Partnership.</span>
                </h2>
                <p className="mt-4 text-[14px] sm:text-[14.5px] text-gray-400
                              leading-[1.85] max-w-md">
                  PCPS College offers internationally recognised UK undergraduate programmes in Software Engineering, 
                  Business Management, Business Analytics, and Digital Marketing. We provide globally accredited degrees 
                  in partnership with the University of Bedfordshire and are the only institution in Nepal to offer an on-campus UK degree partnership.
                </p>
              </div>

              {/* Programmes list */}
              <div className="flex flex-col gap-2">
                <p className="text-[10.5px] font-black uppercase tracking-[0.18em]
                              text-gray-400 mb-1">
                  Our Programmes
                </p>
                {programmes.map(({ Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 bg-white border border-gray-100
                               rounded-xl px-4 py-3
                               hover:border-[#e63946]/20 hover:shadow-sm
                               transition-all duration-200 group cursor-default"
                  >
                    <Icon size={16} className="text-[#e63946] shrink-0" />
                    <span className="text-[13px] font-semibold text-[#1a1a2e]
                                     group-hover:text-[#e63946] transition-colors duration-200">
                      {label}
                    </span>
                    <span className="ml-auto text-[#e63946]/40 text-xs
                                     group-hover:text-[#e63946] transition-colors duration-200">
                      →
                    </span>
                  </div>
                ))}
              </div>


              {/* CTA */}
              <div className="flex items-center gap-4">
                <Button href="/about">Learn More</Button>
                <a
                  href="https://apply.patancollege.edu.np"
                  className="text-[13px] font-bold text-[#e63946]
                             hover:underline underline-offset-2 transition-all"
                >
                  Apply now →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}