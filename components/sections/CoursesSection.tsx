import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Course } from "@/types";

// ─── Course images ────────────────────────────────────────────────────────
const COURSE_IMAGE_MAP: Record<string, string> = {};

const KEYWORD_IMAGE_MAP: Record<string, string> = {
  computing:  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=900&q=90",
  software:   "https://plus.unsplash.com/premium_photo-1663075847012-c781e0d194ce?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y29tcHV0ZXIlMjBzdHVkZW50c3xlbnwwfHwwfHx8MA%3D%3D",
  data:       "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=90",
  cyber:      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&q=90",
  network:    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=900&q=90",
  ai:         "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=900&q=90",
  business:   "https://images.unsplash.com/photo-1599658880436-c61792e70672?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D  ",
  analytics:  "https://images.unsplash.com/photo-1599658880436-c61792e70672?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  marketing:  "https://images.unsplash.com/photo-1571677246347-5040036b95cc?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  design:     "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=900&q=90",
  default:    "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=900&q=90",
};

function getCourseImage(course: Course): string {
  if (COURSE_IMAGE_MAP[course.slug]) return COURSE_IMAGE_MAP[course.slug];
  const key = course.shortTitle?.trim().toLowerCase() ?? "";
  if (COURSE_IMAGE_MAP[key]) return COURSE_IMAGE_MAP[key];
  const titleLower = (course.shortTitle ?? "").toLowerCase();
  for (const [keyword, url] of Object.entries(KEYWORD_IMAGE_MAP)) {
    if (keyword !== "default" && titleLower.includes(keyword)) return url;
  }
  return KEYWORD_IMAGE_MAP.default;
}

// ─── Card ──────────────────────────────────────────────────────────────────
function CourseCard({ course, index }: { course: Course; index: number }) {
  const imgSrc = getCourseImage(course);

  return (
    <Link
      href={`/courses/${course.slug}`}
      className="course-card group"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Image */}
      <div className="card-image">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={course.shortTitle}
          className="card-img"
        />
        <div className="card-img-overlay" />

        {/* Badge */}
        {course.badge && (
          <span className="card-badge">{course.badge}</span>
        )}
      </div>

      {/* Body */}
      <div className="card-body">
        {/* Degree label */}
        <p className="card-degree">BSc (Hons)</p>

        {/* Programme name — strip "BSc (Hons)" prefix if present */}
        <h3 className="card-title">
          {course.shortTitle
            .replace(/^BSc\s*\(Hons\)\s*/i, "")
            .replace(/^B\.Sc\.\s*\(Hons\)\s*/i, "")}
        </h3>

        {/* Meta pills */}
        <div className="card-meta">
          {course.duration && (
            <span className="meta-pill">{course.duration}</span>
          )}
          {course.level && (
            <span className="meta-pill">{course.level}</span>
          )}
          <span className="meta-pill">UK Accredited</span>
        </div>

        {/* CTA */}
        <div className="card-cta">
          <span>View programme</span>
          <span className="cta-icon">
            <ArrowUpRight size={13} />
          </span>
        </div>
      </div>

      {/* Bottom red bar – slides in on hover */}
      <div className="card-bar" />
    </Link>
  );
}

