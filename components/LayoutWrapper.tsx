"use client"

import { useSidebarToggle } from "@/hooks/use-sidebar-toggle"
import { useIsMobile } from "@/hooks/use-mobile"
import { LayoutHeader } from "@/components/LayoutHeader"
import { AppSidebar } from "@/components/AppSidebar"
import { cn } from "@/lib/utils"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isCollapsed, isMobileOpen, setMobileOpen } = useSidebarToggle()
  const isMobile = useIsMobile()

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden">
      <AppSidebar />
      
      {/* Mobile overlay */}
      {isMobile && isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 md:hidden" 
          onClick={() => setMobileOpen(false)}
        />
      )}
      
      <main
        className={cn(
          "flex flex-1 flex-col transition-all duration-300 ease-in-out min-w-0 max-w-full",
          // Desktop: margin based on sidebar state
          !isMobile && (isCollapsed ? "ml-16" : "ml-50"),
          // Mobile: no margin (sidebar is overlay)
          isMobile && "ml-0"
        )}
      >
        <LayoutHeader />
        <div className="flex-1 overflow-auto p-4 md:p-6 max-w-full">
          <div className="max-w-full overflow-x-hidden">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}