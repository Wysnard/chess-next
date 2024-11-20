import clsx from "clsx";
import { forwardRef } from "react";

export type CellProps = {
  children?: React.ReactNode;
};

const Cell = forwardRef<
  HTMLDivElement,
  CellProps & React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={clsx(
        `h-full w-full aspect-square flex items-center justify-center relative`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export default Cell;