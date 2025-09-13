// app/your-page/page.tsx
"use server";
import { getServerSession } from "next-auth";
import Button from "../components/Button";

export default async function Page() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* MAIN HERO */}
      <main className="flex flex-1 justify-center px-6 lg:px-16">
        <div className="relative w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          {/* LEFT bluish background */}
          <div className="absolute left-0 top-0 bottom-0 w-[65%] bg-blue-50 rounded-r-3xl z-0" />

          {/* LEFT CONTENT */}
          <div className="relative z-10 p-12 md:p-16 space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Pay friends. <br /> Pay for everything.
            </h1>
            <p className="text-lg text-gray-700 max-w-md">
              Easily send money to your friends and pay for everything you
              want—online, in-store, or with your Vrinmo account.
            </p>
            <Button />
          </div>

          {/* RIGHT: Video */}
          <div className="relative flex justify-center z-10">
            <video
              className="rounded-3xl shadow-2xl w-full max-w-md md:max-w-lg"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/FinalVrinmo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </main>

      {/* FEATURES SECTION */}
      <section className="py-20 bg-white px-6 lg:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-4">💸 Instant Transfers</h3>
            <p className="text-gray-600">Send and receive money in seconds.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">
              🔒 Bank-Level Security
            </h3>
            <p className="text-gray-600">
              Your payments are safe and protected.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">🌍 Pay Anywhere</h3>
            <p className="text-gray-600">
              Works online, in-store, or with friends.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-blue-50 px-6 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="text-4xl mb-4">1️⃣</div>
              <h3 className="font-semibold">Create an Account</h3>
              <p className="text-gray-600">
                Sign up quickly with your email or phone.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">2️⃣</div>
              <h3 className="font-semibold">Link Payment Method</h3>
              <p className="text-gray-600">
                Add your bank account or card securely.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-4">3️⃣</div>
              <h3 className="font-semibold">Start Paying</h3>
              <p className="text-gray-600">Send and receive money instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 bg-gray-900 text-gray-400 text-center">
        <p>© {new Date().getFullYear()} Vrinmo. All rights reserved.</p>
        <div className="mt-4 flex justify-center gap-6">
          <a href="#" className="hover:text-white">
            Privacy
          </a>
          <a href="#" className="hover:text-white">
            Terms
          </a>
          <a href="#" className="hover:text-white">
            Support
          </a>
        </div>
      </footer>
    </div>
  );
}
