// Example usage in src/App.jsx
import { Hero } from "../components/Hero";
import { GridDebug } from "../components/GridDebug";
import { Navbar } from "../components/Navbar";
import Concept from "../components/Concept";
import { Features } from "../components/Features";
import { TeamRoles } from "../components/TeamRoles";
import { CaseStudies } from "../components/CaseStudies"; 
import { Booking } from "../components/Bookings";
import { Blogs } from "../components/Blogs";
import { Footer } from "../components/Footer";
import { TransitionProvider } from "../components/TransitionContext";

export default function App() {
  return (
    <div className="w-full flex flex-col items-center gap-16 bg-white">

      <GridDebug/>
      <TransitionProvider>
        <Navbar/>
        <Hero/>
        <Concept/>
        <Features/>
        <TeamRoles/>
        <CaseStudies/>
        <Booking/>
        <Blogs/>
        <Footer/>
      </TransitionProvider>
    </div>

  );
}
