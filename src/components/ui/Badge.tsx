import { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "brand";
}

export function Badge({
  children,
  variant = "default",
  className,
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-deep-space border-white/20 text-primary",
    success: "bg-green-500/20 border-green-500/30 text-green-400",
    warning: "bg-yellow-500/20 border-yellow-500/30 text-yellow-400",
    error: "bg-red-500/20 border-red-500/30 text-red-400",
    brand: "bg-brand-red/20 border-brand-red/30 text-brand-red",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold tracking-wide",
        variants[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
