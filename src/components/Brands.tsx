'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog } from '@headlessui/react';
import { products, Product } from '@/data/products';
import { supabase } from '@/utils/supabaseClient';

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
  { name: 'Ai+', color: '#8B5CF6' },
  { name: 'Lava', color: '#E31837' },
  { name: 'Nokia', color: '#124191' },
  { name: 'Poco', color: '#F7C600' },
];

const compressImage = (file: File, maxWidth = 500, maxHeight = 500, quality = 0.7): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => {
        resolve(e.target?.result as string);
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
};

const dataURLtoBlob = (dataurl: string): Blob => {
  const arr = dataurl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export default function Brands() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);

  // Form State
  const [formId, setFormId] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formRating, setFormRating] = useState(4.5);
  const [formImage, setFormImage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formSpec1, setFormSpec1] = useState('');
  const [formSpec2, setFormSpec2] = useState('');
  const [formSpec3, setFormSpec3] = useState('');
  const [formSpec4, setFormSpec4] = useState('');
  const [formError, setFormError] = useState('');

  // Status indicators for DB operations
  const [isCompressing, setIsCompressing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load state and sync/seed database on mount
  useEffect(() => {
    // Admin mode sync
    const active = localStorage.getItem('sadguru_admin_active') === 'true';
    setIsAdminMode(active);

    const handleLoginChange = () => {
      setIsAdminMode(localStorage.getItem('sadguru_admin_active') === 'true');
    };
    window.addEventListener('sadguru-admin-login-changed', handleLoginChange);

    const seedInitialData = async () => {
      try {
        const { count, error: countError } = await supabase
          .from('mobiles')
          .select('*', { count: 'exact', head: true });

        if (countError) throw countError;

        if (count === 0) {
          const insertData = products.map((p) => ({
            brand: p.brand,
            model_name: p.name,
            price: p.price,
            rating: p.rating,
            image_url: p.image,
            spec1: p.specs[0] || null,
            spec2: p.specs[1] || null,
            spec3: p.specs[2] || null,
            spec4: p.specs[3] || null,
          }));

          const { error: seedError } = await supabase
            .from('mobiles')
            .insert(insertData);

          if (seedError) throw seedError;
        }
      } catch (err) {
        console.error('Failed to seed or check database:', err);
      }
    };

    seedInitialData();

    return () => {
      window.removeEventListener('sadguru-admin-login-changed', handleLoginChange);
    };
  }, []);

  const fetchProductsForBrand = async (brandName: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('mobiles')
        .select('*')
        .eq('brand', brandName)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const mapped: Product[] = (data || []).map((row) => ({
        id: row.id,
        brand: row.brand,
        name: row.model_name,
        price: row.price,
        rating: Number(row.rating) || 4.5,
        image: row.image_url || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400',
        specs: [row.spec1, row.spec2, row.spec3, row.spec4].filter(Boolean),
      }));

      setProductList(mapped);
    } catch (err) {
      console.error('Error loading products:', err);
      setFormError('Failed to load products from server.');
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImageToSupabase = async (base64Data: string): Promise<string> => {
    try {
      const blob = dataURLtoBlob(base64Data);
      const fileExt = 'jpg';
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from('mobile-images')
        .upload(filePath, blob, {
          contentType: 'image/jpeg',
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from('mobile-images')
        .getPublicUrl(filePath);

      return publicUrlData.publicUrl;
    } catch (err) {
      console.error('Image upload failed:', err);
      throw new Error('Failed to upload image to storage.');
    }
  };

  const resetForm = () => {
    setFormId(null);
    setFormName('');
    setFormPrice('');
    setFormRating(4.5);
    setFormImage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    setFormSpec1('');
    setFormSpec2('');
    setFormSpec3('');
    setFormSpec4('');
    setFormError('');
  };

  const handleBrandClick = (brandName: string) => {
    setSelectedBrand(brandName);
    setIsOpen(true);
    setShowForm(false);
    resetForm();
    fetchProductsForBrand(brandName);
  };

  const handleEditClick = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    setFormId(product.id);
    setFormName(product.name);
    setFormPrice(product.price);
    setFormRating(product.rating || 4.5);
    setFormImage(product.image || '');
    setFormSpec1(product.specs[0] || '');
    setFormSpec2(product.specs[1] || '');
    setFormSpec3(product.specs[2] || '');
    setFormSpec4(product.specs[3] || '');
    setShowForm(true);
  };

  const handleDeleteClick = async (productId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to remove this model?')) {
      setIsSaving(true);
      try {
        const { error } = await supabase
          .from('mobiles')
          .delete()
          .eq('id', productId);

        if (error) throw error;

        if (selectedBrand) {
          await fetchProductsForBrand(selectedBrand);
        }
        if (formId === productId) {
          resetForm();
          setShowForm(false);
        }
      } catch (err: any) {
        console.error('Delete failed:', err);
        alert(err.message || 'Failed to delete product.');
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleSubmitProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBrand) return;

    if (!formName.trim() || !formPrice.trim()) {
      setFormError('Model Name and Price are required.');
      return;
    }

    setIsSaving(true);
    setFormError('');

    try {
      const priceFormatted = formPrice.trim().startsWith('₹') ? formPrice.trim() : `₹${formPrice.trim()}`;
      const defaultImage = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400';
      let finalImageUrl = formImage.trim() || defaultImage;

      if (formImage.startsWith('data:')) {
        finalImageUrl = await uploadImageToSupabase(formImage);
      }

      if (formId) {
        // Edit
        const { error } = await supabase
          .from('mobiles')
          .update({
            model_name: formName.trim(),
            price: priceFormatted,
            rating: Number(formRating) || 4.5,
            image_url: finalImageUrl,
            spec1: formSpec1.trim() || null,
            spec2: formSpec2.trim() || null,
            spec3: formSpec3.trim() || null,
            spec4: formSpec4.trim() || null,
          })
          .eq('id', formId);

        if (error) throw error;
      } else {
        // Add
        const { error } = await supabase
          .from('mobiles')
          .insert({
            brand: selectedBrand,
            model_name: formName.trim(),
            price: priceFormatted,
            rating: Number(formRating) || 4.5,
            image_url: finalImageUrl,
            spec1: formSpec1.trim() || null,
            spec2: formSpec2.trim() || null,
            spec3: formSpec3.trim() || null,
            spec4: formSpec4.trim() || null,
          });

        if (error) throw error;
      }

      await fetchProductsForBrand(selectedBrand);
      setShowForm(false);
      resetForm();
    } catch (err: any) {
      console.error('Save failed:', err);
      setFormError(err.message || 'Failed to save product details.');
    } finally {
      setIsSaving(false);
    }
  };

  const brandProducts = productList;

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
                {brand.name === 'Ai+' ? 'Ai+' : brand.name.charAt(0)}
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

                  <div className="relative mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-black text-[#0F172A]">{selectedBrand} Collection</h3>
                      <p className="text-sm text-[#64748B]">Available models at Shree Sadguru Mobiles</p>
                    </div>
                    {isAdminMode && !showForm && (
                      <button
                        onClick={() => {
                          resetForm();
                          setShowForm(true);
                        }}
                        className="self-start sm:self-center px-5 py-2.5 rounded-full bg-[#1A3A8F] hover:bg-[#0F2560] text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add New Model
                      </button>
                    )}
                  </div>

                  {isLoading ? (
                    <div className="py-24 flex flex-col items-center justify-center gap-4">
                      <div className="w-12 h-12 rounded-full border-4 border-slate-100 border-t-[#1A3A8F] animate-spin" />
                      <p className="text-xs font-bold text-slate-500 animate-pulse uppercase tracking-widest">Loading mobile listings...</p>
                    </div>
                  ) : showForm ? (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm"
                    >
                      <h4 className="text-lg font-black text-[#0F172A] mb-2">
                        {formId ? '✍️ Edit Mobile Model' : '➕ Add New Mobile Model'}
                      </h4>
                      <p className="text-xs text-[#64748B] mb-6">
                        Provide the specification details for the brand model to list or update.
                      </p>

                      <form onSubmit={handleSubmitProduct} className="space-y-4">
                        {formError && (
                          <div className="p-3 rounded-lg bg-red-100 text-red-700 text-xs font-bold">
                            {formError}
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                              Model Name
                            </label>
                            <input
                              type="text"
                              disabled={isSaving}
                              value={formName}
                              onChange={(e) => setFormName(e.target.value)}
                              placeholder="e.g. iPhone 15 Pro Max"
                              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-[#1A3A8F] focus:outline-none transition-all text-slate-800 font-medium disabled:opacity-50"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                              Price
                            </label>
                            <input
                              type="text"
                              disabled={isSaving}
                              value={formPrice}
                              onChange={(e) => setFormPrice(e.target.value)}
                              placeholder="e.g. ₹1,59,900"
                              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-[#1A3A8F] focus:outline-none transition-all text-slate-800 font-medium disabled:opacity-50"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                              Rating (1.0 - 5.0)
                            </label>
                            <input
                              type="number"
                              step="0.1"
                              min="1"
                              max="5"
                              disabled={isSaving}
                              value={formRating}
                              onChange={(e) => setFormRating(parseFloat(e.target.value))}
                              placeholder="e.g. 4.8"
                              className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm focus:border-[#1A3A8F] focus:outline-none transition-all text-slate-800 font-medium disabled:opacity-50"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                              Product Image (Optional)
                            </label>
                            <div
                              onClick={() => { if (!isSaving && !isCompressing) fileInputRef.current?.click(); }}
                              className="relative w-full h-[52px] rounded-xl bg-white border-2 border-dashed border-slate-200 hover:border-[#1A3A8F] transition-all cursor-pointer flex items-center gap-3 px-3 group overflow-hidden"
                            >
                              {isCompressing ? (
                                <>
                                  <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center shrink-0">
                                    <svg className="w-4 h-4 text-[#1A3A8F] animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.253 8H18" />
                                    </svg>
                                  </div>
                                  <span className="text-xs text-slate-500 font-medium animate-pulse">Compressing image...</span>
                                </>
                              ) : formImage ? (
                                <>
                                  <img
                                    src={formImage}
                                    alt="preview"
                                    className="w-9 h-9 rounded-lg object-cover shrink-0 border border-slate-100 shadow-sm"
                                  />
                                  <span className="text-xs font-semibold text-slate-600 truncate flex-1">Image selected ✓</span>
                                  <button
                                    type="button"
                                    disabled={isSaving}
                                    onClick={(e) => { e.stopPropagation(); setFormImage(''); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                                    className="shrink-0 w-6 h-6 rounded-full bg-red-50 hover:bg-red-100 text-red-500 flex items-center justify-center text-xs font-bold transition-all disabled:opacity-50"
                                  >
                                    ✕
                                  </button>
                                </>
                              ) : (
                                <>
                                  <div className="w-9 h-9 rounded-lg bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center shrink-0 transition-colors">
                                    <svg className="w-4 h-4 text-slate-400 group-hover:text-[#1A3A8F] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                    </svg>
                                  </div>
                                  <span className="text-xs text-slate-400 group-hover:text-[#1A3A8F] font-medium transition-colors">Click to upload image</span>
                                </>
                              )}
                            </div>
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={isCompressing || isSaving}
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                setIsCompressing(true);
                                try {
                                  const compressed = await compressImage(file);
                                  setFormImage(compressed);
                                } catch (err) {
                                  console.error('Image compression failed, fallback to raw load:', err);
                                  const reader = new FileReader();
                                  reader.onload = (ev) => setFormImage(ev.target?.result as string);
                                  reader.readAsDataURL(file);
                                } finally {
                                  setIsCompressing(false);
                                }
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-[#0F172A] uppercase tracking-wider mb-1.5">
                            Specifications (Max 4 Bullet Points)
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <input
                              type="text"
                              disabled={isSaving}
                              value={formSpec1}
                              onChange={(e) => setFormSpec1(e.target.value)}
                              placeholder="Spec 1 (e.g. A17 Pro Chip)"
                              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs focus:border-[#1A3A8F] focus:outline-none transition-all text-slate-800 disabled:opacity-50"
                            />
                            <input
                              type="text"
                              disabled={isSaving}
                              value={formSpec2}
                              onChange={(e) => setFormSpec2(e.target.value)}
                              placeholder="Spec 2 (e.g. 48MP Main Camera)"
                              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs focus:border-[#1A3A8F] focus:outline-none transition-all text-slate-800 disabled:opacity-50"
                            />
                            <input
                              type="text"
                              disabled={isSaving}
                              value={formSpec3}
                              onChange={(e) => setFormSpec3(e.target.value)}
                              placeholder='Spec 3 (e.g. 6.7" Super Retina XDR)'
                              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs focus:border-[#1A3A8F] focus:outline-none transition-all text-slate-800 disabled:opacity-50"
                            />
                            <input
                              type="text"
                              disabled={isSaving}
                              value={formSpec4}
                              onChange={(e) => setFormSpec4(e.target.value)}
                              placeholder="Spec 4 (e.g. Titanium Design)"
                              className="w-full px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs focus:border-[#1A3A8F] focus:outline-none transition-all text-slate-800 disabled:opacity-50"
                            />
                          </div>
                        </div>

                        <div className="pt-4 flex justify-end gap-3">
                          <button
                            type="button"
                            disabled={isSaving}
                            onClick={() => {
                              setShowForm(false);
                              resetForm();
                            }}
                            className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-all disabled:opacity-50"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isSaving || isCompressing}
                            className="px-6 py-2.5 rounded-full bg-[#1A3A8F] hover:bg-[#0F2560] text-white text-xs font-bold transition-all shadow-md disabled:opacity-50 flex items-center gap-2"
                          >
                            {isSaving && (
                              <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.253 8H18" />
                              </svg>
                            )}
                            {formId ? (isSaving ? 'Updating...' : 'Update Model') : (isSaving ? 'Publishing...' : 'Publish Model')}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  ) : brandProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-sans">
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
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
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

                            {isAdminMode ? (
                              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                                <button
                                  onClick={(e) => handleEditClick(product, e)}
                                  disabled={isSaving}
                                  className="flex-1 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-[#1A3A8F] text-[10px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                  </svg>
                                  Edit
                                </button>
                                <button
                                  onClick={(e) => handleDeleteClick(product.id, e)}
                                  disabled={isSaving}
                                  className="flex-1 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-[10px] font-bold transition-all flex items-center justify-center gap-1 cursor-pointer disabled:opacity-50"
                                >
                                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                  </svg>
                                  Delete
                                </button>
                              </div>
                            ) : (
                              <button className="mt-auto w-full py-2 rounded-xl bg-white border border-gray-200 text-[11px] font-bold text-[#0F172A] hover:bg-[#1A3A8F] hover:text-white hover:border-[#1A3A8F] transition-all">
                                View Details
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-20 text-center font-sans">
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
