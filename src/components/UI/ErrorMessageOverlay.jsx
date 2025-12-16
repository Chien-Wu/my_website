import { useEffect, useState } from "react";

/**
 * Generate random error messages
 */
function generateRandomErrors() {
  const errors = [
    "ERROR: Memory overflow detected",
    "WARNING: Unauthorized access attempt",
    "CRITICAL: System integrity compromised",
    "ERROR: Neural network malfunction",
    "WARNING: Data stream corruption",
    "FATAL: Core processor overheating",
    "ERROR: Authentication failed",
    "WARNING: Firewall breach detected",
    "CRITICAL: Database connection lost",
    "ERROR: Invalid memory address",
  ];

  const randomErrors = Array(5)
    .fill(0)
    .map(() => errors[Math.floor(Math.random() * errors.length)]);

  return randomErrors;
}

/**
 * Custom messages mixed with random errors
 */
function generateMessages() {
  const customMessages = [
    "> INITIATING SYSTEM TRANSITION...",
    "> LOADING NEURAL INTERFACE...",
    "> ESTABLISHING CONNECTION...",
  ];

  const randomErrors = generateRandomErrors();

  // Mix custom messages with random errors
  return [...customMessages, ...randomErrors];
}

/**
 * Error Message Overlay - Messages pop up line by line
 */
export default function ErrorMessageOverlay() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messageList = generateMessages();
    const messageData = messageList.map((text, i) => ({
      id: i,
      text,
      delay: i * 0.06, // Each message appears 60ms after previous
    }));

    setMessages(messageData);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-50 bg-terminal-bg bg-opacity-90">
      <div className="p-8">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className="error-message font-mono text-xs text-terminal-text mb-1"
            style={{
              animationDelay: `${msg.delay}s`,
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}
