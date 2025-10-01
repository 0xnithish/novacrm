"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Check,
  Download,
  CreditCard,
  Mail,
  Building,
  Crown
} from "lucide-react"
import { useDemoAlert } from "@/components/ui/demo-alert"

const currentPlan = {
  name: "Professional",
  price: "$89",
  interval: "month",
  features: ["1,000 contacts", "10 users", "Advanced analytics", "Priority support", "API access"],
  usage: {
    contacts: 743,
    maxContacts: 1000,
    users: 6,
    maxUsers: 10,
    storage: 8.2,
    maxStorage: 15
  }
}

const billingHistory = [
  { id: "INV-2024-001", date: "2024-03-01", amount: "$89.00", plan: "Professional" },
  { id: "INV-2024-002", date: "2024-02-01", amount: "$89.00", plan: "Professional" },
  { id: "INV-2024-003", date: "2024-01-01", amount: "$89.00", plan: "Professional" },
  { id: "INV-2023-012", date: "2023-12-01", amount: "$59.00", plan: "Starter" }
]

const plans = [
  {
    name: "Starter",
    description: "Perfect for small teams",
    price: "$29",
    features: ["100 contacts", "3 users", "Basic analytics", "Email support"],
    current: false,
    popular: false
  },
  {
    name: "Professional",
    description: "Great for growing businesses",
    price: "$89",
    features: ["1,000 contacts", "10 users", "Advanced analytics", "Priority support", "API access"],
    current: true,
    popular: true
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    price: "$299",
    features: ["Unlimited contacts", "Unlimited users", "Advanced analytics", "Dedicated support", "Custom integrations"],
    current: false,
    popular: false
  }
]

const paymentMethods = [
  { id: 1, brand: "Visa", last4: "4242", expiry: "12/25", isDefault: true },
  { id: 2, brand: "Mastercard", last4: "8888", expiry: "09/24", isDefault: false }
]

