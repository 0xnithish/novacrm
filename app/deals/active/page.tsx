"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, X, Plus, Trash2 } from "lucide-react"
import { useLeadDetails } from "@/hooks/useLeadDetails"
import { useDeals } from "@/hooks/useDeals"
import { LeadDetailPanel } from "@/components/lead-detail/LeadDetailPanel"

export default function ActiveDealsPage() {
  const { openLeadDetails } = useLeadDetails()
  const { activeDeals, addDeal, deleteDeal, isLoaded } = useDeals()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    amount: '',
    title: ''
  })
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    // Add the new deal to localStorage
    addDeal({
      ...formData,
      status: 'active',
      progressPercentage: 0,
      activities: [],
      notes: []
    })
    
    setIsModalOpen(false)
    setFormData({ clientName: '', email: '', phone: '', amount: '', title: '' })
  }

  if (!isLoaded) {
    return <div className="space-y-6">Loading...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Active Deals ({activeDeals.length})</h1>
          <p className="text-muted-foreground">
            Manage and track all your active deals
          </p>
        </div>
        <Button
          className="w-full md:w-auto bg-gray-800 hover:bg-gray-900 text-white cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Deal
        </Button>
      </div>

      {/* Deals Table */}
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Name</th>
                  <th className="text-left p-3 font-medium">Email</th>
                  <th className="text-left p-3 font-medium">Phone</th>
                  <th className="text-left p-3 font-medium">Amount</th>
                  <th className="text-left p-3 font-medium">Title</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activeDeals.map((deal) => (
                  <tr key={deal.id} className="border-b hover:bg-muted/50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {deal.clientName}
                      </div>
                    </td>
                    <td className="p-3 text-sm text-muted-foreground">
                      {deal.email}
                    </td>
                    <td className="p-3 text-sm text-muted-foreground">
                      {deal.phone}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-1">
                        <span className="font-medium">{deal.amount}</span>
                      </div>
                    </td>
                    <td className="p-3 font-medium">
                      {deal.title}
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          className="bg-[#0a8126] hover:bg-[#0a8126]/90 text-white"
                          onClick={() => openLeadDetails({
                            ...deal,
                            leadOwner: deal.leadOwner || 'N/A',
                            location: deal.location || 'N/A',
                            referralPartner: deal.referralPartner || 'N/A',
                            annualIncome: deal.annualIncome || 'N/A',
                            progressPercentage: deal.progressPercentage || 0,
                            activities: deal.activities || [],
                            notes: deal.notes || []
                          })}
                        >
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete the deal "${deal.title}" for ${deal.clientName}?`)) {
                              deleteDeal(deal.id)
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* New Deal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-background text-foreground rounded-lg p-6 w-full max-w-md border border-border shadow-lg transition-colors">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Add New Deal</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsModalOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="clientName" className="my-2">Client Name</Label>
                <Input
                  id="clientName"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="my-2">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="my-2">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="title" className="my-2">Deal Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="amount" className="my-2">Amount</Label>
                <Input
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="$0"
                  required
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#0a8126] hover:bg-[#0a8126]/90 text-white flex-1"
                >
                  Add Deal
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <LeadDetailPanel />
    </div>
  )
}