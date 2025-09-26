"use client"

import { useState, type ChangeEvent, type FormEvent } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, X, Plus } from "lucide-react"
import { useLeadDetails } from "@/hooks/useLeadDetails"
import { LeadDetailPanel } from "@/components/lead-detail/LeadDetailPanel"

export default function ActiveDealsPage() {
  const { openLeadDetails } = useLeadDetails()
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
      amount: "$450,000",
      leadOwner: "Sarah Johnson",
      location: "New York, NY",
      referralPartner: "ABC Realty",
      annualIncome: "$125,000",
      progressPercentage: 76,
      activities: [
        {
          id: "1",
          type: "Call",
          description: "Initial consultation call",
          timestamp: "2024-09-25T10:30:00Z",
          status: "completed" as const
        },
        {
          id: "2",
          type: "Email",
          description: "Sent loan application documents",
          timestamp: "2024-09-24T14:15:00Z",
          status: "completed" as const
        },
        {
          id: "3",
          type: "Meeting",
          description: "Property viewing scheduled",
          timestamp: "2024-09-26T09:00:00Z",
          status: "in-progress" as const
        },
        {
          id: "4",
          type: "Document",
          description: "Income verification pending",
          timestamp: "2024-09-23T16:45:00Z",
          status: "new" as const
        }
      ],
      notes: [
        {
          id: "1",
          title: "Initial Consultation",
          content: "Client interested in property loan. Good credit score, stable income. Needs pre-approval.",
          timestamp: "2024-09-25T11:00:00Z"
        },
        {
          id: "2",
          title: "Document Requirements",
          content: "Requested pay stubs, tax returns, and bank statements for verification.",
          timestamp: "2024-09-24T15:30:00Z"
        }
      ]
    },
    {
      id: "124",
      title: "Business Expansion",
      clientName: "Jane Smith",
      email: "jane.smith@email.com",
      phone: "+1 (555) 234-5678",
      amount: "$280,000",
      leadOwner: "David Chen",
      location: "San Francisco, CA",
      referralPartner: "BizGrow Inc",
      annualIncome: "$200,000",
      progressPercentage: 45,
      activities: [
        {
          id: "1",
          type: "Call",
          description: "Business loan consultation",
          timestamp: "2024-09-24T10:00:00Z",
          status: "completed" as const
        },
        {
          id: "2",
          type: "Email",
          description: "Requested financial statements",
          timestamp: "2024-09-23T14:30:00Z",
          status: "in-progress" as const
        }
      ],
      notes: [
        {
          id: "1",
          title: "Business Loan Inquiry",
          content: "Client looking to expand operations. Strong business plan, needs $280k financing.",
          timestamp: "2024-09-24T11:00:00Z"
        }
      ]
    },
    {
      id: "125",
      title: "Vehicle Financing",
      clientName: "Mike Johnson",
      email: "mike.johnson@email.com",
      phone: "+1 (555) 345-6789",
      amount: "$85,000",
      leadOwner: "Emily Davis",
      location: "Chicago, IL",
      referralPartner: "AutoMart",
      annualIncome: "$75,000",
      progressPercentage: 60,
      activities: [
        {
          id: "1",
          type: "Call",
          description: "Vehicle loan inquiry",
          timestamp: "2024-09-22T11:00:00Z",
          status: "completed" as const
        }
      ],
      notes: []
    },
    {
      id: "126",
      title: "Home Renovation",
      clientName: "Sarah Wilson",
      email: "sarah.wilson@email.com",
      phone: "+1 (555) 456-7890",
      amount: "$120,000",
      leadOwner: "Michael Brown",
      location: "Austin, TX",
      referralPartner: "HomePlus",
      annualIncome: "$110,000",
      progressPercentage: 30,
      activities: [
        {
          id: "1",
          type: "Call",
          description: "Home improvement loan discussion",
          timestamp: "2024-09-21T14:00:00Z",
          status: "in-progress" as const
        }
      ],
      notes: []
    },
    {
      id: "127",
      title: "Investment Property",
      clientName: "David Brown",
      email: "david.brown@email.com",
      phone: "+1 (555) 567-8901",
      amount: "$650,000",
      leadOwner: "Lisa Anderson",
      location: "Miami, FL",
      referralPartner: "RealtyPro",
      annualIncome: "$180,000",
      progressPercentage: 85,
      activities: [
        {
          id: "1",
          type: "Meeting",
          description: "Property investment consultation",
          timestamp: "2024-09-20T10:00:00Z",
          status: "completed" as const
        }
      ],
      notes: []
    },
    {
      id: "128",
      title: "Commercial Real Estate",
      clientName: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "+1 (555) 678-9012",
      amount: "$1,200,000",
      leadOwner: "James Wilson",
      location: "Seattle, WA",
      referralPartner: "Commercial Properties Inc",
      annualIncome: "$250,000",
      progressPercentage: 70,
      activities: [
        {
          id: "1",
          type: "Meeting",
          description: "Commercial property consultation",
          timestamp: "2024-09-19T09:00:00Z",
          status: "completed" as const
        }
      ],
      notes: []
    },
    {
      id: "129",
      title: "Small Business Loan",
      clientName: "Robert Martinez",
      email: "robert.martinez@email.com",
      phone: "+1 (555) 789-0123",
      amount: "$150,000",
      leadOwner: "Jennifer Lee",
      location: "Denver, CO",
      referralPartner: "Small Biz Assoc",
      annualIncome: "$85,000",
      progressPercentage: 40,
      activities: [
        {
          id: "1",
          type: "Call",
          description: "Small business loan inquiry",
          timestamp: "2024-09-18T13:00:00Z",
          status: "in-progress" as const
        }
      ],
      notes: []
    },
    {
      id: "130",
      title: "Equipment Financing",
      clientName: "Lisa Anderson",
      email: "lisa.anderson@email.com",
      phone: "+1 (555) 890-1234",
      amount: "$95,000",
      leadOwner: "Robert Garcia",
      location: "Phoenix, AZ",
      referralPartner: "EquipSource",
      annualIncome: "$90,000",
      progressPercentage: 55,
      activities: [
        {
          id: "1",
          type: "Email",
          description: "Equipment financing request",
          timestamp: "2024-09-17T16:00:00Z",
          status: "completed" as const
        }
      ],
      notes: []
    },
    {
      id: "131",
      title: "Construction Project",
      clientName: "James Taylor",
      email: "james.taylor@email.com",
      phone: "+1 (555) 901-2345",
      amount: "$750,000",
      leadOwner: "Maria Rodriguez",
      location: "Portland, OR",
      referralPartner: "BuildRight",
      annualIncome: "$150,000",
      progressPercentage: 90,
      activities: [
        {
          id: "1",
          type: "Meeting",
          description: "Construction financing approved",
          timestamp: "2024-09-16T11:00:00Z",
          status: "completed" as const
        }
      ],
      notes: []
    },
    {
      id: "132",
      title: "Medical Practice Loan",
      clientName: "Patricia White",
      email: "patricia.white@email.com",
      phone: "+1 (555) 012-3456",
      amount: "$320,000",
      leadOwner: "Dr. John Smith",
      location: "Boston, MA",
      referralPartner: "MedFinance",
      annualIncome: "$200,000",
      progressPercentage: 65,
      activities: [
        {
          id: "1",
          type: "Call",
          description: "Medical practice financing consultation",
          timestamp: "2024-09-15T15:00:00Z",
          status: "in-progress" as const
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
    console.log('New deal:', formData)
    setIsModalOpen(false)
    setFormData({ clientName: '', email: '', phone: '', amount: '', title: '' })
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