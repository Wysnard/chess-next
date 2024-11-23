import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from "../../../components/ui/sidebar";
import { Doc } from "../../../../convex/_generated/dataModel";
import { fromIdToPiece, Piece } from "../../../engine/pieces";

const fromIndexToLetter = (index: number) => {
  return String.fromCharCode(97 + index);
};

export default function History({ game }: { game: Doc<"games"> }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>History</SidebarGroupLabel>
      <SidebarMenu className="overflow-y-auto grid grid-cols-2">
        {game.history.map((move, index) => {
          const { piece, to } = move;
          const [toRow, toColumn] = to;

          return (
            <div
              key={`history-${index}`}
              className="flex items-center gap-2 justify-between hover:bg-muted rounded-md"
            >
              {fromIdToPiece(piece as Piece)} {fromIndexToLetter(toColumn)}
              {toRow + 1}
            </div>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
