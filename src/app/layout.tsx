import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "PizzaCraft Pro — Streamline pizza ordering for restaurants and customers",
  description: "A comprehensive SaaS platform that enables pizza restaurants to manage orders, customize menus, and process payments while providing customers with an",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body className="min-h-screen bg-gray-50 antialiased">{children}</body></html>
}