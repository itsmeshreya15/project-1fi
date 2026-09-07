import React from 'react';
import { LayoutGrid, Smartphone, Shirt, Home } from 'lucide-react';
import { Category } from '../../types';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  all: LayoutGrid,
  electronics: Smartphone,
  fashion: Shirt,
  home: Home,
};

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="px-4 py-2" id="category-filter">
      <div className="flex gap-2 overflow-x-auto scrollbar-none py-1">
        {categories.map((category) => {
          const IconComponent = CATEGORY_ICONS[category.id] || LayoutGrid;
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              className={`inline-flex items-center gap-1.5 px-4 py-2 border rounded-full text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer active:scale-95 ${
                isActive
                  ? 'bg-[#6C2BD9] border-[#6C2BD9] text-white font-bold'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-purple-300 hover:text-[#6C2BD9] hover:bg-purple-50'
              }`}
              onClick={() => onCategoryChange(category.id)}
              id={`category-${category.id}`}
            >
              <IconComponent
                size={15}
                className="shrink-0"
                strokeWidth={isActive ? 2.2 : 1.8}
              />
              <span className="leading-none">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
