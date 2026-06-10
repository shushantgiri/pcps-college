import { getCourses } from "@/lib/api";
import Link from "next/link";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata = { title: "Programmes – PCPS College" };

export default async function CoursesPage() {
  const courses = await getCourses();
  return (
    <div className="py-20">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Our Programmes"
          title="UK-Accredited Undergraduate Programmes"
          subtitle="All programmes are delivered in partnership with the University of Bedfordshire, UK."
        />
        <div className="grid md:grid-cols-2 gap-8">
          {courses.map((c) => (
            <Link key={c.id} href={`/courses/${c.slug}`}
              className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
              <div className="h-40 bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] flex items-center justify-center text-6xl">
                {c.emoji}
              </div>
              <div className="p-7 flex flex-col flex-1">
                <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-2">{c.badge}</p>
                <h2 className="text-xl font-extrabold text-gray-900 mb-3">{c.shortTitle}</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{c.description}</p>
                <div className="flex gap-4 text-xs text-gray-400 font-medium mb-5">
                  <span className="flex items-center gap-1"><Clock size={12}/> {c.duration}</span>
                  <span className="flex items-center gap-1"><Calendar size={12}/> {c.intakeMonths.join(", ")} intake</span>
                </div>
                <div className="mt-auto flex flex-wrap gap-2">
                  {c.careerPaths.slice(0,3).map(p => (
                    <span key={p} className="bg-gray-100 text-gray-600 text-xs font-medium px-3 py-1 rounded-full">{p}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-red-500 mt-5 group">
                  View programme <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
