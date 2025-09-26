'use client'

import { createContext, createElement, useContext, useState, ReactNode } from 'react'

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

  const contextValue = {
    selectedDeal,
    setSelectedDeal,
    closeDealDetails
  }

  return createElement(DealDetailsContext.Provider, { value: contextValue }, children)
}

export function useDealDetails() {
  const context = useContext(DealDetailsContext)
  if (context === undefined) {
    throw new Error('useDealDetails must be used within a DealDetailsProvider')
  }
  return context
}