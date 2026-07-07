import { useState, useEffect, useMemo } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { Trophy, AlertTriangle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { savePlayerScore } from "@/utils/storage";
import { questionsData } from "@/data/questions";

const REWARDS = [100, 300, 600, 1000, 2000, 4000, 8000, 15000, 30000, 50000];

function shuffleArray(array: any[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

function generateGameSet(categoryId: string) {
  let sourceQuestions = [];
  if (
    categoryId === "nangLucSo" ||
    categoryId === "doVuiTrend" ||
    categoryId === "traLoiNgan"
  ) {
    sourceQuestions = questionsData[categoryId as keyof typeof questionsData];
  } else {
    sourceQuestions = [
      ...questionsData.nangLucSo,
      ...questionsData.doVuiTrend,
      ...questionsData.traLoiNgan,
    ];
  }

  const easy = shuffleArray(
    sourceQuestions.filter((q) => q.difficulty === 1),
  ).slice(0, 3);
  const medium = shuffleArray(
    sourceQuestions.filter((q) => q.difficulty === 2),
  ).slice(0, 4);
  const hard = shuffleArray(
    sourceQuestions.filter((q) => q.difficulty === 3),
  ).slice(0, 3);

  // In case there are not enough questions in a category, we pad with random ones
  const result = [...easy, ...medium, ...hard];
  return result;
}

export function GamePlayPage() {
  const navigate = useNavigate();
  const { levelId } = useParams();

  const [questions] = useState(generateGameSet(levelId || ""));
  const [currentLevel, setCurrentLevel] = useState(0);

  const [timeLeft, setTimeLeft] = useState(20);

  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [showNextPrompt, setShowNextPrompt] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const currentQuestion = questions[currentLevel];

  useEffect(() => {
    if (!currentQuestion) return;
    if (timeLeft > 0 && !isFinished && !showNextPrompt && !gameOver) {
      const timerId = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timeLeft === 0 && !isFinished && !showNextPrompt && !gameOver) {
      handleTimeOut();
    }
  }, [timeLeft, isFinished, showNextPrompt, gameOver, currentQuestion]);

  const handleTimeOut = () => {
    setIsFinished(true);
    setGameOver(true);
  };

  const isDanger = timeLeft <= 5;
  const dashOffset = 283 - ((20 - timeLeft) / 20) * 283;

  const options = useMemo(() => {
    if (!currentQuestion) return [];
    if (currentQuestion.options && currentQuestion.options.length > 0) {
      return currentQuestion.options;
    } else {
      const fake = [
        "Agile",
        "KPI",
        "Deepfake",
        "Cyber Resilience",
        "Ransomware",
        "HR",
        "Webhook",
      ];
      const validFakes = shuffleArray(
        fake.filter((f) => f !== currentQuestion.answer),
      ).slice(0, 3);
      const rawOpts = shuffleArray([currentQuestion.answer, ...validFakes]);
      return rawOpts.map((opt, i) => `${String.fromCharCode(65 + i)}. ${opt}`);
    }
  }, [currentQuestion]);

  const correctAnswerLetter = useMemo(() => {
    if (!currentQuestion) return "A";
    if (currentQuestion.options) return currentQuestion.answer;
    const idx = options.findIndex((o: string) =>
      o.includes(currentQuestion.answer),
    );
    return String.fromCharCode(65 + idx);
  }, [currentQuestion, options]);

  const handleSelect = (letter: string) => {
    if (isFinished || showNextPrompt || gameOver) return;
    setSelectedLetter(letter);
    setIsFinished(true);

    if (letter === correctAnswerLetter) {
      setTimeout(() => {
        setShowNextPrompt(true);
        if (currentLevel === 9) {
          // Won the game
          setGameOver(true);
        }
      }, 2000);
    } else {
      // Failed
      setTimeout(() => {
        setGameOver(true);
      }, 2000);
    }
  };

  const handleContinue = () => {
    setCurrentLevel((lvl) => lvl + 1);
    setTimeLeft(20);
    setSelectedLetter(null);
    setIsFinished(false);
    setShowNextPrompt(false);
  };

  const handleStopAndSave = () => {
    const reward = REWARDS[currentLevel];
    savePlayerScore(reward, 20);
    navigate("/leaderboard");
  };

  const handleGameOverExit = () => {
    const reward =
      selectedLetter === correctAnswerLetter && currentLevel === 9
        ? REWARDS[9]
        : 0;
    savePlayerScore(reward, 20);
    navigate("/leaderboard");
  };

  if (!currentQuestion)
    return (
      <div className="p-8 text-black text-center font-display">Loading...</div>
    );

  const securedPrize =
    isFinished && selectedLetter === correctAnswerLetter
      ? REWARDS[currentLevel]
      : currentLevel > 0
        ? REWARDS[currentLevel - 1]
        : 0;

  return (
    <div className="min-h-screen text-on-background font-body tech-pattern pt-20 pb-16">
      {/* TopNavBar Minimized for game */}
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-10 h-16 bg-white/95 backdrop-blur-xl shadow-sm border-b border-gray-200">
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="h-8 w-8 bg-brand-red rounded flex items-center justify-center font-bold text-white text-xs">
            R
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-deep-space border-l-2 border-gray-300 pl-4">
            Thoát ra ngoài
          </span>
        </div>
        <div className="font-display font-bold text-primary flex items-center gap-2">
          <Trophy className="w-5 h-5" /> {securedPrize.toLocaleString()} đ
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 flex flex-col xl:flex-row gap-8">
        {/* Main Arena */}
        <div className="w-full xl:w-2/3 flex flex-col gap-6">
          <GlassPanel className="p-8 flex flex-col items-center relative text-center rounded-2xl glow-sm shadow-xl mt-4">
            <div className="flex w-full justify-between mb-4">
              <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-deep-space border border-deep-space text-xs font-bold font-display uppercase tracking-widest text-white">
                {currentQuestion.difficulty === 1
                  ? "Dễ"
                  : currentQuestion.difficulty === 2
                    ? "Trung Bình"
                    : "Khó"}
              </span>
              <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-brand-red text-white text-xs font-bold font-display shadow-sm uppercase tracking-widest">
                Câu {currentLevel + 1} / 10
              </span>
            </div>

            <div className="relative w-28 h-28 mb-8 flex justify-center items-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(0,0,0,0.1)"
                  strokeWidth="6"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  className={`transition-all duration-1000 ease-linear ${isDanger ? "text-brand-red" : "text-blue-500"}`}
                  strokeWidth="6"
                  strokeDasharray="283"
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                />
              </svg>
              <div
                className={`absolute font-display font-bold text-4xl ${isDanger ? "text-brand-red animate-ping" : "text-deep-space animate-pulse"}`}
              >
                {timeLeft}
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-deep-space leading-snug break-words">
              {currentQuestion.question}
            </h2>
          </GlassPanel>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((opt: string, i: number) => {
              const letter = String.fromCharCode(65 + i);
              const isSelected = selectedLetter === letter;
              const isCorrect = letter === correctAnswerLetter;

              let stateClass = "";
              if (isFinished) {
                if (isSelected && isCorrect)
                  stateClass =
                    "border-green-400 bg-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.4)]";
                if (isSelected && !isCorrect)
                  stateClass = "border-red-500 bg-red-500/30";
                if (!isSelected && isCorrect)
                  stateClass =
                    "border-green-400 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.4)]";
              } else if (isSelected) {
                stateClass =
                  "border-blue-400 bg-blue-500/20 shadow-[0_0_15px_rgba(96,165,250,0.4)]";
              } else {
                stateClass =
                  "hover:bg-gray-50 hover:border-gray-300 cursor-pointer shadow-sm";
              }

              return (
                <GlassPanel
                  key={i}
                  interactive={!isFinished}
                  onClick={() => handleSelect(letter)}
                  className={`p-6 flex items-start gap-4 transition-all duration-300 rounded-xl ${stateClass}`}
                >
                  <div
                    className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm shadow-inner transition-colors duration-300
                                        ${stateClass.includes("bg-green") ? "bg-green-500 text-deep-space" : stateClass.includes("bg-red") ? "bg-brand-red text-white" : stateClass.includes("bg-blue") ? "bg-blue-400 text-deep-space" : "bg-gray-100 border border-gray-300 text-gray-500"}
                                    `}
                  >
                    {letter}
                  </div>
                  <span className="text-lg font-body font-semibold text-deep-space text-opacity-90 text-left break-words pt-0.5 leading-tight">
                    {opt.replace(/^[A-D]\.\s*/, "")}
                  </span>
                </GlassPanel>
              );
            })}
          </div>
        </div>

        {/* Side Admin / Next Controls */}
        <aside className="w-full xl:w-1/3 flex flex-col gap-6 mt-4">
          {/* Prize Column */}
          <GlassPanel className="p-6 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10">
              <span className="material-symbols-outlined text-[100px] -translate-y-6 translate-x-4">
                monetization_on
              </span>
            </div>
            <div className="flex flex-col mb-6 items-center border-b border-gray-200 pb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                <Trophy className="w-6 h-6 text-yellow-500" />
              </div>
              <h3 className="font-display font-bold text-deep-space text-xl">
                Mốc phần thưởng
              </h3>
            </div>

            <div className="flex flex-col-reverse gap-2 p-1">
              {REWARDS.map((r, i) => {
                const isCurrent = currentLevel === i;
                const isPassed = currentLevel > i;
                return (
                  <div
                    key={i}
                    className={`flex justify-between items-center py-2 px-4 rounded-lg font-display text-sm md:text-base font-bold transition-all duration-300 ${isCurrent ? "bg-brand-red text-white border border-brand-red shadow-[0_4px_15px_rgba(197,0,5,0.4)] transform scale-105" : isPassed ? "text-gray-400" : "text-deep-space"}`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm">
                        {isPassed ? "check_circle" : "loyalty"}
                      </span>
                      Câu {i + 1}
                    </span>
                    <span>{r.toLocaleString()} đ</span>
                  </div>
                );
              })}
            </div>
          </GlassPanel>
        </aside>
      </div>

      {/* Popups (Modals) */}
      {showNextPrompt && !gameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-space/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-blue-500 rounded-2xl relative overflow-hidden shadow-2xl flex flex-col gap-4 p-8 max-w-md w-full">
            <div className="absolute top-0 right-0 p-2 opacity-5">
              <span className="material-symbols-outlined text-[80px] text-blue-500">
                campaign
              </span>
            </div>
            <h3 className="text-3xl font-display font-bold text-deep-space text-center drop-shadow-sm mb-2">
              Tiếp Tục?
            </h3>
            <p className="text-center text-base font-body text-gray-600 mb-6">
              Bạn đang nắm trong tay{" "}
              <span className="text-brand-red font-bold text-xl">
                {securedPrize.toLocaleString()} đ
              </span>
              . Đi tiếp sai mất trắng!
            </p>
            <Button
              className="w-full font-display font-bold text-lg bg-blue-600 text-white hover:bg-blue-700 py-4 shadow-md"
              onClick={handleContinue}
            >
              Chơi Tiếp (Câu {currentLevel + 2})
            </Button>
            <Button
              variant="outline"
              className="w-full font-display font-bold text-lg border-gray-300 text-deep-space hover:bg-gray-50 py-4 mt-2"
              onClick={handleStopAndSave}
            >
              Lấy Tiền Thưởng & Dừng Lại
            </Button>
          </div>
        </div>
      )}

      {gameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-space/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border border-brand-red rounded-2xl relative shadow-2xl text-center p-8 max-w-md w-full">
            <div className="absolute top-0 right-0 p-2 opacity-5">
              <span className="material-symbols-outlined text-[80px] text-brand-red">
                warning
              </span>
            </div>
            <AlertTriangle className="w-20 h-20 text-brand-red mx-auto mb-6 drop-shadow-sm animate-pulse" />
            <h3 className="text-4xl font-display font-bold text-deep-space mb-4">
              {selectedLetter === correctAnswerLetter
                ? "Tuyệt Đỉnh!"
                : "Rất Tiếc!"}
            </h3>
            <p className="text-gray-600 font-body text-lg mb-8">
              {selectedLetter === correctAnswerLetter
                ? `Bạn đã chinh phục thành công 10 câu hỏi khó nhất!`
                : `Sai mất rồi, bạn đã đánh mất số tiền thưởng đang có.`}
            </p>
            <Button
              className="w-full py-4 text-lg bg-brand-red text-white font-display font-bold hover:bg-red-700 shadow-md"
              onClick={handleGameOverExit}
            >
              {selectedLetter === correctAnswerLetter
                ? "Lấy 50,000 đ & Nhận Quà"
                : "Kết Thúc Cuộc Chơi"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
