import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SupportPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="max-w-xl text-center">
        <CardHeader className="space-y-3">
          <CardTitle className="text-2xl">Help & Support are on the roadmap :)</CardTitle>
          
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            A support will be added in the future which can allow users to get help and support. You&apos;ll be able to access FAQs, contact support agents, and find solutions to common issues.
          </p>
          <p>
            Until then, this page is a simple placeholder to let recruiters know the vision is mapped out—even if the code isn&apos;t wired up yet.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}