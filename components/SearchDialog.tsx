"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Mail, Phone, User } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { DialogTitle } from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { mockLeads } from "@/lib/data/mock-data"
import { cn } from "@/lib/utils"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Pure function moved outside component for better performance
function getStatusColor(status: string): string {
  switch (status) {
    case "new":
      return "bg-blue-500/10 text-blue-500"
    case "qualified":
      return "bg-purple-500/10 text-purple-500"
    case "in progress":
      return "bg-yellow-500/10 text-yellow-500"
    case "closed":
      return "bg-green-500/10 text-green-500"
    default:
      return "bg-gray-500/10 text-gray-500"
  }
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  // Custom filtering for better search results
  const filteredLeads = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()
    
    // Show all leads if no query
    if (!query) return mockLeads

    // For short queries (< 3 chars), use exact substring matching
    // This prevents fuzzy matches like "22" matching random phone digits
    if (query.length < 3) {
      return mockLeads.filter((lead) => {
        const searchableText = `${lead.name} ${lead.email} ${lead.contact}`.toLowerCase()
        return searchableText.includes(query)
      })
    }

    // For longer queries, still use substring matching but it's more forgiving
    return mockLeads.filter((lead) => {
      return (
        lead.name.toLowerCase().includes(query) ||
        lead.email.toLowerCase().includes(query) ||
        lead.contact.toLowerCase().includes(query)
      )
    })
  }, [searchQuery])

  const handleLeadClick = (leadId: string) => {
    router.push(`/leads/${leadId}`)
    onOpenChange(false)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange} shouldFilter={false}>
      <DialogTitle className="sr-only">Search Leads</DialogTitle>
      <CommandInput 
        placeholder="Search by name, email, or phone..." 
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <CommandList>
        <CommandEmpty>No leads found.</CommandEmpty>
        <CommandGroup heading="Leads">
          {filteredLeads.map((lead) => (
            <CommandItem
              key={lead.id}
              value={lead.id}
              onSelect={() => handleLeadClick(lead.id)}
              className="flex items-center gap-3 px-3 py-3"
            >
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarImage src={lead.avatar} alt={lead.name} />
                <AvatarFallback>
                  <User className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-sm truncate">{lead.name}</h3>
                  <Badge
                    variant="secondary"
                    className={cn("capitalize flex-shrink-0 text-xs", getStatusColor(lead.status))}
                  >
                    {lead.status}
                  </Badge>
                </div>

                <div className="flex flex-col gap-0.5">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{lead.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Phone className="h-3 w-3 flex-shrink-0" />
                    <span className="truncate">{lead.contact}</span>
                  </div>
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}
