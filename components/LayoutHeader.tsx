"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { HelpCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useDemoAlert } from "@/components/ui/demo-alert"
import { SearchDialog } from "@/components/SearchDialog"
import { ThemeToggle } from "@/components/ThemeToggle"
import { UserMenu } from "@/components/UserMenu"

function LayoutHeaderContent() {
  const { DemoAlertComponent } = useDemoAlert()
  const [mounted, setMounted] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Keyboard shortcut for search (Cmd+K / Ctrl+K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setSearchOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const getPageName = (path: string) => {
    if (path === "/") return "Dashboard"

    const pathSegments = path.split("/").filter(Boolean)

    // Handle special cases for dynamic routes
    if (pathSegments[0] === "leads" && pathSegments.length === 2) {
      return "Leads / Lead Details"
    }

    // Handle nested routes (e.g., /deals/active, /deals/closed)
    if (pathSegments.length > 1) {
      const formattedPath = pathSegments
        .map(segment => 
          segment
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        )
        .join(" / ")
      
      return formattedPath
    }

    // Format single segment names
    const lastSegment = pathSegments[pathSegments.length - 1]
    const formattedName = lastSegment
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")

    return formattedName
  }

  const getPageDescription = (path: string) => {
    const descriptions: Record<string, string> = {
      "/": "View your key metrics, recent leads, and performance overview at a glance.",
      "/leads": "Manage all your leads and track their progress through the sales pipeline.",
      "/deals": "Track and manage all your deals in one place.",
      "/deals/active": "View and manage all currently active deals in progress.",
      "/deals/closed": "Review your closed deals including won and lost opportunities.",
      "/tasks": "Organize and track your tasks and to-dos.",
      "/account": "Manage your account settings and profile information.",
      "/settings": "Configure your application preferences and settings.",
      "/billing": "View and manage your billing information and subscription.",
      "/integration": "Connect and manage third-party integrations.",
      "/support": "Get help and access support resources.",
    }

    // Handle dynamic routes
    if (path.startsWith("/leads/") && path !== "/leads") {
      return "View detailed information about this lead including activities, notes, and progress."
    }

    return descriptions[path] || "Navigate through your CRM to manage your business."
  }

  const pageName = getPageName(pathname)
  const pageDescription = getPageDescription(pathname)

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 flex items-center gap-4 border-b border-border bg-background px-6 py-4">
        <div className="flex items-center gap-2">
          <h1 className="text-base font-semibold">{pageName}</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{pageDescription}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex-1"></div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <ThemeToggle />
          <UserMenu />
        </div>
      </header>
    )
  }

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center gap-4 border-b border-border bg-background px-6 py-4">
        <div className="flex items-center gap-2">
          <h1 className="text-base font-semibold">{pageName}</h1>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>{pageDescription}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Search Bar */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-md">
            <Button
              variant="outline"
              onClick={() => setSearchOpen(true)}
              className="w-full justify-start text-muted-foreground font-normal"
            >
              <Search className="h-4 w-4 mr-2" />
              <span>Search leads...</span>
              <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <ThemeToggle />
          <UserMenu />
        </div>
      </header>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      <DemoAlertComponent />
    </>
  )
}

export function LayoutHeader() {
  return <LayoutHeaderContent />
}