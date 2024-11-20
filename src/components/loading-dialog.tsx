import { LoaderCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function LoadingDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Creating your game...</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-4 aspect-square">
          <LoaderCircle className="animate-spin text-primary h-20 w-20" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
