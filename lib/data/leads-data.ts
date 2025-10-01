import type { Lead } from '@/types'

// Mock data for all active deals
export const mockActiveDeals: Lead[] = [
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

// Mock data for all closed deals
export const mockClosedDeals: Lead[] = [
  {
    id: "101",
    title: "Residential Mortgage",
    clientName: "John Anderson",
    email: "john.anderson@email.com",
    phone: "+1 (555) 111-2222",
    amount: "$350,000",
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
  }
]

// Function to find a lead by ID across all deals
export function findLeadById(id: string): Lead | null {
  const allLeads = [...mockActiveDeals, ...mockClosedDeals]
  return allLeads.find(lead => lead.id === id) || null
}

// Function to get all leads
export function getAllLeads(): Lead[] {
  return [...mockActiveDeals, ...mockClosedDeals]
}