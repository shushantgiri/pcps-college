"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Users,
  Globe,
  Briefcase,
  GraduationCap,
  Building2,
  Handshake,
  CheckCircle2,
  ChevronRight,
  Star,
  Shield,
  Mail,
  ExternalLink,
  Megaphone,
  HeartHandshake,
  Calculator,
  Settings,
  Lock,
  Palette,
  Cpu,
  Zap,
  Rocket,
  BookOpen,
  ChevronLeft,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";

// ─── Types ────────────────────────────────────────────────────────────────────

type TabId = "why" | "uob" | "team" | "collab";

// ─── Why PCPS Data ────────────────────────────────────────────────────────────

const RECOGNITIONS = [
  {
    img: "/images/UOB.webp",
    title: "University of Bedfordshire",
    desc: "UK-accredited degrees, worldwide recognition",
  },
  {
    img: "/images/Ministry.png",
    title: "Ministry of Education",
    desc: "Academic Partnership Letter",
  },
  {
    img: "/images/tu.png",
    title: "TU Equivalency",
    desc: "Letter of Equivalence",
  },
];

const LEADERS = [
  {
    name: "Er. Pankaj Jalan",
    role: "Chairman, LBEF Group",
    img: "/images/pankaj.webp",
    quote:
      "Our college is committed to providing high-quality education through the University of Bedfordshire, UK — enabling students to match international standards through practical, accredited learning.",
  },
  {
    name: "Er. Prakash Kumar Kejriwal",
    role: "Executive Director",
    img: "/images/prakash.webp",
    quote:
      "Acquiring a certificate is not enough today — expertise is a must. We strive to give our youth the best preparation for careers and life, believing education is for life, not just for a living.",
  },
  {
    name: "Rebecca Bunting",
    role: "Vice-Chancellor, UoB",
    img: "/images/rebecca.webp",
    quote:
      "The University of Bedfordshire is a place to grow academically and socially. Our record of nurturing future talent spans more than 100 years, and we warmly welcome every PCPS student.",
  },
];

// ─── UoB Data ─────────────────────────────────────────────────────────────────

const UOB_STATS = [
  { num: "20,000+", label: "Students enrolled", sub: "from 100+ countries" },
  { num: "Top 15%", label: "UK university ranking", sub: "Guardian Guide 2026" },
  { num: "91%", label: "Graduate employment", sub: "within 15 months" },
  { num: "1884", label: "Year established", sub: "140+ years of excellence" },
];

const UOB_HIGHLIGHTS = [
  {
    icon: Globe,
    title: "Global recognition",
    desc: "UoB degrees are recognised by employers and institutions across 190+ countries.",
  },
  {
    icon: Briefcase,
    title: "Employability focus",
    desc: "Ranked in the UK's top 30 for teaching quality and student feedback by The Times and Guardian.",
  },
  {
    icon: Shield,
    title: "Quality assured",
    desc: "All programmes are validated under UK higher education standards and QAA frameworks.",
  },
  {
    icon: Star,
    title: "1st for Learning",
    desc: "Ranked 1st for learning opportunities among universities in the East of England — NSS 2025.",
  },
];

const UOB_AWARDS = [
  {
    img: "https://www.exeter.ac.uk/v8media/departments/wicc/UMHC_Award_logo.JPG",
    title: "University Mental Health Charter Award",
    desc: "Recognised for outstanding student wellbeing support and mental health initiatives.",
  },
  {
    img: "https://www.bedfordtoday.co.uk/webimg/b25lY21zOmI1Yjc2MzEyLTAyOWMtNDRkMi05MmMyLTcwOTI0MDI5MmU4MDpjZWZlY2U3Yi01YWY5LTQ1ZjYtYjA1NS05Y2Y5NDdkZjc4MzQ=.jpg?width=1200&height=640&fit=crop",
    title: "Bronze Award — Race Equality Charter",
    desc: "Committed to improving representation, progression, and success for minority ethnic staff and students.",
  },
];

// ─── Team Data ────────────────────────────────────────────────────────────────

type TeamMember = {
  name: string;
  role: string;
  img: string | null;
  isLead?: boolean;
  quote?: string;
};

type TeamGroup = {
  id: string;
  label: string;
  icon: React.ElementType;
  coverImg: string;
  members: TeamMember[];
};

