import { motion } from 'framer-motion';
import { Reveal } from './Reveal';

// Import images if you have them, otherwise use placeholders
// import blog1 from '../assets/blog-1.png';

const blogs = [
  {
    id: 1,
    title: "The Future of Agentic AI",
    date: "April 24, 2024",
    readTime: "5 min read",
    excerpt: "Discover how autonomous agents are reshaping enterprise workflows and reducing operational.",
    imageColor: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YWklMjBBZ2VudHxlbnwwfHwwfHx8MA%3D%3D"
  },
  {
    id: 2,
    title: "Scaling Trust & Security",
    date: "April 03, 2024",
    readTime: "4 min read",
    excerpt: "Why SOC2 compliance is just the starting point for building truly secure AI infrastructure.",
    imageColor: "https://images.unsplash.com/photo-1496368077930-c1e31b4e5b44?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8U2VjdXJpdHl8ZW58MHx8MHx8fDA%3D"
  },
  {
    id: 3,
    title: "Data Pipelines 2.0",
    date: "March 12, 2024",
    readTime: "6 min read",
    excerpt: "Turning unstructured data lakes into structured goldmines for your custom models.",
    imageColor: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RGF0YXxlbnwwfHwwfHx8MA%3D%3D"
  }
];

export const Blogs = () => {
  return (
    <section className="px-6 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header --- */}
        <div className="flex justify-center text-center mb-16">
          <Reveal>
            <span className="text-text-body uppercase">
              Read More
            </span>
            <h2 className="type-h2 text-text-main">
              Blogs
            </h2>
          </Reveal>
        </div>

        {/* --- Blog Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <Reveal key={index} delay={index * 0.1}>
              <motion.div 
                whileHover={{ y: -10 }}
                className="group cursor-pointer flex flex-col h-full shadow shadow-5xl shadow-black/25 bg-bg-card hover:bg-black transition-all duration-500 ease-out hover:border-black/50 overflow-hidden"
              >
                
                {/* Image Container */}
                <div className="overflow-hidden mb-6 p-2 aspect-[1.05] relative">
                  {/* Placeholder Image Block */}
                  <div className={`w-full h-full relative transition-transform duration-700 group-hover:scale-105`}>
                     <img src={`${blog.imageColor}`} alt="" className='h-full w-full object-cover'/>
                     <div className="absolute inset-0 bg-linear-to-tr from-black/5 to-transparent" />
                  </div>
                </div>

                {/* Content */}
                <a className="flex flex-col grow p-5" href='/blogs'>
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