import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { DataProvider } from "@/contexts/data-context"
import { AuthProvider } from "@/contexts/auth-context"
import { Suspense } from "react"
import { Toaster } from "react-hot-toast"
import { UnderConstructionModal } from "@/components/under-construction-modal"
import { MobileHeader } from "@/components/mobile-header"
import { MobileNav } from "@/components/mobile-nav"

export const metadata: Metadata = {
  title: "Brotherhood of Excellence - Elite Gaming Club",
  description:
    "Join the Brotherhood of Excellence, a premier competitive gaming club featuring top players, tournaments, and achievements.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased pb-16 md:pb-0`}>
        <Suspense fallback={null}>
          <DataProvider>
            <AuthProvider>
              {children}
              <MobileHeader />
              <MobileNav />
              <UnderConstructionModal />
            </AuthProvider>
          </DataProvider>
        </Suspense>
        <Analytics />
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  )
}
