"use client";

import { useEffect, useRef, useState } from "react";
import {
  FileText,
  IdCard,
  ClipboardCheck,
  Award,
  Images,
  User,
  Landmark,
} from "lucide-react";

/**
 * DocumentStack — Premium animated application-document fan.
 *
 * Scroll  → stack slides up + fades in (once).
 * Hover   → documents fan open like a hand of cards (slow, luxurious).
 * Tap     → same as hover on touch devices.
 * Reduced-motion → static layout, no transitions.
 */

// ─── Types ───────────────────────────────────────────────────────────────────

type Doc = {
  id: string;
  /** Short label shown inside the card */
  label: string;
  sublabel: string;
  icon: React.ElementType;
  /** Resting rotation (degrees) – stacked, slightly differentiated */
  restRotate: number;
  /** Fanned rotation when hovered */
  fanRotate: number;
  /** Vertical offset when fanned (px, negative = up) */
  fanY: number;
  /** Z-index */
  z: number;
  /** Whether the top card lifts forward on fan */
  lift?: boolean;
  content: React.ReactNode;
};

// ─── Shared line stub ─────────────────────────────────────────────────────────

const Line = ({ w = "full", h = "1.5" }: { w?: string; h?: string }) => (
  <div className={`h-${h} w-${w} rounded-full bg-gray-100`} />
);

// ─── Document definitions ─────────────────────────────────────────────────────

