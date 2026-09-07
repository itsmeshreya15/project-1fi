import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Something went wrong',
  message = 'Failed to load data. Please try again.',
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
      <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-4">
        <AlertCircle size={28} />
      </div>
      <h3 className="text-base font-bold text-gray-900 mb-1">{title}</h3>
      <p className="text-xs text-gray-500 max-w-xs mb-5 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#6C2BD9] text-white text-xs font-bold rounded-xl hover:bg-purple-800 transition-colors shadow-sm cursor-pointer"
          onClick={onRetry}
          id="retry-button"
        >
          <RefreshCw size={14} />
          <span>Try Again</span>
        </button>
      )}
    </div>
  );
};

export default ErrorState;
