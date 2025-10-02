'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface Deal {
  id: string
  title: string
  clientName: string
  email: string
  phone: string
  amount: string
  closedDate?: string
}

interface DealDetailsContextType {
  selectedDeal: Deal | null
  setSelectedDeal: (deal: Deal | null) => void
  closeDealDetails: () => void
}

const DealDetailsContext = createContext<DealDetailsContextType | undefined>(undefined)

export function DealDetailsProvider({ children }: { children: ReactNode }) {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)

  const closeDealDetails = () => {
    setSelectedDeal(null)
  }

  return (
    <DealDetailsContext.Provider value={{ selectedDeal, setSelectedDeal, closeDealDetails }}>
      {children}
    </DealDetailsContext.Provider>
  )
}

export function useDealDetails() {
  const context = useContext(DealDetailsContext)
  if (context === undefined) {
    throw new Error('useDealDetails must be used within a DealDetailsProvider')
  }
  return context
}