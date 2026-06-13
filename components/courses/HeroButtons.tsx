"use client";

import { ArrowRight, ChevronDown } from "lucide-react";

interface HeroButtonsProps {
  applyHref: string;
}

export default function HeroButtons({ applyHref }: HeroButtonsProps) {
  function handleBrowse(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const target = document.getElementById("programmes");
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="flex gap-3 justify-center flex-wrap">
      {/* Apply Now */}
      <a
        href={applyHref}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600
          text-white text-sm font-bold px-7 py-3.5 rounded-lg
          transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
      >
        Apply Now
        <ArrowRight size={15} />
      </a>

      {/* Browse Programmes — smooth scrolls to #programmes */}
      <a
        href="#programmes"
        onClick={handleBrowse}
        className="inline-flex items-center gap-2 px-7 py-3 rounded-lg border
          border-white/20 text-white/65 hover:text-white hover:border-white/45
          text-sm font-semibold transition-all duration-200 hover:bg-white/5"
      >
        Browse Programmes
        <ChevronDown size={15} className="animate-bounce" />
      </a>
    </div>
  );
}