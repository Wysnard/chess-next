import { ModeToggle } from "@/components/theme-toggle";
import { SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar";

export default function NavThemeToggle() {
  return (
    <SidebarMenu>
      <SidebarMenuButton asChild>
        <ModeToggle />
      </SidebarMenuButton>
    </SidebarMenu>
  );
}
