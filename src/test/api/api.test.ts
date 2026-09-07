import { describe, it, expect } from 'vitest';
import {
  fetchProducts,
  fetchProductById,
  fetchBrands,
  fetchCategories,
  fetchEMIPlans,
  setErrorSimulation,
} from '../../api/api';

describe('API Service Unit Tests', () => {
  it('fetches all products when no filters are provided', async () => {
    const products = await fetchProducts();
    expect(products.length).toBeGreaterThan(0);
  });

  it('filters products by category correctly', async () => {
    const electronics = await fetchProducts('electronics');
    expect(electronics.every((p) => p.category === 'electronics')).toBe(true);
  });

  it('filters products by search query matching name or brand', async () => {
    const results = await fetchProducts('all', 'iPhone');
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((p) => p.name.includes('iPhone'))).toBe(true);
  });

  it('fetches a single product by ID successfully', async () => {
    const product = await fetchProductById('prod-001');
    expect(product).toBeDefined();
    expect(product.id).toBe('prod-001');
  });

  it('throws an error when fetching a non-existent product ID', async () => {
    await expect(fetchProductById('invalid-id-999')).rejects.toThrow('Product not found');
  });

  it('fetches all brands and categories successfully', async () => {
    const brands = await fetchBrands();
    const categories = await fetchCategories();
    expect(brands.length).toBeGreaterThan(0);
    expect(categories.length).toBeGreaterThan(0);
  });

  it('handles simulated error state when setErrorSimulation is enabled', async () => {
    setErrorSimulation(true);
    await expect(fetchProducts()).rejects.toThrow('Network error');
    setErrorSimulation(false);
  });

  it('fetches EMI plans for product with price modifications', async () => {
    const plans = await fetchEMIPlans('prod-001', 150000);
    expect(plans.length).toBeGreaterThan(0);
    expect(plans[0].monthlyAmount).toBe(Math.ceil(150000 / 3));
  });
});
