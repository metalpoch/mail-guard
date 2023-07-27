import Navbar from "./components/Navbar";
import Introduction from "./components/Introduction";
import Testimonial from "./components/Testimonial";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Introduction />
        <Testimonial />
      </main>
    </>
  );
}
