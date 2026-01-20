// Core pricing types for the transport booking system

export type VehicleType = 'van' | 'truck' | 'trailer' | 'refrigerated' | 'flatbed' | 'tanker';

export type PriceType = 'fixed' | 'per_km' | 'percentage';

export type RulePriority = 'low' | 'medium' | 'high';

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface PricingRule {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  priority: RulePriority;
  priorityOrder: number;
  
  // Conditions
  vehicleTypes?: VehicleType[];
  districts?: string[];
  minDistance?: number;
  maxDistance?: number;
  minDuration?: number; // minutes
  maxDuration?: number;
  daysOfWeek?: DayOfWeek[];
  timeStart?: string; // HH:mm
  timeEnd?: string;
  seasonStart?: string; // MM-DD
  seasonEnd?: string;
  loadTypes?: string[];
  minWeight?: number;
  maxWeight?: number;
  urgencyLevels?: ('standard' | 'express' | 'urgent')[];
  isPartnerRoute?: boolean;
  
  // Pricing
  priceType: PriceType;
  value: number;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
  createdBy: string;
}

export interface CustomerDiscount {
  id: string;
  customerId: string;
  customerName: string;
  
  // Discount type
  discountType: 'percentage' | 'fixed';
  value: number;
  
  // Conditions
  vehicleTypes?: VehicleType[];
  districts?: string[];
  serviceLevel?: ('standard' | 'premium' | 'enterprise')[];
  routeTypes?: string[];
  
  // Time constraints
  validFrom?: string;
  validUntil?: string;
  
  // Volume-based
  minMonthlyVolume?: number;
  volumeTiers?: {
    minVolume: number;
    discountValue: number;
  }[];
  
  // Contract
  contractTier?: 'bronze' | 'silver' | 'gold' | 'platinum';
  
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface RouteSimulation {
  origin: string;
  destination: string;
  distance: number; // km
  duration: number; // minutes
  vehicleType: VehicleType;
  weight?: number;
  loadType?: string;
  urgency: 'standard' | 'express' | 'urgent';
  customerId?: string;
  scheduledDate?: string;
  scheduledTime?: string;
}

export interface PriceBreakdown {
  basePrice: number;
  adjustments: {
    ruleName: string;
    ruleId: string;
    type: PriceType;
    value: number;
    impact: number;
  }[];
  subtotal: number;
  discounts: {
    name: string;
    type: 'percentage' | 'fixed';
    value: number;
    impact: number;
  }[];
  finalPrice: number;
  margin: number;
  marginPercentage: number;
}

export interface RouteOption {
  type: 'fastest' | 'cheapest' | 'preferred';
  distance: number;
  duration: number;
  price: number;
  breakdown: PriceBreakdown;
}

export interface District {
  id: string;
  name: string;
  code: string;
  region: string;
  baseMultiplier: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  contractTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  monthlyVolume: number;
  totalRoutes: number;
  activeDiscounts: number;
}
