'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Offer {
  id: string;
  title: string;
  description: string;
  badge: string;
  accent: 'red' | 'blue' | 'gold';
}

const DEFAULT_OFFERS: Offer[] = [
  {
    id: 'offer-1',
    title: 'One Rupee Wonder Scheme',
    description: 'Pay just ₹1 upfront and take home your favorite brand new smartphone. Easy documentation with Bajaj Finance!',
    badge: 'BAJAJ EXCLUSIVE',
    accent: 'red',
  },
  {
    id: 'offer-2',
    title: 'IDFC Cashback Deal',
    description: 'Get up to ₹5,000 instant cashback on select premium smartphones with IDFC First Bank. Apply SO Code: 308446.',
    badge: 'IDFC SPECIAL',
    accent: 'gold',
  },
  {
    id: 'offer-3',
    title: 'Free Accessories Pack',
    description: 'Purchase any smartphone above ₹15,000 and get a premium protection case and tempered glass screen protector absolutely FREE!',
    badge: 'STORE GIFT',
    accent: 'blue',
  },
];

export default function AdminOffers() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  // Form State
  const [formId, setFormId] = useState<string | null>(null); // null means adding
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formBadge, setFormBadge] = useState('');
  const [formAccent, setFormAccent] = useState<'red' | 'blue' | 'gold'>('blue');
  const [formError, setFormError] = useState('');

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const active = localStorage.getItem('sadguru_admin_active') === 'true';
      setIsAdminMode(active);

      const stored = localStorage.getItem('sadguru_offers');
      if (stored) {
        try {
          setOffers(JSON.parse(stored));
        } catch (e) {
          setOffers(DEFAULT_OFFERS);
        }
      } else {
        setOffers(DEFAULT_OFFERS);
        try {
          localStorage.setItem('sadguru_offers', JSON.stringify(DEFAULT_OFFERS));
        } catch (err) {
          console.error('Failed to save default offers', err);
        }
      }
    } catch (err) {
      console.error('localStorage is not available', err);
      setOffers(DEFAULT_OFFERS);
    }
  }, []);

  const saveOffersToStorage = (updated: Offer[]) => {
    setOffers(updated);
    try {
      localStorage.setItem('sadguru_offers', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save offers to localStorage', e);
      alert('Browser storage is full. Unable to persist offers.');
    }
  };

  // Admin access
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'SreeSadguruMobile2012') {
      setIsAdminMode(true);
      try {
        localStorage.setItem('sadguru_admin_active', 'true');
      } catch (err) {
        console.error('Failed to save login status', err);
      }
      window.dispatchEvent(new Event('sadguru-admin-login-changed'));
      setShowPasswordModal(false);
      setPasswordInput('');
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const handleLogout = () => {
    setIsAdminMode(false);
    try {
      localStorage.setItem('sadguru_admin_active', 'false');
    } catch (err) {
      console.error('Failed to save logout status', err);
    }
    window.dispatchEvent(new Event('sadguru-admin-login-changed'));
    resetForm();
  };

  // CRUD Actions
  const resetForm = () => {
    setFormId(null);
    setFormTitle('');
    setFormDescription('');
    setFormBadge('');
    setFormAccent('blue');
    setFormError('');
  };

  const handleSubmitOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle || !formDescription || !formBadge) {
      setFormError('Please fill in all fields.');
      return;
    }

    if (formId) {
      // Edit
      const updated = offers.map((o) =>
        o.id === formId
          ? { ...o, title: formTitle, description: formDescription, badge: formBadge, accent: formAccent }
          : o
      );
      saveOffersToStorage(updated);
    } else {
      // Add
      const newOffer: Offer = {
        id: `offer-${Date.now()}`,
        title: formTitle,
        description: formDescription,
        badge: formBadge,
        accent: formAccent,
      };
      saveOffersToStorage([...offers, newOffer]);
    }
    resetForm();
  };

  const handleEditClick = (offer: Offer) => {
    setFormId(offer.id);
    setFormTitle(offer.title);
    setFormDescription(offer.description);
    setFormBadge(offer.badge);
    setFormAccent(offer.accent);
    
    // Exact absolute offset coordinate to prevent scrolling to top
    const anchor = document.getElementById('admin-form-anchor');
    if (anchor) {
      const top = anchor.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleDeleteClick = (id: string) => {
    if (confirm('Are you sure you want to remove this offer?')) {
      const updated = offers.filter((o) => o.id !== id);
      saveOffersToStorage(updated);
      if (formId === id) {
        resetForm();
      }
    }
  };

  return (
    <section id="offers" className="relative section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1A3A8F] mb-6">
              <span className="text-xs font-black uppercase tracking-widest">Special Deals</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A]">
              Exclusive Store <span className="text-[#1A3A8F]">Offers</span>
            </h2>
            <p className="text-[#64748B] text-base mt-2 max-w-xl">
              Check out our latest high-value showroom deals. Ask our store associates to apply these schemes upon check-out!
            </p>
          </div>
          
          {/* Admin Mode Toggle */}
          <div>
            {isAdminMode ? (
              <button
                onClick={handleLogout}
                className="px-5 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Admin Active (Logout)
              </button>
            ) : (
              <button
                onClick={() => setShowPasswordModal(true)}
                className="px-5 py-2.5 rounded-full bg-slate-50 border border-slate-200 hover:bg-slate-100 text-[#1A3A8F] text-xs font-bold transition-all flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Admin Panel Login
              </button>
            )}
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <AnimatePresence mode="popLayout">
            {offers.map((offer) => (
              <motion.div
                key={offer.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group relative rounded-3xl bg-white border border-slate-100 p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Top Bar Gradient */}
                <div className={`absolute top-0 left-0 right-0 h-2 rounded-t-3xl ${
                  offer.accent === 'red' ? 'bg-gradient-to-r from-red-500 to-rose-600' :
                  offer.accent === 'gold' ? 'bg-gradient-to-r from-amber-500 to-yellow-500' :
                  'bg-gradient-to-r from-blue-500 to-[#1A3A8F]'
                }`} />

                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-6 ${
                    offer.accent === 'red' ? 'bg-red-50 text-red-600' :
                    offer.accent === 'gold' ? 'bg-amber-50 text-amber-700' :
                    'bg-blue-50 text-[#1A3A8F]'
                  }`}>
                    {offer.badge}
                  </span>

                  <h3 className="text-lg font-black text-[#0F172A] mb-3 leading-snug group-hover:text-[#1A3A8F] transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-sm text-[#64748B] leading-relaxed">
                    {offer.description}
                  </p>
                </div>

                {/* Admin Operations Layer */}
                {isAdminMode && (
                  <div className="border-t border-slate-100 pt-6 mt-8 flex items-center justify-end gap-3">
                    <button
                      onClick={() => handleEditClick(offer)}
                      className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-[#1A3A8F] text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(offer.id)}
                      className="px-3.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold transition-all flex items-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                      Delete
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {offers.length === 0 && (
            <div className="col-span-3 py-16 text-center text-slate-400 bg-slate-50 border border-dashed border-slate-200 rounded-3xl">
              No offers currently listed. Turn on Admin Panel to add offers!
            </div>
          )}
        </div>

        {/* Dynamic Add / Edit Form Anchor */}
        <div id="admin-form-anchor" />

        {/* Admin Form Panel */}
        <AnimatePresence>
          {isAdminMode && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="p-8 rounded-3xl bg-slate-50 border border-slate-200 max-w-2xl mx-auto shadow-sm"
            >
              <h3 className="text-xl font-black text-[#0F172A] mb-2">
                {formId ? '✍️ Edit Offer Scheme' : '➕ Add New Store Offer'}
              </h3>
              <p className="text-xs text-[#64748B] mb-6">
                All changes reflect instantly on the website live offers grid and persist locally.
              </p>

              <form onSubmit={handleSubmitOffer} className="space-y-4">
                {formError && (
                  <div className="p-3 rounded-lg bg-red-100 text-red-700 text-xs font-bold">
                    {formError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                    Offer Title
                  </label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Free Smart Watch Offer"
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-[#1A3A8F] focus:outline-none transition-all text-slate-800 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                    Description Content
                  </label>
                  <textarea
                    rows={3}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="e.g. Buy any smartphone above ₹30,000 and get a free noise smart watch worth ₹3,999 free."
                    className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-[#1A3A8F] focus:outline-none transition-all text-slate-800 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                      Badge Text
                    </label>
                    <input
                      type="text"
                      value={formBadge}
                      onChange={(e) => setFormBadge(e.target.value)}
                      placeholder="e.g. FESTIVAL DEAL"
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-[#1A3A8F] focus:outline-none transition-all text-slate-800 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                      Card Theme Style
                    </label>
                    <select
                      value={formAccent}
                      onChange={(e) => setFormAccent(e.target.value as 'red' | 'blue' | 'gold')}
                      className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-[#1A3A8F] focus:outline-none transition-all text-slate-800 font-bold"
                    >
                      <option value="blue">Blue Accent (Standard)</option>
                      <option value="red">Red Accent (High Alert)</option>
                      <option value="gold">Gold Accent (Premium/Cashback)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-all"
                  >
                    Cancel / Clear
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#1A3A8F] hover:bg-[#0F2560] text-white text-xs font-bold transition-all shadow-md"
                  >
                    {formId ? 'Update Offer Scheme' : 'Publish Offer'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Password Verification Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPasswordModal(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="w-full max-w-sm rounded-3xl bg-white p-6 md:p-8 shadow-2xl relative overflow-hidden z-10"
            >
              <button
                onClick={() => setShowPasswordModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="text-center mb-6">
                <span className="text-2xl block mb-2">🔒</span>
                <h3 className="text-lg font-black text-[#0F172A]">Admin Authentication</h3>
                <p className="text-xs text-[#64748B] mt-1">
                  Enter password to access Admin panel.
                </p>
              </div>

              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter Passcode"
                    autoFocus
                    className={`w-full px-4 py-3 rounded-xl bg-slate-50 border text-sm text-center font-bold tracking-widest focus:outline-none transition-all ${
                      passwordError ? 'border-red-500 focus:border-red-500' : 'border-slate-200 focus:border-[#1A3A8F]'
                    }`}
                  />
                  {passwordError && (
                    <span className="text-[10px] font-bold text-red-500 block text-center mt-1.5">
                      Incorrect password. Please try again.
                    </span>
                  )}
                </div>
                
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#1A3A8F] hover:bg-[#0F2560] text-white text-xs font-bold transition-all shadow-md"
                >
                  Verify & Login
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
