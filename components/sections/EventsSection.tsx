import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import { formatDateShort } from "@/lib/utils";
import type { Event } from "@/types";

const categoryColor: Record<string, "red" | "blue" | "green" | "gray"> = {
  "Industry Visit": "blue",
  Sports: "green",
  Academic: "red",
  "Guest Lecture": "blue",
  Ceremony: "gray",
};

export default function EventsSection({ events }: { events: Event[] }) {
  return (
    <section className="bg-[#1a1a2e] py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <SectionHeader
            eyebrow="Upcoming Events"
            title="What's happening at PCPS"
            light
            className="mb-0"
          />
          <Link
            href="/events"
            className="flex items-center gap-1.5 text-sm font-semibold text-white/50 hover:text-white transition-colors shrink-0"
          >
            View all events <ArrowRight size={14} />
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {events.map((event) => {
            const { day, month } = formatDateShort(event.startDate);
            const endDay = event.endDate ? formatDateShort(event.endDate).day : null;
            return (
              <div
                key={event.id}
                className="flex items-center gap-5 bg-white/5 border border-white/10 rounded-xl px-5 py-4 hover:bg-white/8 transition-colors group"
              >
                {/* Date */}
                <div className="text-center min-w-[52px]">
                  <div className="text-xs font-bold text-red-400 uppercase tracking-wider">{month}</div>
                  <div className="text-2xl font-black text-white leading-tight">
                    {endDay ? `${day}–${endDay}` : day}
                  </div>
                </div>
                <div className="w-px h-10 bg-white/15 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-base">{event.title}</div>
                  <div className="flex items-center gap-1 text-xs text-white/40 mt-1">
                    <MapPin size={11} /> {event.location}
                  </div>
                </div>
                <Badge color={categoryColor[event.category] ?? "gray"} className="shrink-0 hidden sm:inline-block">
                  {event.category}
                </Badge>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
