import React, { createContext, useState } from 'react'

export const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [minimized, setMinimized] = useState(false)

  const toggleSidebar = () => {
    setMinimized(!minimized);
  }

  return (
    <SidebarContext.Provider value={{ minimized, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}