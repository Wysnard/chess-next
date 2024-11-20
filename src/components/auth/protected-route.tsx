import { SignedIn, SignedOut } from "@clerk/nextjs";
import SignInPage from "./signin-page";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        <SignInPage />
      </SignedOut>
    </>
  );
};

export default ProtectedRoute;
