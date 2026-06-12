import Link from "next/link";
import { Bell, ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { Notice } from "@/types";

const catColor: Record<string, "red" | "blue" | "green" | "gray"> = {
  Academic: "blue",
  Admissions: "green",
  General: "gray",
};

function isNew(dateStr: string) {
  return Date.now() - new Date(dateStr).getTime() < 7 * 24 * 60 * 60 * 1000;
}

export default function NoticesSection({ notices }: { notices: Notice[] }) {
  if (!notices.length) return null;

  return (
    <section className="py-14 sm:py-16 bg-white border-b border-gray-100">
      <div className="w-full px-4 sm:px-8 lg:px-12">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-[#1a1a2e]">
            <Bell size={18} className="text-[#e63946]" />
            <h2 className="text-lg sm:text-xl font-extrabold">Notices</h2>
          </div>
          <Link
            href="/notices"
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-400
                       hover:text-[#e63946] transition-colors group"
          >
            All notices
            <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform duration-150" />
          </Link>
        </div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
          {notices.map((n) => (
            <Link
              key={n.id}
              href={`/notices/${n.id}`}
              className="group flex flex-col gap-3 border border-gray-200 rounded-2xl
                         p-5 sm:p-6 hover:border-gray-300 hover:shadow-md
                         transition-all duration-200 bg-white"
            >
              {/* Meta row */}
              <div className="flex items-center gap-2 flex-wrap">
                <Badge color={catColor[n.category] ?? "gray"}>{n.category}</Badge>
                {isNew(n.publishedAt) && (
                  <span className="text-[10px] font-bold uppercase tracking-widest
                                   text-[#e63946] bg-red-50 border border-red-100
                                   px-2 py-0.5 rounded-full">
                    New
                  </span>
                )}
                <span className="ml-auto text-[11px] text-gray-400 whitespace-nowrap">
                  {formatDate(n.publishedAt)}
                </span>
              </div>

              {/* Title */}
              <h4 className="font-bold text-gray-900 text-[14px] sm:text-[15px] leading-snug
                             group-hover:text-[#e63946] transition-colors duration-150">
                {n.title}
              </h4>

              {/* Body */}
              <p className="text-[12.5px] sm:text-[13px] text-gray-500 leading-relaxed line-clamp-2 flex-1">
                {n.body}
              </p>

              {/* Read link */}
              <div className="flex items-center gap-1 text-[12px] font-semibold text-gray-400
                              group-hover:text-[#e63946] transition-colors duration-150 mt-auto">
                Read notice
                <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-150" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}