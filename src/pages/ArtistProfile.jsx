import React from 'react';
import { useParams } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import TrackTable from '../components/TrackTable';
import { Play, Pause, MoreHorizontal } from 'lucide-react';
import './ArtistProfile.css';

export default function ArtistProfile() {
  const { id } = useParams();
  const { mockData, getFullTrackDetails, isPlaying, currentTrack, playTrack, togglePlay } = usePlayer();

  const artist = mockData.artists.find(a => a.id === id);

  if (!artist) return <div className="p-8">Artist not found</div>;

  const tracks = mockData.tracks.filter(t => t.artistId === id).map(t => getFullTrackDetails(t.id));
  const isCurrentlyPlayingThisArtist = currentTrack && tracks.some(t => t.id === currentTrack.id);

  const handlePlayArtist = () => {
    if (isCurrentlyPlayingThisArtist) {
      togglePlay();
    } else if (tracks.length > 0) {
      playTrack(tracks[0], tracks);
    }
  };

  return (
    <div className="artist-profile">
      <div 
        className="artist-hero-bg" 
        style={{ backgroundImage: `url(${artist.heroImageUrl})` }}
      >
        <div className="artist-hero-overlay"></div>
        <div className="artist-hero-content">
          <div className="verified-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#3d91f4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></path></svg>
            <span>Verified Artist</span>
          </div>
          <h1 className="artist-title">{artist.name}</h1>
          <span className="artist-listeners">{artist.monthlyListeners.toLocaleString()} monthly listeners</span>
        </div>
      </div>

      <div className="artist-actions-bar">
        <div className="actions-bg-gradient"></div>
        <button className="huge-play-btn" onClick={handlePlayArtist}>
          {isCurrentlyPlayingThisArtist && isPlaying ? (
            <Pause fill="black" size={28} />
          ) : (
            <Play fill="black" size={28} className="ml-1" />
          )}
        </button>
        <button className="follow-btn-large">Follow</button>
        <button className="icon-btn-large subdued hover-white"><MoreHorizontal size={32} /></button>
      </div>

      <div className="artist-content-section">
        <h2 className="section-title">Popular</h2>
        <TrackTable tracks={tracks} />
      </div>
    </div>
  );
}
