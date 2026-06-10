// ─── COURSE ───────────────────────────────────────────────────────────────────
export interface Course {
  id: string;
  slug: string;
  title: string;           // e.g. "B.Sc. (Hons) Software Engineering"
  shortTitle: string;      // e.g. "Software Engineering"
  badge: string;           // e.g. "B.Sc. (Hons)"
  emoji: string;
  description: string;
  overview: string;
  duration: string;        // e.g. "3 Years"
  level: string;           // e.g. "Undergraduate"
  intakeMonths: string[];  // e.g. ["January", "September"]
  modules: CourseModule[];
  careerPaths: string[];
  imageUrl?: string;
}

export interface CourseModule {
  year: number;
  modules: string[];
}

// ─── EVENT ────────────────────────────────────────────────────────────────────
export interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;       // ISO 8601
  endDate?: string;
  location: string;
  category: string;        // e.g. "Industry Visit", "Sports", "Academic"
  imageUrl?: string;
  registrationUrl?: string;
}

// ─── RESEARCH / INSIGHT ───────────────────────────────────────────────────────
export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;        // e.g. "Artificial Intelligence", "Data"
  type: "Article" | "Research";
  author: string;
  publishedAt: string;     // ISO 8601
  imageUrl?: string;
  readMinutes?: number;
}

// ─── ALUMNI / TESTIMONIAL ─────────────────────────────────────────────────────
export interface Alumni {
  id: string;
  name: string;
  batch: number;           // e.g. 2019
  course: string;
  currentRole: string;
  currentCompany: string;
  country?: string;
  testimonial: string;
  avatarUrl?: string;
}

// ─── COLLABORATOR ─────────────────────────────────────────────────────────────
export interface Collaborator {
  id: string;
  name: string;
  logoUrl?: string;
  websiteUrl: string;
  category: string;        // e.g. "Fintech", "Technology", "Education"
}

// ─── NOTICE ───────────────────────────────────────────────────────────────────
export interface Notice {
  id: string;
  title: string;
  body: string;
  publishedAt: string;
  category: string;        // e.g. "Academic", "Admissions", "General"
  attachmentUrl?: string;
}

// ─── GALLERY ──────────────────────────────────────────────────────────────────
export interface GalleryItem {
  id: string;
  imageUrl: string;
  caption?: string;
  category: string;        // e.g. "Campus Life", "Events", "Sports"
}

// ─── STATS ────────────────────────────────────────────────────────────────────
export interface CollegeStats {
  activeAlumni: number;
  activeStudents: number;
  placementRate: number;   // percentage e.g. 96.2
  yearsOfExperience: number;
}
