'use client';

import { motion } from 'framer-motion';
import PricingCard from '../ui/PricingCard';

export default function Pricing() {
  const plans = [
    {
      name: 'Free Plan',
      price: '$0',
      period: 'month',
      features: [
        '20 autofills per month',
        'Single profile',
        'Basic field detection',
        'Community support',
      ],
      ctaText: 'Get Started',
    },
    {
      name: 'Pro Plan',
      price: '$9',
      period: 'month',
      features: [
        'Unlimited autofills',
        'Multiple profiles',
        'Advanced AI detection',
        'Priority updates',
        'Custom field mapping',
        'Priority support',
      ],
      recommended: true,
      ctaText: 'Start Free Trial',
    },
    {
      name: 'Lifetime Plan',
      price: '$49',
      features: [
        'One-time payment',
        'Unlimited autofills forever',
        'Multiple profiles',
        'All Pro features',
        'Lifetime updates',
        'Premium support',
      ],
      ctaText: 'Buy Lifetime',
    },
  ];
  
  return (
    <section className="relative py-20 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-mesh opacity-30" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-400">
            Choose the plan that works best for you
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard
              key={index}
              name={plan.name}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              recommended={plan.recommended}
              ctaText={plan.ctaText}
            />
          ))}
        </div>
        
        <motion.p
          className="text-center text-gray-400 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          All plans include 14-day money-back guarantee • No credit card required for trial
        </motion.p>
      </div>
    </section>
  );
}
