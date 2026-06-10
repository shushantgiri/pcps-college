import Link from "next/link";
import { Bell, ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { Notice } from "@/types";

const catColor: Record<string, "red" | "blue" | "green" | "gray"> = {
  Academic: "blue", Admissions: "green", General: "gray",
};

export default function NoticesSection({ notices }: { notices: Notice[] }) {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 font-bold text-gray-900 text-lg">
            <Bell size={18} className="text-red-500" /> Notices
          </div>
          <Link href="/notices" className="flex items-center gap-1 text-sm font-semibold text-gray-400 hover:text-red-500 transition-colors">
            All notices <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {notices.map((n) => (
            <div key={n.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-3">
                <Badge color={catColor[n.category] ?? "gray"}>{n.category}</Badge>
                <span className="text-xs text-gray-400">{formatDate(n.publishedAt)}</span>
              </div>
              <h4 className="font-bold text-gray-900 text-sm mb-2">{n.title}</h4>
              <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{n.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
