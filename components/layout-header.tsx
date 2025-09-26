"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { useCurrentPage } from "@/hooks/use-current-page"

export function LayoutHeader() {
  const { title } = useCurrentPage()

  return (
    <header className="flex items-center gap-3 border-b border-border bg-background/80 px-6 py-4 backdrop-blur">
      <SidebarTrigger className="size-8" />
      <h1 className="text-md font-semibold">{title}</h1>
    </header>
  )
}