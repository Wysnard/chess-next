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

const GameManagerCell = ({ rowIndex, columnIndex, cell }: BoardCellProps) => {
  const { possibleMoves: possibleMovesDict } = useGameContext();
  const { isOver, setNodeRef, active } = useDroppable({
    id: `cell-${rowIndex}-${columnIndex}`,
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
        (rowIndex + columnIndex) % 2 === 0
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
        <Circle className="text-primary/70 font-extrabold absolute h-16 w-16" />
      )}
      {isPossibleMove && !isPiece(cell) && (
        <Dot className="text-primary/70 font-extrabold absolute h-28 w-28" />
      )}
    </Cell>
  );
};

export type GameManagerProps = {
  preloadedGame: Preloaded<typeof api.games.get>;
};

export default function GameManager({ preloadedGame }: GameManagerProps) {
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
      const newBoard = currentValue.board.map((row) =>
        row.map((cell) => (cell === args.piece ? "" : cell))
      );
      newBoard[args.to[0]][args.to[1]] = args.piece;
      localStore.setQuery(
        api.games.get,
        { gameId: args.gameId },
        { ...game, board: newBoard }
      );
    }
  );
  const possibleMovesDict = useMemo(() => dictAllPossibleMoves(game), [game]);

  useEffect(() => {
    if (!currentUser) return;
    if (game.players.includes(currentUser._id as Id<"users">)) return;
    if (game.state !== "waiting") return;
    join({ gameId: game._id });
  }, [game, currentUser, join]);

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

                await play({
                  gameId: game._id,
                  piece: event.active.id as PieceType,
                  to: [
                    event.over?.data.current?.rowIndex,
                    event.over?.data.current?.columnIndex,
                  ],
                });
              }}
            >
              <div className="w-full max-w-[90vh] aspect-square">
                <BoardComponent game={game} cellComponent={GameManagerCell} />
              </div>
            </DndContext>
          </GameContext.Provider>
        </div>
      </SidebarInset>
      <GameSideBar game={game} />
    </SidebarProvider>
  );
}
