import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import {
  ProductCardSkeleton,
  ProductGridSkeleton,
  ProductDetailSkeleton,
  BrandListSkeleton,
} from '../../../components/common/LoadingSkeleton';

describe('LoadingSkeleton Component Unit Tests', () => {
  it('renders ProductCardSkeleton without errors', () => {
    const { container } = render(<ProductCardSkeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders ProductGridSkeleton with specified card count', () => {
    const { container } = render(<ProductGridSkeleton count={4} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders ProductDetailSkeleton without errors', () => {
    const { container } = render(<ProductDetailSkeleton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders BrandListSkeleton without errors', () => {
    const { container } = render(<BrandListSkeleton count={3} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
