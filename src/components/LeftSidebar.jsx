import React from 'react';
import { Library, Plus, ArrowRight, ArrowLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import { useLayout } from '../context/LayoutContext';
import './LeftSidebar.css';

export default function LeftSidebar() {
  const { mockData } = usePlayer();
  const navigate = useNavigate();
  const { 
    isLeftCollapsed, 
    isLibraryExpanded, 
    toggleLeftSidebar, 
    toggleLibraryExpanded 
  } = useLayout();

  return (
    <div className={`left-sidebar-container ${isLeftCollapsed ? 'collapsed' : ''} ${isLibraryExpanded ? 'expanded' : ''}`}>
      <div className="library-section">
        <div className="library-header">
          <button 
            className="library-btn nav-item" 
            onClick={toggleLeftSidebar}
            title={isLeftCollapsed ? "Expand Your Library" : "Collapse Your Library"}
          >
            <Library size={24} />
            {!isLeftCollapsed && <span>Your Library</span>}
          </button>
          
          {!isLeftCollapsed && (
            <div className="library-actions">
              <button className="icon-btn"><Plus size={16} /></button>
              <button 
                className="icon-btn" 
                onClick={toggleLibraryExpanded}
                title={isLibraryExpanded ? "Minimize Library" : "Expand Library"}
              >
                {isLibraryExpanded ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
              </button>
            </div>
          )}
        </div>

        {!isLeftCollapsed && (
          <div className="library-filters">
            <span className="chip">Playlists</span>
            <span className="chip">Artists</span>
            <span className="chip">Albums</span>
          </div>
        )}

        <div className="library-content">
          {!isLeftCollapsed && (
            <div className="search-recents">
              <button className="icon-btn"><Search size={16} /></button>
              <span className="recents-text">Recents</span>
            </div>
          )}

          <ul className={`library-list ${isLibraryExpanded ? 'grid-view' : ''}`}>
            {mockData.playlists.map(playlist => (
              <li key={playlist.id} onClick={() => navigate(`/playlist/${playlist.id}`)}>
                <div className="library-item">
                  <img src={playlist.coverUrl} alt={playlist.name} className="item-img" />
                  {!isLeftCollapsed && (
                    <div className="item-details">
                      <span className="item-title text-base">{playlist.name}</span>
                      <span className="item-subtitle subdued">Playlist • {playlist.trackIds.length} songs</span>
                    </div>
                  )}
                </div>
              </li>
            ))}
            {mockData.artists.map(artist => (
              <li key={artist.id} onClick={() => navigate(`/artist/${artist.id}`)}>
                <div className="library-item">
                  <img src={artist.avatarUrl} alt={artist.name} className="item-img rounded-full" />
                  {!isLeftCollapsed && (
                    <div className="item-details">
                      <span className="item-title text-base">{artist.name}</span>
                      <span className="item-subtitle subdued">Artist</span>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
