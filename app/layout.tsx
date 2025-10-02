import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/LayoutWrapper";
import { ThemeProvider } from "next-themes";
import { DealDetailsProvider } from "@/hooks/useDealDetails";
import { LeadDetailsProvider } from "@/hooks/useLeadDetails";
import { SidebarToggleProvider } from "@/hooks/use-sidebar-toggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nova CRM",
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
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarToggleProvider>
            <DealDetailsProvider>
              <LeadDetailsProvider>
                <LayoutWrapper>
                  {children}
                </LayoutWrapper>
              </LeadDetailsProvider>
            </DealDetailsProvider>
          </SidebarToggleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
