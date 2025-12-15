import { useState } from "react";
import phoneImage from "../assets/phone.png";
import DataFlowOverlay from "./UI/DataFlowOverlay";
import ErrorMessageOverlay from "./UI/ErrorMessageOverlay";

/**
 * Name Card Component
 * Displays user info in terminal style
 * Shows as sidebar on desktop, first message on mobile
 * Click to flip between front (info) and back (links)
 */
export default function NameCard({ asMessage = false }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [shouldFade, setShouldFade] = useState(false);

  const cardClasses = asMessage
    ? "terminal-box p-0 mb-4 relative cursor-pointer h-screen"
    : "terminal-box p-0 m-4 h-[calc(100vh-2rem)] relative cursor-pointer";

  const handleFlip = () => {
    if (isFlipping) return; // Prevent spam clicking

    setIsFlipping(true);
    setShouldFade(false); // Reset fade

    // Phase 1: Show error messages (0-0.5s)
    setShowErrors(true);

    // Phase 2: Errors stick for 0.2s (0.5-0.7s)
    // Phase 3: Hide errors, show matrix, switch content (0.7-3.2s)
    setTimeout(() => {
      setShowErrors(false);
      setShowMatrix(true);
      setIsFlipped(!isFlipped); // Switch content right when matrix starts
      setShouldFade(true); // Start fade-in immediately when content switches
    }, 700);

    // End animation at 3.2s (total = 0.5s errors + 0.2s stick + 2.5s matrix)
    setTimeout(() => {
      setShowMatrix(false);
      setIsFlipping(false);
      setShouldFade(false); // Reset for next flip
    }, 3200);
  };

  return (
    <div className={cardClasses} onClick={handleFlip}>
      {/* Error Messages Animation (0-0.5s) */}
      {isFlipping && showErrors && <ErrorMessageOverlay />}

      {/* Matrix Data Flow Animation (0.5-3.0s) */}
      {isFlipping && showMatrix && <DataFlowOverlay />}

      {/* Front Side: Main Info */}
      {!isFlipped && (
        <div className={shouldFade ? "content-fade-in" : ""}>
          {/* Phone - Bleeds outside card border */}
          <div className="flex gap-2 mb-6 -m-4 p-3 bg-terminal-bg relative">
            <div className="terminal-box w-16 h-16 flex items-center justify-center">
              <img
                src={phoneImage}
                alt="Phone"
                className="w-12 object-contain"
              />
            </div>
            <div className="p-0">
              <pre className="text-s font-mono leading-none">
                {`SELECT COINS:
--------------------------------------
[AU]04-32-465-311
[TW]09-66-919-572`.trim()}
              </pre>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="overflow-y-auto h-[calc(100%-5rem)] px-4">
            {/* ASCII Art Portrait Placeholder */}
            <pre className="text-xs text-terminal-text text-glow mb-4 text-center font-mono leading-tight">
              {`
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMWXOoc:codolldONMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMKl'            ,dXMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMWO,                ;KMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMX:                  cNMMMMMMMMMMMMMM
MMMMMMMMMMMMMMN:                  ,0MMMMMMMMMMMMMM
MMMMMMMMMMMMMMMx.     ......      cNMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMO;..;c:,,.........;KMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMWOlc:okxoc'.'cc,..'xWMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMNkdodkOkdlldOkl:::kMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMWKkoxkOkxxxxdc::oKMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMMMMMWOodxkxddol:;;:OWMMMMMMMMMMMMMMMM
MMMMMMMMMMWNKOxdoc:looooool:,,.,d0XWMMMMMMMMMMMMMM
MMMMMMWXOdl;,.....:odolcc::;;'. ..';lx0NMMMMMMMMMM
MMMMMNx;'.........,lddo:,',,,..........;o0WMMMMMMM
MMMW0c'.........''.';ccccc:;'............,dNMMMMMM
MMWk;........'...'.....'''.................lKMMMMM
MNd,''.......'..............................cKMMMM
Wx'.'........................................lNMMM
0;.''....................'....................xWMM
;.............................................:KMM
''............................................'kMM`}
            </pre>

            {/* Name and Title */}
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold font-terminal text-glow mb-2">
                CHi-EN572
              </h1>
              <div className="text-sm text-terminal-dim">
                Developer / Designer / Creator
              </div>
            </div>

            {/* Separator */}
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
        </div>
      )}

      {/* Back Side: Links */}
      {isFlipped && (
        <div className={shouldFade ? "content-fade-in" : ""}>
        <div className="p-8 overflow-y-auto h-full">
          <div className="text-center mb-8">
            <h2 className="text-xl font-bold font-terminal text-glow mb-2">
              CONNECT
            </h2>
            <div className="text-xs text-terminal-dim">
              Click anywhere to return
            </div>
          </div>

          <div className="border-t-2 border-terminal-border my-6"></div>

          {/* Links */}
          <div className="space-y-4 text-sm">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-glow transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-terminal-dim">$</span> GitHub →
            </a>
            <a
              href="mailto:your.email@example.com"
              className="block hover:text-glow transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-terminal-dim">$</span> Email →
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:text-glow transition-all"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-terminal-dim">$</span> LinkedIn →
            </a>
          </div>

          <div className="border-t-2 border-terminal-border my-6"></div>

          <div className="text-xs text-terminal-dim text-center">
            LINKS ACTIVE
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
