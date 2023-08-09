import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./Navbar.module.css";
import Modal from "@/components/Home/Modal";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/supabase-client";
import { Profile } from "@/lib/api.types";

interface Props {
  user: object | null;
  profile: Profile | null;
}

export default function Navbar({ user, profile }: Props) {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState("");
  const router = useRouter();

  const handleNavbar = () => setOpen(!open);
  const handleOpen = (view: string) => setModal(view);
  const handleClose = () => setModal("");
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
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
        <ul
          className={`${style.links} ${
            open &&
            style.show + " animate__animated animate__faste animate__fadeInLeft"
          }`}
        >
          <li>
            <Link href={"/"} replace={true} prefetch={true}>
              Inicio
            </Link>
          </li>
          <li>
            <Link href={"/#testimonials"} replace={true} prefetch={true}>
              Testimonios
            </Link>
          </li>
          <li>
            <Link href={"/#pricing"} replace={true} prefetch={true}>
              Planes
            </Link>
          </li>
          <li>
	    <Link
	      target="_blank"
              href={
                "https://github.com/metalpoch/mail-guard/blob/main/src/docs/API.md"
              }
            >
              Documentación
            </Link>
          </li>
          {user && profile?.plan_id !== 1 && (
            <li>
              <Link href={"/support"}>Soporte</Link>
            </li>
          )}

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
        <button className={style.btn} onClick={handleNavbar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="34"
            height="34"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="white"
              stroke-dasharray="24"
              stroke-dashoffset="24"
              stroke-linecap="round"
              stroke-width="2"
            >
              <path d="M5 5H19">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  dur="0.2s"
                  values="24;0"
                />
              </path>
              <path d="M5 12H19">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.2s"
                  dur="0.2s"
                  values="24;0"
                />
              </path>
              <path d="M5 19H19">
                <animate
                  fill="freeze"
                  attributeName="stroke-dashoffset"
                  begin="0.4s"
                  dur="0.2s"
                  values="24;0"
                />
              </path>
            </g>
          </svg>
        </button>
      </header>
      {modal && <Modal modal={modal} handle={handleClose} />}
    </>
  );
}
