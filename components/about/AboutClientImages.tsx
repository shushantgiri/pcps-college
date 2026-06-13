"use client";

import Image from "next/image";
import { useState } from "react";

interface PartnerLogoProps {
  src: string;
  alt: string;
  bg: string;
  initials: string;
}

export function PartnerLogo({ src, alt, bg, initials }: PartnerLogoProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: bg || "#f5f5f0" }}
      >
        <span className="text-[12px] font-extrabold text-[#6b6b6b] tracking-wider">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div className="w-10 h-10 relative flex-shrink-0">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        onError={() => setErrored(true)}
        unoptimized
      />
    </div>
  );
}
