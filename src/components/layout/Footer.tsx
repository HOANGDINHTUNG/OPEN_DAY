import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="w-full py-6 px-4 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4 bg-white/80 border-t border-gray-200 mt-20 relative z-20">
      <div className="font-display font-bold text-deep-space flex items-center gap-2">
        <div className="h-6 w-6 bg-brand-red rounded flex items-center justify-center font-bold text-white text-xs">
          R
        </div>
        PTIT x Rikkei
      </div>
      <p className="font-body text-sm font-semibold text-on-surface-variant">
        © 2024 PTIT x Rikkei Edu OpenDay. Powered by Rikkei.
      </p>
      <div className="flex gap-4">
        <Link
          className="font-body text-sm font-semibold text-on-surface-variant hover:text-brand-red transition-colors underline-offset-4 hover:underline"
          to="#"
        >
          Terms
        </Link>
        <Link
          className="font-body text-sm font-semibold text-on-surface-variant hover:text-brand-red transition-colors underline-offset-4 hover:underline"
          to="#"
        >
          Privacy
        </Link>
      </div>
    </footer>
  );
}
