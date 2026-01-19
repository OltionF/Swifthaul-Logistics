import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Download, Calendar, TrendingUp, Route, Users, PoundSterling } from 'lucide-react';

const revenueData = [
  { route: 'London-Leeds', revenue: 45200, bookings: 32 },
  { route: 'Manchester-Birm', revenue: 38400, bookings: 28 },
  { route: 'Bristol-Cardiff', revenue: 22100, bookings: 24 },
  { route: 'Glasgow-Edinburgh', revenue: 18900, bookings: 29 },
  { route: 'Liverpool-Newcastle', revenue: 31500, bookings: 21 },
];

const trendData = [
  { month: 'Aug', revenue: 82000, profit: 24600 },
  { month: 'Sep', revenue: 95000, profit: 28500 },
  { month: 'Oct', revenue: 88000, profit: 26400 },
  { month: 'Nov', revenue: 102000, profit: 30600 },
  { month: 'Dec', revenue: 118000, profit: 35400 },
  { month: 'Jan', revenue: 125000, profit: 37500 },
];

const customerSegments = [
  { name: 'Enterprise', value: 45, color: 'hsl(213, 50%, 25%)' },
  { name: 'Mid-Market', value: 30, color: 'hsl(175, 55%, 40%)' },
  { name: 'SMB', value: 18, color: 'hsl(38, 92%, 50%)' },
  { name: 'New', value: 7, color: 'hsl(152, 60%, 40%)' },
];

const topRoutes = [
  { route: 'London → Leeds', profit: '£14,200', margin: '32%', trend: '+8%' },
  { route: 'Manchester → Birmingham', profit: '£11,500', margin: '30%', trend: '+5%' },
  { route: 'Liverpool → Newcastle', profit: '£9,400', margin: '29%', trend: '+12%' },
  { route: 'Bristol → Cardiff', profit: '£6,600', margin: '28%', trend: '-2%' },
  { route: 'Glasgow → Edinburgh', profit: '£5,600', margin: '31%', trend: '+3%' },
];

export default function ReportsDashboard() {
  return (
    <MainLayout userRole="sales" title="Reports & Analytics">
      <div className="space-y-6 animate-fade-in">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Select defaultValue="30">
              <SelectTrigger className="w-40">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
                <SelectItem value="90">Last 90 days</SelectItem>
                <SelectItem value="365">Last year</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <Route className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Routes</SelectItem>
                <SelectItem value="london">London Hub</SelectItem>
                <SelectItem value="manchester">Manchester Hub</SelectItem>
                <SelectItem value="scotland">Scotland</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>

        {/* KPI Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <PoundSterling className="w-4 h-4" />
              <span className="text-sm">Total Revenue</span>
            </div>
            <p className="text-2xl font-bold">£125,400</p>
            <p className="text-xs text-success mt-1">+18% vs last month</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">Profit Margin</span>
            </div>
            <p className="text-2xl font-bold">30.2%</p>
            <p className="text-xs text-success mt-1">+2.1% vs last month</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Route className="w-4 h-4" />
              <span className="text-sm">Total Bookings</span>
            </div>
            <p className="text-2xl font-bold">342</p>
            <p className="text-xs text-success mt-1">+24 vs last month</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Users className="w-4 h-4" />
              <span className="text-sm">Active Clients</span>
            </div>
            <p className="text-2xl font-bold">87</p>
            <p className="text-xs text-success mt-1">+5 new this month</p>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold mb-4">Revenue & Profit Trend</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `£${v/1000}k`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`£${value.toLocaleString()}`, '']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))' }}
                    name="Revenue"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--accent))' }}
                    name="Profit"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Customer Segments */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h3 className="font-semibold mb-4">Customer Segments</h3>
            <div className="h-72 flex items-center">
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie
                    data={customerSegments}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {customerSegments.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                    formatter={(value: number) => [`${value}%`, '']}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-3">
                {customerSegments.map((segment, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: segment.color }}
                    />
                    <span className="text-sm">{segment.name}</span>
                    <span className="text-sm font-medium ml-auto">{segment.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Revenue by Route */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold mb-4">Revenue by Route</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} tickFormatter={(v) => `£${v/1000}k`} />
                <YAxis type="category" dataKey="route" stroke="hsl(var(--muted-foreground))" fontSize={12} width={120} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                  formatter={(value: number) => [`£${value.toLocaleString()}`, 'Revenue']}
                />
                <Bar dataKey="revenue" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Routes Table */}
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold">Route Profitability</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Route</th>
                  <th>Profit</th>
                  <th>Margin</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {topRoutes.map((route, idx) => (
                  <tr key={idx}>
                    <td className="font-medium">{route.route}</td>
                    <td className="font-medium">{route.profit}</td>
                    <td>{route.margin}</td>
                    <td className={route.trend.startsWith('+') ? 'text-success' : 'text-destructive'}>
                      {route.trend}
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
