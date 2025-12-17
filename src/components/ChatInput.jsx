import { useState, useRef, useEffect } from "react";

/**
 * Terminal-style chat input component
 */
export default function ChatInput({ onSend, isLoading }) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput("");
    }
  };

  // Handle keyboard shortcuts
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setInput("");
    }
  };

  return (
    <div className="border-t-2 border-terminal-border py-4">
      <form onSubmit={handleSubmit}>
        <div className="terminal-box flex items-center p-3">
          <span className="text-terminal-dim">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            placeholder=" Type your message here..."
            className="flex-1 bg-transparent border-none outline-none text-terminal-text placeholder-terminal-dim font-mono"
            autoComplete="off"
          />
          <span className="cursor-blink ml-1">_</span>
        </div>
        <div className="mt-2 text-xs text-terminal-dim text-center">
          [Enter to send] [Esc to clear]
        </div>
      </form>
    </div>
  );
}
