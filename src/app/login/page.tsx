"use client";

import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect to dashboard if logged in
  useEffect(() => {
    if (session) {
      router.push("/"); // redirect to dashboard
    }
  }, [session, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      {session ? (
        <p>Redirecting...</p>
      ) : (
        <>
          <button
            onClick={() => signIn("google")}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Sign in with Google
          </button>
        </>
      )}
    </div>
  );
}
