import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NearbyStores from '../../components/NearbyStores';

describe('NearbyStores Component Unit Tests', () => {
  it('renders store title and location badges', () => {
    render(<NearbyStores />);

    expect(screen.getByText('Nearby Stores')).toBeInTheDocument();
    expect(screen.getByText('Gurugram')).toBeInTheDocument();
  });
});
