import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../components/sections/Hero';
import { Videotvorba } from '../components/sections/Videotvorba';
import { Portfolio } from '../components/sections/Portfolio';
import { About } from '../components/sections/About';
import { Contact } from '../components/sections/Contact';

export const VideoPage = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <Header />
      <main>
        <Hero />
        <Videotvorba />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};
