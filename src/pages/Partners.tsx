// src/pages/Partners.tsx
import { motion } from "framer-motion";

const partnersData = [
  {
    name: "Vektor Labs",
    tagline: "Real-time decision pipelines for logistics",
    blurb:
      "Vektor Labs integrates deterministic routing with predictive ETA models to reduce delivery times and costs.",
  },
  {
    name: "Nimbus Health",
    tagline: "Clinical workflow automation",
    blurb:
      "Nimbus automates administrative tasks in hospitals, improving throughput while maintaining compliance and privacy.",
  },
  {
    name: "LedgerWave",
    tagline: "Fintech reconciliation & insights",
    blurb:
      "LedgerWave powers transaction reconciliation with ML-aided anomaly detection for enterprise finance teams.",
  },
  {
    name: "EchoAnalytics",
    tagline: "Customer behavior intelligence",
    blurb:
      "EchoAnalytics helps teams understand product usage with clean event pipelines and interpretable models.",
  },
  {
    name: "AstraNet",
    tagline: "Edge AI for remote monitoring",
    blurb:
      "AstraNet deploys compact models to edge devices and offers secure update orchestration for IoT fleets.",
  },
  {
    name: "StrataWorks",
    tagline: "Dataops & platform engineering",
    blurb:
      "StrataWorks brings well-architected data platforms and CI for ML to enterprise engineering teams.",
  },
];

export default function Partners(): React.ReactElement {
  return (
    <div className="w-full bg-white text-black">
      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-12 border-b border-black/10">
        <h1 className="text-5xl font-bold tracking-tight">Our Partners</h1>
        <p className="mt-6 text-lg max-w-3xl leading-relaxed text-black/70">
          We collaborate with an ecosystem of best-in-class partners to deliver full-stack,
          production-ready intelligence. Together we design, build, and scale solutions that
          transform operations and create measurable business impact.
        </p>
      </section>

      {/* PARTNER GRID */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-b border-black/10">
        <h2 className="text-3xl font-semibold tracking-tight mb-10">Strategic Partners</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {partnersData.map((p, idx) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: idx * 0.06 }}
              className="border border-black p-6 group hover:bg-black hover:text-white transition-colors duration-300"
              style={{ borderRadius: 0 }}
            >
              <div className="flex items-start gap-6">
                <div
                  aria-hidden
                  className="flex-none"
                  style={{ width: 72, height: 72 }}
                >
                  <svg
                    width="72"
                    height="72"
                    viewBox="0 0 72 72"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ display: "block" }}
                  >
                    <rect width="72" height="72" fill="#000" />
                    <text
                      x="50%"
                      y="50%"
                      dominantBaseline="middle"
                      textAnchor="middle"
                      fontFamily="sans-serif"
                      fontWeight="700"
                      fontSize="18"
                      fill="#fff"
                    >
                      {p.name.split(" ").map(w => w[0]).slice(0,2).join("")}
                    </text>
                  </svg>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold group-hover:text-white">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-black/70 group-hover:text-white/80">
                    {p.tagline}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-black/70 group-hover:text-white/90">
                    {p.blurb}
                  </p>

                  <div className="mt-6 flex gap-4">
                    <a
                      className="inline-block text-sm font-semibold border border-black px-4 py-2 hover:bg-white/0 group-hover:bg-white/0 transition-colors"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      style={{ borderRadius: 0 }}
                      aria-label={`Visit ${p.name}`}
                    >
                      View profile
                    </a>
                    <a
                      className="inline-block text-sm font-semibold px-4 py-2 hover:underline"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      style={{ borderRadius: 0 }}
                    >
                      Contact partner
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* TESTIMONIAL / CASE */}
      <section className="max-w-6xl mx-auto px-6 py-20 border-b border-black/10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="border border-black p-8 hover:bg-black hover:text-white transition-colors duration-300"
            style={{ borderRadius: 0 }}
          >
            <blockquote className="text-lg leading-relaxed text-black/80 group-hover:text-white/90">
              “Working with Parsemind and their partner ecosystem accelerated our roadmap
              by months. The integrated solution reduced manual reconciliation by 72%
              and gave our product team real-time insights.”
            </blockquote>
            <cite className="mt-6 block font-semibold text-black/70 group-hover:text-white/80">
              — Nikhil Rao, Head of Finance, Meridian Freight
            </cite>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="border border-black p-8"
            style={{ borderRadius: 0 }}
          >
            <h4 className="text-xl font-semibold mb-4">Partnership outcomes</h4>
            <ul className="space-y-4 text-black/70">
              <li>• 72% reduction in manual finance ops</li>
              <li>• 3× faster feature delivery via integrated pipelines</li>
              <li>• Improved observability and production stability</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div
          className="border border-black p-12 text-center hover:bg-black hover:text-white transition-colors duration-300"
          style={{ borderRadius: 0 }}
        >
          <h3 className="text-3xl font-semibold">Partner with Parsemind</h3>
          <p className="mt-4 text-black/70">
            If you’re building infrastructure, models, or enterprise software and want to
            collaborate on product integrations — we’d love to talk.
          </p>
          <div className="mt-8 flex justify-center gap-6">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="px-6 py-3 border border-black font-semibold text-sm hover:bg-white/0"
              style={{ borderRadius: 0 }}
            >
              Become a partner
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="px-6 py-3 border border-black font-semibold text-sm hover:bg-white/0"
              style={{ borderRadius: 0 }}
            >
              Explore integrations
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
