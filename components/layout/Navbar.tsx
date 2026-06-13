"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevPath, setPrevPath] = useState<string | null>(null);
  const path = usePathname();

  if (prevPath !== path) {
    setPrevPath(path);
    setOpen(false);
  }

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Lock body scroll while drawer is open, and mount it for exit animation
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMounted(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      const t = setTimeout(() => setMounted(false), 320);
      return () => clearTimeout(t);
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
                  <Link href={href} role="menuitem" className={`nav-link ${active ? "nav-link-active" : ""}`}>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <a href="https://apply.patancollege.edu.np" target="_blank" rel="noreferrer" className="nav-cta nav-desktop">
            Enroll Now
          </a>

          <button
            className="nav-burger nav-mobile"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className={`burger-lines ${open ? "burger-open" : ""}`}>
              <span className="burger-line line-1" />
              <span className="burger-line line-2" />
              <span className="burger-line line-3" />
            </span>
          </button>
        </div>
      </nav>

      {mounted && (
        <>
          <div
            className={`mobile-backdrop ${open ? "backdrop-open" : ""}`}
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className={`mobile-drawer ${open ? "drawer-open" : ""}`} role="dialog" aria-modal="true">
            <nav className="mobile-links">
              {LINKS.map(({ href, label }, i) => (
                <Link
                  key={href}
                  href={href}
                  className={`mobile-link ${path === href ? "mobile-link-active" : ""}`}
                  style={{ transitionDelay: open ? `${60 + i * 35}ms` : "0ms" }}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="mobile-bottom" style={{ transitionDelay: open ? `${60 + LINKS.length * 35}ms` : "0ms" }}>
              <a href="https://apply.patancollege.edu.np" target="_blank" rel="noreferrer" className="mobile-cta">
                Enroll Now
              </a>
              <div className="mobile-portals">
                <a href="https://breo.beds.ac.uk/" target="_blank" rel="noreferrer" className="mobile-portal">Breo</a>
                <a href="https://evision.beds.ac.uk/" target="_blank" rel="noreferrer" className="mobile-portal">Evision</a>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        .pcps-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          height: 76px;
          background: rgba(11,15,26,0.7);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid transparent;
          transition: background .35s ease, border-color .35s ease, box-shadow .35s ease, height .25s ease;
          display: flex; align-items: center;
        }
        .nav-scrolled {
          background: rgba(11,15,26,0.97) !important;
          border-bottom-color: rgba(230,57,70,0.15) !important;
          box-shadow: 0 2px 24px rgba(0,0,0,0.35);
          height: 68px;
        }
        .nav-inner {
          max-width: 1280px; width: 100%; margin: 0 auto; padding: 0 24px;
          display: flex; align-items: center; gap: 8px;
        }
        .nav-logo {
          display: flex; align-items: center; gap: 10px; text-decoration: none;
          margin-right: auto;
          transition: transform .25s ease;
        }
        .nav-logo:hover { transform: scale(1.03); }

        .nav-links { display: flex; align-items: center; gap: 2px; list-style: none; margin: 0; padding: 0; }
        .nav-link {
          position: relative;
          display: block; padding: 8px 14px; border-radius: 8px;
          font-size: 0.84rem; font-weight: 500;
          color: rgba(255,255,255,0.68);
          text-decoration: none;
          transition: color .25s ease, background .25s ease;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          left: 14px; right: 14px; bottom: 4px;
          height: 2px; border-radius: 2px;
          background: #e63946;
          transform: scaleX(0);
          transform-origin: center;
          transition: transform .28s cubic-bezier(.65,0,.35,1);
        }
        .nav-link:hover { color: #fff; background: rgba(255,255,255,0.06); }
        .nav-link:hover::after { transform: scaleX(0.55); }
        .nav-link-active { color: #fff !important; font-weight: 700 !important; }
        .nav-link-active::after { transform: scaleX(1) !important; background: #e63946; }

        .nav-cta {
          background: #e63946; color: #fff; font-weight: 700; font-size: 0.84rem;
          padding: 10px 22px; border-radius: 999px; text-decoration: none; white-space: nowrap;
          margin-left: 10px;
          transition: background .25s ease, transform .25s ease, box-shadow .25s ease;
          box-shadow: 0 4px 16px rgba(230,57,70,0.0);
        }
        .nav-cta:hover {
          background: #c1121f;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(230,57,70,0.35);
        }

        /* Animated burger */
        .nav-burger {
          background: none; border: none; cursor: pointer; color: #fff;
          padding: 8px; margin-left: 8px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 8px;
          transition: background .2s ease;
        }
        .nav-burger:hover { background: rgba(255,255,255,0.08); }
        .burger-lines {
          position: relative;
          display: flex; flex-direction: column; justify-content: center;
          width: 24px; height: 18px;
        }
        .burger-line {
          position: absolute; left: 0; right: 0; height: 2px; border-radius: 2px;
          background: #fff;
          transition: transform .35s cubic-bezier(.65,0,.35,1), opacity .25s ease, top .35s cubic-bezier(.65,0,.35,1), background .25s ease;
        }
        .line-1 { top: 0; }
        .line-2 { top: 8px; }
        .line-3 { top: 16px; }

        .burger-open .line-1 {
          top: 8px;
          transform: rotate(45deg);
          background: #e63946;
        }
        .burger-open .line-2 {
          opacity: 0;
          transform: scaleX(0);
        }
        .burger-open .line-3 {
          top: 8px;
          transform: rotate(-45deg);
          background: #e63946;
        }

        /* Mobile drawer */
        .mobile-backdrop {
          position: fixed; inset: 0; z-index: 998;
          background: rgba(5,7,14,0.55);
          opacity: 0;
          transition: opacity .3s ease;
          backdrop-filter: blur(2px);
        }
        .backdrop-open { opacity: 1; }

        .mobile-drawer {
          position: fixed; top: 0; right: 0; bottom: 0; z-index: 999;
          width: min(86vw, 360px);
          background: rgba(13,17,30,0.99);
          backdrop-filter: blur(20px);
          padding: 96px 28px 32px;
          overflow-y: auto;
          display: flex; flex-direction: column;
          border-left: 1px solid rgba(255,255,255,0.06);
          box-shadow: -16px 0 48px rgba(0,0,0,0.4);
          transform: translateX(100%);
          transition: transform .36s cubic-bezier(.32,.72,0,1);
        }
        .drawer-open { transform: translateX(0); }

        .mobile-links { display: flex; flex-direction: column; }
        .mobile-link {
          display: block; padding: 15px 4px;
          color: rgba(255,255,255,0.78);
          text-decoration: none; font-weight: 600; font-size: 1.02rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          opacity: 0; transform: translateX(24px);
          transition: opacity .35s ease, transform .35s ease, color .2s ease;
        }
        .drawer-open .mobile-link { opacity: 1; transform: translateX(0); }
        .mobile-link:hover, .mobile-link-active { color: #e63946; }

        .mobile-bottom {
          margin-top: auto; padding-top: 24px;
          opacity: 0; transform: translateY(16px);
          transition: opacity .35s ease, transform .35s ease;
        }
        .drawer-open .mobile-bottom { opacity: 1; transform: translateY(0); }

        .mobile-cta {
          display: block; text-align: center;
          background: #e63946; color: #fff; font-weight: 800;
          padding: 15px; border-radius: 12px; text-decoration: none; font-size: 1rem;
          transition: background .2s ease, transform .2s ease;
        }
        .mobile-cta:hover { background: #c1121f; transform: translateY(-2px); }

        .mobile-portals { display: flex; gap: 10px; margin-top: 14px; }
        .mobile-portal {
          flex: 1; text-align: center;
          border: 1px solid rgba(255,255,255,0.16);
          color: rgba(255,255,255,0.6);
          padding: 11px; border-radius: 10px;
          text-decoration: none; font-size: 0.82rem; font-weight: 600;
          transition: border-color .2s ease, color .2s ease, background .2s ease;
        }
        .mobile-portal:hover {
          border-color: rgba(230,57,70,0.5);
          color: #fff;
          background: rgba(230,57,70,0.08);
        }

        .nav-desktop { display: flex !important; }
        .nav-mobile { display: none !important; }

        @media (max-width: 900px) {
          .nav-links { display: none !important; }
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}