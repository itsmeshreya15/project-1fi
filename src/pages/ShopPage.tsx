import React from 'react';
import { useSearchParams } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner.tsx';
import TabSwitcher from '../components/TabSwitcher.tsx';
import TopBrands from '../components/TopBrands.tsx';
import NearbyStores from '../components/NearbyStores.tsx';
import MarketplaceHome from '../components/marketplace/MarketplaceHome.tsx';
import { TabItem } from '../types';

const TABS: TabItem[] = [
  { id: 'top-brands', label: 'Top Brands' },
  { id: 'nearby-stores', label: 'Nearby Stores' },
  { id: 'marketplace', label: 'Marketplace' },
];

const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'marketplace';

  const handleTabChange = (tabId: string) => {
    setSearchParams({ tab: tabId }, { replace: true });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'top-brands':
        return <TopBrands />;
      case 'nearby-stores':
        return <NearbyStores />;
      case 'marketplace':
        return <MarketplaceHome />;
      default:
        return <MarketplaceHome />;
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-64px)] pb-16 bg-white" id="shop-page">
      <HeroBanner />

      <TabSwitcher
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <div className="w-full animate-fadeIn" key={activeTab}>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ShopPage;
