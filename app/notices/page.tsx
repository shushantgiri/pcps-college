import { getNotices } from "@/lib/api";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";
import { formatDate } from "@/lib/utils";
import { Bell, Download } from "lucide-react";

export const metadata = { title: "Notices – PCPS College" };

const catColor: Record<string, "red" | "blue" | "green" | "gray"> = {
  Academic: "blue", Admissions: "green", General: "gray",
};

export default async function NoticesPage() {
  const notices = await getNotices();
  return (
    <div className="py-20">
      <div className="mx-auto max-w-3xl px-5">
        <SectionHeader eyebrow="Notices" title="Official Notices & Announcements" />
        <div className="space-y-4">
          {notices.map((n) => (
            <div key={n.id} className="border border-gray-200 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <Bell size={14} className="text-red-500"/>
                <Badge color={catColor[n.category] ?? "gray"}>{n.category}</Badge>
                <span className="text-xs text-gray-400 ml-auto">{formatDate(n.publishedAt)}</span>
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{n.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{n.body}</p>
              {n.attachmentUrl && (
                <a href={n.attachmentUrl} className="flex items-center gap-1.5 text-xs font-semibold text-red-500 mt-3">
                  <Download size={12}/> Download attachment
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
