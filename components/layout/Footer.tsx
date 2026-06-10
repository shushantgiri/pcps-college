import Link from "next/link";

const QUICK_LINKS = [
  { href: "/about", label: "About Us" },
  { href: "/courses", label: "Programmes" },
  { href: "/admissions", label: "Admissions" },
  { href: "/events", label: "Events" },
  { href: "/research", label: "Research" },
];

const STUDENT_LINKS = [
  { href: "https://breo.beds.ac.uk/", label: "Breo (Bedfordshire LMS)" },
  { href: "https://evision.beds.ac.uk/", label: "Evision Portal" },
  { href: "/notices", label: "Notices" },
];

const SOCIALS = [
  { label: "fb",  href: "https://www.facebook.com/patancollege" },
  { label: "ig",  href: "https://www.instagram.com/pcpscollege/" },
  { label: "in",  href: "https://www.linkedin.com/school/pcpscollege/" },
  { label: "yt",  href: "https://www.youtube.com/@pcpscollege" },
  { label: "tt",  href: "https://www.tiktok.com/@pcps_college" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f0f1a] text-white/60">
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="text-white font-black text-xl tracking-tight mb-3">
              PCPS<span className="text-red-500">.</span>
            </p>
            <p className="text-sm leading-relaxed mb-4">
              Patan College For Professional Studies<br />
              Kandevatashan, Lalitpur, Nepal
            </p>
            <p className="text-sm mb-1">📞 +977 9801102235</p>
            <p className="text-sm">🏫 University of Bedfordshire Partnership</p>
            <div className="flex gap-3 mt-5">
              {SOCIALS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/70 hover:bg-red-500 hover:text-white transition-colors text-xs font-bold uppercase"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Student portal */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4">Students</h4>
            <ul className="space-y-2.5">
              {STUDENT_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="text-sm hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-widest uppercase mb-4">Policies</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="/policies/sexual-misconduct.pdf" className="text-sm hover:text-white transition-colors">
                  Sexual Misconduct Policy
                </a>
              </li>
              <li>
                <a href="/policies/workplace-harassment.pdf" className="text-sm hover:text-white transition-colors">
                  Workplace Harassment Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/40">
          <span>©{new Date().getFullYear()} PCPS College · Disclaimer: * denotes group statistics</span>
          <span>University of Bedfordshire Partnership</span>
        </div>
      </div>
    </footer>
  );
}
