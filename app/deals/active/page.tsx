"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, DollarSign, X, Plus } from "lucide-react"

export default function ActiveDealsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    amount: '',
    title: ''
  })

  // Mock active deals data
  const activeDeals = [
    {
      id: "123",
      title: "Property Loan",
      clientName: "Ronald Richards",
      email: "ronald.richards@email.com",
      phone: "+1 (555) 123-4567",
      amount: "$450,000"
    },
    {
      id: "124",
      title: "Business Expansion",
      clientName: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+1 (555) 234-5678",
      amount: "$280,000"
    },
    {
      id: "125",
      title: "Vehicle Financing",
      clientName: "Mike Johnson",
      email: "mike.johnson@email.com",
      phone: "+1 (555) 345-6789",
      amount: "$85,000"
    },
    {
      id: "126",
      title: "Home Renovation",
      clientName: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      phone: "+1 (555) 456-7890",
      amount: "$120,000"
    },
    {
      id: "127",
      title: "Investment Property",
      clientName: "David Brown",
      email: "david.brown@email.com",
      phone: "+1 (555) 567-8901",
      amount: "$650,000"
    },
    {
      id: "128",
      title: "Commercial Real Estate",
      clientName: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "+1 (555) 678-9012",
      amount: "$1,200,000"
    },
    {
      id: "129",
      title: "Small Business Loan",
      clientName: "Robert Martinez",
      email: "robert.martinez@email.com",
      phone: "+1 (555) 789-0123",
      amount: "$150,000"
    },
    {
      id: "130",
      title: "Equipment Financing",
      clientName: "Lisa Anderson",
      email: "lisa.anderson@email.com",
      phone: "+1 (555) 890-1234",
      amount: "$95,000"
    },
    {
      id: "131",
      title: "Construction Project",
      clientName: "James Taylor",
      email: "james.taylor@email.com",
      phone: "+1 (555) 901-2345",
      amount: "$750,000"
    },
    {
      id: "132",
      title: "Medical Practice Loan",
      clientName: "Patricia White",
      email: "patricia.white@email.com",
      phone: "+1 (555) 012-3456",
      amount: "$320,000"
    }
  ]

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your API
    console.log('New deal:', formData)
    setIsModalOpen(false)
    setFormData({ clientName: '', email: '', phone: '', amount: '', title: '' })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Active Deals</h1>
          <p className="text-muted-foreground">
            Manage and track all your active deals
          </p>
        </div>
        <Button
          className="bg-gray-800 hover:bg-gray-900 text-white cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Deal
        </Button>
      </div>

      {/* Deals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Deals ({activeDeals.length})</CardTitle>
        </CardHeader>
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
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="font-medium">{deal.amount}</span>
                      </div>
                    </td>
                    <td className="p-3 font-medium">
                      {deal.title}
                    </td>
                    <td className="p-3">
                      <Button
                        size="sm"
                        className="bg-[#0a8126] hover:bg-[#0a8126]/90 text-white"
                      >
                        View Details
                      </Button>
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
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
                <Label htmlFor="clientName">Client Name</Label>
                <Input
                  id="clientName"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
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
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="title">Deal Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="amount">Amount</Label>
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
    </div>
  )
}