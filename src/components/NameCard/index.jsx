import { useState } from "react";
import DataFlowOverlay from "../UI/DataFlowOverlay";
import ErrorMessageOverlay from "../UI/ErrorMessageOverlay";
import FrontSide from "./FrontSide";
import BackSide from "./BackSide";

/**
 * Name Card Component - 3 Layer Architecture
 * Layer 1: Session (full area, animations)
 * Layer 2: Outline (border frame)
 * Layer 3: Content (scrollable, can overlap outline)
 */
export default function NameCard({ asMessage = false }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showErrors, setShowErrors] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [shouldFade, setShouldFade] = useState(false);
  const [showTempOutline, setShowTempOutline] = useState(false);

  // Session container - full area, no padding/margin
  const sessionClasses = asMessage
    ? "relative cursor-pointer h-screen mb-4 overflow-hidden"
    : "relative cursor-pointer h-[calc(100vh-2rem)] overflow-hidden";

  const handleFlip = () => {
    if (isFlipping) return; // Prevent spam clicking

    setIsFlipping(true);
    setShouldFade(false); // Reset fade
    setShowTempOutline(true); // Show temp outline during error messages
    // Phase 1: Show error messages (0-0.5s)
    setShowErrors(true);

    // Phase 2: Errors stick for 0.2s (0.5-0.7s)
    // Phase 3: Hide errors, show matrix, switch content (0.7-3.2s)
    setTimeout(() => {
      setShowErrors(false);
      setShowMatrix(true);
      setShowTempOutline(false); // Hide temp outline when matrix starts
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
    <div className={sessionClasses}>
      {/* Layer 1: Animation overlays (z-50) */}
      {isFlipping && showErrors && <ErrorMessageOverlay />}
      {isFlipping && showMatrix && <DataFlowOverlay />}

      {/* Layer 2: Temporary outline during error messages only (z-60) - stays on top of animations */}
      {showTempOutline && (
        <div className="terminal-box absolute inset-0 m-4 pointer-events-none z-[60]"></div>
      )}

      {/* Layer 3: Permanent outline (z-10) - can be overlapped by content */}
      <div className="terminal-box absolute inset-0 m-4 pointer-events-none z-10"></div>

      {/* Layer 4: Content (z-20) - scrollable, can overlap permanent outline */}
      <div className="absolute inset-0 overflow-y-cut z-20">
        {!isFlipped && (
          <FrontSide asMessage={asMessage} shouldFade={shouldFade} onFlip={handleFlip} />
        )}
        {isFlipped && (
          <div onClick={handleFlip} className="cursor-pointer h-full">
            <BackSide shouldFade={shouldFade} />
          </div>
        )}
      </div>
    </div>
  );
}
