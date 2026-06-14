"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { CollegeStats } from "@/types";

interface Props {
  stats: CollegeStats;
}

/* ─────────────────────────────────────────────
   Animated counter hook
───────────────────────────────────────────── */
function useCountUp(target: number, duration = 1600, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf: number;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(ease * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

/* ─────────────────────────────────────────────
   Stat card
───────────────────────────────────────────── */
function StatCard({
  num,
  suffix,
  label,
  delay,
  animate,
}: {
  num: number;
  suffix: string;
  label: string;
  delay: number;
  animate: boolean;
}) {
  const count = useCountUp(num, 1600, animate);
  return (
    <div
      style={{
        opacity: 0,
        animation: animate
          ? `heroFadeUp 0.6s ${delay}ms cubic-bezier(0.22,1,0.36,1) forwards`
          : "none",
      }}
    >
      <div style={{ fontSize: "clamp(1.7rem,2.8vw,2.3rem)", fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: "5px" }}>
        {label}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Hero
───────────────────────────────────────────── */
export default function HeroSection({ stats }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes heroPulse {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(2);   opacity: 0; }
        }
        @keyframes heroScrollHint {
          0%, 100% { opacity: 0.25; transform: translateY(0); }
          50%       { opacity: 0.6;  transform: translateY(6px); }
        }
        @keyframes heroScan {
          0%   { transform: translateY(-100%); opacity: 0.5; }
          100% { transform: translateY(500%);  opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-float] { animation: none !important; }
          [data-scan]  { animation: none !important; }
        }
      `}</style>

      <section
        style={{
          position: "relative",
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: "linear-gradient(150deg, #070911 0%, #0d1225 50%, #0f0b1e 100%)",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >

        {/* ══════════════════════════════════════════
            BACKGROUND IMAGE — visible on ALL screens
            Higher opacity on mobile, slightly lower
            on desktop where the right-column image
            already provides the visual weight.
        ════════════════════════════════════════════ */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            pointerEvents: "none",
          }}
        >
          {/* ── Full-bleed campus photo ── */}
          <Image
            src="/pcps_bg.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            style={{
              objectFit: "cover",
              objectPosition: "center top",
              /* Mobile: clearly visible. Desktop override below via class. */
              opacity: 0.32,
            }}
            className="hero-bg-img"
          />

          {/*
            ── Layered gradient masks ──
            Three gradients combined:
            1. Left-edge darkening  → keeps headline text readable
            2. Bottom darkening     → keeps stats row readable
            3. Top darkening        → keeps eyebrow badge readable
            Tweak the rgba alpha values to taste.
          */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: [
                /* left edge — strong on mobile where text sits over the photo */
                "linear-gradient(100deg, rgba(7,9,17,0.78) 0%, rgba(7,9,17,0.50) 50%, rgba(7,9,17,0.10) 100%)",
                /* bottom — dark enough for stats + CTA */
                "linear-gradient(to top, rgba(7,9,17,0.90) 0%, rgba(7,9,17,0.45) 35%, transparent 65%)",
                /* top — for the eyebrow badge */
                "linear-gradient(to bottom, rgba(7,9,17,0.60) 0%, transparent 28%)",
              ].join(", "),
            }}
          />

          {/* Subtle red vignette echoing the brand accent */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(ellipse 80% 60% at 70% 30%, rgba(220,38,38,0.08) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* ── Background grid ── */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            backgroundImage: "radial-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            pointerEvents: "none",
          }}
        />

        {/* ── Red glow blob top-right ── */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-10%",
            right: "-5%",
            width: "55vw",
            height: "55vw",
            zIndex: 1,
            background: "radial-gradient(circle, rgba(220,38,38,0.09) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        {/* ── Blue glow blob bottom-left ── */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: "-15%",
            left: "-10%",
            width: "50vw",
            height: "50vw",
            zIndex: 1,
            background: "radial-gradient(circle, rgba(29,78,216,0.1) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        {/* ── Top accent line ── */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: "0 0 auto 0",
            height: "1px",
            zIndex: 2,
            background: "linear-gradient(90deg, transparent 0%, rgba(220,38,38,0.5) 50%, transparent 100%)",
          }}
        />

        {/* ════════════════════════════
            CONTENT
        ═════════════════════════════ */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            margin: "0 auto",
            width: "100%",
            maxWidth: "1300px",
            padding: "clamp(96px, 12vw, 120px) clamp(20px, 5vw, 48px) clamp(60px, 8vw, 80px)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "56px",
              alignItems: "center",
            }}
            className="hero-grid"
          >
            {/* ══════ LEFT COLUMN ══════ */}
            <div style={{ maxWidth: "680px" }}>

              {/* Eyebrow badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "7px 14px 7px 10px",
                  borderRadius: "100px",
                  border: "1px solid rgba(29,78,216,0.35)",
                  background: "rgba(29,78,216,0.1)",
                  marginBottom: "28px",
                  opacity: 0,
                  animation: visible ? "heroFadeUp 0.5s 0ms cubic-bezier(0.22,1,0.36,1) forwards" : "none",
                }}
              >
                {/* Live pulse */}
                <span style={{ position: "relative", display: "flex", width: "8px", height: "8px" }}>
                  <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#60a5fa", animation: "heroPulse 2s ease-out infinite" }} />
                  <span style={{ position: "relative", width: "8px", height: "8px", borderRadius: "50%", background: "#60a5fa", display: "block" }} />
                </span>
                {/* UK flag */}
                <svg width="18" height="13" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <rect width="60" height="40" fill="#012169" rx="2" />
                  <path d="M0 0 L60 40 M60 0 L0 40" stroke="white" strokeWidth="8" />
                  <path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" strokeWidth="5" />
                  <path d="M30 0 V40 M0 20 H60" stroke="white" strokeWidth="13" />
                  <path d="M30 0 V40 M0 20 H60" stroke="#C8102E" strokeWidth="8" />
                </svg>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "rgba(147,197,253,0.85)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Nepal&apos;s only on-campus UK degree
                </span>
              </div>

              {/* ── Headline ── */}
              <h1
                style={{
                  fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)",
                  fontWeight: 900,
                  lineHeight: 1.03,
                  letterSpacing: "-0.03em",
                  color: "#fff",
                  marginBottom: "24px",
                  opacity: 0,
                  animation: visible ? "heroFadeUp 0.6s 80ms cubic-bezier(0.22,1,0.36,1) forwards" : "none",
                }}
              >
                The Most
                <br />
                <span
                  style={{
                    background: "linear-gradient(105deg, #f87171 0%, #ef4444 40%, #dc2626 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Career-Focused
                </span>
                <br />
                <span style={{ color: "rgba(255,255,255,0.88)" }}>UK Degree</span>
                {" "}
                <span style={{
                  background: "linear-gradient(105deg, #f87171 0%, #ef4444 40%, #dc2626 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>in Nepal.</span>
              </h1>

              {/* ── Body ── */}
              <p
                style={{
                  fontSize: "clamp(0.93rem, 1.3vw, 1.05rem)",
                  lineHeight: 1.8,
                  color: "rgba(255,255,255,0.50)",
                  maxWidth: "500px",
                  marginBottom: "36px",
                  opacity: 0,
                  animation: visible ? "heroFadeUp 0.6s 160ms cubic-bezier(0.22,1,0.36,1) forwards" : "none",
                }}
              >
                Globally accredited programmes — validated by{" "}
                <span style={{ color: "rgba(255,255,255,0.82)", fontWeight: 600 }}>University of Bedfordshire</span>
                {" "}— designed around industry, built around you.
              </p>

              {/* ── CTA row ── */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginBottom: "48px",
                  opacity: 0,
                  animation: visible ? "heroFadeUp 0.6s 240ms cubic-bezier(0.22,1,0.36,1) forwards" : "none",
                }}
              >
                {/* Primary */}
                <a
                  href="https://apply.patancollege.edu.np"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "13px 26px",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 700,
                    textDecoration: "none",
                    letterSpacing: "-0.01em",
                    boxShadow: "0 0 0 1px rgba(220,38,38,0.5) inset, 0 6px 28px rgba(220,38,38,0.35)",
                    transition: "transform 0.15s, box-shadow 0.15s",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 0 1px rgba(220,38,38,0.5) inset, 0 10px 36px rgba(220,38,38,0.45)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 0 1px rgba(220,38,38,0.5) inset, 0 6px 28px rgba(220,38,38,0.35)";
                  }}
                >
                  Apply for 2026 Intake
                  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>

                {/* Secondary */}
                <Link
                  href="/courses"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "13px 22px",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.13)",
                    background: "rgba(255,255,255,0.055)",
                    backdropFilter: "blur(12px)",
                    color: "rgba(255,255,255,0.70)",
                    fontSize: "14px",
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "rgba(255,255,255,0.09)";
                    el.style.color = "#fff";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = "rgba(255,255,255,0.055)";
                    el.style.color = "rgba(255,255,255,0.70)";
                  }}
                >
                  Explore Programmes
                  <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* ── Stats row ── */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "0",
                  paddingTop: "28px",
                  borderTop: "1px solid rgba(255,255,255,0.08)",
                  opacity: 0,
                  animation: visible ? "heroFadeUp 0.6s 380ms cubic-bezier(0.22,1,0.36,1) forwards" : "none",
                }}
              >
                {[
                  { num: stats.activeAlumni, suffix: "+", label: "Alumni" },
                  { num: stats.activeStudents, suffix: "+", label: "Students" },
                  { num: stats.placementRate, suffix: "%", label: "Placement" },
                  { num: stats.yearsOfExperience, suffix: "+", label: "Years" },
                ].map((s, i) => (
                  <div
                    key={s.label}
                    style={{
                      paddingLeft: i > 0 ? "24px" : 0,
                      borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                    }}
                  >
                    <StatCard
                      num={s.num}
                      suffix={s.suffix}
                      label={s.label}
                      delay={400 + i * 50}
                      animate={visible}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ══════ RIGHT COLUMN — image (desktop only) ══════ */}
            <div
              className="hero-image-col"
              style={{
                position: "relative",
                height: "clamp(360px, 52vw, 600px)",
                display: "none",
              }}
            >
              {/* Image card */}
              <div
                data-float
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
                  opacity: 0,
                  animation: visible
                    ? "heroFadeUp 0.8s 200ms cubic-bezier(0.22,1,0.36,1) forwards, heroFloat 7s 1.2s ease-in-out infinite"
                    : "none",
                }}
              >
                <Image
                  src="/pcps_bg.webp"
                  alt="PCPS College campus Lalitpur Kathmandu"
                  fill
                  priority
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                />

                {/* Scan atmosphere */}
                <div
                  data-scan
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: 0, right: 0,
                    height: "70px",
                    background: "linear-gradient(to bottom, transparent, rgba(220,38,38,0.06), transparent)",
                    animation: "heroScan 5s linear infinite",
                    pointerEvents: "none",
                  }}
                />

                {/* Dark overlay */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(175deg, rgba(7,9,17,0.1) 0%, rgba(7,9,17,0.05) 35%, rgba(7,9,17,0.72) 100%)",
                  }}
                />

                {/* Red chevron */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    top: 0, right: 0,
                    width: "120px",
                    height: "100%",
                    overflow: "hidden",
                    pointerEvents: "none",
                  }}
                >
                  <svg viewBox="0 0 120 600" fill="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                    <path d="M120 0 L60 300 L120 600 L120 0 Z" fill="rgba(220,38,38,0.15)" />
                    <path d="M120 0 L68 300 L120 600" stroke="rgba(220,38,38,0.45)" strokeWidth="1.5" fill="none" />
                  </svg>
                </div>

                {/* Logo watermark */}
                <div style={{ position: "absolute", top: 18, left: 18 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/pcps.svg" alt="PCPS" style={{ height: "30px", filter: "brightness(0) invert(1)", opacity: 0.8 }} />
                </div>

                {/* Placement badge */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 20,
                    left: 20,
                    right: 20,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    borderRadius: "14px",
                    border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(7,9,17,0.78)",
                    backdropFilter: "blur(20px)",
                    opacity: 0,
                    animation: visible ? "heroFadeUp 0.7s 600ms cubic-bezier(0.22,1,0.36,1) forwards" : "none",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 700, color: "#fff" }}>PCPS College</div>
                    <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginTop: "2px" }}>Lalitpur, Kathmandu</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#34d399", display: "block", flexShrink: 0 }} />
                    <span style={{ fontSize: "11.5px", fontWeight: 700, color: "rgba(255,255,255,0.75)" }}>96% Placement</span>
                  </div>
                </div>
              </div>

              {/* ── Top badge ── */}
              <div
                style={{
                  position: "absolute",
                  top: -16,
                  left: -18,
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  padding: "9px 13px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(7,9,17,0.8)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                  zIndex: 10,
                  opacity: 0,
                  animation: visible ? "heroFadeUp 0.7s 700ms cubic-bezier(0.22,1,0.36,1) forwards" : "none",
                }}
              >
                <span style={{ width: "32px", height: "32px", borderRadius: "9px", background: "rgba(251,191,36,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="15" height="15" fill="none" stroke="#fbbf24" strokeWidth={2} viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="6" /><path d="M8 14l-3 7h14l-3-7" />
                  </svg>
                </span>
                <span>
                  <span style={{ display: "block", fontSize: "11.5px", fontWeight: 700, color: "#fff" }}>#1 UK Degree in Nepal</span>
                  <span style={{ display: "block", fontSize: "9.5px", color: "rgba(255,255,255,0.38)", marginTop: "1px" }}>By Student Outcomes · 2024</span>
                </span>
              </div>

              {/* ── Right badge ── */}
              <div
                style={{
                  position: "absolute",
                  top: "38%",
                  right: -18,
                  display: "flex",
                  alignItems: "center",
                  gap: "9px",
                  padding: "9px 13px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "rgba(7,9,17,0.8)",
                  backdropFilter: "blur(20px)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                  zIndex: 10,
                  opacity: 0,
                  animation: visible ? "heroFadeUp 0.7s 820ms cubic-bezier(0.22,1,0.36,1) forwards" : "none",
                }}
              >
                <span style={{ width: "32px", height: "32px", borderRadius: "9px", background: "rgba(96,165,250,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="15" height="15" fill="none" stroke="#60a5fa" strokeWidth={2} viewBox="0 0 24 24">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c0 1.1 2.686 2 6 2s6-.9 6-2v-5" />
                  </svg>
                </span>
                <span>
                  <span style={{ display: "block", fontSize: "11.5px", fontWeight: 700, color: "#fff" }}>UoB Validated</span>
                  <span style={{ display: "block", fontSize: "9.5px", color: "rgba(255,255,255,0.38)", marginTop: "1px" }}>Bedford, UK · Globally Recognised</span>
                </span>
              </div>
            </div>

          </div>{/* end grid */}
        </div>

        {/* ── Scroll hint ── */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px",
            zIndex: 2,
            animation: "heroScrollHint 2.6s ease-in-out infinite",
          }}
        >
          <div style={{ width: 1, height: 34, background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.18))" }} />
          <svg width="12" height="12" fill="none" stroke="rgba(255,255,255,0.25)" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* ── Responsive styles ── */}
        <style>{`
          /* On desktop (lg+): dim the full-bleed bg image slightly
             because the right-column card already shows the photo clearly */
          @media (min-width: 1024px) {
            .hero-bg-img {
              opacity: 0.18 !important;
            }
            .hero-grid {
              grid-template-columns: 1fr 480px !important;
            }
            .hero-image-col {
              display: block !important;
            }
          }

          @media (min-width: 1200px) {
            .hero-grid {
              grid-template-columns: 1fr 520px !important;
            }
          }

          /* Mobile: 2-column stats grid so numbers aren't cramped */
          @media (max-width: 640px) {
            .hero-grid > div:first-child > div[style*="repeat(4"] {
              grid-template-columns: repeat(2, 1fr) !important;
              row-gap: 24px !important;
            }
            /* Fix left-border on stat items for 2-col layout:
               items 0 & 1 = top row, items 2 & 3 = bottom row.
               Remove left border from col-start items (0, 2). */
            .hero-grid > div:first-child > div[style*="repeat(4"] > div:nth-child(1),
            .hero-grid > div:first-child > div[style*="repeat(4"] > div:nth-child(3) {
              border-left: none !important;
              padding-left: 0 !important;
            }
            .hero-grid > div:first-child > div[style*="repeat(4"] > div:nth-child(3),
            .hero-grid > div:first-child > div[style*="repeat(4"] > div:nth-child(4) {
              border-top: 1px solid rgba(255,255,255,0.08) !important;
              padding-top: 20px !important;
            }
          }
        `}</style>

      </section>
    </>
  );
}