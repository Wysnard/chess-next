"use client";

import { useMutation } from "convex/react";
import { Button } from "../../../components/ui/button";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../../components/ui/sidebar";
import { Doc } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";

export default function Actionables({ game }: { game: Doc<"games"> }) {
  const resign = useMutation(api.games.resign);
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Button onClick={() => resign({ gameId: game._id })}>Resign</Button>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
