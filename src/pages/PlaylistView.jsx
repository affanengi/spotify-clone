import React from 'react';
import { useParams } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import TrackTable from '../components/TrackTable';
import { Play, Pause } from 'lucide-react';
import './PlaylistView.css';

export default function PlaylistView() {
  const { id } = useParams();
  const { mockData, getFullTrackDetails, isPlaying, currentTrack, playTrack, togglePlay } = usePlayer();

  const playlist = mockData.playlists.find(p => p.id === id);
  const user = mockData.users.find(u => u.id === playlist?.creatorId);

  if (!playlist) return <div className="p-8">Playlist not found</div>;

  const tracks = playlist.trackIds.map(getFullTrackDetails).filter(Boolean);
  const isCurrentlyPlayingThisPlaylist = currentTrack && tracks.some(t => t.id === currentTrack.id);

  const handlePlayPlaylist = () => {
    if (isCurrentlyPlayingThisPlaylist) {
      togglePlay();
    } else if (tracks.length > 0) {
      playTrack(tracks[0], tracks);
    }
  };

  return (
    <div className="playlist-view">
      <div className="playlist-header-bg"></div>
      
      <div className="playlist-header-content">
        <img src={playlist.coverUrl} alt={playlist.name} className="playlist-cover shadow-2xl" />
        <div className="playlist-meta">
          <span className="playlist-type">Playlist</span>
          <h1 className="playlist-title">{playlist.name}</h1>
          <div className="playlist-creator-info">
            <img src={user?.profileImageUrl} alt={user?.name} className="creator-avatar" />
            <span className="creator-name font-bold">{user?.name}</span>
            <span className="subdued mx-1">•</span>
            <span className="song-count">{tracks.length} songs</span>
          </div>
        </div>
      </div>

      <div className="playlist-actions-bar">
        <div className="actions-bg-gradient"></div>
        <button className="huge-play-btn" onClick={handlePlayPlaylist}>
          {isCurrentlyPlayingThisPlaylist && isPlaying ? (
            <Pause fill="black" size={28} />
          ) : (
            <Play fill="black" size={28} className="ml-1" />
          )}
        </button>
      </div>

      <div className="playlist-tracks">
        <TrackTable tracks={tracks} />
      </div>
    </div>
  );
}
