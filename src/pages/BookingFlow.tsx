import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  MapPin, 
  ArrowRight, 
  Check, 
  Clock, 
  PoundSterling, 
  Star,
  Users,
  Zap,
  Building2
} from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { id: 1, label: 'Locations' },
  { id: 2, label: 'Select Route' },
  { id: 3, label: 'Competitors' },
  { id: 4, label: 'Confirm' },
];

interface RouteOption {
  id: string;
  type: 'fastest' | 'cheapest' | 'preferred';
  name: string;
  duration: string;
  price: string;
  distance: string;
  description: string;
}

const routeOptions: RouteOption[] = [
  {
    id: '1',
    type: 'fastest',
    name: 'M6 Express Route',
    duration: '2h 15m',
    price: '£1,450',
    distance: '125 miles',
    description: 'Direct motorway route via M6. Minimal stops.',
  },
  {
    id: '2',
    type: 'cheapest',
    name: 'A-Road Standard',
    duration: '3h 10m',
    price: '£980',
    distance: '142 miles',
    description: 'Mixed A-road route. Lower fuel costs.',
  },
  {
    id: '3',
    type: 'preferred',
    name: 'Premium Client Route',
    duration: '2h 30m',
    price: '£1,200',
    distance: '130 miles',
    description: 'Pre-negotiated rate for Acme Industries.',
  },
];

const competitorPricing = [
  { name: 'FastFreight Ltd', price: '£1,380', availability: 'Available', eta: '2h 45m' },
  { name: 'QuickHaul Co', price: '£1,520', availability: 'Limited', eta: '2h 30m' },
  { name: 'Express Logistics', price: '£1,290', availability: 'Available', eta: '3h 00m' },
];

