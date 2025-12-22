// src/pages/Home.tsx
import { Hero } from "../components/Hero";
import Concept from "../components/Concept";
import { Features } from "../components/Features";
import { TeamRoles } from "../components/TeamRoles";
import { Booking } from "../components/Bookings";
import Cta from "../components/Cta";

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center gap-32 bg-white">
      <Hero/>
      <Concept/>
      <Features/>
      <TeamRoles/>
      <Booking/>
      <Cta/>
    </div>
  );
}