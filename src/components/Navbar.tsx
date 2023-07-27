import Image from "next/image";
import Link from "next/link";
import style from "./Navbar.module.css";
import useUser from '@/hooks/useUser'

import { useRouter } from "next/navigation"
import { useSupabase } from "@/hooks/useSupabase"

export default function Navbar() {
  const router = useRouter()
  const supabase = useSupabase()
  const user = useUser()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <header className={style.navbar}>
      <div className={style.logo}>
        <Image
          src="/assets/mailGuard.webp"
          width={200}
          height={200}
          alt="Mail Guard logo"
        />
        <h1>Mail Guard</h1>
      </div>
      <ul className={style.links}>
        <li>
          <Link href={"/"}>Inicio</Link>
        </li>
        <li>
          <Link href={"/#testimonial"}>Testimonios</Link>
        </li>
        <li>
          <Link href={"/#doc"}>Planes</Link>
        </li>
        <li>
          <button>Ingresar</button>
        </li>
        {user && (
            <div>
              <Link href="/panel">
                <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Cuenta</button>
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

        <li>
          <Link href={"/dashboard"}>Dashboard</Link>
        </li>
      </ul>
    </header>
  );
}