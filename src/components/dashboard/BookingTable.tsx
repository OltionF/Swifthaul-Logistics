import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, FileSignature, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Booking {
  id: string;
  reference: string;
  customer: string;
  pickup: string;
  destination: string;
  date: string;
  status: 'pending' | 'in-transit' | 'delivered' | 'awaiting-signature';
  value: string;
}

const mockBookings: Booking[] = [
  {
    id: '1',
    reference: 'TRN-2024-0892',
    customer: 'Acme Industries',
    pickup: 'Manchester, UK',
    destination: 'Birmingham, UK',
    date: '2024-01-19',
    status: 'in-transit',
    value: '£1,450',
  },
  {
    id: '2',
    reference: 'TRN-2024-0891',
    customer: 'Global Logistics Ltd',
    pickup: 'London, UK',
    destination: 'Leeds, UK',
    date: '2024-01-19',
    status: 'awaiting-signature',
    value: '£2,100',
  },
  {
    id: '3',
    reference: 'TRN-2024-0890',
    customer: 'Swift Supplies Co',
    pickup: 'Bristol, UK',
    destination: 'Cardiff, UK',
    date: '2024-01-19',
    status: 'pending',
    value: '£890',
  },
  {
    id: '4',
    reference: 'TRN-2024-0889',
    customer: 'Northern Manufacturing',
    pickup: 'Sheffield, UK',
    destination: 'Newcastle, UK',
    date: '2024-01-18',
    status: 'delivered',
    value: '£1,780',
  },
  {
    id: '5',
    reference: 'TRN-2024-0888',
    customer: 'Premier Goods',
    pickup: 'Liverpool, UK',
    destination: 'Glasgow, UK',
    date: '2024-01-18',
    status: 'delivered',
    value: '£3,200',
  },
];

const statusConfig = {
  'pending': { label: 'Pending', variant: 'secondary' as const },
  'in-transit': { label: 'In Transit', variant: 'default' as const },
  'delivered': { label: 'Delivered', variant: 'outline' as const },
  'awaiting-signature': { label: 'Awaiting Signature', variant: 'destructive' as const },
};

export default function BookingTable() {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="font-semibold">Today's Bookings</h3>
        <Button variant="outline" size="sm">View All</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="data-table">
          <thead>
            <tr>
              <th>Reference</th>
              <th>Customer</th>
              <th>Route</th>
              <th>Status</th>
              <th>Value</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockBookings.map((booking) => (
              <tr key={booking.id}>
                <td className="font-medium">{booking.reference}</td>
                <td>{booking.customer}</td>
                <td className="text-muted-foreground">
                  {booking.pickup} → {booking.destination}
                </td>
                <td>
                  <Badge variant={statusConfig[booking.status].variant}>
                    {statusConfig[booking.status].label}
                  </Badge>
                </td>
                <td className="font-medium">{booking.value}</td>
                <td className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {booking.status === 'awaiting-signature' && (
                      <Button variant="ghost" size="icon" className="text-warning">
                        <FileSignature className="w-4 h-4" />
                      </Button>
                    )}
                    <Button variant="ghost" size="icon">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                        <DropdownMenuItem>Download Invoice</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
