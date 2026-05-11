'use client';

import { motion } from 'framer-motion';

const galleryItems = [
  { span: 'md:col-span-2 md:row-span-2', label: 'Showroom Interior' },
  { span: '', label: 'Latest Smartphones' },
  { span: '', label: 'Accessories Display' },
  { span: 'md:col-span-2', label: 'Customer Area' },
  { span: '', label: 'Service Counter' },
  { span: '', label: 'Brand Wall' },
  { span: 'md:col-span-2', label: 'Product Range' },
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative section-padding bg-white">
      <div className="max-w-7xl mx-auto">
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
            Showroom <span className="text-[#E31837]">Tour</span>
          </h2>
          <p className="text-[#64748B] text-base max-w-2xl mx-auto">
            A glimpse into our modern showroom. Real photos coming soon to showcase our premium environment.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`relative rounded-2xl overflow-hidden border border-gray-100 group ${item.span}`}
            >
              {/* Placeholder Light Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${
                i % 3 === 0 ? 'from-red-50 to-blue-50' :
                i % 3 === 1 ? 'from-blue-50 to-gray-50' :
                'from-gray-50 to-red-50'
              }`} />
              
              {/* Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center mb-4 text-[#64748B] group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                  </svg>
                </div>
                <h4 className="text-sm font-bold text-[#0F172A] mb-1">{item.label}</h4>
                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest">Placeholder</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
