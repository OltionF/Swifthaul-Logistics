import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { mockCustomerDiscounts, mockCustomers } from '@/data/mockData';
import { CustomerDiscount } from '@/types/pricing';
import { Plus, Search, Building2, Calendar, Edit2, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const tierColors = {
  bronze: 'bg-amber-100 text-amber-800',
  silver: 'bg-slate-100 text-slate-800',
  gold: 'bg-yellow-100 text-yellow-800',
  platinum: 'bg-violet-100 text-violet-800',
};

export default function CustomerDiscounts() {
  const [discounts, setDiscounts] = useState<CustomerDiscount[]>(mockCustomerDiscounts);
  const [search, setSearch] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('all');

  const handleToggle = (id: string, isActive: boolean) => {
    setDiscounts(prev =>
      prev.map(d => d.id === id ? { ...d, isActive } : d)
    );
  };

  const filteredDiscounts = discounts.filter(d => {
    const matchesSearch = d.customerName.toLowerCase().includes(search.toLowerCase());
    const matchesTier = tierFilter === 'all' || d.contractTier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const formatDate = (date?: string) => {
    if (!date) return '—';
    return new Date(date).toLocaleDateString();
  };

  const getValidityStatus = (discount: CustomerDiscount) => {
    if (!discount.isActive) return { label: 'Inactive', color: 'bg-muted text-muted-foreground' };
    if (discount.validUntil) {
      const until = new Date(discount.validUntil);
      const now = new Date();
      const daysLeft = Math.ceil((until.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      if (daysLeft < 0) return { label: 'Expired', color: 'bg-destructive/10 text-destructive' };
      if (daysLeft <= 30) return { label: `${daysLeft}d left`, color: 'bg-warning/10 text-warning' };
    }
    return { label: 'Active', color: 'bg-success/10 text-success' };
  };

  return (
    <DashboardLayout
      title="Customer Discounts"
      subtitle="Manage customer-specific pricing and discounts"
    >
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <div className="metric-card">
          <p className="metric-label">Total Discounts</p>
          <p className="metric-value">{discounts.length}</p>
        </div>
        <div className="metric-card">
          <p className="metric-label">Active</p>
          <p className="metric-value text-success">{discounts.filter(d => d.isActive).length}</p>
        </div>
        <div className="metric-card">
          <p className="metric-label">Expiring Soon</p>
          <p className="metric-value text-warning">
            {discounts.filter(d => {
              if (!d.validUntil) return false;
              const days = Math.ceil((new Date(d.validUntil).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
              return days > 0 && days <= 30;
            }).length}
          </p>
        </div>
        <div className="metric-card">
          <p className="metric-label">Avg. Discount</p>
          <p className="metric-value">
            {(discounts.filter(d => d.discountType === 'percentage').reduce((a, b) => a + b.value, 0) /
              discounts.filter(d => d.discountType === 'percentage').length || 0).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="flex flex-1 gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={tierFilter} onValueChange={setTierFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Tiers" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tiers</SelectItem>
              <SelectItem value="platinum">Platinum</SelectItem>
              <SelectItem value="gold">Gold</SelectItem>
              <SelectItem value="silver">Silver</SelectItem>
              <SelectItem value="bronze">Bronze</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Discount
        </Button>
      </div>

      {/* Table */}
      <div className="card-elevated overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[250px]">Customer</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Conditions</TableHead>
              <TableHead>Valid Until</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Active</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDiscounts.map((discount) => {
              const status = getValidityStatus(discount);
              return (
                <TableRow key={discount.id} className="table-row-hover">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10">
                        <Building2 className="h-4 w-4 text-accent" />
                      </div>
                      <span className="font-medium">{discount.customerName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-success">
                      {discount.discountType === 'percentage'
                        ? `-${discount.value}%`
                        : `-€${discount.value}`}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {discount.vehicleTypes?.slice(0, 2).map((v) => (
                        <Badge key={v} variant="outline" className="text-xs capitalize">
                          {v}
                        </Badge>
                      ))}
                      {discount.districts?.slice(0, 2).map((d) => (
                        <Badge key={d} variant="outline" className="text-xs">
                          {d}
                        </Badge>
                      ))}
                      {((discount.vehicleTypes?.length || 0) + (discount.districts?.length || 0)) > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{(discount.vehicleTypes?.length || 0) + (discount.districts?.length || 0) - 4}
                        </Badge>
                      )}
                      {!discount.vehicleTypes?.length && !discount.districts?.length && (
                        <span className="text-xs text-muted-foreground">All routes</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(discount.validUntil)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn('text-xs', status.color)} variant="secondary">
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={discount.isActive}
                      onCheckedChange={(checked) => handleToggle(discount.id, checked)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {filteredDiscounts.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No discounts found matching your search.
        </div>
      )}
    </DashboardLayout>
  );
}
