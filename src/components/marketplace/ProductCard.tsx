import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const lowestEMI = product.emiPlans?.reduce(
    (min, plan) => (plan.monthlyAmount < min ? plan.monthlyAmount : min),
    Infinity
  );

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className="relative bg-white rounded-xl overflow-hidden shadow-xs cursor-pointer hover:-translate-y-0.5 hover:shadow-md active:scale-97 transition-all duration-150 border border-gray-100 flex flex-col h-full"
      onClick={handleClick}
      id={`product-card-${product.id}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      {product.discount > 0 && (
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-500 text-white text-[10px] font-bold rounded z-10 tracking-wider">
          {product.discount}% OFF
        </div>
      )}

      <div className="w-full aspect-square bg-white flex items-center justify-center overflow-hidden relative p-2">
        {product.image && (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-250 hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              if (target.nextElementSibling) {
                (target.nextElementSibling as HTMLElement).style.display = 'flex';
              }
            }}
          />
        )}
        <div
          className="flex-col items-center gap-2"
          style={{ display: product.image ? 'none' : 'flex' }}
        >
          <span className="text-4xl leading-none">
            {product.category === 'electronics' && '📱'}
            {product.category === 'fashion' && '👕'}
            {product.category === 'home' && '🏠'}
          </span>
          <span className="text-xs text-gray-400 font-medium">{product.brand}</span>
        </div>
      </div>

      <div className="p-3 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">
            {product.brand}
          </p>
          <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-1 line-clamp-2">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mb-2">
            <Star size={12} fill="#FFB800" stroke="#FFB800" />
            <span className="text-xs font-semibold text-gray-800">{product.rating}</span>
            <span className="text-xs text-gray-400">
              ({product.reviewCount.toLocaleString('en-IN')})
            </span>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {lowestEMI && lowestEMI !== Infinity && (
            <p className="text-xs font-semibold text-[#6C2BD9] bg-purple-50 px-2 py-0.5 rounded inline-block">
              Starting {formatPrice(lowestEMI)}/month
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
