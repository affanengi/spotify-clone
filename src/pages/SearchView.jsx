import React, { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { useNavigate } from 'react-router-dom';
import './SearchView.css';

export default function SearchView() {
  const { mockData } = usePlayer();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const recentSearches = [
    mockData.playlists[0],
    ...mockData.artists.slice(0, 2)
  ];

  return (
    <div className="search-view">
      <div className="search-header-container">
        <div className={`search-input-wrapper ${isFocused ? 'focused' : ''}`}>
          <SearchIcon size={24} className="search-icon" />
          <input 
            type="text" 
            className="search-input" 
            placeholder="What do you want to play?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
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
                      <button className="remove-recent"><X size={16} /></button>
                    </div>
                  );
                })}
              </div>
              <div className="clear-recent-container">
                <button className="clear-recent-btn">Clear recent searches</button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="search-content">
        <h2 className="section-title">Browse all</h2>
        <div className="browse-grid">
          {['Podcasts', 'Live Events', 'Made For You', 'New Releases', 'Pop', 'Hip-Hop'].map((cat, i) => (
            <div key={i} className="browse-card" style={{ backgroundColor: `hsl(${i * 50}, 70%, 40%)` }}>
              <span className="browse-title">{cat}</span>
              <div className="browse-img-placeholder"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
