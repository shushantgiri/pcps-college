import { getCourses, getEvents, getArticles, getAlumni, getCollaborators, getNotices, getStats } from "@/lib/api";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import CoursesSection from "@/components/sections/CoursesSection";
import EventsSection from "@/components/sections/EventsSection";
import ResearchSection from "@/components/sections/ResearchSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CollaboratorsSection from "@/components/sections/CollaboratorsSection";
import NoticesSection from "@/components/sections/NoticesSection";

export default async function HomePage() {
  const [stats, courses, events, articles, alumni, collaborators, notices] = await Promise.all([
    getStats(),
    getCourses(),
    getEvents(4),
    getArticles(3),
    getAlumni(),
    getCollaborators(),
    getNotices(3),
  ]);

  return (
    <>
      <HeroSection stats={stats} />
      <NoticesSection notices={notices} />
      <AboutSection stats={stats} />
      <CoursesSection courses={courses} />
      <EventsSection events={events} />
      <ResearchSection articles={articles} />
      <TestimonialsSection alumni={alumni} />
      <CollaboratorsSection collaborators={collaborators} />

      {/* Mission Banner */}
      <section className="bg-gradient-to-br from-[#0f0f1a] to-[#0f3460] py-24 text-center text-white">
        <div className="mx-auto max-w-3xl px-5">
          <p className="text-xs font-bold tracking-widest uppercase text-red-400 mb-3">The Mission</p>
          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-4">
            Transforming students with potential to amazing professionals
          </h2>
          <p className="text-white/50 text-lg">
            We believe every student has the capacity for greatness. Our programmes, mentors, and industry connections are here to unlock it.
          </p>
        </div>
      </section>
    </>
  );
}