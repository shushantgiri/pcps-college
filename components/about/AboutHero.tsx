"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function AboutHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Background image drifts slower than the page (classic parallax),
  // foreground text fades out a touch as the user scrolls past.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div ref={ref} className="relative h-[78vh] min-h-[560px] overflow-hidden bg-[#1a1a2e]">
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        {/* Replace with PCPS campus / student-life photography */}
        <Image
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1800&q=80"
          alt="Students collaborating on the PCPS campus"
          fill
          priority
          className="object-cover"
          unoptimized
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a2e]/90 via-[#1a1a2e]/75 to-[#0f3460]/80" />

      <motion.div
        style={{ opacity: textOpacity, y: textY }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-5 text-center text-white"
      >
        <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3">
          About PCPS
        </p>
        <h1 className="text-5xl sm:text-6xl font-black mb-5 leading-tight max-w-3xl">
          Nepal&apos;s Most Career-Focused UK Degree
        </h1>
        <p className="text-white/60 text-lg leading-relaxed max-w-xl">
          UK undergraduate programmes delivered on campus in Lalitpur, in
          partnership with the University of Bedfordshire.
        </p>
      </motion.div>

      {/* Stats strip, anchored to the bottom edge of the hero */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="mx-auto max-w-5xl px-5 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
          {[
            { num: "800+", label: "Active Alumni" },
            { num: "300+", label: "Active Students" },
            { num: "96%", label: "Placement Rate" },
            { num: "10+", label: "Years Experience" },
          ].map(({ num, label }) => (
            <div key={label}>
              <div className="text-2xl sm:text-3xl font-black">{num}</div>
              <div className="text-[11px] sm:text-xs text-white/50 mt-1 font-semibold uppercase tracking-wide">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}