import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Course } from "@/types";

export default function CoursesSection({ courses }: { courses: Course[] }) {
  return (
    <section id="courses" className="py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Our Programmes"
          title="Which programme is right for you?"
          subtitle="Four UK-accredited undergraduate programmes designed around today's industry demands."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.slug}`}
              className="group border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Card header */}
              <div className="h-36 bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] flex items-center justify-center text-5xl">
                {course.emoji}
              </div>

              {/* Card body */}
              <div className="p-5">
                <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2">{course.badge}</p>
                <h3 className="font-bold text-base text-gray-900 leading-snug mb-3">{course.shortTitle}</h3>
                <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">{course.description}</p>
                <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-red-500 group-hover:gap-2 transition-all">
                  Learn more <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