// ─── Section ───────────────────────────────────────────────────────────────
export default function CoursesSection({ courses }: { courses: Course[] }) {
  return (
    <>
      <style>{`
        /* ── Section ── */
        .courses-section {
          position: relative;
          padding: 96px 0 104px;
          background: #f0f2f8;
          overflow: hidden;
        }

        /* Diagonal stripe accent — pure CSS, no image */
        .courses-section::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background:
            repeating-linear-gradient(
              -55deg,
              transparent,
              transparent 56px,
              rgba(26,26,46,0.025) 56px,
              rgba(26,26,46,0.025) 57px
            );
          pointer-events: none;
        }

        /* Right-edge colour shard */
        .courses-section::after {
          content: "";
          position: absolute;
          top: 0; right: -1px; width: 6px; height: 100%;
          background: linear-gradient(180deg, #e63946 0%, #1a1a2e 100%);
        }

        .courses-inner {
          position: relative;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ── Header ── */
        .courses-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 52px;
          flex-wrap: wrap;
        }

        .courses-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .eyebrow-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #e63946;
          flex-shrink: 0;
        }

        .eyebrow-text {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: #e63946;
        }

        .courses-title {
          font-size: clamp(26px, 3.5vw, 38px);
          font-weight: 800;
          color: #1a1a2e;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .courses-title em {
          font-style: normal;
          color: #e63946;
        }

        .courses-view-all {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 12.5px;
          font-weight: 700;
          color: #1a1a2e;
          border: 1.5px solid #1a1a2e;
          padding: 10px 20px;
          border-radius: 100px;
          text-decoration: none;
          transition: background 0.18s, color 0.18s;
          white-space: nowrap;
          flex-shrink: 0;
        }

        .courses-view-all:hover {
          background: #1a1a2e;
          color: #fff;
        }

        /* ── Grid ── */
        .courses-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        @media (max-width: 1100px) {
          .courses-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* ── Mobile: horizontal scrolling slides ── */
        @media (max-width: 600px) {
          .courses-grid {
            grid-template-columns: none;
            grid-auto-flow: column;
            grid-auto-columns: 82%;
            gap: 14px;
            overflow-x: auto;
            overflow-y: hidden;
            -webkit-overflow-scrolling: touch;
            scroll-snap-type: x mandatory;
            padding-bottom: 8px;
            margin: 0 -24px;
            padding-left: 24px;
            padding-right: 24px;
          }

          .courses-grid::-webkit-scrollbar {
            display: none;
          }

          .course-card {
            scroll-snap-align: start;
          }

          .course-card:first-child {
            margin-left: 24px;
          }

          .courses-header {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        /* ── Card ── */
        .course-card {
          position: relative;
          display: flex;
          flex-direction: column;
          background: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          text-decoration: none;
          border: 1px solid rgba(26,26,46,0.08);
          transition: transform 0.24s ease, box-shadow 0.24s ease, border-color 0.24s ease;
        }

        .course-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 48px rgba(26,26,46,0.12);
          border-color: rgba(26,26,46,0.0);
        }

        /* ── Image ── */
        .card-image {
          position: relative;
          height: 188px;
          overflow: hidden;
          background: #1a1a2e;
        }

        .card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.72;
          transition: opacity 0.4s ease, transform 0.5s ease;
        }

        .course-card:hover .card-img {
          opacity: 0.85;
          transform: scale(1.06);
        }

        .card-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 30%,
            rgba(26,26,46,0.65) 100%
          );
        }

        .card-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .14em;
          text-transform: uppercase;
          background: #e63946;
          color: #fff;
          padding: 4px 10px;
          border-radius: 100px;
        }

        /* ── Body ── */
        .card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 20px 20px 18px;
          gap: 6px;
        }

        .card-degree {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: #e63946;
          margin: 0;
        }

        .card-title {
          font-size: 16px;
          font-weight: 800;
          color: #1a1a2e;
          line-height: 1.3;
          letter-spacing: -0.01em;
          margin: 0 0 4px;
        }

        /* ── Meta pills ── */
        .card-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 2px;
        }

        .meta-pill {
          font-size: 10px;
          font-weight: 600;
          color: #6b7280;
          background: #f3f4f8;
          border: 1px solid #e5e7ef;
          padding: 3px 9px;
          border-radius: 100px;
        }

        /* ── CTA ── */
        .card-cta {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: auto;
          padding-top: 14px;
          font-size: 12.5px;
          font-weight: 700;
          color: #1a1a2e;
          border-top: 1px solid #f0f0f5;
        }

        .cta-icon {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #1a1a2e;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.18s, transform 0.18s;
          flex-shrink: 0;
        }

        .course-card:hover .cta-icon {
          background: #e63946;
          transform: translate(1px, -1px);
        }

        /* ── Bottom bar ── */
        .card-bar {
          height: 3px;
          background: linear-gradient(90deg, #e63946, #1a1a2e);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .course-card:hover .card-bar {
          transform: scaleX(1);
        }

        /* ── UK badge strip ── */
        .uk-strip {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 40px;
          justify-content: center;
        }

        .uk-strip-text {
          font-size: 11.5px;
          font-weight: 600;
          color: rgba(26,26,46,0.45);
          letter-spacing: .04em;
        }

        .uk-flag {
          font-size: 16px;
          line-height: 1;
        }

        .uk-divider {
          width: 1px;
          height: 14px;
          background: rgba(26,26,46,0.15);
        }
      `}</style>

      <section id="courses" className="courses-section">
        <div className="courses-inner">

          {/* ── Header ── */}
          <div className="courses-header">
            <div>
              <div className="courses-eyebrow">
                <span className="eyebrow-text">Our Programmes</span>
              </div>
              <h2 className="courses-title">
                Which programme is right for you?<br />
              </h2>
            </div>

            <Link href="/courses" className="courses-view-all">
              All programmes
              <ArrowUpRight size={13} />
            </Link>
          </div>

          {/* ── Grid ── */}
          <div className="courses-grid">
            {courses.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>

        </div>
      </section>
    </>
  );
}