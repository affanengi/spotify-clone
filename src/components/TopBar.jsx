import React, { useState } from 'react';
import { Home, Search as SearchIcon, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext';
import './TopBar.css';

export default function TopBar() {
  const { mockData } = usePlayer();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // We can hardcode Spotify logo SVG here, but a simple text or lucide icon works
  // Since we don't have Spotify logo, we'll just use a small custom element or leave it out as seen in screenshot
  // In the screenshot there's a Spotify logo on the far left.

  const recentSearches = [
    mockData.playlists[0],
    ...mockData.artists.slice(0, 2)
  ];

  const handleSearchFocus = () => {
    setIsFocused(true);
    if (location.pathname !== '/search') {
      navigate('/search');
    }
  };

  return (
    <div className="top-bar-container">
      <div className="top-bar-left">
        <div className="spotify-logo" onClick={() => navigate('/')}>
          {/* Simple Spotify Logo placeholder */}
          <svg viewBox="0 0 24 24" fill="var(--text-base)" width="24" height="24">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.54.659.3 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.84.24 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.42-1.02.599-1.559.3z" />
          </svg>
        </div>
      </div>
      
      <div className="top-bar-center">
        <button 
          className="home-btn" 
          onClick={() => navigate('/')}
          aria-label="Home"
        >
          <Home size={24} color={location.pathname === '/' ? "white" : "var(--text-subdued)"} />
        </button>

        <div className={`search-input-wrapper ${isFocused ? 'focused' : ''}`}>
          <SearchIcon size={24} className="search-icon" />
          <input 
            type="text" 
            className="search-input" 
            placeholder="What do you want to play?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleSearchFocus}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          />
          {query && (
            <button className="clear-btn" onClick={() => setQuery('')}>
              <X size={20} />
            </button>
          )}

          {isFocused && !query && (
            <div className="recent-searches-dropdown">
              <h3 className="recent-title">Recent searches</h3>
              <div className="recent-list">
                {recentSearches.map((item, idx) => {
                  const isPlaylist = item.trackIds !== undefined;
                  const itemTitle = isPlaylist ? item.name : item.name;
                  const itemSubtitle = isPlaylist ? 'Playlist' : 'Artist';
                  const itemImg = isPlaylist ? item.coverUrl : item.avatarUrl;
                  const itemLink = isPlaylist ? `/playlist/${item.id}` : `/artist/${item.id}`;

                  return (
                    <div 
                      key={idx} 
                      className="recent-item"
                      onClick={() => navigate(itemLink)}
                    >
                      <img src={itemImg} alt={itemTitle} className={`recent-img ${!isPlaylist ? 'rounded-full' : ''}`} />
                      <div className="recent-info">
                        <span className="recent-name">{itemTitle}</span>
                        <span className="recent-type">{itemSubtitle}</span>
                      </div>
                      <button className="remove-recent" onClick={(e) => e.stopPropagation()}><X size={16} /></button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="top-bar-right">
        {/* Placeholder for User Profile or other actions */}
        <div className="user-avatar-placeholder">M</div>
      </div>
    </div>
  );
}
