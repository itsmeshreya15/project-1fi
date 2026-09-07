import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import VariantSelector from '../../../components/marketplace/VariantSelector';
import { VariantGroup } from '../../../types';

const mockVariants: VariantGroup = {
  colors: [
    { id: 'natural-titanium', name: 'Natural Titanium', hex: '#9A9A9D' },
    { id: 'blue-titanium', name: 'Blue Titanium', hex: '#3B4252' },
  ],
  storage: [
    { id: '128gb', name: '128 GB', priceModifier: 0 },
    { id: '256gb', name: '256 GB', priceModifier: 10000 },
  ],
};

describe('VariantSelector Component Unit Tests', () => {
  it('renders color and storage option buttons correctly', () => {
    render(
      <VariantSelector
        variants={mockVariants}
        selectedVariants={{ color: 'natural-titanium', storage: '128gb' }}
        onVariantChange={vi.fn()}
      />
    );

    expect(screen.getByText(/Color:/i)).toBeInTheDocument();
    expect(screen.getByText('Natural Titanium')).toBeInTheDocument();
    expect(screen.getByText('Storage')).toBeInTheDocument();
    expect(screen.getByText('128 GB')).toBeInTheDocument();
    expect(screen.getByText('256 GB')).toBeInTheDocument();
  });

  it('triggers onVariantChange when variant button is clicked', () => {
    const handleVariantChange = vi.fn();
    render(
      <VariantSelector
        variants={mockVariants}
        selectedVariants={{ color: 'natural-titanium', storage: '128gb' }}
        onVariantChange={handleVariantChange}
      />
    );

    const storage256Btn = screen.getByText('256 GB');
    fireEvent.click(storage256Btn);

    expect(handleVariantChange).toHaveBeenCalledWith('storage', '256gb');
  });
});
