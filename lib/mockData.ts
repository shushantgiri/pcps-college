import type { Course, Event, Article, Alumni, Collaborator, Notice, CollegeStats } from "@/types";

// ─── STATS ────────────────────────────────────────────────────────────────────
export const COLLEGE_STATS: CollegeStats = {
  activeAlumni: 800,
  activeStudents: 2500,
  placementRate: 96.2,
  yearsOfExperience: 10,
};

// ─── COURSES ──────────────────────────────────────────────────────────────────
export const COURSES: Course[] = [
  {
    id: "1",
    slug: "bsc-software-engineering",
    title: "B.Sc. (Hons) in Software Engineering",
    shortTitle: "Software Engineering",
    badge: "B.Sc. (Hons)",
    emoji: "💻",
    description: "Software engineering is central to the success of most modern businesses. This broad-based course covers the entire software engineering cycle.",
    overview: "This programme gives you the vocational skills you need to take on specialist roles, from developer or programmer to IT technical support. You'll work on real projects from day one, building a portfolio that employers recognise.",
    duration: "3 Years",
    level: "Undergraduate",
    intakeMonths: ["January", "September"],
    modules: [
      { year: 1, modules: ["Programming Fundamentals", "Web Technologies", "Database Systems", "Mathematics for Computing", "Professional Development"] },
      { year: 2, modules: ["Software Architecture", "Mobile Development", "Cloud Computing", "Agile & Scrum", "Networking Essentials"] },
      { year: 3, modules: ["Final Year Project", "Machine Learning", "DevOps", "Cybersecurity", "Entrepreneurship in Tech"] },
    ],
    careerPaths: ["Software Developer", "Full Stack Engineer", "DevOps Engineer", "IT Technical Lead", "Solutions Architect"],
  },
  {
    id: "2",
    slug: "bsc-business-management",
    title: "B.Sc. (Hons) in Business Management",
    shortTitle: "Business Management",
    badge: "B.Sc. (Hons)",
    emoji: "📊",
    description: "Equips you with knowledge, skills and professional competency to work confidently as a manager in a digitally dependent business environment.",
    overview: "Build your understanding and practical skills in general business management subjects such as strategy, policy design, innovation and entrepreneurship while exploring the business practices reshaping current business models.",
    duration: "3 Years",
    level: "Undergraduate",
    intakeMonths: ["January", "September"],
    modules: [
      { year: 1, modules: ["Business Environment", "Marketing Fundamentals", "Accounting Basics", "Organisational Behaviour", "Professional Skills"] },
      { year: 2, modules: ["Strategic Management", "Human Resource Management", "Financial Management", "Operations Management", "Business Law"] },
      { year: 3, modules: ["Business Research Project", "Innovation & Entrepreneurship", "Global Business", "Leadership", "Digital Transformation"] },
    ],
    careerPaths: ["Business Manager", "Operations Manager", "Entrepreneur", "Project Manager", "Management Consultant"],
  },
  {
    id: "3",
    slug: "bsc-business-management-business-analytics",
    title: "B.Sc. (Hons) BM with Business Analytics",
    shortTitle: "BM with Business Analytics",
    badge: "B.Sc. (Hons)",
    emoji: "📈",
    description: "Combines core business management principles with advanced analytics skills for data-driven decision making.",
    overview: "Students learn to leverage data-driven insights for strategic decision-making, developing expertise in statistical analysis, data visualization, and predictive modeling while building strong foundations in business strategy.",
    duration: "3 Years",
    level: "Undergraduate",
    intakeMonths: ["January", "September"],
    modules: [
      { year: 1, modules: ["Business Statistics", "Data Management", "Business Fundamentals", "Excel & Visualisation", "Professional Skills"] },
      { year: 2, modules: ["Predictive Analytics", "Business Intelligence Tools", "Data-Driven Strategy", "SQL & Databases", "Marketing Analytics"] },
      { year: 3, modules: ["Analytics Capstone Project", "Machine Learning for Business", "Big Data", "Consultancy Skills", "Ethics in Data"] },
    ],
    careerPaths: ["Business Analyst", "Data Analyst", "BI Developer", "Strategy Consultant", "Product Manager"],
  },
  {
    id: "4",
    slug: "bsc-business-management-digital-marketing",
    title: "B.Sc. (Hons) BM with Digital Marketing",
    shortTitle: "BM with Digital Marketing",
    badge: "B.Sc. (Hons)",
    emoji: "📱",
    description: "Equips students with knowledge, skills and professional competence to succeed as managers in digitally driven business environments.",
    overview: "Build strong foundations in core management areas such as strategy, policy design, innovation, and entrepreneurship, while examining the business practices and digital marketing strategies shaping modern organisations.",
    duration: "3 Years",
    level: "Undergraduate",
    intakeMonths: ["January", "September"],
    modules: [
      { year: 1, modules: ["Marketing Principles", "Social Media Marketing", "Content Creation", "Business Essentials", "Digital Tools"] },
      { year: 2, modules: ["SEO & SEM", "Email Marketing", "Brand Management", "Analytics & Metrics", "E-Commerce"] },
      { year: 3, modules: ["Digital Marketing Capstone", "Influencer & Video Marketing", "Marketing Strategy", "Global Digital Markets", "Startup Marketing"] },
    ],
    careerPaths: ["Digital Marketing Manager", "SEO Specialist", "Brand Manager", "Content Strategist", "Growth Hacker"],
  },
];

