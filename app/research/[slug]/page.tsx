import { getArticle, getArticles } from "@/lib/api";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  return (
    <div className="py-20">
      <div className="mx-auto max-w-3xl px-5">
        <Link href="/research" className="flex items-center gap-2 text-gray-400 hover:text-gray-900 text-sm font-medium mb-8 transition-colors">
          <ArrowLeft size={16}/> All Articles
        </Link>
        <div className="flex items-center gap-2 mb-4">
          <Badge>{article.category}</Badge>
          <span className="text-xs text-gray-400 font-semibold">{article.type}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight mb-5">{article.title}</h1>
        <div className="flex flex-wrap gap-5 text-sm text-gray-400 font-medium mb-10 pb-8 border-b border-gray-200">
          <span className="flex items-center gap-1.5"><User size={14}/>{article.author}</span>
          <span className="flex items-center gap-1.5"><Calendar size={14}/>{formatDate(article.publishedAt)}</span>
          {article.readMinutes && <span className="flex items-center gap-1.5"><Clock size={14}/>{article.readMinutes} min read</span>}
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-gray-700 leading-relaxed">
          <p className="text-lg">{article.excerpt}</p>
          <p className="mt-6 text-gray-400 italic text-sm">
            Full article content will be available once the CMS API is connected. Contact the college administration to request API access.
          </p>
        </div>
      </div>
    </div>
  );
}
