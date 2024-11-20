import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
} from "../../../components/ui/sidebar";
import { Doc } from "../../../../convex/_generated/dataModel";

export default function GameState({ game }: { game: Doc<"games"> }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Game State</SidebarGroupLabel>
      <SidebarContent>
        <div>Turn {game.turn + 1}</div>
        <div>State: {game.state}</div>
        <div>It is {game.turn % 2 === 0 ? "white's" : "black's"} turn</div>
      </SidebarContent>
    </SidebarGroup>
  );
}
