import { useMusic } from "../../contexts/MusicContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardFast, faForwardFast, faPlay, faPause } from "@fortawesome/free-solid-svg-icons";

/**
 * Music Player Controls Component
 * Displays current song and playback controls
 */
export default function MusicPlayerControls() {
  const {
    currentSong,
    isPlaying,
    volume,
    isLoading,
    toggle,
    next,
    previous,
    setVolume,
  } = useMusic();

  if (isLoading) {
    return (
      <div className="terminal-box p-3 m-6">
        <div className="text-xs text-terminal-dim text-center">
          Loading music...
        </div>
      </div>
    );
  }

  if (!currentSong) return null;

  return (
    <div className="terminal-box p-3 mx-6 my-0">
      {/* Header */}
      <div className="text-xs text-terminal-dim mb-2 flex items-center gap-2">
        <span>♫</span>
        <span>NOW PLAYING</span>
      </div>

      {/* Song Info */}
      <div className="text-sm text-terminal-text mb-3">
        <div className="font-bold text-glow">{currentSong.name}</div>
        <div className="text-xs text-terminal-dim">{currentSong.artist}</div>
      </div>

      {/* Playback Controls */}
      <div className="flex items-center justify-center gap-6 mb-3">
        <button
          onClick={previous}
          className="text-terminal-text hover:text-glow transition-all"
          title="Previous song"
        >
          <FontAwesomeIcon icon={faBackwardFast} />
        </button>
        <button
          onClick={toggle}
          className="text-2xl text-terminal-text hover:text-glow transition-all"
          title={isPlaying ? "Pause" : "Play"}
        >
          <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
        </button>
        <button
          onClick={next}
          className="text-terminal-text hover:text-glow transition-all"
          title="Next song"
        >
          <FontAwesomeIcon icon={faForwardFast} />
        </button>
      </div>

      {/* Volume Control */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-terminal-dim">[VOL]</span>
        <input
          type="range"
          min="0"
          max="100"
          value={volume * 100}
          onChange={(e) => setVolume(e.target.value / 100)}
          className="flex-1 h-1 bg-terminal-bg-dim rounded appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, var(--text) 0%, var(--text) ${
              volume * 100
            }%, var(--text-dim) ${volume * 100}%, var(--text-dim) 100%)`,
          }}
        />
        <span className="text-xs text-terminal-dim w-8 text-right">
          {Math.round(volume * 100)}%
        </span>
      </div>
    </div>
  );
}
