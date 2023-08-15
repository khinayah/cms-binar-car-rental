import React, { createContext, useContext, useState } from 'react'

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [minimized, setMinimized] = useState(false);

  const toggleSidebar = () => {
    console.log(!minimized)
    setMinimized(!minimized);
  }

  return (
    <SidebarContext.Provider value={{ minimized, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
    console.log('clicked')
    return useContext(SidebarContext);
}