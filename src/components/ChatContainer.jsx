import { useEffect, useRef } from "react";
import { useChat } from "../contexts/ChatContext";
import { useMediaQuery } from "../hooks/useMediaQuery";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import NameCard from "./NameCard";

/**
 * Loading indicator
 */
function LoadingIndicator() {
  return (
    <div className="mb-4 font-mono">
      <span className="text-terminal-dim mr-2">$</span>
      <span className="text-terminal-text">Thinking</span>
      <span className="cursor-blink">...</span>
    </div>
  );
}

/**
 * Empty state when no messages
 */
function EmptyState() {
  return (
    <div className="flex items-center justify-center h-full p-8">
      <div className="terminal-box p-8 max-w-md text-center">
        <div className="font-terminal text-xl mb-4 text-glow">
          TERMINAL v1.0
        </div>
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
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="border-b-2 border-terminal-border p-4">
        <div className="terminal-box px-4 py-2 text-center font-terminal text-lg text-glow bg-terminal-bg-dim">
          give me 10$ i'll put your ad here
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Mobile: Show name card as first message */}
        {isMobile && <NameCard asMessage />}

        {/* Messages */}
        {!hasMessages && !isMobile && <EmptyState />}

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
      <ChatInput onSend={send} isLoading={isLoading} />
    </div>
  );
}
