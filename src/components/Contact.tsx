'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="relative section-padding bg-gray-50/30">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-[#E31837] mb-6">
            <span className="text-xs font-black uppercase tracking-widest">Connect With Us</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">
            Visit Our <span className="text-[#E31837]">Showroom</span>
          </h2>
          <p className="text-[#64748B] text-base max-w-2xl mx-auto">
            Ready to upgrade? Visit us for a hands-on experience with the latest tech or reach out for inquiries.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center gap-5 group">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center shrink-0 text-[#E31837] group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-1">Email Support</p>
                <a href="mailto:Shreesadguru121@gmail.com" className="text-base font-bold text-[#0F172A] hover:text-[#E31837] transition-colors">Shreesadguru121@gmail.com</a>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-4">Follow Us</p>
              <div className="flex gap-4">
                {[
                  { name: 'Facebook', url: 'https://www.facebook.com/shreesadgurumobiles111', icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /> },
                  { name: 'Instagram', url: 'https://instagram.com/shreesadgurumobiles111', icon: <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z" /> },
                ].map((social) => (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center text-[#64748B] hover:text-[#E31837] hover:bg-red-50 hover:border-red-100 transition-all">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">{social.icon}</svg>
                  </a>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 text-[#1A3A8F]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-widest mb-1">Business Hours</p>
                <p className="text-sm font-bold text-[#0F172A]">Mon - Sat: 10 AM - 9 PM</p>
                <p className="text-xs text-[#64748B]">Sunday: 11 AM - 6 PM</p>
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-sm bg-white min-h-[400px]">
            <div className="absolute inset-0 bg-gray-50 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 text-gray-300">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <h4 className="text-base font-bold text-[#0F172A] mb-2">Location Map</h4>
              <p className="text-sm text-[#64748B]">Google Maps integration will appear here for Shree Sadguru Mobiles showroom.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
