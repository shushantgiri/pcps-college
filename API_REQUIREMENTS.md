# PCPS College Website – API Requirements

## Overview

This document lists all the REST API endpoints needed for the college website.
Currently the site runs on **mock/static data** (see `lib/mockData.ts`).

Once the college backend is ready, set the environment variable:
```
NEXT_PUBLIC_API_BASE_URL=https://api.patancollege.edu.np
```
The site will automatically switch from mock data to live API calls.

---

## Base URL
```
https://api.patancollege.edu.np   (production)
https://staging-api.patancollege.edu.np   (staging)
```

All responses must be **JSON** with `Content-Type: application/json`.
All list endpoints should support optional `?limit=N` and `?page=N` query params.

---

## 1. College Stats
**GET** `/api/stats`

Used on: Homepage hero, About page

Response:
```json
{
  "activeAlumni": 800,
  "activeStudents": 2500,
  "placementRate": 96.2,
  "yearsOfExperience": 10
}
```

---

## 2. Courses / Programmes
**GET** `/api/courses`

Used on: Homepage, Courses listing page

Response: Array of course objects
```json
[
  {
    "id": "1",
    "slug": "bsc-software-engineering",
    "title": "B.Sc. (Hons) in Software Engineering",
    "shortTitle": "Software Engineering",
    "badge": "B.Sc. (Hons)",
    "emoji": "💻",
    "description": "Short description (1–2 sentences)",
    "overview": "Longer paragraph for the course detail page",
    "duration": "3 Years",
    "level": "Undergraduate",
    "intakeMonths": ["January", "September"],
    "modules": [
      {
        "year": 1,
        "modules": ["Module Name", "Module Name", "..."]
      }
    ],
    "careerPaths": ["Role 1", "Role 2"],
    "imageUrl": "https://cdn.patancollege.edu.np/courses/se.jpg"
  }
]
```

**GET** `/api/courses/:slug`
Returns a single course object (same shape as above).

---

## 3. Events
**GET** `/api/events`
**GET** `/api/events?limit=4`   ← for homepage

Used on: Homepage events section, Events page

Response:
```json
[
  {
    "id": "1",
    "title": "Event Title",
    "description": "Full description",
    "startDate": "2025-04-06",
    "endDate": "2025-04-09",
    "location": "PCPS College / Off-campus",
    "category": "Industry Visit",
    "imageUrl": "https://cdn.patancollege.edu.np/events/jiri.jpg",
    "registrationUrl": "https://..."
  }
]
```

Categories used: `"Industry Visit"`, `"Sports"`, `"Academic"`, `"Guest Lecture"`, `"Ceremony"`

---

## 4. Research / Articles
**GET** `/api/articles`
**GET** `/api/articles/:slug`

Used on: Homepage research section, Research listing & detail pages

Response:
```json
[
  {
    "id": "1",
    "slug": "article-slug",
    "title": "Article Title",
    "excerpt": "Short summary (2–3 sentences)",
    "content": "Full HTML or Markdown content (for detail page)",
    "category": "Artificial Intelligence",
    "type": "Article",
    "author": "Author Name",
    "publishedAt": "2025-02-15",
    "imageUrl": "https://cdn...",
    "readMinutes": 6
  }
]
```

---

## 5. Alumni / Testimonials
**GET** `/api/alumni`
**GET** `/api/alumni?limit=6`

Used on: Homepage testimonials, About page

Response:
```json
[
  {
    "id": "1",
    "name": "Full Name",
    "batch": 2019,
    "course": "Software Engineering",
    "currentRole": "Business Architecture Analyst",
    "currentCompany": "NSAA Securities Australia",
    "country": "Australia",
    "testimonial": "Full testimonial text...",
    "avatarUrl": "https://cdn.patancollege.edu.np/alumni/name.jpg"
  }
]
```

---

## 6. Industry Collaborators
**GET** `/api/collaborators`

Used on: Homepage collaborations, About page

Response:
```json
[
  {
    "id": "1",
    "name": "Khalti",
    "logoUrl": "https://cdn.patancollege.edu.np/collab/khalti.png",
    "websiteUrl": "https://khalti.com",
    "category": "Fintech"
  }
]
```

---

## 7. Notices / Announcements
**GET** `/api/notices`
**GET** `/api/notices?limit=3`   ← for homepage

Used on: Homepage notices strip, Notices page

Response:
```json
[
  {
    "id": "1",
    "title": "Notice Title",
    "body": "Full notice text",
    "publishedAt": "2025-03-01",
    "category": "Academic",
    "attachmentUrl": "https://cdn.patancollege.edu.np/notices/doc.pdf"
  }
]
```

Categories: `"Academic"`, `"Admissions"`, `"General"`

---

## 8. Gallery (Future)
**GET** `/api/gallery`
**GET** `/api/gallery?category=Events`

Response:
```json
[
  {
    "id": "1",
    "imageUrl": "https://cdn.patancollege.edu.np/gallery/img.jpg",
    "caption": "Sports Week 2025",
    "category": "Sports"
  }
]
```

---

## 9. Contact / Enquiry (POST)
**POST** `/api/enquiry`

Used on: Admissions page contact form

Request body:
```json
{
  "name": "Student Name",
  "email": "student@email.com",
  "phone": "+977 98XXXXXXXX",
  "programme": "Software Engineering",
  "message": "I'd like to know more about..."
}
```

Response:
```json
{ "success": true, "message": "Your enquiry has been received." }
```

---

## CORS & Auth Requirements

- All **GET** endpoints must be **publicly accessible** (no auth required).
- The `POST /api/enquiry` endpoint may be protected with a simple API key or reCAPTCHA.
- Set `Access-Control-Allow-Origin: https://patancollege.edu.np` (and localhost for development).

## Image CDN

For production, serve images via a CDN (e.g. Cloudflare, AWS CloudFront) and return full CDN URLs in `imageUrl` / `logoUrl` / `avatarUrl` fields.

---

## How to enable live APIs in this project

1. Get the API base URL from the backend team.
2. Create a `.env.local` file in the project root:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://api.patancollege.edu.np
   ```
3. Restart the dev server (`npm run dev`).
4. The site will now fetch live data. Mock data is only used as fallback if the API is unreachable.
