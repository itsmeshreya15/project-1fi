import React from 'react';
import { TabItem } from '../types';

interface TabSwitcherProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="relative z-10 -mt-[28px] px-4" id="tab-switcher">
      <div className="flex items-center bg-[#F3EEFF] rounded-full p-1.5 shadow-[0_6px_20px_rgba(0,0,0,0.06)] overflow-x-auto scrollbar-none">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              className={`flex-1 py-2.5 px-4 text-sm font-semibold rounded-full whitespace-nowrap transition-all duration-150 relative text-center ${
                isActive
                  ? 'bg-white text-[#6C2BD9] font-bold shadow-[0_2px_10px_rgba(108,43,217,0.12)]'
                  : 'text-[#5B5B75] hover:text-[#6C2BD9]'
              }`}
              onClick={() => onTabChange(tab.id)}
              id={`tab-${tab.id}`}
            >
              {tab.label}
              {isActive && (
                <span className="absolute bottom-[5px] left-1/2 -translate-x-1/2 w-6 h-[3px] bg-[#6C2BD9] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TabSwitcher;
