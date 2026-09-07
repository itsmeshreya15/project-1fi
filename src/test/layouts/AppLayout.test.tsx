import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppLayout from '../../layouts/AppLayout';

describe('AppLayout Component Unit Tests', () => {
  it('renders child content inside mobile layout container with bottom navigation bar', () => {
    render(
      <MemoryRouter>
        <AppLayout>
          <div>Child Content Text</div>
        </AppLayout>
      </MemoryRouter>
    );

    expect(screen.getByText('Child Content Text')).toBeInTheDocument();
    expect(screen.getByText('Shop')).toBeInTheDocument();
  });
});
