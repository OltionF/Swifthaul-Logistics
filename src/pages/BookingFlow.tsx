import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
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
  Building2,
  Navigation
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const steps = [
  { id: 1, label: 'Locations' },
  { id: 2, label: 'Select Route' },
  { id: 3, label: 'Confirm' },
];

// Mock customer data
const customers = [
  { id: '1', name: 'Acme Industries', code: 'ACME', discount: 15 },
  { id: '2', name: 'Global Manufacturing Ltd', code: 'GML', discount: 10 },
  { id: '3', name: 'Northern Steel Works', code: 'NSW', discount: 12 },
  { id: '4', name: 'Precision Engineering Co', code: 'PEC', discount: 8 },
  { id: '5', name: 'Swift Components Ltd', code: 'SCL', discount: 20 },
  { id: '6', name: 'United Packaging Solutions', code: 'UPS', discount: 5 },
];

// Mock locations with coordinates for map visualization
const locations = [
  { id: '1', name: 'Manchester Depot', address: 'Unit 5, Industrial Park, Manchester M1 2AB', lat: 53.483959, lng: -2.244644 },
  { id: '2', name: 'Birmingham Hub', address: '120 Logistics Way, Birmingham B1 1AA', lat: 52.486243, lng: -1.890401 },
  { id: '3', name: 'London Distribution Centre', address: '45 Freight Road, London E15 4QZ', lat: 51.538330, lng: -0.016389 },
  { id: '4', name: 'Leeds Warehouse', address: 'Bay 12, Commerce Park, Leeds LS1 5PL', lat: 53.800755, lng: -1.549077 },
  { id: '5', name: 'Glasgow Terminal', address: '88 Dockside Avenue, Glasgow G1 3DQ', lat: 55.860916, lng: -4.251433 },
  { id: '6', name: 'Bristol Storage Facility', address: '22 Port View, Bristol BS1 6QH', lat: 51.454513, lng: -2.587910 },
  { id: '7', name: 'Edinburgh Logistics Park', address: '15 Capital Way, Edinburgh EH1 1BB', lat: 55.953251, lng: -3.188267 },
  { id: '8', name: 'Liverpool Dock Warehouse', address: '60 Mersey Road, Liverpool L3 4FP', lat: 53.408371, lng: -2.991573 },
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
    description: 'Pre-negotiated rate for preferred clients.',
  },
];

const competitorPricing = [
  { name: 'FastFreight Ltd', price: '£1,380', availability: 'Available', eta: '2h 45m' },
  { name: 'QuickHaul Co', price: '£1,520', availability: 'Limited', eta: '2h 30m' },
  { name: 'Express Logistics', price: '£1,290', availability: 'Available', eta: '3h 00m' },
];

