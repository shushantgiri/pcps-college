import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import type { CollegeStats } from "@/types";

export default function AboutSection({ stats }: { stats: CollegeStats }) {
  return (
    <section className="bg-gray-50 py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <SectionHeader
              eyebrow="About PCPS College"
              title="Nepal's Only On-Campus UK Degree Partnership"
              subtitle="PCPS College offers internationally recognised UK undergraduate programmes in Software Engineering, Business Management, Business Analytics, and Digital Marketing — in partnership with the University of Bedfordshire."
            />
            <Button href="/about">Learn More</Button>

            <div className="grid grid-cols-2 gap-4 mt-10">
              {[
                { num: `${stats.activeAlumni}+`,      label: "Active Alumni *" },
                { num: `${stats.activeStudents}+`,    label: "Active Students *" },
                { num: `${stats.placementRate}%`,     label: "Placement Rate *" },
                { num: `${stats.yearsOfExperience}+`, label: "Years of Experience" },
              ].map(({ num, label }) => (
                <div key={label} className="bg-white border-l-4 border-red-500 rounded-lg px-5 py-4">
                  <div className="text-2xl font-black text-gray-900">{num}</div>
                  <div className="text-xs text-gray-400 mt-1 font-medium">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual card */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] flex items-center justify-center">
              <span className="text-[10rem] font-black text-white/5 select-none">PCPS</span>
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-white/80 text-center p-8">
                <div className="text-5xl">🎓</div>
                <p className="text-lg font-bold">University of Bedfordshire</p>
                <p className="text-sm text-white/50">Official Academic Partner</p>
                <div className="flex gap-3 mt-2 flex-wrap justify-center">
                  {["Software Engineering", "Business Management", "Analytics", "Digital Marketing"].map(p => (
                    <span key={p} className="bg-white/10 border border-white/20 rounded-full px-3 py-1 text-xs font-semibold">{p}</span>
                  ))}
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-5 -right-5 bg-red-500 text-white rounded-2xl px-6 py-4 shadow-xl text-center">
              <div className="text-2xl font-black">#1</div>
              <div className="text-xs font-semibold opacity-80">UK Degree<br/>in Nepal</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
