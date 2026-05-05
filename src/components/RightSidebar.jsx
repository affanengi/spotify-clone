import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { useLayout } from '../context/LayoutContext';
import { MoreHorizontal, X } from 'lucide-react';
import './RightSidebar.css';

export default function RightSidebar() {
  const { currentTrack, getFullTrackDetails } = usePlayer();
  const { toggleRightSidebar } = useLayout();

  const trackDetails = currentTrack ? getFullTrackDetails(currentTrack.id) : null;

  if (!trackDetails) {
    return null; // Don't render anything if no track is playing
  }

  return (
    <div className="right-sidebar-container">
      <div className="right-header">
        <span className="right-title">{trackDetails.album?.title}</span>
        <div className="right-actions">
          <button className="icon-btn-small"><MoreHorizontal size={16} /></button>
          <button className="icon-btn-small" onClick={toggleRightSidebar} title="Close"><X size={16} /></button>
        </div>
      </div>

      <div className="right-content">
        <div className="large-cover-art">
          <img src={trackDetails.album?.coverUrl} alt="Album Art" />
        </div>
        
        <div className="track-info-large">
          <div className="track-title-large">{trackDetails.title}</div>
          <div className="track-artist-large">{trackDetails.artist?.name}</div>
        </div>

        <div className="about-artist-card">
          <div className="about-artist-header">
            <span>About the artist</span>
          </div>
          <img src={trackDetails.artist?.heroImageUrl} alt={trackDetails.artist?.name} className="artist-hero" />
          <div className="about-artist-content">
            <span className="artist-name-card">{trackDetails.artist?.name}</span>
            <div className="artist-stats">
              <span className="listeners">{trackDetails.artist?.monthlyListeners?.toLocaleString()} monthly listeners</span>
              <button className="follow-btn">Follow</button>
            </div>
            <p className="artist-bio">
              {trackDetails.artist?.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
