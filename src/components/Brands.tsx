'use client';

import { motion } from 'framer-motion';

const brands = [
  { name: 'Apple', color: '#000000' },
  { name: 'Samsung', color: '#1428A0' },
  { name: 'Oppo', color: '#1BA344' },
  { name: 'Vivo', color: '#415FFF' },
  { name: 'Redmi', color: '#FF6900' },
  { name: 'Realme', color: '#F7C900' },
  { name: 'OnePlus', color: '#EB0029' },
  { name: 'Google Pixel', color: '#4285F4' },
  { name: 'Motorola', color: '#0070B5' },
  { name: 'Nothing', color: '#000000' },
  { name: 'Lava', color: '#E31837' },
  { name: 'Nokia', color: '#124191' },
  { name: 'Poco', color: '#F7C600' },
];

export default function Brands() {
  return (
    <section id="brands" className="relative section-padding bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1A3A8F] mb-6">
            <span className="text-xs font-black uppercase tracking-widest">Premium Collection</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
            Official <span className="text-[#1A3A8F]">Partners</span>
          </h2>
          <p className="text-[#64748B] text-base max-w-2xl mx-auto">
            Explore the latest smartphones from world-leading brands, all under one roof.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
          {brands.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center justify-center gap-4 group"
            >
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black group-hover:scale-110 transition-transform"
                style={{ backgroundColor: `${brand.color}08`, color: brand.color }}
              >
                {brand.name.charAt(0)}
              </div>
              <span className="text-sm font-bold text-[#0F172A]">{brand.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
