// src/App.tsx
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Partners = lazy(() => import("./pages/Partners"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App(): React.ReactElement {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main>
        <Suspense fallback={<div className="p-8 text-center text-gray-300">Loading…</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
