import { zip } from "radash";
import { Doc } from "../../../convex/_generated/dataModel";
import Cell, { CellProps } from "./cell";
import { Cell as CellType } from "../../engine/pieces";

export type BoardCellProps = CellProps & {
  rowIndex: number;
  columnIndex: number;
  displayedRowIndex: number;
  displayedColumnIndex: number;
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
  reverse?: boolean;
};

export const Board = ({
  game,
  cellComponent: CellComponent = defaultCellComponent,
  reverse = false,
}: BoardProps) => {
  return (
    <div className="flex flex-col aspect-square">
      {!reverse &&
        game.board.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex flex-row">
            {row.map((cell, columnIndex) => (
              <CellComponent
                key={`cell-${rowIndex}-${columnIndex}`}
                rowIndex={rowIndex}
                columnIndex={columnIndex}
                displayedRowIndex={rowIndex}
                displayedColumnIndex={columnIndex}
                cell={cell as CellType}
              />
            ))}
          </div>
        ))}
      {reverse &&
        zip(
          game.board.toReversed(),
          game.board.map((_, rowIndex) => rowIndex).toReversed()
        ).map(([row, rowIndex], displayedRowIndex) => {
          return (
            <div key={`row-${rowIndex}`} className="flex flex-row">
              {zip(
                row.toReversed(),
                row.map((_, columnIndex) => columnIndex).toReversed()
              ).map(([cell, columnIndex], displayedColumnIndex) => (
                <CellComponent
                  key={`cell-${displayedColumnIndex}-${displayedRowIndex}`}
                  rowIndex={rowIndex}
                  columnIndex={columnIndex}
                  displayedRowIndex={displayedRowIndex}
                  displayedColumnIndex={displayedColumnIndex}
                  cell={cell as CellType}
                />
              ))}
            </div>
          );
        })}
    </div>
  );
};

export default Board;
