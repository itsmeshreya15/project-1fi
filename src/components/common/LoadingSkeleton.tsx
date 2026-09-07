import React from 'react';

export const ProductCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl overflow-hidden border border-gray-100 p-2 shadow-xs flex flex-col h-full">
    <div className="w-full aspect-square bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-lg" />
    <div className="p-2 pt-3 flex-1 flex flex-col justify-between gap-2">
      <div className="space-y-1.5">
        <div className="w-[45%] h-2.5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded" />
        <div className="w-[80%] h-3.5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded" />
      </div>
      <div className="space-y-1.5">
        <div className="w-[65%] h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded" />
        <div className="w-[50%] h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded" />
      </div>
    </div>
  </div>
);

export const ProductGridSkeleton: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <div className="grid grid-cols-2 gap-3 px-4 py-2">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export const BrandListSkeleton: React.FC<{ count?: number }> = ({ count = 5 }) => (
  <div className="flex flex-col gap-3">
    {Array.from({ length: count }).map((_, i) => (
      <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100" key={i}>
        <div className="w-[52px] h-[52px] rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="w-[60%] h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded" />
          <div className="w-[80%] h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded" />
        </div>
      </div>
    ))}
  </div>
);

export const ProductDetailSkeleton: React.FC = () => (
  <div className="animate-fadeIn">
    <div className="w-full h-[300px] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer" />
    <div className="p-5 space-y-4">
      <div className="w-[80%] h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded" />
      <div className="w-[40%] h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded" />
      <div className="w-[30%] h-7 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded" />
      <div className="h-4" />
      <div className="space-y-2">
        <div className="w-full h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded" />
        <div className="w-full h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded" />
      </div>
    </div>
  </div>
);

export default {
  ProductCardSkeleton,
  ProductGridSkeleton,
  BrandListSkeleton,
  ProductDetailSkeleton,
};
