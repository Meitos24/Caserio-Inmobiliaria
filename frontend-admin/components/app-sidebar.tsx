"use client" // Necesario para usar usePathname

import * as React from "react"
import Link from "next/link" // Importamos Link para navegación interna
import { usePathname } from "next/navigation" // Para detectar la ruta actual
import { VersionSwitcher } from "./version-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { LayoutDashboard, House, Bolt } from 'lucide-react';

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Administración",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/admin", // Apunta a app/admin/page.js
          icon: LayoutDashboard,
        },
        {
          title: "Propiedades",
          url: "/admin/properties", // Apunta a app/admin/properties/page.js
          icon: House,
        },
        {
          title: "Configuración",
          url: "/admin/config", // Ajusta según tus carpetas
          icon: Bolt,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname() // Obtenemos la ruta actual (ej: /admin)

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    {/* isActive ahora es dinámico: brilla si la URL coincide */}
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                    >
                      <Link href={item.url}>
                        {item.icon && <item.icon className="w-4 h-4" />}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}