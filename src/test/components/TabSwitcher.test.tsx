import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TabSwitcher from '../../components/TabSwitcher';

const mockTabs = [
  { id: 'top-brands', label: 'Top Brands' },
  { id: 'nearby-stores', label: 'Nearby Stores' },
  { id: 'marketplace', label: 'Marketplace' },
];

describe('TabSwitcher Component Unit Tests', () => {
  it('renders all 3 tab labels correctly', () => {
    render(<TabSwitcher tabs={mockTabs} activeTab="marketplace" onTabChange={vi.fn()} />);

    expect(screen.getByText('Top Brands')).toBeInTheDocument();
    expect(screen.getByText('Nearby Stores')).toBeInTheDocument();
    expect(screen.getByText('Marketplace')).toBeInTheDocument();
  });

  it('triggers onTabChange callback when tab is clicked', () => {
    const handleTabChange = vi.fn();
    render(<TabSwitcher tabs={mockTabs} activeTab="marketplace" onTabChange={handleTabChange} />);

    const brandsTab = screen.getByText('Top Brands');
    fireEvent.click(brandsTab);

    expect(handleTabChange).toHaveBeenCalledWith('top-brands');
  });
});
