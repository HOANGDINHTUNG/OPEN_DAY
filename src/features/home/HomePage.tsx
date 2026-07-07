import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button";

// Assuming we want a TopNavBar component or we just inline it here for simplicity,
// usually it would be in App.tsx or a layout wrapper, but let's put it here if it's specific to the home page or we can make a shared Nav.
// The user provided the HTML snippet, we will implement it directly.

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="w-full relative overflow-x-hidden flex flex-col">
      {/* Main Content */}
      <main className="pt-32 pb-16 px-4 md:px-10 max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16 mt-8">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-deep-space mb-4 font-bold">
            Minigame OpenDay <br />
            <span className="text-brand-red">PTIT x Rikkei Edu</span>
          </h1>
          <p className="font-display text-xl md:text-2xl text-on-surface-variant font-semibold">
            Where dreams come true
          </p>
          <div className="mt-12 flex flex-col items-center gap-6">
            <Button
              className="bg-brand-red text-white font-display font-bold text-2xl py-6 px-12 rounded-full hover:bg-red-700 hover:scale-105 transition-all shadow-[0_0_30px_rgba(197,0,5,0.6)] hover:shadow-[0_0_50px_rgba(197,0,5,0.9)] animate-pulse"
              onClick={() => navigate("/level")}
            >
              🔥 CHƠI MINIGAME 🔥
            </Button>
            <div className="flex justify-center gap-4 mt-4">
              <Button
                variant="outline"
                className="border-deep-space text-deep-space font-bold py-6 px-8 rounded-xl hover:bg-gray-100"
              >
                Tìm hiểu thêm
              </Button>
            </div>
          </div>
        </section>

        {/* Topic Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {/* Card 1 */}
          <div
            className="glass-panel-light rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden group cursor-pointer hover-pop"
            onClick={() => navigate("/tech")}
          >
            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
              <span className="material-symbols-outlined text-[60px] translate-x-4 -translate-y-4">
                memory
              </span>
            </div>
            <div className="h-14 w-14 rounded-full bg-deep-space flex items-center justify-center text-white mb-2 shadow-inner">
              <span className="material-symbols-outlined text-3xl">memory</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-deep-space">
              Công nghệ
            </h3>
            <p className="font-body text-on-surface-variant flex-1">
              Khám phá các thử thách lập trình, cấu trúc dữ liệu và giải thuật
              cơ bản đến nâng cao.
            </p>
            <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-200">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-deep-space text-white text-xs font-bold font-body">
                <span className="material-symbols-outlined text-[14px]">
                  info
                </span>{" "}
                Xem chi tiết
              </span>
              <span className="material-symbols-outlined text-brand-red group-hover:translate-x-2 transition-transform duration-300">
                arrow_forward
              </span>
            </div>
          </div>

          {/* Card 2 */}
          <div
            className="glass-panel-light rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden group cursor-pointer hover-pop"
            onClick={() => navigate("/soft-skills")}
          >
            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
              <span className="material-symbols-outlined text-[60px] translate-x-4 -translate-y-4">
                psychology
              </span>
            </div>
            <div className="h-14 w-14 rounded-full bg-deep-space flex items-center justify-center text-white mb-2 shadow-inner">
              <span className="material-symbols-outlined text-3xl">
                psychology
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-deep-space">
              Kỹ năng mềm
            </h3>
            <p className="font-body text-on-surface-variant flex-1">
              Xử lý các tình huống giao tiếp, làm việc nhóm và tư duy giải quyết
              vấn đề.
            </p>
            <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-200">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-deep-space text-white text-xs font-bold font-body">
                <span className="material-symbols-outlined text-[14px]">
                  info
                </span>{" "}
                Xem chi tiết
              </span>
              <span className="material-symbols-outlined text-brand-red group-hover:translate-x-2 transition-transform duration-300">
                arrow_forward
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div
            className="glass-panel-light rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden group cursor-pointer hover-pop"
            onClick={() => navigate("/digital")}
          >
            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-40 transition-opacity">
              <span className="material-symbols-outlined text-[60px] translate-x-4 -translate-y-4">
                business_center
              </span>
            </div>
            <div className="h-14 w-14 rounded-full bg-deep-space flex items-center justify-center text-white mb-2 shadow-inner">
              <span className="material-symbols-outlined text-3xl">
                business_center
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-deep-space">
              Năng lực số & DN
            </h3>
            <p className="font-body text-on-surface-variant flex-1">
              Kiến thức về chuyển đổi số, môi trường doanh nghiệp IT và văn hóa
              công ty.
            </p>
            <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-200">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-deep-space text-white text-xs font-bold font-body">
                <span className="material-symbols-outlined text-[14px]">
                  info
                </span>{" "}
                Xem chi tiết
              </span>
              <span className="material-symbols-outlined text-brand-red group-hover:translate-x-2 transition-transform duration-300">
                arrow_forward
              </span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
