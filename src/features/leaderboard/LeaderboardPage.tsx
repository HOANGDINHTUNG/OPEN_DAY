import { useState, useMemo, useEffect } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Crown,
  Search,
  Users,
  ShieldAlert,
  ChevronLeft,
  Trophy,
} from "lucide-react";
import {
  getLeaderboard,
  getInventory,
  getCurrentPlayer,
} from "@/utils/storage";
import { useNavigate } from "react-router-dom";

export function LeaderboardPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const inventoryData = getInventory();

  // State for rendering players safely
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    // Generate/fetch once when component mounts in Browser
    const board = getLeaderboard(97); // from storage logic
    setLeaderboard(board);
  }, []);

  const currentPlayer = getCurrentPlayer();

  const filteredPlayers = useMemo(() => {
    return leaderboard.filter((p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [leaderboard, searchTerm]);

  // Extract top 3 and others
  const top3 = filteredPlayers.slice(0, 3);
  let others = filteredPlayers.slice(3, 50);

  // Guarantee current player is in the list
  if (currentPlayer) {
    const myRankIndex = filteredPlayers.findIndex(
      (p) => p.name === currentPlayer,
    );
    if (myRankIndex >= 50) {
      others.push(filteredPlayers[myRankIndex]);
    }
  }

  return (
    <div className="min-h-screen text-on-background font-body tech-pattern pt-24 pb-16 px-4 md:px-10">
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-10 h-16 bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-200">
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
        <div
          className="font-display font-bold text-brand-red flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-3 py-1 rounded transition-colors"
          onClick={() => navigate("/")}
        >
          <ChevronLeft className="w-5 h-5" /> Về Trang Chủ
        </div>
      </nav>

      <div className="max-w-7xl mx-auto flex flex-col xl:flex-row gap-8">
        {/* Leaderboard Column */}
        <div className="w-full xl:w-2/3 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-2">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-deep-space drop-shadow-sm flex items-center gap-3">
              <Trophy className="w-8 h-8 md:w-12 md:h-12 text-yellow-500" />
              Bảng Xếp Hạng
            </h1>

            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-deep-space/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Tìm user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-gray-300 text-deep-space pl-10 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-red shadow-sm placeholder:text-gray-400 font-body transition-shadow"
              />
            </div>
          </div>

          <GlassPanel className="p-6 md:p-8 rounded-2xl glow-sm shadow-xl flex flex-col gap-8">
            {/* Top 3 Podium (Only render if we have at least 3) */}
            {top3.length > 0 && (
              <div className="flex justify-center items-end gap-2 md:gap-6 pt-4 pb-8 border-b border-white/10">
                {/* 2nd Place */}
                {top3[1] && (
                  <div
                    className="flex flex-col items-center animate-fade-in"
                    style={{ animationDelay: "200ms" }}
                  >
                    <div className="relative mb-2">
                      <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-gray-400 bg-white overflow-hidden shadow-[0_0_20px_rgba(156,163,175,0.4)]">
                        <img src={top3[1].avatar} alt={top3[1].name} />
                      </div>
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-gray-400 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shadow-lg">
                        2
                      </div>
                    </div>
                    <span className="font-display font-bold text-deep-space text-sm md:text-base mt-2 flex items-center gap-1">
                      {top3[1].name.split("_")[1] || top3[1].name}
                      {currentPlayer === top3[1].name && (
                        <Badge className="bg-green-500 text-deep-space text-[10px] px-1">
                          YOU
                        </Badge>
                      )}
                    </span>
                    <span className="text-brand-red font-bold text-sm">
                      {top3[1].score} đ
                    </span>
                  </div>
                )}

                {/* 1st Place */}
                <div className="flex flex-col items-center animate-fade-in z-10">
                  <div className="relative mb-2">
                    <Crown className="absolute -top-10 left-1/2 -translate-x-1/2 w-10 h-10 text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                    <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-yellow-400 bg-white overflow-hidden shadow-[0_0_30px_rgba(250,204,21,0.5)]">
                      <img
                        src={top3[0].avatar}
                        alt={top3[0].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-deep-space w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-xl ring-2 ring-white">
                      1
                    </div>
                  </div>
                  <span className="font-display font-bold text-brand-red text-base md:text-xl mt-3 drop-shadow-sm flex items-center gap-2">
                    {top3[0].name.split("_")[1] || top3[0].name}
                    {currentPlayer === top3[0].name && (
                      <Badge className="bg-green-500 text-deep-space text-xs px-1">
                        YOU
                      </Badge>
                    )}
                  </span>
                  <span className="text-brand-red font-bold text-base bg-brand-red/10 px-4 py-1 rounded-full mt-1 border border-brand-red/30">
                    {top3[0].score} đ
                  </span>
                </div>

                {/* 3rd Place */}
                {top3[2] && (
                  <div
                    className="flex flex-col items-center animate-fade-in"
                    style={{ animationDelay: "400ms" }}
                  >
                    <div className="relative mb-2">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-4 border-amber-700 bg-white overflow-hidden shadow-[0_0_15px_rgba(180,83,9,0.4)]">
                        <img src={top3[2].avatar} alt={top3[2].name} />
                      </div>
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-amber-700 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shadow-lg">
                        3
                      </div>
                    </div>
                    <span className="font-display font-bold text-deep-space text-xs md:text-sm mt-2 flex items-center gap-1">
                      {top3[2].name.split("_")[1] || top3[2].name}
                      {currentPlayer === top3[2].name && (
                        <Badge className="bg-green-500 text-deep-space text-[10px] px-1">
                          YOU
                        </Badge>
                      )}
                    </span>
                    <span className="text-brand-red font-bold text-xs">
                      {top3[2].score} đ
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Rest of the list */}
            <div className="flex flex-col gap-2 overflow-y-auto custom-scroll pr-2 h-[450px]">
              {others.map((player) => {
                const globalRank =
                  filteredPlayers.findIndex((p) => p.name === player.name) + 1;
                const isMe = currentPlayer === player.name;

                return (
                  <div
                    key={player.name}
                    className={`flex items-center p-3 md:p-4 rounded-xl transition-all duration-300 hover:scale-[1.01] ${isMe ? "bg-green-50 border-2 border-green-400 shadow-[0_0_20px_rgba(74,222,128,0.2)]" : "bg-white border border-gray-100 hover:bg-gray-50 shadow-sm"}`}
                  >
                    <div className="w-8 md:w-10 font-display font-bold text-gray-400 text-base md:text-lg text-center">
                      #{globalRank}
                    </div>
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border border-gray-200 bg-white ml-2 md:ml-4 mr-3 md:mr-4">
                      <img
                        src={player.avatar}
                        alt={player.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-deep-space font-display text-sm md:text-base flex items-center gap-2">
                        {player.name}
                        {isMe && (
                          <Badge className="bg-green-500 text-deep-space text-[10px] md:text-xs">
                            YOU
                          </Badge>
                        )}
                      </h4>
                      <p className="text-gray-500 text-xs md:text-sm font-body">
                        Thời gian: {player.timeInSeconds}s
                      </p>
                    </div>
                    <div className="font-display font-bold text-brand-red text-base md:text-xl pr-2 md:pr-4">
                      {player.score}{" "}
                      <span className="text-xs text-gray-400 font-normal">
                        đ
                      </span>
                    </div>
                  </div>
                );
              })}

              {others.length === 0 && top3.length === 0 && (
                <div className="py-12 text-center text-gray-500">
                  Không tìm thấy người chơi nào.
                </div>
              )}
            </div>
          </GlassPanel>
        </div>

        {/* Side Panel: User Profile & Inventory Insights */}
        <aside className="w-full xl:w-1/3 flex flex-col gap-6">
          <GlassPanel className="p-6 rounded-2xl glow-sm shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-2 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <span className="material-symbols-outlined text-[100px] -translate-y-4">
                account_circle
              </span>
            </div>
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4 mb-4">
              <Users className="text-deep-space w-6 h-6" />
              <h3 className="font-display font-bold text-deep-space text-lg">
                My Profile
              </h3>
            </div>

            {currentPlayer ? (
              <div className="flex flex-col items-center">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-green-400 bg-white shadow-[0_0_20px_rgba(74,222,128,0.3)] mb-4">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentPlayer}&backgroundColor=b6e3f4`}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-4 right-0 w-6 h-6 bg-green-500 border-2 border-deep-space rounded-full"></div>
                </div>
                <h4 className="font-display font-bold text-xl text-deep-space mb-1">
                  {currentPlayer}
                </h4>
                <p className="text-gray-500 font-body text-sm mb-6">
                  Đã sẵn sàng nhận quà chưa?
                </p>

                <Button
                  className="w-full bg-brand-red font-display text-white font-bold hover:bg-red-700 shadow-[0_0_15px_rgba(197,0,5,0.4)]"
                  onClick={() => navigate("/game")}
                >
                  Chơi Lại Minigame
                </Button>
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500 font-body text-sm mb-4">
                  Bạn chưa tham gia lượt chơi nào.
                </p>
                <Button
                  className="w-full font-display font-bold text-deep-space bg-white hover:bg-gray-100"
                  onClick={() => navigate("/game")}
                >
                  Bắt Đầu Đua Top
                </Button>
              </div>
            )}
          </GlassPanel>

          <GlassPanel className="p-6 rounded-2xl glow-sm shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <ShieldAlert className="text-brand-red w-6 h-6" />
                <h3 className="font-display font-bold text-deep-space text-lg">
                  Quỹ Quà Tặng
                </h3>
              </div>
              <Badge
                variant="default"
                className="border-brand-red/20 text-brand-red bg-brand-red/10"
              >
                Live
              </Badge>
            </div>

            <div className="flex flex-col gap-3">
              {inventoryData.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-gray-100 p-4 rounded-xl flex items-center justify-between shadow-sm"
                >
                  <div>
                    <p
                      className={`font-display font-bold text-sm ${item.color}`}
                    >
                      {item.name}
                    </p>
                    <p className="text-gray-500 text-xs font-body mt-1">
                      Yêu cầu mốc: {item.level}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-display font-bold text-2xl text-deep-space">
                      {item.stock}
                    </span>
                    <span className="text-gray-400 text-[10px] uppercase">
                      Còn Lại
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </GlassPanel>
        </aside>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); border-radius: 8px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 8px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
      `,
        }}
      ></style>
    </div>
  );
}
