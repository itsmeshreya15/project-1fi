import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EMIPlanCard from '../../../components/marketplace/EMIPlanCard';
import { EMIPlan } from '../../../types';

const mockPlan: EMIPlan = {
  id: 'emi-9',
  tenure: 9,
  label: '9 Months',
  monthlyAmount: 19989,
  totalAmount: 179900,
  isNoCost: true,
  interest: 0,
};

const formatPrice = (val: number) => `₹${val.toLocaleString('en-IN')}`;

describe('EMIPlanCard Component Unit Tests', () => {
  it('renders plan tenure, monthly amount, total price, and no-cost badge', () => {
    render(
      <EMIPlanCard
        plan={mockPlan}
        isSelected={false}
        onSelect={vi.fn()}
        formatPrice={formatPrice}
      />
    );

    expect(screen.getByText('9 Months')).toBeInTheDocument();
    expect(screen.getByText('₹19,989')).toBeInTheDocument();
    expect(screen.getByText('Total: ₹1,79,900')).toBeInTheDocument();
    expect(screen.getByText('NO COST')).toBeInTheDocument();
  });

  it('triggers onSelect with plan id when card is clicked', () => {
    const handleSelect = vi.fn();
    render(
      <EMIPlanCard
        plan={mockPlan}
        isSelected={false}
        onSelect={handleSelect}
        formatPrice={formatPrice}
      />
    );

    const card = screen.getByText('9 Months').closest('div');
    if (card) {
      fireEvent.click(card);
    }
    expect(handleSelect).toHaveBeenCalledWith('emi-9');
  });
});
