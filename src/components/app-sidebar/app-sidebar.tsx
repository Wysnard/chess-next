"use client";

import * as React from "react";
import { BookOpen, Puzzle, SquareTerminal, TvMinimal } from "lucide-react";

import { NavMain, NavMainProps } from "@/components/app-sidebar/nav-main";
import { NavUser } from "@/components/app-sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import NavHeader from "./nav-header";
import AppSidebarTrigger from "./app-sidebar-trigger";
import NavThemeToggle from "./nav-theme-toggle";

export type AppSidebarData = {
  navMain: NavMainProps["items"];
};

const data: AppSidebarData = {
  navMain: [
    {
      title: "Play",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Your active games",
          url: "/games/actives",
        },
        {
          title: "Create a game",
          url: "/game",
        },
        {
          title: "Join a game",
          url: "/games/join",
        },
        {
          title: "Play a bot",
          url: "#",
        },
      ],
    },
    {
      title: "Puzzle",
      icon: Puzzle,
      items: [
        {
          title: "Play",
          url: "#",
        },
        {
          title: "Create",
          url: "#",
        },
        {
          title: "Explore",
          url: "#",
        },
      ],
    },
    {
      title: "Learn",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Watch",
      icon: TvMinimal,
      items: [
        {
          title: "Users",
          url: "#",
        },
        {
          title: "Games",
          url: "/games/watch",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <AppSidebarTrigger />
        <NavThemeToggle />
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
