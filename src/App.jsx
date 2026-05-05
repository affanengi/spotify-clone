import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PlayerProvider } from './context/PlayerContext';
import { LayoutProvider, useLayout } from './context/LayoutContext';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import FooterPlayer from './components/FooterPlayer';
import TopBar from './components/TopBar';

// Import Pages
import HomeDashboard from './pages/HomeDashboard';
import PlaylistView from './pages/PlaylistView';
import ArtistProfile from './pages/ArtistProfile';
import SearchView from './pages/SearchView';
import AlbumView from './pages/AlbumView'; // To be created

function AppContent() {
  const { isLeftCollapsed, isRightCollapsed, isLibraryExpanded, toggleRightSidebar } = useLayout();

  return (
    <div 
      className={`app-container ${isLeftCollapsed ? 'left-collapsed' : ''} ${isRightCollapsed ? 'right-collapsed' : ''} ${isLibraryExpanded ? 'library-expanded' : ''}`}
    >
      <TopBar />

      <div className="left-sidebar">
        <LeftSidebar />
      </div>
      
      {!isLibraryExpanded && (
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomeDashboard />} />
            <Route path="/search" element={<SearchView />} />
            <Route path="/playlist/:id" element={<PlaylistView />} />
            <Route path="/artist/:id" element={<ArtistProfile />} />
            <Route path="/album/:id" element={<AlbumView />} />
          </Routes>
        </main>
      )}
      
      {!isRightCollapsed && (
        <div className="right-sidebar">
          <RightSidebar />
        </div>
      )}

      {isRightCollapsed && (
        <button 
          className="reopen-right-edge-btn" 
          onClick={toggleRightSidebar}
          title="Show Now Playing view"
        >
          <svg role="img" height="16" width="16" aria-hidden="true" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11 2.207L9.793 1 3.5 7.293a1 1 0 0 0 0 1.414L9.793 15 11 13.793 5.207 8 11 2.207z"></path>
          </svg>
        </button>
      )}
      
      <div className="footer-player">
        <FooterPlayer />
      </div>
    </div>
  );
}

function App() {
  return (
    <PlayerProvider>
      <LayoutProvider>
        <Router>
          <AppContent />
        </Router>
      </LayoutProvider>
    </PlayerProvider>
  );
}

export default App;
