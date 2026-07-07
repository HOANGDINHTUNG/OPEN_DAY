import { useState, useEffect } from "react";
import { MousePointer2, Keyboard, MonitorSpeaker, Lock, X } from "lucide-react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/Badge";
import { getInventory, InventoryItem, setCurrentPlayer } from "@/utils/storage";

export function LevelSelectionPage() {
  const navigate = useNavigate();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [showNameModal, setShowNameModal] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);

  useEffect(() => {
    setInventory(getInventory());
  }, []);

  const handleLevelClick = (id: string, locked: boolean) => {
    if (locked) return;
    setSelectedLevelId(id);
    setShowNameModal(true);
  };

  const handleStartGame = () => {
    if (!playerName.trim() || !selectedLevelId) return;
    setCurrentPlayer(playerName.trim());
    navigate(`/play/${selectedLevelId}`);
  };

  const getStock = (id: string) =>
    inventory.find((i) => i.id === id)?.stock || 0;

  const levels = [
    {
      id: "nangLucSo",
      title: "Năng Lực Số",
      stock: getStock("easy"),
      icon: <MousePointer2 className="w-10 h-10" />,
      color: "text-primary",
      bgBase: "bg-primary/10",
      borderBase: "border-primary/30",
      locked: getStock("easy") <= 0,
    },
    {
      id: "doVuiTrend",
      title: "Đố Vui Trend",
      stock: getStock("medium"),
      icon: <Keyboard className="w-10 h-10" />,
      color: "text-[#F59E0B]",
      bgBase: "bg-[#F59E0B]/10",
      borderBase: "border-[#F59E0B]/30",
      locked: getStock("medium") <= 0,
    },
    {
      id: "traLoiNgan",
      title: "Trả Lời Ngắn",
      stock: getStock("hard"),
      icon: <MonitorSpeaker className="w-10 h-10" />,
      color: "text-brand-red",
      bgBase: "bg-brand-red/10",
      borderBase: "border-brand-red/30",
      locked: getStock("hard") <= 0,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 h-full flex flex-col justify-center min-h-[calc(100vh-140px)]">
      <div className="text-center mb-16">
        <Badge
          variant="brand"
          className="mb-4 uppercase tracking-widest text-xs px-4 py-1.5"
        >
          Step 2
        </Badge>
        <h1 className="text-4xl md:text-5xl font-bold text-deep-space mb-4">
          Lựa chọn Độ khó
        </h1>
        <p className="text-lg text-on-surface-variant max-w-2xl mx-auto">
          Mức độ bạn chọn sẽ quyết định giới hạn phần thưởng bạn có thể nhận
          được. Hệ thống đã khóa các phần thưởng hết hàng.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {levels.map((lvl) => (
          <GlassPanel
            key={lvl.id}
            interactive={!lvl.locked}
            className={`p-10 flex flex-col items-center text-center group relative overflow-hidden ${lvl.locked ? "opacity-50 grayscale cursor-not-allowed" : ""}`}
            onClick={() => handleLevelClick(lvl.id, lvl.locked)}
          >
            {/* Ambient Background Glow inside the card */}
            <div
              className={`absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[60px] opacity-20 ${lvl.bgBase} pointer-events-none`}
            ></div>

            {lvl.locked && (
              <div className="absolute inset-0 z-20 flex items-center justify-center backdrop-blur-[2px] bg-[#0c0f0f]/50">
                <div className="bg-brand-red text-white font-bold px-6 py-2 rounded-lg border border-red-500/50 shadow-[0_0_20px_rgba(226,35,26,0.5)] -rotate-12 flex items-center gap-2">
                  <Lock size={18} /> Hết quà
                </div>
              </div>
            )}

            <Badge
              variant={
                lvl.id === "traLoiNgan"
                  ? "error"
                  : lvl.id === "doVuiTrend"
                    ? "warning"
                    : "default"
              }
              className="mb-8"
            >
              <div
                className={`w-2 h-2 rounded-full ${lvl.locked ? "bg-current" : "animate-pulse bg-current"}`}
              ></div>
              <span className="capitalize">
                {lvl.id === "nangLucSo"
                  ? "Topic 1"
                  : lvl.id === "doVuiTrend"
                    ? "Topic 2"
                    : "Topic 3"}
              </span>
            </Badge>

            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 border ${lvl.bgBase} ${lvl.borderBase} ${lvl.color} shadow-inner group-hover:scale-110 transition-transform duration-500`}
            >
              {lvl.icon}
            </div>

            <h2 className="text-2xl font-bold text-deep-space mb-2 z-10">
              {lvl.title}
            </h2>

            <div className="mt-8 pt-6 w-full border-t border-glass-stroke flex justify-between items-center z-10">
              <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest">
                Kho quà
              </span>
              <span className={`font-bold text-lg ${lvl.color}`}>
                Còn lại: {lvl.stock}
              </span>
            </div>
          </GlassPanel>
        ))}
      </div>

      {showNameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-space/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setShowNameModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                <span className="material-symbols-outlined text-3xl">
                  badge
                </span>
              </div>
              <h2 className="text-2xl font-display font-bold text-deep-space mb-2">
                Khởi đọng Hành Trình!
              </h2>
              <p className="text-gray-500 font-body text-sm">
                Hãy cho chúng tôi biết tên bạn để ghi danh lên bảng xếp hạng
                đỉnh cao nhé.
              </p>
            </div>
            <div className="mb-6">
              <input
                type="text"
                placeholder="VD: Nguyễn Văn A"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-red font-body text-deep-space placeholder:text-gray-400"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleStartGame()}
                autoFocus
              />
            </div>
            <button
              onClick={handleStartGame}
              disabled={!playerName.trim()}
              className="w-full bg-brand-red text-white font-display font-bold py-3 rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Tiến Vào Trò Chơi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
