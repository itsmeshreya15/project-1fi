import React from 'react';
import { Check, Zap } from 'lucide-react';
import { EMIPlan } from '../../types';

interface EMIPlanCardProps {
  plan: EMIPlan;
  isSelected: boolean;
  onSelect: (id: string) => void;
  formatPrice: (amount: number) => string;
}

const EMIPlanCard: React.FC<EMIPlanCardProps> = ({
  plan,
  isSelected,
  onSelect,
  formatPrice,
}) => {
  return (
    <div
      className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer ${
        isSelected
          ? 'border-[#6C2BD9] bg-purple-50/50 shadow-sm'
          : 'border-gray-200 bg-white hover:border-gray-300'
      }`}
      onClick={() => onSelect(plan.id)}
      id={`emi-plan-${plan.id}`}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(plan.id)}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
            isSelected ? 'border-[#6C2BD9] bg-[#6C2BD9]' : 'border-gray-300 bg-white'
          }`}
        >
          {isSelected && <Check size={12} className="text-white" strokeWidth={3} />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <span className="text-sm font-bold text-gray-900 shrink-0">{plan.label}</span>
              {plan.isNoCost && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full shrink-0">
                  <Zap size={10} />
                  NO COST
                </span>
              )}
            </div>
            <div className="w-[135px] shrink-0 text-left">
              <span className="text-base font-extrabold text-[#6C2BD9] whitespace-nowrap">
                {formatPrice(plan.monthlyAmount)}
                <span className="text-xs font-normal text-gray-500">/month</span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Total: {formatPrice(plan.totalAmount)}</span>
            {plan.interest > 0 && (
              <span className="text-amber-600 font-medium shrink-0">
                Interest: {formatPrice(plan.interest)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMIPlanCard;
