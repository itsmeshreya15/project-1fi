export interface ColorVariant {
  id: string;
  name: string;
  hex: string;
}

export interface StorageVariant {
  id: string;
  name: string;
  priceModifier: number;
}

export interface SizeVariant {
  id: string;
  name: string;
  priceModifier?: number;
}

export interface ProductVariants {
  colors?: ColorVariant[];
  storage?: StorageVariant[];
  sizes?: SizeVariant[];
}

export type VariantGroup = ProductVariants;

export interface EMIPlan {
  id: string;
  tenure: number;
  label: string;
  monthlyAmount: number;
  totalAmount: number;
  interest: number;
  isNoCost: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: 'electronics' | 'fashion' | 'home';
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  description: string;
  rating: number;
  reviewCount: number;
  variants?: ProductVariants;
  emiPlans: EMIPlan[];
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  emiInfo: string;
  color: string;
}

export interface TabItem {
  id: string;
  label: string;
}

export type SelectedVariantsMap = Record<string, string>;
