import { useEffect, useRef, useState } from "react";
import { useChat } from "../contexts/ChatContext";
import { useMediaQuery } from "../hooks/useMediaQuery";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import NameCard from "./NameCard";
import FaultyTerminal from "./FaultyTerminal";

/**
 * Loading indicator
 */
function LoadingIndicator() {
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["thinking", "spinning", "vibing", "cooking", "Pixelling"];

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % 5);
    }, 3000); // Change word every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mb-4 font-mono">
      <span className="loading-flash text-terminal-dim mr-2">$</span>
      <span className="loading-flash text-terminal-text">
        {words[wordIndex]}
      </span>
      <span className="loading-flash">...</span>
    </div>
  );
}

/**
 * Empty state when no messages
 */
function EmptyState() {
  return (
    <div className="flex items-center justify-center h-full p-8">
      <div className="p-8 max-w-md text-center">
        <div className="font-terminal text-xl mb-4 text-glow">MIKKA v2.1</div>
        <div className="text-terminal-dim mb-6">Ready.</div>
        <div className="text-sm text-terminal-text">
          Type a message to begin...
        </div>
      </div>
    </div>
  );
}

/**
 * Main chat container
 */
export default function ChatContainer() {
  const { messages, isLoading, send } = useChat();
  const messagesEndRef = useRef(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-screen p-6 relative">
      {/* FaultyTerminal Background */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <FaultyTerminal
          scale={1.5}
          gridMul={[1, 1]}
          digitSize={1.5}
          timeScale={0.1}
          pause={false}
          scanlineIntensity={1}
          glitchAmount={0.5}
          flickerAmount={1.5}
          noiseAmp={1.5}
          chromaticAberration={0}
          dither={0}
          curvature={0}
          tint="#065e0f"
          mouseReact={false}
          mouseStrength={0}
          pageLoadAnimation={true}
          brightness={0.3}
        />
      </div>

      {/* Header */}
      <div
        className="terminal-box bg-terminal-text px-1 relative"
        style={{ zIndex: 1, pointerEvents: "auto" }}
      >
        <h1 className="text-left text-s text-terminal-bg leading-none">
          Give Me 20$ ▶ Your Ad Here
        </h1>
      </div>

      {/* Messages area */}
      <div
        className="flex-1 overflow-y-auto p-4 relative"
        style={{ zIndex: 1, pointerEvents: "auto" }}
      >
        {/* Messages */}
        {!hasMessages && <EmptyState />}

        {hasMessages && (
          <div className="max-w-4xl mx-auto">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="max-w-4xl mx-auto">
            <LoadingIndicator />
          </div>
        )}

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="relative" style={{ zIndex: 1, pointerEvents: "auto" }}>
        <ChatInput onSend={send} isLoading={isLoading} />
      </div>
    </div>
  );
}
