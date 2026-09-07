import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroBanner from '../../components/HeroBanner';

describe('HeroBanner Component Unit Tests', () => {
  it('renders hero banner image correctly', () => {
    render(<HeroBanner />);

    const img = screen.getByAltText(/1Fi Marketplace Banner/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/banner.webp');
  });
});
