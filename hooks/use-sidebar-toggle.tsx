"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"

type SidebarToggleContextType = {
  isCollapsed: boolean
  toggleSidebar: () => void
  setIsCollapsed: (collapsed: boolean) => void
}

const SidebarToggleContext = createContext<SidebarToggleContextType | undefined>(undefined)

export function SidebarToggleProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = useCallback(() => {
    setIsCollapsed(prev => !prev)
  }, [])

  return (
    <SidebarToggleContext.Provider value={{ isCollapsed, toggleSidebar, setIsCollapsed }}>
      {children}
    </SidebarToggleContext.Provider>
  )
}

export function useSidebarToggle() {
  const context = useContext(SidebarToggleContext)
  if (context === undefined) {
    throw new Error("useSidebarToggle must be used within a SidebarToggleProvider")
  }
  return context
}