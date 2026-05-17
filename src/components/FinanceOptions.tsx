'use client';

import { motion } from 'framer-motion';

const financeBrands = [
  {
    name: 'Bajaj Finance',
    description: 'Instant approval with minimal documentation. Up to 24 months EMI.',
    accent: 'from-blue-600 to-cyan-500',
    logoText: 'BAJAJ',
    badge: 'Popular',
  },
  {
    name: 'IDFC First Bank',
    description: 'Zero downpayment options available. Check with SO Code: 308446.',
    accent: 'from-amber-600 to-red-500',
    logoText: 'IDFC',
    badge: 'SO: 308446',
  },
  {
    name: 'HDB Finance',
    description: 'HDFC Bank group companion finance. High approval rates.',
    accent: 'from-blue-700 to-indigo-600',
    logoText: 'HDB',
  },
  {
    name: 'TVS Credit',
    description: 'Simple and speedy financing solutions for top smartphones.',
    accent: 'from-red-600 to-orange-500',
    logoText: 'TVS',
  },
  {
    name: 'DMI Finance',
    description: 'Fully digital micro-loans and phone financing options.',
    accent: 'from-emerald-600 to-teal-500',
    logoText: 'DMI',
  },
  {
    name: 'Home Credit',
    description: 'Easy monthly installments for everyone. No credit history needed.',
    accent: 'from-red-500 to-rose-600',
    logoText: 'HC',
  },
];

