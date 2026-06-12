"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Bell, ArrowRight, Calendar } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { Notice } from "@/types";

const catColor: Record<string, "red" | "blue" | "green" | "gray"> = {
  Academic:   "blue",
  Admissions: "green",
  General:    "gray",
};

function isNew(dateStr: string) {
  return Date.now() - new Date(dateStr).getTime() < 7 * 24 * 60 * 60 * 1000;
}

function NoticeCard({ n, delay }: { n: Notice; delay: number }) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("card-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      href={`/notices/${n.id}`}
      className="notice-card group flex flex-col gap-4 bg-white border border-gray-100
                 rounded-2xl p-6 sm:p-7
                 hover:border-[#e63946]/20
                 hover:shadow-[0_12px_40px_rgba(230,57,70,0.08)]
                 transition-all duration-300"
      style={{ transitionDelay: `${delay}ms` } as React.CSSProperties}
    >
      {/* Meta row */}
      <div className="flex items-center gap-2 flex-wrap">
        <Badge color={catColor[n.category] ?? "gray"}>{n.category}</Badge>
        {isNew(n.publishedAt) && (
          <span className="text-[9.5px] font-black uppercase tracking-[0.15em]
                           text-[#e63946] bg-red-50 border border-red-100
                           px-2.5 py-0.5 rounded-full">
            New
          </span>
        )}
        <span className="ml-auto flex items-center gap-1 text-[11px] text-gray-400 whitespace-nowrap">
          <Calendar size={10} className="shrink-0" />
          {formatDate(n.publishedAt)}
        </span>
      </div>

      {/* Title */}
      <h4 className="font-black text-[#1a1a2e] text-[15px] leading-snug tracking-tight
                     group-hover:text-[#e63946] transition-colors duration-200 flex-1">
        {n.title}
      </h4>

      {/* Body */}
      <p className="text-[13px] text-gray-400 leading-relaxed line-clamp-2">
        {n.body}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-50
                      mt-auto">
        <span className="text-[11px] text-gray-300 font-medium">
          PCPS College
        </span>
        <div className="flex items-center gap-1 text-[12px] font-bold text-gray-400
                        group-hover:text-[#e63946] transition-colors duration-200">
          Read notice
          <ArrowRight size={11}
            className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </div>
      </div>
    </Link>
  );
}

export default function NoticesSection({ notices }: { notices: Notice[] }) {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("header-visible");
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (!notices.length) return null;

  return (
    <>
      <style>{`
        /* ── Header animation ── */
        .notices-header {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s cubic-bezier(.22,1,.36,1),
                      transform 0.6s cubic-bezier(.22,1,.36,1);
        }
        .header-visible .notices-header {
          opacity: 1;
          transform: translateY(0);
        }
        .notices-header-delay {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s cubic-bezier(.22,1,.36,1) 0.1s,
                      transform 0.6s cubic-bezier(.22,1,.36,1) 0.1s;
        }
        .header-visible .notices-header-delay {
          opacity: 1;
          transform: translateY(0);
        }

        /* ── Card animation ── */
        .notice-card {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.6s cubic-bezier(.22,1,.36,1),
                      transform 0.6s cubic-bezier(.22,1,.36,1),
                      border-color 0.3s ease,
                      box-shadow 0.3s ease;
        }
        .card-visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        @media (prefers-reduced-motion: reduce) {
          .notices-header,
          .notices-header-delay,
          .notice-card {
            opacity: 1; transform: none; transition: none;
          }
        }
      `}</style>

      <section
        className="relative py-20 sm:py-28 overflow-hidden border-b border-gray-100"
        style={{
          background: "linear-gradient(160deg, #f0f2ff 0%, #f9f9fb 40%, #fff5f5 100%)",
        }}
      >
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg,#1a1a2e 0px,#1a1a2e 1px,transparent 1px,transparent 48px)," +
              "repeating-linear-gradient(90deg,#1a1a2e 0px,#1a1a2e 1px,transparent 1px,transparent 48px)",
          }}
        />

        <div className="mx-auto max-w-7xl px-5 relative">

          {/* ── Header ── */}
          <div ref={headerRef} className="flex items-end justify-between mb-12 sm:mb-14">
            <div>
              <div className="notices-header flex items-center gap-3 mb-4">
                <span className="block w-8 h-[2px] bg-[#e63946] rounded-full" />
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#e63946]">
                  Notices
                </span>
              </div>
              <h2 className="notices-header text-[1.9rem] sm:text-[2.4rem] font-black
                             text-[#1a1a2e] leading-[1.06] tracking-tight">
                Stay in the loop.
              </h2>
              <p className="notices-header-delay mt-3 text-[14px] sm:text-[15px] text-gray-400
                            leading-relaxed max-w-md">
                Important updates on academics, admissions, and campus life.
              </p>
            </div>

            {/* Desktop "All notices" link */}
            <Link
              href="/notices"
              className="notices-header hidden sm:flex items-center gap-2
                         text-[13px] font-bold text-gray-400
                         hover:text-[#e63946] transition-colors duration-200 group shrink-0 mb-1"
            >
              All notices
              <span className="w-7 h-7 rounded-full bg-white border border-gray-100
                               flex items-center justify-center shadow-sm
                               group-hover:border-[#e63946]/30 group-hover:bg-red-50
                               transition-all duration-200">
                <ArrowRight size={12}
                  className="group-hover:translate-x-0.5 transition-transform duration-200
                             text-gray-400 group-hover:text-[#e63946]" />
              </span>
            </Link>
          </div>

          {/* ── Grid ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
            {notices.map((n, i) => (
              <NoticeCard key={n.id} n={n} delay={i * 70} />
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-8 flex sm:hidden justify-center">
            <Link
              href="/notices"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                         bg-[#1a1a2e] text-white text-[13px] font-bold
                         hover:bg-[#e63946] transition-colors duration-200"
            >
              All notices <ArrowRight size={12} />
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}