import { ModeToggle } from "@/components/theme-toggle";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export default function NavThemeToggle() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <ModeToggle />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
