"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/about",      label: "About" },
  { href: "/courses",    label: "Courses" },
  { href: "/admissions", label: "Admissions" },
  { href: "/events",     label: "Events" },
  { href: "/research",   label: "Research" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <nav className={cn("fixed top-0 inset-x-0 z-50 transition-shadow duration-300 bg-[#1a1a2e]", scrolled && "shadow-[0_2px_24px_rgba(0,0,0,0.4)]")}>
      <div className="mx-auto max-w-7xl px-5 h-[72px] flex items-center gap-6">
        <Link href="/" className="text-white font-black text-xl tracking-tight shrink-0">
          PCPS<span className="text-red-500">.</span>
        </Link>
        <ul className="hidden md:flex items-center gap-1 ml-auto">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className={cn("px-3 py-2 rounded-md text-sm font-medium transition-colors", pathname === href ? "text-white bg-white/10" : "text-white/70 hover:text-white hover:bg-white/10")}>
                {label}
              </Link>
            </li>
          ))}
          <li className="ml-3">
            <a href="https://apply.patancollege.edu.np" target="_blank" rel="noreferrer" className="bg-red-500 hover:bg-red-600 text-white font-bold text-sm px-5 py-2 rounded-md transition-colors">
              Enroll Now
            </a>
          </li>
        </ul>
        <button className="md:hidden ml-auto text-white p-1" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-[#1a1a2e] border-t border-white/10 px-5 pb-6 pt-2 flex flex-col gap-1">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className="text-white/80 hover:text-white py-2.5 text-base font-medium border-b border-white/5">
              {label}
            </Link>
          ))}
          <a href="https://apply.patancollege.edu.np" target="_blank" rel="noreferrer" className="mt-3 bg-red-500 hover:bg-red-600 text-white font-bold text-center py-3 rounded-md">
            Enroll Now
          </a>
        </div>
      )}
    </nav>
  );
}
