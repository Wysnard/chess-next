"use client";

import { useQuery } from "convex/react";
import Link from "next/link";
import { api } from "../../../convex/_generated/api";
import { Doc, Id } from "../../../convex/_generated/dataModel";
import Board, { BoardCellProps } from "../../components/chess/board";
import Cell from "../../components/chess/cell";
import Piece from "../../components/chess/piece";
import { isPiece } from "../../engine/pieces";

type GameCardProps = {
  game: Doc<"games">;
};

const PlayerVersus = ({ playerIds }: { playerIds: Id<"users">[] }) => {
  const player1 = useQuery(api.users.get, { id: playerIds[0] });
  const player2 = useQuery(api.users.get, { id: playerIds[1] });

  return (
    <>
      <span className="font-bold">{player1?.name}</span> vs{" "}
      <span className="font-bold">{player2?.name}</span>
    </>
  );
};

const BoardListCell = ({ rowIndex, columnIndex, cell }: BoardCellProps) => {
  return (
    <Cell
      className={`${
        (rowIndex + columnIndex) % 2 === 0 ? "bg-orange-200" : "bg-orange-700"
      }`}
    >
      {isPiece(cell) && (
        <Piece id={cell} className="z-0 ~@[2rem]/[4rem]:~text-base/4xl" />
      )}
      {!isPiece(cell) && cell}
    </Cell>
  );
};

const GameCard = ({ game }: GameCardProps) => {
  return (
    <Link href={`/game/${game._id}`} prefetch={true}>
      <div className="relative aspect-square rounded-xl cursor-pointer transition-transform hover:scale-105">
        <div className="absolute top-0 left-0 right-0 z-10 p-2 bg-background/50 backdrop-blur-sm text-foreground">
          <div className="text-sm">
            {game.state === "waiting"
              ? "Waiting for players"
              : `Turn ${game.turn}`}
          </div>
          {game.players.length == 2 && (
            <PlayerVersus playerIds={game.players} />
          )}
          <div className="text-xs opacity-75">
            {game.players.length} player{game.players.length !== 1 ? "s" : ""}
          </div>
        </div>
        <Board game={game} cellComponent={BoardListCell} />
      </div>
    </Link>
  );
};

const LoadingGameCard = () => {
  return <div className="aspect-square rounded-xl bg-muted animate-pulse" />;
};

export default function GamesList() {
  const games = useQuery(api.games.list);

  return (
    <div className="grid auto-rows-min gap-4 md:grid-cols-5">
      {games
        ? games.map((game) => <GameCard key={game._id} game={game} />)
        : Array.from({ length: 20 }).map((_, i) => <LoadingGameCard key={i} />)}
    </div>
  );
}
