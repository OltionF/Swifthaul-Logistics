import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Save,
  Clock,
  Percent,
  Route,
  Calendar
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingRule {
  id: string;
  name: string;
  type: 'distance' | 'time' | 'route' | 'volume';
  condition: string;
  adjustment: string;
  active: boolean;
  createdAt: string;
}

const mockRules: PricingRule[] = [
  {
    id: '1',
    name: 'Peak Hour Surcharge',
    type: 'time',
    condition: 'Between 07:00-09:00 or 17:00-19:00',
    adjustment: '+15%',
    active: true,
    createdAt: '2024-01-10',
  },
  {
    id: '2',
    name: 'Long Distance Discount',
    type: 'distance',
    condition: 'Distance > 200 miles',
    adjustment: '-8%',
    active: true,
    createdAt: '2024-01-08',
  },
  {
    id: '3',
    name: 'Weekend Premium',
    type: 'time',
    condition: 'Saturday or Sunday delivery',
    adjustment: '+20%',
    active: true,
    createdAt: '2024-01-05',
  },
  {
    id: '4',
    name: 'Volume Loyalty',
    type: 'volume',
    condition: '10+ monthly bookings',
    adjustment: '-5%',
    active: false,
    createdAt: '2024-01-01',
  },
];

interface DiscountTier {
  id: string;
  tier: string;
  minBookings: number;
  discount: number;
}

const discountTiers: DiscountTier[] = [
  { id: '1', tier: 'Bronze', minBookings: 5, discount: 3 },
  { id: '2', tier: 'Silver', minBookings: 15, discount: 7 },
  { id: '3', tier: 'Gold', minBookings: 30, discount: 10 },
  { id: '4', tier: 'Platinum', minBookings: 50, discount: 15 },
];

const auditLog = [
  { action: 'Rule Updated', rule: 'Peak Hour Surcharge', user: 'Admin', time: '2 hours ago' },
  { action: 'Rule Disabled', rule: 'Volume Loyalty', user: 'Admin', time: '1 day ago' },
  { action: 'Tier Modified', rule: 'Gold Tier', user: 'Admin', time: '2 days ago' },
  { action: 'Rule Created', rule: 'Weekend Premium', user: 'Admin', time: '3 days ago' },
];

const typeIcons = {
  distance: Route,
  time: Clock,
  route: Route,
  volume: Percent,
};

export default function AdminPricing() {
  const [rules, setRules] = useState(mockRules);

  const toggleRule = (id: string) => {
    setRules(rules.map(rule => 
      rule.id === id ? { ...rule, active: !rule.active } : rule
    ));
  };

  return (
    <MainLayout userRole="admin" title="Pricing Configuration">
      <div className="space-y-6 animate-fade-in">
        {/* Dynamic Pricing Rules */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Dynamic Pricing Rules</h3>
              <p className="text-sm text-muted-foreground">Automatically adjust prices based on conditions</p>
            </div>
            <Button size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Rule
            </Button>
          </div>

          <div className="divide-y divide-border">
            {rules.map((rule) => {
              const Icon = typeIcons[rule.type];
              return (
                <div key={rule.id} className="p-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors">
                  <div className={cn(
                    "p-2 rounded-lg",
                    rule.active ? "bg-accent/10" : "bg-secondary"
                  )}>
                    <Icon className={cn(
                      "w-5 h-5",
                      rule.active ? "text-accent" : "text-muted-foreground"
                    )} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{rule.name}</h4>
                      <Badge variant={rule.active ? 'default' : 'secondary'} className="text-xs">
                        {rule.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{rule.condition}</p>
                  </div>

                  <div className="text-right mr-4">
                    <p className={cn(
                      "font-bold",
                      rule.adjustment.startsWith('+') ? "text-warning" : "text-success"
                    )}>
                      {rule.adjustment}
                    </p>
                  </div>

                  <Switch 
                    checked={rule.active}
                    onCheckedChange={() => toggleRule(rule.id)}
                  />

                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Discount Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold">Discount Tiers</h3>
              <p className="text-sm text-muted-foreground">Volume-based client discounts</p>
            </div>

            <div className="divide-y divide-border">
              {discountTiers.map((tier) => (
                <div key={tier.id} className="p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold",
                      tier.tier === 'Bronze' && "bg-orange-100 text-orange-700",
                      tier.tier === 'Silver' && "bg-slate-100 text-slate-700",
                      tier.tier === 'Gold' && "bg-yellow-100 text-yellow-700",
                      tier.tier === 'Platinum' && "bg-slate-200 text-slate-900",
                    )}>
                      {tier.tier[0]}
                    </div>
                    <div>
                      <p className="font-medium">{tier.tier}</p>
                      <p className="text-xs text-muted-foreground">{tier.minBookings}+ bookings/month</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-success">{tier.discount}% off</span>
                    <Button variant="ghost" size="icon">
                      <Pencil className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Log */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold">Recent Changes</h3>
              <p className="text-sm text-muted-foreground">Pricing configuration audit log</p>
            </div>

            <div className="divide-y divide-border">
              {auditLog.map((entry, idx) => (
                <div key={idx} className="p-4 flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2" />
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{entry.action}</span>
                      {' '}—{' '}
                      <span className="text-muted-foreground">{entry.rule}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      By {entry.user} · {entry.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Add Rule */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold mb-4">Quick Add Rule</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Rule Name</Label>
              <Input placeholder="e.g., Holiday Surcharge" />
            </div>
            <div className="space-y-2">
              <Label>Condition</Label>
              <Input placeholder="e.g., December 20-31" />
            </div>
            <div className="space-y-2">
              <Label>Adjustment</Label>
              <Input placeholder="e.g., +25%" />
            </div>
            <div className="flex items-end">
              <Button className="w-full gap-2">
                <Save className="w-4 h-4" />
                Save Rule
              </Button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
