"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import type { Collaborator } from "@/types";

// ─── All logos live in /public/images/ ────────────────────────────────────
// File naming: "khalti" -> /public/images/khalti.png -> served at /images/khalti.png
const LOCAL_LOGO_MAP: Record<string, string> = {
  "khalti":        "/images/khalti.png",
  "nas-it":        "/images/Nas-IT.png",
  "code himalaya": "/images/Code_himalaya.png",
  "idea studio":   "/images/dea_studio.png",
  "veda":          "/images/veda.png",
  "esewa":         "/images/esewa.png",
  "gokyo labs":    "/images/gokyo.png",
  // ← Add more: "company name": "/images/filename.png"
};

function getLogoSrc(name: string): string | null {
  const key = name.trim().toLowerCase();
  if (LOCAL_LOGO_MAP[key]) return LOCAL_LOGO_MAP[key];
  for (const [k, v] of Object.entries(LOCAL_LOGO_MAP)) {
    if (key.includes(k) || k.includes(key)) return v;
  }
  return null;
}

// ─── Initials fallback ─────────────────────────────────────────────────────
function Initials({ name }: { name: string }) {
  const letters = name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
  return (
    <span className="text-[15px] font-black tracking-tight text-gray-300 group-hover:text-gray-500 transition-colors duration-300">
      {letters || name.slice(0, 3).toUpperCase()}
    </span>
  );
}

// ─── Logo card ─────────────────────────────────────────────────────────────
function LogoCard({ c }: { c: Collaborator }) {
  const src = getLogoSrc(c.name);

  return (
    <a
      href={c.websiteUrl}
      target="_blank"
      rel="noreferrer"
      title={c.name}
      className="
        group relative flex-shrink-0
        flex flex-col items-center justify-center gap-2.5
        w-[172px] h-[96px] px-6
        bg-white
        border border-gray-100/80
        rounded-[18px]
        transition-all duration-300 ease-out
        hover:border-gray-200
        hover:shadow-[0_2px_20px_rgba(0,0,0,0.06),0_1px_4px_rgba(0,0,0,0.04)]
        hover:-translate-y-[3px]
      "
    >
      <div className="h-10 flex items-center justify-center">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={`${c.name} logo`}
            className="
              h-16 w-auto max-w-[120px] object-contain
              opacity-80
              group-hover:opacity-100
              transition-all duration-300 ease-out
            "
          />
        ) : (
          <Initials name={c.name} />
        )}
      </div>

      <span className="
        absolute bottom-0 left-1/2 -translate-x-1/2
        h-[2.5px] rounded-t-full bg-[#e63946]
        w-0 group-hover:w-12
        transition-all duration-300 ease-out
      " />
    </a>
  );
}

// ─── Marquee ───────────────────────────────────────────────────────────────
function Marquee({ collaborators }: { collaborators: Collaborator[] }) {
  const count = collaborators.length;
  const clones = count < 6 ? 4 : 2;
  const items = Array.from({ length: clones }, () => collaborators).flat();

  return (
    <div className="relative overflow-hidden select-none" aria-label="Partner logos">
      <div
        className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #f5f5f7 0%, transparent 100%)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #f5f5f7 0%, transparent 100%)" }}
      />

      <div
        className="flex gap-3.5 w-max"
        style={{
          paddingBlock: "14px",
          animation: `marquee-scroll ${Math.max(count * 3.5, 28)}s linear infinite`,
        }}
        onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
        onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
      >
        {items.map((c, i) => (
          <LogoCard key={`${c.id}-${i}`} c={c} />
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-${100 / clones}%); }
        }
      `}</style>
    </div>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────
export default function CollaboratorsSection({
  collaborators,
}: {
  collaborators: Collaborator[];
}) {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "#f5f5f7" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gray-200/70" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200/70" />

      <div className="relative mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Our Collaborations"
          title="Industry Partners"
          subtitle="Trusted by leading companies across fintech, banking, and technology — driving real-world opportunities for our graduates."
          center
        />

        <Marquee collaborators={collaborators} />

        <div className="mt-10 flex justify-center">
          <Button href="/about#collaborations" variant="ghost">
            Explore all collaborations →
          </Button>
        </div>
      </div>
    </section>
  );
}