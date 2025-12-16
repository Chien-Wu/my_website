import phoneImage from "../../assets/phone.png";

/**
 * Front Side of Name Card
 * Shows phone, name, bio
 */
export default function FrontSide({ asMessage, shouldFade }) {
  return (
    <div className={`p-0 ${shouldFade ? "content-fade-in" : ""}`}>
      {/* Phone - Bleeds outside outline with negative margin */}
      <div className="inline-flex gap-1 relative m-2 bg-terminal-bg">
        <div className="terminal-box w-16 h-16 flex m-2 items-center justify-center">
          <img src={phoneImage} alt="Phone" className="w-16 object-contain" />
        </div>
        <div className="p-0 my-2">
          <pre className="text-s text-left leading-tight font-mono">
            <p>SELECT COINS:</p>
            <p>[AU]04-32-465-311</p>
            <p>[TW]09-66-919-572</p>
          </pre>
        </div>
      </div>

      {/* Name Logo */}
      <div
        className="text-center font-bold text-glow my-10"
        style={{ fontFamily: "'Rubik 80s Fade', monospace" }}
      >
        <div className="flex gap-4">
          <div className="w-3/4 text-right gap-1">
            <div className="text-8xl bg-terminal-bg">CHi-EN</div>
            <div className="text-sm text-terminal-dim">
              artist/developer/designer
            </div>
          </div>

          <div className="w-1/4 text-left gap-1">
            <p className="text-7xl bg-terminal-bg">WU</p>
            <p className="text-5xl bg-terminal-bg">572</p>
          </div>
        </div>
      </div>

      <div className="w-3/4 text-right text-sm text-terminal-dim">
        since 2005-08-14T12:13:08-05:00
      </div>

      <div className="border-t-2 border-terminal-border my-4"></div>

      {/* Bio/Tagline */}
      <div className="text-sm text-terminal-text mb-6 leading-relaxed">
        Building the future, one terminal command at a time.
      </div>

      {/* Footer */}
      {!asMessage && (
        <>
          <div className="border-t-2 border-terminal-border my-4"></div>
          <div className="text-xs text-terminal-dim text-center">
            SYSTEM READY
          </div>
        </>
      )}
    </div>
  );
}
