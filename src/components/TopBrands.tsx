import React, { useState, useEffect } from 'react';
import { fetchBrands } from '../api/api';
import SearchBar from './common/SearchBar';
import { BrandListSkeleton } from './common/LoadingSkeleton';
import ErrorState from './common/ErrorState';
import { Brand } from '../types';

let cachedBrands: Brand[] | null = null;

export const clearTopBrandsCache = () => {
  cachedBrands = null;
};

const TopBrands: React.FC = () => {
  const [brands, setBrands] = useState<Brand[]>(cachedBrands || []);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(!cachedBrands);
  const [error, setError] = useState<string | null>(null);

  const loadBrands = async (query = searchQuery) => {
    try {
      if (!cachedBrands || query) {
        setLoading(true);
      }
      setError(null);
      const data = await fetchBrands(query);
      setBrands(data);
      if (!query && data.length > 0) {
        cachedBrands = data;
      }
    } catch (err: any) {
      setError(err.message || 'Unable to fetch top brands');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBrands(searchQuery);
  }, [searchQuery]);

  return (
    <div className="pb-16 px-4 pt-4" id="top-brands-section">
      <div className="pb-2">
        <SearchBar
          placeholder="Search online stores..."
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
        />
      </div>

      <div className="flex items-center justify-between my-3">
        <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Top Brands</h2>
      </div>

      {loading && brands.length === 0 && <BrandListSkeleton count={2} />}

      {error && (
        <ErrorState message={error} onRetry={() => loadBrands(searchQuery)} />
      )}

      {(!loading || brands.length > 0) && !error && (
        <div className="flex flex-col gap-3.5">
          {brands.length === 0 ? (
            <div className="py-12 text-center text-gray-500 text-sm">
              No brands found for "{searchQuery}"
            </div>
          ) : (
            brands.map((brand) => (
              <div
                className="flex items-center gap-3.5 p-4 bg-white rounded-2xl border border-gray-200/70 shadow-xs"
                key={brand.id}
                id={`brand-${brand.id}`}
              >
                <div className="w-16 h-16 rounded-2xl border border-gray-200/80 flex items-center justify-center shrink-0 bg-white shadow-2xs overflow-hidden">
                  {brand.logo ? (
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <span className="text-gray-900 font-extrabold text-base">
                      {brand.name.substring(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-gray-900 leading-tight truncate">
                    {brand.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 font-normal leading-relaxed">
                    {brand.emiInfo}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default TopBrands;
