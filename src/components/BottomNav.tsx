import React from 'react';
import { Home, ShoppingBag, Receipt, BarChart3, User } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

interface BottomNavProps {
  activeTab?: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'shop', label: 'Shop', icon: ShoppingBag },
  { id: 'emi-dues', label: 'EMI Dues', icon: Receipt },
  { id: 'limit', label: 'Limit', icon: BarChart3 },
  { id: 'profile', label: 'Profile', icon: User },
];

const BottomNav: React.FC<BottomNavProps> = ({ activeTab = 'shop' }) => {
  return (
    <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 w-[calc(100%-24px)] max-w-[calc(520px-24px)] bg-white rounded-[20px] z-[100] shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-black/5" id="bottom-navigation">
      <div className="flex items-center justify-around h-[60px] px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeTab;
          return (
            <button
              key={item.id}
              className={`flex flex-col items-center justify-center gap-0.5 px-2.5 py-1.5 rounded-xl transition-all duration-150 min-w-[52px] ${
                isActive ? 'text-[#6C2BD9]' : 'text-gray-400 hover:text-gray-600'
              }`}
              id={`nav-${item.id}`}
              aria-label={item.label}
            >
              <Icon
                className={`transition-transform duration-150 ${isActive ? 'scale-105' : ''}`}
                size={22}
                strokeWidth={isActive ? 2.2 : 1.8}
              />
              <span className={`text-[11px] tracking-tight ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
