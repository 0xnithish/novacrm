"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { NotesCard } from '@/components/lead-detail/NotesCard'
import { ProgressCard } from '@/components/lead-detail/ProgressCard'
import { ActivitiesCard } from '@/components/lead-detail/ActivitiesCard'
import { findLeadById } from '@/lib/data/leads-data'
import type { Lead } from '@/types'
import {
  MessageCircle,
  Mail,
  Phone,
  MoreHorizontal,
  MapPin,
  Building,
  Users,
  DollarSign,
  ArrowLeft
} from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

interface LeadDetailPageProps {
  params: Promise<{ id: string }>
}

export default function LeadDetailPage({ params }: LeadDetailPageProps) {
  const [lead, setLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadLead = async () => {
      const { id } = await params
      const leadData = findLeadById(id)
      setLead(leadData)
      setLoading(false)
    }
    loadLead()
  }, [params])

  const handleAddNote = (note: { title: string; content: string }) => {
    // In a real app, this would update the backend
    console.log('Adding note:', note)
    // For now, we'll just log it since this is mock data
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p>Loading lead details...</p>
        </div>
      </div>
    )
  }

  if (!lead) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lead Not Found</h1>
          <p className="text-muted-foreground mb-4">The lead you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/deals/active">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Active Deals
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <Link href="/deals/active">
          <Button variant="ghost" className="mb-3">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Deals
          </Button>
        </Link>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder-avatar.jpg" alt={lead.clientName} />
              <AvatarFallback className="text-lg">
                {lead.clientName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{lead.clientName}</h1>
              <p className="text-sm text-muted-foreground">{lead.email}</p>
              <p className="text-sm text-muted-foreground">{lead.phone}</p>
            </div>
          </div>

          <div className="flex gap-1">
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4 mr-1" />
              Chat
            </Button>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-1" />
              Email
            </Button>
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-1" />
              Call
            </Button>
            <Button variant="outline" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Separator className="mb-6" />

      {/* Two Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Lead Information */}
          <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Building className="h-3 w-3" />
                <span>Lead owner</span>
              </div>
              <p className="font-medium text-sm">{lead.leadOwner}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>Location</span>
              </div>
              <p className="font-medium text-sm">{lead.location}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="h-3 w-3" />
                <span>Referral Partner</span>
              </div>
              <p className="font-medium text-sm">{lead.referralPartner}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <DollarSign className="h-3 w-3" />
                <span>Annual Income</span>
              </div>
              <p className="font-medium text-sm">{lead.annualIncome}</p>
            </div>
          </div>

          {/* Deal Information */}
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold mb-3">Deal Information</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Deal Title</p>
                <p className="font-medium text-sm">{lead.title}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Amount</p>
                <p className="font-medium text-sm text-green-600">{lead.amount}</p>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="p-4 border rounded-lg">
            <ProgressCard progressPercentage={lead.progressPercentage} />
          </div>

          {/* Activities Card */}
          <div className="p-4 border rounded-lg">
            <ActivitiesCard activities={lead.activities} />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Notes Card */}
          <div className="p-4 border rounded-lg">
            <NotesCard
              notes={lead.notes}
              onAddNote={handleAddNote}
            />
          </div>
        </div>
      </div>
    </div>
  )
}