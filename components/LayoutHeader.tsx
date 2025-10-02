"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { User, Settings, Moon, Sun, HelpCircle } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useDemoAlert } from "@/components/ui/demo-alert"

function LayoutHeaderContent() {
  const { theme, setTheme } = useTheme()
  const { showAlert, DemoAlertComponent } = useDemoAlert()
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setMounted(true)
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
      <header className="sticky top-0 z-50 flex items-center gap-3 border-b border-border bg-background px-6 py-4">
        <SidebarTrigger className="size-8 md:hidden" />
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

        <div className="flex items-center gap-2 ml-auto">
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <div className="w-11 h-6 rounded-full bg-input" />
            <Moon className="h-4 w-4" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full cursor-pointer">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/user.png" alt="User" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="/account">
                  <User className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => showAlert("Demo Project", "Authentication and database integration coming soon! This is a demo portfolio project showcasing modern web development capabilities.")}
              >
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    )
  }

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center gap-3 border-b border-border bg-background px-6 py-4">
        <SidebarTrigger className="size-8 md:hidden" />
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

        <div className="flex items-center gap-2 ml-auto">
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4" />
            <Switch
              checked={theme === "dark"}
              onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              className="cursor-pointer"
            />
            <Moon className="h-4 w-4" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full cursor-pointer">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/user.png" alt="User" />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="/account">
                  <User className="mr-2 h-4 w-4" />
                  <span>Account</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => showAlert("Demo Project", "Authentication and database integration coming soon! This is a demo portfolio project showcasing modern web development capabilities.")}
              >
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <DemoAlertComponent />
    </>
  )
}

export function LayoutHeader() {
  return <LayoutHeaderContent />
}