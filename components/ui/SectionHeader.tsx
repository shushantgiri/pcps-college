import { cn } from "@/lib/utils";

interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
  className?: string;
}

export default function SectionHeader({ eyebrow, title, subtitle, center, light, className }: Props) {
  return (
    <div className={cn("mb-10", center && "text-center", className)}>
      {eyebrow && (
        <p className="text-xs font-bold tracking-widest uppercase text-red-500 mb-2">{eyebrow}</p>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl font-extrabold tracking-tight leading-tight",
          light ? "text-white" : "text-gray-900"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn("mt-3 text-base leading-relaxed max-w-2xl", center && "mx-auto", light ? "text-white/60" : "text-gray-500")}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
