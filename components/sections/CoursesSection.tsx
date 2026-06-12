import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Course } from "@/types";

// ─── Course image map ──────────────────────────────────────────────────────
// Add your image URLs here, mapped by course slug or shortTitle (lowercase).
const COURSE_IMAGE_MAP: Record<string, string> = {
  // "bsc-computing":            "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
  // "bsc-software-engineering": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
  // ← paste your image URLs here, keyed by slug
};

// Keyword-based fallbacks so every card always shows a relevant photo
const KEYWORD_IMAGE_MAP: Record<string, string> = {
  computing:  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&q=80",
  software:   "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&q=80",
  data:       "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
  cyber:      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
  network:    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
  ai:         "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
  business:   "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&q=80",
  design:     "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&q=80",
  default:    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&q=80",
};

function getCourseImage(course: Course): string {
  // 1. Explicit slug match
  if (COURSE_IMAGE_MAP[course.slug]) return COURSE_IMAGE_MAP[course.slug];

  // 2. Explicit shortTitle match
  const key = course.shortTitle?.trim().toLowerCase() ?? "";
  if (COURSE_IMAGE_MAP[key]) return COURSE_IMAGE_MAP[key];

  // 3. Keyword match in shortTitle
  const titleLower = (course.shortTitle ?? "").toLowerCase();
  for (const [keyword, url] of Object.entries(KEYWORD_IMAGE_MAP)) {
    if (keyword !== "default" && titleLower.includes(keyword)) return url;
  }

  return KEYWORD_IMAGE_MAP.default;
}

// ─── Card ──────────────────────────────────────────────────────────────────
function CourseCard({ course }: { course: Course }) {
  const imgSrc = getCourseImage(course);

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group flex flex-col bg-white border border-gray-100 rounded-[22px] overflow-hidden
                 transition-all duration-300 ease-out
                 hover:border-gray-200
                 hover:shadow-[0_16px_48px_rgba(0,0,0,0.10)]
                 hover:-translate-y-1.5"
    >
      {/* ── Image hero ── */}
      <div className="relative h-44 overflow-hidden bg-[#1a1a2e]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={course.shortTitle}
          className="w-full h-full object-cover opacity-90
                     group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Dark gradient so badge always stays readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/50 via-transparent to-transparent pointer-events-none" />

        {/* Badge pill */}
        {course.badge && (
          <span className="absolute top-3.5 left-3.5
                           text-[9.5px] font-extrabold uppercase tracking-[.14em]
                           bg-[#e63946] text-white
                           px-2.5 py-1 rounded-full shadow-sm">
            {course.badge}
          </span>
        )}
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="font-extrabold text-[15.5px] text-[#1a1a2e] leading-snug tracking-tight">
          {course.shortTitle}
        </h3>

        <p className="text-[13px] text-gray-400 leading-relaxed line-clamp-3 flex-1">
          {course.description}
        </p>

        {/* Metadata row */}
        <div className="flex items-center gap-3 pt-1">
          {course.duration && (
            <span className="text-[11px] font-semibold text-gray-400 bg-gray-50
                             border border-gray-100 px-2.5 py-1 rounded-full">
              {course.duration}
            </span>
          )}
          {course.level && (
            <span className="text-[11px] font-semibold text-gray-400 bg-gray-50
                             border border-gray-100 px-2.5 py-1 rounded-full">
              {course.level}
            </span>
          )}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-1.5 text-[13px] font-bold text-[#e63946]
                        group-hover:gap-2.5 transition-all duration-200 mt-1">
          Learn more
          <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-200" />
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-[3px] bg-gradient-to-r from-[#e63946] to-[#e63946]/30
                      scale-x-0 group-hover:scale-x-100 origin-left
                      transition-transform duration-300 ease-out" />
    </Link>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────
export default function CoursesSection({ courses }: { courses: Course[] }) {
  return (
    <section id="courses" className="py-24 relative"
      style={{ background: "linear-gradient(135deg, #f8f9ff 0%, #ffffff 50%, #fff6f6 100%)" }}
    >
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gray-100" />

      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Our Programmes"
          title="Which programme is right for you?"
          subtitle="UK-accredited undergraduate programmes designed around today's industry demands."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Bottom CTA — theme coloured */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                       bg-[#e63946] text-white text-[13px] font-bold
                       hover:bg-[#cc2f3c] hover:shadow-lg hover:shadow-[#e63946]/25
                       transition-all duration-200"
          >
            View all programmes
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}