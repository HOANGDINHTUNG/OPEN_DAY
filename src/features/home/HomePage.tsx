import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLeaderboardStats, LeaderboardStats } from "@/utils/storage";

export function HomePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"intro" | "ranking">("intro");
  const [stats, setStats] = useState<LeaderboardStats[]>([]);

  useEffect(() => {
    // Load stats once on mount
    setStats(getLeaderboardStats());

    // Rotate every 8 seconds
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev === "intro" ? "ranking" : "intro"));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen tech-pattern text-on-background flex flex-col relative overflow-hidden">
      {/* Top Navbar Simulation for Kiosk */}
      <nav className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-50">
        <div className="flex items-center gap-4 bg-surface/80 backdrop-blur pb-2 pr-6 rounded-br-3xl">
          <img
            src="https://res.cloudinary.com/dmzvum1lp/image/upload/v1783435103/ptit-logo_xv3e2d.png"
            alt="PTIT"
            className="h-12 object-contain"
          />
          <div className="h-8 w-[2px] bg-glass-stroke"></div>
          <img
            src="https://res.cloudinary.com/dmzvum1lp/image/upload/v1783435104/rikkei-logo_tvjfma.png"
            alt="Rikkei"
            className="h-12 object-contain"
          />
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center items-center px-6 mt-12 z-10 w-full max-w-6xl mx-auto">
        <div className="w-full flex-1 flex flex-col items-center justify-center min-h-[500px] relative">
          {/* TAB 1: INTRO */}
          <div
            className={`absolute inset-0 flex flex-col justify-center items-center text-center transition-all duration-1000 ${
              activeTab === "intro"
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 translate-y-8 pointer-events-none"
            }`}
          >
            <h2 className="text-xl md:text-2xl font-display text-on-surface-variant font-bold tracking-widest uppercase mb-4">
              PTIT Open Day 2026
            </h2>
            <h1 className="text-6xl md:text-8xl font-display font-bold text-primary-foreground leading-tight mb-2 uppercase drop-shadow-lg">
              Nấc Thang
              <br />
              <span className="text-brand-red glow-red block mt-2">
                Tri Thức
              </span>
            </h1>
            <p className="font-body text-xl text-on-surface-variant max-w-2xl mt-8">
              Vượt qua các nấc câu hỏi bất ngờ để đổi lấy phần quà giá trị tăng
              dần.
              <br />
              Không giới hạn lượt chơi — ai cũng có thể thử.
            </p>

            <div className="flex gap-4 mt-8">
              <span className="bg-surface border border-glass-stroke px-4 py-2 rounded-full font-body text-sm font-semibold text-primary-foreground shadow-lg">
                Khám phá sức mạnh số
              </span>
              <span className="bg-surface border border-glass-stroke px-4 py-2 rounded-full font-body text-sm font-semibold text-primary-foreground shadow-lg">
                Kỹ năng mềm
              </span>
              <span className="bg-surface border border-glass-stroke px-4 py-2 rounded-full font-body text-sm font-semibold text-primary-foreground shadow-lg">
                Trend vui
              </span>
            </div>
          </div>

          {/* TAB 2: RANKING */}
          <div
            className={`absolute inset-0 flex flex-col justify-center items-center transition-all duration-1000 ${
              activeTab === "ranking"
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-8 pointer-events-none"
            }`}
          >
            <h2 className="text-5xl font-display font-bold text-golden glow-gold uppercase mb-10 drop-shadow-xl text-center">
              Bảng Vàng Thành Tích
            </h2>

            <div className="w-full max-w-3xl glass-panel rounded-3xl p-8 flex flex-col gap-4">
              {stats.map((stat, i) => (
                <div
                  key={stat.level}
                  className="flex justify-between items-center border-b border-glass-stroke pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-full bg-brand-red flex items-center justify-center font-display text-2xl font-bold text-white shadow-lg glow-red">
                      {i + 1}
                    </div>
                    <span className="font-display text-3xl font-bold text-primary-foreground tracking-wide uppercase">
                      Nấc {stat.level}
                    </span>
                  </div>
                  <div className="font-body text-xl font-bold text-on-surface-variant flex items-center gap-2">
                    Có{" "}
                    <span className="text-3xl text-golden">{stat.count}</span>{" "}
                    người đạt được
                  </div>
                </div>
              ))}
              {stats.length === 0 && (
                <p className="text-center text-on-surface-variant font-body">
                  Chưa có ai tham gia. Hãy là người đầu tiên!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Fixed Bottom Controls */}
        <div className="mt-12 mb-10 flex flex-col items-center gap-6 relative z-50">
          <button
            onClick={() => navigate("/rules")}
            className="group relative px-12 py-5 bg-brand-red text-white font-display font-bold text-3xl uppercase tracking-wider rounded-xl overflow-hidden shadow-[0_0_40px_rgba(218,18,26,0.6)] hover-pop"
          >
            <span className="relative z-10">Bắt Đầu Chơi Ngay</span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>

          <div className="flex items-center gap-4 border border-glass-stroke bg-surface/50 rounded-full p-1 backdrop-blur overflow-hidden">
            <button
              onClick={() => setActiveTab("intro")}
              className={`px-6 py-2 rounded-full font-body font-bold text-sm transition-all ${
                activeTab === "intro"
                  ? "bg-brand-red text-white shadow-md"
                  : "text-on-surface-variant hover:text-white"
              }`}
            >
              Giới thiệu
            </button>
            <button
              onClick={() => setActiveTab("ranking")}
              className={`px-6 py-2 rounded-full font-body font-bold text-sm transition-all ${
                activeTab === "ranking"
                  ? "bg-brand-red text-white shadow-md"
                  : "text-on-surface-variant hover:text-white"
              }`}
            >
              Ranking
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
