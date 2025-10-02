"use client"

import { useSidebarToggle } from "@/hooks/use-sidebar-toggle"
import { LayoutHeader } from "@/components/LayoutHeader"
import { AppSidebar } from "@/components/AppSidebar"
import { cn } from "@/lib/utils"

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebarToggle()

  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <main
        className={cn(
          "flex flex-1 flex-col transition-all duration-300 ease-in-out",
          isCollapsed ? "ml-16" : "ml-50"
        )}
      >
        <LayoutHeader />
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </main>
    </div>
  )
}