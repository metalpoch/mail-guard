"use client"

import { useSupabase } from "@/hooks/useSupabase"
import { useRouter } from "next/navigation"
import useUser from "@/hooks/useUser"

export default function Panel() {
  const user = useUser()
  const supabase = useSupabase()
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.replace("/")
  };

  if (!user) {
    router.replace("/")
  }

  return (
    <main className="flex flex-col min-h-screen p-10 lg:p-24 lg:gap-x-10 gap-y-10 max-w-screen-lg">
      <div className="flex justify-between">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-6xl">
          Cuenta
        </h1>
        <button
          type="button"
          onClick={handleSignOut}
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        >
          Salir
        </button>
      </div>
      {user && <div>user: {user.email}</div>}
    </main>
  );
}
