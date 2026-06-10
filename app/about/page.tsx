import { getStats, getCollaborators, getAlumni } from "@/lib/api";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { getInitials } from "@/lib/utils";

export const metadata = { title: "About – PCPS College" };

export default async function AboutPage() {
  const [stats, collaborators, alumni] = await Promise.all([getStats(), getCollaborators(), getAlumni()]);
  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] text-white py-24 px-5 text-center">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-3">About PCPS</p>
          <h1 className="text-5xl font-black mb-5">Nepal's Most Career-Focused UK Degree</h1>
          <p className="text-white/60 text-lg leading-relaxed">
            PCPS College offers internationally recognised UK undergraduate programmes in partnership with the University of Bedfordshire — the only institution in Nepal offering an on-campus UK degree partnership.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-red-500 py-12">
        <div className="mx-auto max-w-5xl px-5 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {[
            { num: `${stats.activeAlumni}+`, label: "Active Alumni" },
            { num: `${stats.activeStudents}+`, label: "Active Students" },
            { num: `${stats.placementRate}%`, label: "Placement Rate" },
            { num: `${stats.yearsOfExperience}+`, label: "Years Experience" },
          ].map(({ num, label }) => (
            <div key={label}>
              <div className="text-4xl font-black">{num}</div>
              <div className="text-sm text-red-100 mt-1 font-semibold">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Story */}
      <div className="mx-auto max-w-4xl px-5 py-20">
        <SectionHeader eyebrow="Our Story" title="Built for professionals, by professionals" />
        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-4">
          <p>PCPS College was founded with a singular mission: to transform students with potential into amazing professionals. Located in Kandevatashan, Lalitpur, we are Nepal's only institution offering an on-campus UK degree in partnership with the University of Bedfordshire.</p>
          <p>Our programmes are designed and delivered by working IT and business professionals, ensuring every lesson is aligned with what the industry actually demands. From day one, students work on real projects, attend industry visits, and build relationships with employers who regularly recruit from PCPS.</p>
          <p>We believe education should open doors — globally. That's why our graduates are found at companies across Nepal, Australia, Europe, and beyond.</p>
        </div>
      </div>

      {/* Collaborators */}
      <div id="collaborations" className="bg-gray-50 py-20 px-5">
        <div className="mx-auto max-w-6xl">
          <SectionHeader eyebrow="Collaborations" title="Our Industry Partners" center />
          <div className="flex flex-wrap justify-center gap-4">
            {collaborators.map((c) => (
              <a key={c.id} href={c.websiteUrl} target="_blank" rel="noreferrer"
                className="bg-white border border-gray-200 rounded-xl px-6 py-3 font-bold text-gray-600 hover:shadow-md hover:-translate-y-0.5 transition-all text-sm">
                {c.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Alumni */}
      <div className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeader eyebrow="Alumni" title="Our Success Stories" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alumni.map((a) => (
            <div key={a.id} className="border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] text-white font-black flex items-center justify-center">
                  {getInitials(a.name)}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{a.name}</div>
                  <div className="text-xs text-gray-400">Batch of {a.batch} · {a.course}</div>
                </div>
              </div>
              <p className="text-sm text-gray-500 italic leading-relaxed mb-4 line-clamp-3">&ldquo;{a.testimonial}&rdquo;</p>
              <div className="text-xs font-semibold text-gray-700">{a.currentRole}</div>
              <div className="text-xs text-gray-400">{a.currentCompany}{a.country ? ` · ${a.country}` : ""}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#1a1a2e] text-white text-center py-20 px-5">
        <h2 className="text-4xl font-black mb-4">Ready to start your journey?</h2>
        <p className="text-white/50 mb-8">Applications are open for January and September intake.</p>
        <Button href="https://apply.patancollege.edu.np" external size="lg">Apply Now</Button>
      </div>
    </div>
  );
}
