import { useSupabase } from "@/hooks/useSupabase"
import { useRouter } from "next/navigation"
import { useState } from "react"

function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setpasswordConfirmation] = useState("")

  const router = useRouter()
  const supabase = useSupabase()

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    router.refresh()
  };

  return (
    <div>
      <h2 className="text-2xl mb-4"> Registrarse </h2>
      <form className="space-y-4">
        <div className="flex flex-col">
          <label
            htmlFor="sign-up-email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Correo electrónico
          </label>
          <input
            id="sign-up-email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            value={email}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="sign-up-password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Contraseña
          </label>
          <input
            id="sign-up-password"
            placeholder="*********"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            value={password}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="sign-up-password-confirmation"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Confirmar contraseña
          </label>
          <input
            id="sign-up-password-confirmation"
            placeholder="*********"
            type="password"
            onChange={(e) => setpasswordConfirmation(e.target.value)}
            name="passwordConfirmation"
            value={passwordConfirmation}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSignUp}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm