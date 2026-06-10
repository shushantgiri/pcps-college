import Button from "@/components/ui/Button";
import type { CollegeStats } from "@/types";

interface Props { stats: CollegeStats }

export default function HeroSection({ stats }: Props) {
  return (
    <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-[#0f0f1a] via-[#16213e] to-[#0f3460] overflow-hidden">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-red-500/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-20 w-full">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 border border-red-400/40 bg-red-500/10 text-red-300 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-8">
            🇬🇧 UK Degree · University of Bedfordshire Partnership
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
            The Most{" "}
            <span className="text-red-400">Career Focused</span>{" "}
            UK Degree in Nepal.
          </h1>

          <p className="text-lg text-white/60 leading-relaxed mb-10 max-w-xl">
            PCPS College offers internationally recognised undergraduate programmes in Software Engineering, Business Management, Analytics &amp; Digital Marketing — the only on-campus UK degree in Nepal.
          </p>

          <div className="flex flex-wrap gap-4 mb-16">
            <Button href="https://apply.patancollege.edu.np" external size="lg">
              Enroll Now
            </Button>
            <Button href="/courses" variant="outline" size="lg" className="text-white border-white/30 hover:border-white">
              Explore Courses
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-x-10 gap-y-6">
            {[
              { num: `${stats.activeAlumni}+`,         label: "Active Alumni" },
              { num: `${stats.activeStudents}+`,       label: "Active Students" },
              { num: `${stats.placementRate}%`,        label: "Placement Rate" },
              { num: `${stats.yearsOfExperience}+`,    label: "Years Experience" },
            ].map(({ num, label }) => (
              <div key={label}>
                <div className="text-3xl font-black text-white leading-none">{num}</div>
                <div className="text-xs text-white/40 uppercase tracking-widest mt-1 font-semibold">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <div className="w-px h-12 bg-gradient-to-b from-white/0 to-white/30" />
        <span className="text-xs tracking-widest uppercase font-medium">Scroll</span>
      </div>
    </section>
  );
}
