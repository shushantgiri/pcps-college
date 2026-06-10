import { cn } from "@/lib/utils";
import Link from "next/link";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
}

const base = "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 cursor-pointer";

const variants: Record<Variant, string> = {
  primary: "bg-red-500 hover:bg-red-600 text-white shadow-sm hover:-translate-y-0.5",
  outline: "border border-current text-inherit hover:bg-white/10",
  ghost:   "text-red-500 hover:bg-red-50",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-sm px-6 py-2.5",
  lg: "text-base px-8 py-3",
};

export default function Button({
  variant = "primary", size = "md", href, external, className, children, ...props
}: ButtonProps) {
  const cls = cn(base, variants[variant], sizes[size], className);

  if (href) {
    if (external) {
      return <a href={href} target="_blank" rel="noreferrer" className={cls}>{children}</a>;
    }
    return <Link href={href} className={cls}>{children}</Link>;
  }
  return <button className={cls} {...props}>{children}</button>;
}
