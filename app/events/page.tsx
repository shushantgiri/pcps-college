import { getEvents } from "@/lib/api";
import { MapPin, Calendar } from "lucide-react";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";
import { formatDate, formatDateShort } from "@/lib/utils";

export const metadata = { title: "Events – PCPS College" };

const catColor: Record<string, "red" | "blue" | "green" | "gray"> = {
  "Industry Visit": "blue", Sports: "green", Academic: "red",
  "Guest Lecture": "blue", Ceremony: "gray",
};

export default async function EventsPage() {
  const events = await getEvents();
  return (
    <div className="py-20">
      <div className="mx-auto max-w-4xl px-5">
        <SectionHeader eyebrow="Events" title="What's happening at PCPS" />
        <div className="space-y-4">
          {events.map((e) => {
            const { day, month } = formatDateShort(e.startDate);
            const endDay = e.endDate ? formatDateShort(e.endDate).day : null;
            return (
              <div key={e.id} className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-shadow flex gap-6 items-start">
                <div className="text-center min-w-[60px] bg-red-50 rounded-xl py-3 px-2">
                  <div className="text-xs font-bold text-red-500 uppercase tracking-wider">{month}</div>
                  <div className="text-2xl font-black text-gray-900">{endDay ? `${day}–${endDay}` : day}</div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">{e.title}</h3>
                    <Badge color={catColor[e.category] ?? "gray"}>{e.category}</Badge>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed mb-3">{e.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-400 font-medium">
                    <span className="flex items-center gap-1"><Calendar size={12}/>{formatDate(e.startDate)}{e.endDate ? ` – ${formatDate(e.endDate)}` : ""}</span>
                    <span className="flex items-center gap-1"><MapPin size={12}/>{e.location}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
