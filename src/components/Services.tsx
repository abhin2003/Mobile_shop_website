'use client';

import { motion } from 'framer-motion';

const services = [
  {
    title: 'Mobile Sales',
    desc: 'Latest smartphones from 13+ top brands at the best prices with official warranty.',
    icon: 'M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3',
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
  {
    title: 'Accessories',
    desc: 'Premium cases, chargers, earphones, screen guards and all mobile accessories.',
    icon: 'M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    title: 'Mobile Exchange',
    desc: 'Exchange your old phone and get the best value. Upgrade to latest models easily.',
    icon: 'M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3',
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
  {
    title: 'Customer Support',
    desc: 'Dedicated after-sales support for all your queries and device-related assistance.',
    icon: 'M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    title: 'Latest Smartphones',
    desc: 'Be the first to get the newest launches. Pre-book and get exclusive launch-day offers.',
    icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z',
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
];

export default function Services() {
  return (
    <section id="services" className="relative section-padding bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1A3A8F] mb-6">
            <span className="text-xs font-black uppercase tracking-widest">Our Expertise</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
            Professional <span className="text-[#1A3A8F]">Services</span>
          </h2>
          <p className="text-[#64748B] text-base max-w-2xl mx-auto">
            Beyond selling phones, we offer a complete ecosystem of services to ensure your tech needs are met with excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <motion.div
              key={svc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl ${svc.bg} flex items-center justify-center mb-6 ${svc.color} group-hover:scale-110 transition-transform`}>
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={svc.icon} />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-3">{svc.title}</h3>
              <p className="text-sm text-[#64748B] leading-relaxed">{svc.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
