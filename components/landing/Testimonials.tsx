"use client";

import { motion } from "framer-motion";
import TestimonialCard from "../ui/TestimonialCard";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "AutoFill AI removed the single largest bottleneck in our recruitment pipeline. We transitioned from manual entry to automated verification in 48 hours.",
      author: "Sarah Chen",
      role: "Head of Talent, Vercel",
      avatar: "https://i.pravatar.cc/150?u=sarah",
    },
    {
      quote:
        "The level of field detection accuracy is unprecedented. It understands complex form states that standard browser extensions simply ignore.",
      author: "Marcus Rodriguez",
      role: "Principal Engineer, Linear",
      avatar: "https://i.pravatar.cc/150?u=marcus",
    },
    {
      quote:
        "Finally, a developer-first approach to identity management. Secure, local-first, and incredibly fast. It is a staple in my daily workflow.",
      author: "Emily Thompson",
      role: "Founder, Sequence",
      avatar: "https://i.pravatar.cc/150?u=emily",
    },
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-onyx">
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.05] rounded-full px-4 py-1.5 mb-8">
            <Star className="w-3 h-3 text-white/80" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
              Trusted by Professionals
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6">
            Standard for high-speed talent.
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-5xl mx-auto font-light leading-relaxed">
            Joined by 12,000+ engineers, designers, and founders who demand
            precision and speed in their daily technical interactions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-12">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              avatar={testimonial.avatar}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
