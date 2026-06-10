"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { getInitials } from "@/lib/utils";
import type { Alumni } from "@/types";

export default function TestimonialsSection({ alumni }: { alumni: Alumni[] }) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + alumni.length) % alumni.length);
  const next = () => setIdx((i) => (i + 1) % alumni.length);
  const person = alumni[idx];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeader
          eyebrow="Success Stories"
          title="What our students say"
          center
        />

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {alumni.slice(0, 3).map((a) => (
            <div key={a.id} className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="text-4xl text-red-400 leading-none mb-3">&ldquo;</div>
              <p className="text-sm text-gray-600 leading-relaxed italic mb-5 line-clamp-4">{a.testimonial}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {getInitials(a.name)}
                </div>
                <div>
                  <div className="font-bold text-sm text-gray-900">{a.name}</div>
                  <div className="text-xs text-gray-400">{a.currentRole} · {a.currentCompany}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Spotlight carousel */}
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] rounded-3xl p-8 md:p-12 text-white text-center max-w-3xl mx-auto relative">
          <div className="text-5xl text-red-400 leading-none mb-4">&ldquo;</div>
          <p className="text-lg leading-relaxed text-white/80 mb-8">{person.testimonial}</p>
          <div className="flex flex-col items-center gap-1">
            <div className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center text-white font-black text-lg mb-2">
              {getInitials(person.name)}
            </div>
            <div className="font-bold text-lg">{person.name}</div>
            <div className="text-sm text-white/50">{person.currentRole} · {person.currentCompany}</div>
            <div className="text-xs text-white/30 mt-1">Batch of {person.batch}</div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-3 mt-6">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
              <ChevronLeft size={18} />
            </button>
            <div className="flex items-center gap-1.5">
              {alumni.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)} className={`w-2 h-2 rounded-full transition-colors ${i === idx ? "bg-red-400" : "bg-white/20"}`} />
              ))}
            </div>
            <button onClick={next} className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
