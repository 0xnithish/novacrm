"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, X, Plus } from "lucide-react"
import { useLeadDetails } from "@/hooks/useLeadDetails"
import { LeadDetailPanel } from "@/components/lead-detail/LeadDetailPanel"

export default function ClosedDealsPage() {
  const { openLeadDetails } = useLeadDetails()
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
      closedDate: "2024-09-15",
      leadOwner: "Mike Wilson",
      location: "Los Angeles, CA",
      referralPartner: "Sunset Realty",
      annualIncome: "$95,000",
      progressPercentage: 100,
      activities: [
        {
          id: "1",
          type: "Call",
          description: "Initial mortgage consultation",
          timestamp: "2024-09-10T14:30:00Z",
          status: "completed" as const
        },
        {
          id: "2",
          type: "Document",
          description: "Application submitted and approved",
          timestamp: "2024-09-12T11:15:00Z",
          status: "completed" as const
        },
        {
          id: "3",
          type: "Meeting",
          description: "Closing documents signed",
          timestamp: "2024-09-15T16:00:00Z",
          status: "completed" as const
        }
      ],
      notes: [
        {
          id: "1",
          title: "Deal Closed Successfully",
          content: "Great client, smooth process. Deal closed on time with all requirements met.",
          timestamp: "2024-09-15T17:00:00Z"
        }
      ]
    },
    {
      id: "102",
      title: "Auto Loan",
      clientName: "Maria Garcia",
      email: "maria.garcia@email.com",
      phone: "+1 (555) 222-3333",
      amount: "$25,000",
      closedDate: "2024-09-10",
      leadOwner: "AutoFin Direct",
      location: "Los Angeles, CA",
      referralPartner: "CarMax",
      annualIncome: "$65,000",
      progressPercentage: 100,
      activities: [
        {
          id: "1",
          type: "Call",
          description: "Auto loan application processed",
          timestamp: "2024-09-08T10:00:00Z",
          status: "completed" as const
        }
      ],
      notes: []
    },
    {
      id: "103",
      title: "Business Equipment",
      clientName: "Robert Chen",
      email: "robert.chen@email.com",
      phone: "+1 (555) 333-4444",
      amount: "$75,000",
      closedDate: "2024-09-08",
      leadOwner: "EquipFin Solutions",
      location: "San Jose, CA",
      referralPartner: "TechSupply Co",
      annualIncome: "$95,000",
      progressPercentage: 100,
      activities: [
        {
          id: "1",
          type: "Meeting",
          description: "Equipment financing approved",
          timestamp: "2024-09-05T14:00:00Z",
          status: "completed" as const
        }
      ],
      notes: []
    },
    {
      id: "104",
      title: "Home Equity Line",
      clientName: "Jennifer Lopez",
      email: "jennifer.lopez@email.com",
      phone: "+1 (555) 444-5555",
      amount: "$120,000",
      closedDate: "2024-09-05",
      leadOwner: "HomeEquity Plus",
      location: "Miami, FL",
      referralPartner: "RealtyMax",
      annualIncome: "$130,000",
      progressPercentage: 100,
      activities: [
        {
          id: "1",
          type: "Call",
          description: "Home equity line processed",
          timestamp: "2024-09-01T11:00:00Z",
          status: "completed" as const
        }
      ],
      notes: []
    },
    {
      id: "105",
      title: "Commercial Property",
      clientName: "Michael Thompson",
      email: "michael.thompson@email.com",
      phone: "+1 (555) 555-6666",
      amount: "$850,000",
      closedDate: "2024-09-01",
      leadOwner: "CommReal Estate",
      location: "Dallas, TX",
      referralPartner: "Business Properties",
      annualIncome: "$220,000",
      progressPercentage: 100,
      activities: [
        {
          id: "1",
          type: "Meeting",
          description: "Commercial property acquisition completed",
          timestamp: "2024-08-28T09:00:00Z",
          status: "completed" as const
        }
      ],
      notes: []
    },
    {
      id: "106",
      title: "Personal Loan",
      clientName: "Sarah Williams",
      email: "sarah.williams@email.com",
      phone: "+1 (555) 666-7777",
      amount: "$15,000",
      closedDate: "2024-08-28",
      leadOwner: "Personal Loan Co",
      location: "Atlanta, GA",
      referralPartner: "Credit Union",
      annualIncome: "$55,000",
      progressPercentage: 100,
      activities: [
        {
          id: "1",
          type: "Call",
          description: "Personal loan approved and disbursed",
          timestamp: "2024-08-25T13:00:00Z",
          status: "completed" as const
        }
      ],
      notes: []
    },
    {
      id: "107",
      title: "Construction Financing",
      clientName: "David Martinez",
      email: "david.martinez@email.com",
      phone: "+1 (555) 777-8888",
      amount: "$450,000",
      closedDate: "2024-08-25",
      leadOwner: "BuildFinance",
      location: "Phoenix, AZ",
      referralPartner: "ConstructCorp",
      annualIncome: "$140,000",
      progressPercentage: 100,
      activities: [
        {
          id: "1",
          type: "Meeting",
          description: "Construction project funding completed",
          timestamp: "2024-08-20T10:00:00Z",
          status: "completed" as const
        }
      ],
      notes: []
    },
    {
      id: "108",
      title: "Investment Property",
      clientName: "Lisa Brown",
      email: "lisa.brown@email.com",
      phone: "+1 (555) 888-9999",
      amount: "$625,000",
      closedDate: "2024-08-20",
      leadOwner: "InvestRealty",
      location: "Las Vegas, NV",
      referralPartner: "Property Investors",
      annualIncome: "$180,000",
      progressPercentage: 100,
      activities: [
        {
          id: "1",
          type: "Call",
          description: "Investment property purchase completed",
          timestamp: "2024-08-15T14:00:00Z",
          status: "completed" as const
        }
      ],
      notes: []
    },
    {
      id: "109",
      title: "Small Business Loan",
      clientName: "James Wilson",
      email: "james.wilson@email.com",
      phone: "+1 (555) 999-0000",
      amount: "$95,000",
      closedDate: "2024-08-15",
      leadOwner: "BizLoan Express",
      location: "Denver, CO",
      referralPartner: "Small Business Assoc",
      annualIncome: "$75,000",
      progressPercentage: 100,
      activities: [
        {
          id: "1",
          type: "Meeting",
          description: "Small business loan successfully processed",
          timestamp: "2024-08-10T11:00:00Z",
          status: "completed" as const
        }
      ],
      notes: []
    },
    {
      id: "110",
      title: "Medical Equipment",
      clientName: "Patricia Davis",
      email: "patricia.davis@email.com",
      phone: "+1 (555) 000-1111",
      amount: "$180,000",
      closedDate: "2024-08-10",
      leadOwner: "MedEquip Finance",
      location: "Boston, MA",
      referralPartner: "Medical Suppliers",
      annualIncome: "$120,000",
      progressPercentage: 100,
      activities: [
        {
          id: "1",
          type: "Call",
          description: "Medical equipment financing completed",
          timestamp: "2024-08-05T15:00:00Z",
          status: "completed" as const
        }
      ],
      notes: []
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
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Closed Deals  ({closedDeals.length})</h1>
          <p className="text-muted-foreground">
            Review your completed closed deals
          </p>
        </div>
        <Button
          className="w-full md:w-auto bg-gray-800 hover:bg-gray-900 text-white cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Closed Deal
        </Button>
      </div>

      {/* Closed Deals Table */}
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
                        onClick={() => openLeadDetails(deal)}
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
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-background text-foreground rounded-lg p-6 w-full max-w-md border border-border shadow-lg transition-colors">
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