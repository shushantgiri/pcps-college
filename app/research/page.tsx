import { getArticles } from "@/lib/api";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "Research & Insights – PCPS College" };

export default async function ResearchPage() {
  const articles = await getArticles();
  return (
    <div className="py-20">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeader eyebrow="PCPS Research" title="Research & Insights"
          subtitle="Thought leadership and research from PCPS faculty, students, and alumni." />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a) => (
            <Link key={a.id} href={`/research/${a.slug}`}
              className="border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group">
              <div className="flex items-center gap-2 mb-4">
                <Badge>{a.category}</Badge>
                <span className="text-xs text-gray-400 font-semibold">{a.type}</span>
              </div>
              <h3 className="font-bold text-gray-900 text-base leading-snug mb-3 flex-1">{a.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-4">{a.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-4 border-t border-gray-100">
                <span>{formatDate(a.publishedAt)}</span>
                {a.readMinutes && <span className="flex items-center gap-1"><Clock size={11}/>{a.readMinutes} min</span>}
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-red-500 mt-3 group-hover:gap-2 transition-all">
                Read article <ArrowRight size={12}/>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
