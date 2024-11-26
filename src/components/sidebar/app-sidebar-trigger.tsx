import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AppSidebarTrigger() {
  const { toggleSidebar, open } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton tooltip="Open sidebar" asChild>
          <Button
            data-sidebar="trigger"
            variant="ghost"
            size="icon"
            onClick={() => {
              toggleSidebar();
            }}
          >
            {open ? <ChevronLeft /> : <ChevronRight />}
          </Button>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
