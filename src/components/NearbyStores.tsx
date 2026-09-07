import React, { useState } from 'react';
import SearchBar from './common/SearchBar';
import { ChevronDown } from 'lucide-react';

interface StoreItem {
  id: string;
  name: string;
  address: string;
  distance: string;
  logo: string;
}

const mockStores: StoreItem[] = [
  {
    id: 'store-1',
    name: 'Pacholi Suzuki Railway Road',
    address: '64/9, New Railway Rd, near DSD college, Subhash Nagar, Sector 8, Gurugram, Haryana, 122001',
    distance: '1.0 KM',
    logo: '/images/Suzuki.jpg',
  },
  {
    id: 'store-2',
    name: 'Pacholi Suzuki Rajiv Chowk',
    address: '6/38, Rajiv Chowk, Sector 33, Rajiv Chowk, Gurugram, Haryana, 122001',
    distance: '1.4 KM',
    logo: '/images/Suzuki.jpg',
  },
];

const NearbyStores: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredStores = mockStores.filter(
    (store) =>
      store.name.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div className="pb-16 px-4 pt-4" id="nearby-stores-section">
      <div className="pb-2">
        <SearchBar
          placeholder="Search stores..."
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
        />
      </div>

      <div className="flex items-center justify-between my-3">
        <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Nearby Stores</h2>
        <button className="inline-flex items-center gap-1 text-xs font-semibold text-[#6C2BD9] bg-purple-50 px-3 py-1 rounded-full border border-purple-100/80 hover:bg-purple-100/60 transition-colors">
          <span>Gurugram</span>
          <ChevronDown size={14} />
        </button>
      </div>

      <div className="flex flex-col gap-3.5">
        {filteredStores.length === 0 ? (
          <div className="py-12 text-center text-gray-500 text-sm">
            No stores found for "{searchQuery}"
          </div>
        ) : (
          filteredStores.map((store) => (
            <div
              key={store.id}
              className="flex items-start gap-3.5 p-4 bg-white rounded-2xl border border-gray-200/70 shadow-xs"
            >
              <div className="w-16 h-16 rounded-2xl border border-gray-200/80 flex items-center justify-center shrink-0 bg-white shadow-2xs overflow-hidden">
                <img
                  src={store.logo}
                  alt={store.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-bold text-gray-900 leading-tight">
                    {store.name}
                  </h3>
                  <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md shrink-0 uppercase tracking-wider">
                    {store.distance}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1.5 leading-relaxed font-normal">
                  {store.address}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NearbyStores;
