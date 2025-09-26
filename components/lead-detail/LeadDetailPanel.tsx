'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { useLeadDetails } from '@/hooks/useLeadDetails'
import { NotesCard } from './NotesCard'
import { ProgressCard } from './ProgressCard'
import { ActivitiesCard } from './ActivitiesCard'
import {
  X,
  MessageCircle,
  Mail,
  Phone,
  MoreHorizontal,
  MapPin,
  Building,
  Users,
  DollarSign
} from 'lucide-react'
import { useRouter } from 'next/navigation'

export function LeadDetailPanel() {
  const { selectedLead, isLeadDetailOpen, closeLeadDetails, addNote } = useLeadDetails()
  const router = useRouter()

  if (!selectedLead) return null

  return (
    <Sheet open={isLeadDetailOpen} onOpenChange={closeLeadDetails}>
      <SheetContent
        side="right"
        className="w-[400px] sm:w-[540px] p-0 overflow-hidden [&>button[data-slot=sheet-close]]:hidden"
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between mb-4">
              <SheetTitle className="text-xl font-semibold">Lead Detail</SheetTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={closeLeadDetails}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4 cursor-pointer" />
              </Button>
            </div>
            <Button
              className="w-full bg-[#0a8126] hover:bg-[#0a8126]/90 text-white"
              onClick={() => {
                router.push(`/leads/${selectedLead.id}`)
                closeLeadDetails()
              }}
            >
              View Lead Details
            </Button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={selectedLead.clientName} />
                  <AvatarFallback className="text-lg">
                    {selectedLead.clientName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedLead.clientName}</h3>
                  <p className="text-sm text-muted-foreground">{selectedLead.email}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* Lead Data Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building className="h-4 w-4" />
                  <span>Lead owner</span>
                </div>
                <p className="font-medium text-sm">{selectedLead.leadOwner}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Location</span>
                </div>
                <p className="font-medium text-sm">{selectedLead.location}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>Referral Partner</span>
                </div>
                <p className="font-medium text-sm">{selectedLead.referralPartner}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>Annual Income</span>
                </div>
                <p className="font-medium text-sm">{selectedLead.annualIncome}</p>
              </div>
            </div>

            {/* Progress Card */}
            <ProgressCard progressPercentage={selectedLead.progressPercentage} />

            {/* Activities Card */}
            <ActivitiesCard activities={selectedLead.activities} />

            {/* Notes Card */}
            <NotesCard
              notes={selectedLead.notes}
              onAddNote={addNote}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}