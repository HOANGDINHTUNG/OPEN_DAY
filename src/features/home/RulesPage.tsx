import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, ArrowLeft } from "lucide-react";

export function RulesPage() {
  const navigate = useNavigate();
  const [setupStep, setSetupStep] = useState<"rules" | "topic" | "name">(
    "rules",
  );
  const [selectedTopic, setSelectedTopic] = useState<
    "nangLucSo" | "doVuiTrend" | "tracNghiemNhanh" | "tanSinhVien" | null
  >(null);
  const [playerName, setPlayerName] = useState("");

  const rules = [
    {
      title: "CÁCH CHƠI",
      desc: "Chọn 1 trong 4 chủ đề trước khi chơi, trả lời 7 nấc câu hỏi.",
    },
    {
      title: "SAI THÌ SAO",
      desc: "Vẫn nhận được phần thưởng tương ứng với nấc đạt được cao nhất trước đó.",
    },
    {
      title: "ĐÚNG THÌ SAO",
      desc: "Chọn nhận quà ngay hoặc chơi tiếp lên nấc cao hơn.",
    },
    {
      title: "THỜI GIAN",
      desc: "Mỗi câu có đồng hồ đếm ngược 15 giây.",
    },
  ];

  const handleStart = () => {
    if (!playerName.trim()) return;
    navigate("/play", {
      state: { topicKey: selectedTopic, playerName: playerName.trim() },
    });
  };

  return (
    <div className="min-h-screen tech-pattern flex flex-col justify-center px-8 text-on-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto w-full z-10 transition-all duration-500">
        {setupStep === "rules" && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
            <p className="font-display font-bold text-brand-red tracking-widest text-lg md:text-xl uppercase mb-2">
              Trước Khi Bắt Đầu
            </p>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-primary-foreground mb-16 drop-shadow-md">
              Đọc nhanh trong{" "}
              <span className="text-brand-red glow-red">30 giây</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {rules.map((rule, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-8 rounded-2xl hover-pop"
                >
                  <h3 className="font-display font-bold text-golden text-xl uppercase mb-4 tracking-wider">
                    {rule.title}
                  </h3>
                  <p className="font-body text-xl font-medium text-on-surface-variant leading-relaxed">
                    {rule.desc}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSetupStep("topic")}
              className="flex items-center gap-4 bg-transparent border border-brand-red text-brand-red hover:bg-brand-red hover:text-white transition-all duration-300 font-display font-bold text-2xl px-10 py-4 rounded-xl uppercase tracking-wider group glow-red"
            >
              TIẾP TỤC{" "}
              <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        )}

        {setupStep === "topic" && (
          <div className="animate-in fade-in zoom-in-95 duration-500">
            <button
              onClick={() => setSetupStep("rules")}
              className="flex items-center gap-2 text-on-surface-variant hover:text-white mb-8 transition-colors font-body"
            >
              <ArrowLeft className="w-5 h-5" /> Quay lại
            </button>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-primary-foreground mb-12 drop-shadow-md uppercase text-center">
              Chọn <span className="text-golden glow-gold">Chủ Đề</span>
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { id: "nangLucSo", title: "Năng Lực Số" },
                { id: "doVuiTrend", title: "Trend Vui" },
                { id: "tracNghiemNhanh", title: "Kỹ Năng Mềm" },
                { id: "tanSinhVien", title: "Tân Sinh Viên" },
              ].map((topic) => (
                <div
                  key={topic.id}
                  onClick={() => {
                    setSelectedTopic(topic.id as any);
                    setSetupStep("name");
                  }}
                  className="glass-panel p-10 rounded-3xl cursor-pointer hover:border-golden hover:scale-[1.02] transition-all hover:bg-surface-hover hover:shadow-[0_0_30px_rgba(234,179,8,0.2)] text-center group"
                >
                  <h3 className="font-display font-bold text-2xl text-on-surface group-hover:text-golden uppercase">
                    {topic.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {setupStep === "name" && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500 max-w-xl mx-auto text-center relative z-20">
            <button
              onClick={() => setSetupStep("topic")}
              className="flex items-center gap-2 text-on-surface-variant hover:text-white mb-8 transition-colors font-body mx-auto"
            >
              <ArrowLeft className="w-5 h-5" /> Quay lại
            </button>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-primary-foreground mb-4 drop-shadow-md uppercase">
              Tên Bạn <span className="text-brand-red glow-red">Là Gì?</span>
            </h1>
            <p className="font-body text-xl text-on-surface-variant mb-12">
              Để chúng mình vinh danh trên Bảng Vàng nhé!
            </p>

            <input
              type="text"
              autoFocus
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleStart();
              }}
              placeholder="Nhập tên của bạn..."
              className="w-full bg-surface border-2 border-glass-stroke focus:border-brand-red focus:outline-none text-white font-display text-3xl px-8 py-6 rounded-2xl mb-12 shadow-inner transition-all placeholder:text-on-surface-variant/50 input-glow"
            />

            <button
              onClick={handleStart}
              disabled={!playerName.trim()}
              className="w-full flex justify-center items-center gap-4 bg-brand-red text-white disabled:bg-surface disabled:text-on-surface-variant transition-all duration-300 font-display font-bold text-3xl px-10 py-6 rounded-2xl uppercase tracking-wider hover-pop glow-red disabled:hover:scale-100 disabled:opacity-50 disabled:shadow-none cursor-pointer disabled:cursor-not-allowed"
            >
              BẮT ĐẦU CHƠI
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
