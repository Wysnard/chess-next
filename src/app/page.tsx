import Link from "next/link";
import { Button } from "../components/ui/button";
import LoadingDialog from "../components/loading-dialog";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="@container min-h-[100vh] flex-1 rounded-xl bg-muted md:min-h-min flex flex-col">
        <div className="min-h-[90vh] flex flex-col gap-4 p-4 justify-center items-center">
          <div className="~@/lg:~text-4xl/6xl font-black">
            Welcome to Chess Next
          </div>
          <div className="text-sm">
            Chess Next is a demo online chess game web app built with
            Typescript, Next.js, Tailwind, React DnD, Convex, Clerk and Vitest.
          </div>
        </div>
        <div className="flex flex-col gap-4 p-4">
          <LoadingDialog>
            <Button asChild>
              <Link href="/game">Create a new game</Link>
            </Button>
          </LoadingDialog>
        </div>
      </div>
    </main>
  );
}
