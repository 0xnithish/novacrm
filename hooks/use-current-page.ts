"use client"

import { usePathname } from "next/navigation"

export function useCurrentPage() {
  const pathname = usePathname()

  const getPageTitle = (path: string): string => {
    // Remove leading and trailing slashes
    const cleanPath = path.replace(/^\/|\/$/g, "")

    // Handle root path (homepage)
    if (cleanPath === "" || cleanPath === "/") {
      return "Overview"
    }

    // Map paths to titles
    const pathMap: Record<string, string> = {
      "deals": "Deals",
      "integration": "Integration",
      "tasks": "Tasks",
      "settings": "Settings",
      "support": "Help & Support",
      "deals/active": "Active Deals",
      "deals/won": "Won Deals",
      "deals/lost": "Lost Deals",
    }

    // Check for exact match first
    if (pathMap[cleanPath]) {
      return pathMap[cleanPath]
    }

    // Handle dynamic routes or nested paths
    const segments = cleanPath.split("/")
    const mainPath = segments[0]

    if (pathMap[mainPath]) {
      return pathMap[mainPath]
    }

    // Fallback: capitalize the first segment
    return segments[0]
      ? segments[0].charAt(0).toUpperCase() + segments[0].slice(1)
      : "Overview"
  }

  return {
    title: getPageTitle(pathname),
    pathname
  }
}