// src/components/Concept.tsx
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { Reveal } from './Reveal';

// Images
import discoverImage from '../assets/markus-spiske-jG8nlwLRZTM-unsplash.jpg';
import developImage from '../assets/nadine-e-VA9xSQekC8c-unsplash.jpg';
import deployImage from '../assets/premium_photo-1681488265680-dccd1c52d8a8.jpg';
import scaleImage from '../assets/premium_photo-1681488265680-dccd1c52d8a8.jpg';

const steps = [
  {
    title: 'Discover',
    desc: 'Identify where agentic AI creates real business leverage by aligning objectives, workflows, data readiness, and ROI.',
    tableKey: 'discover',
  },
  {
    title: 'Develop',
    desc: 'Design and engineer custom agentic systems aligned to real enterprise workflows and standards.',
    tableKey: 'develop',
  },
  {
    title: 'Deploy',
    desc: 'Launch securely into production with full control, observability, and compliance.',
    tableKey: 'deploy',
  },
  {
    title: 'Scale',
    desc: 'Continuously expand and govern agent systems across teams with performance and visibility.',
    tableKey: 'scale',
  },
];

const tabContent = {
  discover: {
    title: 'Enterprise AI Strategy and Discovery',
    bullets: [
      'Assess critical business processes and operational bottlenecks',
      'Identify high-impact AI agent use cases with measurable ROI',
      'Evaluate data maturity, system dependencies, and risk exposure',
      'Define success metrics, governance models, and ownership',
    ],
    buttonText: 'Initiate AI Strategy Assessment',
    image: discoverImage,
  },
  develop: {
    title: 'Engineering Purpose-Built AI Agents',
    bullets: [
      'Architect agent systems with planning, reasoning, memory, and tools',
      'Build domain-specific agents aligned to business logic and policies',
      'Integrate securely with internal platforms, APIs, and proprietary data',
      'Implement observability, escalation paths, and human oversight',
    ],
    buttonText: 'Design AI Architecture',
    image: developImage,
  },
  deploy: {
    title: 'Production-Grade Deployment',
    bullets: [
      'Deploy agents with role-based access control and auditability',
      'Secure data flows, model access, and inference pipelines',
      'Implement CI/CD, monitoring, and performance management',
      'Align deployments with enterprise security and compliance standards',
    ],
    buttonText: 'Deploy into Production',
    image: deployImage,
  },
  scale: {
    title: 'Enterprise-Scale AI Operations',
    bullets: [
      'Extend agent adoption across teams, units, and geographies',
      'Optimize performance, cost efficiency, and system resilience',
      'Establish governance for agent lifecycle, versioning, and control',
      'Drive continuous improvement through feedback and data intelligence',
    ],
    buttonText: 'Scale Across the Enterprise',
    image: scaleImage,
  },
};

type TabKey = 'discover' | 'develop' | 'deploy' | 'scale';

export default function Concept() {
  const [activeTab, setActiveTab] = useState<TabKey>('discover');
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="w-full flex flex-col items-center gap-16 bg-white">

      {/* --- SECTION 1: Steps Grid --- */}
      <section id="process" className="w-full px-6 md:px-12">
        <div className="max-w-7xl mx-auto" ref={containerRef}>
          <div className="text-center flex flex-col items-center mb-12 md:mb-16">
            <Reveal>
              <span className="text-gray-500 uppercase tracking-[0.2em] mb-3 block text-xs font-bold font-inter">
                End-to-end execution
              </span>
              <h2 className="text-4xl md:text-5xl font-fraunces font-medium text-black">
                From Concept to Deployment — and Beyond
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {steps.map((step, index) => (
              <Reveal key={index} delay={index * 0.1}>
                <div
                  className="
                    group relative
                    bg-bg-card border border-gray-100
                    p-4 md:px-6
                    hover:bg-black hover:text-white
                    transition-colors duration-500 ease-out
                    overflow-hidden
                    cursor-pointer
                    flex flex-col justify-between
                    h-60 md:h-[220px]
                  "
                  onMouseEnter={() => setActiveTab(step.tableKey as TabKey)}
                  onClick={() => setActiveTab(step.tableKey as TabKey)}
                >
                  <span
                    className="
                      absolute -bottom-8 -right-2
                      text-[8rem] md:text-[9rem]
                      font-bold leading-none
                      text-black opacity-[0.03]
                      group-hover:text-white group-hover:opacity-[0.1]
                      transition-all duration-500
                      pointer-events-none select-none
                      font-inter
                    "
                  >
                    {index + 1}
                  </span>

                  <div className="relative z-10 flex flex-col gap-4">
                    <h3 className="text-2xl font-semibold">
                      {step.title}
                    </h3>
                    <p className="text-base text-gray-500 leading-relaxed font-inter group-hover:text-gray-300 transition-colors">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 2: Tabbed Content --- */}
      <section className="w-full px-4 md:px-6">
        <div className="max-w-7xl mx-auto">

          {/* Tabs */}
          <div className="flex justify-center mb-[-26px] relative z-20">
            <div className="bg-white/90 backdrop-blur-md p-1.5 rounded-full inline-flex gap-1 border border-gray-200 shadow-xl">
              {(['discover', 'develop', 'deploy', 'scale'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-6 py-2.5 rounded-full text-sm md:text-base font-medium font-inter transition-all
                    ${activeTab === tab ? 'text-white' : 'text-gray-500 hover:text-black hover:bg-gray-50'}`}
                >
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-black rounded-full"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 capitalize">{tab}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Content Card */}
          <div className="bg-[#f7f8fa] border border-gray-200 rounded-3xl p-6 md:p-12 lg:p-16 shadow-2xl min-h-[560px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full"
              >
                <div>
                  <h2 className="text-3xl md:text-4xl font-fraunces mb-6">
                    {tabContent[activeTab].title}
                  </h2>

                  <ul className="space-y-5 mb-8">
                    {tabContent[activeTab].bullets.map((item, i) => (
                      <li key={i} className="flex gap-4">
                        <div className="mt-1 w-5 h-5 rounded-full bg-black flex items-center justify-center">
                          <Check size={12} className="text-white" strokeWidth={3} />
                        </div>
                        <p className="text-gray-600 font-inter leading-relaxed">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ul>

                  <button className="bg-black text-white px-8 py-4 rounded-full font-medium font-inter hover:bg-gray-800 transition">
                    {tabContent[activeTab].buttonText}
                  </button>
                </div>

                <div className="w-full aspect-video rounded-xl overflow-hidden shadow-xl">
                  <img
                    src={tabContent[activeTab].image}
                    alt={tabContent[activeTab].title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
