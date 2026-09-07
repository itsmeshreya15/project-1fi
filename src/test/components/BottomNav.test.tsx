import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import BottomNav from '../../components/BottomNav';

describe('BottomNav Component Unit Tests', () => {
  it('renders all navigation items correctly', () => {
    render(<BottomNav activeTab="shop" />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Shop')).toBeInTheDocument();
    expect(screen.getByText('EMI Dues')).toBeInTheDocument();
    expect(screen.getByText('Limit')).toBeInTheDocument();
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

  it('applies active styling to the currently active tab', () => {
    render(<BottomNav activeTab="shop" />);
    const shopButton = screen.getByRole('button', { name: /shop/i });
    expect(shopButton).toHaveClass('text-[#6C2BD9]');
  });
});
