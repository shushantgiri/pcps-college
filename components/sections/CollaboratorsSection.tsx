import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import type { Collaborator } from "@/types";

export default function CollaboratorsSection({ collaborators }: { collaborators: Collaborator[] }) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Our Collaborations"
          title="Industry Partners"
          subtitle="We collaborate with leading companies to drive innovation and provide internship and placement opportunities."
          center
        />

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {collaborators.map((c) => (
            <a
              key={c.id}
              href={c.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-white border border-gray-200 rounded-xl px-6 py-4 font-bold text-gray-600 hover:shadow-md hover:-translate-y-0.5 hover:text-gray-900 transition-all text-sm"
            >
              {c.name}
            </a>
          ))}
        </div>

        <div className="text-center">
          <Button href="/about#collaborations" variant="ghost">
            Explore all collaborations →
          </Button>
        </div>
      </div>
    </section>
  );
}
