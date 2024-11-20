import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/70 md:min-h-min flex items-center justify-center">
        <SignIn routing="hash" />
      </div>
    </main>
  );
};

export default SignInPage;
