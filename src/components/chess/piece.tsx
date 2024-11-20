import clsx from "clsx";
import { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react";
import { fromIdToPiece, type Piece } from "../../engine/pieces";

export type PieceProps = {
  id: Piece;
  rowIndex: number;
  columnIndex: number;
};

const Piece = forwardRef<
  HTMLDivElement,
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
>((props, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={clsx("z-10 aspect-square text-8xl", props.className)}
    >
      {fromIdToPiece(props.id as Piece)}
    </div>
  );
});

export default Piece;