// ─── EVENTS ───────────────────────────────────────────────────────────────────
export const EVENTS: Event[] = [
  {
    id: "1",
    title: "Into the Industry: Jiri Edition",
    description: "An immersive industry visit taking students to Jiri to experience real-world professional environments and network with practitioners.",
    startDate: "2025-04-06",
    endDate: "2025-04-09",
    location: "Jiri, Dolakha",
    category: "Industry Visit",
  },
  {
    id: "2",
    title: "Sports Week",
    description: "Annual sports week featuring football, cricket, badminton, and more. A chance for students to compete, bond, and take a break from academics.",
    startDate: "2025-03-29",
    endDate: "2025-04-03",
    location: "PCPS College",
    category: "Sports",
  },
  {
    id: "3",
    title: "1st Demo Pitch",
    description: "Students present their semester projects to a panel of industry judges in a startup-style pitch competition.",
    startDate: "2025-03-27",
    location: "PCPS College",
    category: "Academic",
  },
  {
    id: "4",
    title: "Guest Lecture: AI in Finance",
    description: "Industry expert from Khalti delivers a lecture on how AI is reshaping the fintech landscape in Nepal and globally.",
    startDate: "2025-05-10",
    location: "PCPS College – Seminar Hall",
    category: "Guest Lecture",
  },
  {
    id: "5",
    title: "Graduation Ceremony 2025",
    description: "Celebrating the achievements of the graduating batch of 2025 with the University of Bedfordshire representatives.",
    startDate: "2025-06-20",
    location: "PCPS College",
    category: "Ceremony",
  },
];

// ─── ARTICLES / RESEARCH ──────────────────────────────────────────────────────
export const ARTICLES: Article[] = [
  {
    id: "1",
    slug: "how-agentic-ai-is-transforming-digital-business-models",
    title: "How Agentic AI Is Transforming Digital Business Models",
    excerpt: "An exploration of how autonomous AI agents are reshaping how companies operate, compete, and create value in the digital economy.",
    category: "Artificial Intelligence",
    type: "Article",
    author: "PCPS Research Team",
    publishedAt: "2025-02-15",
    readMinutes: 6,
  },
  {
    id: "2",
    slug: "predictive-analytics-forecasting-growth-nepals-small-businesses",
    title: "Predictive Analytics: Forecasting Growth for Nepal's Small Businesses",
    excerpt: "Applying data-driven forecasting methods to help small and medium enterprises in Nepal plan for sustainable growth.",
    category: "Data",
    type: "Article",
    author: "PCPS Research Team",
    publishedAt: "2025-01-20",
    readMinutes: 8,
  },
  {
    id: "3",
    slug: "why-is-zero-code-low-code-app-development-getting-popular",
    title: "Why is Zero Code / Low Code App Development getting popular?",
    excerpt: "An investigation into the rise of no-code and low-code platforms and what this means for the future of software development careers.",
    category: "Software Development",
    type: "Research",
    author: "PCPS Research Team",
    publishedAt: "2024-12-10",
    readMinutes: 5,
  },
];