const TEAM_GROUPS: TeamGroup[] = [
  {
    id: "board",
    label: "Board",
    icon: Star,
    coverImg: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600&q=80",
    members: [
      {
        name: "Dr. Rajendra Shrestha",
        role: "Principal & Academic Director",
        img: null,
        isLead: true,
        quote: "Our mission: every student leaves PCPS more capable, connected, and confident.",
      },
      { name: "Sunita Pradhan", role: "Board Chairperson", img: null },
      { name: "Arun Karki", role: "Board Secretary", img: null },
    ],
  },
  {
    id: "academic",
    label: "Academic",
    icon: GraduationCap,
    coverImg: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
    members: [
      {
        name: "Priya Maharjan",
        role: "Head of Business Programmes",
        img: null,
        isLead: true,
        quote: "We teach business the way it actually works — through real cases and real decisions.",
      },
      { name: "Suresh Thapa", role: "Head of IT Programmes", img: null },
      { name: "Laxmi Gurung", role: "Senior Lecturer – Analytics", img: null },
      { name: "Roshan Poudel", role: "Lecturer – Software Engineering", img: null },
      { name: "Deepa Adhikari", role: "Lecturer – Digital Marketing", img: null },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: Megaphone,
    coverImg: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    members: [
      {
        name: "Sita Rai",
        role: "Head of Marketing & Admissions",
        img: null,
        isLead: true,
        quote: "We make sure every student finds the programme that's truly right for them.",
      },
      { name: "Nisha Shrestha", role: "Digital Marketing Specialist", img: null },
      { name: "Hari Bhandari", role: "Brand & Creative Lead", img: null },
    ],
  },
  {
    id: "hr",
    label: "HR",
    icon: HeartHandshake,
    coverImg: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80",
    members: [
      {
        name: "Anita Karmacharya",
        role: "Head of People & Culture",
        img: null,
        isLead: true,
        quote: "A great student experience starts with a great team. We hire for passion, train for excellence.",
      },
      { name: "Sandesh Tamang", role: "HR Officer", img: null },
    ],
  },
  {
    id: "finance",
    label: "Finance",
    icon: Calculator,
    coverImg: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
    members: [
      {
        name: "Bikash Pandey",
        role: "Head of Finance",
        img: null,
        isLead: true,
        quote: "Financial sustainability lets us keep investing in the student experience that sets PCPS apart.",
      },
      { name: "Mina Dhakal", role: "Finance Officer", img: null },
    ],
  },
  {
    id: "operations",
    label: "Operations",
    icon: Settings,
    coverImg: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    members: [
      {
        name: "Ramesh Bajracharya",
        role: "Head of Operations",
        img: null,
        isLead: true,
        quote: "Every detail of campus life is designed so students can focus on learning without friction.",
      },
      { name: "Kavita Limbu", role: "Campus Operations Officer", img: null },
      { name: "Nabin Shrestha", role: "IT & Infrastructure Lead", img: null },
    ],
  },
];

// ─── Collaboration Data ───────────────────────────────────────────────────────

const TECH_PARTNERS = [
  {
    name: "AWS Education",
    logo: "https://www.logo.wine/a/logo/Amazon_Web_Services/Amazon_Web_Services-Logo.wine.svg",
    url: "#",
    tag: "Cloud",
    benefit: "Free AWS certification pathway",
  },
  {
    name: "Microsoft",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/3840px-Microsoft_logo.svg.png",
    url: "#",
    tag: "Platform",
    benefit: "Azure credits + M365 for all students",
  },
  {
    name: "Google",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
    url: "#",
    tag: "Platform",
    benefit: "Google certification access",
  },
  {
    name: "Programiz Pro",
    logo: "https://pbs.twimg.com/profile_images/1167039511471112192/r9EdeXKQ_400x400.jpg",
    url: "#",
    tag: "EdTech",
    benefit: "Full platform access included",
  },
];

const STRATEGIC_PARTNERS = [
  {
    name: "Code Himalaya",
    logo: "/collab/1756781826_collab-3.png",
    url: "https://codehimalaya.com",
    desc: "Digital transformation consultancy offering internships, job placements, and idea incubation for PCPS students.",
    tag: "Technology",
    benefit: "Internship & placement pipeline",
  },
  {
    name: "Idea Studio Nepal",
    logo: "/collab/1756781899_collab-4.png",
    url: "https://ideastudio.org.np",
    desc: "Social innovation platform delivering hands-on training, mentorship bootcamps, and entrepreneur workshops on campus.",
    tag: "Innovation",
    benefit: "Monthly innovation workshops",
  },
  {
    name: "NAS-IT",
    logo: "/collab/1756781867_collab-2.png",
    url: "https://nabilsecurities.com.np",
    desc: "Nepal's IT industry body driving placement support, workforce development, and curriculum alignment.",
    tag: "Industry Body",
    benefit: "Curriculum co-design",
  },
];

const NON_CREDIT_COURSES = [
  {
    icon: Cpu,
    title: "IoT (Internet of Things)",
    img: "/img/non-credit/iot.png",
    desc: "Connected devices, sensors, and cloud platforms — build real IoT solutions.",
    tags: ["Hardware", "Cloud", "Protocols"],
  },
  {
    icon: Lock,
    title: "Cybersecurity",
    img: "/img/non-credit/Cybersecurity_certiprof.webp",
    desc: "Risk, ethics, and defense fundamentals for protecting digital systems.",
    tags: ["Security", "Networks", "Ethics"],
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    img: "/img/non-credit/ux-ui-small-00.png",
    desc: "User research, wireframing, and usability design for digital products.",
    tags: ["Figma", "Research", "Prototyping"],
  },
];

const FULL_PARTNER_LOGOS = [
  { name: "Khalti", logo: "https://www.ntc.net.np/_nuxt/img/khalti-ime-logo.19231eb.png", url: "https://khalti.com" },
  { name: "NAS-IT", logo: "/images/Nas-IT.png", url: "https://nabilsecurities.com.np" },
  { name: "Code Himalaya", logo: "/images/Code_himalaya.png", url: "https://codehimalaya.com" },
  { name: "Idea Studio Nepal", logo: "/images/dea_studio.png", url: "https://ideastudio.org.np" },
  { name: "Veda", logo: "/images/veda.png", url: "https://veda-app.com" },
  { name: "eSewa", logo: "/images/esewa.png", url: "https://esewa.com.np" },
  { name: "Gokyo Labs", logo: "/images/gokyo.png", url: "https://gokyolabs.com" },
];

// ─── Tab config ───────────────────────────────────────────────────────────────

const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "why", label: "Why PCPS?", icon: Rocket },
  { id: "uob", label: "About UoB", icon: Building2 },
  { id: "team", label: "Our Team", icon: Users },
  { id: "collab", label: "Collaboration & Training", icon: Handshake },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

