"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { useCurrentPage } from "@/hooks/use-current-page"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { User, Settings, ChevronDown, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function LayoutHeader() {
  const { title } = useCurrentPage()
  const { theme, setTheme } = useTheme()

  return (
    <header className="flex items-center gap-3 border-b border-border bg-background/80 px-6 py-4 backdrop-blur">
      <SidebarTrigger className="size-8" />
      <h1 className="text-md font-semibold">{title}</h1>
      <div className="relative flex-1 max-w-sm">
        <Input
          placeholder="Search..."
          className="h-8"
        />
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
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}