export default function ImageBlock({ data }) {
  return (
    <div className="my-4">
      <div className="terminal-box inline-block">
        <img
          src={data.url}
          alt={data.alt || 'Image'}
          className="max-w-full h-auto"
          loading="lazy"
        />
      </div>
      {data.caption && (
        <div className="mt-2 text-sm text-terminal-dim">
          {data.caption}
        </div>
      )}
    </div>
  )
}
