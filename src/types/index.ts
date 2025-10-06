export type Mode = 'Internal' | 'Vendor';

export type QuoteStatus = 'Incoming' | 'Proposed' | 'Accepted' | 'Declined' | 'Expired' | 'Superseded';

export type ShipmentStatus = 'Pending Pickup' | 'In Transit' | 'Delivered' | 'Cancelled';

export type VehicleStatus = 'Idle' | 'En-route' | 'Maintenance';

export type UserRole = 'Sales Specialist' | 'Logistics Coordinator' | 'Accountant' | 'Manager';

export interface Customer {
  id: string;
  name: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  created_at: string;
}

export interface Vehicle {
  id: string;
  plate: string;
  type: string;
  capacity_tons: number;
  status: VehicleStatus;
  last_service_at?: string;
  next_service_at?: string;
  created_at: string;
}

export interface Driver {
  id: string;
  name: string;
  phone?: string;
  license_class?: string;
  pay_per_km: number;
  current_assignment_id?: string;
  created_at: string;
}

export interface Vendor {
  id: string;
  name: string;
  contact_person?: string;
  phone?: string;
  email?: string;
  avg_rate_per_km: number;
  payment_terms?: string;
  created_at: string;
}

export interface Quote {
  id: string;
  quote_set_id: string;
  customer_id: string;
  mode: Mode;
  origin: string;
  destination: string;
  distance_km: number;
  cargo_type: string;
  requirement: string;
  weight_tons?: number;
  volume_m3?: number;
  customer_offered_price?: number;
  customer_price: number;
  fuel_cost: number;
  tolls_cost: number;
  driver_pay: number;
  vendor_fee?: number;
  misc_cost: number;
  vehicle_id?: string;
  driver_id?: string;
  vendor_id?: string;
  eta_days: number;
  note?: string;
  status: QuoteStatus;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface Shipment {
  id: string;
  quote_id: string;
  status: ShipmentStatus;
  pickup_at?: string;
  delivered_at?: string;
  current_vehicle_id?: string;
  current_driver_id?: string;
  current_vendor_id?: string;
  invoice_sent: boolean;
  vendor_payout_done: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuoteWithRelations extends Quote {
  customer?: Customer;
  vehicle?: Vehicle;
  driver?: Driver;
  vendor?: Vendor;
}

export interface ShipmentWithRelations extends Shipment {
  quote?: QuoteWithRelations;
  vehicle?: Vehicle;
  driver?: Driver;
  vendor?: Vendor;
}

export interface PriceBreakdown {
  customerPrice: number;
  pricePerKm: number;
  totalCost: number;
  costPerKm: number;
  marginAmount: number;
  marginPercent: number;
}

export function calculatePriceBreakdown(quote: Quote): PriceBreakdown {
  const totalCost = quote.fuel_cost + quote.tolls_cost + quote.driver_pay + (quote.vendor_fee || 0) + quote.misc_cost;
  const pricePerKm = quote.customer_price / quote.distance_km;
  const costPerKm = totalCost / quote.distance_km;
  const marginAmount = quote.customer_price - totalCost;
  const marginPercent = (marginAmount / quote.customer_price) * 100;

  return {
    customerPrice: quote.customer_price,
    pricePerKm,
    totalCost,
    costPerKm,
    marginAmount,
    marginPercent,
  };
}
