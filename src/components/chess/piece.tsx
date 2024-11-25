import { DetailedHTMLProps, forwardRef, HTMLAttributes } from "react";
import { fromIdToPiece, type Piece } from "../../engine/pieces";
import { mytwMerge } from "../../lib/utils";

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
      className={mytwMerge(
        "z-10 aspect-square ~@[3rem]/[8rem]:~text-[3.2rem]/9xl text-black",
        props.className
      )}
    >
      {fromIdToPiece(props.id as Piece)}
    </div>
  );
});

export default Piece;
