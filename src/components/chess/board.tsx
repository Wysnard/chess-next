import { Doc } from "../../../convex/_generated/dataModel";
import Cell, { CellProps } from "./cell";
import { Cell as CellType } from "../../engine/pieces";

export type BoardCellProps = CellProps & {
  rowIndex: number;
  columnIndex: number;
  cell: CellType;
};

export const defaultCellComponent = ({
  rowIndex,
  columnIndex,
  cell,
}: BoardCellProps) => {
  return (
    <Cell
      className={`${
        (rowIndex + columnIndex) % 2 === 0 ? "bg-orange-200" : "bg-orange-700"
      }`}
    >
      {cell}
    </Cell>
  );
};

export type BoardProps = {
  game: Doc<"games">;
  cellComponent?: React.ComponentType<BoardCellProps>;
};

export const Board = ({
  game,
  cellComponent: CellComponent = defaultCellComponent,
}: BoardProps) => {
  return (
    <div className="flex flex-col aspect-square">
      {game.board.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex flex-row">
          {row.map((cell, columnIndex) => (
            <CellComponent
              key={`cell-${rowIndex}-${columnIndex}`}
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              cell={cell as CellType}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
