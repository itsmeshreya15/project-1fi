import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Share2, Heart, Truck, Shield, RotateCcw, CheckCircle2 } from 'lucide-react';
import { fetchProductById } from '../api/api';
import { generateEMIPlans } from '../api/mockData';
import { ProductDetailSkeleton } from '../components/common/LoadingSkeleton';
import ErrorState from '../components/common/ErrorState';
import VariantSelector from '../components/marketplace/VariantSelector';
import EMIPlanCard from '../components/marketplace/EMIPlanCard';
import StickyFooter from '../components/marketplace/StickyFooter';
import { Product, SelectedVariantsMap, EMIPlan } from '../types';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVariants, setSelectedVariants] = useState<SelectedVariantsMap>({});
  const [selectedEMIPlan, setSelectedEMIPlan] = useState<string | null>(null);
  const [confirmedPlan, setConfirmedPlan] = useState<EMIPlan | null>(null);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  }, []);

  const loadProduct = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(null);
      const data = await fetchProductById(id);
      setProduct(data);

      const defaults: SelectedVariantsMap = {};
      if (data.variants?.colors?.length) {
        defaults.color = data.variants.colors[0].id;
      }
      if (data.variants?.sizes?.length) {
        defaults.size = data.variants.sizes[0].id;
      }
      if (data.variants?.storage?.length) {
        defaults.storage = data.variants.storage[0].id;
      }
      setSelectedVariants(defaults);
    } catch (err: any) {
      setError(err.message || 'Unable to load product details.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadProduct();
    window.scrollTo(0, 0);
  }, [loadProduct]);

  const currentPrice = useMemo(() => {
    if (!product) return 0;
    let price = product.price;

    if (selectedVariants.storage && product.variants?.storage) {
      const storageOption = product.variants.storage.find(
        (s) => s.id === selectedVariants.storage
      );
      if (storageOption?.priceModifier) {
        price += storageOption.priceModifier;
      }
    }

    if (selectedVariants.size && product.variants?.sizes) {
      const sizeOption = product.variants.sizes.find(
        (s) => s.id === selectedVariants.size
      );
      if (sizeOption?.priceModifier) {
        price += sizeOption.priceModifier;
      }
    }

    return price;
  }, [product, selectedVariants]);

  const emiPlans = useMemo<EMIPlan[]>(() => {
    if (!product) return [];
    if (currentPrice === product.price) {
      return product.emiPlans;
    }
    const tenures = product.emiPlans.map((plan) => plan.tenure);
    return generateEMIPlans(currentPrice, tenures);
  }, [product, currentPrice]);

  const selectedPlanObj = useMemo(() => {
    return emiPlans.find((plan) => plan.id === selectedEMIPlan) || null;
  }, [emiPlans, selectedEMIPlan]);

  const handleVariantChange = (type: string, value: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [type]: value,
    }));
    setSelectedEMIPlan(null);
  };

  const handleProceed = () => {
    if (selectedPlanObj) {
      setConfirmedPlan(selectedPlanObj);
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-screen bg-gray-50">
        <div className="sticky top-0 flex items-center justify-between px-5 h-[56px] bg-white border-b border-gray-200 z-50">
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={22} />
          </button>
          <h2 className="text-base font-semibold text-gray-900">Product Details</h2>
          <div className="w-10" />
        </div>
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative min-h-screen bg-gray-50">
        <div className="sticky top-0 flex items-center justify-between px-5 h-[56px] bg-white border-b border-gray-200 z-50">
          <button
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={22} />
          </button>
          <h2 className="text-base font-semibold text-gray-900">Product Details</h2>
          <div className="w-10" />
        </div>
        <ErrorState message={error} onRetry={loadProduct} />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="relative min-h-screen bg-gray-50 pb-[100px]" id="product-detail-page">
      {showConfirmation && confirmedPlan && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2.5 bg-white/95 backdrop-blur-md text-gray-900 rounded-full z-[200] shadow-[0_10px_30px_rgba(108,43,217,0.18)] border border-purple-100 whitespace-nowrap animate-fadeInUp min-w-[280px]">
          <div className="w-8 h-8 rounded-full bg-purple-50 border border-purple-200/60 flex items-center justify-center shrink-0">
            <CheckCircle2 size={18} className="text-[#6C2BD9]" />
          </div>
          <div className="flex flex-col pr-2">
            <span className="text-xs font-bold text-gray-900 leading-tight">
              EMI Plan Selected
            </span>
            <span className="text-[11px] text-gray-500 font-medium leading-tight">
              Proceeding with <span className="font-bold text-[#6C2BD9]">{confirmedPlan.label}</span> ({formatPrice(confirmedPlan.monthlyAmount)}/month)
            </span>
          </div>
        </div>
      )}

      <div className="sticky top-0 flex items-center justify-between px-5 h-[56px] bg-white border-b border-gray-200 z-50">
        <button
          className="flex items-center justify-center w-10 h-10 rounded-full text-gray-900 hover:bg-gray-100 transition-colors"
          onClick={() => navigate(-1)}
          id="back-button"
          aria-label="Go back"
        >
          <ArrowLeft size={22} />
        </button>
        <h2 className="text-base font-semibold text-gray-900">Product Details</h2>
        <div className="flex items-center gap-1">
          <button className="flex items-center justify-center w-9 h-9 rounded-full text-gray-600 hover:bg-gray-100 transition-colors">
            <Share2 size={18} />
          </button>
          <button
            className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors ${
              isWishlisted ? 'text-red-500' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={() => setIsWishlisted(!isWishlisted)}
            id="wishlist-button"
          >
            <Heart size={18} fill={isWishlisted ? '#EF4444' : 'none'} />
          </button>
        </div>
      </div>

      <div className="w-full">
        <div className="relative w-full bg-white flex items-center justify-center p-6 min-h-[280px]">
          {product.discount > 0 && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded z-10">
              {product.discount}% OFF
            </div>
          )}
          {product.image && (
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-h-[280px] object-contain mix-blend-multiply drop-shadow-md"
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
            className="flex-col items-center gap-3"
            style={{ display: product.image ? 'none' : 'flex' }}
          >
            <span className="text-6xl animate-float">
              {product.category === 'electronics' && '📱'}
              {product.category === 'fashion' && '👕'}
              {product.category === 'home' && '🏠'}
            </span>
            <span className="text-xs text-gray-400 font-medium">{product.name}</span>
          </div>
        </div>

        <div className="p-5 bg-white">
          <span className="inline-block text-[10px] font-bold text-[#6C2BD9] uppercase tracking-wider mb-2 px-2 py-0.5 bg-purple-50 rounded">
            {product.brand}
          </span>
          <h1 className="text-xl font-bold text-gray-900 leading-snug mb-2">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 rounded">
              <Star size={14} fill="#FFB800" stroke="#FFB800" />
              <span className="text-xs font-bold text-gray-900">{product.rating}</span>
            </div>
            <span className="text-xs text-gray-400">
              {product.reviewCount.toLocaleString('en-IN')} ratings
            </span>
          </div>

          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-2xl font-black text-gray-900">
              {formatPrice(currentPrice)}
            </span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-sm font-semibold text-emerald-600">
                  {product.discount}% off
                </span>
              </>
            )}
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-50 rounded-lg text-xs font-semibold text-[#6C2BD9]">
            <span>
              No-cost EMI starting {formatPrice(emiPlans[emiPlans.length - 1]?.monthlyAmount || 0)}/month
            </span>
          </div>
        </div>

        <div className="h-2 bg-gray-100" />

        <div className="p-5 bg-white">
          <h3 className="text-base font-bold text-gray-900 mb-2">Description</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{product.description}</p>
        </div>

        <div className="h-2 bg-gray-100" />

        {product.variants && Object.keys(product.variants).length > 0 && (
          <>
            <div className="p-5 bg-white">
              <h3 className="text-base font-bold text-gray-900 mb-4">Choose Variant</h3>
              <VariantSelector
                variants={product.variants}
                selectedVariants={selectedVariants}
                onVariantChange={handleVariantChange}
              />
            </div>
            <div className="h-2 bg-gray-100" />
          </>
        )}

        <div className="p-5 bg-white">
          <h3 className="text-base font-bold text-gray-900 mb-0.5">EMI Plans</h3>
          <p className="text-xs text-gray-400 mb-4">Select a plan that works for you</p>
          <div className="flex flex-col gap-3">
            {emiPlans.map((plan) => (
              <EMIPlanCard
                key={plan.id}
                plan={plan}
                isSelected={selectedEMIPlan === plan.id}
                onSelect={setSelectedEMIPlan}
                formatPrice={formatPrice}
              />
            ))}
          </div>
        </div>

        <div className="h-2 bg-gray-100" />

        <div className="p-5 bg-white flex justify-around gap-2 text-center">
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-full bg-purple-50 text-[#6C2BD9] flex items-center justify-center">
              <Truck size={20} />
            </div>
            <span className="text-xs font-bold text-gray-900">Free Delivery</span>
            <span className="text-[10px] text-gray-400">Within 5-7 days</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-full bg-purple-50 text-[#6C2BD9] flex items-center justify-center">
              <Shield size={20} />
            </div>
            <span className="text-xs font-bold text-gray-900">1 Year Warranty</span>
            <span className="text-[10px] text-gray-400">Brand warranty</span>
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-full bg-purple-50 text-[#6C2BD9] flex items-center justify-center">
              <RotateCcw size={20} />
            </div>
            <span className="text-xs font-bold text-gray-900">Easy Returns</span>
            <span className="text-[10px] text-gray-400">7-day return policy</span>
          </div>
        </div>
      </div>

      <StickyFooter
        selectedPlan={selectedPlanObj}
        formatPrice={formatPrice}
        onProceed={handleProceed}
      />
    </div>
  );
};

export default ProductDetailPage;
