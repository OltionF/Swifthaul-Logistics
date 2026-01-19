import MainLayout from '@/components/layout/MainLayout';
import KPICard from '@/components/dashboard/KPICard';
import BookingTable from '@/components/dashboard/BookingTable';
import AlertPanel from '@/components/dashboard/AlertPanel';
import { Button } from '@/components/ui/button';
import { 
  PoundSterling, 
  Truck, 
  Package, 
  Clock,
  Plus,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SalesDashboard() {
  return (
    <MainLayout userRole="sales" title="Sales Dashboard">
      <div className="space-y-6 animate-fade-in">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" className="gap-2">
            <Link to="/booking">
              <Plus className="w-5 h-5" />
              New Booking
            </Link>
          </Button>
          <Button variant="outline" size="lg" className="gap-2" asChild>
            <Link to="/deliveries">
              <Eye className="w-5 h-5" />
              View Deliveries
            </Link>
          </Button>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard 
            title="Revenue Today" 
            value="£12,450" 
            change={8.2}
            icon={<PoundSterling className="w-6 h-6" />}
            variant="accent"
          />
          <KPICard 
            title="Total Bookings" 
            value="24" 
            change={12}
            icon={<Package className="w-6 h-6" />}
            variant="default"
          />
          <KPICard 
            title="In Transit" 
            value="8" 
            icon={<Truck className="w-6 h-6" />}
            variant="success"
          />
          <KPICard 
            title="Pending Signatures" 
            value="3" 
            icon={<Clock className="w-6 h-6" />}
            variant="warning"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bookings Table */}
          <div className="lg:col-span-2">
            <BookingTable />
          </div>
          
          {/* Alerts Panel */}
          <div>
            <AlertPanel />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
