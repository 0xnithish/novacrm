import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { LayoutHeader } from "@/components/LayoutHeader";
import { ThemeProvider } from "next-themes";
import { DealDetailsProvider } from "@/hooks/useDealDetails";
import { LeadDetailsProvider } from "@/hooks/useLeadDetails";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plan CRM",
  description: "Modern CRM application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <DealDetailsProvider>
              <LeadDetailsProvider>
                <div className="flex min-h-screen w-full">
                  <AppSidebar />
                  <SidebarInset className="flex flex-1 flex-col">
                    <LayoutHeader />
                    <div className="flex-1 overflow-auto p-6">
                      {children}
                    </div>
                  </SidebarInset>
                </div>
              </LeadDetailsProvider>
            </DealDetailsProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
