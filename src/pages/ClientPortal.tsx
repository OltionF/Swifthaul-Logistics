import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  Search, 
  FileText, 
  Eye,
  Gift,
  Calendar
} from 'lucide-react';

interface ClientBooking {
  id: string;
  reference: string;
  route: string;
  date: string;
  status: 'completed' | 'in-transit' | 'scheduled';
  price: string;
  discount?: string;
}

const mockClientBookings: ClientBooking[] = [
  {
    id: '1',
    reference: 'TRN-2024-0891',
    route: 'London → Leeds',
    date: '2024-01-19',
    status: 'in-transit',
    price: '£2,100',
    discount: '10% VIP',
  },
  {
    id: '2',
    reference: 'TRN-2024-0876',
    route: 'Manchester → Birmingham',
    date: '2024-01-18',
    status: 'completed',
    price: '£1,450',
  },
  {
    id: '3',
    reference: 'TRN-2024-0865',
    route: 'Bristol → Cardiff',
    date: '2024-01-17',
    status: 'completed',
    price: '£890',
    discount: '10% VIP',
  },
  {
    id: '4',
    reference: 'TRN-2024-0901',
    route: 'Glasgow → Edinburgh',
    date: '2024-01-22',
    status: 'scheduled',
    price: '£650',
  },
];

const discounts = [
  { name: 'VIP Client Discount', value: '10%', description: 'Applied to all bookings', active: true },
  { name: 'Volume Discount', value: '5%', description: 'For 10+ monthly bookings', active: true },
  { name: 'Early Booking Bonus', value: '3%', description: 'Book 7+ days in advance', active: false },
];

const statusConfig = {
  'completed': { label: 'Completed', variant: 'outline' as const },
  'in-transit': { label: 'In Transit', variant: 'default' as const },
  'scheduled': { label: 'Scheduled', variant: 'secondary' as const },
};

export default function ClientPortal() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBookings = mockClientBookings.filter(
    booking => 
      booking.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.route.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout userRole="client" title="My Bookings">
      <div className="space-y-6 animate-fade-in">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10">
                <FileText className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-bold">47</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-success/10">
                <Gift className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Savings This Month</p>
                <p className="text-2xl font-bold">£1,240</p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-warning/10">
                <Calendar className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Discounts Panel */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold mb-4">Your Discounts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {discounts.map((discount, idx) => (
              <div 
                key={idx} 
                className={`p-4 rounded-lg border ${
                  discount.active 
                    ? 'border-success/30 bg-success/5' 
                    : 'border-border bg-secondary/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-bold">{discount.value}</span>
                  {discount.active ? (
                    <Badge variant="outline" className="bg-success/10 text-success border-success/30">
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="secondary">Inactive</Badge>
                  )}
                </div>
                <p className="font-medium text-sm">{discount.name}</p>
                <p className="text-xs text-muted-foreground">{discount.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border flex flex-wrap items-center justify-between gap-4">
            <h3 className="font-semibold">Booking History</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search bookings..."
                className="pl-9 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Reference</th>
                  <th>Route</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Price</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="font-medium">{booking.reference}</td>
                    <td>{booking.route}</td>
                    <td className="text-muted-foreground">{booking.date}</td>
                    <td>
                      <Badge variant={statusConfig[booking.status].variant}>
                        {statusConfig[booking.status].label}
                      </Badge>
                    </td>
                    <td>
                      <div>
                        <span className="font-medium">{booking.price}</span>
                        {booking.discount && (
                          <span className="ml-2 text-xs text-success">{booking.discount}</span>
                        )}
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
