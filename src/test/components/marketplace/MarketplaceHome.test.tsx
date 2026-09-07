import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MarketplaceHome, { clearMarketplaceCache } from '../../../components/marketplace/MarketplaceHome';

describe('MarketplaceHome Component Unit Tests', () => {
  beforeEach(() => {
    clearMarketplaceCache();
  });

  it('renders search bar, category filter, and product grid', async () => {
    render(
      <MemoryRouter>
        <MarketplaceHome />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument();
      expect(screen.getByText('Samsung Galaxy S24 Ultra')).toBeInTheDocument();
    });
  });
});
