import Navbar from "./components/Navbar";
import Introduction from "./components/Introduction";
import Testimonial from "./components/Testimonial";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import useUser from '@/hooks/useUser'

export default function Home() {
  const user = useUser()

  return (
    <>
      <Navbar />
      <main>
        <Introduction />
        <Testimonial />
        {!user && <LoginForm />}
        {!user && <RegisterForm />}
      </main>
    </>
  );
}
