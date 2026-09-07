import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ShopPage from '../../pages/ShopPage';
import { clearMarketplaceCache } from '../../components/marketplace/MarketplaceHome';

describe('ShopPage Component Unit Tests', () => {
  beforeEach(() => {
    clearMarketplaceCache();
  });

  it('renders hero banner, tab switcher, and default marketplace tab content', async () => {
    render(
      <MemoryRouter>
        <ShopPage />
      </MemoryRouter>
    );

    expect(screen.getByAltText(/1Fi Marketplace Banner/i)).toBeInTheDocument();
    expect(screen.getAllByText('Marketplace').length).toBeGreaterThan(0);

    await waitFor(() => {
      expect(screen.getByText('iPhone 15 Pro')).toBeInTheDocument();
    });
  });
});
