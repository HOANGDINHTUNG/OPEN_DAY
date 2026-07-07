import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "glass";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-bold transition-all duration-300 rounded-lg active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-brand-red text-white hover:bg-red-700 shadow-[0_4px_20px_rgba(226,35,26,0.3)]",
    secondary:
      "bg-secondary-container text-white hover:bg-secondary-container/80 shadow-lg",
    outline:
      "bg-transparent border border-glass-stroke text-white hover:bg-surface-variant/30",
    glass:
      "bg-white/5 border border-white/10 text-white hover:bg-white/10 backdrop-blur-md",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
