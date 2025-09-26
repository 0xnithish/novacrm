import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { LayoutHeader } from "@/components/layout-header";

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
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased dark`}
      >
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AppSidebar />
            <SidebarInset className="flex flex-1 flex-col">
              <LayoutHeader />
              <div className="flex-1 overflow-auto p-6">
                {children}
              </div>
            </SidebarInset>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
