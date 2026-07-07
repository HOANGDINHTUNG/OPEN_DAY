import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getRandomizedGameSet } from "@/data/questions";
import { recordPlay } from "@/utils/storage";
import { useAudio } from "@/utils/useAudio";

const PRIZES = ["Kẹo", "Kẹo", "Snack", "Snack", "Snack", "Ly sứ", "Pad chuột"];

export function GamePlayPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { playSelect, playCorrect, playWrong, playTick } = useAudio();

  const { topicKey, playerName } = location.state || {};

  // Game State
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  // Modals & Flows
  const [modalType, setModalType] = useState<
    "none" | "mc_review" | "correct" | "wrong"
  >("none");
  const [gameOver, setGameOver] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!topicKey) {
      navigate("/rules");
      return;
    }
    // Generate sequence of 7 questions on mount
    const qSet = getRandomizedGameSet(7, topicKey);
    setQuestions(qSet);
  }, [topicKey, navigate]);

  useEffect(() => {
    // Timer logic
    if (modalType !== "none" || gameOver || questions.length === 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 6 && prev > 1) {
          playTick();
        }
        if (prev <= 1) {
          handleWrong();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [modalType, gameOver, questions, currentIdx]);

  if (questions.length === 0) return null;

  const currentQ = questions[currentIdx];
  const isMultipleChoice = !!currentQ.options;

  const handleSelectOption = (opt: string) => {
    playSelect();
    const isCorrect = opt.charAt(0) === currentQ.answer.charAt(0);
    if (isCorrect) handleCorrect();
    else handleWrong();
  };

  const handleCorrect = () => {
    playCorrect();
    // If it's the final level (7th question), auto win!
    if (currentIdx === 6) {
      finishGame(7); // Won Nấc 7
    } else {
      setModalType("correct");
    }
  };

  const handleWrong = () => {
    playWrong();
    setModalType("wrong");
    // Wait a brief moment, then end game with Nấc 1 fallback
    setTimeout(() => {
      finishGame(1);
    }, 3000);
  };

  const finishGame = (levelAchieved: number) => {
    setGameOver(true);
    recordPlay(levelAchieved, playerName);
    // Move to result page
    navigate("/result", {
      state: { level: levelAchieved, prize: PRIZES[levelAchieved - 1] },
    });
  };

  const handleNextLevel = () => {
    setCurrentIdx((prev) => prev + 1);
    setTimeLeft(30);
    setModalType("none");
  };

  return (
    <div className="min-h-screen tech-pattern flex px-8 py-10 relative overflow-hidden text-on-background">
      {/* LEFT: LADDER */}
      <div className="w-[300px] flex flex-col-reverse justify-between gap-3 shrink-0 relative z-10 glass-panel p-6 rounded-3xl">
        <h3 className="font-display font-bold text-center text-golden uppercase tracking-widest mb-2 border-b border-glass-stroke pb-4 h-full flex flex-col justify-end opacity-50">
          Thang Quà Tặng
        </h3>
        {PRIZES.map((prize, idx) => {
          const nac = idx + 1;
          const isActive = nac === currentIdx + 1;
          const isPassed = nac < currentIdx + 1;

          let stateStyle =
            "bg-surface/30 text-on-surface-variant border-transparent";
          if (isActive)
            stateStyle =
              "bg-brand-red text-white glow-red font-bold scale-[1.02] border-brand-red";
          else if (isPassed)
            stateStyle =
              "bg-primary/20 text-white border-primary/50 opacity-70";

          return (
            <div
              key={nac}
              className={`flex justify-between items-center px-4 py-3 rounded-xl border transition-all duration-300 ${stateStyle}`}
            >
              <span className="font-display text-xl uppercase">{nac}</span>
              <span className="font-body font-medium">{prize}</span>
            </div>
          );
        })}
      </div>

      {/* RIGHT: GAME AREA */}
      <div className="flex-1 flex flex-col items-center justify-center pl-12 relative z-10">
        {/* TIMER */}
        <div className="absolute top-0 right-0">
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center font-display font-bold text-4xl border-4 shadow-xl ${
              timeLeft <= 5
                ? "text-brand-red border-brand-red glow-red animate-pulse"
                : "text-golden border-golden glow-gold"
            }`}
          >
            {timeLeft}s
          </div>
        </div>

        {/* QUESTION BOX */}
        <div className="glass-panel w-full max-w-4xl p-10 py-16 rounded-3xl relative mb-12 shadow-2xl">
          <div className="absolute -top-6 left-8 bg-surface px-6 py-2 border border-glass-stroke rounded-full font-display font-bold text-golden uppercase tracking-wider text-sm shadow-md">
            Câu hỏi nấc {currentIdx + 1}
          </div>
          <h2 className="font-body text-3xl md:text-4xl text-primary-foreground leading-snug font-medium text-center">
            {currentQ.question}
          </h2>
        </div>

        {/* OPTIONS OR SHORT ANSWER */}
        {isMultipleChoice ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {currentQ.options.map((opt: string, idx: number) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(opt)}
                className="bg-surface hover:bg-surface-hover hover:scale-105 border border-glass-stroke text-on-surface p-6 rounded-2xl text-left font-body text-xl transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-golden"
              >
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-8 w-full max-w-4xl">
            <p className="font-body text-xl text-on-surface-variant italic border-b border-glass-stroke pb-4 px-10 text-center">
              *Hãy đọc thật to đáp án của bạn cho Quản trò (MC) cùng nghe nhé!*
            </p>
            <button
              onClick={() => setModalType("mc_review")}
              className="bg-golden text-golden-foreground px-10 py-4 rounded-full font-display font-bold text-2xl uppercase tracking-wider hover-pop shadow-lg glow-gold"
            >
              MC Xác Nhận Kết Quả
            </button>
          </div>
        )}
      </div>

      {/* OVERLAYS FOR MODALS */}
      {modalType !== "none" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020617]/90 backdrop-blur-md p-6">
          {/* CORRECT BRANCHING */}
          {modalType === "correct" && (
            <div className="glass-panel p-12 rounded-3xl max-w-2xl w-full text-center border-golden glow-gold animate-in zoom-in duration-300">
              <h2 className="font-display text-5xl text-golden uppercase font-bold mb-4 drop-shadow-md">
                Chính Xác!
              </h2>
              <p className="font-body text-xl text-on-surface mb-10">
                Bạn đang ở{" "}
                <span className="font-bold text-white">
                  Nấc {currentIdx + 1} — {PRIZES[currentIdx]}
                </span>
              </p>
              <div className="grid grid-cols-2 gap-6">
                <button
                  onClick={() => finishGame(currentIdx + 1)}
                  className="bg-surface/50 hover:bg-surface border border-glass-stroke text-on-surface py-5 rounded-2xl font-display font-bold text-2xl uppercase transition-all"
                >
                  Nhận Quà Ngay
                  <span className="block text-sm font-body font-normal text-on-surface-variant mt-1 normal-case">
                    Dừng lại với {PRIZES[currentIdx]}
                  </span>
                </button>
                <button
                  onClick={handleNextLevel}
                  className="bg-brand-red text-white py-5 rounded-2xl font-display font-bold text-2xl uppercase hover:scale-105 transition-all shadow-[0_0_20px_rgba(218,18,26,0.5)]"
                >
                  Chơi Tiếp
                  <span className="block text-sm font-body font-normal text-white/80 mt-1 normal-case">
                    Tiến lên Nấc {currentIdx + 2}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* WRONG FALLBACK */}
          {modalType === "wrong" && (
            <div className="glass-panel p-12 rounded-3xl max-w-xl w-full text-center border-brand-red glow-red animate-in slide-in-from-top-10 duration-500">
              <h2 className="font-display text-6xl text-brand-red uppercase font-bold mb-4">
                Rất Tiếc!
              </h2>
              <p className="font-body text-xl text-on-surface mb-8">
                Bạn đã trả lời sai hoặc hết giờ. Trò chơi kết thúc!
              </p>
              <div className="bg-surface p-4 rounded-xl border border-glass-stroke inline-block mb-6">
                <p className="font-body text-on-surface-variant">Giải thích:</p>
                <p className="font-body text-white font-medium mt-1">
                  {currentQ.explanation || `Đáp án đúng là: ${currentQ.answer}`}
                </p>
              </div>
              <p className="text-on-surface-variant animate-pulse font-body">
                Đang tự động chuyển về nấc quà thấp nhất...
              </p>
            </div>
          )}

          {/* MC REVIEW MODAL */}
          {modalType === "mc_review" && (
            <div className="glass-panel p-10 rounded-3xl max-w-3xl w-full border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3)] relative">
              <div className="absolute -top-4 -right-4 bg-blue-600 text-white font-display px-4 py-1 rounded-full text-sm uppercase tracking-wide">
                MC ONLY
              </div>
              <h3 className="font-display text-2xl text-blue-400 mb-6 uppercase tracking-wider">
                Khu vực dành cho Quản Trò
              </h3>

              <div className="bg-surface/50 border border-glass-stroke p-6 rounded-2xl mb-8">
                <p className="text-on-surface-variant font-body mb-2 text-sm">
                  Đáp án lý tưởng:
                </p>
                <p className="text-3xl text-white font-display font-medium mb-4">
                  {currentQ.answer}
                </p>
                {currentQ.explanation && (
                  <p className="text-gray-400 font-body italic border-t border-glass-stroke pt-4">
                    {currentQ.explanation}
                  </p>
                )}
              </div>

              <p className="text-center text-on-surface font-body mb-6">
                Đánh giá câu trả lời thực tế của người chơi:
              </p>

              <div className="flex gap-6 justify-center">
                <button
                  onClick={handleWrong}
                  className="flex-1 bg-surface hover:bg-[#da121a]/20 border border-[#da121a] text-[#da121a] py-6 rounded-xl font-display font-bold text-3xl uppercase transition-colors"
                >
                  Chưa Tới
                </button>
                <button
                  onClick={handleCorrect}
                  className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-6 rounded-xl font-display font-bold text-3xl uppercase shadow-lg glow-sm transition-transform hover:-translate-y-1"
                >
                  Tuyệt Vời
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
