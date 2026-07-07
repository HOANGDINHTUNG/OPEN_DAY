import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface GlassPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  interactive?: boolean;
}

export function GlassPanel({
  children,
  className,
  interactive = false,
  ...props
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "bg-white/90 backdrop-blur-xl border border-gray-200 rounded-xl overflow-hidden shadow-sm",
        interactive &&
          "cursor-pointer hover:bg-gray-50 hover:border-brand-red/30 hover:shadow-[0_4px_20px_rgba(197,0,5,0.1)] transition-all duration-300 hover:-translate-y-1",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
