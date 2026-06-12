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
    <section className="bg-[#1a1a2e] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-10 xl:px-16">

        {/* ── Header row ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-8 sm:mb-10">
          <SectionHeader
            eyebrow="Upcoming Events"
            title="What's happening at PCPS"
            light
            className="mb-0"
          />
          <Link
            href="/events"
            className="flex items-center gap-1.5 text-sm font-semibold
                       text-white/50 hover:text-white transition-colors shrink-0
                       self-start sm:self-auto"
          >
            View all events <ArrowRight size={14} />
          </Link>
        </div>

        {/* ── Event list ── */}
        <div className="flex flex-col gap-2.5 sm:gap-3">
          {events.map((event) => {
            const { day, month } = formatDateShort(event.startDate);
            const endDay = event.endDate ? formatDateShort(event.endDate).day : null;

            return (
              <div
                key={event.id}
                className="flex items-center gap-3 sm:gap-5
                           bg-white/5 border border-white/10 rounded-xl
                           px-4 sm:px-5 py-3 sm:py-4
                           hover:bg-white/[0.08] transition-colors group"
              >
                {/* Date block */}
                <div className="text-center min-w-[44px] sm:min-w-[52px] shrink-0">
                  <div className="text-[10px] sm:text-xs font-bold text-red-400
                                  uppercase tracking-wider">
                    {month}
                  </div>
                  <div className="text-xl sm:text-2xl font-black text-white leading-tight">
                    {endDay ? `${day}–${endDay}` : day}
                  </div>
                </div>

                {/* Divider */}
                <div className="w-px h-8 sm:h-10 bg-white/15 shrink-0" />

                {/* Title + location */}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-sm sm:text-base
                                  truncate sm:whitespace-normal">
                    {event.title}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs
                                  text-white/40 mt-0.5 sm:mt-1">
                    <MapPin size={10} className="shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>

                {/* Badge — hidden on mobile, visible sm+ */}
                <Badge
                  color={categoryColor[event.category] ?? "gray"}
                  className="shrink-0 hidden sm:inline-flex text-[11px]"
                >
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