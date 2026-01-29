import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Sthavir Vinjamuri",
  description: "Personal website of Sthavir Vinjamuri",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-[#f0ead6]">
      <body className={`${inter.variable} font-sans bg-[#f0ead6]`}>{children}</body>
    </html>
  )
}
