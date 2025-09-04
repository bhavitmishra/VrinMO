import AppBar from "@repo/ui/Appbar";
import { getServerSession } from "next-auth";
import { Auth } from "./lib/auth";
export default async function () {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <AppBar />
      <main className="flex flex-1 justify-center px-6 lg:px-16">
        <div className="relative w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          {/* LEFT bluish section (extended width) */}
          <div className="absolute left-0 top-0 bottom-0 w-[65%] bg-blue-50 rounded-r-3xl z-0" />

          {/* LEFT CONTENT */}
          <div className="relative z-10 p-12 md:p-16 space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Pay friends. <br /> Pay for everything.
            </h1>
            <p className="text-lg text-gray-700 max-w-md">
              Easily send money to your friends and pay for everything you
              want—online, in-store, or with your Venmo account.
            </p>
            <button className="mt-6 px-8 py-4 bg-blue-600 text-white rounded-full text-lg font-semibold shadow-md hover:bg-blue-700 transition"></button>
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
              <source
                src="https://videos.ctfassets.net/gkyt4bl1j2fs/176XGHpVphvQPk4FesazHF/0c326c29fea1645bd0a1b63e924f1854/venmo-everything-home.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </main>
    </div>
  );
}
