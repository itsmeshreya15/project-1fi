import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CategoryFilter from '../../../components/marketplace/CategoryFilter';
import { Category } from '../../../types';

const mockCategories: Category[] = [
  { id: 'all', name: 'All' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'fashion', name: 'Fashion' },
];

describe('CategoryFilter Component Unit Tests', () => {
  it('renders category chips correctly', () => {
    render(
      <CategoryFilter
        categories={mockCategories}
        activeCategory="all"
        onCategoryChange={vi.fn()}
      />
    );

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('Fashion')).toBeInTheDocument();
  });

  it('triggers onCategoryChange when chip is clicked', () => {
    const handleChange = vi.fn();
    render(
      <CategoryFilter
        categories={mockCategories}
        activeCategory="all"
        onCategoryChange={handleChange}
      />
    );

    const electronicsChip = screen.getByText('Electronics');
    fireEvent.click(electronicsChip);

    expect(handleChange).toHaveBeenCalledWith('electronics');
  });
});
