import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorState from '../../../components/common/ErrorState';

describe('ErrorState Component Unit Tests', () => {
  it('renders custom error message correctly', () => {
    render(<ErrorState message="Failed to load product list" />);
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Failed to load product list')).toBeInTheDocument();
  });

  it('renders retry button and triggers callback when provided', () => {
    const handleRetry = vi.fn();
    render(<ErrorState message="Connection error" onRetry={handleRetry} />);

    const retryButton = screen.getByRole('button', { name: /try again/i });
    expect(retryButton).toBeInTheDocument();

    fireEvent.click(retryButton);
    expect(handleRetry).toHaveBeenCalledTimes(1);
  });
});
