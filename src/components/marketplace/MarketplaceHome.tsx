import React, { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories } from '../../api/api';
import SearchBar from '../common/SearchBar';
import CategoryFilter from './CategoryFilter';
import ProductCard from './ProductCard';
import { ProductGridSkeleton } from '../common/LoadingSkeleton';
import ErrorState from '../common/ErrorState';
import { Product, Category } from '../../types';

let cachedProducts: Product[] | null = null;
let cachedCategories: Category[] | null = null;

export const clearMarketplaceCache = () => {
  cachedProducts = null;
  cachedCategories = null;
};

const MarketplaceHome: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(cachedProducts || []);
  const [categories, setCategories] = useState<Category[]>(cachedCategories || []);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(!cachedProducts || cachedProducts.length === 0);
  const [error, setError] = useState<string | null>(null);

  const loadData = async (cat = activeCategory, query = searchQuery) => {
    try {
      if (!cachedProducts && products.length === 0) {
        setLoading(true);
      }
      setError(null);
      const [productData, categoryData] = await Promise.all([
        fetchProducts(cat, query),
        categories.length === 0 ? fetchCategories() : Promise.resolve(categories),
      ]);
      setProducts(productData);
      if (cat === 'all' && !query && productData.length > 0) {
        cachedProducts = productData;
      }
      if (categories.length === 0 && categoryData.length > 0) {
        setCategories(categoryData);
        cachedCategories = categoryData;
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while loading marketplace data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(activeCategory, searchQuery);
  }, [activeCategory]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData(activeCategory, searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
  };

  return (
    <div className="pb-16" id="marketplace-section">
      <div className="px-4 pt-4 pb-2">
        <SearchBar
          placeholder="Search products..."
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
        />
      </div>

      <div className="flex items-center justify-between px-4 my-3">
        <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Marketplace</h2>
      </div>

      {categories.length > 0 && (
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      )}

      <div className="px-4 py-1.5 flex items-center justify-between min-h-[24px]">
        <p className="text-xs font-medium text-gray-400">
          {`${products.length} product${products.length !== 1 ? 's' : ''} found`}
        </p>
      </div>

      {loading && products.length === 0 && <ProductGridSkeleton count={6} />}

      {error && (
        <ErrorState
          message={error}
          onRetry={() => loadData(activeCategory, searchQuery)}
        />
      )}

      {!error && (
        <>
          {!loading && products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-5 text-center gap-2">
              <span className="text-5xl mb-2">🔍</span>
              <h3 className="text-base font-semibold text-gray-900">No products found</h3>
              <p className="text-sm text-gray-500">
                Try searching for something else or change the category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 px-4 py-2">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MarketplaceHome;