const docs: Doc[] = [
  // 1 – Bank Statement (back-most)
  {
    id: "bank",
    label: "Bank Statement",
    sublabel: "Last 3 months",
    icon: Landmark,
    restRotate: -9,
    fanRotate: -30,
    fanY: 12,
    z: 10,
    content: (
      <div className="flex h-full flex-col gap-2">
        <div className="flex items-center gap-2 border-b border-gray-100 pb-2">
          <Landmark size={13} className="text-red-400 shrink-0" />
          <span className="text-[10px] font-bold text-gray-800 leading-tight">
            Bank Statement
          </span>
        </div>
        <div className="flex-1 space-y-1.5">
          {[100, 75, 90, 60, 80].map((w, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <div className="h-1 w-1 rounded-full bg-gray-200 shrink-0" />
              <div
                className="h-1.5 rounded-full bg-gray-100"
                style={{ width: `${w}%` }}
              />
            </div>
          ))}
        </div>
        <div className="border-t border-dashed border-gray-100 pt-1.5 flex justify-between items-center">
          <div className="h-1.5 w-1/3 rounded-full bg-red-100" />
          <div className="h-1.5 w-1/4 rounded-full bg-gray-100" />
        </div>
      </div>
    ),
  },
  // 2 – Passport Photos
  {
    id: "photos",
    label: "Passport Photos",
    sublabel: "4 copies · 35×45 mm",
    icon: Images,
    restRotate: -5,
    fanRotate: -18,
    fanY: 6,
    z: 20,
    content: (
      <div className="flex h-full flex-col gap-1.5">
        <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">
          Photo Sheet
        </p>
        <div className="grid grid-cols-2 gap-1.5 flex-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50"
            >
              <User size={14} className="text-gray-300" />
            </div>
          ))}
        </div>
      </div>
    ),
  },
  // 3 – Application Form
  {
    id: "form",
    label: "Application Form",
    sublabel: "PCPS College",
    icon: ClipboardCheck,
    restRotate: -1,
    fanRotate: -6,
    fanY: 0,
    z: 30,
    content: (
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-1.5 border-b border-gray-100 pb-2 mb-2">
          <ClipboardCheck size={13} className="text-red-500 shrink-0" />
          <span className="text-[10px] font-bold text-gray-900">
            Application Form
          </span>
        </div>
        <div className="flex-1 space-y-2.5">
          {[55, 80, 65, 90].map((w, i) => (
            <div key={i}>
              <div className="mb-0.5 h-1 w-1/3 rounded-full bg-gray-200" />
              <div
                className="h-1.5 rounded-full bg-gray-100"
                style={{ width: `${w}%` }}
              />
            </div>
          ))}
        </div>
        <div className="mt-auto border-t border-gray-100 pt-2 flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-sm border border-gray-300 shrink-0" />
          <Line w="1/2" />
        </div>
      </div>
    ),
  },
  // 4 – National ID
  {
    id: "id",
    label: "National ID",
    sublabel: "Citizenship / Passport",
    icon: IdCard,
    restRotate: 4,
    fanRotate: 10,
    fanY: -6,
    z: 40,
    content: (
      <div className="flex h-full flex-col gap-2">
        <div className="flex items-center gap-1.5 border-b border-gray-100 pb-1.5">
          <IdCard size={13} className="text-red-500 shrink-0" />
          <span className="text-[10px] font-bold text-gray-900">National ID</span>
        </div>
        <div className="flex flex-1 gap-2">
          <div className="flex h-full w-10 items-center justify-center rounded-lg border border-gray-200 bg-gray-50 shrink-0">
            <User size={16} className="text-gray-300" />
          </div>
          <div className="flex-1 space-y-1.5 pt-0.5">
            <Line />
            <Line w="2/3" />
            <Line w="3/4" />
            <Line w="1/2" />
          </div>
        </div>
        <div className="flex gap-1">
          {[40, 35, 50].map((w, i) => (
            <div
              key={i}
              className="h-1 rounded-full bg-gray-100"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      </div>
    ),
  },
  // 5 – Academic Certificate (front-most)
  {
    id: "cert",
    label: "Academic Certificate",
    sublabel: "SEE / +2 Transcript",
    icon: Award,
    restRotate: 9,
    fanRotate: 24,
    fanY: -14,
    z: 50,
    lift: true,
    content: (
      <div className="flex h-full flex-col items-center justify-between text-center">
        <div className="w-full border-b border-dashed border-gray-200 pb-2">
          <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-gray-400">
            Certificate of Achievement
          </p>
        </div>
        <Award size={22} className="text-red-300 mt-1" />
        <div className="space-y-1 px-1">
          <p className="text-[10px] font-black text-gray-800 leading-tight">
            Academic Excellence
          </p>
          <Line w="3/4" />
          <Line w="full" />
        </div>
        <p className="font-mono text-[7px] tracking-[0.2em] text-gray-200 pb-0.5">
          REF · SAMPLE–0000
        </p>
      </div>
    ),
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function DocumentStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    if (mq.matches) { setScrolled(true); return; }

    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setScrolled(true); io.disconnect(); } },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Card dimensions (responsive handled via inline max-w + aspect)
  const CARD_W = 160; // px logical, scales via container
  const CARD_H = 210;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      role="presentation"
      className="relative mx-auto select-none"
      style={{
        width: CARD_W + 80,
        height: CARD_H + 80,
        maxWidth: "100%",
        perspective: 1400,
      }}
      onMouseEnter={() => !reducedMotion && setHovered(true)}
      onMouseLeave={() => !reducedMotion && setHovered(false)}
      // touch: tap toggles fan
      onTouchStart={() => !reducedMotion && setHovered((v) => !v)}
    >
      {/* Soft ambient glow beneath the stack */}
      <div
        className="absolute inset-x-6 bottom-4 h-8 rounded-full blur-xl transition-opacity duration-700"
        style={{
          background: "radial-gradient(ellipse, rgba(220,38,38,0.12) 0%, transparent 80%)",
          opacity: scrolled ? 1 : 0,
        }}
      />

      {/* Cards */}
      <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
        {docs.map((doc, i) => {
          const Icon = doc.icon;

          // ── Transform computation ──────────────────────────────────────────
          // Entry: cards start 60px below, invisible, all at rotate=0
          // Resting: stacked with slight individual rotations
          // Fanned: each card fans out by its fanRotate + translates

          let rotate = doc.restRotate;
          let translateY = 0;
          let translateZ = 0;
          let scale = 1;
          let opacity = scrolled ? 1 : 0;

          if (!scrolled) {
            rotate = 0;
            translateY = 60;
            scale = 0.95;
          } else if (hovered) {
            rotate = doc.fanRotate;
            translateY = doc.fanY;
            translateZ = doc.lift ? 28 : i * 2;
            scale = doc.lift ? 1.04 : 1;
          }

          const transform = [
            `translateY(${translateY}px)`,
            `translateZ(${translateZ}px)`,
            `rotate(${rotate}deg)`,
            `scale(${scale})`,
          ].join(" ");

          // Shadow depth increases on hover
          const shadow = hovered
            ? doc.lift
              ? "0 24px 48px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.10)"
              : `0 ${8 + i * 3}px ${20 + i * 6}px rgba(0,0,0,0.12)`
            : `0 ${4 + i * 2}px ${10 + i * 4}px rgba(0,0,0,0.08)`;

          return (
            <div
              key={doc.id}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: CARD_W,
                height: CARD_H,
                marginLeft: -CARD_W / 2,
                marginTop: -CARD_H / 2,
                zIndex: doc.z,
                transform,
                opacity,
                boxShadow: shadow,
                transformOrigin: "center 85%",
                borderRadius: 16,
                background: "white",
                border: "1px solid #e5e7eb",
                padding: 14,
                boxSizing: "border-box",
                transition: reducedMotion
                  ? "none"
                  : [
                      `transform 0.75s cubic-bezier(0.34, 1.18, 0.64, 1) ${i * 80}ms`,
                      `opacity 0.6s ease-out ${i * 80}ms`,
                      `box-shadow 0.5s ease`,
                    ].join(", "),
                willChange: "transform, opacity",
              }}
            >
              {/* Card header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <div
                    className="flex items-center justify-center rounded-md"
                    style={{
                      width: 24,
                      height: 24,
                      background: "rgba(239,68,68,0.08)",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={13} className="text-red-500" />
                  </div>
                  <div>
                    <p className="text-[8.5px] font-black text-gray-800 leading-tight uppercase tracking-wide">
                      {doc.label}
                    </p>
                    <p className="text-[7.5px] text-gray-400 leading-tight">
                      {doc.sublabel}
                    </p>
                  </div>
                </div>
                {/* Tiny "SAMPLE" watermark badge */}
                <span
                  className="rounded px-1 py-0.5 font-mono"
                  style={{
                    fontSize: 6,
                    letterSpacing: "0.1em",
                    background: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    color: "#d1d5db",
                    flexShrink: 0,
                  }}
                >
                  SAMPLE
                </span>
              </div>

              {/* Card body */}
              <div
                className="rounded-lg overflow-hidden"
                style={{
                  height: CARD_H - 14 * 2 - 36, // remaining height after header
                  padding: 8,
                  background: "#fafafa",
                  border: "1px solid #f3f4f6",
                }}
              >
                {doc.content}
              </div>
            </div>
          );
        })}
      </div>

      {/* Hover hint – fades in once scrolled, fades out on hover */}
      <p
        className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center pointer-events-none"
        style={{
          fontSize: 10,
          color: "#9ca3af",
          letterSpacing: "0.08em",
          opacity: scrolled && !hovered ? 0.75 : 0,
          transition: "opacity 0.4s ease",
          whiteSpace: "nowrap",
        }}
      >
        hover to fan open
      </p>
    </div>
  );
}