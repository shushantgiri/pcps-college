import { getCourses } from "@/lib/api";
import { ArrowRight, Phone, Mail } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import CoursesParallax from "@/components/courses/CoursesParallax";
import ProgrammeGrid from "@/components/courses/ProgrammeGrid";
import HeroButtons from "@/components/courses/HeroButtons";
import Image from "next/image";

export const metadata = { title: "Programmes – PCPS College" };

const PROGRAMME_IMAGES: Record<string, string> = {
  "business-management": "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=900&q=80",
  "business-administration": "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=900&q=80",
  "computing": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80",
  "computer-science": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80",
  "information-technology": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80",
  "networking": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80",
  "cybersecurity": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=80",
  "artificial-intelligence": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80",
  "data-science": "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=80",
  "accounting-finance": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80",
  "finance": "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80",
  "hospitality-management": "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900&q=80",
  default: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=80",
};
const WHY_STATS = [
  { stat: "94%", label: "Graduate placement rate", sub: "within 6 months of graduation" },
  { stat: "2yr", label: "UK Graduate Route visa", sub: "eligible after graduation" },
  { stat: "100%", label: "Industry-active faculty", sub: "no career academics" },
  { stat: "Jan & Sep", label: "Flexible intake", sub: "start when suits you" },
];

const WHY_FACTS = [
  "Same degree as UK campus students — awarded by University of Bedfordshire",
  "Direct employer pipelines: Khalti, eSewa, Gokyo Labs & more",
];

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div>

      {/* ── 1. HERO ───────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] text-white py-24 px-5 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3">
            Our Programmes
          </p>
          <h1 className="text-5xl font-black mb-5">
            UK-Accredited Undergraduate Programmes
          </h1>
          <p className="text-white/60 text-lg mb-8">
            Delivered on-campus in Lalitpur in partnership with the University of
            Bedfordshire — the same degree you would earn in the UK.
          </p>
          <HeroButtons applyHref="https://apply.patancollege.edu.np" />
        </div>
      </div>

      {/* ── 2. PROGRAMME GRID ─────────────────────────────────────────────── */}
      <div id="programmes" className="bg-[#f7f7f5] py-20">
        <div className="mx-auto max-w-7xl px-5 mb-12">
          <SectionHeader
            eyebrow="All Programmes"
            title="Choose Your Programme"
            subtitle={`${courses.length} UK-accredited programmes — January & September intake.`}
            center
          />
        </div>
        <div className="mx-auto max-w-7xl px-5">
          <ProgrammeGrid courses={courses} />
        </div>
      </div>

      {/* ── 3. PARALLAX BANNER ───────────────────────────────────────────── */}
      <CoursesParallax />

      {/* ── 4. WHY PCPS ──────────────────────────────────────────────────── */}
      <div className="bg-white py-24 px-5">
        <div className="mx-auto max-w-6xl">

          {/* Header + image */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">

            {/* Left: text */}
            <div>
              <p className="text-[10px] font-bold text-red-500 uppercase tracking-[0.18em] mb-3">
                Why PCPS
              </p>
              <h2 className="text-4xl font-black text-gray-950 leading-tight mb-5">
                What Makes Our<br />Programmes Different
              </h2>
              <p className="text-gray-500 text-base leading-relaxed mb-6">
                We don&apos;t just teach theory. Our programmes are built around
                real industry needs — so you graduate job-ready, not just degree-holding.
              </p>
              {WHY_FACTS.map((f) => (
                <div key={f} className="flex items-start gap-3 mb-3">
                  <span className="mt-1 w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 text-[9px]">
                    ✓
                  </span>
                  <p className="text-sm text-gray-600 leading-relaxed">{f}</p>
                </div>
              ))}
            </div>

            {/* Right: image */}
            <div className="relative h-[360px] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3-0LPOO13jGLIMaNgc6q6ebPVvsxFA0yh4LKjwBQoZ8mRiI2NZ8NSNB_Z&s=10"
                alt="Students at PCPS College"
                fill
                className="object-cover"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#08080f]/30 to-transparent" />
              <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">
                  University of Bedfordshire
                </p>
                <p className="text-sm font-bold text-gray-900">UK-Accredited Degree</p>
              </div>
            </div>
          </div>

          {/* Stat cards — shadow on default, red left border + deeper shadow on hover, stat stays dark */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {WHY_STATS.map(({ stat, label, sub }) => (
              <div
                key={stat}
                className="rounded-2xl border border-gray-100 bg-[#f7f7f5] px-6 py-6
                  shadow-[0_2px_12px_rgba(0,0,0,0.06)]
                  hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)]
                  hover:border-red-200
                  hover:bg-white
                  transition-all duration-300 group
                  relative overflow-hidden"
              >
                {/* Red left accent line — slides in on hover */}
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-500 rounded-l-2xl scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />
                <p className="text-3xl font-black text-gray-950 mb-1">
                  {stat}
                </p>
                <p className="text-sm font-semibold text-gray-800 mb-0.5">{label}</p>
                <p className="text-[11px] text-gray-400">{sub}</p>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── 5. BOOK A SESSION ────────────────────────────────────────────── */}
      <div className="bg-[#f7f7f5] py-20 px-5">
        <div className="mx-auto max-w-5xl">
          <SectionHeader
            eyebrow="Free Guidance"
            title="Not Sure Which Programme Fits?"
            subtitle="Book a free 30-minute guidance session with one of our academic advisors. No commitment, no pressure."
            center
          />

          <div className="grid md:grid-cols-2 gap-4 mb-4">

            {/* Call card */}
            <div className="border border-gray-100 rounded-2xl p-8 flex flex-col gap-5 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)] hover:border-gray-200 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                <Phone size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1.5">Call Us Directly</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  Speak with an admissions advisor who can walk you through
                  programme options based on your background and goals.
                </p>
                <a href="tel:+9779801102235" className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors">
                  <span>{"+977 9801102235"}</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>

            {/* Email card */}
            <div className="border border-gray-100 rounded-2xl p-8 flex flex-col gap-5 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)] hover:border-gray-200 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-red-50 text-red-500 flex items-center justify-center">
                <Mail size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1.5">Email an Advisor</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  Send your questions and we&apos;ll reply within one working day
                  with a tailored programme recommendation.
                </p>
                <a href="mailto:info@patancollege.edu.np" className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors">
                  info@patancollege.edu.np
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>

          </div>

          {/* CTA strip */}
          <div className="rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
            <div>
              <p className="text-[10px] font-bold text-red-400 uppercase tracking-[0.15em] mb-2">
                Free · 30 Minutes · No Commitment
              </p>
              <h3 className="text-xl font-black mb-1">Book a Guidance Session</h3>
              <p className="text-white/50 text-sm leading-relaxed max-w-md">
                Sit down (virtually or in person) with an advisor, walk through
                your options, and leave with a clear plan — before you apply.
              </p>
            </div>
            <a href="https://apply.patancollege.edu.np" target="_blank" rel="noreferrer" className="flex-shrink-0 inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-7 py-3.5 rounded-xl transition-colors duration-200 whitespace-nowrap">
              Book Free Session
              <ArrowRight size={14} />
            </a>
          </div>

        </div>
      </div>

    </div>
  );
}
