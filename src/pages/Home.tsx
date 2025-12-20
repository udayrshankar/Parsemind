// src/pages/Home.tsx
import { Hero } from "../components/Hero";
import Concept from "../components/Concept";
import { Features } from "../components/Features";
import { TeamRoles } from "../components/TeamRoles";
import { CaseStudies } from "../components/CaseStudies"; 
import { Booking } from "../components/Bookings";
import { Blogs } from "../components/Blogs";
import Cta from "../components/Cta";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center gap-32 bg-white">
      <Hero/>
      <Concept/>
      <Features/>
      <TeamRoles/>
      <CaseStudies/>
      <Booking/>
      <Blogs/>
      <Cta/>
    </div>
  );
}