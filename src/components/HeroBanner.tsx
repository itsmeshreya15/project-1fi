import React from 'react';

const HeroBanner: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-b-[24px]" id="hero-banner">
      <img
        src="/images/banner.webp"
        alt="1Fi Marketplace Banner"
        className="w-full h-auto object-cover block"
      />
    </div>
  );
};

export default HeroBanner;