export default function BookingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [customer, setCustomer] = useState('');

  const canProceed = () => {
    switch (currentStep) {
      case 1: return pickup && destination && customer;
      case 2: return selectedRoute;
      case 3: return true;
      case 4: return true;
      default: return false;
    }
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const routeTypeIcons = {
    fastest: <Zap className="w-5 h-5" />,
    cheapest: <PoundSterling className="w-5 h-5" />,
    preferred: <Star className="w-5 h-5" />,
  };

  const routeTypeLabels = {
    fastest: 'Fastest',
    cheapest: 'Cheapest',
    preferred: 'Client Preferred',
  };

  return (
    <MainLayout userRole="sales" title="New Booking">
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
        {/* Step Indicator */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={cn(
                  "step-indicator",
                  currentStep > step.id && "completed",
                  currentStep === step.id && "active",
                  currentStep < step.id && "pending"
                )}>
                  {currentStep > step.id ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <span className={cn(
                  "text-xs mt-2 font-medium",
                  currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                )}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "w-24 h-0.5 mx-4 -mt-5",
                  currentStep > step.id ? "bg-success" : "bg-border"
                )} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {currentStep === 1 && (
              <div className="bg-card rounded-xl border border-border p-6 space-y-6">
                <h2 className="text-xl font-semibold">Enter Booking Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="customer">Customer</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input 
                        id="customer"
                        placeholder="Search customer..."
                        className="pl-10"
                        value={customer}
                        onChange={(e) => setCustomer(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="pickup">Pickup Location</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-success" />
                      <Input 
                        id="pickup"
                        placeholder="Enter pickup address..."
                        className="pl-10"
                        value={pickup}
                        onChange={(e) => setPickup(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destination">Destination</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-destructive" />
                      <Input 
                        id="destination"
                        placeholder="Enter destination..."
                        className="pl-10"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Map Preview */}
                <div className="map-container flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Interactive map will display here</p>
                    <p className="text-xs text-muted-foreground mt-1">Enter locations to see route options</p>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h2 className="text-xl font-semibold mb-4">Select Route</h2>
                  <p className="text-muted-foreground mb-6">
                    {pickup} → {destination}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {routeOptions.map((route) => (
                      <button
                        key={route.id}
                        onClick={() => setSelectedRoute(route.id)}
                        className={cn(
                          "route-card text-left",
                          route.type,
                          selectedRoute === route.id && "selected"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className={cn(
                            "p-2 rounded-lg",
                            route.type === 'fastest' && "bg-route-fastest/10 text-route-fastest",
                            route.type === 'cheapest' && "bg-route-cheapest/10 text-route-cheapest",
                            route.type === 'preferred' && "bg-route-preferred/10 text-route-preferred",
                          )}>
                            {routeTypeIcons[route.type]}
                          </div>
                          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            {routeTypeLabels[route.type]}
                          </span>
                        </div>
                        
                        <h3 className="font-semibold mb-1">{route.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{route.description}</p>
                        
                        <div className="flex items-center justify-between pt-3 border-t border-border">
                          <div className="flex items-center gap-1 text-sm">
                            <Clock className="w-4 h-4" />
                            {route.duration}
                          </div>
                          <div className="text-lg font-bold">{route.price}</div>
                        </div>
                        
                        <p className="text-xs text-muted-foreground mt-2">{route.distance}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold mb-4">Competitor Pricing</h2>
                <p className="text-muted-foreground mb-6">
                  Compare with market rates for this route
                </p>

                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Provider</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th>ETA</th>
                        <th>Comparison</th>
                      </tr>
                    </thead>
                    <tbody>
                      {competitorPricing.map((comp, idx) => {
                        const selectedRouteData = routeOptions.find(r => r.id === selectedRoute);
                        const ourPrice = selectedRouteData ? parseInt(selectedRouteData.price.replace(/[^0-9]/g, '')) : 0;
                        const theirPrice = parseInt(comp.price.replace(/[^0-9]/g, ''));
                        const diff = ourPrice - theirPrice;
                        
                        return (
                          <tr key={idx}>
                            <td>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-competitor" />
                                <span className="font-medium">{comp.name}</span>
                              </div>
                            </td>
                            <td className="font-medium">{comp.price}</td>
                            <td>
                              <span className={cn(
                                "text-xs font-medium px-2 py-1 rounded-full",
                                comp.availability === 'Available' 
                                  ? "bg-success/10 text-success"
                                  : "bg-warning/10 text-warning"
                              )}>
                                {comp.availability}
                              </span>
                            </td>
                            <td>{comp.eta}</td>
                            <td>
                              {selectedRoute && (
                                <span className={cn(
                                  "text-sm font-medium",
                                  diff < 0 ? "text-success" : diff > 0 ? "text-destructive" : "text-muted-foreground"
                                )}>
                                  {diff < 0 ? `£${Math.abs(diff)} cheaper` : diff > 0 ? `£${diff} more` : 'Same'}
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/30">
                  <p className="text-sm font-medium text-accent">
                    💡 Your selected route is competitively priced within market range
                  </p>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold mb-6">Booking Confirmation</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Customer</p>
                      <p className="font-medium">{customer}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pickup</p>
                      <p className="font-medium">{pickup}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Destination</p>
                      <p className="font-medium">{destination}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {selectedRoute && (
                      <>
                        <div>
                          <p className="text-sm text-muted-foreground">Selected Route</p>
                          <p className="font-medium">
                            {routeOptions.find(r => r.id === selectedRoute)?.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Estimated Duration</p>
                          <p className="font-medium">
                            {routeOptions.find(r => r.id === selectedRoute)?.duration}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Total Price</p>
                          <p className="text-2xl font-bold text-accent">
                            {routeOptions.find(r => r.id === selectedRoute)?.price}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="mt-6 p-4 bg-secondary rounded-lg">
                  <h3 className="font-medium mb-2">Delivery Note</h3>
                  <textarea 
                    className="w-full p-3 rounded-lg bg-background border border-border resize-none focus:outline-none focus:ring-2 focus:ring-accent"
                    rows={3}
                    placeholder="Add any special instructions..."
                  />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Back
          </Button>
          
          {currentStep < 4 ? (
            <Button 
              onClick={nextStep}
              disabled={!canProceed()}
              className="gap-2"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button 
              className="gap-2 bg-success hover:bg-success/90"
            >
              <Check className="w-4 h-4" />
              Confirm Booking
            </Button>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
