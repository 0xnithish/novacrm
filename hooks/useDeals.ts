import { useState, useEffect } from 'react'

export interface Deal {
  id: string
  title: string
  clientName: string
  email: string
  phone: string
  amount: string
  leadOwner?: string
  location?: string
  referralPartner?: string
  annualIncome?: string
  progressPercentage?: number
  closedDate?: string
  status: 'active' | 'closed'
  activities?: Array<{
    id: string
    type: string
    description: string
    timestamp: string
    status: 'completed' | 'in-progress' | 'new'
  }>
  notes?: Array<{
    id: string
    title: string
    content: string
    timestamp: string
  }>
}

const STORAGE_KEY = 'crm_deals'

// Default mock data
const defaultDeals: Deal[] = [
  // Active deals
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
    status: 'active',
    activities: [
      {
        id: "1",
        type: "Call",
        description: "Initial consultation call",
        timestamp: "2024-09-25T10:30:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Email",
        description: "Sent loan application documents",
        timestamp: "2024-09-24T14:15:00Z",
        status: "completed"
      },
      {
        id: "3",
        type: "Meeting",
        description: "Property viewing scheduled",
        timestamp: "2024-09-26T09:00:00Z",
        status: "in-progress"
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
        title: "Follow-up",
        content: "Client requested faster processing. Escalated to senior loan officer.",
        timestamp: "2024-09-26T14:30:00Z"
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
    status: 'active',
    activities: [
      {
        id: "1",
        type: "Call",
        description: "Business loan consultation",
        timestamp: "2024-09-24T10:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Email",
        description: "Requested financial statements",
        timestamp: "2024-09-23T14:30:00Z",
        status: "in-progress"
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
    status: 'active',
    activities: [
      {
        id: "1",
        type: "Call",
        description: "Vehicle loan inquiry",
        timestamp: "2024-09-22T11:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Document",
        description: "Credit check approved",
        timestamp: "2024-09-23T09:30:00Z",
        status: "completed"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Vehicle Details",
        content: "Client interested in luxury SUV. Pre-approved for $85k at 4.5% APR.",
        timestamp: "2024-09-22T12:00:00Z"
      }
    ]
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
    status: 'active',
    activities: [
      {
        id: "1",
        type: "Call",
        description: "Home improvement loan discussion",
        timestamp: "2024-09-21T14:00:00Z",
        status: "in-progress"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Renovation Plans",
        content: "Kitchen and bathroom remodel. Contractor quotes received.",
        timestamp: "2024-09-21T15:00:00Z"
      }
    ]
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
    status: 'active',
    activities: [
      {
        id: "1",
        type: "Meeting",
        description: "Property investment consultation",
        timestamp: "2024-09-20T10:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Document",
        description: "Final paperwork review",
        timestamp: "2024-09-25T16:00:00Z",
        status: "in-progress"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Investment Strategy",
        content: "Client has experience with rental properties. Looking for 4-unit building.",
        timestamp: "2024-09-20T11:30:00Z"
      }
    ]
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
    status: 'active',
    activities: [
      {
        id: "1",
        type: "Meeting",
        description: "Commercial property consultation",
        timestamp: "2024-09-19T09:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Email",
        description: "Due diligence documents sent",
        timestamp: "2024-09-24T10:00:00Z",
        status: "completed"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Office Building Purchase",
        content: "10,000 sq ft office space. Appraisal completed at $1.2M.",
        timestamp: "2024-09-19T10:30:00Z"
      }
    ]
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
    status: 'active',
    activities: [
      {
        id: "1",
        type: "Call",
        description: "Small business loan inquiry",
        timestamp: "2024-09-18T13:00:00Z",
        status: "in-progress"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Restaurant Expansion",
        content: "Successful restaurant owner looking to open second location.",
        timestamp: "2024-09-18T14:00:00Z"
      }
    ]
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
    status: 'active',
    activities: [
      {
        id: "1",
        type: "Email",
        description: "Equipment financing request",
        timestamp: "2024-09-17T16:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Call",
        description: "Equipment specifications review",
        timestamp: "2024-09-19T11:00:00Z",
        status: "completed"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Manufacturing Equipment",
        content: "CNC machines for metal fabrication shop. Quote verified.",
        timestamp: "2024-09-17T17:00:00Z"
      }
    ]
  },
  {
    id: "131",
    title: "Startup Business Loan",
    clientName: "Kevin Thompson",
    email: "kevin.thompson@email.com",
    phone: "+1 (555) 321-4567",
    amount: "$200,000",
    leadOwner: "Amanda White",
    location: "San Diego, CA",
    referralPartner: "Startup Accelerator",
    annualIncome: "$95,000",
    progressPercentage: 35,
    status: 'active',
    activities: [
      {
        id: "1",
        type: "Meeting",
        description: "Tech startup funding discussion",
        timestamp: "2024-09-16T14:00:00Z",
        status: "in-progress"
      }
    ],
    notes: [
      {
        id: "1",
        title: "SaaS Startup",
        content: "Software as a Service platform. Looking for seed funding.",
        timestamp: "2024-09-16T15:00:00Z"
      }
    ]
  },
  {
    id: "132",
    title: "Luxury Home Purchase",
    clientName: "Diana Prince",
    email: "diana.prince@email.com",
    phone: "+1 (555) 654-9870",
    amount: "$2,500,000",
    leadOwner: "Thomas Anderson",
    location: "Beverly Hills, CA",
    referralPartner: "Elite Properties",
    annualIncome: "$400,000",
    progressPercentage: 80,
    status: 'active',
    activities: [
      {
        id: "1",
        type: "Meeting",
        description: "Property showing and appraisal",
        timestamp: "2024-09-15T10:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Document",
        description: "Financial pre-approval completed",
        timestamp: "2024-09-20T14:00:00Z",
        status: "completed"
      }
    ],
    notes: [
      {
        id: "1",
        title: "High Net Worth Client",
        content: "Excellent credit profile. Cash reserves substantial.",
        timestamp: "2024-09-15T11:00:00Z"
      }
    ]
  },
  {
    id: "133",
    title: "Agricultural Equipment",
    clientName: "Tom Baker",
    email: "tom.baker@email.com",
    phone: "+1 (555) 789-4561",
    amount: "$325,000",
    leadOwner: "Rachel Green",
    location: "Des Moines, IA",
    referralPartner: "Farm Equipment Co",
    annualIncome: "$150,000",
    progressPercentage: 50,
    status: 'active',
    activities: [
      {
        id: "1",
        type: "Call",
        description: "Farm equipment financing inquiry",
        timestamp: "2024-09-14T09:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Email",
        description: "Equipment specifications and quotes sent",
        timestamp: "2024-09-18T11:00:00Z",
        status: "in-progress"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Farming Equipment",
        content: "Tractors and harvesting equipment for 500-acre farm.",
        timestamp: "2024-09-14T10:00:00Z"
      }
    ]
  },
  {
    id: "134",
    title: "Wedding Planning Business",
    clientName: "Monica Geller",
    email: "monica.geller@email.com",
    phone: "+1 (555) 147-2589",
    amount: "$65,000",
    leadOwner: "Chandler Bing",
    location: "Nashville, TN",
    referralPartner: "Event Planners Network",
    annualIncome: "$70,000",
    progressPercentage: 25,
    status: 'active',
    activities: [
      {
        id: "1",
        type: "Call",
        description: "Business loan consultation",
        timestamp: "2024-09-13T15:00:00Z",
        status: "new"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Service Business",
        content: "Established wedding planner expanding services.",
        timestamp: "2024-09-13T16:00:00Z"
      }
    ]
  },
  {
    id: "135",
    title: "Warehouse Purchase",
    clientName: "Bruce Wayne",
    email: "bruce.wayne@email.com",
    phone: "+1 (555) 963-8520",
    amount: "$1,800,000",
    leadOwner: "Alfred Pennyworth",
    location: "Gotham City, NJ",
    referralPartner: "Industrial Realty",
    annualIncome: "$300,000",
    progressPercentage: 65,
    status: 'active',
    activities: [
      {
        id: "1",
        type: "Meeting",
        description: "Warehouse inspection completed",
        timestamp: "2024-09-12T10:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Document",
        description: "Environmental assessment in progress",
        timestamp: "2024-09-19T09:00:00Z",
        status: "in-progress"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Industrial Property",
        content: "50,000 sq ft warehouse with loading docks. Zoning approved.",
        timestamp: "2024-09-12T11:00:00Z"
      }
    ]
  },
  {
    id: "136",
    title: "Franchise Opportunity",
    clientName: "Peter Parker",
    email: "peter.parker@email.com",
    phone: "+1 (555) 753-9514",
    amount: "$180,000",
    leadOwner: "Mary Jane",
    location: "Queens, NY",
    referralPartner: "Franchise Network",
    annualIncome: "$88,000",
    progressPercentage: 42,
    status: 'active',
    activities: [
      {
        id: "1",
        type: "Call",
        description: "Franchise financing discussion",
        timestamp: "2024-09-11T13:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Email",
        description: "Franchise disclosure documents reviewed",
        timestamp: "2024-09-17T10:00:00Z",
        status: "in-progress"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Fast Food Franchise",
        content: "Well-known brand. Excellent location identified.",
        timestamp: "2024-09-11T14:00:00Z"
      }
    ]
  },
  {
    id: "137",
    title: "Vacation Rental Property",
    clientName: "Tony Stark",
    email: "tony.stark@email.com",
    phone: "+1 (555) 159-7530",
    amount: "$950,000",
    leadOwner: "Pepper Potts",
    location: "Malibu, CA",
    referralPartner: "Coastal Realty",
    annualIncome: "$500,000",
    progressPercentage: 72,
    status: 'active',
    activities: [
      {
        id: "1",
        type: "Meeting",
        description: "Beachfront property viewing",
        timestamp: "2024-09-10T11:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Document",
        description: "Rental income analysis completed",
        timestamp: "2024-09-18T15:00:00Z",
        status: "completed"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Investment Property",
        content: "Prime beachfront. High rental demand in area.",
        timestamp: "2024-09-10T12:00:00Z"
      }
    ]
  },
  {
    id: "138",
    title: "Gym Equipment Financing",
    clientName: "Steve Rogers",
    email: "steve.rogers@email.com",
    phone: "+1 (555) 246-1357",
    amount: "$140,000",
    leadOwner: "Natasha Romanoff",
    location: "Brooklyn, NY",
    referralPartner: "Fitness Solutions",
    annualIncome: "$95,000",
    progressPercentage: 55,
    status: 'active',
    activities: [
      {
        id: "1",
        type: "Call",
        description: "Gym expansion financing",
        timestamp: "2024-09-09T14:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Meeting",
        description: "Equipment vendor quotes review",
        timestamp: "2024-09-16T10:00:00Z",
        status: "in-progress"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Fitness Center Expansion",
        content: "Adding CrossFit and yoga studios. Member base growing.",
        timestamp: "2024-09-09T15:00:00Z"
      }
    ]
  },
  {
    id: "139",
    title: "Food Truck Business",
    clientName: "Gordon Ramsay",
    email: "gordon.ramsay@email.com",
    phone: "+1 (555) 852-9631",
    amount: "$55,000",
    leadOwner: "Jamie Oliver",
    location: "Portland, OR",
    referralPartner: "Street Food Network",
    annualIncome: "$65,000",
    progressPercentage: 38,
    status: 'active',
    activities: [
      {
        id: "1",
        type: "Call",
        description: "Mobile food business financing",
        timestamp: "2024-09-08T12:00:00Z",
        status: "in-progress"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Gourmet Food Truck",
        content: "High-end cuisine truck. Great reviews at food festivals.",
        timestamp: "2024-09-08T13:00:00Z"
      }
    ]
  },
  {
    id: "140",
    title: "Dental Practice Acquisition",
    clientName: "Dr. Sarah Connor",
    email: "sarah.connor@email.com",
    phone: "+1 (555) 741-8520",
    amount: "$780,000",
    leadOwner: "Kyle Reese",
    location: "Charlotte, NC",
    referralPartner: "Medical Practice Brokers",
    annualIncome: "$220,000",
    progressPercentage: 68,
    status: 'active',
    activities: [
      {
        id: "1",
        type: "Meeting",
        description: "Practice valuation review",
        timestamp: "2024-09-07T09:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Document",
        description: "Financial records analysis",
        timestamp: "2024-09-15T11:00:00Z",
        status: "completed"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Established Practice",
        content: "25-year established practice. Strong patient base.",
        timestamp: "2024-09-07T10:00:00Z"
      }
    ]
  },
  // Closed deals
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
    status: 'closed',
    activities: [
      {
        id: "1",
        type: "Call",
        description: "Initial mortgage consultation",
        timestamp: "2024-09-10T14:30:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Document",
        description: "Application submitted and approved",
        timestamp: "2024-09-12T11:15:00Z",
        status: "completed"
      },
      {
        id: "3",
        type: "Meeting",
        description: "Closing documents signed",
        timestamp: "2024-09-15T16:00:00Z",
        status: "completed"
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
    status: 'closed',
    activities: [
      {
        id: "1",
        type: "Call",
        description: "Auto loan application processed",
        timestamp: "2024-09-08T10:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Document",
        description: "Loan approved and funded",
        timestamp: "2024-09-10T14:00:00Z",
        status: "completed"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Quick Approval",
        content: "Excellent credit score. Approved within 24 hours.",
        timestamp: "2024-09-09T09:00:00Z"
      }
    ]
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
    status: 'closed',
    activities: [
      {
        id: "1",
        type: "Meeting",
        description: "Equipment financing approved",
        timestamp: "2024-09-05T14:00:00Z",
        status: "completed"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Tech Startup Equipment",
        content: "Purchased servers and networking equipment. Fast turnaround.",
        timestamp: "2024-09-05T15:30:00Z"
      }
    ]
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
    status: 'closed',
    activities: [
      {
        id: "1",
        type: "Call",
        description: "Home equity line processed",
        timestamp: "2024-09-01T11:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Document",
        description: "Appraisal completed",
        timestamp: "2024-09-03T10:00:00Z",
        status: "completed"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Home Improvement Project",
        content: "HELOC for home renovations. Property value supports requested amount.",
        timestamp: "2024-09-01T12:00:00Z"
      }
    ]
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
    status: 'closed',
    activities: [
      {
        id: "1",
        type: "Meeting",
        description: "Commercial property acquisition completed",
        timestamp: "2024-08-28T09:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Document",
        description: "Title transfer completed",
        timestamp: "2024-09-01T15:00:00Z",
        status: "completed"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Retail Space Purchase",
        content: "Prime location retail space. Strong tenant history.",
        timestamp: "2024-08-28T10:00:00Z"
      }
    ]
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
    status: 'closed',
    activities: [
      {
        id: "1",
        type: "Call",
        description: "Personal loan approved and disbursed",
        timestamp: "2024-08-25T13:00:00Z",
        status: "completed"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Debt Consolidation",
        content: "Used for consolidating credit card debt. Improved credit profile.",
        timestamp: "2024-08-25T14:00:00Z"
      }
    ]
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
    status: 'closed',
    activities: [
      {
        id: "1",
        type: "Meeting",
        description: "Construction project funding completed",
        timestamp: "2024-08-20T10:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Document",
        description: "Building permits verified",
        timestamp: "2024-08-22T14:00:00Z",
        status: "completed"
      }
    ],
    notes: [
      {
        id: "1",
        title: "New Home Construction",
        content: "Custom home build. Construction timeline: 9 months.",
        timestamp: "2024-08-20T11:00:00Z"
      }
    ]
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
    status: 'closed',
    activities: [
      {
        id: "1",
        type: "Call",
        description: "Investment property purchase completed",
        timestamp: "2024-08-15T14:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Meeting",
        description: "Final walkthrough and inspection",
        timestamp: "2024-08-19T10:00:00Z",
        status: "completed"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Multi-family Investment",
        content: "6-unit apartment building. Excellent cash flow potential.",
        timestamp: "2024-08-15T15:00:00Z"
      }
    ]
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
    status: 'closed',
    activities: [
      {
        id: "1",
        type: "Meeting",
        description: "Small business loan successfully processed",
        timestamp: "2024-08-10T11:00:00Z",
        status: "completed"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Bakery Expansion",
        content: "Successful local bakery opening second location.",
        timestamp: "2024-08-10T12:00:00Z"
      }
    ]
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
    status: 'closed',
    activities: [
      {
        id: "1",
        type: "Call",
        description: "Medical equipment financing completed",
        timestamp: "2024-08-05T15:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Document",
        description: "Equipment delivery scheduled",
        timestamp: "2024-08-08T09:00:00Z",
        status: "completed"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Dental Practice Equipment",
        content: "State-of-the-art dental equipment for new practice.",
        timestamp: "2024-08-05T16:00:00Z"
      }
    ]
  },
  {
    id: "111",
    title: "Apartment Complex",
    clientName: "Clark Kent",
    email: "clark.kent@email.com",
    phone: "+1 (555) 111-3333",
    amount: "$3,200,000",
    closedDate: "2024-08-08",
    leadOwner: "Lois Lane",
    location: "Metropolis, IL",
    referralPartner: "Metro Realty",
    annualIncome: "$350,000",
    progressPercentage: 100,
    status: 'closed',
    activities: [
      {
        id: "1",
        type: "Meeting",
        description: "Multi-family property acquisition",
        timestamp: "2024-08-01T10:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Document",
        description: "Closing completed successfully",
        timestamp: "2024-08-08T16:00:00Z",
        status: "completed"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Large Investment",
        content: "24-unit apartment complex. Excellent rental history.",
        timestamp: "2024-08-08T17:00:00Z"
      }
    ]
  },
  {
    id: "112",
    title: "Restaurant Equipment",
    clientName: "Julia Child",
    email: "julia.child@email.com",
    phone: "+1 (555) 222-4444",
    amount: "$85,000",
    closedDate: "2024-08-05",
    leadOwner: "Anthony Bourdain",
    location: "New Orleans, LA",
    referralPartner: "Restaurant Supply Co",
    annualIncome: "$100,000",
    progressPercentage: 100,
    status: 'closed',
    activities: [
      {
        id: "1",
        type: "Call",
        description: "Kitchen equipment financing",
        timestamp: "2024-07-30T14:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Document",
        description: "Equipment purchased and installed",
        timestamp: "2024-08-05T11:00:00Z",
        status: "completed"
      }
    ],
    notes: [
      {
        id: "1",
        title: "High-End Restaurant",
        content: "Commercial kitchen equipment for fine dining establishment.",
        timestamp: "2024-08-05T12:00:00Z"
      }
    ]
  },
  {
    id: "113",
    title: "Veterinary Clinic",
    clientName: "Dr. Dolittle",
    email: "dr.dolittle@email.com",
    phone: "+1 (555) 333-5555",
    amount: "$420,000",
    closedDate: "2024-08-02",
    leadOwner: "Jane Goodall",
    location: "San Antonio, TX",
    referralPartner: "Medical Practice Brokers",
    annualIncome: "$160,000",
    progressPercentage: 100,
    status: 'closed',
    activities: [
      {
        id: "1",
        type: "Meeting",
        description: "Veterinary practice acquisition",
        timestamp: "2024-07-28T09:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Document",
        description: "Practice transfer completed",
        timestamp: "2024-08-02T15:00:00Z",
        status: "completed"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Established Veterinary Practice",
        content: "15 years in business. Loyal client base.",
        timestamp: "2024-08-02T16:00:00Z"
      }
    ]
  },
  {
    id: "114",
    title: "Solar Panel Installation",
    clientName: "Elon Musk",
    email: "elon.musk@email.com",
    phone: "+1 (555) 444-6666",
    amount: "$95,000",
    closedDate: "2024-07-30",
    leadOwner: "Nikola Tesla",
    location: "Palo Alto, CA",
    referralPartner: "Solar Solutions",
    annualIncome: "$280,000",
    progressPercentage: 100,
    status: 'closed',
    activities: [
      {
        id: "1",
        type: "Call",
        description: "Renewable energy financing",
        timestamp: "2024-07-25T13:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Document",
        description: "Installation completed",
        timestamp: "2024-07-30T10:00:00Z",
        status: "completed"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Green Energy Investment",
        content: "Residential solar system. 20kW capacity.",
        timestamp: "2024-07-30T11:00:00Z"
      }
    ]
  },
  {
    id: "115",
    title: "Coffee Shop Chain",
    clientName: "Howard Schultz",
    email: "howard.schultz@email.com",
    phone: "+1 (555) 555-7777",
    amount: "$540,000",
    closedDate: "2024-07-28",
    leadOwner: "Starbuck Manager",
    location: "Seattle, WA",
    referralPartner: "Retail Franchise",
    annualIncome: "$175,000",
    progressPercentage: 100,
    status: 'closed',
    activities: [
      {
        id: "1",
        type: "Meeting",
        description: "Multi-location coffee shop financing",
        timestamp: "2024-07-20T11:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Document",
        description: "All three locations funded",
        timestamp: "2024-07-28T14:00:00Z",
        status: "completed"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Coffee Chain Expansion",
        content: "Opening three new locations simultaneously.",
        timestamp: "2024-07-28T15:00:00Z"
      }
    ]
  },
  {
    id: "116",
    title: "Yacht Purchase",
    clientName: "Jay Gatsby",
    email: "jay.gatsby@email.com",
    phone: "+1 (555) 666-8888",
    amount: "$1,450,000",
    closedDate: "2024-07-25",
    leadOwner: "Nick Carraway",
    location: "Miami, FL",
    referralPartner: "Luxury Marine",
    annualIncome: "$600,000",
    progressPercentage: 100,
    status: 'closed',
    activities: [
      {
        id: "1",
        type: "Meeting",
        description: "Luxury yacht financing",
        timestamp: "2024-07-18T10:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Document",
        description: "Yacht purchased and registered",
        timestamp: "2024-07-25T16:00:00Z",
        status: "completed"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Luxury Asset Purchase",
        content: "65-foot yacht. Excellent condition.",
        timestamp: "2024-07-25T17:00:00Z"
      }
    ]
  },
  {
    id: "117",
    title: "Law Firm Expansion",
    clientName: "Harvey Specter",
    email: "harvey.specter@email.com",
    phone: "+1 (555) 777-9999",
    amount: "$380,000",
    closedDate: "2024-07-22",
    leadOwner: "Louis Litt",
    location: "New York, NY",
    referralPartner: "Professional Services",
    annualIncome: "$450,000",
    progressPercentage: 100,
    status: 'closed',
    activities: [
      {
        id: "1",
        type: "Meeting",
        description: "Office expansion financing",
        timestamp: "2024-07-15T14:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Document",
        description: "Lease signed and funded",
        timestamp: "2024-07-22T11:00:00Z",
        status: "completed"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Premium Office Space",
        content: "Manhattan office space. Corner office with view.",
        timestamp: "2024-07-22T12:00:00Z"
      }
    ]
  },
  {
    id: "118",
    title: "Bookstore Purchase",
    clientName: "Hermione Granger",
    email: "hermione.granger@email.com",
    phone: "+1 (555) 888-0000",
    amount: "$125,000",
    closedDate: "2024-07-20",
    leadOwner: "Luna Lovegood",
    location: "Portland, OR",
    referralPartner: "Small Business Network",
    annualIncome: "$80,000",
    progressPercentage: 100,
    status: 'closed',
    activities: [
      {
        id: "1",
        type: "Call",
        description: "Independent bookstore acquisition",
        timestamp: "2024-07-12T13:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Document",
        description: "Business transfer completed",
        timestamp: "2024-07-20T15:00:00Z",
        status: "completed"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Local Bookstore",
        content: "Community hub. Strong local following.",
        timestamp: "2024-07-20T16:00:00Z"
      }
    ]
  },
  {
    id: "119",
    title: "Art Gallery Space",
    clientName: "Vincent Van Gogh",
    email: "vincent.vangogh@email.com",
    phone: "+1 (555) 999-1111",
    amount: "$275,000",
    closedDate: "2024-07-18",
    leadOwner: "Pablo Picasso",
    location: "Santa Fe, NM",
    referralPartner: "Arts District Realty",
    annualIncome: "$110,000",
    progressPercentage: 100,
    status: 'closed',
    activities: [
      {
        id: "1",
        type: "Meeting",
        description: "Gallery space financing",
        timestamp: "2024-07-10T11:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Document",
        description: "Lease agreement finalized",
        timestamp: "2024-07-18T14:00:00Z",
        status: "completed"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Gallery in Arts District",
        content: "Prime location in historic arts district.",
        timestamp: "2024-07-18T15:00:00Z"
      }
    ]
  },
  {
    id: "120",
    title: "Nursing Home Facility",
    clientName: "Florence Nightingale",
    email: "florence.nightingale@email.com",
    phone: "+1 (555) 000-2222",
    amount: "$2,800,000",
    closedDate: "2024-07-15",
    leadOwner: "Clara Barton",
    location: "Tampa, FL",
    referralPartner: "Healthcare Properties",
    annualIncome: "$400,000",
    progressPercentage: 100,
    status: 'closed',
    activities: [
      {
        id: "1",
        type: "Meeting",
        description: "Healthcare facility acquisition",
        timestamp: "2024-07-05T09:00:00Z",
        status: "completed"
      },
      {
        id: "2",
        type: "Document",
        description: "Facility licensing and funding completed",
        timestamp: "2024-07-15T16:00:00Z",
        status: "completed"
      }
    ],
    notes: [
      {
        id: "1",
        title: "Assisted Living Facility",
        content: "80-bed facility. All licenses current.",
        timestamp: "2024-07-15T17:00:00Z"
      }
    ]
  }
]

export function useDeals() {
  const [deals, setDeals] = useState<Deal[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load deals from localStorage on mount
  useEffect(() => {
    const storedDeals = localStorage.getItem(STORAGE_KEY)
    if (storedDeals) {
      try {
        setDeals(JSON.parse(storedDeals))
      } catch (error) {
        console.error('Error loading deals from localStorage:', error)
        setDeals(defaultDeals)
      }
    } else {
      setDeals(defaultDeals)
    }
    setIsLoaded(true)
  }, [])

  // Save deals to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(deals))
    }
  }, [deals, isLoaded])

  const addDeal = (newDeal: Omit<Deal, 'id'>) => {
    const deal: Deal = {
      ...newDeal,
      id: Date.now().toString(),
      activities: newDeal.activities || [],
      notes: newDeal.notes || []
    }
    setDeals((prevDeals) => [...prevDeals, deal])
    return deal
  }

  const updateDeal = (id: string, updates: Partial<Deal>) => {
    setDeals((prevDeals) =>
      prevDeals.map((deal) => (deal.id === id ? { ...deal, ...updates } : deal))
    )
  }

  const deleteDeal = (id: string) => {
    setDeals((prevDeals) => prevDeals.filter((deal) => deal.id !== id))
  }

  const getActiveDeals = () => deals.filter((deal) => deal.status === 'active')
  
  const getClosedDeals = () => deals.filter((deal) => deal.status === 'closed')

  return {
    deals,
    activeDeals: getActiveDeals(),
    closedDeals: getClosedDeals(),
    addDeal,
    updateDeal,
    deleteDeal,
    isLoaded
  }
}
