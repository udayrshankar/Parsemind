import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

const blogs = [
  {
    id: 1,
    title: "The Future of Agentic AI",
    date: "April 24, 2024",
    readTime: "8 min read",
    excerpt:
      "How autonomous AI agents are transforming enterprise workflows, orchestration, and decision-making beyond traditional chat-based systems.",
    imageColor:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWklMjBBZ2VudHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: 2,
    title: "Scaling Trust and Security in AI Systems",
    date: "April 03, 2024",
    readTime: "6 min read",
    excerpt:
      "Why SOC 2 is only the starting point - and how enterprises design secure, compliant, and trustworthy AI infrastructure at scale.",
    imageColor:
      "https://images.unsplash.com/photo-1496368077930-c1e31b4e5b44?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2VjdXJpdHl8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    title: "Data Pipelines 2.0",
    date: "March 12, 2024",
    readTime: "7 min read",
    excerpt:
      "Turning unstructured enterprise data into AI-ready intelligence through modern data pipeline and infrastructure design.",
    imageColor:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RGF0YXxlbnwwfHwwfHx8MA%3D%3D",
  },
];

export const Blogs = () => {
  return (
    <section className="px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header --- */}
        <div className="flex justify-center text-center mb-5">
          <Reveal>
            <span className="text-text-body uppercase">
              Enterprise AI Insights
            </span>
            <h2 className="type-h2 text-text-main">
              The Journal
            </h2>
          </Reveal>
        </div>

        {/* --- Blog Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -10 }}
                className="group cursor-pointer flex flex-col h-[590px] shadow shadow-5xl shadow-black/25 bg-bg-card hover:bg-black transition-all duration-500 ease-out hover:border-black/50 overflow-hidden"
              >
                
                {/* Image */}
                <div className="overflow-hidden mb-6 p-2 h-[300px] relative">
                  <div className="w-full h-full relative transition-transform duration-700 group-hover:scale-105">
                    <img
                      src={blog.imageColor}
                      alt={blog.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-tr from-black/5 to-transparent" />
                  </div>
                </div>

                {/* Content */}
                <a className="flex flex-col grow px-5" href="/blogs">
                  <h3 className="type-h2 text-[35px] mb-3 group-hover:text-white transition-colors duration-500">
                    {blog.title}
                  </h3>

                  <div className="text-sm text-gray-400 mb-4 font-medium uppercase tracking-wide group-hover:text-gray-500 transition-colors duration-500">
                    {blog.date} • {blog.readTime}
                  </div>

                  <p className="type-body-main group-hover:text-gray-400 transition-colors duration-500">
                    {blog.excerpt}
                  </p>
                </a>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
