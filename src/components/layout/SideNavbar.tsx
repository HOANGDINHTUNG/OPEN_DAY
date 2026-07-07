import {
  Home,
  ShieldAlert,
  Package,
  LogOut,
  Settings,
  HelpCircle,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/Button";

export function SideNavbar() {
  const location = useLocation();

  const primaryLinks = [
    { name: "Quay về trang chủ", path: "/", icon: <Home size={20} /> },
    { name: "Kho quản trị", path: "/admin", icon: <Package size={20} /> },
  ];

  return (
    <nav className="hidden lg:flex flex-col h-screen py-6 bg-[#0c0f0f]/80 backdrop-blur-md border-r border-glass-stroke w-64 fixed left-0 top-0 z-40">
      <div className="px-6 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldAlert className="text-brand-red" size={24} />
          <div>
            <h1 className="font-bold text-lg text-white">Arena Master</h1>
            <p className="text-xs text-brand-red tracking-wide">STAFF ACCESS</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 space-y-2">
        {primaryLinks.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 mx-2 rounded-lg transition-all font-semibold",
                isActive
                  ? "bg-primary-container text-primary shadow-[inset_2px_0_0_var(--color-primary)] bg-opacity-30"
                  : "text-on-surface-variant hover:bg-white/5 hover:text-white",
              )}
            >
              <span
                className={
                  isActive ? "text-primary flex-shrink-0" : "flex-shrink-0"
                }
              >
                {link.icon}
              </span>
              {link.name}
            </Link>
          );
        })}
      </div>

      <div className="px-4 mt-auto">
        <Button variant="secondary" className="w-full mb-6">
          Dọn dẹp phiên
        </Button>
        <div className="space-y-1">
          <button className="flex w-full items-center gap-3 px-4 py-2 mx-2 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-white transition-all text-sm font-semibold">
            <Settings size={18} /> Cài đặt
          </button>
          <button className="flex w-full items-center gap-3 px-4 py-2 mx-2 rounded-lg text-on-surface-variant hover:bg-white/5 hover:text-white transition-all text-sm font-semibold">
            <HelpCircle size={18} /> Cần Hỗ trợ
          </button>
        </div>
        <div className="mt-6 flex items-center gap-3 px-4 pt-4 border-t border-glass-stroke">
          <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border border-white/20">
            <span className="text-white font-bold">AD</span>
          </div>
          <div>
            <p className="text-sm font-bold text-white leading-tight">
              Admin System
            </p>
            <p className="text-xs text-on-surface-variant">rikkei.edu.vn</p>
          </div>
          <button className="ml-auto text-on-surface-variant hover:text-error transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </nav>
  );
}
