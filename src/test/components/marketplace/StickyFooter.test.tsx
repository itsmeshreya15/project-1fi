import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import StickyFooter from '../../../components/marketplace/StickyFooter';
import { EMIPlan } from '../../../types';

const mockPlan: EMIPlan = {
  id: 'emi-6',
  tenure: 6,
  label: '6 Months',
  monthlyAmount: 29984,
  totalAmount: 179900,
  isNoCost: true,
  interest: 0,
};

const formatPrice = (val: number) => `₹${val.toLocaleString('en-IN')}`;

describe('StickyFooter Component Unit Tests', () => {
  it('renders disabled state when no plan is selected', () => {
    render(
      <StickyFooter
        selectedPlan={null}
        formatPrice={formatPrice}
        onProceed={vi.fn()}
      />
    );

    expect(screen.getByText('Select an EMI plan')).toBeInTheDocument();
    const proceedButton = screen.getByRole('button', { name: /proceed/i });
    expect(proceedButton).toBeDisabled();
  });

  it('renders selected plan details and enables proceed button when plan is active', () => {
    render(
      <StickyFooter
        selectedPlan={mockPlan}
        formatPrice={formatPrice}
        onProceed={vi.fn()}
      />
    );

    expect(screen.getByText(/Selected Plan \(6 Months\)/i)).toBeInTheDocument();
    expect(screen.getByText('₹29,984')).toBeInTheDocument();

    const proceedButton = screen.getByRole('button', { name: /proceed/i });
    expect(proceedButton).not.toBeDisabled();
  });

  it('calls onProceed when proceed button is clicked', () => {
    const handleProceed = vi.fn();
    render(
      <StickyFooter
        selectedPlan={mockPlan}
        formatPrice={formatPrice}
        onProceed={handleProceed}
      />
    );

    const proceedButton = screen.getByRole('button', { name: /proceed/i });
    fireEvent.click(proceedButton);
    expect(handleProceed).toHaveBeenCalledTimes(1);
  });
});
