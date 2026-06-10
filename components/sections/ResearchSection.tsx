import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import type { Article } from "@/types";

export default function ResearchSection({ articles }: { articles: Article[] }) {
  return (
    <section className="py-24 bg-gray-50">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <SectionHeader eyebrow="PCPS Research" title="Insights from our community" className="mb-0" />
          <Link href="/research" className="flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-red-500 transition-colors shrink-0">
            All articles <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/research/${article.slug}`}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="flex items-center gap-2 mb-4">
                <Badge>{article.category}</Badge>
                <span className="text-xs text-gray-400 font-semibold">{article.type}</span>
              </div>
              <h3 className="font-bold text-gray-900 text-base leading-snug mb-3 flex-1">
                {article.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4">{article.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-gray-400 mt-auto pt-4 border-t border-gray-100">
                <span>{formatDate(article.publishedAt)}</span>
                {article.readMinutes && (
                  <span className="flex items-center gap-1"><Clock size={11} />{article.readMinutes} min read</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
