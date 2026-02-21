'use client';

import { motion } from 'framer-motion';

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export default function TestimonialCard({ quote, author, role, avatar }: TestimonialCardProps) {
  return (
    <motion.div
      className="p-10 border border-white/[0.05] rounded-3xl bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/10 hover:shadow-2xl hover:shadow-white/[0.02] transition-all duration-500 relative group"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col gap-8">
        <p className="text-xl md:text-2xl text-white/90 leading-relaxed font-light italic">"{quote}"</p>
        <div className="flex items-center gap-4 pt-4 border-t border-white/[0.05]">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500">
            <img
              src={avatar}
              alt={author}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="space-y-0.5">
            <p className="text-base font-semibold text-white tracking-tight">{author}</p>
            <p className="text-xs text-white/40 font-medium uppercase tracking-widest">{role}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
