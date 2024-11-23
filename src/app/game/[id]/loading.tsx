import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <LoaderCircle className="animate-spin ~h-10/20 ~w-10/20" />
    </div>
  );
}
