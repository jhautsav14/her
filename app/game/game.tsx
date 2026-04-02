import { useState, useEffect } from "react";
import { motion, useAnimation, AnimationControls } from "framer-motion";
import { gameChannel } from "@/lib/gameChannel";

const WINDOW_SIZES = [50, 35, 25, 15, 10];
const CASH_PER_LEVEL = 4; // 5 levels * ₹4 = ₹20 max

// ==========================================
// 1. PRESENTATIONAL COMPONENT (UI ONLY)
// ==========================================

interface NoCapGameUIProps {
  level: number;
  cash: number;
  gameState: "playing" | "revealing" | "result" | "gameover";
  center: number;
  setCenter: (val: number) => void;
  revealed: number | string;
  roundCash: number;
  offBy: number;
  isWin: boolean;
  currentQ: { q: string; a: number };
  windowSize: number;
  guessStart: number;
  guessEnd: number;
  orbControls: AnimationControls;
  handleReveal: () => void;
  nextLevel: () => void;
  resetGame: () => void;
}

const NoCapGameUI = ({
  level, cash, gameState, center, setCenter, revealed, roundCash,
  offBy, isWin, currentQ, windowSize, guessStart, guessEnd,
  orbControls, handleReveal, nextLevel, resetGame
}: NoCapGameUIProps) => {
  return (
   <div className="h-screen overflow-y-auto bg-gray-950 text-white 
                flex flex-col lg:flex-row items-center lg:items-start 
                justify-start gap-6 px-4 py-6 font-sans relative">
      
      {/* RESET BUTTON (Top Right) */}
      <button 
        onClick={resetGame}
        className="absolute top-6 right-6 bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-500 hover:text-white transition-colors z-30"
      >
        Reset Game 🔄
      </button>

      {/* GIANT EMOJI POPUP */}
      {gameState === "result" && (
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: -45 }}
          animate={{ scale: [0, 1.8, 1], opacity: [0, 1, 0], rotate: [0, 15, 0] }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] z-50 pointer-events-none drop-shadow-2xl"
        >
          {isWin ? "🎯" : "😢"}
        </motion.div>
      )}

      {/* LEFT SIDE: MAIN GAME AREA */}
      <div className="flex-1 flex flex-col items-center gap-6 w-full max-w-3xl z-10">
        
        {/* TITLE */}
        <div className="flex gap-3 items-center justify-center">
      
      {/* NOCAP (White - center pop) */}
      <motion.span
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl md:text-7xl font-extrabold tracking-widest text-green-400"
      >
        NOCAP
      </motion.span>

      {/* GAME (Gold - slide + shine) */}
      <motion.span
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
        className="text-5xl md:text-7xl font-extrabold tracking-widest
                   text-transparent bg-clip-text animate-shine"
      >
        GAME
      </motion.span>

    </div>

        {gameState === "gameover" ? (
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} 
            className="flex flex-col items-center gap-6 bg-gray-900 p-10 rounded-3xl border border-gray-800 shadow-2xl w-full"
          >
            <h2 className="text-3xl text-gray-300">Total Winnings</h2>
            <div className="text-7xl font-black text-green-400 drop-shadow-[0_0_20px_rgba(74,222,128,0.6)]">
              ₹{cash}
            </div>
            <p className="text-gray-400 text-lg">Out of a maximum ₹20</p>
            <button onClick={resetGame} className="mt-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-4 rounded-2xl font-bold text-xl hover:scale-105 transition-transform">
              Play Again 🔁
            </button>
          </motion.div>
        ) : (
          <>
            {/* QUESTION & WINDOW NOTIFIER */}
            <div className="text-center w-full">
              <div className="text-2xl md:text-3xl font-medium leading-relaxed mb-4">
                {currentQ.q}
              </div>
              <div className="inline-block bg-blue-500/20 border border-blue-500/50 text-blue-300 px-5 py-2 rounded-full text-sm font-bold animate-pulse">
                💡 In this question, you have a window size of {windowSize}%
              </div>
            </div>

            {/* SLIDER CONTROL */}
            <div className={`w-full max-w-lg mt-4 ${gameState !== "playing" && "opacity-40 pointer-events-none transition-opacity duration-500"}`}>
              <div className="bg-gray-900 p-6 rounded-2xl border border-gray-800 relative overflow-hidden">
                <div className="flex justify-between mb-4 relative z-10">
                  <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">Slide to Guess</span>
                  <span className="text-white font-black bg-gray-800 px-4 py-1.5 rounded-lg border border-gray-700">
                    {guessStart}% - {guessEnd}%
                  </span>
                </div>
                <input
                  type="range" min={Math.floor(windowSize / 2)} max={100 - (windowSize - Math.floor(windowSize / 2))} value={center}
                  onChange={(e) => setCenter(Number(e.target.value))}
                  className="w-full accent-green-500 h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer relative z-10"
                />
              </div>
            </div>

            {/* VISUALIZER TUBE */}
<div className="relative w-full max-w-2xl h-40 mt-6">

  {/* TRACK */}
  <div className="absolute top-1/2 -translate-y-1/2 w-full h-5 rounded-full 
                  bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900
                  shadow-inner border border-white/10" />

  {/* SCALE MARKERS */}
  {Array.from({ length: 11 }).map((_, i) => {
    const isMajor = i % 5 === 0; // 0, 50, 100
    const isMid = i % 2 === 0;

    return (
      <div
        key={i}
        className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center"
        style={{
          left: `${i * 10}%`,
          transform: "translateX(-50%)",
        }}
      >
        {/* Tick */}
        <div
          className={`
            w-[2px] rounded-full
            ${isMajor 
              ? "h-10 bg-white shadow-[0_0_6px_rgba(255,255,255,0.6)]" 
              : isMid 
                ? "h-7 bg-gray-400" 
                : "h-4 bg-gray-600"}
          `}
        />

        {/* Label */}
        <span
          className={`
            mt-2 font-semibold tracking-wide
            ${isMajor 
              ? "text-white text-sm" 
              : "text-gray-400 text-xs"}
          `}
        >
          {i * 10}
        </span>
      </div>
    );
  })}

  {/* PLAYER WINDOW */}
  <motion.div
    layout
    className="absolute top-1/2 -translate-y-1/2 h-6 
               bg-gradient-to-r from-emerald-400/40 to-green-500/40
               rounded-full border border-emerald-300
               shadow-[0_0_25px_rgba(74,222,128,0.6)] backdrop-blur-sm"
    style={{ left: `${guessStart}%`, width: `${guessEnd - guessStart}%` }}
  />

  {/* THE REVEALING ORB */}
  <motion.div
    className="absolute top-1/2 -translate-y-1/2 z-20"
    initial={{ left: "0%" }}
    animate={orbControls}
    style={{ transform: "translate(-50%, -50%)" }}
  >
    <div className="relative flex flex-col items-center">

      {/* ORB */}
      <motion.div
        animate={{ 
          scale: gameState === "revealing" ? [1, 1.15, 1] : 1,
          boxShadow: gameState === "result"
            ? "0 0 50px rgba(250, 204, 21, 1)"
            : "0 0 20px rgba(250, 204, 21, 0.6)"
        }}
        transition={{ duration: 0.6, repeat: gameState === "revealing" ? Infinity : 0 }}
        className="w-16 h-16 rounded-full border-[3px] border-yellow-300 
                   bg-gradient-to-br from-gray-900 to-black
                   flex items-center justify-center 
                   text-2xl font-black text-yellow-300 shadow-2xl"
      >
        {revealed}
      </motion.div>

      {/* POINTER LINE */}
      <div className="w-[2px] h-12 bg-yellow-300 mt-1 
                      shadow-[0_0_12px_rgba(250,204,21,0.9)]" />
    </div>
  </motion.div>
</div>

            {/* ACTION BUTTONS & RESULTS */}
            <div className="sticky bottom-0 w-full flex justify-center py-4 
                bg-gradient-to-t from-gray-950 via-gray-950/80 to-transparent z-20">
              {gameState === "playing" && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleReveal}
                  className="bg-white text-black px-14 py-4 rounded-full font-black text-xl shadow-[0_0_20px_rgba(255,255,255,0.4)] uppercase tracking-widest"
                >
                  Lock 🎯
                </motion.button>
              )}

              {gameState === "result" && (
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-4 w-full"
                >
                  {isWin ? (
                    <div className="bg-green-500/20 border-2 border-green-500 text-green-400 px-8 py-3 rounded-2xl text-xl font-black shadow-[0_0_30px_rgba(34,197,94,0.4)] tracking-wide">
                      + ₹{roundCash} WON! 💸
                    </div>
                  ) : (
                    <div className="bg-red-500/20 border-2 border-red-500 text-red-400 px-8 py-3 rounded-2xl text-lg font-bold flex flex-col items-center shadow-[0_0_30px_rgba(239,68,68,0.4)]">
                      <span className="text-xl">Missed it!</span>
                      <span className="text-sm font-medium text-gray-200 mt-1">You were off by {offBy}%</span>
                    </div>
                  )}
                  
                  <button
                    onClick={nextLevel}
                    className="mt-2 bg-gray-800 border border-gray-600 text-white px-10 py-3 rounded-full font-black hover:bg-gray-700 transition-colors uppercase tracking-wider text-sm"
                  >
                    {level === 4 ? "Cash Out 💰" : "Next Question ➡️"}
                  </button>
                </motion.div>
              )}
            </div>
          </>
        )}
      </div>

      {/* RIGHT SIDE: STATUS LADDER TABLE */}
      {gameState !== "gameover" && (
        <div className="w-full lg:w-72 max-h-[80vh] overflow-y-auto 
                lg:sticky lg:top-6
                bg-gray-900 border-2 border-gray-800 rounded-3xl 
                p-6 flex flex-col z-10 shadow-xl">
          <div className="text-center mb-6">
            <h3 className="text-gray-400 text-xs uppercase tracking-widest font-bold mb-1">Total Cash</h3>
            <div className="text-5xl font-black text-green-400">₹{cash}</div>
          </div>

          <div className="flex flex-col-reverse gap-3">
            {[0, 1, 2, 3, 4].map((i) => {
              const isActive = level === i;
              const isPassed = level > i;
              
              return (
                <div 
                  key={i} 
                  className={`flex justify-between items-center p-4 rounded-xl border-2 transition-all ${
                    isActive 
                      ? "bg-blue-500/20 border-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.3)]" 
                      : isPassed 
                        ? "bg-gray-800 border-gray-700 opacity-60" 
                        : "bg-gray-950 border-gray-800 opacity-40"
                  }`}
                >
                  <span className={`font-bold ${isActive ? "text-blue-400" : isPassed ? "text-gray-400" : "text-gray-600"}`}>
                    Level {i + 1}
                  </span>
                  <span className={`font-black ${isActive ? "text-white" : isPassed ? "text-gray-500" : "text-gray-700"}`}>
                    ₹{(i + 1) * CASH_PER_LEVEL}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// 2. LOGIC / CONTAINER COMPONENT
// ==========================================

export default function NoCapGame() {
  const [level, setLevel] = useState(0);
  const [cash, setCash] = useState(0);
  const [gameState, setGameState] = useState<"playing" | "revealing" | "result" | "gameover">("playing");
  
  // Game Inputs
  const [center, setCenter] = useState(50);
  const [gameData, setGameData] = useState<{ q: string; a: number }[]>([]);

  useEffect(() => {
    fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vQFlTp2D6oFQPSXU0wfVOAiN6pFxFpLZKxa14ePlwbtDMgAAw1hrsxOj03KT4URN93kLnYL10w4buw6/pub?output=csv")
      .then(res => res.text())
      .then(csv => {
        const rows = csv.split("\n").slice(1); // skip header
        const parsed = rows.map(row => {
          const [q, a] = row.split(",");
          return {
            q: q.replace(/"/g, ""),
            a: Number(a)
          };
        });
        setGameData(parsed);
      });
  }, []);
  
  // Animation States
  const orbControls = useAnimation(); 
  const [revealed, setRevealed] = useState<number | string>("?");
  const [roundCash, setRoundCash] = useState(0);
  const [offBy, setOffBy] = useState(0);
  const [isWin, setIsWin] = useState(false);

  const currentQ = gameData[level];
  const windowSize = WINDOW_SIZES[level] || 10;
  const halfWindow = Math.floor(windowSize / 2);
  const guessStart = Math.max(0, center - halfWindow);
  const guessEnd = Math.min(100, guessStart + windowSize);

  // Reset center when level changes to keep it in bounds
  useEffect(() => {
    setCenter(50);
  }, [level]);

  // Number scrambling effect during reveal (optimized interval)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (gameState === "revealing") {
      interval = setInterval(() => {
        setRevealed(Math.floor(Math.random() * 100));
      }, 80); 
    }
    return () => clearInterval(interval);
  }, [gameState]);

  useEffect(() => {
    if (!gameChannel) return;

    gameChannel.onmessage = (event) => {
      const data = event.data;
      if (data.type === "SET_CENTER") setCenter(data.value);
      if (data.type === "REVEAL") handleReveal();
      if (data.type === "NEXT") nextLevel();
      if (data.type === "RESET") resetGame();
    };

    return () => {
      if (gameChannel) gameChannel.onmessage = null;
    };
  }, [level, currentQ]); // Rebind if state values inside message handlers depend on current scope

  useEffect(() => {
    if (!gameChannel) return;

    gameChannel.postMessage({
      type: "STATE_UPDATE",
      level,
      cash,
      question: currentQ?.q,
      windowSize,
      center,
    });
  }, [level, cash, currentQ, center, windowSize]);

  const handleReveal = async () => {
    setGameState("revealing");
    const actualAnswer = currentQ.a;

    // Smooth sweeping animation taking ~7 seconds using GPU acceleration
    await orbControls.start({
      left: [
        "0%", 
        "95%",  // Sweep far right
        "5%",   // Sweep far left
        "85%",  // Sweep right again
        "15%",  // Sweep left again
        `${actualAnswer > 50 ? actualAnswer - 15 : actualAnswer + 15}%`, // Smooth approach
        `${actualAnswer}%` // Final Lock
      ],
      transition: {
        duration: 7, // 7-second suspense
        times: [0, 0.15, 0.35, 0.55, 0.75, 0.9, 1],
        ease: "easeInOut"
      }
    });

    // Stop scrambling and set exact final answer
    setRevealed(actualAnswer);

    // Calculate Result
    const winStatus = actualAnswer >= guessStart && actualAnswer <= guessEnd;
    setIsWin(winStatus);

    if (winStatus) {
      setRoundCash(CASH_PER_LEVEL);
      setCash((c) => c + CASH_PER_LEVEL);
      setOffBy(0);
    } else {
      setRoundCash(0);
      const diffStart = Math.abs(actualAnswer - guessStart);
      const diffEnd = Math.abs(actualAnswer - guessEnd);
      setOffBy(Math.min(diffStart, diffEnd));
    }

    setGameState("result");
  };

  const nextLevel = () => {
    if (level === 4) {
      setGameState("gameover");
    } else {
      setLevel((l) => l + 1);
      setRevealed("?");
      orbControls.set({ left: "0%" }); // Instantly snap orb back to start
      setGameState("playing");
    }
  };

  const resetGame = () => {
    setLevel(0);
    setCash(0);
    setRevealed("?");
    setCenter(50);
    orbControls.set({ left: "0%" });
    setGameState("playing");
  };

  if (gameData.length === 0) {
    return <div>Loading questions...</div>;
  }

  return (
    <NoCapGameUI 
      level={level}
      cash={cash}
      gameState={gameState}
      center={center}
      setCenter={setCenter}
      revealed={revealed}
      roundCash={roundCash}
      offBy={offBy}
      isWin={isWin}
      currentQ={currentQ}
      windowSize={windowSize}
      guessStart={guessStart}
      guessEnd={guessEnd}
      orbControls={orbControls}
      handleReveal={handleReveal}
      nextLevel={nextLevel}
      resetGame={resetGame}
    />
  );
}