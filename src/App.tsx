import { Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/san-pham" element={<ProductPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/dashboard" element={<AdminPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
