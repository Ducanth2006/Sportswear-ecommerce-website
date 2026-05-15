import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import AppLayout from './components/AppLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Orders from './pages/Orders';
import UsersPage from './pages/UsersPage';
import ComplaintsPage from './pages/ComplaintsPage';
import SettingsPage from './pages/SettingsPage';
import AddProduct from './pages/AddProduct';
import AccountProfile from './pages/AccountProfile';
import HelpCenter from './pages/HelpCenter';
import ReportsPage from './pages/ReportsPage';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import VouchersPage from './pages/VouchersPage';

export default function App() {
  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#af101a', fontFamily: 'Inter' } }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/new" element={<AddProduct />} />
            <Route path="categories" element={<Categories />} />
            <Route path="orders" element={<Orders />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="vouchers" element={<VouchersPage />} />
            <Route path="complaints" element={<ComplaintsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="account" element={<AccountProfile />} />
            <Route path="help" element={<HelpCenter />} />
            <Route path="reports" element={<ReportsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}


