import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../../../components/marketplace/ProductCard';
import { Product } from '../../../types';

const mockProduct: Product = {
  id: 'prod-001',
  name: 'iPhone 15 Pro',
  brand: 'Apple',
  category: 'electronics',
  price: 129900,
  originalPrice: 139900,
  discount: 7,
  image: '/images/iphone 15 pro.webp',
  description: 'iPhone 15 Pro test description',
  rating: 4.7,
  reviewCount: 2340,
  emiPlans: [
    {
      id: 'emi-12',
      tenure: 12,
      label: '12 Months',
      monthlyAmount: 10825,
      totalAmount: 129900,
      isNoCost: true,
      interest: 0,
    },
  ],
};

describe('ProductCard Component Unit Tests', () => {
  it('renders product details, brand, price, and EMI teaser correctly', () => {
    render(
      <MemoryRouter>
        <ProductCard product={mockProduct} index={0} />
      </MemoryRouter>
    );

    expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument();
    expect(screen.getAllByText('Apple').length).toBeGreaterThan(0);
    expect(screen.getByText(/₹1,29,900/)).toBeInTheDocument();
    expect(screen.getByText('7% OFF')).toBeInTheDocument();
  });
});
