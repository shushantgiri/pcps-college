import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  color?: "red" | "blue" | "green" | "gray";
  className?: string;
}

const colors = {
  red:   "bg-red-100 text-red-600",
  blue:  "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-700",
  gray:  "bg-gray-100 text-gray-600",
};

export default function Badge({ children, color = "red", className }: Props) {
  return (
    <span className={cn(
      "inline-block text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-full",
      colors[color], className
    )}>
      {children}
    </span>
  );
}
