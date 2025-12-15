import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

// Custom terminal-style theme
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

export default function CodeBlock({ data }) {
  return (
    <div className="my-4">
      <div className="terminal-box overflow-hidden">
        <div className="px-3 py-1 border-b-2 border-terminal-border text-xs text-terminal-dim">
          {data.language || 'code'}
        </div>
        <SyntaxHighlighter
          language={data.language || 'text'}
          style={terminalTheme}
          customStyle={{
            margin: 0,
            background: '#000000',
            border: 'none',
          }}
        >
          {data.code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
