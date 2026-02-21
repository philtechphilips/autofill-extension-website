'use client';

import { motion } from 'framer-motion';
import { Play, Square } from 'lucide-react';

export default function Demo() {
  return (
    <section className="relative py-32 px-6 overflow-hidden bg-onyx">
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.05] rounded-full px-4 py-1.5 mb-8">
            <Play className="w-3 h-3 text-white/80" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">Interface Demo</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Efficiency in motion.
          </h2>
          <p className="text-lg text-white/80 max-w-5xl mx-auto font-light leading-relaxed">
            Experience the fluidity of our high-speed engine. Witness how AutoFill AI navigates
            complex data schemas and deploys information with millisecond precision.
          </p>
        </motion.div>

        <motion.div
          className="relative bg-[#0a0a0a] rounded-3xl overflow-hidden border border-white/[0.05] shadow-2xl"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Video player UI mockup */}
          <div className="relative aspect-video flex items-center justify-center group cursor-pointer bg-grid-pattern">
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500" />

            {/* Play trigger */}
            <motion.div
              className="relative z-10 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className="w-8 h-8 text-black ml-1 fill-current" />
            </motion.div>

            {/* Player Controls Bar */}
            <div className="absolute bottom-6 left-6 right-6 h-1 bg-white/[0.05] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white/40 w-1/3"
                animate={{ x: ['-100%', '300%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </div>

          {/* Video Metadata */}
          <div className="p-10 border-t border-white/[0.03] bg-gradient-to-b from-transparent to-white/[0.01]">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-white tracking-tight">Full Lifecycle Form Deployment</h3>
                <p className="text-[12px] text-white/70 font-light uppercase tracking-widest font-mono">2 min 30 sec • 4K Engine Capture</p>
              </div>
              <Square className="w-4 h-4 text-white/60" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
