import { Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './layouts/AppLayout.tsx';
import ShopPage from './pages/ShopPage.tsx';
import ProductDetailPage from './pages/ProductDetailPage.tsx';

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/shop" replace />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="*" element={<Navigate to="/shop" replace />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
