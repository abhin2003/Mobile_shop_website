'use client';

import { motion } from 'framer-motion';

const features = [
  { title: '100% Genuine Products', desc: 'Every device comes with official warranty and bill.', icon: 'shield' },
  { title: 'Customer First', desc: 'Personalized service and expert guidance for every customer.', icon: 'user' },
  { title: 'Best Prices', desc: 'Competitive pricing with exciting offers and exchange deals.', icon: 'price' },
  { title: 'Wide Range', desc: 'From budget to flagship — 13+ top mobile brands available.', icon: 'range' },
];

function FeatureIcon({ type }: { type: string }) {
  const icons: Record<string, JSX.Element> = {
    shield: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />,
    user: <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />,
    price: <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    range: <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />,
  };
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      {icons[type]}
    </svg>
  );
}

export default function About() {
  return (
    <section id="about" className="relative section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#E31837] mb-6">
              <span className="text-xs font-black uppercase tracking-widest">Our Legacy</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-6 leading-tight">
              Trusted Mobile Showroom <br /> Since <span className="text-[#E31837]">2012</span>
            </h2>
            <div className="space-y-4 text-[#64748B]">
              <p>
                Founded by <span className="text-[#0F172A] font-bold">Bharat Shinde</span>, <span className="text-[#0F172A] font-bold">Shree Sadguru Mobiles</span> has been a leading destination for tech enthusiasts for over 13 years.
              </p>
              <p>
                We believe in providing more than just a product; we provide a relationship built on trust and reliability. Every customer at our shop is treated like family, receiving expert advice tailored to their specific needs.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {['Authorized Dealer', 'Best Exchange Value', 'Fast Service'].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-lg bg-gray-50 border border-gray-100 text-sm font-bold text-[#1A3A8F]">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center mb-4 text-[#E31837] group-hover:bg-red-50 transition-colors">
                  <FeatureIcon type={feat.icon} />
                </div>
                <h3 className="text-base font-bold text-[#0F172A] mb-2">{feat.title}</h3>
                <p className="text-sm text-[#64748B] leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
