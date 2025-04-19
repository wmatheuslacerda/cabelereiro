import type { ReactNode } from "react"
import ClienteNavbar from "@/components/cliente/cliente-navbar"
import ClienteFooter from "@/components/cliente/cliente-footer"

export default function ClienteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <ClienteNavbar />
      <main className="flex-1">{children}</main>
      <ClienteFooter />
    </div>
  )
}
