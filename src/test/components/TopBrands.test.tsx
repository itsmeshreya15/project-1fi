import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import TopBrands, { clearTopBrandsCache } from '../../components/TopBrands';

describe('TopBrands Component Unit Tests', () => {
  beforeEach(() => {
    clearTopBrandsCache();
  });

  it('renders top brands header and loads brand list asynchronously', async () => {
    render(<TopBrands />);

    expect(screen.getByText('Top Brands')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Air India')).toBeInTheDocument();
      expect(screen.getByText('Apple Premium Reseller')).toBeInTheDocument();
    });
  });
});