export default function BookingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const [pickupId, setPickupId] = useState<string | null>(null);
  const [destinationId, setDestinationId] = useState<string | null>(null);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [customerId, setCustomerId] = useState<string | null>(null);
  
  const [customerOpen, setCustomerOpen] = useState(false);
  const [pickupOpen, setPickupOpen] = useState(false);
  const [destinationOpen, setDestinationOpen] = useState(false);

  const selectedCustomer = customers.find(c => c.id === customerId);
  const pickupLocation = locations.find(l => l.id === pickupId);
  const destinationLocation = locations.find(l => l.id === destinationId);

  // Filter out selected pickup from destination options and vice versa
  const availableDestinations = useMemo(() => 
    locations.filter(l => l.id !== pickupId), 
    [pickupId]
  );
  const availablePickups = useMemo(() => 
    locations.filter(l => l.id !== destinationId), 
    [destinationId]
  );

  const canProceed = () => {
    switch (currentStep) {
      case 1: return pickupId && destinationId && customerId;
      case 2: return selectedRoute;
      case 3: return true;
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

  // Calculate map visualization based on selected locations
  const hasRoute = pickupLocation && destinationLocation;

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
                
                {/* Customer Dropdown */}
                <div className="space-y-2">
                  <Label>Customer</Label>
                  <Popover open={customerOpen} onOpenChange={setCustomerOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={customerOpen}
                        className="w-full justify-start text-left font-normal h-11"
                      >
                        <Building2 className="mr-2 h-4 w-4 text-muted-foreground shrink-0" />
                        {selectedCustomer ? (
                          <span className="truncate">
                            {selectedCustomer.name}
                            <span className="ml-2 text-muted-foreground">({selectedCustomer.code})</span>
                          </span>
                        ) : (
                          <span className="text-muted-foreground">Select customer...</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[400px] p-0 bg-popover border border-border shadow-lg z-50" align="start">
                      <Command>
                        <CommandInput placeholder="Search customers..." className="h-11" />
                        <CommandList>
                          <CommandEmpty>No customer found.</CommandEmpty>
                          <CommandGroup>
                            {customers.map((customer) => (
                              <CommandItem
                                key={customer.id}
                                value={customer.name}
                                onSelect={() => {
                                  setCustomerId(customer.id);
                                  setCustomerOpen(false);
                                }}
                                className="cursor-pointer"
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    customerId === customer.id ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                <div className="flex-1">
                                  <div className="font-medium">{customer.name}</div>
                                  <div className="text-xs text-muted-foreground">
                                    Code: {customer.code} • {customer.discount}% discount
                                  </div>
                                </div>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Pickup Location Dropdown */}
                  <div className="space-y-2">
                    <Label>Pickup Location</Label>
                    <Popover open={pickupOpen} onOpenChange={setPickupOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={pickupOpen}
                          className="w-full justify-start text-left font-normal h-11"
                        >
                          <MapPin className="mr-2 h-4 w-4 text-success shrink-0" />
                          {pickupLocation ? (
                            <span className="truncate">{pickupLocation.name}</span>
                          ) : (
                            <span className="text-muted-foreground">Select pickup...</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[350px] p-0 bg-popover border border-border shadow-lg z-50" align="start">
                        <Command>
                          <CommandInput placeholder="Search locations..." className="h-11" />
                          <CommandList>
                            <CommandEmpty>No location found.</CommandEmpty>
                            <CommandGroup>
                              {availablePickups.map((location) => (
                                <CommandItem
                                  key={location.id}
                                  value={location.name}
                                  onSelect={() => {
                                    setPickupId(location.id);
                                    setPickupOpen(false);
                                  }}
                                  className="cursor-pointer"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      pickupId === location.id ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  <div className="flex-1">
                                    <div className="font-medium">{location.name}</div>
                                    <div className="text-xs text-muted-foreground truncate">
                                      {location.address}
                                    </div>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Destination Dropdown */}
                  <div className="space-y-2">
                    <Label>Destination</Label>
                    <Popover open={destinationOpen} onOpenChange={setDestinationOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={destinationOpen}
                          className="w-full justify-start text-left font-normal h-11"
                        >
                          <MapPin className="mr-2 h-4 w-4 text-destructive shrink-0" />
                          {destinationLocation ? (
                            <span className="truncate">{destinationLocation.name}</span>
                          ) : (
                            <span className="text-muted-foreground">Select destination...</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[350px] p-0 bg-popover border border-border shadow-lg z-50" align="start">
                        <Command>
                          <CommandInput placeholder="Search locations..." className="h-11" />
                          <CommandList>
                            <CommandEmpty>No location found.</CommandEmpty>
                            <CommandGroup>
                              {availableDestinations.map((location) => (
                                <CommandItem
                                  key={location.id}
                                  value={location.name}
                                  onSelect={() => {
                                    setDestinationId(location.id);
                                    setDestinationOpen(false);
                                  }}
                                  className="cursor-pointer"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      destinationId === location.id ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  <div className="flex-1">
                                    <div className="font-medium">{location.name}</div>
                                    <div className="text-xs text-muted-foreground truncate">
                                      {location.address}
                                    </div>
                                  </div>
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Interactive Map Preview */}
                <div className="map-container relative overflow-hidden">
                  {hasRoute ? (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5">
                      {/* Stylized Map Visualization */}
                      <svg viewBox="0 0 400 200" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                        {/* Background grid */}
                        <defs>
                          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3"/>
                          </pattern>
                          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="hsl(var(--success))" />
                            <stop offset="100%" stopColor="hsl(var(--destructive))" />
                          </linearGradient>
                        </defs>
                        <rect width="400" height="200" fill="url(#grid)" />
                        
                        {/* Route line with animation */}
                        <motion.path
                          d="M 60 100 Q 150 40 200 100 T 340 100"
                          fill="none"
                          stroke="url(#routeGradient)"
                          strokeWidth="3"
                          strokeDasharray="8 4"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                        
                        {/* Pickup marker */}
                        <motion.g 
                          initial={{ scale: 0 }} 
                          animate={{ scale: 1 }} 
                          transition={{ delay: 0.2 }}
                        >
                          <circle cx="60" cy="100" r="20" fill="hsl(var(--success))" opacity="0.2" />
                          <circle cx="60" cy="100" r="12" fill="hsl(var(--success))" />
                          <circle cx="60" cy="100" r="5" fill="white" />
                        </motion.g>
                        
                        {/* Destination marker */}
                        <motion.g 
                          initial={{ scale: 0 }} 
                          animate={{ scale: 1 }} 
                          transition={{ delay: 0.4 }}
                        >
                          <circle cx="340" cy="100" r="20" fill="hsl(var(--destructive))" opacity="0.2" />
                          <circle cx="340" cy="100" r="12" fill="hsl(var(--destructive))" />
                          <circle cx="340" cy="100" r="5" fill="white" />
                        </motion.g>
                        
                        {/* Navigation icon in center */}
                        <motion.g
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.8 }}
                        >
                          <circle cx="200" cy="60" r="16" fill="hsl(var(--accent))" />
                          <path 
                            d="M 200 50 L 206 66 L 200 62 L 194 66 Z" 
                            fill="white"
                            transform="rotate(45, 200, 58)"
                          />
                        </motion.g>
                      </svg>
                      
                      {/* Route info overlay */}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                        <div className="bg-background/95 backdrop-blur-sm rounded-lg px-3 py-2 border border-border shadow-sm">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-3 h-3 rounded-full bg-success" />
                            <span className="font-medium">{pickupLocation?.name}</span>
                          </div>
                        </div>
                        <div className="bg-background/95 backdrop-blur-sm rounded-lg px-3 py-2 border border-border shadow-sm">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="w-3 h-3 rounded-full bg-destructive" />
                            <span className="font-medium">{destinationLocation?.name}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-center p-6">
                      <Navigation className="w-12 h-12 text-muted-foreground mb-3" />
                      <p className="text-muted-foreground font-medium">Interactive Route Map</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Select pickup and destination to view the route
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="bg-card rounded-xl border border-border p-6">
                  <h2 className="text-xl font-semibold mb-4">Select Route</h2>
                  <p className="text-muted-foreground mb-6">
                    {pickupLocation?.name} → {destinationLocation?.name}
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

            {currentStep === 4 && (
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

            {currentStep === 3 && (
              <div className="bg-card rounded-xl border border-border p-6">
                <h2 className="text-xl font-semibold mb-6">Booking Confirmation</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Customer</p>
                      <p className="font-medium">{selectedCustomer?.name}</p>
                      {selectedCustomer && (
                        <p className="text-xs text-success mt-1">
                          {selectedCustomer.discount}% client discount applied
                        </p>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pickup</p>
                      <p className="font-medium">{pickupLocation?.name}</p>
                      <p className="text-xs text-muted-foreground">{pickupLocation?.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Destination</p>
                      <p className="font-medium">{destinationLocation?.name}</p>
                      <p className="text-xs text-muted-foreground">{destinationLocation?.address}</p>
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
          
          {currentStep < 3 ? (
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
