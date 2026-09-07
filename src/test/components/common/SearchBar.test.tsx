import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../../../components/common/SearchBar';

describe('SearchBar Component Unit Tests', () => {
  it('renders input with placeholder correctly', () => {
    render(
      <SearchBar
        placeholder="Search electronics..."
        value=""
        onChange={vi.fn()}
        onClear={vi.fn()}
      />
    );

    const inputElement = screen.getByPlaceholderText('Search electronics...');
    expect(inputElement).toBeInTheDocument();
  });

  it('calls onChange handler when user types', () => {
    const handleChange = vi.fn();
    render(<SearchBar value="" onChange={handleChange} onClear={vi.fn()} />);

    const inputElement = screen.getByPlaceholderText('Search...');
    fireEvent.change(inputElement, { target: { value: 'MacBook' } });

    expect(handleChange).toHaveBeenCalledWith('MacBook');
  });

  it('renders clear button when value is present and calls onClear when clicked', () => {
    const handleClear = vi.fn();
    render(<SearchBar value="Sony" onChange={vi.fn()} onClear={handleClear} />);

    const clearButton = screen.getByRole('button', { name: /clear search/i });
    expect(clearButton).toBeInTheDocument();

    fireEvent.click(clearButton);
    expect(handleClear).toHaveBeenCalledTimes(1);
  });
});
