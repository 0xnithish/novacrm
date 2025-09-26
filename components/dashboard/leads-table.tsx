import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Lead } from "@/lib/data/mock-data"

interface LeadsTableProps {
  leads: Lead[]
  leadsCount: number
}

export function LeadsTable({ leads, leadsCount }: LeadsTableProps) {
  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'in progress':
        return 'bg-green-100 text-green-800 hover:bg-green-100'
      case 'closed':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
      case 'new':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100'
      case 'qualified':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100'
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100'
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg flex items-center justify-between">
          Recent Leads
          <Badge variant="secondary" className="text-sm">
            {leadsCount}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Name</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Contact</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Email</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={lead.avatar} alt={lead.name} />
                        <AvatarFallback className="text-xs">
                          {getInitials(lead.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{lead.name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">{lead.contact}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">{lead.email}</span>
                  </td>
                  <td className="p-4">
                    <Badge
                      variant="secondary"
                      className={getStatusColor(lead.status)}
                    >
                      {lead.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}