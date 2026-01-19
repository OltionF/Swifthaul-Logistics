import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Truck, 
  Users, 
  Settings, 
  ArrowRight,
  Shield,
  Zap,
  BarChart3
} from 'lucide-react';

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
        <div className="relative max-w-6xl mx-auto px-6 py-20">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent text-sm font-medium">
              <Zap className="w-4 h-4" />
              Digital Transport Booking System
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Swifthaul Logistics
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Fast, automated, and data-driven transport booking for modern logistics teams.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="gap-2">
                <Link to="/">
                  <Truck className="w-5 h-5" />
                  Sales Dashboard
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/client">
                  <Users className="w-5 h-5" />
                  Client Portal
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="gap-2">
                <Link to="/admin/pricing">
                  <Settings className="w-5 h-5" />
                  Admin Panel
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-card rounded-xl border border-border p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Zap className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold">Fast Route Booking</h3>
            <p className="text-muted-foreground">
              Compare fastest, cheapest, and preferred routes instantly with real-time pricing.
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <Shield className="w-6 h-6 text-success" />
            </div>
            <h3 className="text-lg font-semibold">Digital Signatures</h3>
            <p className="text-muted-foreground">
              Capture proof of delivery with digital signatures, photos, and notes.
            </p>
          </div>

          <div className="bg-card rounded-xl border border-border p-6 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-warning" />
            </div>
            <h3 className="text-lg font-semibold">Data Insights</h3>
            <p className="text-muted-foreground">
              Profitability analytics, competitor pricing, and route performance metrics.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="text-2xl font-semibold mb-6">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link 
            to="/booking"
            className="bg-card rounded-xl border border-border p-5 hover:border-accent hover:shadow-md transition-all group"
          >
            <h4 className="font-medium group-hover:text-accent">New Booking</h4>
            <p className="text-sm text-muted-foreground">Create transport booking</p>
          </Link>
          <Link 
            to="/deliveries"
            className="bg-card rounded-xl border border-border p-5 hover:border-accent hover:shadow-md transition-all group"
          >
            <h4 className="font-medium group-hover:text-accent">Deliveries</h4>
            <p className="text-sm text-muted-foreground">Track active deliveries</p>
          </Link>
          <Link 
            to="/reports"
            className="bg-card rounded-xl border border-border p-5 hover:border-accent hover:shadow-md transition-all group"
          >
            <h4 className="font-medium group-hover:text-accent">Reports</h4>
            <p className="text-sm text-muted-foreground">View analytics</p>
          </Link>
          <Link 
            to="/signatures"
            className="bg-card rounded-xl border border-border p-5 hover:border-accent hover:shadow-md transition-all group"
          >
            <h4 className="font-medium group-hover:text-accent">Signatures</h4>
            <p className="text-sm text-muted-foreground">Record delivery proof</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
