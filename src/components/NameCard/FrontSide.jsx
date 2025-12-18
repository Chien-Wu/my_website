import { useState, useEffect } from "react";
import phoneImage from "../../assets/phone.png";
import MusicPlayerControls from "./MusicPlayerControls";

/**
 * Front Side of Name Card
 * Shows phone, name, bio
 */
export default function FrontSide({ asMessage, shouldFade, onFlip }) {
  const birthDate = new Date("2005-08-14T12:13:08-05:00");
  const HUNDRED_YEARS_SECONDS = 3153600000;

  const [secondsLived, setSecondsLived] = useState(0);

  useEffect(() => {
    // Update immediately
    const updateSeconds = () => {
      const now = new Date();
      const seconds = (now - birthDate) / 1000;
      setSecondsLived(seconds);
    };

    updateSeconds();

    // Update every 10ms for smooth animation
    const interval = setInterval(updateSeconds, 10);

    return () => clearInterval(interval);
  }, []);

  const progressPercentage = (secondsLived / HUNDRED_YEARS_SECONDS) * 100;

  return (
    <div
      className={`p-0 flex flex-col h-full ${
        shouldFade ? "content-fade-in" : ""
      }`}
    >
      <div className="flex-1">
        {/* Phone - Bleeds outside outline with negative margin */}
        <div className="inline-flex gap-1 relative m-3 bg-terminal-bg">
          <div className="terminal-box w-16 h-16 flex m-3 items-center justify-center">
            <img src={phoneImage} alt="Phone" className="w-16 object-contain" />
          </div>
          <div className="p-0 my-2">
            <pre className="text-s text-left leading-snug font-mono">
              <p>SELECT COINS:</p>
              <p>[AU] 04-32-465-311</p>
              <p>[TW] 09-66-919-572</p>
            </pre>
          </div>
        </div>

        {/* Name Logo */}
        <div
          className="text-center font-bold text-glow my-10 mx-2 cursor-pointer flex justify-between"
          style={{ fontFamily: "'Rubik 80s Fade', monospace" }}
          onClick={onFlip}
        >
          <div className="w-80% text-right">
            <div className="text-7xl bg-terminal-bg">CHi-EN</div>
            <div className="text-sm text-terminal-dim">
              artist/developer/designer
            </div>
          </div>

          <div className="w-20% text-left">
            <p className="text-6xl bg-terminal-bg ">WU</p>
            <p className="text-4xl bg-terminal-bg ">572</p>
          </div>
        </div>

        {/* Seconds lived and Progress bar*/}
        <div className="justify-center flex-col mx-6 my-4 items-center">
          <div className="text-xs text-terminal-text leading-relaxed mb-2 text-center">
            {"alive... ("}
            {secondsLived.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
            {" of 3,153,600,000)"}
          </div>

          <div className="w-3/4 mx-auto bg-terminal-bg border border-terminal-border h-8 relative overflow-hidden">
            <div
              className="vintage-progress-bar h-full absolute top-0 left-0 bg-terminal-text overflow-hidden"
              style={{ width: `${progressPercentage}%` }}
            >
              <div
                className="absolute inset-0 progress-scanline pointer-events-none"
                style={{ width: "100vw" }}
              ></div>
            </div>
            <div
              className="absolute inset-0 flex items-center justify-center text-xs font-bold"
              style={{ textShadow: "0 0 4px #000" }}
            >
              {progressPercentage.toFixed(2)}%
            </div>
          </div>
        </div>
      </div>

      {/* Creator's Message */}
      {!asMessage && (
        <div className="mx-6 p-4 text-xs text-terminal-dim">
          <p>/* Note From Site Creator Chien: */</p>
          <p>/* None of my project/info is here, */</p>
          <p>/* Go Ask My AI Assistant Mikka. */</p>
          <p>/* She Knows Everything (Almost) */</p>
          <p>/* She's Nice (Maybe). */</p>
        </div>
      )}

      {/* Music Player */}
      {!asMessage && <MusicPlayerControls />}

      {/* Footer - Sticks to bottom */}
      {!asMessage && (
        <div className="my-4 mb-8">
          <div className="text-xs text-terminal-dim text-center">
            SYSTEM READY #1.0
          </div>
          <div className="text-xs text-terminal-dim text-center">
            since 2025-12-16T08:19:07-05:00
          </div>
        </div>
      )}
    </div>
  );
}
