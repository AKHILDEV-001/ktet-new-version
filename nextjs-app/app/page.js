'use client';

import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user, openLoginModal, logout } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex w-full justify-between items-center mb-8">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />

          {/* Auth Status & Controls */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                {user.photoURL && (
                  <img
                    src={user.photoURL}
                    alt={user.displayName}
                    className="w-8 h-8 rounded-full border border-gray-200"
                  />
                )}
                <div className="text-sm">
                  <p className="font-medium text-gray-900 dark:text-gray-100">{user.displayName}</p>
                  <button
                    onClick={logout}
                    className="text-xs text-red-500 hover:text-red-600"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={openLoginModal}
                className="rounded-full bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            KTET Quiz App
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Phase 2: Authentication & User Context
          </p>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-100 dark:bg-zinc-900 dark:border-zinc-800">
            <h3 className="font-medium text-purple-900 dark:text-purple-300 mb-2">Current Status:</h3>
            <p className="text-sm text-purple-700 dark:text-purple-400">
              {user ? `✅ Authenticated as ${user.email}` : '❌ Not Authenticated'}
            </p>
            {user && (
              <p className="text-xs text-gray-500 mt-2">
                UID: {user.uid}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row mt-8">
          <button
            onClick={openLoginModal}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
          >
            Test Login Modal
          </button>
        </div>
      </main>
    </div>
  );
}
