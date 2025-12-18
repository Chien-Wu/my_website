import { createContext, useContext, useState, useEffect, useRef } from "react";
import { Howl } from "howler";
import { getSessionId } from "../utils/session";
import { collectTelemetry } from "../utils/telemetry";

const MusicContext = createContext();

// Fetch all songs from starter pack API with telemetry
async function fetchPlaylist() {
  try {
    const sessionId = getSessionId();
    const telemetry = collectTelemetry();

    const response = await fetch(import.meta.env.VITE_STARTER_PACK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        session_id: sessionId,
        ...telemetry,
      }),
    });

    if (!response.ok) throw new Error("Failed to fetch starter pack");

    const data = await response.json();
    const musicList = data.music || [];

    // Transform to our playlist format
    return musicList.map((track) => ({
      id: track.track_id,
      name: track.track_name,
      artist: track.track_author,
      album: track.albumn,
      url: track.track_url,
      duration: Math.floor(track.length),
      description: track.track_description,
    }));
  } catch (error) {
    console.error("Error fetching playlist:", error);
    // Fallback to test MP3 for debugging
    console.log("[MusicContext] Using fallback test MP3");
    return [
      {
        id: 1,
        name: "Test Song 1",
        artist: "Test Artist",
        album: "Test Album",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        duration: 360,
        description: "Test track for debugging",
      },
      {
        id: 2,
        name: "Test Song 2",
        artist: "Test Artist",
        album: "Test Album",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        duration: 360,
        description: "Test track for debugging",
      },
    ];
  }
}

export function MusicProvider({ children }) {
  const [playlist, setPlaylist] = useState([]);
  const [currentSongId, setCurrentSongId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const [isLoading, setIsLoading] = useState(true);
  const soundRef = useRef(null);

  // Fetch playlist on mount
  useEffect(() => {
    fetchPlaylist()
      .then((songs) => {
        if (songs.length > 0) {
          setPlaylist(songs);
          setCurrentSongId(songs[0].id);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("[MusicContext] Error fetching playlist:", err);
        setIsLoading(false);
      });
  }, []);

  // Load and manage current song with Howler.js
  useEffect(() => {
    const song = playlist.find((s) => s.id === currentSongId);
    if (!song) return;

    // Stop and unload previous sound
    if (soundRef.current) {
      soundRef.current.stop();
      soundRef.current.unload();
    }

    // Create new Howl instance
    const sound = new Howl({
      src: [song.url],
      html5: true,
      volume: volume,
      onend: () => {
        handleNext();
      },
      onloaderror: (id, error) => {
        console.error("[MusicContext] Failed to load song:", error);
      },
    });

    soundRef.current = sound;

    if (isPlaying) {
      sound.play();
    }

    return () => {
      sound.unload();
    };
  }, [currentSongId, playlist]);

  // Control playback when isPlaying changes
  useEffect(() => {
    if (!soundRef.current) return;

    if (isPlaying) {
      soundRef.current.play();
    } else {
      soundRef.current.pause();
    }
  }, [isPlaying]);

  // Control volume
  useEffect(() => {
    if (soundRef.current) {
      soundRef.current.volume(volume);
    }
  }, [volume]);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const toggle = () => setIsPlaying((prev) => !prev);

  const handleNext = () => {
    const currentIndex = playlist.findIndex((s) => s.id === currentSongId);
    const nextIndex = (currentIndex + 1) % playlist.length;
    setCurrentSongId(playlist[nextIndex].id);
  };

  const handlePrevious = () => {
    const currentIndex = playlist.findIndex((s) => s.id === currentSongId);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    setCurrentSongId(playlist[prevIndex].id);
  };

  const setVolume = (newVolume) => {
    setVolumeState(newVolume);
  };

  const getCurrentSong = () => {
    return playlist.find((s) => s.id === currentSongId);
  };

  const value = {
    playlist,
    currentSong: getCurrentSong(),
    isPlaying,
    volume,
    isLoading,
    play,
    pause,
    toggle,
    next: handleNext,
    previous: handlePrevious,
    setVolume,
  };

  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
}

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within MusicProvider");
  }
  return context;
};
