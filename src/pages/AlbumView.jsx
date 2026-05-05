import React from 'react';
import { useParams } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import TrackTable from '../components/TrackTable';
import { Play, Pause } from 'lucide-react';
import './PlaylistView.css'; // Reusing PlaylistView CSS as they share structural layout

export default function AlbumView() {
  const { id } = useParams();
  const { mockData, getFullTrackDetails, isPlaying, currentTrack, playTrack, togglePlay } = usePlayer();

  const album = mockData.albums.find(a => a.id === id);
  const artist = mockData.artists.find(a => a.id === album?.artistId);

  if (!album) return <div className="p-8">Album not found</div>;

  // Filter tracks that belong to this album
  const trackIds = mockData.tracks.filter(t => t.albumId === album.id).map(t => t.id);
  const tracks = trackIds.map(getFullTrackDetails).filter(Boolean);
  const isCurrentlyPlayingThisAlbum = currentTrack && tracks.some(t => t.id === currentTrack.id);

  const handlePlayAlbum = () => {
    if (isCurrentlyPlayingThisAlbum) {
      togglePlay();
    } else if (tracks.length > 0) {
      playTrack(tracks[0], tracks);
    }
  };

  return (
    <div className="playlist-view">
      <div className="playlist-header-bg"></div>
      
      <div className="playlist-header-content">
        <img src={album.coverUrl} alt={album.title} className="playlist-cover shadow-2xl" />
        <div className="playlist-meta">
          <span className="playlist-type">Album</span>
          <h1 className="playlist-title" style={{ fontSize: '4rem' }}>{album.title}</h1>
          <div className="playlist-creator-info">
            <img src={artist?.avatarUrl} alt={artist?.name} className="creator-avatar" />
            <span className="creator-name font-bold">{artist?.name}</span>
            <span className="subdued mx-1">•</span>
            <span>{album.releaseYear}</span>
            <span className="subdued mx-1">•</span>
            <span className="song-count">{tracks.length} songs</span>
          </div>
        </div>
      </div>

      <div className="playlist-actions-bar">
        <div className="actions-bg-gradient"></div>
        <button className="huge-play-btn" onClick={handlePlayAlbum}>
          {isCurrentlyPlayingThisAlbum && isPlaying ? (
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
