import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Play, Pause, Clock3 } from 'lucide-react';
import './TrackTable.css';

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
};

export default function TrackTable({ tracks }) {
  const { currentTrack, isPlaying, playTrack, togglePlay } = usePlayer();
  const [hoveredTrackId, setHoveredTrackId] = useState(null);

  const handlePlayClick = (track) => {
    if (currentTrack?.id === track.id) {
      togglePlay();
    } else {
      playTrack(track, tracks);
    }
  };

  return (
    <div className="track-table">
      <div className="table-header">
        <div className="col-index">#</div>
        <div className="col-title">Title</div>
        <div className="col-album">Album</div>
        <div className="col-date">Date added</div>
        <div className="col-duration"><Clock3 size={16} /></div>
      </div>

      <div className="table-body">
        {tracks.map((track, index) => {
          const isCurrent = currentTrack?.id === track.id;
          const isHovered = hoveredTrackId === track.id;

          return (
            <div 
              key={track.id} 
              className={`table-row ${isCurrent ? 'active' : ''}`}
              onMouseEnter={() => setHoveredTrackId(track.id)}
              onMouseLeave={() => setHoveredTrackId(null)}
              onClick={() => handlePlayClick(track)}
            >
              <div className="col-index">
                {isHovered || isCurrent ? (
                  isCurrent && isPlaying ? (
                    <Pause size={16} fill="currentColor" className={isCurrent ? "text-positive" : ""} />
                  ) : (
                    <Play size={16} fill="currentColor" className={isCurrent ? "text-positive" : ""} />
                  )
                ) : (
                  <span className={isCurrent ? "text-positive" : "subdued"}>{index + 1}</span>
                )}
              </div>
              <div className="col-title track-info-col">
                <img src={track.album?.coverUrl} alt="Cover" className="track-thumb" />
                <div className="track-text">
                  <span className={`track-name ${isCurrent ? 'text-positive' : ''}`}>{track.title}</span>
                  <span className="track-artist subdued">{track.artist?.name}</span>
                </div>
              </div>
              <div className="col-album subdued hover-white">{track.album?.title}</div>
              <div className="col-date subdued">{track.dateAdded}</div>
              <div className="col-duration subdued">{formatTime(track.duration)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
