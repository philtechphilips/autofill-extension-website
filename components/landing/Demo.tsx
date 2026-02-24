"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Square } from "lucide-react";

export default function Demo() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="demo" className="relative py-32 px-6 overflow-hidden bg-white dark:bg-onyx">
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.05] dark:border-white/[0.05] rounded-full px-4 py-1.5 mb-8">
            <Play className="w-3 h-3 text-black/80 dark:text-white/80" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-black/80 dark:text-white/80">
              Interface Demo
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white tracking-tight mb-6">
            Efficiency in motion.
          </h2>
          <p className="text-lg text-black/80 dark:text-white/80 max-w-5xl mx-auto font-light leading-relaxed">
            Experience the fluidity of our high-speed engine. Witness how
            AutoFill AI navigates complex data schemas and deploys information
            with millisecond precision.
          </p>
        </motion.div>

        <motion.div
          className="relative bg-[#0a0a0a] rounded-3xl overflow-hidden border border-black/[0.05] dark:border-white/[0.05] shadow-2xl"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Video player UI mockup */}
          <div
            className="relative aspect-video flex items-center justify-center group cursor-pointer bg-grid-pattern"
            onClick={() => setIsPlaying(true)}
          >
            {!isPlaying ? (
              <>
                <div className="absolute inset-0 bg-white/40 dark:bg-black/40 group-hover:bg-black/20 transition-all duration-500" />

                {/* Play trigger */}
                <motion.div
                  className="relative z-10 w-24 h-24 bg-black dark:bg-white rounded-full flex items-center justify-center shadow-2xl"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-8 h-8 text-white dark:text-black ml-1 fill-current" />
                </motion.div>

                {/* Player Controls Bar */}
                <div className="absolute bottom-6 left-6 right-6 h-1 bg-black/[0.05] dark:bg-white/[0.05] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-black/40 dark:bg-white/40 w-1/3"
                    animate={{ x: ["-100%", "300%"] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </>
            ) : (
              <iframe
                src="https://player.cloudinary.com/embed/?cloud_name=dtwmo6wsb&public_id=output_tq4jys&fluid=true&controls=true&muted=false&autoplay=true"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                frameBorder="0"
                className="absolute inset-0 w-full h-full"
              ></iframe>
            )}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
