import { ReactNode } from "react";

interface ShaderBackgroundProps {
  children: ReactNode;
}

export function MainLayout({ children }: ShaderBackgroundProps) {
  return (
    <div className="min-h-screen bg-background text-on-background font-sans relative overflow-x-hidden selection:bg-brand-red selection:text-white tech-pattern flex flex-col">
      <main className="relative z-10 flex-1 w-full flex flex-col h-full">
        {children}
      </main>
    </div>
  );
}
