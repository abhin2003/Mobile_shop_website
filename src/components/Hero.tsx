'use client';

import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#FFFFFF]">
      {/* Subtle light background orbs */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ scale: [1, 1.1, 1], x: [0, 20, 0], y: [0, -10, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-[10%] left-[15%] w-[300px] h-[300px] rounded-full bg-[#E31837]/5 blur-[80px]"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1], x: [0, -20, 0], y: [0, 10, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] rounded-full bg-[#1A3A8F]/5 blur-[100px]"
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#E31837] shadow-[0_0_8px_rgba(227,24,55,0.5)]" />
          <span className="text-xs font-bold text-[#64748B] uppercase tracking-wider">Trusted Since 2012</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0F172A] leading-[1.1] mb-6"
        >
          Welcome to <br />
          <span className="gradient-text">Shree Sadguru Mobiles</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-[#64748B] max-w-2xl mx-auto mb-10"
        >
          Your one-stop destination for the latest smartphones and premium accessories. Providing genuine products and expert service for over a decade.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#brands"
            className="px-8 py-4 rounded-full bg-[#E31837] text-white font-bold text-base hover:bg-[#B71430] hover:scale-105 transition-all shadow-lg shadow-red-500/10 w-full sm:w-auto"
          >
            Explore Mobiles
          </a>
          <a
            href="#contact"
            className="px-8 py-4 rounded-full bg-white border border-gray-200 text-[#0F172A] font-bold text-base hover:bg-gray-50 hover:border-gray-300 transition-all w-full sm:w-auto"
          >
            Contact Us
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto"
        >
          {[
            { number: '13+', label: 'Years of Trust' },
            { number: '13+', label: 'Top Brands' },
            { number: '10K+', label: 'Happy Customers' },
            { number: '100%', label: 'Genuine Products' },
          ].map((stat) => (
            <div key={stat.label} className="p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
              <div className="text-2xl md:text-3xl font-black text-[#1A3A8F] mb-1">{stat.number}</div>
              <div className="text-[10px] md:text-xs font-bold text-[#64748B] uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
