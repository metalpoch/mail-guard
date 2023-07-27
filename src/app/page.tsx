"use client"

import { useRouter } from "next/navigation"
import { useSupabase } from "@/hooks/useSupabase"
import Link from "next/link";
import useUser from '@/hooks/useUser'

import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";

export default function Home() {
  const router = useRouter()
  const supabase = useSupabase()
  const user = useUser()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <main className="flex flex-col min-h-screen p-10 lg:p-24 lg:gap-x-10 gap-y-10 max-w-screen-lg">
      <div className="flex justify-between">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-6xl">
          MailGuard :)
        </h1>
        <div>
          {user && (
            <div>
              <Link href="/panel">
                <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Cuenta</button>
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
              >
                Salir
              </button>
            </div>
          )}
        </div>
      </div>
      {!user && <LoginForm />}
      {!user && <RegisterForm />}
    </main>
  );
}
