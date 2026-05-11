'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { products, Product } from '@/data/products';

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
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleBrandClick = (brandName: string) => {
    setSelectedBrand(brandName);
    setIsOpen(true);
  };

  const brandProducts = products.filter(p => p.brand === selectedBrand);

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
            Click on a brand to explore our current stock and specifications.
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
              onClick={() => handleBrandClick(brand.name)}
              className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex flex-col items-center justify-center gap-4 group cursor-pointer"
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

      {/* Brand Products Modal */}
      <AnimatePresence>
        {isOpen && (
          <Dialog
            static
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="relative z-50"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            />

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
                <Dialog.Panel
                  as={motion.div}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="w-full max-w-4xl rounded-3xl bg-white p-6 sm:p-8 shadow-2xl relative overflow-hidden"
                >
                  <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all z-10"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  <div className="relative mb-8">
                    <h3 className="text-2xl font-black text-[#0F172A]">{selectedBrand} Collection</h3>
                    <p className="text-sm text-[#64748B]">Available models at Shree Sadguru Mobiles</p>
                  </div>

                  {brandProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {brandProducts.map((product) => (
                        <div key={product.id} className="flex flex-col sm:flex-row gap-6 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-blue-100 transition-all group">
                          <div className="w-full sm:w-32 h-40 rounded-xl overflow-hidden bg-white shrink-0 shadow-sm border border-gray-100">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-1 flex flex-col">
                            <div className="flex items-start justify-between mb-1">
                              <h4 className="text-base font-bold text-[#0F172A] group-hover:text-[#1A3A8F] transition-colors">{product.name}</h4>
                              <div className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-lg text-[10px] font-black">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                                {product.rating}
                              </div>
                            </div>
                            <div className="text-lg font-black text-[#E31837] mb-3">{product.price}</div>
                            <div className="space-y-1.5 mb-4">
                              {product.specs.map((spec, index) => (
                                <div key={index} className="flex items-center gap-2 text-xs text-[#64748B]">
                                  <span className="w-1 h-1 rounded-full bg-blue-400" />
                                  {spec}
                                </div>
                              ))}
                            </div>
                            <button className="mt-auto w-full py-2 rounded-xl bg-white border border-gray-200 text-[11px] font-bold text-[#0F172A] hover:bg-[#1A3A8F] hover:text-white hover:border-[#1A3A8F] transition-all">
                              View Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-20 text-center">
                      <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center mx-auto mb-4 text-gray-300">
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.268 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <p className="text-[#64748B] font-bold">New stock for {selectedBrand} arriving soon!</p>
                      <button 
                        onClick={() => setIsOpen(false)}
                        className="mt-6 text-sm font-bold text-[#E31837] hover:underline"
                      >
                        Explore other brands
                      </button>
                    </div>
                  )}
                </Dialog.Panel>
              </div>
            </div>
          </Dialog>
        )}
      </AnimatePresence>
    </section>
  );
}
