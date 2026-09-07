import { Product, Category, Brand, EMIPlan } from '../types';

export const calculateEMI = (price: number, months: number, interestRate: number = 0) => {
  if (interestRate === 0) {
    const monthlyAmount = Math.ceil(price / months);
    return {
      monthlyAmount,
      totalAmount: price,
      interest: 0,
      isNoCost: true,
    };
  }
  const monthlyRate = interestRate / 12 / 100;
  const monthlyAmount = Math.ceil(
    (price * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
  );
  const totalAmount = monthlyAmount * months;
  return {
    monthlyAmount,
    totalAmount,
    interest: totalAmount - price,
    isNoCost: false,
  };
};

export const generateEMIPlans = (price: number, tenures: number[] = [3, 6, 9, 12]): EMIPlan[] => {
  return tenures.map((months) => {
    const noCostEMI = calculateEMI(price, months, 0);
    return {
      id: `emi-${months}`,
      tenure: months,
      label: `${months} Months`,
      ...noCostEMI,
    };
  });
};

export const products: Product[] = [
  {
    id: 'prod-001',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    category: 'electronics',
    price: 134900,
    originalPrice: 144900,
    discount: 7,
    image: '/images/iphone 15 pro.webp',
    description:
      'Supercharged by the A17 Pro chip, featuring a lightweight titanium design, customizable Action button, and a versatile 48MP main camera system.',
    rating: 4.8,
    reviewCount: 2450,
    variants: {
      colors: [
        { id: 'titanium-natural', name: 'Natural Titanium', hex: '#BEB7A4' },
        { id: 'titanium-[#6C2BD9]', name: 'Blue Titanium', hex: '#2E3A59' },
        { id: 'titanium-black', name: 'Black Titanium', hex: '#3B3B3D' },
      ],
      storage: [
        { id: '128gb', name: '128 GB', priceModifier: 0 },
        { id: '256gb', name: '256 GB', priceModifier: 10000 },
        { id: '512gb', name: '512 GB', priceModifier: 30000 },
      ],
    },
    emiPlans: generateEMIPlans(134900, [3, 6, 9, 12]),
  },
  {
    id: 'prod-002',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'electronics',
    price: 129999,
    originalPrice: 139999,
    discount: 7,
    image: '/images/Samsung S24 Ultra.webp',
    description:
      'Welcome to the era of mobile AI. With Galaxy AI in your hands, unleash whole new levels of creativity, productivity and possibility.',
    rating: 4.7,
    reviewCount: 1820,
    variants: {
      colors: [
        { id: 'titanium-gray', name: 'Titanium Gray', hex: '#63656A' },
        { id: 'titanium-[#6C2BD9]', name: 'Titanium Violet', hex: '#4A3B69' },
        { id: 'titanium-black', name: 'Titanium Black', hex: '#252525' },
      ],
      storage: [
        { id: '256gb', name: '256 GB', priceModifier: 0 },
        { id: '512gb', name: '512 GB', priceModifier: 15000 },
      ],
    },
    emiPlans: generateEMIPlans(129999, [3, 6, 9, 12]),
  },
  {
    id: 'prod-003',
    name: 'MacBook Air M3',
    brand: 'Apple',
    category: 'electronics',
    price: 114900,
    originalPrice: 124900,
    discount: 8,
    image: '/images/MacBook Air M3.webp',
    description:
      'Lean. Mean. M3 machine. MacBook Air sails through work and play — and the M3 chip brings even greater capabilities to the world’s most popular laptop.',
    rating: 4.9,
    reviewCount: 940,
    variants: {
      colors: [
        { id: 'midnight', name: 'Midnight', hex: '#1E2530' },
        { id: 'starlight', name: 'Starlight', hex: '#F0E6D2' },
        { id: 'space-gray', name: 'Space Gray', hex: '#7D7E80' },
      ],
      storage: [
        { id: '256gb', name: '256 GB SSD', priceModifier: 0 },
        { id: '512gb', name: '512 GB SSD', priceModifier: 20000 },
      ],
    },
    emiPlans: generateEMIPlans(114900, [3, 6, 9, 12]),
  },
  {
    id: 'prod-004',
    name: 'Sony WH-1000XM5 Headphones',
    brand: 'Sony',
    category: 'electronics',
    price: 29990,
    originalPrice: 34990,
    discount: 14,
    image: '/images/Sony WH-1000XM5.avif',
    description:
      'Industry-leading noise canceling with two processors and 8 microphones for unprecedented sound quality and crystal clear hands-free calling.',
    rating: 4.6,
    reviewCount: 3120,
    variants: {
      colors: [
        { id: 'black', name: 'Black', hex: '#1C1C1C' },
        { id: 'silver', name: 'Silver', hex: '#D8D4CE' },
      ],
    },
    emiPlans: generateEMIPlans(29990, [3, 6, 9]),
  },
  {
    id: 'prod-005',
    name: "Levi's 501 Original Jeans",
    brand: "Levi's",
    category: 'fashion',
    price: 4599,
    originalPrice: 5999,
    discount: 23,
    image: "/images/Levi's 501 Original.avif",
    description:
      'The original blue jean since 1873. A classic straight leg style crafted from premium denim with signature button fly.',
    rating: 4.5,
    reviewCount: 1450,
    variants: {
      sizes: [
        { id: 'size-30', name: '30W / 32L', priceModifier: 0 },
        { id: 'size-32', name: '32W / 32L', priceModifier: 0 },
        { id: 'size-34', name: '34W / 32L', priceModifier: 0 },
      ],
    },
    emiPlans: generateEMIPlans(4599, [3, 6]),
  },
  {
    id: 'prod-006',
    name: 'Nike Air Max 270',
    brand: 'Nike',
    category: 'fashion',
    price: 12995,
    originalPrice: 14995,
    discount: 13,
    image: '/images/Nike Air Max 270.png',
    description:
      "Boasting Nike's biggest heel Air unit yet, the Nike Air Max 270 delivers a super-soft ride that feels as impossible as it looks.",
    rating: 4.7,
    reviewCount: 2890,
    variants: {
      sizes: [
        { id: 'uk-7', name: 'UK 7', priceModifier: 0 },
        { id: 'uk-8', name: 'UK 8', priceModifier: 0 },
        { id: 'uk-9', name: 'UK 9', priceModifier: 0 },
      ],
    },
    emiPlans: generateEMIPlans(12995, [3, 6]),
  },
  {
    id: 'prod-007',
    name: 'Dyson V15 Detect Vacuum',
    brand: 'Dyson',
    category: 'home',
    price: 62900,
    originalPrice: 65900,
    discount: 5,
    image: '/images/Dyson V15 Detect.png',
    description:
      'Dyson’s most powerful, intelligent cordless vacuum. Reveals invisible dust. Scientifically proves a deep clean.',
    rating: 4.8,
    reviewCount: 890,
    variants: {
      colors: [
        { id: 'yellow-nickel', name: 'Yellow/Nickel', hex: '#FFD700' },
        { id: 'blue-gold', name: 'Blue/Gold', hex: '#1565C0' },
      ],
    },
    emiPlans: generateEMIPlans(62900, [3, 6, 9, 12]),
  },
  {
    id: 'prod-008',
    name: 'Samsung Crystal 4K TV',
    brand: 'Samsung',
    category: 'home',
    price: 44990,
    originalPrice: 54990,
    discount: 18,
    image: '/images/Samsung Crystal 4K TV 55.webp',
    description:
      'Samsung 55-inch Crystal 4K UHD Smart TV with Dynamic Crystal Color, HDR support, Crystal Processor 4K, and built-in voice assistants.',
    rating: 4.4,
    reviewCount: 6780,
    variants: {
      sizes: [
        { id: '43inch', name: '43"', priceModifier: -10000 },
        { id: '55inch', name: '55"', priceModifier: 0 },
        { id: '65inch', name: '65"', priceModifier: 20000 },
        { id: '75inch', name: '75"', priceModifier: 45000 },
      ],
    },
    emiPlans: generateEMIPlans(44990, [3, 6, 9, 12]),
  },
  {
    id: 'prod-009',
    name: 'boAt Airdopes 441',
    brand: 'boAt',
    category: 'electronics',
    price: 1499,
    originalPrice: 3999,
    discount: 62,
    image: '/images/boAt Airdopes 441.webp',
    description:
      'True Wireless Earbuds with up to 30H Playback, IPX7 Water Resistance, IWP Technology and Type-C Interface.',
    rating: 4.2,
    reviewCount: 15420,
    emiPlans: generateEMIPlans(1499, [3]),
  },
  {
    id: 'prod-010',
    name: 'Ray-Ban Aviator Classic',
    brand: 'Ray-Ban',
    category: 'fashion',
    price: 8990,
    originalPrice: 10990,
    discount: 18,
    image: '/images/Ray-Ban Aviator Classic.png',
    description:
      'Currently one of the most iconic sunglass models in the world. Ray-Ban Aviator Classic sunglasses were originally designed for U.S. aviators in 1937.',
    rating: 4.6,
    reviewCount: 1120,
    variants: {
      colors: [
        { id: 'gold-green', name: 'Gold/G-15 Green', hex: '#D4AF37' },
        { id: 'black-gray', name: 'Black/Gray', hex: '#333333' },
      ],
    },
    emiPlans: generateEMIPlans(8990, [3, 6]),
  },
];

export const categories: Category[] = [
  { id: 'all', name: 'All' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'home', name: 'Home Appliances' },
];

export const brands: Brand[] = [
  {
    id: 'brand-001',
    name: 'Air India',
    logo: '/images/air-india.jpg',
    emiInfo: 'No-cost EMIs upto 18 months',
    color: '#E53935',
  },
  {
    id: 'brand-002',
    name: 'Apple Premium Reseller',
    logo: '/images/apple-premium-reseller.jpg',
    emiInfo: 'No-cost EMIs upto 24 months',
    color: '#000000',
  },
];

export default {
  products,
  categories,
  brands,
  calculateEMI,
  generateEMIPlans,
};
