import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { useLayout } from '../context/LayoutContext';
import { Play, Pause, SkipForward, SkipBack, Shuffle, Repeat, Volume2, Mic2, LayoutList, MonitorSpeaker, Maximize2, PlaySquare } from 'lucide-react';
import './FooterPlayer.css';

const formatTime = (seconds) => {
  if (isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

export default function FooterPlayer() {
  const { 
    currentTrack, 
    isPlaying, 
    currentTime, 
    duration, 
    volume, 
    togglePlay, 
    playNext, 
    playPrevious, 
    seek, 
    setVolume,
    getFullTrackDetails
  } = usePlayer();
  const { isRightCollapsed, toggleRightSidebar } = useLayout();

  const trackDetails = currentTrack ? getFullTrackDetails(currentTrack.id) : null;

  return (
    <footer className="footer-player">
      {/* Current Track Info */}
      <div className="now-playing-widget">
        {trackDetails ? (
          <>
            <img src={trackDetails.album?.coverUrl} alt="Album Art" className="cover-art" />
            <div className="track-meta">
              <div className="title">{trackDetails.title}</div>
              <div className="artist">{trackDetails.artist?.name}</div>
            </div>
            <button className="like-btn text-positive">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M15.724 4.22A4.313 4.313 0 0 0 12.192.814a4.269 4.269 0 0 0-3.622 1.13.837.837 0 0 1-1.14 0 4.272 4.272 0 0 0-6.21 5.855l5.916 7.05a1.128 1.128 0 0 0 1.727 0l5.916-7.05a4.228 4.228 0 0 0 .945-3.577z"></path></svg>
            </button>
          </>
        ) : (
          <div className="empty-widget"></div>
        )}
      </div>

      {/* Playback Controls */}
      <div className="player-controls">
        <div className="control-buttons">
          <button className="ctrl-btn subdued hover-white"><Shuffle size={16} /></button>
          <button className="ctrl-btn subdued hover-white" onClick={playPrevious}><SkipBack size={20} fill="currentColor" /></button>
          <button className="play-btn" onClick={togglePlay}>
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
          </button>
          <button className="ctrl-btn subdued hover-white" onClick={playNext}><SkipForward size={20} fill="currentColor" /></button>
          <button className="ctrl-btn subdued hover-white"><Repeat size={16} /></button>
        </div>
        <div className="playback-bar">
          <span className="time">{formatTime(currentTime)}</span>
          <div className="progress-container" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            seek(percent * duration);
          }}>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(currentTime / duration) * 100 || 0}%` }}></div>
            </div>
          </div>
          <span className="time subdued">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right Controls */}
      <div className="extra-controls">
        <button 
          className={`ctrl-btn hover-white ${!isRightCollapsed ? 'text-positive' : 'subdued'}`} 
          onClick={toggleRightSidebar}
          title="Now Playing View"
        >
          <PlaySquare size={16} fill={!isRightCollapsed ? "currentColor" : "none"} />
        </button>
        <button className="ctrl-btn subdued hover-white"><Mic2 size={16} /></button>
        <button className="ctrl-btn subdued hover-white"><LayoutList size={16} /></button>
        <button className="ctrl-btn subdued hover-white"><MonitorSpeaker size={16} /></button>
        <div className="volume-control">
          <button className="ctrl-btn subdued hover-white" onClick={() => setVolume(volume === 0 ? 1 : 0)}>
            <Volume2 size={16} />
          </button>
          <div className="progress-container volume-slider" onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
            setVolume(percent);
          }}>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${volume * 100}%` }}></div>
            </div>
          </div>
        </div>
        <button className="ctrl-btn subdued hover-white"><Maximize2 size={16} /></button>
      </div>
    </footer>
  );
}
