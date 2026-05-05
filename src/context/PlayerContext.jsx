import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import mockData from '../data/mockDatabase.json';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(() => {
    const saved = localStorage.getItem('spotify_currentTrack');
    return saved ? JSON.parse(saved) : null;
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(() => {
    const saved = localStorage.getItem('spotify_volume');
    return saved ? parseFloat(saved) : 1;
  });
  const [queue, setQueue] = useState(() => {
    const saved = localStorage.getItem('spotify_queue');
    return saved ? JSON.parse(saved) : [];
  });

  const audioRef = useRef(new Audio());

  // Save to localStorage
  useEffect(() => {
    if (currentTrack) localStorage.setItem('spotify_currentTrack', JSON.stringify(currentTrack));
    localStorage.setItem('spotify_volume', volume.toString());
    localStorage.setItem('spotify_queue', JSON.stringify(queue));
  }, [currentTrack, volume, queue]);

  // Handle audio element
  useEffect(() => {
    const audio = audioRef.current;
    
    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => playNext();

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [queue, currentTrack]);

  // Handle play/pause
  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch(e => console.log('Autoplay prevented', e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handle track change
  useEffect(() => {
    if (currentTrack) {
      audioRef.current.src = currentTrack.audioUrl;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log('Autoplay prevented', e));
      }
    }
  }, [currentTrack]);

  // Handle volume change
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    if (!currentTrack && queue.length > 0) {
      setCurrentTrack(queue[0]);
    }
    setIsPlaying(!isPlaying);
  };

  const playTrack = (track, newQueue = null) => {
    setCurrentTrack(track);
    if (newQueue) setQueue(newQueue);
    setIsPlaying(true);
  };

  const playNext = () => {
    if (queue.length === 0) return;
    const currentIndex = queue.findIndex(t => t.id === currentTrack?.id);
    const nextIndex = (currentIndex + 1) % queue.length;
    setCurrentTrack(queue[nextIndex]);
    setIsPlaying(true);
  };

  const playPrevious = () => {
    if (queue.length === 0) return;
    if (currentTime > 3) {
      seek(0);
      return;
    }
    const currentIndex = queue.findIndex(t => t.id === currentTrack?.id);
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
    setCurrentTrack(queue[prevIndex]);
    setIsPlaying(true);
  };

  const seek = (time) => {
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  // Helper to get full track details from ID
  const getFullTrackDetails = (trackId) => {
    const track = mockData.tracks.find(t => t.id === trackId);
    if (!track) return null;
    const artist = mockData.artists.find(a => a.id === track.artistId);
    const album = mockData.albums.find(a => a.id === track.albumId);
    return { ...track, artist, album };
  };

  const value = {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    queue,
    mockData,
    togglePlay,
    playTrack,
    playNext,
    playPrevious,
    seek,
    setVolume,
    getFullTrackDetails
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};
