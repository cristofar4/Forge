import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Gallery } from "@/components/sections/Gallery";
import { Team } from "@/components/sections/Team";
import { Booking } from "@/components/sections/Booking";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Marquee } from "@/components/layout/Marquee";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Marquee />
      <Services />
      <Gallery />
      <Team />
      <Booking />
      <Testimonials />
      <Contact />
    </>
  );
}
