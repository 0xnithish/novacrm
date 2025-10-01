'use client'

import { createContext, createElement, useContext, useState, ReactNode } from 'react'
import type { Activity, Note, Lead } from '@/types'

interface LeadDetailsContextType {
  selectedLead: Lead | null
  isLeadDetailOpen: boolean
  setSelectedLead: (lead: Lead | null) => void
  openLeadDetails: (lead: Lead) => void
  closeLeadDetails: () => void
  addNote: (note: Omit<Note, 'id' | 'timestamp'>) => void
}

const LeadDetailsContext = createContext<LeadDetailsContextType | undefined>(undefined)

export function LeadDetailsProvider({ children }: { children: ReactNode }) {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isLeadDetailOpen, setIsLeadDetailOpen] = useState(false)

  const openLeadDetails = (lead: Lead) => {
    setSelectedLead(lead)
    setIsLeadDetailOpen(true)
  }

  const closeLeadDetails = () => {
    setIsLeadDetailOpen(false)
    setTimeout(() => setSelectedLead(null), 300) // Wait for animation
  }

  const addNote = (noteData: Omit<Note, 'id' | 'timestamp'>) => {
    if (selectedLead) {
      const newNote: Note = {
        ...noteData,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      }

      setSelectedLead({
        ...selectedLead,
        notes: [newNote, ...selectedLead.notes]
      })
    }
  }

  const contextValue = {
    selectedLead,
    isLeadDetailOpen,
    setSelectedLead,
    openLeadDetails,
    closeLeadDetails,
    addNote
  }

  return createElement(LeadDetailsContext.Provider, { value: contextValue }, children)
}

export function useLeadDetails() {
  const context = useContext(LeadDetailsContext)
  if (context === undefined) {
    throw new Error('useLeadDetails must be used within a LeadDetailsProvider')
  }
  return context
}