import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Dashboard from '../pages/Dashboard';
import History from '../pages/History';
import Analytics from '../pages/Analytics';
import Settings from '../pages/Settings';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/riwayat" element={<History />} />
          <Route path="/analitik" element={<Analytics />} />
          <Route path="/pengaturan" element={<Settings />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
