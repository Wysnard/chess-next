import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Doc } from "../../../../convex/_generated/dataModel";
import History from "./history";
import GameState from "./game-state";
import Actionables from "./actionables";

export default function GameSideBar({
  game,
  ...props
}: { game: Doc<"games"> } & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      {...props}
      collapsible="none"
      className="sticky hidden lg:flex top-0 h-svh border-l bg-background"
    >
      <SidebarHeader>Game Manager</SidebarHeader>
      <SidebarContent>
        <GameState game={game} />
        <History game={game} />
      </SidebarContent>
      <SidebarFooter>
        <Actionables game={game} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
