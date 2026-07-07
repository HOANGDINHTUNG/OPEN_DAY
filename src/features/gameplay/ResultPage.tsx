import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function ResultPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { level, prize } = location.state || { level: 1, prize: "Kẹo" };

  useEffect(() => {
    // Tự động reset về trang chủ sau 15 giây nếu không ai thao tác
    const timer = setTimeout(() => {
      navigate("/");
    }, 15000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen tech-pattern flex flex-col justify-center items-center relative overflow-hidden text-on-background px-8">
      <div className="max-w-4xl w-full text-center relative z-10 animate-in zoom-in-95 duration-700">
        {level === 7 ? (
          <h1 className="text-7xl font-display font-bold text-golden uppercase mb-6 drop-shadow-[0_0_30px_rgba(250,219,20,0.8)] glow-gold inline-block">
            Quán Quân!
          </h1>
        ) : (
          <h1 className="text-5xl font-display font-bold text-white uppercase mb-6">
            Chúc Mừng!
          </h1>
        )}

        <div className="glass-panel p-16 rounded-3xl mt-8 relative border-t-4 border-brand-red">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-brand-red rounded-full flex items-center justify-center border-4 border-[#020617] shadow-xl glow-red">
            <span className="font-display font-bold text-4xl text-white">
              {level}
            </span>
          </div>

          <h2 className="font-display text-4xl font-bold uppercase tracking-wide mt-6 mb-4">
            Bạn đã xuất sắc đạt <span className="text-golden">Nấc {level}</span>
          </h2>

          <p className="font-body text-2xl text-on-surface-variant font-medium">
            Phần quà:{" "}
            <span className="text-white font-bold text-3xl ml-2 bg-gradient-to-r from-brand-red to-golden text-transparent bg-clip-text drop-shadow-sm">
              {prize}
            </span>
          </p>

          <p className="font-body text-lg text-on-surface-variant/70 italic mt-8 border-t border-glass-stroke pt-6">
            — Quản trò tại Booth sẽ trao quà trực tiếp —
          </p>

          <div className="mt-12">
            <button
              onClick={() => navigate("/")}
              className="bg-transparent border border-glass-stroke hover:bg-surface text-on-surface-variant hover:text-white px-8 py-3 rounded-full font-body font-medium transition-all"
            >
              Màn hình tự reset sau vài giây (Bấm để về ngay)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
