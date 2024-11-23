import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function AppSidebarTrigger() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarTrigger />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
