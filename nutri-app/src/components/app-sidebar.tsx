"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  CalendarCogIcon,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboard,
  Map,
  MessageCircleMoreIcon,
  PieChart,
  Settings2,
  SquareTerminal,
  UserCog2,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Separator } from "./ui/separator"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  health: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard
    },
  ],
  social: [
    {
      title: "Informações de Usuário",
      url: "/info",
      icon: UserCog2,
    },
    {
      title: "Publicações",
      url: "/posts",
      icon: MessageCircleMoreIcon,
    },
    {
      title: "Plano Alimentar",
      url: "/meal-plan",
      icon: CalendarCogIcon,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <Separator/>
      <SidebarContent>
        <NavMain items={data.health} />
        <NavMain items={data.social} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
