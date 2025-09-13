"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Button() {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Decide button text
  const login = status === "loading" ? true : !session;

  const handleClick = () => {
    if (session) {
      router.push("/home"); // if logged in, go to dashboard
    } else {
      router.push("/signin"); // otherwise, go to signin
    }
  };

  return (
    <button
      onClick={handleClick}
      className="mt-6 px-8 py-4 bg-blue-600 text-white rounded-full text-lg font-semibold shadow-md hover:bg-blue-700 transition"
    >
      {status === "loading"
        ? "Loading..."
        : session
          ? "Go to Dashboard"
          : "Get Started"}
    </button>
  );
}
