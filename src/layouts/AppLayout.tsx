import React from 'react';
import { useLocation } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const isDetailPage = location.pathname.startsWith('/product/');

  return (
    <div className="w-full max-w-[520px] min-h-screen bg-white relative shadow-2xl mx-auto border-x border-gray-100 flex flex-col">
      <main className="w-full min-h-screen flex-1">
        {children}
      </main>
      {!isDetailPage && <BottomNav activeTab="shop" />}
    </div>
  );
};

export default AppLayout;
