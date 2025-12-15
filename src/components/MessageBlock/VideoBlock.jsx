/**
 * Extract YouTube video ID from various URL formats
 */
function getYouTubeVideoId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }

  return null
}

export default function VideoBlock({ data }) {
  const isYouTube = data.url.includes('youtube.com') || data.url.includes('youtu.be')
  const videoId = isYouTube ? getYouTubeVideoId(data.url) : null

  if (isYouTube && videoId) {
    return (
      <div className="my-4">
        <div className="terminal-box overflow-hidden">
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen
              title={data.title || 'Video'}
            />
          </div>
        </div>
        {data.title && (
          <div className="mt-2 text-sm text-terminal-dim">
            {data.title}
          </div>
        )}
      </div>
    )
  }

  // Fallback for direct video URLs
  return (
    <div className="my-4">
      <div className="terminal-box overflow-hidden">
        <video
          src={data.url}
          controls
          className="w-full"
          poster={data.thumbnail}
        />
      </div>
      {data.title && (
        <div className="mt-2 text-sm text-terminal-dim">
          {data.title}
        </div>
      )}
    </div>
  )
}
