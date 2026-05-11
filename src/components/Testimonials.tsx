'use client';

import { motion } from 'framer-motion';

const testimonials = [
  {
    name: 'Rahul Patil',
    role: 'Loyal Customer',
    text: 'Best mobile shop in the area! Bought my iPhone from here and got an amazing deal. The staff is very helpful and knowledgeable.',
    rating: 5,
  },
  {
    name: 'Priya Deshmukh',
    role: 'Regular Customer',
    text: 'I have been buying phones from Shree Sadguru Mobiles since 2015. Always genuine products and best prices. Highly recommended!',
    rating: 5,
  },
  {
    name: 'Amit Sharma',
    role: 'Verified Buyer',
    text: 'Exchanged my old Samsung for a new OnePlus. Got the best exchange value and the whole process was smooth and quick.',
    rating: 5,
  },
  {
    name: 'Sneha Kulkarni',
    role: 'Happy Customer',
    text: 'Great collection of accessories too! Bought a phone case and charger along with my new Vivo. Very reasonable prices.',
    rating: 4,
  },
  {
    name: 'Vikram Jadhav',
    role: 'Repeat Customer',
    text: 'Bharat bhai personally helps you choose the right phone. That personal touch is what makes this shop special. 10/10!',
    rating: 5,
  },
  {
    name: 'Anjali More',
    role: 'First-time Buyer',
    text: 'Was confused between Redmi and Realme. The team helped me compare and choose the perfect one within my budget.',
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`w-3.5 h-3.5 ${i < count ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#E31837] mb-6">
            <span className="text-xs font-black uppercase tracking-widest">Happy Customers</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
            Voice of <span className="text-[#E31837]">Trust</span>
          </h2>
          <p className="text-[#64748B] text-base max-w-2xl mx-auto">
            Our customers are our greatest advocates. Read what they have to say about their experience with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all group relative"
            >
              {/* Quote icon */}
              <svg className="absolute top-6 right-8 w-10 h-10 text-gray-50 group-hover:text-red-50 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
              </svg>
              
              <p className="text-sm text-[#64748B] leading-relaxed relative z-10 mb-6 italic">&ldquo;{t.text}&rdquo;</p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-gray-50 relative z-10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E31837] to-[#1A3A8F] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                  {t.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-[#0F172A] truncate">{t.name}</div>
                  <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">{t.role}</div>
                </div>
                <Stars count={t.rating} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
