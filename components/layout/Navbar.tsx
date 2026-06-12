"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/admissions", label: "Admissions" },
  { href: "/students/community", label: "Students" },
  { href: "/events", label: "Events" },
  { href: "/research", label: "Research" },
  { href: "/notices", label: "Notices" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => { setOpen(false); }, [path]);

  return (
    <>
      <nav className={`pcps-nav ${scrolled ? "nav-scrolled" : ""}`} role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <Link href="/" className="nav-logo" aria-label="PCPS College Home">
            <Image src="/pcps.svg" alt="PCPS Logo" width={98} height={98} style={{ borderRadius: 6 }} priority />

          </Link>

          <ul className="nav-links" role="menubar">
            {LINKS.map(({ href, label }) => {
              const active = path === href || path.startsWith(href + "/");
              return (
                <li key={href} role="none">
                  <Link href={href} role="menuitem" className={`nav-link ${active ? "nav-link-active" : ""}`}>{label}</Link>
                </li>
              );
            })}
          </ul>

          <a href="https://apply.patancollege.edu.np" target="_blank" rel="noreferrer" className="nav-cta nav-desktop">
            Enroll Now
          </a>

          <button className="nav-burger nav-mobile" onClick={() => setOpen(o => !o)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="mobile-drawer" role="dialog" aria-modal="true">
          {LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className={`mobile-link ${path === href ? "mobile-link-active" : ""}`}>{label}</Link>
          ))}
          <a href="https://apply.patancollege.edu.np" target="_blank" rel="noreferrer" className="mobile-cta">Enroll Now</a>
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <a href="https://breo.beds.ac.uk/" target="_blank" rel="noreferrer" className="mobile-portal">Breo</a>
            <a href="https://evision.beds.ac.uk/" target="_blank" rel="noreferrer" className="mobile-portal">Evision</a>
          </div>
        </div>
      )}

      <style>{`
        .pcps-nav { position:fixed;top:0;left:0;right:0;z-index:1000;height:76px;background:rgba(11,15,26,0.97);backdrop-filter:blur(16px);border-bottom:1px solid transparent;transition:all .3s ease;display:flex;align-items:center; }
        .nav-scrolled { background:rgba(11,15,26,0.97)!important;border-bottom-color:rgba(230,57,70,0.15)!important;box-shadow:0 2px 20px rgba(0,0,0,0.3); }
        .nav-inner { max-width:1280px;width:100%;margin:0 auto;padding:0 24px;display:flex;align-items:center;gap:8px; }
        .nav-logo { display:flex;align-items:center;gap:10px;text-decoration:none;margin-right:auto; }
        .nav-logo-name { display:block;font-weight:900;font-size:1.15rem;color:#fff;letter-spacing:-0.5px;line-height:1; }
        .nav-logo-sub { display:block;font-size:0.58rem;color:rgba(255,255,255,0.4);letter-spacing:0.12em;text-transform:uppercase;line-height:1;margin-top:2px; }
        .nav-links { display:flex;align-items:center;gap:2px;list-style:none;margin:0;padding:0; }
        .nav-link { display:block;padding:6px 12px;border-radius:6px;font-size:0.84rem;font-weight:500;color:rgba(255,255,255,0.72);text-decoration:none;border-bottom:2px solid transparent;transition:all .2s; }
        .nav-link:hover { color:#fff;background:rgba(255,255,255,0.08); }
        .nav-link-active { color:#e63946!important;border-bottom-color:#e63946!important;font-weight:700!important; }
        .nav-cta { background:#e63946;color:#fff;font-weight:700;font-size:0.84rem;padding:9px 20px;border-radius:8px;text-decoration:none;white-space:nowrap;margin-left:10px;transition:background .2s; }
        .nav-cta:hover { background:#c1121f; }
        .nav-burger { background:none;border:none;cursor:pointer;color:#fff;padding:8px;display:flex;margin-left:8px; }
        .mobile-drawer { position:fixed;top:76px;left:0;right:0;bottom:0;z-index:999;background:rgba(11,15,26,0.98);backdrop-filter:blur(16px);padding:20px 24px 40px;overflow-y:auto;display:flex;flex-direction:column; }
        .mobile-link { display:block;padding:14px 0;color:rgba(255,255,255,0.82);text-decoration:none;font-weight:600;font-size:1rem;border-bottom:1px solid rgba(255,255,255,0.07);transition:color .2s; }
        .mobile-link:hover,.mobile-link-active { color:#e63946; }
        .mobile-cta { display:block;margin-top:20px;text-align:center;background:#e63946;color:#fff;font-weight:800;padding:14px;border-radius:8px;text-decoration:none;font-size:1rem; }
        .mobile-portal { flex:1;text-align:center;border:1px solid rgba(255,255,255,0.18);color:rgba(255,255,255,0.55);padding:10px;border-radius:8px;text-decoration:none;font-size:0.82rem;font-weight:600; }
        .nav-desktop { display:flex!important; }
        .nav-mobile  { display:none!important; }
        @media(max-width:900px){ .nav-links{display:none!important;} .nav-desktop{display:none!important;} .nav-mobile{display:flex!important;} }
      `}</style>
    </>
  );
}