import { ReactNode } from "react";
import { TopNavbar } from "./TopNavbar";
import { useLocation } from "react-router-dom";
import { SideNavbar } from "./SideNavbar";
import { Footer } from "./Footer";

interface ShaderBackgroundProps {
  children: ReactNode;
}

export function MainLayout({ children }: ShaderBackgroundProps) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const isPlay =
    location.pathname.startsWith("/play") ||
    location.pathname.startsWith("/game");

  return (
    <div className="min-h-screen bg-background text-on-background font-sans relative overflow-x-hidden selection:bg-brand-red selection:text-white tech-pattern flex flex-col">
      <TopNavbar />
      {isAdmin && <SideNavbar />}

      <main
        className={`relative z-10 transition-all duration-300 flex-1 ${isAdmin ? "lg:pl-64" : ""}`}
      >
        {children}
      </main>

      {!isAdmin && !isPlay && <Footer />}
    </div>
  );
}
