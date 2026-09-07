import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ProductDetailPage from '../../pages/ProductDetailPage';

describe('ProductDetailPage Unit Tests', () => {
  it('renders product details and handles EMI plan selection and proceed flow', async () => {
    render(
      <MemoryRouter initialEntries={['/product/prod-001']}>
        <Routes>
          <Route path="/product/:id" element={<ProductDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'iPhone 15 Pro' })).toBeInTheDocument();
    });

    expect(screen.getByText('9 Months')).toBeInTheDocument();
    expect(screen.getByText('12 Months')).toBeInTheDocument();

    const plan9Card = screen.getByText('9 Months');
    fireEvent.click(plan9Card);

    const proceedButton = screen.getByRole('button', { name: /proceed/i });
    expect(proceedButton).not.toBeDisabled();
    fireEvent.click(proceedButton);

    await waitFor(() => {
      expect(screen.getByText('EMI Plan Selected')).toBeInTheDocument();
      expect(screen.getAllByText('9 Months').length).toBeGreaterThan(0);
    });
  });
});
