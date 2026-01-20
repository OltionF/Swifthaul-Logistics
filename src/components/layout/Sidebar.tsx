import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Route, 
  FileSignature, 
  Users, 
  Settings, 
  BarChart3, 
  Truck,
  ChevronLeft,
  LogOut,
  Building2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  userRole?: 'sales' | 'client' | 'admin';
}

const salesNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Route, label: 'New Booking', path: '/booking' },
  { icon: Truck, label: 'Deliveries', path: '/deliveries' },
  { icon: Users, label: 'Customers Config', path: '/customers' },
  { icon: Users, label: 'Discount Config', path: '/discount' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
];

const clientNavItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/client' },
  { icon: Route, label: 'Bookings', path: '/client/bookings' },
  { icon: FileSignature, label: 'Documents', path: '/client/documents' },
];

const adminNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Settings, label: 'Pricing Rules', path: '/admin/pricing' },
  { icon: Users, label: 'Users', path: '/admin/users' },
  { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
];

const CustomerDiscounts = [
  { icon: LayoutDashboard, label: 'Customer Config', path: '/admin' },
  { icon: Settings, label: 'Pricing Rules', path: '/admin/pricing' },
  { icon: Users, label: 'Users', path: '/admin/users' },
  { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
];

export default function Sidebar({ userRole = 'sales' }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const navItems = userRole === 'client' 
    ? clientNavItems 
    : userRole === 'admin' 
      ? adminNavItems 
      : salesNavItems;

  const roleLabels = {
    sales: 'Admin Portal',
    client: 'Client Portal',
    admin: 'Admin Panel',
  };

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-screen bg-sidebar flex flex-col transition-all duration-300 z-50",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo & Brand */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center flex-shrink-0">
            <Building2 className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="font-semibold text-sidebar-foreground">Swifthaul Logistics</h1>
              <p className="text-xs text-sidebar-foreground/60">{roleLabels[userRole]}</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn("nav-item", isActive && "active")}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && (
                <span className="animate-fade-in">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="nav-item w-full"
        >
          <ChevronLeft className={cn(
            "w-5 h-5 transition-transform duration-300",
            collapsed && "rotate-180"
          )} />
          {!collapsed && <span>Collapse</span>}
        </button>
        <button className="nav-item w-full text-destructive/80 hover:text-destructive hover:bg-destructive/10">
          <LogOut className="w-5 h-5" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
