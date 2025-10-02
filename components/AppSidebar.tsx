"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { useDealDetails } from "@/hooks/useDealDetails"
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
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
  ChevronUp,
  User,
  User2,
  X,
  Mail,
  Phone,
  DollarSign,
  Calendar,
} from "lucide-react"

export function AppSidebar() {
  const { selectedDeal, closeDealDetails } = useDealDetails()
  const { showAlert, DemoAlertComponent } = useDemoAlert()
  const pathname = usePathname()
  const isOnDealsRoute = pathname?.startsWith("/deals") ?? false
  const [isDealsOpen, setIsDealsOpen] = useState(isOnDealsRoute)
  const [userName, setUserName] = useState("John Doe")
  const [userEmail, setUserEmail] = useState("john@example.com")

  useEffect(() => {
    setIsDealsOpen(isOnDealsRoute)

    // Load user data from localStorage
    const savedProfile = localStorage.getItem('userProfile')
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile)
      const fullName = `${parsedProfile.firstName} ${parsedProfile.lastName}`
      setUserName(fullName)
      setUserEmail(parsedProfile.email)
    }
  }, [isOnDealsRoute])

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className=" border-sidebar-border">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Nova logo"
              width={20}
              height={20}
              className="rounded-sm"
              priority
            />
            <span className="text-lg font-semibold">Nova</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/" className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <SidebarMenuButton asChild className="flex-1">
                      <Link href="/deals" className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        <span>Deals</span>
                      </Link>
                    </SidebarMenuButton>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 hover:bg-accent"
                      onClick={() => setIsDealsOpen((prev) => !prev)}
                    >
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 transition-transform duration-200",
                          isDealsOpen ? "rotate-180" : "rotate-0"
                        )}
                      />
                    </Button>
                  </div>

                  {isDealsOpen && (
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === "/deals/active"}
                        >
                          <Link href="/deals/active">
                            <CheckSquare className="h-4 w-4" />
                            <span>Active</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === "/deals/closed"}
                        >
                          <Link href="/deals/closed">
                            <Settings className="h-4 w-4" />
                            <span>Closed</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  )}
                </div>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/integration" className="flex items-center gap-2">
                    <Plug className="h-4 w-4" />
                    <span>Integration</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/tasks" className="flex items-center gap-2">
                    <CheckSquare className="h-4 w-4" />
                    <span>Tasks</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Deal Details Section */}
        {selectedDeal && (
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center justify-between">
              <span>Deal Details</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeDealDetails}
                className="h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4 p-2">
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
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              {/* <Link href="/settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link> */}
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/support" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Help & Support</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Separator className="my-2" />
          </SidebarMenuItem>

          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full cursor-pointer p-0 py-6 hover:bg-accent">
                  <div className="flex w-full items-center justify-start gap-2 px-2">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src="/user.png" alt="User" />
                      <AvatarFallback>
                        <User2 className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col items-start text-sm">
                      <span className="font-medium">{userName}</span>
                      <span className="text-xs text-muted-foreground">{userEmail}</span>
                    </div>
                    <ChevronUp className="ml-auto h-4 w-4" />
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width] cursor-pointer"
              >
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link href="/account">
                    <User className="h-4 w-full justify-start" />
                    <span>Account</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" asChild>
                  <Link href="/settings">
                    <Settings className="h-4 w-full justify-start" />
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
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <DemoAlertComponent />
    </Sidebar>
  )
}