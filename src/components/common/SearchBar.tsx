import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  value,
  onChange,
  onClear,
}) => {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white rounded-full border border-gray-200 focus-within:border-purple-300 focus-within:ring-2 focus-within:ring-purple-100 transition-all duration-150 shadow-xs">
      <Search size={18} className="text-gray-400 shrink-0" />
      <input
        type="text"
        className="flex-1 text-sm text-gray-900 bg-transparent outline-none placeholder:text-gray-400"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        id="search-input"
      />
      {value && (
        <button
          className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors"
          onClick={onClear}
          aria-label="Clear search"
          id="search-clear-button"
        >
          <X size={12} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
