import { getCourse, getCourses } from "@/lib/api";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Briefcase } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";

export async function generateStaticParams() {
  const courses = await getCourses();
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourse(slug);
  return { title: course ? `${course.title} – PCPS College` : "Course Not Found" };
}

export default async function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourse(slug);
  if (!course) notFound();

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] text-white py-20 px-5">
        <div className="mx-auto max-w-4xl">
          <Link href="/courses" className="flex items-center gap-2 text-white/50 hover:text-white text-sm font-medium mb-8 transition-colors">
            <ArrowLeft size={16}/> All Programmes
          </Link>
          <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3">{course.badge}</p>
          <div className="text-6xl mb-4">{course.emoji}</div>
          <h1 className="text-4xl md:text-5xl font-black leading-tight mb-5">{course.title}</h1>
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed mb-8">{course.overview}</p>
          <div className="flex flex-wrap gap-6 text-sm text-white/50 font-medium mb-8">
            <span className="flex items-center gap-2"><Clock size={14}/> {course.duration}</span>
            <span className="flex items-center gap-2"><Calendar size={14}/> Intake: {course.intakeMonths.join(", ")}</span>
            <span className="flex items-center gap-2"><Briefcase size={14}/> {course.level}</span>
          </div>
          <Button href="https://apply.patancollege.edu.np" external size="lg">Apply Now</Button>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-5 py-16">
        <div className="grid md:grid-cols-2 gap-16">
          {/* Modules */}
          <div>
            <h2 className="text-2xl font-extrabold mb-6">Programme Modules</h2>
            <div className="space-y-6">
              {course.modules.map((y) => (
                <div key={y.year}>
                  <h3 className="font-bold text-red-500 uppercase tracking-wider text-sm mb-3">Year {y.year}</h3>
                  <ul className="space-y-2">
                    {y.modules.map((m) => (
                      <li key={m} className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 rounded-lg px-4 py-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"/>
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Career paths */}
          <div>
            <h2 className="text-2xl font-extrabold mb-6">Career Paths</h2>
            <div className="flex flex-wrap gap-3">
              {course.careerPaths.map((p) => (
                <span key={p} className="bg-[#1a1a2e] text-white text-sm font-semibold px-4 py-2 rounded-full">{p}</span>
              ))}
            </div>

            <div className="mt-10 bg-red-50 border border-red-100 rounded-2xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">Ready to apply?</h3>
              <p className="text-sm text-gray-500 mb-4">Applications are open for January and September intake.</p>
              <Button href="https://apply.patancollege.edu.np" external>Apply Now</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
