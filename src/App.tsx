import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/sonner';
import { MainLayout } from './components/layout/main-layout';
import { DashboardPage } from './pages/dashboard';
import { QuotesPage } from './pages/quotes';
import { ApprovalsPage } from './pages/approvals';
import { ShipmentsPage } from './pages/shipments';
import { FleetPage } from './pages/fleet';
import { DriversPage } from './pages/drivers';
import { VendorsPage } from './pages/vendors';
import { FinancePage } from './pages/finance';
import { ReportsPage } from './pages/reports';
import { AdminPage } from './pages/admin';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="quotes" element={<QuotesPage />} />
            <Route path="approvals" element={<ApprovalsPage />} />
            <Route path="shipments" element={<ShipmentsPage />} />
            <Route path="fleet" element={<FleetPage />} />
            <Route path="drivers" element={<DriversPage />} />
            <Route path="vendors" element={<VendorsPage />} />
            <Route path="finance" element={<FinancePage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="admin" element={<AdminPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
