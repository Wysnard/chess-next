import { useConvexAuth, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";

export function useCurrentUser() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const { user } = useUser();
  const currentUser = useQuery(api.users.current);
  // Combine the authentication state with the user existence check
  return {
    currentUser: { ...currentUser, ...user },
    isLoading: isLoading || (isAuthenticated && currentUser === null),
    isAuthenticated: isAuthenticated && currentUser !== null,
  };
}
