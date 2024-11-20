"use client";

import * as React from "react";
import { BookOpen, Puzzle, SquareTerminal, TvMinimal } from "lucide-react";

import { NavMain, NavMainProps } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import NavHeader from "./nav-header";

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
          url: "/games",
        },
        {
          title: "Create a game",
          url: "/game",
        },
        {
          title: "Join a game",
          url: "#",
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
          url: "#",
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
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
