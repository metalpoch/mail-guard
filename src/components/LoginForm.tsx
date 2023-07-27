import { useSupabase } from "@/hooks/useSupabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter()
  const supabase = useSupabase()

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.refresh()
  };

  return (
    <div>
      <h2 className="text-2xl mb-4"> Entrar </h2>
      <form className="space-y-4">
        <div className="flex flex-col">
          <label
            htmlFor="sign-in-email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Correo electrónico
          </label>
          <input
            id="sign-in-email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="email"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="sign-in-password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Contraseña
          </label>
          <input
            id="sign-in-password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="*********"
            type="password"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSignIn}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm