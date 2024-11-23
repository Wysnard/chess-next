"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Preloaded, useMutation, usePreloadedQuery } from "convex/react";
import {
  DndContext,
  DragStartEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Dot, Circle } from "lucide-react";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import { api } from "../../../../convex/_generated/api";
import { useCurrentUser } from "../../../hooks/use-current-user";
import { Id } from "../../../../convex/_generated/dataModel";
import BoardComponent, {
  BoardCellProps,
} from "../../../components/chess/board";
import { isPiece, Piece as PieceType } from "../../../engine/pieces";
import GameSideBar from "./game-side-bar";
import { emptyDictMoves } from "../../../engine/dict-all-possible-moves-without-castling";
import { dictAllPossibleMoves } from "../../../engine/dict-all-possible-moves";
import Cell from "../../../components/chess/cell";
import Piece, { PieceProps } from "../../../components/chess/piece";
import { SidebarInset, SidebarProvider } from "../../../components/ui/sidebar";
import { move } from "../../../engine/move";
import { isWhitePlayer } from "../../../engine/player";

export type GameContextType = {
  active: DragStartEvent["active"] | null;
  possibleMoves: Record<PieceType, [number, number][]>;
};

export const GameContext = createContext<GameContextType>({
  active: null,
  possibleMoves: emptyDictMoves,
});

export const useGameContext = () => {
  return useContext(GameContext);
};

const GameManagerPiece = ({ id, rowIndex, columnIndex }: PieceProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: {
      rowIndex,
      columnIndex,
      pieceType: id,
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    touchAction: "none",
  };

  return (
    <Piece
      id={id}
      {...attributes}
      {...listeners}
      style={style}
      ref={setNodeRef}
      className="cursor-grab active:cursor-grabbing"
    />
  );
};

const GameManagerCell = ({
  rowIndex,
  columnIndex,
  displayedRowIndex,
  displayedColumnIndex,
  cell,
}: BoardCellProps) => {
  const { possibleMoves: possibleMovesDict } = useGameContext();
  const { isOver, setNodeRef, active } = useDroppable({
    id: `cell-${displayedRowIndex}-${displayedColumnIndex}`,
    data: {
      rowIndex,
      columnIndex,
    },
  });
  const isPossibleMove = useMemo(() => {
    if (!active?.data.current) return false;
    return possibleMovesDict[active.data.current.pieceType as PieceType].some(
      ([row, column]) => row === rowIndex && column === columnIndex
    );
  }, [possibleMovesDict, active, rowIndex, columnIndex]);

  return (
    <Cell
      ref={setNodeRef}
      className={`${
        (displayedRowIndex + displayedColumnIndex) % 2 === 0
          ? isOver
            ? "bg-orange-400"
            : "bg-orange-200"
          : isOver
            ? "bg-orange-900"
            : "bg-orange-700"
      }`}
    >
      {isPiece(cell) && (
        <GameManagerPiece
          id={cell}
          rowIndex={rowIndex}
          columnIndex={columnIndex}
        />
      )}
      {isPossibleMove && isPiece(cell) && (
        <Circle className="text-primary/70 font-extrabold absolute h-16 w-16 z-10" />
      )}
      {isPossibleMove && !isPiece(cell) && (
        <Dot className="text-primary/70 font-extrabold absolute h-24 w-24 z-10" />
      )}
    </Cell>
  );
};

export type GameManagerProps = {
  preloadedGame: Preloaded<typeof api.games.get>;
};

export default function GameManager({ preloadedGame }: GameManagerProps) {
  const moveAudio = useMemo(() => new Audio("/move-self.mp3"), []);
  const [active, setActive] = useState<DragStartEvent["active"] | null>(null);
  const { currentUser } = useCurrentUser();
  const game = usePreloadedQuery(preloadedGame);
  const join = useMutation(api.games.join);
  const play = useMutation(api.games.play).withOptimisticUpdate(
    (localStore, args) => {
      const currentValue = localStore.getQuery(api.games.get, {
        gameId: args.gameId,
      });
      if (!currentValue) return;
      const newGame = move(currentValue, args.piece, args.to);
      localStore.setQuery(api.games.get, { gameId: args.gameId }, newGame);
    }
  );
  const possibleMovesDict = useMemo(() => dictAllPossibleMoves(game), [game]);

  useEffect(() => {
    if (!currentUser) return;
    if (game.players.includes(currentUser._id as Id<"users">)) return;
    if (game.state !== "waiting") return;
    join({ gameId: game._id });
  }, [game, currentUser, join]);

  useEffect(() => {
    console.log(game);
  }, [game]);

  return (
    <SidebarProvider>
      <SidebarInset>
        <div className="flex flex-1 items-center justify-center rounded-xl bg-muted/70 p-4">
          <GameContext.Provider
            value={{ active, possibleMoves: possibleMovesDict }}
          >
            <DndContext
              onDragStart={(event) => {
                setActive(event.active);
              }}
              onDragEnd={async (event) => {
                setActive(null);
                if (!event.over) return;
                if (
                  event.over.data.current?.rowIndex ===
                    event.active.data.current?.rowIndex &&
                  event.over.data.current?.columnIndex ===
                    event.active.data.current?.columnIndex
                )
                  return;

                try {
                  await play({
                    gameId: game._id,
                    piece: event.active.id as PieceType,
                    to: [
                      event.over?.data.current?.rowIndex,
                      event.over?.data.current?.columnIndex,
                    ],
                  });
                  moveAudio.play();
                } catch (error) {
                  if (!(error instanceof ConvexError)) return;
                  toast.error(error.data.message, {
                    position: "top-center",
                  });
                }
              }}
            >
              <div className="w-full max-w-[90vh] aspect-square">
                <BoardComponent
                  game={game}
                  cellComponent={GameManagerCell}
                  reverse={isWhitePlayer(game, currentUser?._id as Id<"users">)}
                />
              </div>
            </DndContext>
          </GameContext.Provider>
        </div>
      </SidebarInset>
      <GameSideBar game={game} />
    </SidebarProvider>
  );
}
