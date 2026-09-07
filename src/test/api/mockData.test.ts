import { describe, it, expect } from 'vitest';
import { calculateEMI, generateEMIPlans, products, categories, brands } from '../../api/mockData';

describe('Mock Data & EMI Calculations Unit Tests', () => {
  it('calculates zero interest no-cost EMI correctly', () => {
    const res = calculateEMI(120000, 6, 0);
    expect(res.isNoCost).toBe(true);
    expect(res.monthlyAmount).toBe(20000);
    expect(res.totalAmount).toBe(120000);
    expect(res.interest).toBe(0);
  });

  it('calculates interest-bearing EMI correctly', () => {
    const res = calculateEMI(100000, 12, 12);
    expect(res.isNoCost).toBe(false);
    expect(res.monthlyAmount).toBeGreaterThan(Math.ceil(100000 / 12));
    expect(res.interest).toBeGreaterThan(0);
  });

  it('generates EMI plans for specified tenures', () => {
    const plans = generateEMIPlans(60000, [3, 6, 12]);
    expect(plans).toHaveLength(3);
    expect(plans[0].tenure).toBe(3);
    expect(plans[0].monthlyAmount).toBe(20000);
    expect(plans[2].tenure).toBe(12);
    expect(plans[2].monthlyAmount).toBe(5000);
  });

  it('contains valid mock dataset for products, categories, and brands', () => {
    expect(products.length).toBeGreaterThan(5);
    expect(categories.length).toBeGreaterThan(2);
    expect(brands.length).toBeGreaterThan(0);
  });
});
