import TextBlock from "./MessageBlock/TextBlock";
import ImageBlock from "./MessageBlock/ImageBlock";
import LinkBlock from "./MessageBlock/LinkBlock";
import VideoBlock from "./MessageBlock/VideoBlock";
import CodeBlock from "./MessageBlock/CodeBlock";

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
 * Single chat message component
 */
export default function ChatMessage({ message }) {
  const isUser = message.role === "user";
  const isError = message.role === "error";
  const isAssistant = message.role === "assistant";

  // User messages: align left
  if (isUser) {
    return (
      <div className="flex justify-start mb-4 font-mono">
        <div className="max-w-[75%] p-3 bg-terminal-bg-dim rounded">
          <span className="text-terminal-dim mr-2">&gt;</span>
          <span className="text-terminal-text">{message.content[0]?.data}</span>
        </div>
      </div>
    );
  }

  // Error messages: same format as assistant but red
  if (isError) {
    return (
      <div className="flex justify-start mb-4 font-mono">
        <div className="max-w-[85%]">
          <div className="p-3 bg-terminal-bg rounded">
            <div className="text-red-500">
              {message.content.map((block, index) => (
                <ContentBlock key={index} block={block} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Assistant messages: align left
  if (isAssistant) {
    return (
      <div className="flex justify-start mb-4 font-mono">
        <div className="max-w-[85%]">
          <div className="mb-1">
            <span className="text-terminal-dim">$</span>
          </div>
          <div className="p-3 bg-terminal-bg rounded">
            <div className="text-terminal-text">
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