// ─── ALUMNI ───────────────────────────────────────────────────────────────────
export const ALUMNI: Alumni[] = [
  {
    id: "1",
    name: "Bishwas Thapa Magar",
    batch: 2019,
    course: "Software Engineering",
    currentRole: "Business Architecture Analyst",
    currentCompany: "NSAA Securities Australia",
    country: "Australia",
    testimonial: "PCPS College has been the strongest foundation for my career. The internship opportunities I received from the very first year helped me gain industry-ready knowledge, which contributed significantly to my success even in a foreign country.",
  },
  {
    id: "2",
    name: "Sijan Tandukar",
    batch: 2024,
    course: "Software Engineering",
    currentRole: "Mid Level QA Engineer",
    currentCompany: "Varosa Technology",
    testimonial: "I feel proud to be a part of PCPS College, where the learning pedagogy LTW system is not only practical but also perfectly aligned with today's industry demands.",
  },
  {
    id: "3",
    name: "Bashu Shree Rayamajhi",
    batch: 2024,
    course: "Business Management",
    currentRole: "Marketing Associate",
    currentCompany: "Mero Job",
    testimonial: "From my very first semester at PCPS College, I was encouraged to think critically and present with confidence. I was even given the opportunity to present directly to professors in the UK.",
  },
  {
    id: "4",
    name: "Yaman Maharjan",
    batch: 2024,
    course: "Software Engineering",
    currentRole: "Software Developer",
    currentCompany: "Fintech Nepal",
    testimonial: "At PCPS College, I was able to gain hands-on practical knowledge that went beyond the classroom. The supportive environment allowed me to take on freelancing projects, explore my creative interests, and still manage academics effectively.",
  },
  {
    id: "5",
    name: "Shishab Shrestha",
    batch: 2024,
    course: "Software Engineering",
    currentRole: "CEO",
    currentCompany: "Lingo & Landscape",
    testimonial: "PCPS College gave me the rare opportunity to run my own business within the college premises. This experience taught me more than theory ever could — from managing operations to building confidence as an entrepreneur.",
  },
  {
    id: "6",
    name: "Niharika Shakya",
    batch: 2024,
    course: "Software Engineering",
    currentRole: "Associate Software Engineer",
    currentCompany: "Amnil Technologies",
    testimonial: "One of the biggest strengths of PCPS College is that it is run by IT professionals. I had the chance to learn directly from mentors with real industry experience, which gave me practical insights and confidence.",
  },
];

// ─── COLLABORATORS ────────────────────────────────────────────────────────────
export const COLLABORATORS: Collaborator[] = [
  { id: "1", name: "Khalti", websiteUrl: "https://khalti.com", category: "Fintech" },
  { id: "2", name: "Nabil Securities", websiteUrl: "https://nabilsecurities.com.np", category: "Finance" },
  { id: "3", name: "Code Himalaya", websiteUrl: "https://codehimalaya.com", category: "Technology" },
  { id: "4", name: "Idea Studio Nepal", websiteUrl: "https://ideastudio.org.np", category: "Innovation" },
  { id: "5", name: "Veda", websiteUrl: "https://veda-app.com", category: "Technology" },
  { id: "6", name: "eSewa", websiteUrl: "https://esewa.com.np", category: "Fintech" },
  { id: "7", name: "Gokyo Labs", websiteUrl: "https://gokyolabs.com", category: "Technology" },
];

// ─── NOTICES ──────────────────────────────────────────────────────────────────
export const NOTICES: Notice[] = [
  {
    id: "1",
    title: "Exam Schedule – Level 5, Semester 2",
    body: "The examination schedule for Level 5 Semester 2 has been published. Please check the student portal for your individual timetable.",
    publishedAt: "2025-03-01",
    category: "Academic",
  },
  {
    id: "2",
    title: "Admissions Open – January 2026 Intake",
    body: "Applications are now open for the January 2026 intake. Apply early to secure your seat. Scholarships available for meritorious students.",
    publishedAt: "2025-02-20",
    category: "Admissions",
  },
  {
    id: "3",
    title: "Library Timing Update",
    body: "The college library will now remain open until 7:00 PM on weekdays. Weekend access available by prior request.",
    publishedAt: "2025-02-10",
    category: "General",
  },
];
