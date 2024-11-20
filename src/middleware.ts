import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { fetchMutation } from "convex/nextjs";
import { NextResponse } from "next/server";
import { api } from "../convex/_generated/api";

const isProtectedRoute = createRouteMatcher(["/game(.*)", "/games(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
  const { getToken } = await auth();

  if (req.nextUrl.pathname === "/game") {
    const token = await getToken({ template: "convex" });
    const gameId = await fetchMutation(api.games.create, {}, { token: token! });
    await fetchMutation(api.games.join, { gameId }, { token: token! });

    return NextResponse.redirect(new URL(`/game/${gameId}`, req.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
