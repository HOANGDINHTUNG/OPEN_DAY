import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/Button";

export function TopNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname.startsWith("/admin");
  const isPlay =
    location.pathname.startsWith("/play") ||
    location.pathname.startsWith("/game");

  if (isAdmin || isPlay) return null; // Admin Flow and GamePlay use their own Navbars

  const links = [
    { name: "Trang chủ", path: "/" },
    { name: "Thử thách", path: "/level" },
    { name: "Xếp hạng", path: "/leaderboard" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-10 h-20 bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-200">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img
          src="https://res.cloudinary.com/dmzvum1lp/image/upload/v1783435103/ptit-logo_xv3e2d.png"
          alt="PTIT Logo"
          className="h-8 object-contain"
        />
        <div className="h-6 w-[2px] bg-gray-300"></div>
        <img
          src="https://res.cloudinary.com/dmzvum1lp/image/upload/v1783435104/rikkei-logo_tvjfma.png"
          alt="Rikkei Logo"
          className="h-8 object-contain"
        />
      </div>

      <div className="hidden md:flex gap-6 items-center absolute left-1/2 -translate-x-1/2">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={cn(
              "font-semibold text-sm px-2 py-1 transition-all duration-300",
              (
                link.path === "/"
                  ? location.pathname === "/"
                  : location.pathname.startsWith(link.path)
              )
                ? "text-brand-red border-b-2 border-brand-red rounded-t"
                : "text-on-surface-variant hover:text-brand-red hover:bg-gray-50 rounded",
            )}
          >
            {link.name}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Link to="/leaderboard">
          <Button className="bg-brand-red text-white font-display font-bold py-2 px-4 rounded hover:bg-red-700 transition-colors hidden md:block">
            Bảng Xếp Hạng
          </Button>
        </Link>
        <Link to="/admin">
          <button className="text-deep-space hover:text-brand-red transition-colors flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-100">
            <span className="material-symbols-outlined text-[24px]">
              account_circle
            </span>
          </button>
        </Link>
      </div>
    </nav>
  );
}
