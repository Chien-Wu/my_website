import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

// Custom terminal-style theme (matching CodeBlock.jsx)
const terminalTheme = {
  'code[class*="language-"]': {
    color: '#33ff33',
    background: 'none',
    fontFamily: 'IBM Plex Mono, monospace',
    fontSize: '0.9em',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
  },
  'pre[class*="language-"]': {
    color: '#33ff33',
    background: '#000000',
    fontFamily: 'IBM Plex Mono, monospace',
    fontSize: '0.9em',
    textAlign: 'left',
    whiteSpace: 'pre',
    wordSpacing: 'normal',
    wordBreak: 'normal',
    wordWrap: 'normal',
    lineHeight: '1.5',
    margin: '0',
    padding: '1em',
    overflow: 'auto',
  },
  comment: { color: '#22aa22' },
  prolog: { color: '#22aa22' },
  doctype: { color: '#22aa22' },
  cdata: { color: '#22aa22' },
  punctuation: { color: '#33ff33' },
  property: { color: '#33ff33' },
  tag: { color: '#33ff33' },
  boolean: { color: '#33ff33' },
  number: { color: '#33ff33' },
  constant: { color: '#33ff33' },
  symbol: { color: '#33ff33' },
  deleted: { color: '#33ff33' },
  selector: { color: '#33ff33' },
  'attr-name': { color: '#33ff33' },
  string: { color: '#33ff33' },
  char: { color: '#33ff33' },
  builtin: { color: '#33ff33' },
  inserted: { color: '#33ff33' },
  operator: { color: '#33ff33' },
  entity: { color: '#33ff33' },
  url: { color: '#33ff33' },
  variable: { color: '#33ff33' },
  atrule: { color: '#33ff33' },
  'attr-value': { color: '#33ff33' },
  function: { color: '#33ff33' },
  'class-name': { color: '#33ff33' },
  keyword: { color: '#33ff33', fontWeight: 'bold' },
  regex: { color: '#22aa22' },
  important: { color: '#33ff33', fontWeight: 'bold' },
}

export default function TextBlock({ data }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Custom rendering for code blocks (terminal style)
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <div className="my-4">
              <div className="terminal-box overflow-hidden">
                <div className="px-3 py-1 border-b-2 border-terminal-border text-xs text-terminal-dim">
                  {match[1]}
                </div>
                <SyntaxHighlighter
                  language={match[1]}
                  style={terminalTheme}
                  customStyle={{
                    margin: 0,
                    background: '#000000',
                    border: 'none',
                  }}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              </div>
            </div>
          ) : (
            <code className="terminal-inline-code" {...props}>
              {children}
            </code>
          )
        },

        // Custom terminal-style headings
        h1: ({ children }) => (
          <h1 className="text-xl font-bold text-glow mb-2 mt-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-lg font-bold text-glow mb-2 mt-3">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-base font-bold text-glow mb-1 mt-2">{children}</h3>
        ),

        // Lists with terminal style
        ul: ({ children }) => <ul className="list-none ml-4 my-2">{children}</ul>,
        ol: ({ children }) => <ol className="list-none ml-4 my-2">{children}</ol>,
        li: ({ children }) => (
          <li className="before:content-['▸'] before:mr-2 before:text-terminal-dim">
            {children}
          </li>
        ),

        // Links
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-terminal-blue underline hover:text-glow transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        ),

        // Bold/Italic
        strong: ({ children }) => (
          <strong className="font-bold text-glow">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-terminal-text">{children}</em>
        ),

        // Blockquotes
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-terminal-border pl-4 my-2 text-terminal-dim">
            {children}
          </blockquote>
        ),

        // Tables
        table: ({ children }) => (
          <div className="overflow-x-auto my-4">
            <table className="terminal-box w-full">{children}</table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-terminal-border px-2 py-1 text-left bg-terminal-text bg-opacity-10">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-terminal-border px-2 py-1">{children}</td>
        ),

        // Paragraphs - preserve whitespace and break words
        p: ({ children }) => (
          <p className="whitespace-pre-wrap break-words mb-2">{children}</p>
        ),
      }}
    >
      {data}
    </ReactMarkdown>
  )
}
