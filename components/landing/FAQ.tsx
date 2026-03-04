"use client";

import { motion } from "framer-motion";
import FAQItem from "../ui/FAQItem";

export default function FAQ() {
  const faqs = [
    {
      question: "Compatibility with complex forms",
      answer:
        "AutoFill AI is engineered to handle multi-step interfaces, React-based state management, and custom field identifiers that standard browsers miss.",
    },
    {
      question: "Data residency and sovereignty",
      answer:
        "Your data stays in your browser. We zero-log your profiles and utilize local compute for all AI operations.",
    },
    {
      question: "Multi-profile management",
      answer:
        "Yes. Switch between professional, personal, and project-specific identities with a single key command.",
    },
    {
      question: "Open source transparency",
      answer:
        "Our core engine is open source on GitHub. We believe security equals transparency.",
    },
    {
      question: "Support for other browsers",
      answer:
        "We currently support Google Chrome. Support for Mozilla Firefox and Microsoft Edge is in active development and will be available soon.",
    },
  ];

  return (
    <section id="faq" className="relative py-32 px-6 overflow-hidden bg-white dark:bg-onyx">
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-black dark:text-white tracking-tight mb-6">
            Everything you need to know.
          </h2>
          <p className="text-lg text-black/90 dark:text-white/90 font-light">
            Simple answers to common questions about the platform.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-x-12 border-t border-black/[0.05] dark:border-white/[0.05]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={
                index % 2 === 0 ? "md:border-r md:border-white/[0.05]" : ""
              }
            >
              <FAQItem question={faq.question} answer={faq.answer} />
            </div>
          ))}
        </motion.div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-[12px] font-mono tracking-widest text-black/70 dark:text-white/90 uppercase mb-4">
            Support
          </p>
          <a
            href="mailto:support@autofillai.com"
            className="text-black dark:text-white hover:text-brand-accent transition-colors text-sm font-medium"
          >
            Contact the engineering team →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
