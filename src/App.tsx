import { useState } from "react";
import IntroSequence from "./components/IntroSequence";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import History from "./components/History";
import Events from "./components/Events";
import Achievements from "./components/Achievements";
import Blogs from "./components/Blogs";
import Members from "./components/Members";
import Footer from "./components/Footer";
import { useLenis } from "./hooks/useLenis";

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  useLenis(introDone);

  return (
    <>
      {!introDone && <IntroSequence onDone={() => setIntroDone(true)} />}
      {introDone && (
        <>
          <CustomCursor />
          <Navbar />
          <main>
            <Hero />
            <About />
            <Events />
            <History />
            <Achievements />
            <Blogs />
            <Members />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
