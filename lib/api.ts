/**
 * api.ts
 *
 * Central data-access layer.
 * ─────────────────────────────────────────────────────
 * Right now every function returns mock data.
 * When the college backend is ready, replace the
 * mock imports with real fetch() calls to the URLs
 * documented in API_REQUIREMENTS.md.
 * ─────────────────────────────────────────────────────
 */

import {
  COURSES, EVENTS, ARTICLES, ALUMNI,
  COLLABORATORS, NOTICES, COLLEGE_STATS,
} from "./mockData";
import type {
  Course, Event, Article, Alumni,
  Collaborator, Notice, CollegeStats,
} from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

// Helper for when APIs are live
async function apiFetch<T>(path: string, fallback: T): Promise<T> {
  if (!BASE_URL) return fallback;
  try {
    const res = await fetch(`${BASE_URL}${path}`, { next: { revalidate: 60 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json() as Promise<T>;
  } catch {
    console.warn(`[api] falling back to mock for ${path}`);
    return fallback;
  }
}

// ─── STATS ────────────────────────────────────────────────────────────────────
export async function getStats(): Promise<CollegeStats> {
  return apiFetch<CollegeStats>("/api/stats", COLLEGE_STATS);
}

// ─── COURSES ──────────────────────────────────────────────────────────────────
export async function getCourses(): Promise<Course[]> {
  return apiFetch<Course[]>("/api/courses", COURSES);
}

export async function getCourse(slug: string): Promise<Course | null> {
  const all = await getCourses();
  return all.find((c) => c.slug === slug) ?? null;
}

// ─── EVENTS ───────────────────────────────────────────────────────────────────
export async function getEvents(limit?: number): Promise<Event[]> {
  try {
    const { client } = await import('./sanity')
    const data = await client.fetch(
      `*[_type == "event"] | order(date desc) {
        "id": _id,
        title,
        category,
        "startDate": date,
        "endDate": null,
        description,
        location,
        "imageUrl": image.asset->url
      }`,
      {},
      { next: { revalidate: 60 } }
    )
    return limit ? data.slice(0, limit) : data
  } catch {
    console.warn('[api] falling back to mock events')
    const all = await apiFetch<Event[]>('/api/events', EVENTS)
    return limit ? all.slice(0, limit) : all
  }
}

export async function getEvent(id: string): Promise<Event | null> {
  const all = await getEvents();
  return all.find((e) => e.id === id) ?? null;
}

// ─── ARTICLES / RESEARCH ──────────────────────────────────────────────────────
export async function getArticles(limit?: number): Promise<Article[]> {
  const all = await apiFetch<Article[]>("/api/articles", ARTICLES);
  return limit ? all.slice(0, limit) : all;
}

export async function getArticle(slug: string): Promise<Article | null> {
  const all = await getArticles();
  return all.find((a) => a.slug === slug) ?? null;
}

// ─── ALUMNI ───────────────────────────────────────────────────────────────────
export async function getAlumni(limit?: number): Promise<Alumni[]> {
  const all = await apiFetch<Alumni[]>("/api/alumni", ALUMNI);
  return limit ? all.slice(0, limit) : all;
}

// ─── COLLABORATORS ────────────────────────────────────────────────────────────
export async function getCollaborators(): Promise<Collaborator[]> {
  return apiFetch<Collaborator[]>("/api/collaborators", COLLABORATORS);
}

// ─── NOTICES ──────────────────────────────────────────────────────────────────
export async function getNotices(limit?: number): Promise<Notice[]> {
  try {
    const { client } = await import('./sanity')
    const data = await client.fetch(
      `*[_type == "notice"] | order(date desc) {
        "id": _id,
        title,
        category,
        "publishedAt": date,
        body,
        "attachmentUrl": attachment.asset->url
      }`,
      {},
      { next: { revalidate: 60 } }
    )
    return limit ? data.slice(0, limit) : data
  } catch {
    console.warn('[api] falling back to mock notices')
    const all = await apiFetch<Notice[]>('/api/notices', NOTICES)
    return limit ? all.slice(0, limit) : all
  }
}