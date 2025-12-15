export default function LinkBlock({ data }) {
  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block my-4 terminal-box p-4 hover:bg-terminal-text hover:bg-opacity-10 transition-colors"
    >
      {data.preview && (
        <div className="mb-2 overflow-hidden">
          <img
            src={data.preview}
            alt={data.title}
            className="w-full h-32 object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="font-bold text-terminal-text text-glow">
        {data.title || data.url}
      </div>
      {data.description && (
        <div className="mt-1 text-sm text-terminal-dim">
          {data.description}
        </div>
      )}
      <div className="mt-2 text-xs text-terminal-dim break-all">
        → {data.url}
      </div>
    </a>
  )
}
