"use client";

import { useEffect, useState } from "react";
import { gameChannel } from "@/lib/gameChannel";

export default function ControlPanel() {
  const [center, setCenter] = useState(50);

  const [info, setInfo] = useState({
    level: 0,
    cash: 0,
    question: "",
    windowSize: 50,
    center: 50,
  });

  // listen to game updates
  useEffect(() => {
    if (!gameChannel) return;

    gameChannel.onmessage = (event) => {
      const data = event.data;

      if (data.type === "STATE_UPDATE") {
        setInfo(data);
        setCenter(data.center); // sync slider
      }
    };
  }, []);

  const send = (data: any) => {
    if (!gameChannel) return;
    gameChannel.postMessage(data);
  };

  // 🔥 SAME CALCULATION AS MAIN UI
  const halfWindow = Math.floor(info.windowSize / 2);
  const guessStart = Math.max(0, center - halfWindow);
  const guessEnd = Math.min(100, guessStart + info.windowSize);

  return (
    <div className="min-h-screen bg-black text-white p-8 space-y-8">
      <h1 className="text-3xl font-bold">🎛 Control Panel</h1>

      {/* LIVE INFO */}
      <div className="bg-gray-900 p-6 rounded-xl space-y-2">
        <p>📊 Level: {info.level + 1}</p>
        <p>💰 Cash: ₹{info.cash}</p>
        <p>❓ {info.question}</p>
      </div>

      {/* 🔥 EXACT SAME "Slide to Guess" UI */}
      <div className="bg-gray-900 p-6 rounded-xl">
        <div className="flex justify-between mb-4">
          <span className="text-gray-400 text-sm font-medium uppercase tracking-wider">
            Slide to Guess
          </span>
          <span className="text-white font-black bg-gray-800 px-4 py-1.5 rounded-lg">
            {guessStart}% - {guessEnd}%
          </span>
        </div>

        <input
          type="range"
          min={halfWindow}
          max={100 - (info.windowSize - halfWindow)}
          value={center}
          onChange={(e) => {
            const val = Number(e.target.value);
            setCenter(val);
            send({ type: "SET_CENTER", value: val });
          }}
          className="w-full accent-green-500 h-3 bg-gray-700 rounded-lg"
        />
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-4 flex-wrap">
        <button
          onClick={() => send({ type: "REVEAL" })}
          className="bg-green-500 px-6 py-3 rounded-xl font-bold"
        >
          Reveal 🎯
        </button>

        <button
          onClick={() => send({ type: "NEXT" })}
          className="bg-blue-500 px-6 py-3 rounded-xl font-bold"
        >
          Next ➡️
        </button>

        <button
          onClick={() => send({ type: "RESET" })}
          className="bg-red-500 px-6 py-3 rounded-xl font-bold"
        >
          Reset 🔄
        </button>
      </div>
    </div>
  );
}