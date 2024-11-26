import { useState, forwardRef } from "react";
import { Button, ButtonProps } from "./ui/button";
import { cn } from "../lib/utils";
import { CheckIcon } from "@radix-ui/react-icons";
import { ClipboardIcon } from "lucide-react";

type CopyButtonProps = ButtonProps;

const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  (props, ref) => {
    const [hasCopied, setHasCopied] = useState(false);

    return (
      <Button
        ref={ref}
        {...props}
        className={cn("", props.className)}
        onClick={(e) => {
          props.onClick?.(e);
          setHasCopied(true);
        }}
      >
        {hasCopied ? (
          <CheckIcon className="h-3 w-3" />
        ) : (
          <ClipboardIcon className="h-3 w-3" />
        )}
      </Button>
    );
  }
);

export default CopyButton;
