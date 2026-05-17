'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const galleryItems = [
  {
    id: 1,
    src: '/Mobile_shop_images/IMG_3781.jpg',
    span: 'md:col-span-2 md:row-span-2',
    label: 'Main Showroom Interior',
    desc: 'Wide view of our state-of-the-art mobile showroom featuring high-end accessories and devices.',
  },
  {
    id: 2,
    src: '/Mobile_shop_images/IMG_3782.jpg',
    span: '',
    label: 'Premium Display Counter',
    desc: 'A closer look at our curated display of the latest smartphones.',
  },
  {
    id: 3,
    src: '/Mobile_shop_images/IMG_3783.jpg',
    span: '',
    label: 'Accessories Showcase',
    desc: 'Top-tier branded covers, power banks, and sound accessories.',
  },
  {
    id: 4,
    src: '/Mobile_shop_images/IMG_3787.jpg',
    span: 'md:col-span-2',
    label: 'Smartphone Display Wall',
    desc: 'Explore official devices from all leading global brands ready to experience.',
  },
  {
    id: 5,
    src: '/Mobile_shop_images/IMG_3788.jpg',
    span: '',
    label: 'Customer Lounge',
    desc: 'Comfortable waiting area while our experts configure your new smartphone.',
  },
  {
    id: 6,
    src: '/Mobile_shop_images/IMG_3789.jpg',
    span: '',
    label: 'Official Partner Zone',
    desc: 'Dedicated spaces for Apple, Samsung, OnePlus, Vivo, and Oppo.',
  },
  {
    id: 7,
    src: '/Mobile_shop_images/IMG_3791.jpg',
    span: 'md:col-span-2',
    label: 'Showroom Glass Facade',
    desc: 'Inviting storefront situated in a prime commercial location.',
  },
];

export default function Gallery() {
  const [activePhoto, setActivePhoto] = useState<number | null>(null);

  const handleNext = () => {
    if (activePhoto === null) return;
    setActivePhoto((prev) => (prev !== null && prev < galleryItems.length ? prev + 1 : 1));
  };

  const handlePrev = () => {
    if (activePhoto === null) return;
    setActivePhoto((prev) => (prev !== null && prev > 1 ? prev - 1 : galleryItems.length));
  };

  const currentItem = galleryItems.find((item) => item.id === activePhoto);

  return (
    <section id="gallery" className="relative section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#E31837] mb-6">
            <span className="text-xs font-black uppercase tracking-widest">Our Space</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
            Showroom <span className="text-[#E31837]">Gallery</span>
          </h2>
          <p className="text-[#64748B] text-base max-w-2xl mx-auto">
            Take a visual tour of Shree Sadguru Mobiles. Experience our premium shopping environment and outstanding product layouts.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 auto-rows-[220px]">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => setActivePhoto(item.id)}
              className={`relative rounded-3xl overflow-hidden border border-slate-100 group cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500 ${item.span}`}
            >
              {/* Blur-up background skeleton */}
              <div className="absolute inset-0 bg-slate-100 animate-pulse -z-10" />

              {/* Real Converted JPEG Image */}
              <img
                src={item.src}
                alt={item.label}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />

              {/* Beautiful Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[9px] font-black uppercase tracking-widest text-red-400 mb-1">
                  Click to Expand
                </span>
                <h4 className="text-sm font-black text-white mb-0.5">{item.label}</h4>
                <p className="text-[11px] text-slate-300 line-clamp-1">{item.desc}</p>
              </div>

              {/* Glassmorphic Indicator on Static State */}
              <div className="absolute bottom-4 left-4 bg-white/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/20 shadow-sm flex items-center gap-1.5 group-hover:opacity-0 transition-opacity">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E31837]" />
                <span className="text-[10px] font-extrabold text-[#0F172A] tracking-wide uppercase">
                  {item.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto !== null && currentItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-5xl rounded-3xl bg-slate-900 overflow-hidden shadow-2xl z-10 border border-white/5 flex flex-col md:flex-row h-[85vh] md:h-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:text-red-400 hover:bg-black/80 transition-all z-20"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Left Image Area */}
              <div className="flex-1 relative bg-black flex items-center justify-center h-[55vh] md:h-[65vh]">
                <img
                  src={currentItem.src}
                  alt={currentItem.label}
                  className="w-full h-full object-contain max-h-[65vh]"
                />

                {/* Slider Navigation inside Image */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/5 flex items-center justify-center text-white hover:scale-105 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 border border-white/5 flex items-center justify-center text-white hover:scale-105 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>

              {/* Right Details Area */}
              <div className="w-full md:w-80 bg-slate-950 p-6 md:p-8 flex flex-col justify-between shrink-0 border-t md:border-t-0 md:border-l border-white/5">
                <div className="text-left">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-500/10 text-red-400 mb-4 border border-red-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                    <span className="text-[9px] font-black uppercase tracking-wider">Live Tour</span>
                  </div>
                  
                  <h3 className="text-lg font-black text-white mb-3">
                    {currentItem.label}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-medium">
                    {currentItem.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  <span>Showroom Space</span>
                  <span>{currentItem.id} / {galleryItems.length}</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
