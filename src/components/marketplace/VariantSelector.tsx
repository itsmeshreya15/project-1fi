import React from 'react';
import { ProductVariants, SelectedVariantsMap } from '../../types';

interface VariantSelectorProps {
  variants?: ProductVariants;
  selectedVariants: SelectedVariantsMap;
  onVariantChange: (type: string, value: string) => void;
}

const VariantSelector: React.FC<VariantSelectorProps> = ({
  variants,
  selectedVariants,
  onVariantChange,
}) => {
  if (!variants) return null;

  return (
    <div className="flex flex-col gap-5">
      {variants.colors && variants.colors.length > 0 && (
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Color:{' '}
            <span className="text-gray-900 capitalize">
              {variants.colors.find((c) => c.id === selectedVariants.color)?.name}
            </span>
          </label>
          <div className="flex flex-wrap gap-2.5">
            {variants.colors.map((color) => {
              const isSelected = selectedVariants.color === color.id;
              return (
                <button
                  key={color.id}
                  className={`group relative flex items-center justify-center p-1 rounded-full border-2 transition-all cursor-pointer ${
                    isSelected ? 'border-[#6C2BD9] ring-2 ring-purple-100' : 'border-transparent hover:scale-105'
                  }`}
                  onClick={() => onVariantChange('color', color.id)}
                  title={color.name}
                  aria-label={color.name}
                >
                  <span
                    className="w-7 h-7 rounded-full shadow-inner border border-black/10"
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {variants.storage && variants.storage.length > 0 && (
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Storage
          </label>
          <div className="flex flex-wrap gap-2">
            {variants.storage.map((option) => {
              const isSelected = selectedVariants.storage === option.id;
              return (
                <button
                  key={option.id}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#6C2BD9] bg-purple-50 text-[#6C2BD9]'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300 bg-white'
                  }`}
                  onClick={() => onVariantChange('storage', option.id)}
                >
                  {option.name}
                  {option.priceModifier > 0 && (
                    <span className="text-[10px] text-gray-400 block font-normal">
                      +₹{option.priceModifier.toLocaleString('en-IN')}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {variants.sizes && variants.sizes.length > 0 && (
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Size
          </label>
          <div className="flex flex-wrap gap-2">
            {variants.sizes.map((option) => {
              const isSelected = selectedVariants.size === option.id;
              return (
                <button
                  key={option.id}
                  className={`min-w-[44px] px-3.5 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#6C2BD9] bg-purple-50 text-[#6C2BD9]'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300 bg-white'
                  }`}
                  onClick={() => onVariantChange('size', option.id)}
                >
                  {option.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default VariantSelector;
