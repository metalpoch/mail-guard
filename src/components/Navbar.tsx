import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./Navbar.module.css";
import Modal from "@/components/Modal";

import { useRouter } from "next/navigation";
import { useSupabase } from "@/hooks/useSupabase";

interface Props {
  user: object | null;
}

export default function Navbar({ user }: Props) {
  const [modal, setModal] = useState("");
  const router = useRouter();
  const supabase = useSupabase();

  const handleOpen = (view: string) => setModal(view);
  const handleClose = () => setModal("");

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  return (
    <>
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
            <Link href={"/#testimonials"}>Testimonios</Link>
          </li>
          <li>
            <Link href={"/#pricing"}>Planes</Link>
          </li>

          {!user ? (
            <>
              <li>
                <button onClick={() => handleOpen("signin")}>Ingresar</button>
              </li>
              <li>
                <button onClick={() => handleOpen("signup")}>Registrar</button>
              </li>
            </>
          ) : (
            <div>
              <Link href="/dashboard">
                <button
                  type="button"
                  className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                >
                  Cuenta
                </button>
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
        </ul>
      </header>
      {modal && <Modal modal={modal} handle={handleClose} />}
    </>
  );
}
