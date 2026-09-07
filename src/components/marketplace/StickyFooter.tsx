import React from 'react';
import { ChevronRight } from 'lucide-react';
import { EMIPlan } from '../../types';

interface StickyFooterProps {
  selectedPlan: EMIPlan | null;
  formatPrice: (amount: number) => string;
  onProceed: () => void;
}

const StickyFooter: React.FC<StickyFooterProps> = ({
  selectedPlan,
  formatPrice,
  onProceed,
}) => {
  return (
    <div className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-[calc(520px-24px)] bg-white rounded-[20px] z-[100] shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-black/5 px-5 py-3 flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        {selectedPlan ? (
          <div>
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block">
              Selected Plan ({selectedPlan.label})
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black text-gray-900">
                {formatPrice(selectedPlan.monthlyAmount)}
              </span>
              <span className="text-xs text-gray-500 font-medium">/month</span>
            </div>
          </div>
        ) : (
          <div>
            <span className="text-sm font-semibold text-gray-700 block">
              Select an EMI plan
            </span>
          </div>
        )}
      </div>

      <button
        className={`px-5 py-2.5 rounded-full font-bold text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md ${
          selectedPlan
            ? 'bg-[#6C2BD9] hover:bg-[#5521B5] text-white active:scale-97 shadow-purple-200'
            : 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none'
        }`}
        onClick={onProceed}
        disabled={!selectedPlan}
        id="proceed-button"
      >
        <span>Proceed</span>
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default StickyFooter;
