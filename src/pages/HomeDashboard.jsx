import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import './HomeDashboard.css';

export default function HomeDashboard() {
  const { mockData, playTrack } = usePlayer();
  const navigate = useNavigate();

  return (
    <div className="home-dashboard">
      <div className="home-header-bg"></div>
      <div className="home-content">
        <div className="filter-chips">
          <button className="filter-chip active">All</button>
          <button className="filter-chip">Music</button>
          <button className="filter-chip">Podcasts</button>
        </div>

        <section className="dashboard-section">
          <h2 className="section-title">Popular Albums</h2>
          <div className="cards-grid">
            {mockData.albums.map(album => (
              <div key={album.id} className="media-card" onClick={() => navigate(`/album/${album.id}`)}>
                <div className="card-img-container">
                  <img src={album.coverUrl} alt={album.title} />
                  <button 
                    className="card-play-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      const tracks = mockData.tracks.filter(t => t.albumId === album.id);
                      if (tracks.length > 0) playTrack(tracks[0], tracks);
                    }}
                  >
                    <Play fill="black" size={24} />
                  </button>
                </div>
                <div className="card-info">
                  <span className="card-title">{album.title}</span>
                  <span className="card-subtitle">{album.releaseYear} • Album</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="dashboard-section">
          <h2 className="section-title">Popular Artists</h2>
          <div className="cards-grid">
            {mockData.artists.map(artist => (
              <div key={artist.id} className="media-card" onClick={() => navigate(`/artist/${artist.id}`)}>
                <div className="card-img-container rounded">
                  <img src={artist.avatarUrl} alt={artist.name} />
                  <button 
                    className="card-play-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      const tracks = mockData.tracks.filter(t => t.artistId === artist.id);
                      if (tracks.length > 0) playTrack(tracks[0], tracks);
                    }}
                  >
                    <Play fill="black" size={24} />
                  </button>
                </div>
                <div className="card-info">
                  <span className="card-title">{artist.name}</span>
                  <span className="card-subtitle">Artist</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
