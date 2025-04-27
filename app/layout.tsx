import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Nav } from "@/components/nav"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VEB - Vohitsara École de Basket",
  description: "Plateforme de gestion pour Vohitsara École de Basket",
  icons: {
    icon: "/veb.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-background">
        <Nav />

          {children}
        </main>
      </body>
    </html>
  )
}
