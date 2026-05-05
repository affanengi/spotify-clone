import React, { createContext, useState, useContext, useEffect } from 'react';

const LayoutContext = createContext();

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider = ({ children }) => {
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(() => {
    return localStorage.getItem('isLeftCollapsed') === 'true';
  });
  
  const [isRightCollapsed, setIsRightCollapsed] = useState(() => {
    return localStorage.getItem('isRightCollapsed') === 'true';
  });
  
  const [isLibraryExpanded, setIsLibraryExpanded] = useState(false);

  useEffect(() => {
    localStorage.setItem('isLeftCollapsed', isLeftCollapsed);
  }, [isLeftCollapsed]);

  useEffect(() => {
    localStorage.setItem('isRightCollapsed', isRightCollapsed);
  }, [isRightCollapsed]);

  const toggleLeftSidebar = () => {
    setIsLeftCollapsed(prev => !prev);
    // If we expand the library, ensure it's uncollapsed
    if (isLeftCollapsed && isLibraryExpanded) {
      setIsLibraryExpanded(false);
    }
  };

  const toggleRightSidebar = () => setIsRightCollapsed(prev => !prev);
  
  const toggleLibraryExpanded = () => {
    setIsLibraryExpanded(prev => !prev);
    if (!isLibraryExpanded) {
      setIsLeftCollapsed(false); // Uncollapse if we expand to full screen
    }
  };

  return (
    <LayoutContext.Provider value={{
      isLeftCollapsed,
      isRightCollapsed,
      isLibraryExpanded,
      toggleLeftSidebar,
      toggleRightSidebar,
      toggleLibraryExpanded
    }}>
      {children}
    </LayoutContext.Provider>
  );
};
