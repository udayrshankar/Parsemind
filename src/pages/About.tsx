import React from "react";
import { motion } from "framer-motion";
import { Users, Flag, CheckSquare } from "lucide-react";
import { Link } from "react-router-dom";

// AboutPage.tsx
// Single-file React component (Tailwind CSS). White background, black hover states, NO rounded corners.
// Default export a React component. Use in your app as <AboutPage />.

type Person = {
  name: string;
  role: string;
  bio: string;
  img?: string; // optional avatar URL
};

const team: Person[] = [
  {
    name: "Sudharshan Bala",
    role: "Founder & CEO",
    bio: "Leads product strategy and design. 10+ years building delightful interfaces.",
  },
  {
    name: "KG Goutham",
    role: "Head of Engineering",
    bio: "Scales systems and teams. Loves clean APIs and reliable infra.",
  },
  {
    name: "Nisha Varma",
    role: "Head of Growth",
    bio: "Drives adoption and partnerships with creative GTM plays.",
  },
];



export default function AboutPage(): React.ReactElement {
  return (
    <div className="min-h-screen text-black antialiased relative overflow-hidden bg-white">
      {/* Subtle interactive background */}
      <style>{`@keyframes bgFade { 0% { opacity: 0; } 10% { opacity: 0.9 } 33% { opacity: 0.9 } 43% { opacity: 0 } 100% { opacity: 0 } } .bg-layer { position: absolute; inset: 0; background-position: center; background-size: cover; mix-blend-mode: multiply; opacity: 0; will-change: opacity; }
        `}</style>
      
      {/* Top hero */}
      

      <main className="max-w-7xl mx-auto px-6 py-30">
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">We design bold products and build dependable systems.</h1>
            <p className="mt-6 text-lg max-w-prose">We’re an interdisciplinary team that blends design, engineering, and strategy to craft products that scale. We believe simplicity is the highest sophistication — and we make things that people actually want to use.</p>

            <div className="mt-8 flex gap-4 flex-wrap">
              <a className="inline-block py-3 px-6 font-medium cursor-pointer hover:bg-black hover:text-white transition-all border border-black/5">Work with us</a>
              <Link className="inline-block py-3 px-6 font-medium cursor-pointer hover:bg-black hover:text-white transition-all border border-black/5" to="#solution">See our work</Link>
            </div>
          </div>
          <img src="https://www.ema.co/_next/image?url=https%3A%2F%2Fheroic-chocolate-319b05815e.media.strapiapp.com%2Fblog1_3a2ef6f843.png&w=1920&q=75" alt="" />

          
        </motion.section>

        {/* Mission & Values */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-xl font-semibold">Our mission</h3>
            <p className="mt-3">Create reliable, human-centered software that simplifies complex problems and amplifies impact.</p>
          </div>

          <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: <Flag className="inline-block mr-3" />, title: "Clarity", desc: "We obsess over clear outcomes and measurable impact." },
              { icon: <Users className="inline-block mr-3" />, title: "Collaboration", desc: "Cross-discipline teams unlock better solutions." },
              { icon: <CheckSquare className="inline-block mr-3" />, title: "Craft", desc: "We sweat the details that make products feel premium." },
              { icon: <Users className="inline-block mr-3" />, title: "Sustainability", desc: "We design for longevity, not short-term wins." },
            ].map((v, i) => (
              <motion.article
                key={i}
                whileHover={{ scale: 1.02 }}
                className="p-6 border hover:bg-black hover:text-white transition-all"
                style={{ borderWidth: '1px' }}
              >
                <div className="flex items-start gap-3">
                  <div className="text-xl">{v.icon}</div>
                  <div>
                    <h4 className="font-medium text-base">{v.title}</h4>
                    <p className="mt-1 text-sm">{v.desc}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="mt-20">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">The Team</h2>
            <div className="text-sm">{team.length} people</div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {team.map((p) => (
              <motion.div
                key={p.name}
                whileHover={{ y: -6 }}
                className="p-6 border transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-black/5 flex items-center justify-center font-semibold">{p.name.split(" ").map(n => n[0]).slice(0,2).join("")}</div>
                  <div>
                    <div className="font-medium">{p.name}</div>
                    <div className="text-sm mt-1">{p.role}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm">{p.bio}</p>
               
              </motion.div>
            ))}
          </div>
        </section>

        

       
      </main>

      
    </div>
  );
}