// ─── TeamCard ─────────────────────────────────────────────────────────────────

function TeamCard({ member, group }: { member: TeamMember; group: TeamGroup }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative rounded-2xl overflow-hidden cursor-default select-none group"
      style={{ aspectRatio: "3/4" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="absolute inset-0">
        <Image
          src={group.coverImg}
          alt={group.label}
          fill
          className="object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e]/80 to-[#0f3460]/80" />
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center p-5">
        {member.img ? (
          <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 ring-4 ring-white/30 shadow-xl">
            <Image src={member.img} alt={member.name} fill className="object-cover" unoptimized />
          </div>
        ) : (
          <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center mb-4 text-white font-black text-xl shadow-lg">
            {getInitials(member.name)}
          </div>
        )}
        <p className="text-white font-bold text-sm text-center leading-snug drop-shadow">{member.name}</p>
        <p className="text-white/75 text-xs text-center mt-1 leading-tight">{member.role}</p>
        {member.isLead && (
          <span className="mt-3 text-[10px] font-bold bg-red-500/80 text-white px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm border border-red-400/30">
            Team Lead
          </span>
        )}
      </div>

      {member.isLead && member.quote && (
        <div
          className={[
            "absolute inset-0 flex flex-col items-center justify-center p-6",
            "bg-[#08080f]/92 backdrop-blur-md transition-all duration-300",
            "[@media(hover:none)]:hidden",
            hovered ? "opacity-100" : "opacity-0 pointer-events-none",
          ].join(" ")}
        >
          <div className="w-8 h-[2px] bg-red-400 mb-4" />
          <p className="text-white/90 text-xs leading-relaxed text-center italic mb-4">
            &ldquo;{member.quote}&rdquo;
          </p>
          <p className="text-red-400 text-[10px] font-bold uppercase tracking-wider">{member.name}</p>
        </div>
      )}
    </div>
  );
}

// ─── Mobile Team Carousel ─────────────────────────────────────────────────────

function MobileTeamCarousel({ group }: { group: TeamGroup }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {group.members.map((member) => (
          <div key={member.name} className="snap-start flex-shrink-0 w-[56vw] max-w-[220px]">
            <TeamCard member={member} group={group} />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-1.5 mt-3">
        {group.members.map((m) => (
          <div key={m.name} className="w-1.5 h-1.5 rounded-full bg-gray-300" />
        ))}
      </div>
    </div>
  );
}

// ─── Tab panels ───────────────────────────────────────────────────────────────

function WhyTab() {
  return (
    <div>
      {/* Intro */}
      <div className="grid lg:grid-cols-2 gap-10 items-center mb-20">
        <div className="relative h-[380px] lg:h-[460px] rounded-2xl overflow-hidden shadow-lg order-last lg:order-first">
          <Image
            src="/images/college.jpg"
            alt="PCPS College students"
            fill
            className="object-cover object-top"
            unoptimized
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f3460]/70 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Est. 2014</p>
            <p className="text-sm font-bold text-gray-900">Kandevatashan, Lalitpur</p>
          </div>
        </div>

        <div>
          <p className="text-[10px] font-bold text-red-500 uppercase tracking-[0.18em] mb-3">
            About PCPS College
          </p>
          <h2 className="text-4xl font-black text-gray-950 leading-tight mb-5">
            The most career-focused
            <br />
            UK degree in Nepal
          </h2>
          <p className="text-gray-500 text-base leading-relaxed mb-5">
            PCPS College — Patan College for Professional Studies — is Nepal&apos;s most career-focused UK degree institution. Proudly part of the Lord Buddha Education Foundation, Nepal&apos;s pioneering IT institution since 1998.
          </p>
          <p className="text-gray-500 text-base leading-relaxed mb-8">
            We offer internationally recognised UK undergraduate programmes in IT, Business, Business Analytics, and Digital Marketing — with a practical learning pedagogy and industry collaborations that put you ahead.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            {[
              { num: "800+", label: "Alumni" },
              { num: "2500+", label: "Students" },
              { num: "10+", label: "Years" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl font-black text-gray-950">{num}</p>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">{label}</p>
              </div>
            ))}
          </div>
          <a
            href="https://apply.patancollege.edu.np"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-7 py-3.5 rounded-xl transition-colors duration-200"
          >
            Apply Now <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* Recognition */}
      <div className="mb-20">
        <SectionHeader eyebrow="Approval & Recognition" title="Backed by official letters of approval" />
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {RECOGNITIONS.map(({ img, title, desc }) => (
            <div
              key={title}
              className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)] hover:border-red-200 transition-all duration-300 group"
            >
              <div className="relative h-44 bg-[#f7f7f5] flex items-center justify-center overflow-hidden p-6">
                <Image
                  src={img}
                  alt={title}
                  fill
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                  loading="lazy"
                />
              </div>
              <div className="p-5 border-t border-gray-50">
                <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PCPS Upstart */}
      <div className="mb-20 rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <div className="grid lg:grid-cols-2">
          <div className="p-10 flex flex-col justify-center">
            <p className="text-[10px] font-bold text-red-500 uppercase tracking-[0.18em] mb-3">
              PCPS Upstart
            </p>
            <h3 className="text-2xl font-black text-gray-950 mb-4">
              Nepal&apos;s biggest college seed funding event
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              NPR 1 crore in seed funding — exclusively for PCPS students. Mentorship from industry experts, networking with investors, and strategic guidance to scale your startup from campus to market.
            </p>
            <div className="flex gap-3">
              <div className="rounded-xl bg-red-50 px-5 py-3 text-center">
                <p className="text-xl font-black text-red-500">1 Cr</p>
                <p className="text-[10px] text-gray-400 font-semibold">Seed Funding</p>
              </div>
              <div className="rounded-xl bg-gray-50 px-5 py-3 text-center">
                <p className="text-xl font-black text-gray-900">Expert</p>
                <p className="text-[10px] text-gray-400 font-semibold">Mentorship</p>
              </div>
            </div>
          </div>
          <div className="relative h-64 lg:h-auto min-h-[280px]">
            <Image
              src="/images/upstart.webp"
              alt="PCPS Upstart"
              fill
              className="object-cover object-center"
              unoptimized
              loading="lazy"
            />
          </div>
        </div>
      </div>

      {/* Leaders */}
      <div className="mb-16">
        <SectionHeader eyebrow="Leadership" title="Words from our leaders" />
        <div className="grid md:grid-cols-3 gap-5 mt-10">
          {LEADERS.map(({ name, role, img, quote }) => (
            <div
              key={name}
              className="border border-gray-100 rounded-2xl p-6 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)] hover:border-red-200 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-500 rounded-l-2xl scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />
              <div className="flex items-center gap-3 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-gray-100">
                  <Image src={img} alt={name} fill className="object-cover" unoptimized loading="lazy" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm leading-tight">{name}</p>
                  <p className="text-[11px] text-gray-400">{role}</p>
                </div>
              </div>
              <div className="w-6 h-[2px] bg-red-400 mb-3" />
              <p className="text-sm text-gray-500 leading-relaxed italic">&ldquo;{quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
        <div>
          <p className="text-[10px] font-bold text-red-400 uppercase tracking-[0.15em] mb-2">
            Nepal&apos;s Only On-Campus UK Degree
          </p>
          <h3 className="text-xl font-black mb-1">Start your journey at PCPS</h3>
          <p className="text-white/50 text-sm max-w-md">
            January &amp; September intake. Apply online in minutes.
          </p>
        </div>
        <a
          href="https://apply.patancollege.edu.np"
          target="_blank"
          rel="noreferrer"
          className="flex-shrink-0 inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-7 py-3.5 rounded-xl transition-colors duration-200 whitespace-nowrap"
        >
          Apply Now <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}

function UoBTab() {
  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-10 items-center mb-20">
        <div>
          <p className="text-[10px] font-bold text-red-500 uppercase tracking-[0.18em] mb-3">
            Our Academic Partner
          </p>
          <h2 className="text-4xl font-black text-gray-950 leading-tight mb-5">
            University of
            <br />
            Bedfordshire, UK
          </h2>
          <p className="text-gray-500 text-base leading-relaxed mb-5">
            A public research university with campuses across Luton, Bedford, Aylesbury, and Milton Keynes — established in 1884, renowned for employability, global outlook, and applied research.
          </p>
          <p className="text-gray-500 text-base leading-relaxed mb-6">
            PCPS College is an approved international partner delivering UoB programmes on campus in Lalitpur. Every PCPS graduate receives the same degree certificate as a UK campus student.
          </p>
          <div className="grid grid-cols-2 gap-3 mb-8">
            {UOB_STATS.slice(0, 4).map(({ num, label, sub }) => (
              <div key={num} className="rounded-xl border border-gray-100 bg-white px-4 py-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)]">
                <p className="text-xl font-black text-gray-950 mb-0.5">{num}</p>
                <p className="text-xs font-semibold text-gray-700 mb-0.5">{label}</p>
                <p className="text-[10px] text-gray-400">{sub}</p>
              </div>
            ))}
          </div>
          <a
            href="https://www.beds.ac.uk"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 transition-colors"
          >
            Visit beds.ac.uk <ExternalLink size={13} />
          </a>
        </div>

        <div className="relative h-[380px] lg:h-[460px] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&q=80"
            alt="University of Bedfordshire campus"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#08080f]/30 to-transparent" />
          <div className="absolute bottom-5 left-5 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
            <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-0.5">Est. 1884</p>
            <p className="text-sm font-bold text-gray-900">Luton, United Kingdom</p>
          </div>
        </div>
      </div>

      <div className="mb-20 rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <p className="text-[10px] font-bold text-red-500 uppercase tracking-[0.18em] mb-3">
          Partnership &amp; Accreditation
        </p>
        <h3 className="text-2xl font-black text-gray-950 mb-4">Formally approved — fully aligned</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-2xl">
          All University of Bedfordshire programmes at PCPS are delivered under formal academic partnership arrangements, aligned with UoB&apos;s academic regulations, quality standards, and assessment frameworks.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            "Same degree certificate as UK campus graduates",
            "91% of graduates in employment within 15 months",
            "Top 15% of UK universities — Guardian Guide 2026",
            "Rated 'Good' by Ofsted for apprenticeships",
            "1st for learning opportunities in East England — NSS 2025",
            "2nd for Student Voice — NSS 2025",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle2 size={16} className="text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-600">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-20">
        <SectionHeader eyebrow="Key Highlights" title="Why the UoB partnership matters" />
        <div className="grid sm:grid-cols-2 gap-4 mt-10">
          {UOB_HIGHLIGHTS.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="border border-gray-100 rounded-2xl p-6 flex gap-4 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)] hover:border-red-200 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-500 rounded-l-2xl scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />
              <div className="w-11 h-11 rounded-xl bg-red-50 text-red-500 flex items-center justify-center flex-shrink-0">
                <Icon size={20} />
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-1.5">{title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-16">
        <SectionHeader eyebrow="Awards" title="Recognised for excellence" />
        <div className="grid md:grid-cols-2 gap-5 mt-10">
          {UOB_AWARDS.map(({ img, title, desc }) => (
            <div
              key={title}
              className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)] hover:border-red-200 transition-all duration-300 group"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={img}
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a2e]/60 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
        <div>
          <p className="text-[10px] font-bold text-red-400 uppercase tracking-[0.15em] mb-2">
            Official Partnership
          </p>
          <h3 className="text-xl font-black mb-1">Earn a UK degree in Nepal</h3>
          <p className="text-white/50 text-sm max-w-md">
            Same curriculum. Same degree certificate. Taught in Lalitpur.
          </p>
        </div>
        <a
          href="https://apply.patancollege.edu.np"
          target="_blank"
          rel="noreferrer"
          className="flex-shrink-0 inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-7 py-3.5 rounded-xl transition-colors duration-200 whitespace-nowrap"
        >
          Apply Now <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}

function TeamTab() {
  const [activeTeamGroup, setActiveTeamGroup] = useState("board");
  const categoryScrollRef = useRef<HTMLDivElement>(null);
  const currentGroup = TEAM_GROUPS.find((g) => g.id === activeTeamGroup) ?? TEAM_GROUPS[0];

  return (
    <div>
      <div className="mb-12">
        <SectionHeader
          eyebrow="Our Team"
          title="The people behind PCPS"
          subtitle="Industry professionals, academics, and student-support specialists — all committed to your success."
        />
      </div>

      <div
        ref={categoryScrollRef}
        className="flex gap-2 mb-8 overflow-x-auto pb-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {TEAM_GROUPS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTeamGroup(id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
              activeTeamGroup === id
                ? "bg-[#1a1a2e] text-white shadow-md"
                : "bg-white border border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700"
            }`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-4 min-h-[300px]">
        {currentGroup.members.map((member) => (
          <TeamCard key={member.name} member={member} group={currentGroup} />
        ))}
      </div>

      <div className="sm:hidden mb-4">
        <MobileTeamCarousel group={currentGroup} />
      </div>

      <p className="text-center text-[11px] text-gray-400 mb-12 [@media(hover:none)]:hidden">
        Hover the Team Lead card to read their message
      </p>

      <div className="rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
        <div>
          <p className="text-[10px] font-bold text-red-400 uppercase tracking-[0.15em] mb-2">
            We&apos;re hiring
          </p>
          <h3 className="text-xl font-black mb-1">Join our team</h3>
          <p className="text-white/50 text-sm max-w-md">
            We look for industry professionals who want to shape the next generation of Nepali graduates.
          </p>
        </div>
        <a
          href="mailto:careers@patancollege.edu.np"
          className="flex-shrink-0 inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-7 py-3.5 rounded-xl transition-colors duration-200 whitespace-nowrap"
        >
          <Mail size={14} /> View openings
        </a>
      </div>
    </div>
  );
}

// ─── Collaboration & Training Tab ─────────────────────────────────────────────

function CollabTab() {
  return (
    <div>
      {/* ── SECTION HEADER — matches Why PCPS / UoB pattern ──────────────── */}
      <div className="mb-14">
        <SectionHeader
          eyebrow="Collaboration & Training"
          title="Built with industry, for industry"
          subtitle="Strategic partnerships that give PCPS students real-world exposure, certifications, and job-ready skills before they graduate."
        />
      </div>

      {/* ── ALL PARTNERS LOGO STRIP — premium full-color showcase ───────── */}
      <div className="mb-14">
        <p className="text-[10px] font-bold text-red-500 uppercase tracking-[0.18em] mb-6">Our partners</p>

        {/* Desktop: single row, generous sizing, full color, white pill cards */}
        <div className="hidden md:grid md:grid-cols-7 gap-3">
          {FULL_PARTNER_LOGOS.map(({ name, logo, url }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noreferrer"
              title={name}
              className="group flex items-center justify-center bg-white border border-gray-100 rounded-2xl px-4 py-5 shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.10)] hover:border-gray-200 hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="relative h-10 w-full">
                <Image
                  src={logo}
                  alt={name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                  unoptimized
                  loading="lazy"
                />
              </div>
            </a>
          ))}
        </div>

        {/* Mobile: horizontal scroll with same pill-card style */}
        <div className="md:hidden overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          <div className="flex gap-3" style={{ width: "max-content" }}>
            {FULL_PARTNER_LOGOS.map(({ name, logo, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer"
                title={name}
                className="flex-shrink-0 flex items-center justify-center bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-[0_2px_8px_rgba(0,0,0,0.05)] w-32"
              >
                <div className="relative h-9 w-full">
                  <Image src={logo} alt={name} fill className="object-contain" unoptimized loading="lazy" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── TECH LEARNING PARTNERS ───────────────────────────────────────── */}
      <div className="mb-14">
        <div className="border-b border-gray-100 pb-4 mb-8">
          <p className="text-[10px] font-bold text-red-500 uppercase tracking-[0.18em] mb-1">
            Tech Learning Partners
          </p>
          <h3 className="text-xl font-black text-gray-950">Platforms powering student learning</h3>
        </div>

        {/* Desktop 4-col grid — same card style as UoB highlights */}
        <div className="hidden md:grid md:grid-cols-4 gap-4">
          {TECH_PARTNERS.map((p) => (
            <div
              key={p.name}
              className="border border-gray-100 rounded-2xl p-6 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)] hover:border-red-200 transition-all duration-300 group relative overflow-hidden flex flex-col gap-4"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-500 rounded-l-2xl scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />
              <div className="relative w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0">
                <Image
                  src={p.logo}
                  alt={p.name}
                  fill
                  className="object-contain p-2"
                  unoptimized
                  loading="lazy"
                />
              </div>
              <div className="flex-1">
                <p className="font-bold text-gray-900 text-sm mb-0.5">{p.name}</p>
                <p className="text-[11px] text-gray-400">{p.tag}</p>
              </div>
              <p className="text-[11px] text-gray-500 leading-snug border-t border-gray-50 pt-3">
                {p.benefit}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile scroll */}
        <div className="md:hidden overflow-x-auto pb-2" style={{ scrollbarWidth: "none" }}>
          <div className="flex gap-3" style={{ width: "max-content" }}>
            {TECH_PARTNERS.map((p) => (
              <div
                key={p.name}
                className="w-[64vw] max-w-[220px] flex-shrink-0 bg-white border border-gray-100 rounded-2xl p-5 flex flex-col gap-4"
              >
                <div className="relative w-10 h-10 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden">
                  <Image src={p.logo} alt={p.name} fill className="object-contain p-1.5" unoptimized loading="lazy" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{p.name}</p>
                  <p className="text-[10px] text-gray-400">{p.tag}</p>
                </div>
                <p className="text-[11px] text-gray-500 leading-snug border-t border-gray-50 pt-3">
                  {p.benefit}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── STRATEGIC COLLABORATIONS ─────────────────────────────────────── */}
      <div className="mb-14">
        <div className="border-b border-gray-100 pb-4 mb-8">
          <p className="text-[10px] font-bold text-red-500 uppercase tracking-[0.18em] mb-1">
            Strategic Collaborations
          </p>
          <h3 className="text-xl font-black text-gray-950">Industry partners shaping your career</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STRATEGIC_PARTNERS.map((item) => (
            <div
              key={item.name}
              className="border border-gray-100 rounded-2xl p-6 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)] hover:border-red-200 transition-all duration-300 group relative overflow-hidden flex flex-col gap-5"
            >
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-500 rounded-l-2xl scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-center" />
              <div className="flex items-center gap-4">
                <div className="relative w-11 h-11 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden flex-shrink-0">
                  <Image
                    src={item.logo}
                    alt={item.name}
                    fill
                    className="object-contain p-2"
                    unoptimized
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 text-sm truncate">{item.name}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{item.tag}</p>
                </div>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed flex-1">{item.desc}</p>

              <div className="border-t border-gray-50 pt-4 flex items-center justify-between">
                <p className="text-[11px] text-gray-600 font-semibold">{item.benefit}</p>
                <p className="text-[11px] text-red-500 font-semibold flex items-center gap-1 flex-shrink-0 ml-3">
                  Learn more <ChevronRight size={10} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── NON-CREDIT COURSES ───────────────────────────────────────────── */}
      <div className="mb-14">
        <div className="border-b border-gray-100 pb-4 mb-8">
          <p className="text-[10px] font-bold text-red-500 uppercase tracking-[0.18em] mb-1">
            Non-Credit Courses
          </p>
          <h3 className="text-xl font-black text-gray-950">Skill-building beyond the core curriculum</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {NON_CREDIT_COURSES.map(({ icon: Icon, title, img, desc, tags }) => (
            <div
              key={title}
              className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.10)] hover:border-red-200 transition-all duration-300 group"
            >
              <div className="relative h-40 overflow-hidden bg-gray-50">
                <Image
                  src={img}
                  alt={title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#08080f]/50" />
                <div className="absolute bottom-4 left-4 w-8 h-8 rounded-lg bg-white/15 border border-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Icon size={15} className="text-white" />
                </div>
              </div>

              <div className="p-5 flex flex-col gap-3">
                <h4 className="font-bold text-gray-900 text-sm">{title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{desc}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold bg-gray-50 border border-gray-100 text-gray-500 px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── TRAINING & CAREER CHECKLIST ──────────────────────────────────── */}
      <div className="mb-14 border border-gray-100 rounded-2xl p-8 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <p className="text-[10px] font-bold text-red-500 uppercase tracking-[0.18em] mb-3">
          Training &amp; Career Opportunities
        </p>
        <h3 className="text-xl font-black text-gray-950 mb-7">What collaboration unlocks for you</h3>
        <div className="grid sm:grid-cols-2 gap-y-3 gap-x-10">
          {[
            "Internships with 40+ industry partner companies",
            "Guest lectures from CEOs, founders, and domain experts",
            "Annual hackathons with cash prizes and job offers",
            "AWS, Google & Microsoft certification pathways",
            "1-on-1 mentorship and CV reviews every semester",
            "Company visits and live case studies",
            "Startup incubation via Idea Studio Nepal",
            "Job placement support and employer introductions",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3">
              <CheckCircle2 size={15} className="text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-500 leading-relaxed">{item}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA — matches all other tabs ─────────────────────────────────── */}
      <div className="rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] p-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-white">
        <div>
          <p className="text-[10px] font-bold text-red-400 uppercase tracking-[0.15em] mb-2">
            Become a partner
          </p>
          <h3 className="text-xl font-black mb-1">Hire from PCPS</h3>
          <p className="text-white/50 text-sm max-w-md">
            Get early access to our graduating cohort and co-design the talent pipeline your company needs.
          </p>
        </div>
        <a
          href="mailto:partnerships@patancollege.edu.np"
          className="flex-shrink-0 inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-7 py-3.5 rounded-xl transition-colors duration-200 whitespace-nowrap"
        >
          <Mail size={14} /> Get in touch
        </a>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<TabId>("why");

  const renderTab = () => {
    switch (activeTab) {
      case "why":    return <WhyTab />;
      case "uob":    return <UoBTab />;
      case "team":   return <TeamTab />;
      case "collab": return <CollabTab />;
    }
  };

  return (
    <div>
      {/* ── HERO — matches Admissions page presence ───────────────────────── */}
      <div className="bg-gradient-to-br from-[#1a1a2e] to-[#0f3460] text-white pt-20 pb-0 px-5">
        <div className="mx-auto max-w-5xl">
          {/* Central copy block — generous vertical rhythm like Admissions */}
          <div className="text-center max-w-2xl mx-auto pb-16">
            <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-4">About PCPS</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6 leading-tight whitespace-nowrap">
              Nepal&apos;s Most Career-Focused
              <br />
              <span className="text-red-400">UK Degree</span>
            </h1>
            <p className="text-white/60 text-base lg:text-lg leading-relaxed mb-8 max-w-xl mx-auto">
              PCPS College offers internationally recognised UK undergraduate programmes in partnership with the University of Bedfordshire — the only institution in Nepal offering an on-campus UK degree partnership.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                href="https://apply.patancollege.edu.np"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-8 py-4 rounded-full transition-colors duration-200"
              >
                Enroll Now <ArrowRight size={14} />
              </a>
              <a
                href="tel:+9779801102235"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-semibold px-7 py-4 rounded-full transition-all duration-200"
              >
                Contact Us
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* ── TAB BAR ───────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="mx-auto max-w-5xl px-5">
          <div className="flex overflow-x-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-200 ${
                  activeTab === id
                    ? "border-red-500 text-red-500"
                    : "border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-200"
                }`}
              >
                <Icon size={15} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── TAB CONTENT — subtle per-tab background for visual separation ── */}
      <div
        className={`min-h-screen transition-colors duration-300 ${
          activeTab === "why"    ? "bg-white" :
          activeTab === "uob"   ? "bg-[#f7f7f5]" :
          activeTab === "team"  ? "bg-white" :
                                  "bg-[#f7f7f5]"
        }`}
      >
        <div className="mx-auto max-w-5xl px-5 py-16">{renderTab()}</div>
      </div>
    </div>
  );
}