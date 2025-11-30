"use client";

import * as React from "react";
import {
  CalendarCogIcon,
  CarrotIcon,
  GalleryVerticalEnd,
  LayoutDashboard,
  LogOut,
  MessageCircleMoreIcon,
  Slack,
  UserCog2,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Separator } from "./ui/separator";

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
      icon: LayoutDashboard,
    },
    // {
    //   title: "Plano Alimentar",
    //   url: "/meal-plan",
    //   icon: CalendarCogIcon,
    // },
  ],
  social: [
    {
      title: "Informações de Usuário",
      url: "/profile",
      icon: UserCog2,
    },
    {
      title: "Publicações",
      url: "/posts",
      icon: MessageCircleMoreIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <span className="text-xl font-semibold w-min">Nutri</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <NavMain title="SAÚDE" items={data.health} />
        <NavMain title="SOCIAL" items={data.social} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <LogOut />
            <span>Sair</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
