"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";

const PROGRAMME_IMAGES: Record<string, string> = {
  "business-management": "/images/college.jpg",
  "business-administration": "/images/college.jpg",
  "computing": "/images/software.webp",
  "computer-science": "/images/software.webp",
  "information-technology": "/images/software.webp",
  "networking": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80",
  "cybersecurity": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80",
  "artificial-intelligence": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80",
  "data-science": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80",
  "accounting-finance": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80",
  "finance": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80",
  "hospitality-management": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80",
  default: "/images/college.jpg",
};

function getProgrammeImage(slug: string): string {
  return PROGRAMME_IMAGES[slug] ?? PROGRAMME_IMAGES.default;
}

interface Course {
  id: string;
  slug: string;
  shortTitle: string;
  description: string;
  duration: string;
  intakeMonths: string[];
  careerPaths: string[];
  badge?: string;
}

interface ProgrammeGridProps {
  courses: Course[];
}

export default function ProgrammeGrid({ courses }: ProgrammeGridProps) {
  return (
    <div className="max-w-[1400px] mx-auto">
      {/* ── Mobile: horizontal scroll ── */}
      <div className="sm:hidden">
        <div
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {courses.map((c, i) => (
            <div key={c.id} className="snap-start flex-none w-[78%]">
              <ProgrammeCard course={c} index={i} priority={i === 0} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Tablet / Desktop grid ── */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-4 sm:px-6">
        {courses.map((c, i) => (
          <ProgrammeCard key={c.id} course={c} index={i} priority={i < 4} />
        ))}
      </div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function ProgrammeCard({
  course: c,
  index,
  priority,
}: {
  course: Course;
  index: number;
  priority: boolean;
}) {
  return (
    <Link
      href={`/courses/${c.slug}`}
      className="group block h-full focus-visible:outline-none rounded-[18px] border border-[#1a1a2e]/10 bg-white overflow-hidden shadow-[0_2px_10px_rgba(26,26,46,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_44px_rgba(26,26,46,0.12)] hover:border-[#1a1a2e]/[0.04]"
    >
      {/* ── Image (4:3) ── */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#0c0c14]">
        <Image
          src={getProgrammeImage(c.slug)}
          alt={c.shortTitle}
          fill
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.06] will-change-transform"
          unoptimized
          priority={priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c14]/50 via-transparent to-transparent" />

        {/* Index number */}
        <span className="absolute top-3 left-3 text-[10px] font-bold text-white/90 tabular-nums tracking-widest bg-black/30 backdrop-blur-sm rounded-full px-2.5 py-1">
          {String(index + 1).padStart(2, "0")}
        </span>

        {c.badge && (
          <span className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-widest bg-red-500 text-white px-2.5 py-1 rounded-full">
            {c.badge}
          </span>
        )}
      </div>

      {/* ── Content ── */}
      <div className="p-4 sm:p-5 flex flex-col">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-red-500 mb-1.5">
          BSc (Hons)
        </p>

        <h3 className="text-[15px] sm:text-[16px] font-extrabold tracking-tight text-[#1a1a2e] leading-snug mb-2">
          {c.shortTitle}
        </h3>

        <p className="text-[12px] leading-relaxed text-[#1a1a2e]/50 mb-4 line-clamp-2">
          {c.description}
        </p>

        {/* Career pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {c.careerPaths.slice(0, 2).map((p) => (
            <span
              key={p}
              className="text-[9.5px] font-semibold px-2.5 py-1 rounded-full bg-red-50 text-red-600 border border-red-100"
            >
              {p}
            </span>
          ))}
        </div>

        {/* Meta + arrow */}
        <div className="flex items-center justify-between pt-3 border-t border-[#1a1a2e]/8 mt-auto">
          <div className="flex flex-col gap-1 text-[10.5px] font-medium text-[#1a1a2e]/40">
            <div className="flex items-center gap-1.5">
              <Clock size={11} />
              <span>{c.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={11} />
              <span>{c.intakeMonths.join(" & ")}</span>
            </div>
          </div>

          <div className="flex items-center justify-center w-9 h-9 rounded-full bg-red-50 text-red-500 flex-shrink-0 group-hover:bg-red-500 group-hover:text-white transition-colors duration-300">
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </Link>
  );
}