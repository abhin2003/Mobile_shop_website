export interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  rating: number;
  image: string;
  specs: string[];
}

export const products: Product[] = [
  // Apple
  {
    id: 'apple-1',
    brand: 'Apple',
    name: 'iPhone 15 Pro Max',
    price: '₹1,59,900',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=400',
    specs: ['A17 Pro Chip', '48MP Main Camera', '6.7" Super Retina XDR', 'Titanium Design'],
  },
  {
    id: 'apple-2',
    brand: 'Apple',
    name: 'iPhone 15',
    price: '₹79,900',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=400',
    specs: ['A16 Bionic Chip', 'Dynamic Island', '48MP Main Camera', 'USB-C Charging'],
  },
  // Samsung
  {
    id: 'samsung-1',
    brand: 'Samsung',
    name: 'Galaxy S24 Ultra',
    price: '₹1,29,999',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1707038164316-c95190013511?q=80&w=400',
    specs: ['Snapdragon 8 Gen 3', '200MP Camera', 'S Pen Included', 'AI Features'],
  },
  {
    id: 'samsung-2',
    brand: 'Samsung',
    name: 'Galaxy Z Fold 5',
    price: '₹1,54,999',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1690029302633-93d3957297e6?q=80&w=400',
    specs: ['7.6" Main Display', 'Snapdragon 8 Gen 2', 'Triple Rear Camera', 'IPX8 Water Resistance'],
  },
  // OnePlus
  {
    id: 'oneplus-1',
    brand: 'OnePlus',
    name: 'OnePlus 12',
    price: '₹64,999',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1706692550186-f64e79786a3d?q=80&w=400',
    specs: ['Snapdragon 8 Gen 3', 'Hasselblad Camera', '100W SUPERVOOC', 'LTPO AMOLED'],
  },
  {
    id: 'oneplus-2',
    brand: 'OnePlus',
    name: 'OnePlus Nord CE 4',
    price: '₹24,999',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?q=80&w=400',
    specs: ['Snapdragon 7 Gen 3', '50MP Sony LYT-600', '100W SUPERVOOC', '5500mAh Battery'],
  },
  // Vivo
  {
    id: 'vivo-1',
    brand: 'Vivo',
    name: 'Vivo X100 Pro',
    price: '₹89,999',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1689255303790-26466f2a74c2?q=80&w=400',
    specs: ['ZEISS APO Telephoto', 'Dimensity 9300', '100W Charging', 'IP68 Rating'],
  },
  // Google
  {
    id: 'google-1',
    brand: 'Google Pixel',
    name: 'Pixel 8 Pro',
    price: '₹1,06,999',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1697205167035-71f654b9d073?q=80&w=400',
    specs: ['Google Tensor G3', 'Triple Pro Camera', '7 Years Updates', 'Temperature Sensor'],
  },
  // Default for others
  {
    id: 'default-1',
    brand: 'Oppo',
    name: 'Oppo Reno 11 Pro',
    price: '₹39,999',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=400',
    specs: ['MediaTek Dimensity 8200', '50MP Telephoto', '80W SUPERVOOC', 'Curved Display'],
  },
];
