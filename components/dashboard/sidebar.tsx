"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { LayoutDashboard, Users, Scissors, Calendar, Settings, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"

interface SidebarProps {
  className?: string
}

export default function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const routes = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Clientes",
      icon: Users,
      href: "/dashboard/clientes",
      active: pathname.includes("/dashboard/clientes"),
    },
    {
      label: "Simulação de Corte",
      icon: Scissors,
      href: "/dashboard/simulacao",
      active: pathname.includes("/dashboard/simulacao"),
    },
    {
      label: "Agendamentos",
      icon: Calendar,
      href: "/dashboard/agendamentos",
      active: pathname.includes("/dashboard/agendamentos"),
    },
    {
      label: "Configurações",
      icon: Settings,
      href: "/dashboard/configuracoes",
      active: pathname.includes("/dashboard/configuracoes"),
    },
  ]

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X /> : <Menu />}
      </Button>

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-gray-900 border-r border-gray-800 transition-transform duration-300 md:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        <div className="flex h-14 items-center px-4 border-b border-gray-800">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Scissors className="h-6 w-6 text-purple-500" />
            <span className="font-bold text-lg">HairSync Pro</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 py-4">
          <nav className="grid gap-1 px-2">
            {routes.map((route) => (
              <Link key={route.href} href={route.href} onClick={() => setMobileOpen(false)}>
                <Button
                  variant={route.active ? "secondary" : "ghost"}
                  className={cn("w-full justify-start", route.active ? "bg-gray-800 hover:bg-gray-700" : "")}
                >
                  <route.icon className="mr-2 h-5 w-5" />
                  {route.label}
                </Button>
              </Link>
            ))}
          </nav>
        </ScrollArea>
        <div className="p-4 border-t border-gray-800">
          <Link href="/">
            <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-400 hover:bg-gray-800">
              <LogOut className="mr-2 h-5 w-5" />
              Sair
            </Button>
          </Link>
        </div>
      </div>
    </>
  )
}
