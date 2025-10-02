"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"

type SidebarToggleContextType = {
  isCollapsed: boolean
  isMobileOpen: boolean
  toggleSidebar: () => void
  setIsCollapsed: (collapsed: boolean) => void
  setMobileOpen: (open: boolean) => void
}

const SidebarToggleContext = createContext<SidebarToggleContextType | undefined>(undefined)

export function SidebarToggleProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setMobileOpen] = useState(false)

  const toggleSidebar = useCallback(() => {
    setIsCollapsed(prev => !prev)
  }, [])

  return (
    <SidebarToggleContext.Provider value={{ isCollapsed, isMobileOpen, toggleSidebar, setIsCollapsed, setMobileOpen }}>
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