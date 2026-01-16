import { SignUp } from "@clerk/clerk-react";

export function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/30 flex items-center justify-center p-4">
      <SignUp 
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-2xl"
          }
        }}
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        afterSignUpUrl="/dashboard"
      />
    </div>
  );
}