export default function BillingPage() {
  const { showAlert, DemoAlertComponent } = useDemoAlert()

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Billing</h1>
        <p className="text-muted-foreground text-sm">
          Manage subscription and payment methods
        </p>
      </div>

      {/* Current Plan Overview */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-lg">
                {currentPlan.name} Plan
                <Badge variant="secondary" className="text-green-600 border-green-600 text-xs">
                  Active
                </Badge>
              </CardTitle>
              <CardDescription className="text-sm">
                {currentPlan.price}/{currentPlan.interval}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => showAlert("Feature Coming Soon", "Subscription cancellation functionality will be added in future updates. This is a demo portfolio project.")}>
              Cancel
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Usage */}
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1">
                  <Building className="h-3 w-3" />
                  Contacts
                </span>
                <span className="font-medium">
                  {currentPlan.usage.contacts}/{currentPlan.usage.maxContacts}
                </span>
              </div>
              <Progress
                value={(currentPlan.usage.contacts / currentPlan.usage.maxContacts) * 100}
                className="h-1.5"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  Users
                </span>
                <span className="font-medium">
                  {currentPlan.usage.users}/{currentPlan.usage.maxUsers}
                </span>
              </div>
              <Progress
                value={(currentPlan.usage.users / currentPlan.usage.maxUsers) * 100}
                className="h-1.5"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1">
                  <CreditCard className="h-3 w-3" />
                  Storage
                </span>
                <span className="font-medium">
                  {currentPlan.usage.storage}/{currentPlan.usage.maxStorage}GB
                </span>
              </div>
              <Progress
                value={(currentPlan.usage.storage / currentPlan.usage.maxStorage) * 100}
                className="h-1.5"
              />
            </div>
          </div>

          {/* Features */}
          <div className="grid gap-1 sm:grid-cols-2">
            {currentPlan.features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-xs">
                <Check className="h-3 w-3 text-green-600" />
                {feature}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="history" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="history" className="text-xs cursor-pointer">History</TabsTrigger>
          <TabsTrigger value="plans" className="text-xs cursor-pointer">Plans</TabsTrigger>
          <TabsTrigger value="payment" className="text-xs cursor-pointer">Payment</TabsTrigger>
          <TabsTrigger value="settings" className="text-xs cursor-pointer">Settings</TabsTrigger>
        </TabsList>

        {/* Billing History */}
        <TabsContent value="history">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Invoice</TableHead>
                    <TableHead className="text-xs">Date</TableHead>
                    <TableHead className="text-xs">Amount</TableHead>
                    <TableHead className="text-xs text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billingHistory.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="text-xs font-medium">{invoice.id}</TableCell>
                      <TableCell className="text-xs">{invoice.date}</TableCell>
                      <TableCell className="text-xs">{invoice.amount}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => showAlert("Feature Coming Soon", "Invoice download functionality will be added in future updates. This is a demo portfolio project.")}>
                          <Download className="h-3 w-3 mr-1" />
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Plans */}
        <TabsContent value="plans">
          <div className="grid gap-4 sm:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative ${
                  plan.current ? 'border-primary' : 'hover:border-primary/50'
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs">
                    Popular
                  </Badge>
                )}
                <CardHeader className="text-center pb-3">
                  <CardTitle className="flex items-center justify-center gap-1 text-base">
                    {plan.name === 'Enterprise' && <Crown className="h-4 w-4 text-yellow-600" />}
                    {plan.name}
                  </CardTitle>
                  <div className="text-xl font-bold">{plan.price}<span className="text-xs text-muted-foreground">/mo</span></div>
                  {plan.current && (
                    <Badge variant="outline" className="text-xs">Current</Badge>
                  )}
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-1">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs">
                        <Check className="h-3 w-3 text-green-600" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button
                    className="w-full h-7 text-xs"
                    variant={plan.current ? "outline" : "default"}
                    disabled={plan.current}
                    size="sm"
                    onClick={() => !plan.current && showAlert("Feature Coming Soon", "Plan upgrade functionality will be added in future updates. This is a demo portfolio project.")}
                  >
                    {plan.current ? "Current Plan" : "Upgrade"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Payment Methods */}
        <TabsContent value="payment">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Payment Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {method.brand} •••{method.last4}
                        </span>
                        {method.isDefault && (
                          <Badge variant="secondary" className="text-xs">
                            Default
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Expires {method.expiry}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="outline" size="sm" className="h-6 px-2 text-xs" onClick={() => showAlert("Feature Coming Soon", "Payment method editing functionality will be added in future updates. This is a demo portfolio project.")}>
                      Edit
                    </Button>
                    {!method.isDefault && (
                      <Button variant="outline" size="sm" className="h-6 px-2 text-xs" onClick={() => showAlert("Feature Coming Soon", "Payment method removal functionality will be added in future updates. This is a demo portfolio project.")}>
                        Remove
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              <Button className="w-full h-7 text-xs" variant="outline" onClick={() => showAlert("Feature Coming Soon", "Add payment method functionality will be added in future updates. This is a demo portfolio project.")}>
                Add Payment Method
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings */}
        <TabsContent value="settings">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Billing Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">Billing Email</span>
                  <p className="text-xs text-muted-foreground">john@example.com</p>
                </div>
                <Button variant="outline" size="sm" className="h-6 px-2 text-xs" onClick={() => showAlert("Feature Coming Soon", "Billing email change functionality will be added in future updates. This is a demo portfolio project.")}>
                  Change
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">Billing Cycle</span>
                  <p className="text-xs text-muted-foreground">Monthly billing</p>
                </div>
                <Button variant="outline" size="sm" className="h-6 px-2 text-xs" onClick={() => showAlert("Feature Coming Soon", "Billing cycle change functionality will be added in future updates. This is a demo portfolio project.")}>
                  Switch to Annual
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium">Payment Reminders</span>
                  <p className="text-xs text-muted-foreground">Email notifications enabled</p>
                </div>
                <Button variant="outline" size="sm" className="h-6 px-2 text-xs" onClick={() => showAlert("Feature Coming Soon", "Payment reminder configuration functionality will be added in future updates. This is a demo portfolio project.")}>
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <DemoAlertComponent />
    </div>
  )
}