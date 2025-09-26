"use client"

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
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
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
} from "lucide-react"

export function AppSidebar() {
  const { state } = useSidebar()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className=" border-sidebar-border">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-2">
            <img
              src="/logo.svg"
              alt="Logo"
              className="h-5 w-5 rounded-sm"
            />
            <span
              className={`text-lg font-semibold transition-all duration-200 ${
                state === "collapsed"
                  ? "opacity-0 w-0 translate-x-2 overflow-hidden"
                  : "opacity-100"
              }`}
            >
              Nova
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/" className="flex items-center gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Overview</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <SidebarMenuButton className="w-full justify-between">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4" />
                        <span>Deals</span>
                      </div>
                      <ChevronDown className="h-4 w-4" />
                    </SidebarMenuButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start">
                    <DropdownMenuItem>
                      <Building className="mr-2 h-4 w-4" />
                      <a href="/deals">All Deals</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CheckSquare className="mr-2 h-4 w-4" />
                      <a href="/deals/active">Active Deals</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <a href="/deals/won">Won Deals</a>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <a href="/deals/lost">Lost Deals</a>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/integration" className="flex items-center gap-2">
                    <Plug className="h-4 w-4" />
                    <span>Integration</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/tasks" className="flex items-center gap-2">
                    <CheckSquare className="h-4 w-4" />
                    <span>Tasks</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="/support" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Help & Support</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <Separator className="my-2" />
          </SidebarMenuItem>

          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full p-0 py-6 cursor-pointer hover:bg-accent">
                  <div className={`flex items-center w-full ${
                    state === "collapsed" 
                      ? "justify-center" 
                      : "justify-start gap-2 px-2"
                  }`}>
                    <Avatar className="h-7 w-7">
                      <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                      <AvatarFallback>
                        <User2 className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    {state !== "collapsed" && (
                      <>
                        <div className="flex flex-col items-start text-sm">
                          <span className="font-medium">John Doe</span>
                          <span className="text-xs text-muted-foreground">john@example.com</span>
                        </div>
                        <ChevronUp className="ml-auto h-4 w-4" />
                      </>
                    )}
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width] cursor-pointer"
              >
                <DropdownMenuItem className="cursor-pointer">
                  <User className="h-4 w-full justify-start" />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="h-4 w-full justify-start" />
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>  
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}