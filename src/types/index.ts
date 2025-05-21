
// User roles
export type UserRole = 'donor' | 'ngo' | 'volunteer';

// User type
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  address?: string;
  location?: {
    lat: number;
    lng: number;
  };
  organizationName?: string; // For NGOs
  organizationDescription?: string; // For NGOs
}

// Food donation type
export interface FoodDonation {
  id: string;
  donorId: string;
  donorName: string;
  description: string;
  quantity: string;
  foodType: string;
  expiryTime: Date;
  pickupAddress: string;
  location: {
    lat: number;
    lng: number;
  };
  status: 'available' | 'assigned' | 'completed' | 'expired';
  ngoId?: string;
  volunteerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Pickup assignment type
export interface PickupAssignment {
  id: string;
  donationId: string;
  ngoId: string;
  volunteerId?: string;
  status: 'pending' | 'assigned' | 'in-progress' | 'completed' | 'cancelled';
  pickupTime?: Date;
  completedTime?: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
