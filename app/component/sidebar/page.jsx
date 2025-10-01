"use client";

import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  Stethoscope,
  Users,
  CalendarCheck,
  FileText,
  Pill,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarFooter,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  { title: "Tableau de bord", url: "Accueill", icon: Home }, // Vue d’ensemble
  { title: "Patients", url: "Patients", icon: Users }, // Gestion des patients
  { title: "Rendez-vous", url: "Rendez-vous", icon: CalendarCheck }, // Agenda des consultations
  { title: "Rapports", url: "Rapports", icon: FileText }, // Comptes rendus / résultats
  { title: "Ordonnances", url: "Ordonnances", icon: Pill },
];

export function AppSidebar() {
  return (
    <Sidebar className="min-h-screen flex flex-col bg-gradient-to-b from-purple-700 via-purple-800 to-purple-900 text-white border-r border-purple-700 shadow-lg">
      <SidebarContent className="flex flex-col h-full pt-8">
        <SidebarGroup>
          {/* Header */}
          <SidebarHeader className="px-6 py-4 flex flex-row">
            <h1 className="text-2xl font-extrabold tracking-wide text-white">
              DR<span className="text-purple-300"> Amel</span>
            </h1>
            <img src="/amel.png" alt="Amel Logo" className="w-10 h-10 " />
          </SidebarHeader>

          {/* Label */}
          <SidebarGroupLabel className="px-6 py-2 text-purple-300 uppercase tracking-wider text-xs">
            MENU
          </SidebarGroupLabel>

          {/* Menu */}
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="mb-2">
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className="group flex items-center gap-4 px-6 py-3 rounded-lg transition-all duration-200 
                        hover:bg-purple-600 hover:text-white 
                        focus:ring-2 focus:ring-purple-400"
                    >
                      <item.icon className="w-6 h-6 text-purple-300 group-hover:text-white transition-colors" />
                      <span className="font-medium text-lg">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Footer */}
        <SidebarFooter className="mt-auto px-6 py-4 text-xs text-purple-300 border-t border-purple-700">
          &copy; {new Date().getFullYear()} My App
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
