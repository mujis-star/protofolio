"use client";

import { motion } from "framer-motion";
import { useContent } from "@/context/content-context";

export function GallerySection() {
  const data = useContent();

  // Safelist for Tailwind v4 so dynamic admin classes aren't purged
  const safelist = "col-span-1 col-span-2 col-span-3 col-span-4 row-span-1 row-span-2 row-span-3 row-span-4 row-span-5 row-span-6";

  return (
    <section id="gallery" className="py-24 md:py-32 relative overflow-hidden bg-transparent">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">
              Events & <span className="text-blue-500">Gallery.</span>
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-xl">
              Moments from hackathons, global tech summits, and collaborative deep work.
            </p>
          </div>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-4 md:gap-6">
          {data.gallery.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group relative rounded-3xl overflow-hidden bg-neutral-900 ${item.span}`}
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-in-out"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              {/* Text Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white font-bold text-lg md:text-xl drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
