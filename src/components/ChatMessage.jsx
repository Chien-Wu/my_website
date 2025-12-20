import TextBlock from "./MessageBlock/TextBlock";
import ImageBlock from "./MessageBlock/ImageBlock";
import LinkBlock from "./MessageBlock/LinkBlock";
import VideoBlock from "./MessageBlock/VideoBlock";
import CodeBlock from "./MessageBlock/CodeBlock";
import botAvatar from "../assets/bot_avatar.png";

/**
 * Render a single content block based on its type
 */
function ContentBlock({ block }) {
  switch (block.type) {
    case "text":
      return <TextBlock data={block.data} />;
    case "image":
      return <ImageBlock data={block.data} />;
    case "link":
      return <LinkBlock data={block.data} />;
    case "video":
      return <VideoBlock data={block.data} />;
    case "code":
      return <CodeBlock data={block.data} />;
    default:
      return <TextBlock data={JSON.stringify(block.data)} />;
  }
}

/**
 * Format timestamp to HH:MM:SS
 */
function formatTimestamp(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

/**
 * Single chat message component - Vintage BBS style
 */
export default function ChatMessage({ message }) {
  const isUser = message.role === "user";
  const isError = message.role === "error";
  const isAssistant = message.role === "assistant";
  const timestamp = formatTimestamp(message.timestamp);

  // User messages: Right-aligned, max 2/3 width
  if (isUser) {
    const username = localStorage.getItem("username") || "visitor@999";
    return (
      <div className="mb-4 font-mono flex justify-end">
        <div className="inline-flex flex-col  justify-end max-w-[66.666%]">
          {/* Header */}
          <div className="vintage-message-header flex justify-end items-center gap-2">
            <span className="text-terminal-text">{username}</span>
            <span className="vintage-timestamp text-terminal-dim">
              [{timestamp}]
            </span>
          </div>
          {/* Content */}
          <div className="vintage-message-content flex justify-end text-terminal-text">
            <span className="text-terminal-dim mr-2">&gt;</span>
            <span>{message.content[0]?.data}</span>
          </div>
        </div>
      </div>
    );
  }

  // Error messages: Alert style matching bot layout
  if (isError) {
    return (
      <div className="mb-4 font-mono">
        <div className="">
          {/* Header */}
          <div className="vintage-message-header flex justify-left items-center gap-2">
            <span className="text-red-500">⚠ SYSTEM ERROR</span>
            <span className="vintage-timestamp text-red-400">
              [{timestamp}]
            </span>
          </div>
          {/* Content */}
          <div className="vintage-message-content text-red-500">
            {message.content.map((block, index) => (
              <ContentBlock key={index} block={block} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Assistant messages: Vintage box with avatar
  if (isAssistant) {
    return (
      <div className="mb-4 font-mono">
        <div className="max-w-[66.666%]">
          {/* Header */}
          <div className="vintage-message-header flex justify-left items-end gap-2">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img src={botAvatar} alt="Bot" className="vintage-avatar" />
            </div>
            <span className="text-terminal-text">MIKKA</span>
            <span className="vintage-timestamp text-terminal-dim">
              [{timestamp}]
            </span>
          </div>
          {/* Content */}
          <div className="vintage-message-content flex gap-3">
            <div className="flex-1 text-terminal-text break-words">
              {message.content.map((block, index) => (
                <ContentBlock key={index} block={block} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
