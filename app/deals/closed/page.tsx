"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, DollarSign, X, Plus } from "lucide-react"

export default function ClosedDealsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    amount: '',
    title: ''
  })

  // Mock closed deals data
  const closedDeals = [
    {
      id: "101",
      title: "Residential Mortgage",
      clientName: "John Anderson",
      email: "john.anderson@email.com",
      phone: "+1 (555) 111-2222",
      amount: "$350,000",
      closedDate: "2024-09-15"
    },
    {
      id: "102",
      title: "Auto Loan",
      clientName: "Maria Garcia",
      email: "maria.garcia@email.com",
      phone: "+1 (555) 222-3333",
      amount: "$25,000",
      closedDate: "2024-09-10"
    },
    {
      id: "103",
      title: "Business Equipment",
      clientName: "Robert Chen",
      email: "robert.chen@email.com",
      phone: "+1 (555) 333-4444",
      amount: "$75,000",
      closedDate: "2024-09-08"
    },
    {
      id: "104",
      title: "Home Equity Line",
      clientName: "Jennifer Lopez",
      email: "jennifer.lopez@email.com",
      phone: "+1 (555) 444-5555",
      amount: "$120,000",
      closedDate: "2024-09-05"
    },
    {
      id: "105",
      title: "Commercial Property",
      clientName: "Michael Thompson",
      email: "michael.thompson@email.com",
      phone: "+1 (555) 555-6666",
      amount: "$850,000",
      closedDate: "2024-09-01"
    },
    {
      id: "106",
      title: "Personal Loan",
      clientName: "Sarah Williams",
      email: "sarah.williams@email.com",
      phone: "+1 (555) 666-7777",
      amount: "$15,000",
      closedDate: "2024-08-28"
    },
    {
      id: "107",
      title: "Construction Financing",
      clientName: "David Martinez",
      email: "david.martinez@email.com",
      phone: "+1 (555) 777-8888",
      amount: "$450,000",
      closedDate: "2024-08-25"
    },
    {
      id: "108",
      title: "Investment Property",
      clientName: "Lisa Brown",
      email: "lisa.brown@email.com",
      phone: "+1 (555) 888-9999",
      amount: "$625,000",
      closedDate: "2024-08-20"
    },
    {
      id: "109",
      title: "Small Business Loan",
      clientName: "James Wilson",
      email: "james.wilson@email.com",
      phone: "+1 (555) 999-0000",
      amount: "$95,000",
      closedDate: "2024-08-15"
    },
    {
      id: "110",
      title: "Medical Equipment",
      clientName: "Patricia Davis",
      email: "patricia.davis@email.com",
      phone: "+1 (555) 000-1111",
      amount: "$180,000",
      closedDate: "2024-08-10"
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
    console.log('New closed deal:', formData)
    setIsModalOpen(false)
    setFormData({ clientName: '', email: '', phone: '', amount: '', title: '' })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Closed Deals</h1>
          <p className="text-muted-foreground">
            Review all your completed and closed deals
          </p>
        </div>
        <Button
          className="bg-gray-800 hover:bg-gray-900 text-white cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Closed Deal
        </Button>
      </div>

      {/* Closed Deals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Closed Deals ({closedDeals.length})</CardTitle>
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
                  <th className="text-left p-3 font-medium">Closed Date</th>
                  <th className="text-left p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {closedDeals.map((deal) => (
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
                    <td className="p-3 text-sm text-muted-foreground">
                      {deal.closedDate}
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

      {/* Add Closed Deal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Add Closed Deal</h2>
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