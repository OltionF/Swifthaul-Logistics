import MainLayout from '@/components/layout/MainLayout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  MapPin, 
  Clock, 
  FileSignature,
  Eye,
  Navigation
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface Delivery {
  id: string;
  reference: string;
  customer: string;
  destination: string;
  driver: string;
  eta: string;
  status: 'in-transit' | 'arrived' | 'delivered' | 'awaiting-signature';
  progress: number;
}

const mockDeliveries: Delivery[] = [
  {
    id: '1',
    reference: 'TRN-2024-0892',
    customer: 'Acme Industries',
    destination: 'Birmingham, UK',
    driver: 'Dave Wilson',
    eta: '14:30',
    status: 'in-transit',
    progress: 65,
  },
  {
    id: '2',
    reference: 'TRN-2024-0891',
    customer: 'Global Logistics Ltd',
    destination: 'Leeds, UK',
    driver: 'Mike Thompson',
    eta: '13:45',
    status: 'arrived',
    progress: 100,
  },
  {
    id: '3',
    reference: 'TRN-2024-0890',
    customer: 'Swift Supplies Co',
    destination: 'Cardiff, UK',
    driver: 'John Harris',
    eta: '16:00',
    status: 'in-transit',
    progress: 35,
  },
  {
    id: '4',
    reference: 'TRN-2024-0889',
    customer: 'Northern Manufacturing',
    destination: 'Newcastle, UK',
    driver: 'Steve Brown',
    eta: 'Completed',
    status: 'awaiting-signature',
    progress: 100,
  },
];

const statusConfig = {
  'in-transit': { label: 'In Transit', color: 'bg-accent text-accent-foreground' },
  'arrived': { label: 'Arrived', color: 'bg-success text-success-foreground' },
  'delivered': { label: 'Delivered', color: 'bg-secondary text-secondary-foreground' },
  'awaiting-signature': { label: 'Awaiting Signature', color: 'bg-warning text-warning-foreground' },
};

export default function Deliveries() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDeliveries = mockDeliveries.filter(
    d => d.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
         d.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MainLayout userRole="sales" title="Deliveries">
      <div className="space-y-6 animate-fade-in">
        {/* Search & Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search deliveries..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Delivery Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDeliveries.map((delivery) => (
            <div 
              key={delivery.id}
              className="bg-card rounded-xl border border-border p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{delivery.reference}</h3>
                    <Badge className={statusConfig[delivery.status].color}>
                      {statusConfig[delivery.status].label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{delivery.customer}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    ETA: {delivery.eta}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-destructive" />
                <span className="text-sm">{delivery.destination}</span>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Journey Progress</span>
                  <span>{delivery.progress}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      delivery.status === 'awaiting-signature' ? "bg-warning" :
                      delivery.progress === 100 ? "bg-success" : "bg-accent"
                    )}
                    style={{ width: `${delivery.progress}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="text-sm">
                  <span className="text-muted-foreground">Driver: </span>
                  <span className="font-medium">{delivery.driver}</span>
                </div>
                <div className="flex items-center gap-2">
                  {delivery.status === 'awaiting-signature' && (
                    <Button size="sm" asChild className="gap-1">
                      <Link to="/signatures">
                        <FileSignature className="w-4 h-4" />
                        Capture
                      </Link>
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="gap-1">
                    <Navigation className="w-4 h-4" />
                    Track
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
