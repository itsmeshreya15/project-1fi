import { products, brands, categories, generateEMIPlans } from './mockData';
import { Product, Brand, Category, EMIPlan } from '../types';

const simulateDelay = (ms: number | null = null): Promise<void> => {
  const delay = ms || Math.floor(Math.random() * 100) + 100;
  return new Promise((resolve) => setTimeout(resolve, delay));
};

let shouldSimulateError = false;

export const setErrorSimulation = (value: boolean): void => {
  shouldSimulateError = value;
};

const checkForError = (): void => {
  if (shouldSimulateError) {
    throw new Error('Network error: Unable to fetch data. Please try again.');
  }
};

export const fetchProducts = async (
  category: string = 'all',
  searchQuery: string = ''
): Promise<Product[]> => {
  await simulateDelay();
  checkForError();

  let result = [...products];

  if (category && category !== 'all') {
    result = result.filter((product) => product.category === category);
  }

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    result = result.filter((product) => {
      const categoryObj = categories.find((c) => c.id === product.category);
      const categoryName = categoryObj ? categoryObj.name.toLowerCase() : '';

      return (
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        categoryName.includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    });
  }

  return result;
};

export const fetchProductById = async (productId: string): Promise<Product> => {
  await simulateDelay();
  checkForError();

  const product = products.find((p) => p.id === productId);

  if (!product) {
    throw new Error(`Product not found: ${productId}`);
  }

  return { ...product };
};

export const fetchBrands = async (searchQuery: string = ''): Promise<Brand[]> => {
  await simulateDelay();
  checkForError();

  let result = [...brands];

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase().trim();
    result = result.filter((brand) =>
      brand.name.toLowerCase().includes(query)
    );
  }

  return result;
};

export const fetchCategories = async (): Promise<Category[]> => {
  await simulateDelay(200);
  checkForError();

  return [...categories];
};

export const fetchEMIPlans = async (
  productId: string,
  price: number | null = null
): Promise<EMIPlan[]> => {
  await simulateDelay(200);
  checkForError();

  const product = products.find((p) => p.id === productId);

  if (!product) {
    throw new Error(`Product not found: ${productId}`);
  }

  if (price && price !== product.price) {
    const tenures = product.emiPlans.map((plan) => plan.tenure);
    return generateEMIPlans(price, tenures);
  }

  return [...product.emiPlans];
};

export default {
  fetchProducts,
  fetchProductById,
  fetchBrands,
  fetchCategories,
  fetchEMIPlans,
  setErrorSimulation,
};
