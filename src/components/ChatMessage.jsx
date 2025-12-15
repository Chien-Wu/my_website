import TextBlock from './MessageBlock/TextBlock'
import ImageBlock from './MessageBlock/ImageBlock'
import LinkBlock from './MessageBlock/LinkBlock'
import VideoBlock from './MessageBlock/VideoBlock'
import CodeBlock from './MessageBlock/CodeBlock'

/**
 * Render a single content block based on its type
 */
function ContentBlock({ block }) {
  switch (block.type) {
    case 'text':
      return <TextBlock data={block.data} />
    case 'image':
      return <ImageBlock data={block.data} />
    case 'link':
      return <LinkBlock data={block.data} />
    case 'video':
      return <VideoBlock data={block.data} />
    case 'code':
      return <CodeBlock data={block.data} />
    default:
      return <TextBlock data={JSON.stringify(block.data)} />
  }
}

/**
 * Single chat message component
 */
export default function ChatMessage({ message }) {
  const isUser = message.role === 'user'
  const isError = message.role === 'error'

  const prefix = isUser ? '>' : isError ? 'ERROR:' : '$'
  const prefixColor = isError ? 'text-red-500' : 'text-terminal-dim'

  return (
    <div className="mb-4 font-mono">
      {/* Message prefix */}
      <div className="mb-1">
        <span className={`${prefixColor} mr-2`}>{prefix}</span>
        {isUser && (
          <span className="text-terminal-text">{message.content[0]?.data}</span>
        )}
      </div>

      {/* Assistant/Error message content */}
      {!isUser && (
        <div className="ml-4 text-terminal-text">
          {message.content.map((block, index) => (
            <ContentBlock key={index} block={block} />
          ))}
        </div>
      )}
    </div>
  )
}
