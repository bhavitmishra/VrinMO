"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

// (Your SVG icons remain the same)
const GoogleIcon = () => (
  <svg className="ui:w-5 ui:h-5" viewBox="0 0 48 48">
    <path
      fill="#FFC107"
      d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
    ></path>
    <path
      fill="#FF3D00"
      d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"
    ></path>
    <path
      fill="#4CAF50"
      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
    ></path>
    <path
      fill="#1976D2"
      d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 36.49 44 30.638 44 24c0-1.341-.138-2.65-.389-3.917z"
    ></path>
  </svg>
);
const GitHubIcon = () => (
  <svg className="ui:w-5 ui:h-5" fill="currentColor" viewBox="0 0 24 24">
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.65.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"
      clipRule="evenodd"
    />
  </svg>
);

export function Card({
  Heading,
  Sign,
  i1,
  b1,
  b2,
}: {
  Heading: string;
  Sign: string;
  i1: boolean;
  b1: string;
  b2: string;
}) {
  // --- MINIMAL CHANGES START HERE ---

  // 1. Fixed phone state to be a string
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState(false);
  // 2. Removed 'google' and 'github' state as they are not needed

  // 3. Modified submitHandler to accept a 'provider' argument
  async function submitHandler(provider: string) {
    console.log(provider);

    setWarning(false); // Reset warning on new submission

    // Logic for credentials
    if (provider === "credentials") {
      if (phone === "" || password === "") {
        setWarning(true);
        return;
      }
      signIn("credentials", { phone, password, callbackUrl: "/home" });
    } else {
      // Logic for any other provider (Google, GitHub, etc.)
      signIn(provider, { callbackUrl: "/home" });
    }
  }

  // --- MINIMAL CHANGES END HERE ---

  return (
    <div className="ui:flex ui:justify-center ui:items-center ui:h-screen">
      <div className="ui:flex ui:flex-col ui:items-center ui:gap-4 ui:w-90 ui:bg-white ui:p-8 ui:rounded-lg ui:shadow-lg">
        <div className="ui:text-blue-500 ui:font-extrabold ui:text-3xl">
          {Heading}
        </div>
        {warning && (
          <div className="ui:text-red-600">Enter Correct Credentials</div>
        )}

        <div className="ui:font-bold ui:text-xl">{Sign}</div>

        {i1 ? (
          <div className="ui:flex ui:flex-col ui:gap-2 ui:w-full">
            <input
              type="tel"
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              className="ui:border ui:border-gray-300 ui:rounded ui:p-2 ui:w-full"
            />
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="ui:border ui:border-gray-300 ui:rounded ui:p-2 ui:w-full"
            />
            <button
              className="ui:bg-blue-500 ui:text-white ui:py-2 ui:px-4 ui:rounded-3xl ui:w-full hover:ui:bg-blue-600"
              // 4. Call handler with 'credentials' identifier
              onClick={() => submitHandler("credentials")}
            >
              Sign in
            </button>
          </div>
        ) : (
          <div className="ui:flex ui:flex-col ui:gap-3 ui:w-full">
            <button
              className="ui:bg-white ui:text-gray-700 ui:py-2 ui:px-4 ui:rounded-3xl ui:w-full hover:ui:bg-gray-100 ui:border ui:flex ui:items-center ui:justify-center ui:gap-2"
              // 5. Call handler directly with the provider from props
              onClick={() => submitHandler(b1)}
            >
              <GoogleIcon />
              Sign in with {b1}
            </button>
            <button
              className="ui:bg-gray-800 ui:text-white ui:py-2 ui:px-4 ui:rounded-3xl ui:w-full hover:ui:bg-gray-900 ui:flex ui:items-center ui:justify-center ui:gap-2"
              // 6. Call handler directly with the provider from props
              onClick={() => submitHandler(b2)}
            >
              <GitHubIcon />
              Sign in with {b2}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
