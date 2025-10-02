"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { useDealDetails } from "@/hooks/useDealDetails"
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useDemoAlert } from "@/components/ui/demo-alert"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  LayoutDashboard,
  Building,
  Plug,
  CheckSquare,
  Settings,
  HelpCircle,
  ChevronDown,
  User,
  User2,
  X,
  Mail,
  Phone,
  DollarSign,
  Calendar,
  PanelRight,
} from "lucide-react"

export function AppSidebar() {
  const { selectedDeal, closeDealDetails } = useDealDetails()
  const { isCollapsed, isMobileOpen, toggleSidebar, setMobileOpen } = useSidebarToggle()
  const isMobile = useIsMobile()
  const { showAlert, DemoAlertComponent } = useDemoAlert()
  const pathname = usePathname()
  const isOnDealsRoute = pathname?.startsWith("/deals") ?? false
  const [isDealsOpen, setIsDealsOpen] = useState(isOnDealsRoute)
  const [userName, setUserName] = useState("John Doe")
  const [userEmail, setUserEmail] = useState("john@example.com")

  useEffect(() => {
    setIsDealsOpen(isOnDealsRoute)

    // Load user data from localStorage with error handling
    try {
      const savedProfile = localStorage.getItem('userProfile')
      if (savedProfile) {
        const parsedProfile = JSON.parse(savedProfile)
        if (parsedProfile.firstName && parsedProfile.lastName) {
          const fullName = `${parsedProfile.firstName} ${parsedProfile.lastName}`
          setUserName(fullName)
        }
        if (parsedProfile.email) {
          setUserEmail(parsedProfile.email)
        }
      }
    } catch (error) {
      console.error('Failed to load user profile from localStorage:', error)
      // Keep default values
    }
  }, [isOnDealsRoute])

  // Close mobile sidebar when clicking a link
  const handleLinkClick = () => {
    if (isMobile) {
      setMobileOpen(false)
    }
  }

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out z-20 flex flex-col",
        // Desktop behavior
        !isMobile && (isCollapsed ? "w-16" : "w-50"),
        // Mobile behavior
        isMobile && "w-64",
        isMobile && (isMobileOpen ? "translate-x-0" : "-translate-x-full")
      )}
    >
      {/* Header */}
      <div className="p-4  border-sidebar-border">
        <div className={cn(
          "flex items-center",
          isCollapsed ? "justify-center" : "justify-between"
        )}>
          {isCollapsed ? (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleSidebar} 
              className="h-8 w-8 p-0"
            >
              <PanelRight className="h-4 w-4" />
            </Button>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.svg"
                  alt="Nova logo"
                  width={20}
                  height={20}
                  className="rounded-sm flex-shrink-0"
                  priority
                />
                <span className="text-lg font-semibold text-sidebar-foreground">Nova</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={toggleSidebar} 
                className="h-8 w-8 p-0"
              >
                <PanelRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1">
        <nav className={cn(
          "space-y-2",
          isCollapsed ? "p-2" : "p-4"
        )}>
          {/* Overview */}
          <Link href="/" onClick={handleLinkClick}>
            <Button
              variant={pathname === "/" ? "secondary" : "ghost"}
              className={cn(
                "w-full",
                isCollapsed ? "justify-center px-0" : "justify-start px-3 gap-3"
              )}
            >
              <LayoutDashboard className="h-4 w-4 flex-shrink-0" />
              {!isCollapsed && <span>Overview</span>}
            </Button>
          </Link>

          {/* Deals */}
          <div>
            <Button
              variant={pathname?.startsWith("/deals") ? "secondary" : "ghost"}
              className={cn(
                "w-full",
                isCollapsed ? "justify-center px-0" : "justify-between px-3"
              )}
              onClick={() => !isCollapsed && setIsDealsOpen(!isDealsOpen)}
            >
              <div className={cn(
                "flex items-center",
                isCollapsed ? "justify-center" : "gap-3"
              )}>
                <Building className="h-4 w-4 flex-shrink-0" />
                {!isCollapsed && <span>Deals</span>}
              </div>
              {!isCollapsed && (
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isDealsOpen && "rotate-180"
                  )}
                />
              )}
            </Button>

            {!isCollapsed && isDealsOpen && (
              <div className="ml-4 mt-2 space-y-1">
                <Link href="/deals/active" onClick={handleLinkClick}>
                  <Button
                    variant={pathname === "/deals/active" ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start gap-2"
                  >
                    <CheckSquare className="h-4 w-4" />
                    <span>Active</span>
                  </Button>
                </Link>
                <Link href="/deals/closed" onClick={handleLinkClick}>
                  <Button
                    variant={pathname === "/deals/closed" ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    <span>Closed</span>
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Integration */}
          <Link href="/integration" onClick={handleLinkClick}>
            <Button
              variant={pathname === "/integration" ? "secondary" : "ghost"}
              className={cn(
                "w-full",
                isCollapsed ? "justify-center px-0" : "justify-start px-3 gap-3"
              )}
            >
              <Plug className="h-4 w-4 flex-shrink-0" />
              {!isCollapsed && <span>Integration</span>}
            </Button>
          </Link>

          {/* Tasks */}
          <Link href="/tasks" onClick={handleLinkClick}>
            <Button
              variant={pathname === "/tasks" ? "secondary" : "ghost"}
              className={cn(
                "w-full",
                isCollapsed ? "justify-center px-0" : "justify-start px-3 gap-3"
              )}
            >
              <CheckSquare className="h-4 w-4 flex-shrink-0" />
              {!isCollapsed && <span>Tasks</span>}
            </Button>
          </Link>
        </nav>

        {/* Deal Details Section */}
        {selectedDeal && !isCollapsed && (
          <div className="px-4 mt-6">
            <Separator className="mb-4" />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-sm text-sidebar-foreground">Deal Details</h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeDealDetails}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>

              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm">{selectedDeal.title}</h4>
                    <p className="text-xs text-muted-foreground">ID: {selectedDeal.id}</p>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{selectedDeal.clientName}</p>
                        <p className="text-xs text-muted-foreground">Client</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm">{selectedDeal.email}</p>
                        <p className="text-xs text-muted-foreground">Email</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm">{selectedDeal.phone}</p>
                        <p className="text-xs text-muted-foreground">Phone</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{selectedDeal.amount}</p>
                        <p className="text-xs text-muted-foreground">Amount</p>
                      </div>
                    </div>

                    {selectedDeal.closedDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-sm">{selectedDeal.closedDate}</p>
                          <p className="text-xs text-muted-foreground">Closed Date</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Button size="sm" className="w-full bg-[#0a8126] hover:bg-[#0a8126]/90 text-white">
                      Edit Deal
                    </Button>
                    <Button size="sm" variant="outline" className="w-full">
                      View Full Details
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        )}
      </ScrollArea>

      {/* Footer */}
      <div className={cn(
        "border-t border-sidebar-border",
        isCollapsed ? "p-2" : "p-4"
      )}>
        {/* Support */}
        <Link href="/support" onClick={handleLinkClick}>
          <Button
            variant="ghost"
            className={cn(
              "w-full",
              isCollapsed ? "justify-center px-0" : "justify-start px-3 gap-3"
            )}
          >
            <HelpCircle className="h-4 w-4 flex-shrink-0" />
            {!isCollapsed && <span>Help & Support</span>}
          </Button>
        </Link>

        {/* User Profile */}
        <div className="mt-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full h-auto",
                  isCollapsed ? "justify-center px-0 py-2" : "justify-between p-2"
                )}
              >
                <div className={cn(
                  "flex items-center",
                  isCollapsed ? "justify-center" : "gap-2"
                )}>
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src="/user.png" alt="User" />
                    <AvatarFallback>
                      <User2 className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  {!isCollapsed && (
                    <div className="flex flex-col items-start text-sm min-w-0 flex-1">
                      <div className="flex justify-between w-full">
                          <span className="flex font-medium text-sidebar-foreground truncate w-full">{userName}</span>
                      </div>
                      <span className="text-xs text-muted-foreground truncate w-full">{userEmail}</span>
                    </div>
                  )}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="top" className="w-64">
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
                onClick={() => showAlert("Hey there!", "Authentication and database integration coming in future releases of this project!")}
              >
                <span>Sign out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <DemoAlertComponent />
    </div>
  )
}