export default function FinanceOptions() {
  return (
    <section id="emi-offers" className="relative section-padding bg-slate-50/50 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] rounded-full bg-blue-400/10 blur-[100px]" />
        <div className="absolute bottom-[20%] right-[-10%] w-[450px] h-[450px] rounded-full bg-red-400/10 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#E31837] mb-6">
            <span className="text-xs font-black uppercase tracking-widest">Easy Financing</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
            Easy <span className="text-[#E31837]">EMI</span> & Finance Options
          </h2>
          <p className="text-[#64748B] text-base max-w-2xl mx-auto">
            Get your dream smartphone today with our flexible payment partners. Zero downpayment and instant approval schemes are available!
          </p>
        </motion.div>

        {/* Finance Brands Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {financeBrands.map((brand, idx) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group p-6 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              {/* Corner Accent Color */}
              <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${brand.accent}`} />
              
              {/* Badge if exists */}
              {brand.badge && (
                <span className="absolute top-4 right-4 px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100 text-[10px] font-black text-[#1A3A8F] uppercase tracking-wider">
                  {brand.badge}
                </span>
              )}

              <div className="flex items-start gap-4 pt-2">
                {/* Brand Logo Placeholder (styled beautifully) */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${brand.accent} flex items-center justify-center text-white font-extrabold text-sm shadow-md`}>
                  {brand.logoText}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#0F172A] mb-1.5 group-hover:text-[#E31837] transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {brand.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Direct Limit Check Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Bajaj Finance Card (7 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 rounded-3xl bg-gradient-to-br from-[#1A3A8F] to-[#0F2560] text-white p-8 md:p-10 shadow-2xl flex flex-col justify-between relative overflow-hidden group"
          >
            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#E31837]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10">
              {/* Header */}
              <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-cyan-300 text-[10px] font-bold uppercase tracking-widest mb-2 inline-block">
                    Bajaj Finance Exclusive Offer
                  </span>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white mt-1">
                    Check Pre-Approved Limit
                  </h3>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#1A3A8F] font-black text-lg shadow-inner shrink-0">
                  BAJAJ
                </div>
              </div>

              {/* Exact Promotional Content */}
              <div className="space-y-4 mb-8">
                <p className="text-lg md:text-xl font-bold text-cyan-300 leading-snug">
                  Want to buy a new mobile phone?..
                </p>
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <p className="text-xl font-black text-amber-300 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E31837] animate-pulse" />
                    Pay one rupee and get your favorite mobile phone.
                  </p>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed font-medium">
                  Click on the link below now, enter your mobile number and OTP, find out your pre-approved loan limit and take your favorite smartphone home today!
                </p>
              </div>

              {/* Converted Shop Images */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/10 p-1.5 hover:scale-[1.02] transition-transform duration-300 shadow-md flex items-center justify-center">
                  <img
                    src="/finance_mobile/bajaj_finance_1.jpeg"
                    alt="Bajaj Finance Offer Flyer 1"
                    className="rounded-xl w-full h-auto object-contain max-h-72"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/10 p-1.5 hover:scale-[1.02] transition-transform duration-300 shadow-md flex items-center justify-center">
                  <img
                    src="/finance_mobile/bajaj_finance_2.jpeg"
                    alt="Bajaj Finance Offer Flyer 2"
                    className="rounded-xl w-full h-auto object-contain max-h-72"
                  />
                </div>
              </div>
            </div>

            {/* CTA & Contact Details */}
            <div className="relative z-10 border-t border-white/10 pt-6 mt-4 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex flex-col text-center sm:text-left">
                <span className="text-[10px] text-slate-300 font-bold uppercase tracking-wider">Store Contact</span>
                <span className="text-base font-black text-white">SHREE SADGURU MOBILE SHOPEE</span>
                <a href="tel:9881633398" className="text-sm text-cyan-300 font-bold hover:underline flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.802-5.122-4.1-6.924-6.924l1.293-.97c.362-.272.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  9881633398
                </a>
              </div>
              <a
                href="https://bfin.in/?6Q3CGUTS"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full bg-[#E31837] text-white font-black text-sm tracking-wide hover:bg-red-600 transition-all duration-300 shadow-lg shadow-red-600/30 flex items-center gap-2 group/btn shrink-0 w-full sm:w-auto justify-center"
              >
                Check My Bajaj Limit
                <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* IDFC First Bank Card (5 Columns) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 rounded-3xl bg-white border border-slate-100 shadow-xl p-8 md:p-10 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-6">
                <div>
                  <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-widest mb-2 inline-block">
                    IDFC First Bank
                  </span>
                  <h3 className="text-2xl font-black tracking-tight text-[#0F172A] mt-1">
                    Pre-Approved Limits
                  </h3>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-700 font-black text-sm shadow-inner shrink-0">
                  IDFC
                </div>
              </div>

              {/* Details & SO Code */}
              <div className="space-y-6 mb-8 text-center sm:text-left">
                <p className="text-sm text-[#64748B] leading-relaxed">
                  Easily check your pre-approved loan limits with <span className="font-bold text-[#0F172A]">IDFC First Bank</span>. Utilize our official merchant code to instantly lock in premium interest rates and tenure options.
                </p>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                  <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block mb-1">
                    Required Merchant code
                  </span>
                  <span className="text-3xl font-black text-[#E31837] tracking-wider block">
                    SO Code: 308446
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 block mt-1">
                    Enter this code during verification for instant loan processing
                  </span>
                </div>
              </div>
            </div>

            {/* Styled IDFC Scan QR Code */}
            <div className="border-t border-slate-100 pt-6 flex flex-col items-center">
              <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-dashed border-amber-300 p-4 rounded-3xl mb-4 group shadow-sm flex flex-col items-center justify-center w-48 h-48 hover:border-amber-400 transition-colors">
                
                {/* Visual Scanner QR Simulation */}
                <svg className="w-36 h-36 text-[#0F172A]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Outer Frame corners */}
                  <path d="M5 25V5H25" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M75 5H95V25" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M5 75V95H25" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                  <path d="M75 95H95V75" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/>
                  
                  {/* QR blocks */}
                  <rect x="15" y="15" width="22" height="22" rx="3" fill="currentColor" />
                  <rect x="21" y="21" width="10" height="10" rx="1.5" fill="white" />
                  <rect x="24" y="24" width="4" height="4" rx="0.5" fill="currentColor" />

                  <rect x="63" y="15" width="22" height="22" rx="3" fill="currentColor" />
                  <rect x="69" y="21" width="10" height="10" rx="1.5" fill="white" />
                  <rect x="72" y="24" width="4" height="4" rx="0.5" fill="currentColor" />

                  <rect x="15" y="63" width="22" height="22" rx="3" fill="currentColor" />
                  <rect x="21" y="69" width="10" height="10" rx="1.5" fill="white" />
                  <rect x="24" y="72" width="4" height="4" rx="0.5" fill="currentColor" />
                  
                  {/* Decorative dots in the center/bottom right */}
                  <circle cx="50" cy="30" r="3.5" fill="currentColor" />
                  <circle cx="50" cy="50" r="3.5" fill="currentColor" />
                  <circle cx="70" cy="50" r="3.5" fill="currentColor" />
                  <circle cx="35" cy="50" r="3.5" fill="currentColor" />
                  <circle cx="50" cy="70" r="3.5" fill="currentColor" />
                  <circle cx="75" cy="75" r="5" fill="#E31837" />
                  <circle cx="65" cy="65" r="3" fill="currentColor" />
                  <circle cx="75" cy="65" r="3" fill="currentColor" />
                  <circle cx="65" cy="75" r="3" fill="currentColor" />
                </svg>

                {/* Laser animation */}
                <div className="absolute left-6 right-6 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-[#E31837] to-transparent animate-bounce shadow-[0_0_8px_rgba(227,24,55,0.8)]" />
              </div>
              
              <div className="text-center">
                <span className="text-xs font-black text-[#0F172A] block uppercase tracking-wider">
                  Scan IDFC QR Code
                </span>
                <span className="text-[10px] text-[#64748B] block mt-0.5">
                  Use SO Code: 308446 at counter
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
